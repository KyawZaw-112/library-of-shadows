"use client";

import { thb } from "@/lib/money";
import { competitors, financials, pricingTable } from "@/lib/business";
import { Reveal } from "@/components/ui/reveal";

export default function BusinessPage() {
  const f = financials;
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <Reveal>
      <h1 className="font-display text-5xl text-white">Business model</h1>
      <p className="mt-3 text-sm text-white/45">
        B2C · Discover (TikTok / IG / Google) → Explore → Choose → Order → Pay (PromptPay / card) → Fulfill → Deliver →
        Retain (reviews / points).
      </p>
      </Reveal>

      <Reveal delay={0.1}>
      <h2 className="mt-12 font-display text-2xl text-white">Products & pricing</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-white/40">
            <tr>
              <th className="py-2">Product</th>
              <th>Price</th>
              <th>Variable cost</th>
              <th>Contribution</th>
            </tr>
          </thead>
          <tbody>
            {pricingTable.map((r) => (
              <tr key={r.name} className="border-t border-white/10">
                <td className="py-2 text-white/85">{r.name}</td>
                <td className="text-white/65">{thb(r.price)}</td>
                <td className="text-white/65">{thb(r.cost)}</td>
                <td className="text-white">{thb(r.contrib)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-white/40">Revenue mix: 70% individual books · 20% bundles & memberships · 10% stationery & gifts.</p>

      <h2 className="mt-12 font-display text-2xl text-white">Monthly base case (1,200 book-equivalents)</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          ["Monthly revenue", f.revenueMo],
          ["Operating profit / mo", f.profitMo],
          ["Annual revenue", f.revenueYr],
          ["Annual operating profit", f.profitYr],
        ].map(([l, n]) => (
          <div key={String(l)} className="border border-white/10 bg-white/[0.02] p-4">
            <p className="text-xs text-white/40">{l}</p>
            <p className="font-display text-2xl text-white">{thb(n as number)}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-white/55">
        Break-even: ฿100,000 fixed ÷ ฿{f.contrib} contribution ≈ <strong>{f.breakEvenBooks} books/month</strong> (
        {thb(f.breakEvenSales)}). Target {f.targetBooks} sits above that line. Variable cost per average book ฿{f.varPerBook}.
      </p>

      <h2 className="mt-12 font-display text-2xl text-white">Vs SE-ED, Naiin, Asia Books</h2>
      <div className="mt-4 overflow-x-auto text-xs">
        <table className="w-full text-left">
          <thead className="text-white/40">
            <tr>
              <th className="py-2">Factor</th>
              <th>Us</th>
              <th>SE-ED</th>
              <th>Naiin</th>
              <th>Asia Books</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((r) => (
              <tr key={r.factor} className="border-t border-white/10">
                <td className="py-2 text-white/85">{r.factor}</td>
                <td className="text-white">{r.us}</td>
                <td className="text-white/55">{r.seed}</td>
                <td className="text-white/55">{r.naiin}</td>
                <td className="text-white/55">{r.asia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 font-display text-2xl text-white">Recommendation</h2>
      <p className="mt-3 font-display text-3xl text-white">Yes — but start small.</p>
      <p className="mt-2 text-sm text-white/50">
        Scale only when sales stay above break-even, customers repeat, inventory is controlled, delivery is reliable, and
        margins stay healthy. Pilot: 500–800 titles.
      </p>
      </Reveal>
    </main>
  );
}
