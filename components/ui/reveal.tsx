"use client";

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

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "ul" | "li" | "section";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={cn(className)}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "li" | "section";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "li" | "section";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag className={cn(className)} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}
