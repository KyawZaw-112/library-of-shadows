"use client";

import Link from "next/link";
import { thb } from "@/lib/money";
import { conditionLabel } from "@/lib/resale";
import { useStore } from "@/lib/store";

export default function MyListings() {
  const { user, listings } = useStore();
  if (!user) return <p className="p-8">Sign in required.</p>;
  const mine = listings.filter((l) => l.sellerEmail === user.email);

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <Link href="/account/" className="text-sm text-white/70">
        ← Account
      </Link>
      <h1 className="mt-4 font-display text-4xl text-white">My spines</h1>
      <p className="mt-2 text-sm text-white/45">Trade-ins in this browser. Credit lands when a copy sells.</p>
      <ul className="mt-6 space-y-3">
        {mine.map((l) => (
          <li key={l.id} className="border border-white/10 bg-white/[0.02] p-4">
            <p className="font-display text-xl text-white">{l.title}</p>
            <p className="text-sm text-white/55">
              {conditionLabel(l.condition)} · {l.status} · credit {thb(l.buyback)}
              {l.credited ? " · paid" : ""}
            </p>
          </li>
        ))}
      </ul>
      {!mine.length && (
        <p className="mt-4 text-white/45">
          Nothing yet.{" "}
          <Link href="/sell/" className="text-white underline">
            Sell a spine
          </Link>
        </p>
      )}
    </main>
  );
}
