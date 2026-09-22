"use client";

import { DeskShell, Forbidden } from "@/components/desk/DeskShell";
import { canOwner } from "@/lib/roles";
import { useStore } from "@/lib/store";

const roster = [
  { role: "Owner", access: "Finance, team, ops override", email: "owner@… or admin@…" },
  { role: "Staff", access: "Order queue, inventory — no GMV", email: "staff@…" },
  { role: "Customer", access: "Storefront + account portal only", email: "anyone else" },
];

export default function OwnerTeam() {
  const { user } = useStore();
  if (!canOwner(user?.role)) {
    return <Forbidden need="Owner only." />;
  }

  return (
    <DeskShell desk="owner" title="Team">
      <p className="mb-6 max-w-xl text-sm text-white/45">
        Live shops store role on the user in the auth server (not in the email string). This demo maps the address so
        you can switch desks without a backend.
      </p>
      <ul className="space-y-3">
        {roster.map((r) => (
          <li key={r.role} className="border border-white/10 bg-white/[0.02] p-4">
            <p className="font-display text-xl text-white">{r.role}</p>
            <p className="mt-1 text-sm text-white/55">{r.access}</p>
            <p className="mt-2 text-xs text-white/35">Sign in with {r.email}</p>
          </li>
        ))}
      </ul>
    </DeskShell>
  );
}
