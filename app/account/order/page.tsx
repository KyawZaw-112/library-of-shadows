"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { thb } from "@/lib/money";
import { useStore } from "@/lib/store";

const steps = ["placed", "packing", "shipped", "delivered"] as const;

const payLabel = (id: string) =>
  id === "promptpay" ? "PromptPay QR" : id === "card" ? "Card" : id === "ewallet" ? "E-wallet" : id === "cod" ? "Cash on delivery" : id;

function Detail() {
  const id = useSearchParams().get("id");
  const { orders } = useStore();
  const o = orders.find((x) => x.id === id);
  if (!o) return <p className="p-8">Order not found in this browser.</p>;
  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <Link href="/account/orders/" className="text-sm text-white/70">
        ← Orders
      </Link>
      <h1 className="mt-4 font-display text-4xl text-white">{o.id}</h1>
      <p className="text-sm text-white/45">
        {new Date(o.createdAt).toLocaleString()} · {payLabel(o.payment)} · Track {o.tracking}
      </p>
      <div className="mt-6 flex gap-1">
        {steps.map((s) => (
          <div key={s} className="flex-1 text-center">
            <div className={`h-1.5 rounded-full ${steps.indexOf(s) <= steps.indexOf(o.status) ? "bg-white" : "bg-white/15"}`} />
            <p className="mt-1 text-[10px] tracking-wide text-white/45 uppercase">{s}</p>
          </div>
        ))}
      </div>
      <ul className="mt-6 text-sm">
        {o.items.map((i) => (
          <li key={i.slug} className="flex justify-between py-1">
            {i.title} × {i.qty}
            <span>{thb(i.price * i.qty)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-white/55">
        {o.address}, {o.province}
      </p>
      <p className="mt-2 font-display text-2xl text-white">{thb(o.total)}</p>
      {o.payment === "cod" && (
        <p className="mt-3 border border-white/10 bg-white/[0.02] px-4 py-3 text-xs text-white/55">
          Cash on delivery — keep {thb(o.total)} ready for the rider.
        </p>
      )}
    </main>
  );
}

export default function OrderDetailPage() {
  return (
    <Suspense>
      <Detail />
    </Suspense>
  );
}
