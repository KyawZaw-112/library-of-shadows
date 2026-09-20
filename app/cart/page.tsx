"use client";

import Link from "next/link";
import { thb } from "@/lib/money";
import { productBySlug, useStore } from "@/lib/store";

export default function CartPage() {
  const { cart, setQty } = useStore();
  const lines = cart.map((l) => ({ ...l, p: productBySlug(l.slug)! })).filter((x) => x.p);
  const sub = lines.reduce((s, l) => s + l.p.price * l.qty, 0);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl text-mist">Cart</h1>
      {!lines.length && (
        <p className="mt-6 text-mist/60">
          Empty stacks. <Link href="/catalog/" className="text-ember">Browse</Link>
        </p>
      )}
      <ul className="mt-6 space-y-4">
        {lines.map((l) => (
          <li key={l.slug} className="glass flex items-center justify-between rounded-2xl p-4">
            <div>
              <p className="font-display text-xl text-mist">{l.p.title}</p>
              <p className="text-sm text-ember">{thb(l.p.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-8 w-8 rounded-full border border-ember/30" onClick={() => setQty(l.slug, l.qty - 1)}>
                −
              </button>
              <span>{l.qty}</span>
              <button className="h-8 w-8 rounded-full border border-ember/30" onClick={() => setQty(l.slug, l.qty + 1)}>
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      {!!lines.length && (
        <div className="mt-8 flex items-center justify-between">
          <p className="font-display text-2xl text-ember">{thb(sub)}</p>
          <Link href="/checkout/" className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ink">
            Checkout
          </Link>
        </div>
      )}
    </main>
  );
}
