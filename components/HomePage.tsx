"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookMarked,
  Heart,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  MessageCircle,
} from "lucide-react";
import { bundles, genres, recommended, type Product } from "@/lib/catalog";

const thb = (n: number) =>
  new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", maximumFractionDigits: 0 }).format(n);

function BookSpine({ product }: { product: Product }) {
  return (
    <article className="group glass candle relative flex min-w-[220px] flex-1 flex-col overflow-hidden rounded-2xl p-4 transition hover:-translate-y-1">
      <div className={`mb-4 aspect-[3/4] rounded-xl bg-gradient-to-br ${product.cover} ring-1 ring-ember/20`}>
        <div className="flex h-full flex-col justify-between p-4">
          <span className="font-display text-xs tracking-[0.25em] text-ember/80 uppercase">LOS</span>
          <p className="font-display text-2xl leading-tight text-mist">{product.title}</p>
        </div>
      </div>
      {product.tag && (
        <span className="absolute right-6 top-6 rounded-full bg-ember/15 px-2 py-0.5 text-[10px] tracking-widest text-ember uppercase">
          {product.tag}
        </span>
      )}
      <p className="text-xs text-mist/60">{product.author}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-display text-xl text-ember">{thb(product.price)}</span>
        <span className="flex items-center gap-1 text-xs text-mist/70">
          <Star className="h-3.5 w-3.5 fill-ember text-ember" />
          {product.rating}
        </span>
      </div>
      <button className="mt-3 w-full rounded-full bg-ember/90 py-2 text-sm font-medium text-ink transition hover:bg-ember">
        Add to cart
      </button>
    </article>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<string[]>(["self-development", "english-learning"]);
  const [cartCount] = useState(2);

  const suggestions = useMemo(() => {
    const pool = [...recommended, ...bundles];
    if (!query.trim()) return pool.slice(0, 3);
    return pool.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  }, [query]);

  const toggleGenre = (slug: string) =>
    setPicked((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_at_top,_rgba(232,184,109,0.16),_transparent_55%),radial-gradient(ellipse_at_20%_40%,_rgba(42,18,36,0.9),_transparent_50%),radial-gradient(ellipse_at_90%_10%,_rgba(16,24,42,0.85),_transparent_45%)]"
        aria-hidden
      />

      <header className="sticky top-0 z-40 border-b border-ember/10 bg-ink/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <BookMarked className="h-6 w-6 text-ember" />
          <div className="min-w-0">
            <p className="font-display text-lg leading-none text-mist">Library of Shadows</p>
            <p className="hidden text-[10px] tracking-[0.3em] text-ember/70 uppercase sm:block">Open after dusk</p>
          </div>
          <div className="relative ml-auto flex-1 max-w-md">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-mist/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, authors, bundles…"
              className="w-full rounded-full border border-ember/15 bg-navy/40 py-2 pr-3 pl-9 text-sm text-mist outline-none placeholder:text-mist/35 focus:border-ember/40"
            />
            {query && (
              <ul className="glass absolute right-0 left-0 z-10 mt-2 overflow-hidden rounded-xl text-sm">
                {suggestions.map((s) => (
                  <li key={s.id} className="cursor-pointer px-4 py-2 hover:bg-ember/10">
                    {s.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="rounded-full p-2 text-mist/80 hover:bg-ember/10" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
          </button>
          <button className="relative rounded-full p-2 text-mist/80 hover:bg-ember/10" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-ember text-[10px] text-ink">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 pb-28">
        <section className="grid items-center gap-10 py-12 md:grid-cols-[1.15fr_0.85fr] md:py-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-3 text-xs tracking-[0.35em] text-ember uppercase">Gothic bookshop · Bangkok nights</p>
            <h1 className="font-display text-5xl leading-[0.95] text-mist sm:text-6xl md:text-7xl">
              Read in the
              <span className="block italic text-ember">half-light.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-mist/70 sm:text-base">
              Curated physical books and student bundles for 18–30s who study, fall in love with plots, and chase
              English fluency between lectures.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#catalog" className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ink">
                Browse the stacks
              </a>
              <a href="#quiz" className="rounded-full border border-ember/30 px-6 py-3 text-sm text-mist">
                60-second taste quiz
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-xs text-mist/55">
              <span className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-ember" /> Tracked delivery
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-ember" /> WELCOME10 first order
              </span>
              <span className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-ember" /> LINE support
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass relative mx-auto h-[340px] w-full max-w-sm rounded-[2rem] p-6"
          >
            <div className="absolute -top-3 left-1/2 h-8 w-16 -translate-x-1/2 rounded-b-full bg-ember/30 blur-md" />
            <p className="font-display text-sm tracking-widest text-ember uppercase">Tonight&apos;s shelf</p>
            <div className="mt-6 flex h-56 items-end justify-center gap-2">
              {[48, 72, 56, 88, 64, 76, 52].map((h, i) => (
                <div
                  key={i}
                  className="w-7 rounded-t-sm"
                  style={{
                    height: h,
                    background: `linear-gradient(180deg, ${i % 2 ? "#e8b86d" : "#d48aa8"} 0%, #1a1018 100%)`,
                    opacity: 0.55 + (i % 3) * 0.15,
                  }}
                />
              ))}
            </div>
            <p className="mt-4 text-center font-display text-2xl italic text-mist/80">Candlelit inventory</p>
          </motion.div>
        </section>

        <section id="quiz" className="mb-16">
          <h2 className="font-display text-3xl text-mist">What haunts your TBR?</h2>
          <p className="mt-1 text-sm text-mist/55">Pick genres — we light the Recommended aisle from this.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {genres.map((g) => {
              const on = picked.includes(g.slug);
              return (
                <button
                  key={g.slug}
                  onClick={() => toggleGenre(g.slug)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    on ? "border-ember bg-ember/20 text-ember" : "border-ember/15 text-mist/70 hover:border-ember/40"
                  }`}
                >
                  {g.name}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="font-display text-3xl text-mist">Recommended for you</h2>
            <span className="text-xs tracking-widest text-ember/70 uppercase">{picked.length} tastes lit</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
            {recommended.map((p) => (
              <BookSpine key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section id="catalog" className="mb-16">
          <h2 className="font-display text-3xl text-mist">Specialized bundles</h2>
          <p className="mt-1 mb-5 text-sm text-mist/55">Packed like a care package from a wiser senior.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {bundles.map((p) => (
              <BookSpine key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section className="glass mb-16 grid gap-6 rounded-3xl p-6 md:grid-cols-3">
          {[
            { t: "PromptPay & cards", d: "QR at checkout, Stripe wallets, e-wallets." },
            { t: "Loyalty embers", d: "Points on every paid order — redeem on the next midnight haul." },
            { t: "Live tracking", d: "Placed → packing → shipped → delivered, in real time." },
          ].map((x) => (
            <div key={x.t}>
              <h3 className="font-display text-2xl text-ember">{x.t}</h3>
              <p className="mt-2 text-sm text-mist/65">{x.d}</p>
            </div>
          ))}
        </section>
      </main>

      <nav className="fixed right-0 bottom-0 left-0 z-40 border-t border-ember/10 bg-ink/85 backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-4 py-2 text-[10px] tracking-wide text-mist/70 uppercase">
          {["Home", "Catalog", "Cart", "Account"].map((l) => (
            <span key={l} className="text-center">
              {l}
            </span>
          ))}
        </div>
      </nav>

      <footer className="border-t border-ember/10 px-4 py-10 text-center">
        <p className="font-display text-2xl text-mist">Library of Shadows</p>
        <p className="mt-2 text-xs text-mist/45">FAQ · LINE Official · Returns · Admin portal</p>
      </footer>
    </div>
  );
}
