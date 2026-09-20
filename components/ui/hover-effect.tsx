"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function HoverEffect({
  items,
  className,
}: {
  items: { title: string; description: string }[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 py-2 md:grid-cols-3", className)}>
      {items.map((item, idx) => (
        <motion.div
          key={item.title + idx}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="group relative h-full overflow-hidden border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/30"
        >
          <div className="relative z-10">
            <div className="font-display text-xl text-white">{item.title}</div>
            <p className="mt-2 text-sm text-white/50">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
