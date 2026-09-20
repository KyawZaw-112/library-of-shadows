"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FlyItem = { id: string; from: DOMRect };

const FlyCtx = createContext<{ fly: (el: HTMLElement | null) => void } | null>(null);

export function FlyProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<FlyItem[]>([]);
  const seq = useRef(0);

  const fly = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    seq.current += 1;
    const id = `fly-${seq.current}`;
    setItems((prev) => [...prev, { id, from: el.getBoundingClientRect() }]);
    window.setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== id)), 950);
  }, []);

  return (
    <FlyCtx.Provider value={{ fly }}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
        <AnimatePresence>
          {items.map((it) => (
            <motion.span
              key={it.id}
              initial={{ x: it.from.x, y: it.from.y, scale: 1, opacity: 0.95 }}
              animate={{ x: 28, y: 18, scale: 0.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 top-0 block h-24 w-20 bg-white/[0.06] ring-1 ring-white/30"
            />
          ))}
        </AnimatePresence>
      </div>
    </FlyCtx.Provider>
  );
}

export function useFly() {
  const c = useContext(FlyCtx);
  return c?.fly ?? (() => {});
}
