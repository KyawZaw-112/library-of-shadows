"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { BookMarked, Heart, Home, Library, Search, User } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { searchOpenLibrary } from "@/lib/openlibrary";
import { useStore } from "@/lib/store";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { SiteFooter } from "@/components/ui/site-footer";
import { CartButton } from "@/components/ui/cart-button";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const { wishlist, user } = useStore();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const [hits, setHits] = useState<Product[]>([]);
  useEffect(() => {
    if (!q.trim()) {
      setHits([]);
      return;
    }
    const t = setTimeout(() => {
      searchOpenLibrary({ q, limit: 6 })
        .then(setHits)
        .catch(() => setHits([]));
    }, 280);
    return () => clearTimeout(t);
  }, [q]);

  const go = (e: FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    setOpen(false);
    router.push(`/search/?q=${encodeURIComponent(q.trim())}`);
  };

  const hideChrome = path.startsWith("/admin") || path.startsWith("/ops") || path.startsWith("/owner");
  const navItems = [
    { name: "Home", link: "/", icon: <Home className="h-4 w-4" /> },
    { name: "Catalog", link: "/catalog/", icon: <Library className="h-4 w-4" /> },
    { name: "About", link: "/about/", icon: <BookMarked className="h-4 w-4" /> },
    { name: "Cart", link: "/cart/", icon: null },
    { name: user ? "Account" : "Login", link: user ? "/account/" : "/login/", icon: <User className="h-4 w-4" /> },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink pb-16 md:pb-0">
      {!hideChrome && (
        <>
          <FloatingNav navItems={navItems} />
          <div className="relative z-20 mx-auto flex max-w-6xl items-center gap-3 px-4 pt-20 pb-3">
            <form onSubmit={go} className="relative flex-1">
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-white/35" />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                placeholder="Search Open Library…"
                autoComplete="off"
                suppressHydrationWarning
                className="w-full rounded-full border border-white/12 bg-white/[0.03] py-2 pr-3 pl-9 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/40"
              />
              {open && hits.length > 0 && (
                <ul className="glass absolute right-0 left-0 z-10 mt-2 overflow-hidden rounded-xl text-sm">
                  {hits.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/product/?id=${encodeURIComponent(s.slug)}`}
                        className="block px-4 py-2 hover:bg-white/10"
                        onClick={() => setOpen(false)}
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </form>
            <Link href="/wishlist/" className="relative rounded-full p-2 text-white/70 hover:bg-white/10" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-white px-0.5 text-[10px] text-black">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <CartButton />
          </div>
        </>
      )}
      <div className="relative z-10">{children}</div>
      {!hideChrome && <SiteFooter />}
    </div>
  );
}
