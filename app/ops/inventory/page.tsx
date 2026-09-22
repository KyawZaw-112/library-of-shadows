"use client";

import { products } from "@/lib/catalog";
import { DeskShell, Forbidden } from "@/components/desk/DeskShell";
import { canOps } from "@/lib/roles";
import { useStore } from "@/lib/store";

export default function OpsInventory() {
  const { user, inventory, adminSetStock } = useStore();
  if (!canOps(user?.role)) {
    return <Forbidden need="Staff or owner only." />;
  }

  return (
    <DeskShell desk="ops" title="Inventory">
      <p className="mb-6 text-sm text-white/45">Shelf counts for local bundles. Open Library titles are not warehoused here.</p>
      <table className="w-full text-left text-sm">
        <thead className="text-white/40">
          <tr>
            <th className="py-2">Title</th>
            <th>SKU</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const s = inventory[p.slug] ?? p.stock;
            return (
              <tr key={p.id} className="border-t border-white/10">
                <td className="py-3 text-white/85">{p.title}</td>
                <td className="text-white/45">{p.sku}</td>
                <td>
                  <input
                    type="number"
                    min={0}
                    className="w-20 rounded border border-white/15 bg-transparent px-2 py-1 text-white"
                    value={s}
                    onChange={(e) => adminSetStock(p.slug, Number(e.target.value))}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </DeskShell>
  );
}
