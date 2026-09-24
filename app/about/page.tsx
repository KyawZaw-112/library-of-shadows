"use client";

import Link from "next/link";
import { founders, market, pitch, problems, solutions, tagline, valueProps } from "@/lib/business";
import { Reveal } from "@/components/ui/reveal";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <Reveal>
      <p className="text-[11px] tracking-[0.35em] text-white/45 uppercase">Digital business project</p>
      <h1 className="mt-3 font-display text-5xl text-white">{tagline}</h1>
      <p className="mt-3 text-white/65">{pitch}</p>
      <p className="mt-4 text-sm text-white/45">
        Online bookstore for students and young adults in {market.city}, ages {market.age}. Average target price{" "}
        {market.avgPrice}. Primary channel: {market.channel}.
      </p>

      <h2 className="mt-12 font-display text-3xl text-white">Founders</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {founders.map((f) => (
          <li key={f.id} className="border border-white/10 bg-white/[0.02] p-4">
            <p className="font-display text-xl text-white">{f.name}</p>
            <p className="text-xs text-white/40">{f.id}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 font-display text-3xl text-white">The problem</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/60">
        {problems.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <h2 className="mt-12 font-display text-3xl text-white">Our solution</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {solutions.map((s) => (
          <span key={s} className="rounded-full border border-white/20 px-3 py-1 text-sm text-white/80">
            {s}
          </span>
        ))}
      </div>

      <h2 className="mt-12 font-display text-3xl text-white">Why choose us</h2>
      <div className="mt-4 space-y-3">
        {valueProps.map((v) => (
          <div key={v.t} className="border border-white/10 bg-white/[0.02] p-4">
            <p className="font-display text-xl text-white">{v.t}</p>
            <p className="text-sm text-white/55">{v.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-white/45">
        We sit between mega-retailers and physical shops: more tailored than SE-ED / Naiin / Asia Books at scale, more
        convenient than a local store.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/presentation/" className="text-white underline">
          Scroll the pitch →
        </Link>
        <Link href="/business/" className="text-white/55 underline">
          Full model, pricing & break-even →
        </Link>
      </div>
      </Reveal>
    </main>
  );
}
