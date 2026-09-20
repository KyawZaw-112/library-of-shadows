"use client";

import Link from "next/link";
import { products } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export default function AdminProducts() {
  const { user, inventory, adminSetStock } = useStore();
  if (!user?.isAdmin) return <p className="p-8">Forbidden.</p>;
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <Link href="/admin/" className="text-sm text-white/70">
        ← Admin
      </Link>
      <h1 className="mt-4 font-display text-4xl text-white">Inventory</h1>
      <table className="mt-6 w-full text-left text-sm">
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
                    className={`w-20 rounded border border-white/15 bg-transparent px-2 py-1 text-white ${s <= 5 ? "text-white" : ""}`}
                    value={s}
                    onChange={(e) => adminSetStock(p.slug, Number(e.target.value))}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
