"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Star } from "lucide-react";
import { getProduct } from "@/lib/catalog";
import { thb } from "@/lib/money";
import { useStore } from "@/lib/store";

export default function ProductView({ slug }: { slug: string }) {
  const p = getProduct(slug);
  const { addToCart, toggleWish, wishlist, inventory, reviews, addReview, user } = useStore();
  const [stars, setStars] = useState(5);
  const [body, setBody] = useState("");
  if (!p) return <p className="p-8">Not found.</p>;
  const stock = inventory[p.slug] ?? p.stock;
  const mine = reviews.filter((r) => r.slug === p.slug);

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2">
      <div className={`aspect-[3/4] rounded-3xl bg-gradient-to-br ${p.cover} ring-1 ring-ember/20`} />
      <div>
        <p className="text-xs tracking-widest text-ember uppercase">{p.genre} · {p.format}</p>
        <h1 className="mt-2 font-display text-4xl text-mist">{p.title}</h1>
        <p className="text-mist/60">{p.author}</p>
        <p className="mt-2 flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-ember text-ember" /> {p.rating} ({p.ratingCount + mine.length})
        </p>
        <p className="mt-4 font-display text-3xl text-ember">
          {thb(p.price)}
          {p.compareAt && <span className="ml-2 text-lg text-mist/40 line-through">{thb(p.compareAt)}</span>}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-mist/70">{p.description}</p>
        {p.contents && (
          <ul className="mt-4 list-disc pl-5 text-sm text-mist/65">
            {p.contents.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-xs text-mist/45">SKU {p.sku} · Stock {stock}</p>
        <div className="mt-6 flex gap-3">
          <button
            disabled={stock <= 0}
            onClick={() => addToCart(p.slug)}
            className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ink disabled:opacity-40"
          >
            Add to cart
          </button>
          <button onClick={() => toggleWish(p.slug)} className="rounded-full border border-ember/30 px-4 py-3">
            <Heart className={`h-4 w-4 ${wishlist.includes(p.slug) ? "fill-rose text-rose" : ""}`} />
          </button>
        </div>
        <Link href="/catalog/" className="mt-6 inline-block text-sm text-ember/80">
          ← Back to stacks
        </Link>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-mist">Reviews</h2>
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
                className="glass w-full rounded-xl p-3 text-sm"
              />
              <button className="rounded-full bg-ember/90 px-4 py-1.5 text-sm text-ink">Post review</button>
            </form>
          ) : (
            <p className="mt-2 text-sm text-mist/50">
              <Link href="/login/" className="text-ember">
                Sign in
              </Link>{" "}
              to review.
            </p>
          )}
          <ul className="mt-4 space-y-3">
            {mine.map((r, i) => (
              <li key={i} className="glass rounded-xl p-3 text-sm">
                <p className="text-ember">
                  {r.name} · {r.rating}★
                </p>
                <p className="text-mist/70">{r.body}</p>
              </li>
            ))}
            {!mine.length && <li className="text-sm text-mist/40">No reviews yet — be the first lamp.</li>}
          </ul>
        </section>
      </div>
    </main>
  );
}
