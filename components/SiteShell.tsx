"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { BookMarked, Heart, Search, ShoppingBag, User } from "lucide-react";
import { searchProducts } from "@/lib/catalog";
import { cartCount, useStore } from "@/lib/store";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const { cart, wishlist, user } = useStore();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const hits = useMemo(() => (q.trim() ? searchProducts(q).slice(0, 6) : []), [q]);

  const go = (e: FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    setOpen(false);
    router.push(`/search/?q=${encodeURIComponent(q.trim())}`);
  };

  const hideChrome = path.startsWith("/admin");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink pb-16 md:pb-0">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh] bg-[radial-gradient(ellipse_at_top,_rgba(232,184,109,0.12),_transparent_55%),radial-gradient(ellipse_at_20%_30%,_rgba(42,18,36,0.8),_transparent_50%)]"
        aria-hidden
      />
      {!hideChrome && (
        <header className="sticky top-0 z-40 border-b border-ember/10 bg-ink/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <BookMarked className="h-6 w-6 text-ember" />
              <div className="min-w-0">
                <p className="font-display text-lg leading-none text-mist">Library of Shadows</p>
                <p className="hidden text-[10px] tracking-[0.3em] text-ember/70 uppercase sm:block">Find your next story</p>
              </div>
            </Link>
            <nav className="ml-4 hidden gap-4 text-sm text-mist/70 md:flex">
              <Link href="/catalog/" className="hover:text-ember">
                Catalog
              </Link>
              <Link href="/about/" className="hover:text-ember">
                About
              </Link>
              <Link href="/support/" className="hover:text-ember">
                Support
              </Link>
              {user?.isAdmin && (
                <Link href="/admin/" className="hover:text-ember">
                  Admin
                </Link>
              )}
            </nav>
            <form onSubmit={go} className="relative ml-auto flex-1 max-w-md">
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-mist/40" />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                placeholder="Search titles, authors, bundles…"
                className="w-full rounded-full border border-ember/15 bg-navy/40 py-2 pr-3 pl-9 text-sm text-mist outline-none placeholder:text-mist/35 focus:border-ember/40"
              />
              {open && hits.length > 0 && (
                <ul className="glass absolute right-0 left-0 z-10 mt-2 overflow-hidden rounded-xl text-sm">
                  {hits.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/product/${s.slug}/`}
                        className="block px-4 py-2 hover:bg-ember/10"
                        onClick={() => setOpen(false)}
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </form>
            <Link href="/wishlist/" className="relative rounded-full p-2 text-mist/80 hover:bg-ember/10" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose px-0.5 text-[10px] text-ink">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link href="/cart/" className="relative rounded-full p-2 text-mist/80 hover:bg-ember/10" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              {cartCount(cart) > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-ember px-0.5 text-[10px] text-ink">
                  {cartCount(cart)}
                </span>
              )}
            </Link>
            <Link href={user ? "/account/" : "/login/"} className="rounded-full p-2 text-mist/80 hover:bg-ember/10" aria-label="Account">
              <User className="h-5 w-5" />
            </Link>
          </div>
        </header>
      )}
      <div className="relative">{children}</div>
      {!hideChrome && (
        <>
          <footer className="mt-16 border-t border-ember/10 px-4 py-10 text-center">
            <p className="font-display text-2xl text-mist">Library of Shadows</p>
            <p className="mt-2 text-xs text-mist/45">
              <Link href="/about/">About</Link> · <Link href="/business/">Business model</Link> ·{" "}
              <Link href="/support/">FAQ</Link> · LINE · TikTok · Instagram ·{" "}
              <Link href="/admin/">Admin</Link>
            </p>
          </footer>
          <nav className="fixed right-0 bottom-0 left-0 z-40 border-t border-ember/10 bg-ink/85 backdrop-blur-xl md:hidden">
            <div className="grid grid-cols-4 py-2 text-[10px] tracking-wide text-mist/70 uppercase">
              <Link href="/" className="text-center">
                Home
              </Link>
              <Link href="/catalog/" className="text-center">
                Catalog
              </Link>
              <Link href="/cart/" className="text-center">
                Cart
              </Link>
              <Link href={user ? "/account/" : "/login/"} className="text-center">
                Account
              </Link>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
