"use client";

import BookCard from "@/components/BookCard";
import { productBySlug, useStore } from "@/lib/store";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = wishlist.map(productBySlug).filter(Boolean);
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl text-mist">Wishlist</h1>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((p) => (
          <BookCard key={p!.id} product={p!} />
        ))}
      </div>
      {!items.length && <p className="mt-6 text-mist/50">No saved spines yet.</p>}
    </main>
  );
}
