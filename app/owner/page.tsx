"use client";

import Link from "next/link";
import { products } from "@/lib/catalog";
import { DeskShell, Forbidden } from "@/components/desk/DeskShell";
import { thb } from "@/lib/money";
import { canOwner } from "@/lib/roles";
import { useStore } from "@/lib/store";

export default function OwnerHome() {
  const { user, orders, inventory } = useStore();
  if (!canOwner(user?.role)) {
    return <Forbidden need="Owner only. Sign in with an email containing “owner” or “admin”." />;
  }

  const gmv = orders.reduce((s, o) => s + o.total, 0);
  const low = products.filter((p) => (inventory[p.slug] ?? p.stock) <= 5).length;

  return (
    <DeskShell desk="owner" title="Owner desk">
      <p className="mb-8 max-w-xl text-sm text-white/45">
        Revenue, staff, and policy. Warehouse work stays in Ops. Checkout on the storefront is still a demo — no real
        money moves.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border border-white/10 bg-white/[0.02] p-4">
          <p className="text-xs text-white/40">GMV (this browser)</p>
          <p className="font-display text-3xl text-white">{thb(gmv)}</p>
        </div>
        <div className="border border-white/10 bg-white/[0.02] p-4">
          <p className="text-xs text-white/40">Orders</p>
          <p className="font-display text-3xl text-white">{orders.length}</p>
        </div>
        <div className="border border-white/10 bg-white/[0.02] p-4">
          <p className="text-xs text-white/40">SKUs at risk</p>
          <p className="font-display text-3xl text-white">{low}</p>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link href="/owner/analytics/" className="text-white underline">
          Finance & genre mix →
        </Link>
        <Link href="/owner/team/" className="text-white underline">
          Team roles →
        </Link>
        <Link href="/ops/" className="text-white underline">
          Open ops →
        </Link>
      </div>
    </DeskShell>
  );
}
