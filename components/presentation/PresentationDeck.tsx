"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, useMotionValueEvent, useScroll, useSpring, type MotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import { chapters, type Chapter } from "@/lib/presentation";
import { themeFor } from "./themes";

const ObjectScene = dynamic(() => import("./ObjectScene"), { ssr: false });

function usePercent(mv: MotionValue<number>) {
  const [n, setN] = useState("0%");
  useMotionValueEvent(mv, "change", (v) => setN(`${Math.round(v * 100)}%`));
  return n;
}

export default function PresentationDeck() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 64, damping: 26, mass: 0.45 });
  const pct = usePercent(smooth);
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(smooth, "change", (v) => {
    const i = Math.min(chapters.length - 1, Math.max(0, Math.round(v * (chapters.length - 1))));
    setIdx(i);
  });
  const now = chapters[idx];
  const th = themeFor(now.mood ?? "ink");

  const jump = (i: number) => {
    document.getElementById(`ch-${chapters[i].id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={ref}
      data-presentation
      className="pres relative min-h-screen transition-colors duration-700"
      style={{
        background: `linear-gradient(180deg, ${th.bg[0]}, ${th.bg[1]})`,
        color: th.ink,
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700"
        style={{ background: `radial-gradient(64% 52% at 74% 12%, ${th.glow}, transparent 72%)` }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700"
        style={{ background: `radial-gradient(52% 44% at 18% 88%, ${th.glow}, transparent 76%)` }}
        aria-hidden
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between px-5 py-5 md:px-12">
        <div className="pointer-events-auto">
          <p className="text-[10px] tracking-[0.42em] uppercase" style={{ color: th.soft }}>
            Library of Shadows
          </p>
          <p className="mt-1 max-w-[14rem] truncate font-display text-lg" style={{ color: th.ink, opacity: 0.75 }}>
            {now.kicker}
          </p>
        </div>
        <div className="pointer-events-auto flex items-center gap-5 text-sm" style={{ color: th.soft }}>
          <span className="tabular-nums">
            {String(idx + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")} · {pct}
          </span>
          <Link href="/" style={{ color: th.ink }} className="opacity-70 hover:opacity-100">
            Storefront
          </Link>
        </div>
      </header>

      <nav className="pointer-events-none fixed top-[18%] bottom-[18%] left-4 z-30 hidden w-3 md:block">
        <div className="relative h-full w-px" style={{ background: `${th.ink}22` }}>
          <motion.div className="absolute top-0 left-0 w-px" style={{ height: pct, background: th.rail }} />
        </div>
        <div className="pointer-events-auto absolute inset-y-0 -left-1.5 flex flex-col justify-between">
          {chapters.map((c, i) => (
            <button
              key={c.id}
              type="button"
              aria-label={c.kicker}
              onClick={() => jump(i)}
              className="h-2 w-2 rounded-full border transition"
              style={{
                borderColor: th.rail,
                background: i === idx ? th.rail : "transparent",
                transform: i === idx ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </nav>

      <div className="pointer-events-none fixed top-0 right-0 z-10 hidden h-screen w-[54%] md:block">
        <ObjectScene index={idx} />
        <p
          className="absolute bottom-10 left-1/2 w-[20rem] -translate-x-1/2 text-center text-[11px] leading-relaxed tracking-[0.2em] uppercase"
          style={{ color: th.soft }}
        >
          {now.aside || now.kicker}
        </p>
      </div>

      <div className="relative z-20 md:w-[46%]">
        {chapters.map((c, i) => (
          <ChapterBlock key={c.id} chapter={c} index={i} />
        ))}
      </div>

      <div className="h-[40vh] md:hidden" />
    </div>
  );
}

function ChapterBlock({ chapter: c, index: i }: { chapter: Chapter; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const on = useInView(ref, { amount: 0.35, once: false });
  const cover = c.id === "cover";
  const close = c.id === "yes";
  const th = themeFor(c.mood ?? "ink");

  return (
    <section
      id={`ch-${c.id}`}
      ref={ref}
      className={`relative flex min-h-[100svh] flex-col px-6 md:px-14 ${
        cover || close ? "justify-center pb-16" : "justify-end pb-24 md:pb-28"
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-16 right-4 font-display text-[clamp(5rem,18vw,11rem)] leading-none select-none"
        style={{ color: th.accent, opacity: 0.12 }}
      >
        {String(i + 1).padStart(2, "0")}
      </span>

      <motion.div
        animate={{ y: on ? 0 : 26, opacity: on ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[11px] font-semibold tracking-[0.38em] uppercase" style={{ color: th.accent }}>
          {String(i + 1).padStart(2, "0")} · {c.kicker}
        </p>
        <h2
          className="mt-4 font-display leading-[0.98]"
          style={{
            color: th.ink,
            maxWidth: "32rem",
            fontSize: cover ? "clamp(3.2rem,9vw,6.4rem)" : "clamp(2.3rem,6.4vw,4.4rem)",
          }}
        >
          {c.title}
        </h2>
        {c.lede && (
          <p
            className={`mt-5 max-w-md leading-relaxed ${cover ? "text-lg italic" : "text-base"}`}
            style={{ color: th.soft }}
          >
            {c.lede}
          </p>
        )}
        {c.stat && (
          <p
            className="mt-8 font-display leading-none tracking-tight"
            style={{ color: th.accent, fontSize: "clamp(3rem,8vw,5.5rem)" }}
          >
            {c.stat}
            {c.statLabel && (
              <span className="mt-2 block font-body text-sm font-medium tracking-[0.18em] uppercase" style={{ color: th.soft }}>
                {c.statLabel}
              </span>
            )}
          </p>
        )}
        {c.bullets && (
          <ul className="mt-7 max-w-md space-y-3 text-sm" style={{ color: th.soft }}>
            {c.bullets.map((b, bi) => (
              <li
                key={b}
                className="flex gap-3 pl-4"
                style={{ borderLeftColor: `${th.accent}66`, borderLeftWidth: 2 }}
              >
                <span className="w-5 shrink-0 font-display" style={{ color: th.accent, opacity: 0.7 }}>
                  {String(bi + 1).padStart(2, "0")}
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        {c.rows && (
          <dl className="mt-7 max-w-md">
            {c.rows.map((r) => (
              <div
                key={r.label}
                className="flex justify-between gap-6 py-2.5 text-sm"
                style={{ borderBottomColor: `${th.ink}26`, borderBottomWidth: 1 }}
              >
                <dt style={{ color: th.soft }}>{r.label}</dt>
                <dd className="text-right font-medium" style={{ color: th.ink }}>
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
        {c.table && (
          <div className="mt-7 max-w-lg overflow-x-auto">
            <table className="w-full text-left text-[11px]" style={{ color: th.soft }}>
              <thead>
                <tr>
                  {c.table.head.map((h) => (
                    <th key={h} className="py-2 pr-3 font-medium tracking-wide uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.table.body.map((row, ri) => (
                  <tr key={ri} style={{ borderTopColor: `${th.ink}26`, borderTopWidth: 1 }}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="py-2.5 pr-3" style={{ color: ci === 0 ? th.ink : th.soft }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {c.note && (
          <p className="mt-6 max-w-md text-xs leading-relaxed" style={{ color: th.soft, opacity: 0.9 }}>
            {c.note}
          </p>
        )}
        {cover && (
          <p className="mt-12 text-[11px] font-semibold tracking-[0.32em] uppercase" style={{ color: th.accent }}>
            Scroll to turn the page
          </p>
        )}
      </motion.div>
    </section>
  );
}
