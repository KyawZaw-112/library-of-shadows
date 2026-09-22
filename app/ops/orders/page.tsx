"use client";

import { DeskShell, Forbidden } from "@/components/desk/DeskShell";
import { thb } from "@/lib/money";
import { canOps } from "@/lib/roles";
import { useStore, type OrderStatus } from "@/lib/store";

const statuses: OrderStatus[] = ["placed", "packing", "shipped", "delivered"];

export default function OpsOrders() {
  const { user, orders, adminSetStatus } = useStore();
  if (!canOps(user?.role)) {
    return <Forbidden need="Staff or owner only." />;
  }

  return (
    <DeskShell desk="ops" title="Order queue">
      <p className="mb-6 text-sm text-white/45">Move a parcel through packing → shipped → delivered.</p>
      <ul className="space-y-3">
        {orders.map((o) => (
          <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 border border-white/10 bg-white/[0.02] p-4 text-sm">
            <div>
              <p className="font-display text-lg text-white">{o.id}</p>
              <p className="text-white/55">
                {thb(o.total)} · {o.payment} · {o.province} · {o.tracking}
              </p>
              <p className="mt-1 text-xs text-white/35">{o.address}</p>
            </div>
            <select
              value={o.status}
              onChange={(e) => adminSetStatus(o.id, e.target.value as OrderStatus)}
              className="rounded-lg border border-white/15 bg-transparent px-2 py-1 text-white"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
      {!orders.length && <p className="text-white/45">No orders in this browser yet.</p>}
    </DeskShell>
  );
}
