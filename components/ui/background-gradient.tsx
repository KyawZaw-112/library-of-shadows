"use client";

import { cn } from "@/lib/utils";

export function BackgroundGradient({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <div className={cn("group relative p-[1px]", containerClassName)}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-ember via-rose to-ember opacity-40 blur-sm transition duration-500 group-hover:opacity-80" />
      <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_90deg_at_50%_50%,#c4a574_0%,#1a1a1e_50%,#c4a574_100%)] opacity-25" />
      <div className={cn("relative rounded-2xl bg-ink", className)}>{children}</div>
    </div>
  );
}
