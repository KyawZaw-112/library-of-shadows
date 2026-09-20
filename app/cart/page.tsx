"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { thb } from "@/lib/money";
import { productBySlug, useStore } from "@/lib/store";
import { Reveal } from "@/components/ui/reveal";

export default function CartPage() {
  const { cart, setQty } = useStore();
  const lines = cart.map((l) => ({ ...l, p: productBySlug(l.slug)! })).filter((x) => x.p);
  const sub = lines.reduce((s, l) => s + l.p.price * l.qty, 0);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <Reveal>
      <h1 className="font-display text-5xl text-white">Cart</h1>
      {!lines.length && (
        <p className="mt-6 text-white/45">
          Empty stacks. <Link href="/catalog/" className="text-white underline">Browse</Link>
        </p>
      )}
      </Reveal>
      <ul className="mt-8 space-y-4">
        <AnimatePresence initial={false}>
          {lines.map((l) => (
            <motion.li
              key={l.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between border border-white/10 bg-white/[0.02] p-4"
            >
              <div>
                <p className="font-display text-xl text-white">{l.p.title}</p>
                <p className="text-sm text-white/50">{thb(l.p.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-8 w-8 rounded-full border border-white/15 hover:border-white/40" onClick={() => setQty(l.slug, l.qty - 1)}>
                  −
                </button>
                <span className="w-6 text-center text-sm text-white">{l.qty}</span>
                <button className="h-8 w-8 rounded-full border border-white/15 hover:border-white/40" onClick={() => setQty(l.slug, l.qty + 1)}>
                  +
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {!!lines.length && (
        <div className="mt-10 flex items-center justify-between">
          <p className="font-display text-2xl text-white">{thb(sub)}</p>
          <Link href="/checkout/" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90">
            Checkout
          </Link>
        </div>
      )}
    </main>
  );
}
