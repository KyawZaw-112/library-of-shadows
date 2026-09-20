"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export default function AccountPage() {
  const { user, logout, orders } = useStore();
  if (!user) {
    return (
      <main className="p-10 text-center">
        <Link href="/login/" className="text-ember">
          Sign in
        </Link>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-4xl text-mist">{user.name}</h1>
      <p className="text-sm text-mist/55">{user.email}</p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="glass rounded-2xl p-4">
          <p className="text-xs text-mist/50">Loyalty</p>
          <p className="font-display text-3xl text-ember">{user.points} pts</p>
        </div>
        <div className="glass rounded-2xl p-4">
          <p className="text-xs text-mist/50">Orders</p>
          <p className="font-display text-3xl text-ember">{orders.length}</p>
        </div>
      </div>
      <Link href="/account/orders/" className="mt-6 inline-block text-ember">
        Order tracking →
      </Link>
      {user.isAdmin && (
        <Link href="/admin/" className="ml-4 text-ember">
          Admin →
        </Link>
      )}
      <button onClick={logout} className="mt-8 block text-sm text-mist/40">
        Sign out
      </button>
    </main>
  );
}
