"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { thb } from "@/lib/money";
import { useStore } from "@/lib/store";

export default function BookCard({ product }: { product: Product }) {
  const { addToCart, toggleWish, wishlist, inventory } = useStore();
  const stock = inventory[product.slug] ?? product.stock;
  const loved = wishlist.includes(product.slug);

  return (
    <article className="group glass candle relative flex flex-col overflow-hidden rounded-2xl p-4 transition hover:-translate-y-1">
      <Link href={`/product/${product.slug}/`} className="block">
        <div className={`mb-4 aspect-[3/4] rounded-xl bg-gradient-to-br ${product.cover} ring-1 ring-ember/20`}>
          <div className="flex h-full flex-col justify-between p-4">
            <span className="font-display text-xs tracking-[0.25em] text-ember/80 uppercase">LOS</span>
            <p className="font-display text-2xl leading-tight text-mist">{product.title}</p>
          </div>
        </div>
      </Link>
      {product.tag && (
        <span className="absolute top-6 right-6 rounded-full bg-ember/15 px-2 py-0.5 text-[10px] tracking-widest text-ember uppercase">
          {product.tag}
        </span>
      )}
      <button
        type="button"
        onClick={() => toggleWish(product.slug)}
        className="absolute top-6 left-6 rounded-full bg-ink/40 p-1.5"
        aria-label="Wishlist"
      >
        <Heart className={`h-4 w-4 ${loved ? "fill-rose text-rose" : "text-mist"}`} />
      </button>
      <p className="text-xs text-mist/60">{product.author}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-display text-xl text-ember">{thb(product.price)}</span>
        <span className="flex items-center gap-1 text-xs text-mist/70">
          <Star className="h-3.5 w-3.5 fill-ember text-ember" />
          {product.rating}
        </span>
      </div>
      <button
        disabled={stock <= 0}
        onClick={() => addToCart(product.slug)}
        className="mt-3 w-full rounded-full bg-ember/90 py-2 text-sm font-medium text-ink transition hover:bg-ember disabled:opacity-40"
      >
        {stock <= 0 ? "Sold out" : "Add to cart"}
      </button>
    </article>
  );
}
