"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useRef } from "react";
import { cartCount, useStore } from "@/lib/store";

export function CartButton({ className }: { className?: string }) {
  const { cart } = useStore();
  const n = cartCount(cart);

  return (
    <Link
      href="/cart/"
      className={`relative inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:border-white/40 ${className ?? ""}`}
      aria-label="Cart"
    >
      <motion.div
        key={n}
        initial="initial"
        animate={n > 0 ? "pop" : "initial"}
        variants={{
          initial: { scale: 1 },
          pop: { scale: [1, 1.35, 1], transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
        }}
        className="relative"
      >
        <ShoppingBag className="h-4 w-4" />
        {n > 0 && (
          <motion.span
            layout
            className="absolute -top-2 -right-2 grid h-4 min-w-[16px] place-items-center rounded-full bg-white px-0.5 text-[10px] font-medium text-black"
          >
            {n}
          </motion.span>
        )}
      </motion.div>
      <span className="hidden sm:block">Cart</span>
    </Link>
  );
}
