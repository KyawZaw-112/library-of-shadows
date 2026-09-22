"use client";

import Link from "next/link";
import { thb } from "@/lib/money";
import { useStore } from "@/lib/store";

const steps = ["placed", "packing", "shipped", "delivered"] as const;

export default function OrdersPage() {
  const { orders, user } = useStore();
  if (!user) return <p className="p-8">Sign in required.</p>;
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <Link href="/account/" className="text-sm text-white/70">
        ← Account
      </Link>
      <h1 className="mt-4 font-display text-4xl text-white">Orders</h1>
      <ul className="mt-6 space-y-4">
        {orders.map((o) => (
          <li key={o.id} className="border border-white/10 bg-white/[0.02] p-4">
            <Link href={`/account/order/?id=${o.id}`} className="font-display text-xl text-white">
              {o.id}
            </Link>
            <p className="text-sm text-white/55">
              {thb(o.total)} · {o.status} · {o.tracking}
            </p>
            <div className="mt-3 flex gap-1">
              {steps.map((s) => (
                <span
                  key={s}
                  className={`h-1.5 flex-1 rounded-full ${steps.indexOf(s) <= steps.indexOf(o.status) ? "bg-white" : "bg-white/15"}`}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
      {!orders.length && <p className="mt-4 text-white/45">No orders yet.</p>}
    </main>
  );
}
