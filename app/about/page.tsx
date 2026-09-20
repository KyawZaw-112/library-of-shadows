"use client";

import Link from "next/link";
import { founders, market, pitch, problems, solutions, tagline, valueProps } from "@/lib/business";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs tracking-[0.35em] text-ember uppercase">Digital business project</p>
      <h1 className="mt-2 font-display text-5xl text-mist">{tagline}</h1>
      <p className="mt-3 text-mist/70">{pitch}</p>
      <p className="mt-4 text-sm text-mist/55">
        Online bookstore for students and young adults in {market.city}, ages {market.age}. Average target price{" "}
        {market.avgPrice}. Primary channel: {market.channel}.
      </p>

      <h2 className="mt-12 font-display text-3xl text-ember">Founders</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {founders.map((f) => (
          <li key={f.id} className="glass rounded-2xl p-4">
            <p className="font-display text-xl text-mist">{f.name}</p>
            <p className="text-xs text-mist/45">{f.id}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 font-display text-3xl text-ember">The problem</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-mist/70">
        {problems.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <h2 className="mt-12 font-display text-3xl text-ember">Our solution</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {solutions.map((s) => (
          <span key={s} className="rounded-full border border-ember/25 px-3 py-1 text-sm text-ember">
            {s}
          </span>
        ))}
      </div>

      <h2 className="mt-12 font-display text-3xl text-ember">Why choose us</h2>
      <div className="mt-4 space-y-3">
        {valueProps.map((v) => (
          <div key={v.t} className="glass rounded-2xl p-4">
            <p className="font-display text-xl text-mist">{v.t}</p>
            <p className="text-sm text-mist/65">{v.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-mist/55">
        We sit between mega-retailers and physical shops: more tailored than SE-ED / Naiin / Asia Books at scale, more
        convenient than a local store.
      </p>
      <Link href="/business/" className="mt-8 inline-block text-ember">
        Full model, pricing & break-even →
      </Link>
    </main>
  );
}
