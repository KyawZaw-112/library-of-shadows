"use client";

import { useMemo, useState } from "react";
import BookCard from "@/components/BookCard";
import { genres, products } from "@/lib/catalog";

export default function CatalogPage() {
  const [genre, setGenre] = useState("all");
  const [format, setFormat] = useState("all");
  const [sort, setSort] = useState("featured");
  const [max, setMax] = useState(1200);

  const list = useMemo(() => {
    let rows = products.filter((p) => p.price <= max);
    if (genre !== "all") rows = rows.filter((p) => p.genreSlug === genre);
    if (format !== "all") rows = rows.filter((p) => p.format === format);
    if (sort === "price") rows = [...rows].sort((a, b) => a.price - b.price);
    if (sort === "rating") rows = [...rows].sort((a, b) => b.rating - a.rating);
    return rows;
  }, [genre, format, sort, max]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl text-mist">The stacks</h1>
      <p className="mt-1 text-sm text-mist/55">Filter by genre, format, price, rating.</p>
      <div className="mt-6 mb-8 flex flex-wrap gap-3">
        <select value={genre} onChange={(e) => setGenre(e.target.value)} className="glass rounded-full px-3 py-2 text-sm">
          <option value="all">All genres</option>
          {genres.map((g) => (
            <option key={g.slug} value={g.slug}>
              {g.name}
            </option>
          ))}
        </select>
        <select value={format} onChange={(e) => setFormat(e.target.value)} className="glass rounded-full px-3 py-2 text-sm">
          <option value="all">All formats</option>
          <option value="Physical">Physical books</option>
          <option value="Bundle">Bundles</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="glass rounded-full px-3 py-2 text-sm">
          <option value="featured">Featured</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-mist/70">
          Max {max}
          <input type="range" min={250} max={1200} value={max} onChange={(e) => setMax(+e.target.value)} />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {list.map((p) => (
          <BookCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
