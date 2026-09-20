"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TextGenerateEffect({ words, className }: { words: string; className?: string }) {
  const parts = words.split(" ");
  return (
    <div className={cn("font-display", className)}>
      {parts.map((word, i) => (
        <motion.span
          key={i}
          className="mr-[0.25em] inline-block"
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
