"use client";

import { faqs } from "@/lib/catalog";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

export default function SupportPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <Reveal>
      <h1 className="font-display text-5xl text-white">Support</h1>
      <a
        href="https://line.me/"
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-block rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white hover:border-white/50"
      >
        LINE Official
      </a>
      </Reveal>
      <RevealGroup className="mt-10 space-y-4">
        {faqs.map((f) => (
          <RevealItem key={f.q} className="border border-white/10 bg-white/[0.02] p-4">
            <p className="font-display text-xl text-white">{f.q}</p>
            <p className="mt-1 text-sm text-white/55">{f.a}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </main>
  );
}
