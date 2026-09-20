"use client";

import BookCard from "@/components/BookCard";
import { productBySlug, useStore } from "@/lib/store";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = wishlist.map(productBySlug).filter(Boolean);
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <Reveal>
      <h1 className="font-display text-5xl text-white">Wishlist</h1>
      </Reveal>
      <RevealGroup className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
        {items.map((p) => (
          <RevealItem key={p!.id}>
            <BookCard product={p!} />
          </RevealItem>
        ))}
      </RevealGroup>
      {!items.length && <p className="mt-6 text-white/45">No saved spines yet.</p>}
    </main>
  );
}
