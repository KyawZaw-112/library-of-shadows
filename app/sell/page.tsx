"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/catalog";
import { searchOpenLibrary } from "@/lib/openlibrary";
import { conditions, quoteResale, type BookCondition } from "@/lib/resale";
import { thb } from "@/lib/money";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/ui/reveal";

export default function SellPage() {
  const { user, listResale } = useStore();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Product[]>([]);
  const [picked, setPicked] = useState<Product | null>(null);
  const [condition, setCondition] = useState<BookCondition>("good");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const quote = picked ? quoteResale(picked.price, condition) : null;

  const search = async () => {
    if (!q.trim()) return;
    setBusy(true);
    try {
      setHits(await searchOpenLibrary({ q, limit: 8 }));
    } catch {
      setErr("Open Library is unreachable right now.");
    } finally {
      setBusy(false);
    }
  };

  const submit = () => {
    if (!picked || !quote) return;
    const res = listResale({
      workSlug: picked.slug,
      title: picked.title,
      author: picked.author,
      cover: picked.cover,
      genre: picked.genre,
      genreSlug: picked.genreSlug,
      condition,
      listPrice: picked.price,
      buyback: quote.buyback,
      price: quote.price,
    });
    if (typeof res === "string") {
      setErr(res);
      return;
    }
    router.push("/account/listings/");
  };

  if (!user) {
    return (
      <main className="p-10 text-center">
        <p className="text-white/55">Sign in to trade in a spine.</p>
        <Link href="/login/" className="mt-4 inline-block text-white underline">
          Sign in
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <Reveal>
        <p className="text-[11px] tracking-[0.25em] text-white/40 uppercase">Trade-in</p>
        <h1 className="font-display text-5xl text-white">Sell a spine</h1>
        <p className="mt-3 text-sm text-white/45">
          We buy campus copies, inspect them, then list them as pre-loved. You get store credit when it sells — not
          cash. Ops has to accept the copy first.
        </p>
      </Reveal>

      <div className="mt-8 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && void search()}
          placeholder="Title or author"
          className="glass flex-1 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30"
        />
        <button type="button" onClick={() => void search()} className="rounded-full bg-white px-5 text-sm text-black">
          {busy ? "…" : "Search"}
        </button>
      </div>

      {!picked && (
        <ul className="mt-4 space-y-2">
          {hits.map((h) => (
            <li key={h.id}>
              <button
                type="button"
                onClick={() => setPicked(h)}
                className="flex w-full items-center gap-3 border border-white/10 bg-white/[0.02] p-3 text-left hover:border-white/25"
              >
                <div className="h-14 w-10 shrink-0 overflow-hidden bg-white/[0.04]">
                  {h.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={h.cover} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <span>
                  <span className="block font-display text-white">{h.title}</span>
                  <span className="text-xs text-white/45">{h.author} · new {thb(h.price)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {picked && quote && (
        <div className="mt-8 border border-white/10 bg-white/[0.02] p-5">
          <p className="font-display text-2xl text-white">{picked.title}</p>
          <p className="text-sm text-white/45">{picked.author}</p>
          <p className="mt-4 text-xs tracking-widest text-white/40 uppercase">Condition</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {conditions.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCondition(c.id)}
                className={`rounded-full border px-3 py-1.5 text-sm ${
                  condition === c.id ? "border-white bg-white text-black" : "border-white/20 text-white/70"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-white/40">{conditions.find((c) => c.id === condition)?.hint}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-white/40">Your credit (when it sells)</p>
              <p className="font-display text-3xl text-white">{thb(quote.buyback)}</p>
            </div>
            <div>
              <p className="text-white/40">Pre-loved shelf price</p>
              <p className="font-display text-3xl text-white">{thb(quote.price)}</p>
            </div>
          </div>
          {err && <p className="mt-3 text-sm text-white">{err}</p>}
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={submit} className="rounded-full bg-white px-5 py-2 text-sm text-black">
              Submit for inspection
            </button>
            <button type="button" onClick={() => setPicked(null)} className="text-sm text-white/50 hover:text-white">
              Pick another
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
