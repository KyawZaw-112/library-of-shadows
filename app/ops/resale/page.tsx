"use client";

import { DeskShell, Forbidden } from "@/components/desk/DeskShell";
import { thb } from "@/lib/money";
import { canOps } from "@/lib/roles";
import { conditionLabel, type ListingStatus } from "@/lib/resale";
import { useStore } from "@/lib/store";

export default function OpsResale() {
  const { user, listings, opsSetListing } = useStore();
  if (!canOps(user?.role)) return <Forbidden need="Staff or owner only." />;

  const pending = listings.filter((l) => l.status === "pending");
  const rest = listings.filter((l) => l.status !== "pending");

  return (
    <DeskShell desk="ops" title="Trade-ins">
      <p className="mb-6 text-sm text-white/45">
        Inspect the copy, then list it on the pre-loved shelf or reject it. Seller credit pays when a reader buys it.
      </p>
      <h2 className="font-display text-2xl text-white">Inbox ({pending.length})</h2>
      <ul className="mt-3 space-y-3">
        {pending.map((l) => (
          <li key={l.id} className="border border-white/10 bg-white/[0.02] p-4">
            <p className="font-display text-lg text-white">{l.title}</p>
            <p className="text-sm text-white/55">
              {l.author} · {conditionLabel(l.condition)} · buy {thb(l.buyback)} · shelf {thb(l.price)}
            </p>
            <p className="mt-1 text-xs text-white/35">{l.sellerName} · {l.sellerEmail}</p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => opsSetListing(l.id, "listed")}
                className="rounded-full bg-white px-4 py-1.5 text-sm text-black"
              >
                List
              </button>
              <button
                type="button"
                onClick={() => opsSetListing(l.id, "rejected")}
                className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/70"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
      {!pending.length && <p className="mt-2 text-sm text-white/40">Queue is clear.</p>}

      <h2 className="mt-10 font-display text-2xl text-white">Shelf</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {rest.map((l) => (
          <li key={l.id} className="flex flex-wrap items-center justify-between gap-2 border border-white/10 px-4 py-3">
            <span className="text-white/80">
              {l.title} · {l.status}
            </span>
            {l.status === "listed" && (
              <select
                value={l.status}
                onChange={(e) => opsSetListing(l.id, e.target.value as ListingStatus)}
                className="rounded border border-white/15 bg-transparent px-2 py-1 text-white"
              >
                <option value="listed">listed</option>
                <option value="rejected">pull</option>
              </select>
            )}
          </li>
        ))}
      </ul>
    </DeskShell>
  );
}
