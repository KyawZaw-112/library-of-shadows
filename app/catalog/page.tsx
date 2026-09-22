"use client";

import { useEffect, useMemo, useState } from "react";
import BookCard from "@/components/BookCard";
import { bundles, genres, type Product } from "@/lib/catalog";
import { searchOpenLibrary } from "@/lib/openlibrary";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { BookGridSkeleton, HeadingSkeleton } from "@/components/ui/skeleton";
import { listingToProduct } from "@/lib/resale";
import { useStore } from "@/lib/store";

export default function CatalogPage() {
  const [genre, setGenre] = useState("all");
  const [format, setFormat] = useState("all");
  const [sort, setSort] = useState("featured");
  const [max, setMax] = useState(1200);
  const [books, setBooks] = useState<Product[]>([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const { listings } = useStore();
  const used = listings.filter((l) => l.status === "listed").map(listingToProduct);

  useEffect(() => {
    let live = true;
    setLoading(true);
    const genreSlug = genre === "all" ? undefined : genre;
    searchOpenLibrary({ genreSlug, q: genre === "all" ? "bestseller" : undefined, limit: 32 })
      .then((rows) => {
        if (live) setBooks(rows);
      })
      .catch(() => live && setErr("Open Library is unreachable right now."))
      .finally(() => live && setLoading(false));
    return () => {
      live = false;
    };
  }, [genre]);

  const list = useMemo(() => {
    let rows =
      format === "Bundle"
        ? [...bundles]
        : format === "Used"
          ? [...used]
          : [...books, ...used, ...(format === "all" ? bundles : [])];
    rows = rows.filter((p) => p.price <= max);
    if (format === "Physical") rows = rows.filter((p) => p.format === "Physical");
    if (sort === "price") rows = [...rows].sort((a, b) => a.price - b.price);
    if (sort === "rating") rows = [...rows].sort((a, b) => b.rating - a.rating);
    return rows;
  }, [books, format, sort, max, used]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <Reveal>
      <h1 className="font-display text-5xl text-white">The stacks</h1>
      <p className="mt-2 text-sm text-white/45">Open Library · pre-loved trade-ins · ฿249 / ฿299 / ฿499</p>
      </Reveal>
      <div className="mt-6 mb-8 flex flex-wrap gap-3">
        <select value={genre} onChange={(e) => setGenre(e.target.value)} className="glass rounded-full px-3 py-2 text-sm text-white">
          <option value="all">All genres</option>
          {genres.map((g) => (
            <option key={g.slug} value={g.slug}>
              {g.name}
            </option>
          ))}
        </select>
        <select value={format} onChange={(e) => setFormat(e.target.value)} className="glass rounded-full px-3 py-2 text-sm text-white">
          <option value="all">All formats</option>
          <option value="Physical">Physical books</option>
          <option value="Used">Pre-loved</option>
          <option value="Bundle">Bundles</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="glass rounded-full px-3 py-2 text-sm text-white">
          <option value="featured">Featured</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-white/70">
          Max {max}
          <input type="range" min={250} max={1200} value={max} onChange={(e) => setMax(+e.target.value)} className="accent-white" />
        </label>
      </div>
      {loading ? (
        <>
          <div className="mb-8">
            <HeadingSkeleton />
          </div>
          <BookGridSkeleton count={8} />
        </>
      ) : err ? (
        <p className="text-sm text-white">{err}</p>
      ) : (
        <RevealGroup className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {list.map((p) => (
            <RevealItem key={p.id}>
              <BookCard product={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </main>
  );
}
