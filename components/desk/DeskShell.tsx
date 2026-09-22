"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useStore } from "@/lib/store";
import { canOwner, roleLabel, type Role } from "@/lib/roles";

export function DeskShell({
  desk,
  title,
  children,
}: {
  desk: "ops" | "owner";
  title: string;
  children: ReactNode;
}) {
  const path = usePathname();
  const { user, logout } = useStore();
  const opsLinks = [
    { href: "/ops/", label: "Queue" },
    { href: "/ops/orders/", label: "Orders" },
    { href: "/ops/inventory/", label: "Inventory" },
    { href: "/ops/resale/", label: "Trade-ins" },
  ];
  const ownerLinks = [
    { href: "/owner/", label: "Desk" },
    { href: "/owner/analytics/", label: "Finance" },
    { href: "/owner/team/", label: "Team" },
  ];
  const links = desk === "ops" ? opsLinks : ownerLinks;

  return (
    <div className="min-h-screen bg-ink">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="text-[10px] tracking-[0.25em] text-white/40 uppercase">
              {desk === "ops" ? "Back office" : "Owner"} · this browser only
            </p>
            <h1 className="font-display text-2xl text-white">{title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
            {user && <span className="text-white/40">{roleLabel(user.role as Role)}</span>}
            {desk === "ops" && canOwner(user?.role) && (
              <Link href="/owner/" className="hover:text-white">
                Owner desk
              </Link>
            )}
            {desk === "owner" && (
              <Link href="/ops/" className="hover:text-white">
                Ops
              </Link>
            )}
            <Link href="/" className="hover:text-white">
              Storefront
            </Link>
            <Link href="/account/" className="hover:text-white">
              Account
            </Link>
            <button type="button" onClick={logout} className="hover:text-white">
              Sign out
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-6 px-4 pb-3 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={path === l.href ? "text-white" : "text-white/50 hover:text-white"}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-10">{children}</div>
    </div>
  );
}

export function Forbidden({ need }: { need: string }) {
  return (
    <main className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-sm text-white/55">{need}</p>
      <Link href="/login/" className="mt-4 inline-block text-white underline">
        Sign in
      </Link>
    </main>
  );
}
