"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export function FloatingNav({
  navItems,
  className,
}: {
  navItems: { name: string; link: string; icon?: React.ReactNode }[];
  className?: string;
}) {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed inset-x-0 top-4 z-50 mx-auto flex max-w-fit items-center justify-center space-x-1 rounded-full border border-white/12 bg-black/70 px-2 py-1.5 backdrop-blur-xl",
        className,
      )}
    >
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          className="relative flex items-center space-x-1 rounded-full px-3 py-1.5 text-xs text-white/70 hover:text-white sm:text-sm"
        >
          {item.icon}
          <span className="hidden sm:block">{item.name}</span>
        </Link>
      ))}
    </motion.div>
  );
}
