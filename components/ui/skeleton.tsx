"use client";

import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "skeleton rounded-sm bg-white/[0.06] ring-1 ring-inset ring-white/[0.07]",
        className,
      )}
      aria-hidden
    />
  );
}

/** Book grid placeholder — matches the BookCard layout the data fills in. */
export function BookCardSkeleton() {
  return (
    <div className="flex h-full flex-col border border-white/10 bg-white/[0.02] p-4">
      <Skeleton className="mb-4 aspect-[3/4] w-full ring-0" />
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="mt-2 h-3 w-1/2" />
      <div className="mt-3 flex items-center justify-between">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-3 w-10" />
      </div>
      <Skeleton className="mt-3 h-9 w-full rounded-full" />
    </div>
  );
}

export function BookGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Two-column product detail placeholder. */
export function ProductSkeleton() {
  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="space-y-4">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-12 w-4/5" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-6 h-9 w-32" />
        <Skeleton className="h-24 w-full" />
        <div className="flex gap-3 pt-4">
          <Skeleton className="h-11 w-36 rounded-full" />
          <Skeleton className="h-11 w-11 rounded-full" />
        </div>
      </div>
    </main>
  );
}

/** Header/title block placeholder used above page content. */
export function HeadingSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-3.5 w-80" />
    </div>
  );
}
