"use client";

import { motion } from "framer-motion";
import { genres } from "@/lib/catalog";

export function GenreGrid({
  picked,
  onToggle,
}: {
  picked: string[];
  onToggle: (slug: string) => void;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
      {genres.map((g, i) => {
        const on = picked.includes(g.slug);
        return (
          <motion.button
            key={g.slug}
            type="button"
            onClick={() => onToggle(g.slug)}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            className={`group relative flex flex-col items-start gap-3 p-6 text-left transition-colors ${
              on ? "bg-white text-black" : "bg-ink hover:bg-white/[0.04]"
            }`}
          >
            <span
              className={`font-display text-xs tabular-nums ${
                on ? "text-black/40" : "text-white/30"
              }`}
            >
              0{i + 1}
            </span>

            <span className="flex w-full items-center justify-between gap-3">
              <span className="font-display text-2xl leading-tight">{g.name}</span>
              <motion.span
                animate={{ scale: on ? 1 : 0.6, opacity: on ? 1 : 0.25 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`grid h-5 w-5 shrink-0 place-items-center border ${
                  on ? "border-black" : "border-white/30"
                }`}
              >
                {on && (
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </motion.span>
            </span>

            <span
              className={`text-xs leading-relaxed ${
                on ? "text-black/55" : "text-white/40"
              }`}
            >
              {g.hint}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
