"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/ui/reveal";
import { thb } from "@/lib/money";
import { canOps, canOwner, roleLabel } from "@/lib/roles";

export default function AccountPage() {
  const { user, logout, orders, wishlist } = useStore();
  if (!user) {
    return (
      <main className="p-10 text-center">
        <Link href="/login/" className="text-white underline">
          Sign in
        </Link>
      </main>
    );
  }

  const latest = orders[0];

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <Reveal>
        <p className="text-[11px] tracking-[0.25em] text-white/40 uppercase">Customer portal</p>
        <h1 className="font-display text-5xl text-white">{user.name}</h1>
        <p className="text-sm text-white/45">
          {user.email} · {roleLabel(user.role)}
        </p>
      </Reveal>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="border border-white/10 bg-white/[0.02] p-4">
          <p className="text-xs text-white/40">Loyalty</p>
          <p className="font-display text-3xl text-white">{user.points} pts</p>
        </div>
        <div className="border border-white/10 bg-white/[0.02] p-4">
          <p className="text-xs text-white/40">Orders</p>
          <p className="font-display text-3xl text-white">{orders.length}</p>
        </div>
        <div className="border border-white/10 bg-white/[0.02] p-4">
          <p className="text-xs text-white/40">Wishlist</p>
          <p className="font-display text-3xl text-white">{wishlist.length}</p>
        </div>
      </div>

      {latest && (
        <div className="mt-8 border border-white/10 bg-white/[0.02] p-4">
          <p className="text-xs text-white/40">Latest order</p>
          <Link href={`/account/order/?id=${latest.id}`} className="font-display text-2xl text-white hover:underline">
            {latest.id}
          </Link>
          <p className="mt-1 text-sm text-white/55">
            {thb(latest.total)} · {latest.status} · {latest.province}
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 text-sm">
        <Link href="/account/orders/" className="text-white underline">
          Order tracking →
        </Link>
        <Link href="/wishlist/" className="text-white underline">
          Wishlist →
        </Link>
        {canOps(user.role) && (
          <Link href="/ops/" className="text-white underline">
            Staff back office →
          </Link>
        )}
        {canOwner(user.role) && (
          <Link href="/owner/" className="text-white underline">
            Owner desk →
          </Link>
        )}
      </div>
      <button onClick={logout} className="mt-10 block text-sm text-white/40 hover:text-white">
        Sign out
      </button>
    </main>
  );
}
