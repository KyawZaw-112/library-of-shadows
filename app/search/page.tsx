"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import BookCard from "@/components/BookCard";
import { searchProducts } from "@/lib/catalog";

function Results() {
  const sp = useSearchParams();
  const q = sp.get("q") || "";
  const list = searchProducts(q);
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl text-mist">Search</h1>
      <p className="text-sm text-mist/55">
        {q ? `“${q}” · ${list.length} titles` : "Type in the header search."}
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {list.map((p) => (
          <BookCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="p-8">Searching…</p>}>
      <Results />
    </Suspense>
  );
}
