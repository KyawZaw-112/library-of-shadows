"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import type { Product } from "@/lib/catalog";
import { thb } from "@/lib/money";
import { useStore } from "@/lib/store";
import { useFly } from "@/components/ui/fly-to-cart";

function Cover({ product }: { product: Product }) {
  if (product.cover.startsWith("http")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={product.cover} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
    );
  }
  return (
    <div className="flex h-full flex-col justify-between border border-white/10 bg-white/[0.03] p-4">
      <span className="font-display text-[10px] tracking-[0.3em] text-white/60 uppercase">LOS</span>
      <p className="font-display text-2xl leading-tight text-white">{product.title}</p>
    </div>
  );
}

export default function BookCard({ product }: { product: Product }) {
  const { addToCart, toggleWish, wishlist, inventory } = useStore();
  const stock = inventory[product.slug] ?? product.stock;
  const loved = wishlist.includes(product.slug);
  const [added, setAdded] = useState(false);
  const fly = useFly();
  const coverRef = useRef<HTMLDivElement>(null);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/25"
    >
      <Link href={`/product/?id=${encodeURIComponent(product.slug)}`} className="block">
        <div ref={coverRef} className="mb-4 aspect-[3/4] overflow-hidden border border-white/10">
          <Cover product={product} />
        </div>
      </Link>
      {product.tag && (
        <span className="absolute top-7 right-7 border border-white/20 bg-black/60 px-2 py-0.5 text-[10px] tracking-widest text-white uppercase">
          {product.tag}
        </span>
      )}
      <button
        type="button"
        onClick={() => toggleWish(product.slug)}
        className="absolute top-6 left-6 rounded-full border border-white/10 bg-black/50 p-1.5 hover:border-white/40"
        aria-label="Wishlist"
      >
        <Heart className={`h-4 w-4 ${loved ? "fill-white text-white" : "text-white/70"}`} />
      </button>
      <p className="line-clamp-2 font-display text-lg leading-tight text-white">{product.title}</p>
      <p className="text-xs text-white/45">{product.author}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-display text-xl text-white">{thb(product.price)}</span>
        <span className="flex items-center gap-1 text-xs text-white/60">
          <Star className="h-3.5 w-3.5 text-white/70" />
          {product.rating}
        </span>
      </div>
      <motion.button
        type="button"
        disabled={stock <= 0}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          if (added) return;
          fly(coverRef.current);
          addToCart(product);
          setAdded(true);
          setTimeout(() => setAdded(false), 1400);
        }}
        className="relative mt-3 w-full overflow-hidden rounded-full border border-white/20 bg-transparent py-2 text-sm font-medium text-white hover:bg-white hover:text-black disabled:opacity-40"
      >
        <AnimatePresence initial={false} mode="wait">
          {added ? (
            <motion.span
              key="done"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center gap-1.5"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Added
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {stock <= 0 ? "Sold out" : "Add to cart"}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.article>
  );
}
