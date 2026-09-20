"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { bundles, type Product } from "@/lib/catalog";
import { searchOpenLibrary } from "@/lib/openlibrary";
import { useStore } from "@/lib/store";
import BookCard from "./BookCard";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { HoverEffect } from "@/components/ui/hover-effect";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { ChromaticImage } from "@/components/ui/chromatic-image";
import { GenreGrid } from "@/components/ui/genre-grid";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

export default function HomePage() {
  const { user, completeOnboarding } = useStore();
  const [localGenres, setLocalGenres] = useState<string[]>(["self-development", "english-learning"]);
  const picked = user?.genres?.length ? user.genres : localGenres;
  const [show, setShow] = useState<Product[]>([]);
  const [bento, setBento] = useState<Product[]>([]);

  useEffect(() => {
    const g = picked[0] || "fiction";
    searchOpenLibrary({ genreSlug: g, limit: 12 })
      .then((rows) => {
        setShow(rows.slice(0, 4));
        setBento(rows.slice(0, 6));
      })
      .catch(() => {
        setShow([]);
        setBento([]);
      });
  }, [picked.join("|")]);

  return (
    <main className="relative mx-auto max-w-6xl px-4 pb-24">
      <section className="relative grid items-center gap-16 overflow-hidden py-16 md:grid-cols-2 md:py-28">
        <div>
          <p className="mb-4 text-[11px] tracking-[0.35em] text-white/45 uppercase">Bangkok · Students & young adults 18–30</p>
          <TextGenerateEffect
            words="Find your next story."
            className="text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl"
          />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
            Affordable books. Personal recommendations. Open Library titles, student bundles, PromptPay, home delivery.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/catalog/"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
              >
                Browse the stacks
              </Link>
            </motion.div>
            <Link
              href="/onboarding/"
              className="rounded-full border border-white/20 px-6 py-3 text-sm text-white hover:border-white/50"
            >
              60-second taste quiz
            </Link>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto h-[340px] w-full max-w-sm"
        >
          <div className="absolute inset-0 border border-white/12" />
          {bento[0]?.cover ? (
            <ChromaticImage src={bento[0].cover} grayscale className="absolute inset-4" />
          ) : (
            <div className="absolute inset-4 bg-white/[0.03]" />
          )}
          <p className="absolute bottom-6 left-0 w-full text-center font-display text-xl text-white">Tonight&apos;s shelf</p>
        </motion.div>
      </section>

      {bento.length > 0 && (
        <Reveal className="mb-24">
          <h2 className="mb-8 font-display text-3xl text-white md:text-4xl">Chromatic stacks</h2>
          <BentoGrid>
            {bento.map((p, i) => (
              <BentoGridItem
                key={p.id}
                className={i === 0 || i === 3 ? "md:col-span-2" : ""}
                title={p.title}
                description={p.author}
                header={<ChromaticImage src={p.cover} grayscale />}
              />
            ))}
          </BentoGrid>
        </Reveal>
      )}

      <Reveal className="mb-24">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
          <h2 className="font-display text-3xl text-white md:text-4xl">What haunts your TBR?</h2>
          <span className="shrink-0 text-[11px] tracking-[0.2em] text-white/35 uppercase">
            {picked.length} picked
          </span>
        </div>
        <p className="mb-7 text-sm text-white/45">Pick your genres — Recommended follows this.</p>
        <GenreGrid
          picked={picked}
          onToggle={(slug) => {
            const on = picked.includes(slug);
            const next = on ? picked.filter((s) => s !== slug) : [...picked, slug];
            if (user) completeOnboarding(next, user.goal);
            else setLocalGenres(next);
          }}
        />
      </Reveal>

      <Reveal className="mb-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl text-white md:text-4xl">Recommended</h2>
          <Link href="/catalog/" className="text-[11px] tracking-[0.2em] text-white/70 uppercase">
            Catalog
          </Link>
        </div>
        <RevealGroup className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {show.map((p) => (
            <RevealItem key={p.id}>
              <BookCard product={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Reveal>

      <Reveal className="mb-24">
        <h2 className="font-display text-3xl text-white md:text-4xl">Bundles</h2>
        <p className="mt-2 mb-8 text-sm text-white/45">A care package from a wiser senior.</p>
        <div className="grid gap-5 sm:grid-cols-3">
          {bundles.slice(0, 3).map((p) => (
            <BookCard key={p.id} product={p} />
          ))}
        </div>
      </Reveal>

      <Reveal className="mb-24">
        <HoverEffect
          items={[
            { title: "PromptPay & cards", description: "QR at checkout, cards, e-wallets." },
            { title: "Loyalty", description: "1 point / ฿10. 100 points = ฿20 off." },
            { title: "Tracking", description: "Placed → packing → shipped → delivered." },
          ]}
        />
      </Reveal>

      <Reveal>
        <h2 className="mb-6 font-display text-3xl text-white md:text-4xl">Notes from readers</h2>
        <InfiniteMovingCards
          items={[
            { quote: "The bundles feel like a wiser senior packed my bag.", name: "Nalinee", title: "Chula, 2nd year" },
            { quote: "Finally a shop that recommends instead of dumping 10,000 SKUs.", name: "Min", title: "English learner" },
            { quote: "PromptPay at midnight. Book on my desk in two days.", name: "Ploy", title: "Bangkok" },
            { quote: "Chromatic covers, quiet type — I actually want to browse.", name: "Aung", title: "ABAC" },
          ]}
        />
      </Reveal>
    </main>
  );
}
