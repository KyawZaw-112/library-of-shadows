"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User as SbUser } from "@supabase/supabase-js";
import { getProduct, products, provinces, type Product } from "./catalog";
import { getCached, remember } from "./openlibrary";
import { supabase } from "./supabase";
import { canOps, roleFromEmail, type Role } from "./roles";
import {
  listingToProduct,
  seedListings,
  type ListingStatus,
  type ResaleListing,
} from "./resale";

export type User = {
  id?: string;
  email: string;
  name: string;
  role: Role;
  /** True for staff and owner — kept for older UI checks. */
  isAdmin: boolean;
  genres: string[];
  goal: string;
  points: number;
  credit: number;
  firstOrderUsed: boolean;
};

function withRole(email: string): Pick<User, "role" | "isAdmin"> {
  const role = roleFromEmail(email);
  return { role, isAdmin: canOps(role) };
}

export type CartLine = { slug: string; qty: number };
export type OrderStatus = "placed" | "packing" | "shipped" | "delivered";

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: { slug: string; title: string; qty: number; price: number }[];
  address: string;
  province: string;
  payment: string;
  coupon?: string;
  subtotal: number;
  discount: number;
  delivery: number;
  pointsUsed: number;
  total: number;
  tracking: string;
};

export type Review = { slug: string; name: string; rating: number; body: string; at: string };

type Store = {
  ready: boolean;
  user: User | null;
  cart: CartLine[];
  wishlist: string[];
  orders: Order[];
  reviews: Review[];
  inventory: Record<string, number>;
  login: (email: string, name?: string, extra?: { genres?: string[]; goal?: string }) => void;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string, name: string) => Promise<string | null>;
  logout: () => void;
  completeOnboarding: (genres: string[], goal: string) => void;
  addToCart: (item: string | Product, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  toggleWish: (slug: string) => void;
  placeOrder: (input: {
    address: string;
    province: string;
    payment: string;
    coupon: string;
    usePoints: boolean;
    useCredit?: boolean;
  }) => Order | string;
  addReview: (slug: string, rating: number, body: string) => void;
  adminSetStatus: (id: string, status: OrderStatus) => void;
  adminSetStock: (slug: string, stock: number) => void;
  listings: ResaleListing[];
  listResale: (input: Omit<ResaleListing, "id" | "createdAt" | "status" | "credited" | "sellerEmail" | "sellerName">) => ResaleListing | string;
  opsSetListing: (id: string, status: ListingStatus) => void;
};

const KEY = "los-store-v1";
const Ctx = createContext<Store | null>(null);

