"use client";

import { cn } from "@/lib/utils";

export function ChromaticImage({
  src,
  alt = "",
  className,
  grayscale = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  grayscale?: boolean;
}) {
  if (!src.startsWith("http")) {
    return <div className={cn("h-full w-full bg-white/[0.04]", className)} />;
  }
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-black", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        className={`absolute inset-0 h-full w-full object-cover ${grayscale ? "grayscale" : ""}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    </div>
  );
}
