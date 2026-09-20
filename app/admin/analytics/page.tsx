"use client";

import Link from "next/link";
import { products } from "@/lib/catalog";
import { thb } from "@/lib/money";
import { useStore } from "@/lib/store";

export default function AnalyticsPage() {
  const { user, orders } = useStore();
  if (!user?.isAdmin) return <p className="p-8">Forbidden.</p>;
  const gmv = orders.reduce((s, o) => s + o.total, 0);
  const breakEven = 15000;
  const byGenre: Record<string, number> = {};
  orders.forEach((o) =>
    o.items.forEach((i) => {
      const g = products.find((p) => p.slug === i.slug)?.genre || "Other";
      byGenre[g] = (byGenre[g] || 0) + i.qty;
    }),
  );
  const repeat = orders.length > 1 ? "Repeat possible (same browser profile)" : "Need more orders";
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/admin/" className="text-sm text-white/70">
        ← Admin
      </Link>
      <h1 className="mt-4 font-display text-4xl text-white">Analytics</h1>
      <p className="mt-6 text-white/65">Monthly GMV {thb(gmv)}</p>
      <p className="text-white/65">
        Break-even target {thb(breakEven)} · {gmv >= breakEven ? "Hit" : `Gap ${thb(breakEven - gmv)}`}
      </p>
      <p className="mt-2 text-sm text-white/45">{repeat}</p>
      <h2 className="mt-8 font-display text-2xl text-white">Units by genre</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {Object.entries(byGenre).map(([g, n]) => (
          <li key={g} className="flex justify-between">
            {g}
            <span>{n}</span>
          </li>
        ))}
        {!Object.keys(byGenre).length && <li className="text-white/40">No sales yet.</li>}
      </ul>
    </main>
  );
}
