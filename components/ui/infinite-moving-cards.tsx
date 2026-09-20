"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "slow",
  className,
}: {
  items: { quote: string; name: string; title: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;
    const scroller = scrollerRef.current;
    Array.from(scroller.children).forEach((item) => {
      scroller.appendChild(item.cloneNode(true));
    });
    containerRef.current.style.setProperty("--animation-direction", direction === "left" ? "forwards" : "reverse");
    containerRef.current.style.setProperty("--animation-duration", speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s");
    setStart(true);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-6xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className,
      )}
    >
      <ul ref={scrollerRef} className={cn("flex w-max min-w-full shrink-0 gap-4 py-4", start && "animate-scroll")}>
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[280px] shrink-0 border border-white/10 bg-white/[0.02] px-6 py-5 md:w-[360px]"
          >
            <p className="text-sm text-white/70">{item.quote}</p>
            <p className="mt-4 font-display text-lg text-white">{item.name}</p>
            <p className="text-xs text-white/40">{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
