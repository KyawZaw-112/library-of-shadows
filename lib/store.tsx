"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, provinces, type Product } from "./catalog";

export type User = {
  email: string;
  name: string;
  isAdmin: boolean;
  genres: string[];
  goal: string;
  points: number;
  firstOrderUsed: boolean;
};

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
  logout: () => void;
  completeOnboarding: (genres: string[], goal: string) => void;
  addToCart: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  toggleWish: (slug: string) => void;
  placeOrder: (input: {
    address: string;
    province: string;
    payment: string;
    coupon: string;
    usePoints: boolean;
  }) => Order | string;
  addReview: (slug: string, rating: number, body: string) => void;
  adminSetStatus: (id: string, status: OrderStatus) => void;
  adminSetStock: (slug: string, stock: number) => void;
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

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        setUser(d.user ?? null);
        setCart(d.cart ?? []);
        setWishlist(d.wishlist ?? []);
        setOrders(d.orders ?? []);
        setReviews(d.reviews ?? []);
        setInventory({ ...defaultInv(), ...(d.inventory ?? {}) });
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify({ user, cart, wishlist, orders, reviews, inventory }));
  }, [ready, user, cart, wishlist, orders, reviews, inventory]);

  const api = useMemo<Store>(
    () => ({
      ready,
      user,
      cart,
      wishlist,
      orders,
      reviews,
      inventory,
      login: (email, name, extra) => {
        const isAdmin = email.toLowerCase().includes("admin");
        setUser({
          email,
          name: name || email.split("@")[0],
          isAdmin,
          genres: extra?.genres ?? [],
          goal: extra?.goal ?? "mixed",
          points: isAdmin ? 0 : 80,
          firstOrderUsed: false,
        });
      },
      logout: () => setUser(null),
      completeOnboarding: (genres, goal) => setUser((u) => (u ? { ...u, genres, goal } : u)),
      addToCart: (slug, qty = 1) =>
        setCart((c) => {
          const i = c.find((l) => l.slug === slug);
          if (i) return c.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
          return [...c, { slug, qty }];
        }),
      setQty: (slug, qty) => setCart((c) => (qty <= 0 ? c.filter((l) => l.slug !== slug) : c.map((l) => (l.slug === slug ? { ...l, qty } : l)))),
      toggleWish: (slug) => setWishlist((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug])),
      placeOrder: ({ address, province, payment, coupon, usePoints }) => {
        if (!user) return "Please sign in first.";
        if (!cart.length) return "Cart is empty.";
        const lines = cart.map((l) => {
          const p = products.find((x) => x.slug === l.slug) as Product;
          return { slug: l.slug, title: p.title, qty: l.qty, price: p.price };
        });
        for (const l of lines) {
          if ((inventory[l.slug] ?? 0) < l.qty) return `Not enough stock for ${l.title}`;
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
        const total = Math.max(0, subtotal - discount - pointsValue + delivery);
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
          discount: discount + pointsValue,
          delivery,
          pointsUsed,
          total,
          tracking: "TH" + Math.floor(100000000 + Math.random() * 899999999),
        };
        setOrders((o) => [order, ...o]);
        setCart([]);
        setInventory((inv) => {
          const n = { ...inv };
          lines.forEach((l) => {
            n[l.slug] = (n[l.slug] ?? 0) - l.qty;
          });
          return n;
        });
        const earned = Math.floor(total / 10);
        setUser({
          ...user,
          firstOrderUsed: user.firstOrderUsed || Boolean(discount && code === "WELCOME10"),
          points: user.points - pointsUsed + earned,
        });
        return order;
      },
      addReview: (slug, rating, body) => {
        if (!user) return;
        setReviews((r) => [{ slug, name: user.name, rating, body, at: new Date().toISOString() }, ...r]);
      },
      adminSetStatus: (id, status) => setOrders((o) => o.map((x) => (x.id === id ? { ...x, status } : x))),
      adminSetStock: (slug, stock) => setInventory((i) => ({ ...i, [slug]: stock })),
    }),
    [ready, user, cart, wishlist, orders, reviews, inventory],
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
  return products.find((p) => p.slug === slug);
}
