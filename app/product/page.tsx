"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Heart, Star } from "lucide-react";
import { getProduct, type Product } from "@/lib/catalog";
import { fetchWork, getCached } from "@/lib/openlibrary";
import { thb } from "@/lib/money";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/ui/reveal";
import { ProductSkeleton } from "@/components/ui/skeleton";
import { useFly } from "@/components/ui/fly-to-cart";
import { motion } from "framer-motion";

function Detail() {
  const id = useSearchParams().get("id") || "";
  const { addToCart, toggleWish, wishlist, inventory, reviews, addReview, user } = useStore();
  const fly = useFly();
  const coverRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState<Product | undefined>(getCached(id) || getProduct(id));
  const [stars, setStars] = useState(5);
  const [body, setBody] = useState("");

  useEffect(() => {
    if (!id) return;
    const local = getProduct(id);
    if (local) {
      setP(local);
      return;
    }
    void fetchWork(id).then(setP);
  }, [id]);

  if (!id) return <p className="p-8">Missing book id.</p>;
  if (!p) return <ProductSkeleton />;

  const stock = inventory[p.slug] ?? p.stock;
  const mine = reviews.filter((r) => r.slug === p.slug);
  const coverImg = p.cover.startsWith("http");

  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2">
      <Reveal className="aspect-[3/4] overflow-hidden border border-white/10">
        <div ref={coverRef} className="h-full w-full">
        {coverImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.cover} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover grayscale" />
        ) : (
          <div className="h-full bg-white/[0.03]" />
        )}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-[11px] tracking-[0.25em] text-white/50 uppercase">
          {p.genre} · {p.format} · Open Library
        </p>
        <h1 className="mt-3 font-display text-4xl text-white md:text-5xl">{p.title}</h1>
        <p className="mt-1 text-white/50">{p.author}</p>
        <p className="mt-3 flex items-center gap-1 text-sm text-white/55">
          <Star className="h-4 w-4 text-white/70" /> {p.rating} ({p.ratingCount + mine.length})
        </p>
        <p className="mt-6 font-display text-3xl text-white">{thb(p.price)}</p>
        <p className="mt-5 text-sm leading-relaxed text-white/60 whitespace-pre-line">{p.description}</p>
        <p className="mt-4 text-xs text-white/35">SKU {p.sku} · Stock {stock}</p>
        <div className="mt-8 flex gap-3">
          <motion.button
            disabled={stock <= 0}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              fly(coverRef.current);
              addToCart(p);
            }}
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-40"
          >
            Add to cart
          </motion.button>
          <button onClick={() => toggleWish(p.slug)} className="rounded-full border border-white/15 px-4 py-3 hover:border-white/40">
            <Heart className={`h-4 w-4 ${wishlist.includes(p.slug) ? "fill-white text-white" : "text-white/70"}`} />
          </button>
        </div>
        <Link href="/catalog/" className="mt-8 inline-block text-sm text-white/60">
          ← Back to stacks
        </Link>
        <p className="mt-4 text-[11px] text-white/30">
          Bibliographic data © Open Library contributors ·{" "}
          <a href={`https://openlibrary.org/works/${p.slug}`} className="underline" target="_blank" rel="noreferrer">
            source
          </a>
        </p>

        <section className="mt-12">
          <h2 className="font-display text-2xl text-white">Reviews</h2>
          {user ? (
            <form
              className="mt-3 space-y-2"
              onSubmit={(e) => {
                e.preventDefault();
                addReview(p.slug, stars, body);
                setBody("");
              }}
            >
              <select value={stars} onChange={(e) => setStars(+e.target.value)} className="glass rounded-lg px-2 py-1 text-sm">
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} stars
                  </option>
                ))}
              </select>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                placeholder="How did it read in the half-light?"
                className="glass w-full rounded-xl p-3 text-sm text-white placeholder:text-white/30"
              />
              <button className="rounded-full bg-white px-4 py-1.5 text-sm text-black">Post review</button>
            </form>
          ) : (
            <p className="mt-3 text-sm text-white/40">
              <Link href="/login/" className="text-white underline">
                Sign in
              </Link>{" "}
              to review.
            </p>
          )}
          <ul className="mt-5 space-y-3">
            {mine.map((r, i) => (
              <li key={i} className="glass rounded-xl p-3 text-sm">
                <p className="text-white/85">
                  {r.name} · {r.rating}★
                </p>
                <p className="text-white/60">{r.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>
    </main>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <Detail />
    </Suspense>
  );
}
