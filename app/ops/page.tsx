"use client";

import Link from "next/link";
import { products } from "@/lib/catalog";
import { DeskShell, Forbidden } from "@/components/desk/DeskShell";
import { canOps } from "@/lib/roles";
import { useStore } from "@/lib/store";

export default function OpsHome() {
  const { user, orders, inventory } = useStore();
  if (!canOps(user?.role)) {
    return <Forbidden need="Staff or owner sign-in required. Use an email containing “staff” or “owner”." />;
  }

  const placed = orders.filter((o) => o.status === "placed").length;
  const packing = orders.filter((o) => o.status === "packing").length;
  const shipped = orders.filter((o) => o.status === "shipped").length;
  const low = products.filter((p) => (inventory[p.slug] ?? p.stock) <= 5);

  return (
    <DeskShell desk="ops" title="Operations">
      <p className="mb-8 max-w-xl text-sm text-white/45">
        Pack, ship, and count stock. Finance lives on the owner desk. Data is this browser only — a live shop would
        enforce these roles on the server.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["To pack", placed, "/ops/orders/"],
          ["Packing", packing, "/ops/orders/"],
          ["Out for delivery", shipped, "/ops/orders/"],
        ].map(([l, n, href]) => (
          <Link key={String(l)} href={String(href)} className="border border-white/10 bg-white/[0.02] p-4 hover:border-white/25">
            <p className="text-xs text-white/40">{l}</p>
            <p className="font-display text-3xl text-white">{n as number}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 border border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-white/40">Low stock (≤ 5)</p>
          <Link href="/ops/inventory/" className="text-sm text-white/70 hover:text-white">
            Inventory →
          </Link>
        </div>
        <p className="font-display text-3xl text-white">{low.length}</p>
        {low.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm text-white/55">
            {low.slice(0, 6).map((p) => (
              <li key={p.id}>
                {p.title} · {inventory[p.slug] ?? p.stock}
              </li>
            ))}
          </ul>
        )}
      </div>
    </DeskShell>
  );
}
