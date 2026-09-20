"use client";

import { cn } from "@/lib/utils";

export function MovingBorderButton({
  children,
  className,
  borderClassName,
  as: Tag = "button",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  borderClassName?: string;
  as?: React.ElementType;
} & Record<string, unknown>) {
  return (
    <Tag className={cn("relative inline-flex overflow-hidden rounded-full p-[1px]", className)} {...props}>
      <span className={cn("absolute inset-[-100%] animate-border-spin bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#c4a574_50%,transparent_100%)]", borderClassName)} />
      <span className="relative z-10 inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-ember">
        {children}
      </span>
    </Tag>
  );
}
