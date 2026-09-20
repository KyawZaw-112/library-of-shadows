"use client";

import Link from "next/link";
import { products } from "@/lib/catalog";
import { thb } from "@/lib/money";
import { useStore } from "@/lib/store";

export default function AdminHome() {
  const { user, orders, inventory } = useStore();
  if (!user?.isAdmin) {
    return (
      <main className="p-10 text-center">
        <p className="text-white/65">Admin only. Sign in with an email containing “admin”.</p>
        <Link href="/login/" className="mt-4 inline-block text-white underline">
          Login
        </Link>
      </main>
    );
  }
  const gmv = orders.reduce((s, o) => s + o.total, 0);
  const low = products.filter((p) => (inventory[p.slug] ?? p.stock) <= 5);
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl text-white">Admin</h1>
        <Link href="/" className="text-sm text-white/70">
          Storefront
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="border border-white/10 bg-white/[0.02] p-4">
          <p className="text-xs text-white/40">GMV (this browser)</p>
          <p className="font-display text-3xl text-white">{thb(gmv)}</p>
        </div>
        <div className="border border-white/10 bg-white/[0.02] p-4">
          <p className="text-xs text-white/40">Orders</p>
          <p className="font-display text-3xl text-white">{orders.length}</p>
        </div>
        <div className="border border-white/10 bg-white/[0.02] p-4">
          <p className="text-xs text-white/40">Low stock</p>
          <p className="font-display text-3xl text-white">{low.length}</p>
        </div>
      </div>
      <nav className="mt-8 flex gap-6 text-sm text-white/75">
        <Link href="/admin/products/">Inventory</Link>
        <Link href="/admin/orders/">Orders</Link>
        <Link href="/admin/analytics/">Analytics</Link>
      </nav>
    </main>
  );
}
