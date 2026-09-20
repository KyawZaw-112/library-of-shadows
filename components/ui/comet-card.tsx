"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function CometCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn("relative rounded-2xl", className)}
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,0%),rgba(232,184,109,0.45),transparent_55%)] opacity-70" />
      <div className="relative overflow-hidden rounded-2xl border border-ember/20 bg-ink/90 shadow-[0_0_40px_rgba(232,184,109,0.15)]">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-40 w-24 -translate-x-1/2 rotate-12 bg-gradient-to-b from-white/40 to-transparent blur-md" />
        {children}
      </div>
    </motion.div>
  );
}
