"use client";

import { ChromaticImage } from "./chromatic-image";

export function AuthShell({
  title,
  subtitle,
  children,
  image,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  image?: string;
}) {
  return (
    <main className="mx-auto grid max-w-5xl items-stretch gap-0 px-4 py-10 md:grid-cols-2 md:py-16">
      <div className="relative hidden min-h-[420px] overflow-hidden border border-white/10 md:block">
        {image ? (
          <ChromaticImage src={image} grayscale className="absolute inset-0" />
        ) : (
          <div className="absolute inset-0 bg-white/[0.03]" />
        )}
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <p className="font-display text-4xl text-white">Library of Shadows</p>
          <p className="mt-2 text-sm text-white/70">Find your next story.</p>
        </div>
      </div>
      <div className="glass relative rounded-3xl p-8 md:rounded-l-none">
        <h1 className="font-display text-4xl text-white">{title}</h1>
        <p className="mt-2 text-sm text-white/45">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
