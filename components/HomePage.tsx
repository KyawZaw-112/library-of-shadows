"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles, Truck } from "lucide-react";
import { bundles, genres, products } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import BookCard from "./BookCard";

export default function HomePage() {
  const { user, completeOnboarding } = useStore();
  const [localGenres, setLocalGenres] = useState<string[]>(["self-development", "english-learning"]);
  const picked = user?.genres?.length ? user.genres : localGenres;
  const recs = products
    .filter((p) => p.format === "Physical")
    .filter((p) => picked.includes(p.genreSlug) || picked.length === 0)
    .slice(0, 4);
  const show = recs.length ? recs : products.filter((p) => p.format === "Physical").slice(0, 4);

  return (
    <main className="relative mx-auto max-w-6xl px-4 pb-12">
      <section className="grid items-center gap-10 py-12 md:grid-cols-[1.15fr_0.85fr] md:py-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="mb-3 text-xs tracking-[0.35em] text-ember uppercase">Gothic bookshop · Bangkok nights</p>
          <h1 className="font-display text-5xl leading-[0.95] text-mist sm:text-6xl md:text-7xl">
            Read in the
            <span className="block italic text-ember">half-light.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-mist/70 sm:text-base">
            Curated physical books and student bundles for 18–30s who study, fall in love with plots, and chase English
            fluency between lectures.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/catalog/" className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ink">
              Browse the stacks
            </Link>
            <Link href="/onboarding/" className="rounded-full border border-ember/30 px-6 py-3 text-sm text-mist">
              60-second taste quiz
            </Link>
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
        <p className="mt-1 text-sm text-mist/55">Tap genres — Recommended follows this (sign in to save).</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {genres.map((g) => {
            const on = picked.includes(g.slug);
            return (
              <button
                key={g.slug}
                onClick={() => {
                  const next = on ? picked.filter((s) => s !== g.slug) : [...picked, g.slug];
                  if (user) completeOnboarding(next, user.goal);
                  else setLocalGenres(next);
                }}
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
          <Link href="/catalog/" className="text-xs tracking-widest text-ember/70 uppercase">
            Full catalog
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {show.map((p) => (
            <BookCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="font-display text-3xl text-mist">Specialized bundles</h2>
        <p className="mt-1 mb-5 text-sm text-mist/55">Packed like a care package from a wiser senior.</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {bundles.map((p) => (
            <BookCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="glass mb-8 grid gap-6 rounded-3xl p-6 md:grid-cols-3">
        {[
          { t: "PromptPay & cards", d: "QR at checkout, cards, e-wallets (demo)." },
          { t: "Loyalty embers", d: "1 point / ฿10. 100 points = ฿20 off." },
          { t: "Live tracking", d: "Placed → packing → shipped → delivered." },
        ].map((x) => (
          <div key={x.t}>
            <h3 className="font-display text-2xl text-ember">{x.t}</h3>
            <p className="mt-2 text-sm text-mist/65">{x.d}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
