"use client";

import { faqs } from "@/lib/catalog";

export default function SupportPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-4xl text-mist">Support</h1>
      <a
        href="https://line.me/"
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block rounded-full bg-[#06C755] px-5 py-2 text-sm font-semibold text-white"
      >
        LINE Official
      </a>
      <ul className="mt-8 space-y-4">
        {faqs.map((f) => (
          <li key={f.q} className="glass rounded-2xl p-4">
            <p className="font-display text-xl text-ember">{f.q}</p>
            <p className="mt-1 text-sm text-mist/70">{f.a}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