const defaultInv = () => Object.fromEntries(products.map((p) => [p.slug, p.stock]));

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [inventory, setInventory] = useState<Record<string, number>>(defaultInv);
  const [listings, setListings] = useState<ResaleListing[]>(seedListings);

  const fromSb = (u: SbUser, extra?: Partial<User>): User => {
    const email = u.email || "";
    return {
      id: u.id,
      email,
      name:
        (u.user_metadata?.full_name as string) ||
        (u.user_metadata?.name as string) ||
        email.split("@")[0] ||
        "Reader",
      ...withRole(email),
      genres: extra?.genres ?? [],
      goal: extra?.goal ?? "mixed",
      points: extra?.points ?? (canOps(roleFromEmail(email)) ? 0 : 80),
      credit: extra?.credit ?? 0,
      firstOrderUsed: extra?.firstOrderUsed ?? false,
    };
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.user?.email) {
          const email = d.user.email as string;
          setUser({ credit: 0, ...d.user, ...withRole(email) });
        }
        setCart(d.cart ?? []);
        setWishlist(d.wishlist ?? []);
        setOrders(d.orders ?? []);
        setReviews(d.reviews ?? []);
        setInventory({ ...defaultInv(), ...(d.inventory ?? {}) });
        const rows: ResaleListing[] = Array.isArray(d.listings) && d.listings.length ? d.listings : seedListings;
        setListings(rows);
        rows.filter((l) => l.status === "listed").forEach(listingToProduct);
      }
    } catch {
      /* ignore */
    }

    let unsub: (() => void) | undefined;
    (async () => {
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) setUser((prev) => fromSb(data.session.user, prev ?? undefined));
        const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
          if (session?.user) setUser((prev) => fromSb(session.user, prev ?? undefined));
          else setUser(null);
        });
        unsub = () => sub.subscription.unsubscribe();
      }
      setReady(true);
    })();
    return () => unsub?.();
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify({ user, cart, wishlist, orders, reviews, inventory, listings }));
  }, [ready, user, cart, wishlist, orders, reviews, inventory, listings]);

  useEffect(() => {
    listings.filter((l) => l.status === "listed").forEach(listingToProduct);
  }, [listings]);

  useEffect(() => {
    if (!user?.email) return;
    let pay = 0;
    const next = listings.map((l) => {
      if (l.sellerEmail === user.email && l.status === "sold" && !l.credited) {
        pay += l.buyback;
        return { ...l, credited: true };
      }
      return l;
    });
    if (!pay) return;
    setListings(next);
    setUser((u) => (u ? { ...u, credit: (u.credit || 0) + pay } : u));
  }, [user?.email, listings]);

  const api = useMemo<Store>(
    () => ({
      ready,
      user,
      cart,
      wishlist,
      orders,
      reviews,
      inventory,
      listings,
      login: (email, name, extra) => {
        const r = withRole(email);
        setUser({
          email,
          name: name || email.split("@")[0],
          ...r,
          genres: extra?.genres ?? [],
          goal: extra?.goal ?? "mixed",
          points: r.isAdmin ? 0 : 80,
          credit: 0,
          firstOrderUsed: false,
        });
      },
      signIn: async (email, password) => {
        if (!supabase) return "Supabase is not configured.";
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return error ? error.message : null;
      },
      signUp: async (email, password, name) => {
        if (!supabase) return "Supabase is not configured.";
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        return error ? error.message : null;
      },
      logout: () => {
        void supabase?.auth.signOut();
        setUser(null);
      },
      completeOnboarding: (genres, goal) => {
        setUser((u) => (u ? { ...u, genres, goal } : u));
        if (supabase && user?.id) {
          void supabase.from("profiles").update({ reading_goal: goal, onboarding_completed_at: new Date().toISOString() }).eq("id", user.id);
          void supabase.from("user_preferences").upsert(
            genres.map((genre_slug) => ({ user_id: user.id, genre_slug, weight: 1 })),
          );
        }
      },
      addToCart: (item, qty = 1) => {
        const p = typeof item === "string" ? getCached(item) || getProduct(item) : item;
        if (p) remember(p);
        const slug = typeof item === "string" ? item : item.slug;
        setCart((c) => {
          if (p?.format === "Used") {
            return c.some((l) => l.slug === slug) ? c : [...c, { slug, qty: 1 }];
          }
          const i = c.find((l) => l.slug === slug);
          if (i) return c.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
          return [...c, { slug, qty }];
        });
      },
      setQty: (slug, qty) => setCart((c) => (qty <= 0 ? c.filter((l) => l.slug !== slug) : c.map((l) => (l.slug === slug ? { ...l, qty } : l)))),
      toggleWish: (slug) => setWishlist((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug])),
      placeOrder: ({ address, province, payment, coupon, usePoints, useCredit }) => {
        if (!user) return "Please sign in first.";
        if (!cart.length) return "Cart is empty.";
        const lines: { slug: string; title: string; qty: number; price: number }[] = [];
        const usedIds: string[] = [];
        for (const l of cart) {
          const p = getCached(l.slug) || getProduct(l.slug);
          if (!p) return "A cart title is no longer available.";
          if (p.format === "Used") {
            const listing = listings.find((x) => x.id === p.slug);
            if (!listing || listing.status !== "listed") return `“${p.title}” is no longer on the pre-loved shelf.`;
            if (listing.sellerEmail === user.email) return "You cannot buy your own listing.";
            if (l.qty !== 1) return "Pre-loved copies are one of one.";
            usedIds.push(listing.id);
          } else if ((inventory[l.slug] ?? p.stock) < l.qty) {
            return `Not enough stock for ${p.title}`;
          }
          lines.push({ slug: l.slug, title: p.title, qty: l.qty, price: p.price });
        }
        const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
        const code = coupon.trim().toUpperCase();
        let discount = 0;
        if (code === "WELCOME10" && !user.firstOrderUsed) discount = Math.round(subtotal * 0.1);
        else if (code && code !== "WELCOME10") return "Unknown coupon.";
        else if (code === "WELCOME10" && user.firstOrderUsed) return "WELCOME10 already used.";
        const delivery = provinces.find((p) => p.name === province)?.fee ?? 100;
        let pointsUsed = 0;
        if (usePoints && user.points >= 100) {
          pointsUsed = Math.min(user.points, Math.floor(subtotal / 10) * 10);
        }
        const pointsValue = (pointsUsed / 100) * 20;
        let total = Math.max(0, subtotal - discount - pointsValue + delivery);
        const creditUsed = useCredit ? Math.min(user.credit || 0, total) : 0;
        total -= creditUsed;
        const id = "LOS-" + Date.now().toString(36).toUpperCase();
        const order: Order = {
          id,
          createdAt: new Date().toISOString(),
          status: "placed",
          items: lines,
          address,
          province,
          payment,
          coupon: discount ? code : undefined,
          subtotal,
          discount: discount + pointsValue + creditUsed,
          delivery,
          pointsUsed,
          total,
          tracking: "TH" + Math.floor(100000000 + Math.random() * 899999999),
        };
        setOrders((o) => [order, ...o]);
        setCart([]);
        if (usedIds.length) {
          setListings((rows) => rows.map((x) => (usedIds.includes(x.id) ? { ...x, status: "sold" as const } : x)));
        }
        setInventory((inv) => {
          const n = { ...inv };
          lines.forEach((l) => {
            if (usedIds.includes(l.slug)) return;
            n[l.slug] = (n[l.slug] ?? 18) - l.qty;
          });
          return n;
        });
        const earned = Math.floor(total / 10);
        setUser({
          ...user,
          firstOrderUsed: user.firstOrderUsed || Boolean(discount && code === "WELCOME10"),
          points: user.points - pointsUsed + earned,
          credit: (user.credit || 0) - creditUsed,
        });
        return order;
      },
      addReview: (slug, rating, body) => {
        if (!user) return;
        setReviews((r) => [{ slug, name: user.name, rating, body, at: new Date().toISOString() }, ...r]);
      },
      adminSetStatus: (id, status) => {
        if (!canOps(user?.role)) return;
        setOrders((o) => o.map((x) => (x.id === id ? { ...x, status } : x)));
      },
      adminSetStock: (slug, stock) => {
        if (!canOps(user?.role)) return;
        const n = Math.max(0, Math.floor(Number(stock) || 0));
        setInventory((i) => ({ ...i, [slug]: n }));
      },
      listResale: (input) => {
        if (!user) return "Sign in to sell a spine.";
        if (!input.title.trim()) return "Pick a title first.";
        const row: ResaleListing = {
          ...input,
          id: "RS-" + Date.now().toString(36).toUpperCase(),
          createdAt: new Date().toISOString(),
          status: "pending",
          credited: false,
          sellerEmail: user.email,
          sellerName: user.name,
        };
        setListings((rows) => [row, ...rows]);
        return row;
      },
      opsSetListing: (id, status) => {
        if (!canOps(user?.role)) return;
        setListings((rows) =>
          rows.map((x) => {
            if (x.id !== id) return x;
            const next = { ...x, status };
            if (status === "listed") listingToProduct(next);
            return next;
          }),
        );
      },
    }),
    [ready, user, cart, wishlist, orders, reviews, inventory, listings],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("Store missing");
  return s;
}

export function cartCount(cart: CartLine[]) {
  return cart.reduce((n, l) => n + l.qty, 0);
}

export function productBySlug(slug: string) {
  return getCached(slug) || getProduct(slug);
}
