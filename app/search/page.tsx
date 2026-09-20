"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import BookCard from "@/components/BookCard";
import { type Product } from "@/lib/catalog";
import { searchOpenLibrary } from "@/lib/openlibrary";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { BookGridSkeleton } from "@/components/ui/skeleton";

function Results() {
  const q = useSearchParams().get("q") || "";
  const [list, setList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q.trim()) {
      setList([]);
      return;
    }
    setLoading(true);
    searchOpenLibrary({ q, limit: 24 })
      .then(setList)
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <Reveal>
      <h1 className="font-display text-5xl text-white">Search</h1>
      <p className="text-sm text-white/45">Open Library · {q ? `“${q}”` : "Type in the header."}</p>
      </Reveal>
      {loading && (
        <div className="mt-10">
          <BookGridSkeleton count={8} />
        </div>
      )}
      <RevealGroup className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
        {list.map((p) => (
          <RevealItem key={p.id}>
            <BookCard product={p} />
          </RevealItem>
        ))}
      </RevealGroup>
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
