"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/ui/reveal";

export default function AccountPage() {
  const { user, logout, orders } = useStore();
  if (!user) {
    return (
      <main className="p-10 text-center">
        <Link href="/login/" className="text-white underline">
          Sign in
        </Link>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <Reveal>
      <h1 className="font-display text-5xl text-white">{user.name}</h1>
      <p className="text-sm text-white/45">{user.email}</p>
      </Reveal>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="border border-white/10 bg-white/[0.02] p-4">
          <p className="text-xs text-white/40">Loyalty</p>
          <p className="font-display text-3xl text-white">{user.points} pts</p>
        </div>
        <div className="border border-white/10 bg-white/[0.02] p-4">
          <p className="text-xs text-white/40">Orders</p>
          <p className="font-display text-3xl text-white">{orders.length}</p>
        </div>
      </div>
      <Link href="/account/orders/" className="mt-8 inline-block text-white underline">
        Order tracking →
      </Link>
      {user.isAdmin && (
        <Link href="/admin/" className="ml-4 text-white underline">
          Admin →
        </Link>
      )}
      <button onClick={logout} className="mt-10 block text-sm text-white/40 hover:text-white">
        Sign out
      </button>
    </main>
  );
}
