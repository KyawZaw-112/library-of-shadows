"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const paths = [
    "M-380 -189s-13 199 31 414c47 216 62 322 31 414",
    "M-300 -189s13 199-31 414c-47 216-62 322-31 414",
    "M-220 -189s-8 180 20 380c40 200 50 300 20 380",
    "M-140 -80s10 160-10 320c-30 180-20 260 10 340",
    "M-60 0s-12 140 18 280c28 160 40 220 12 300",
    "M20 40s8 120-16 240c-22 140-18 200 8 280",
    "M100 20s-6 130 22 250c24 150 30 210 10 290",
  ];
  return (
    <div className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}>
      <svg className="h-full w-full" viewBox="0 0 696 316" fill="none">
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="url(#ember-beam)"
            strokeOpacity="0.35"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        ))}
        <defs>
          <linearGradient id="ember-beam" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#c4a574" stopOpacity="0" />
            <stop offset="0.5" stopColor="#c4a574" />
            <stop offset="1" stopColor="#d48aa8" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
