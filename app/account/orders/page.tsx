"use client";

import Link from "next/link";
import { thb } from "@/lib/money";
import { useStore } from "@/lib/store";

const steps = ["placed", "packing", "shipped", "delivered"] as const;

export default function OrdersPage() {
  const { orders, user } = useStore();
  if (!user) return <p className="p-8">Sign in required.</p>;
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-4xl text-mist">Orders</h1>
      <ul className="mt-6 space-y-4">
        {orders.map((o) => (
          <li key={o.id} className="glass rounded-2xl p-4">
            <Link href={`/account/order/?id=${o.id}`} className="font-display text-xl text-ember">
              {o.id}
            </Link>
            <p className="text-sm text-mist/60">
              {thb(o.total)} · {o.status} · {o.tracking}
            </p>
            <div className="mt-3 flex gap-1">
              {steps.map((s) => (
                <span
                  key={s}
                  className={`h-1.5 flex-1 rounded-full ${steps.indexOf(s) <= steps.indexOf(o.status) ? "bg-ember" : "bg-mist/15"}`}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
      {!orders.length && <p className="mt-4 text-mist/50">No orders yet.</p>}
    </main>
  );
}
