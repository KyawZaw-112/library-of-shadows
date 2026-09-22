"use client";

import { products } from "@/lib/catalog";
import { DeskShell, Forbidden } from "@/components/desk/DeskShell";
import { thb } from "@/lib/money";
import { canOwner } from "@/lib/roles";
import { useStore } from "@/lib/store";

export default function OwnerAnalytics() {
  const { user, orders } = useStore();
  if (!canOwner(user?.role)) {
    return <Forbidden need="Owner only." />;
  }

  const gmv = orders.reduce((s, o) => s + o.total, 0);
  const breakEven = 15000;
  const byGenre: Record<string, number> = {};
  orders.forEach((o) =>
    o.items.forEach((i) => {
      const g = products.find((p) => p.slug === i.slug)?.genre || "Other";
      byGenre[g] = (byGenre[g] || 0) + i.qty;
    }),
  );

  return (
    <DeskShell desk="owner" title="Finance">
      <p className="text-white/65">Monthly GMV {thb(gmv)}</p>
      <p className="text-white/65">
        Break-even target {thb(breakEven)} · {gmv >= breakEven ? "Hit" : `Gap ${thb(breakEven - gmv)}`}
      </p>
      <p className="mt-2 text-sm text-white/45">
        {orders.length > 1 ? "Repeat possible (same browser profile)." : "Need more orders for a repeat signal."}
      </p>
      <h2 className="mt-8 font-display text-2xl text-white">Units by genre</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {Object.entries(byGenre).map(([g, n]) => (
          <li key={g} className="flex justify-between text-white/70">
            {g}
            <span>{n}</span>
          </li>
        ))}
        {!Object.keys(byGenre).length && <li className="text-white/40">No sales yet.</li>}
      </ul>
    </DeskShell>
  );
}
