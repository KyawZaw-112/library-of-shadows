"use client";

import { cn } from "@/lib/utils";

export function BentoGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid auto-rows-[18rem] grid-cols-1 gap-4 md:grid-cols-3", className)}>{children}</div>;
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
}: {
  className?: string;
  title?: string;
  description?: string;
  header?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group row-span-1 flex flex-col justify-end overflow-hidden border border-white/10 bg-white/[0.02] transition-colors hover:border-white/25",
        className,
      )}
    >
      <div className="relative min-h-0 flex-1">{header}</div>
      <div className="relative z-10 p-4">
        <div className="font-display text-xl text-white">{title}</div>
        <div className="text-xs text-white/45">{description}</div>
      </div>
    </div>
  );
}
