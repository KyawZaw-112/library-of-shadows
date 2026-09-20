"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

/**
 * Scroll reveal that degrades gracefully.
 *
 * Framer-motion's `whileInView` can leave content stranded at opacity: 0 when
 * the IntersectionObserver reports off-screen at hydration (static exports on
 * slow networks, or `once: true` firing before layout). We drive visibility
 * ourselves: observe the real element, and reveal anyway after a fallback
 * timeout so nothing stays invisible.
 */
function useInViewSafe(rootMargin = "-60px") {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) {
      const t = window.setTimeout(() => setShown(true), 1000);
      return () => window.clearTimeout(t);
    }
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setShown(true);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal();
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    // If the observer never reports in time (hidden tab, bad measurement),
    // show the content anyway — invisible content is worse than no animation.
    const fallback = window.setTimeout(reveal, 1600);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [rootMargin, shown]);

  return { ref, shown };
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, shown } = useInViewSafe("-60px");
  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={fadeUp}
      initial={shown ? false : "hidden"}
      animate={shown ? "show" : undefined}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, shown } = useInViewSafe("-40px");
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={stagger}
      initial={shown ? false : "hidden"}
      animate={shown ? "show" : undefined}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <motion.div className={cn(className)} variants={fadeUp}>{children}</motion.div>;
}
