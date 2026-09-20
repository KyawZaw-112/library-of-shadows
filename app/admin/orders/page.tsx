"use client";

import Link from "next/link";
import { thb } from "@/lib/money";
import { useStore, type OrderStatus } from "@/lib/store";

const statuses: OrderStatus[] = ["placed", "packing", "shipped", "delivered"];

export default function AdminOrders() {
  const { user, orders, adminSetStatus } = useStore();
  if (!user?.isAdmin) return <p className="p-8">Forbidden.</p>;
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <Link href="/admin/" className="text-sm text-white/70">
        ← Admin
      </Link>
      <h1 className="mt-4 font-display text-4xl text-white">Orders</h1>
      <ul className="mt-6 space-y-3">
        {orders.map((o) => (
          <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 border border-white/10 bg-white/[0.02] p-4 text-sm">
            <div>
              <p className="font-display text-lg text-white">{o.id}</p>
              <p className="text-white/55">
                {thb(o.total)} · {o.tracking} · {o.province}
              </p>
            </div>
            <select
              value={o.status}
              onChange={(e) => adminSetStatus(o.id, e.target.value as OrderStatus)}
              className="rounded-lg border border-white/15 bg-transparent px-2 py-1 text-white"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
      {!orders.length && <p className="mt-4 text-white/45">No orders in this browser yet.</p>}
    </main>
  );
}
