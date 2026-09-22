"use client";

import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl text-white">Library of Shadows</p>
          <p className="mt-2 text-sm text-white/40">Find your next story. Bangkok · 18–30.</p>
        </div>
        <div>
          <p className="text-[11px] tracking-widest text-white/50 uppercase">Shop</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/65">
            <Link href="/catalog/" className="hover:text-white">
              Catalog
            </Link>
            <Link href="/onboarding/" className="hover:text-white">
              Taste quiz
            </Link>
            <Link href="/wishlist/" className="hover:text-white">
              Wishlist
            </Link>
          </div>
        </div>
        <div>
          <p className="text-[11px] tracking-widest text-white/50 uppercase">House</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/65">
            <Link href="/about/" className="hover:text-white">
              About
            </Link>
            <Link href="/business/" className="hover:text-white">
              Business model
            </Link>
            <Link href="/support/" className="hover:text-white">
              FAQ / LINE
            </Link>
          </div>
        </div>
        <div>
          <p className="text-[11px] tracking-widest text-white/50 uppercase">Social</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/65">
            <span>TikTok</span>
            <span>Instagram</span>
            <span>Facebook</span>
          </div>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-[11px] text-white/30">
        Covers via Open Library · © Library of Shadows
      </p>
    </footer>
  );
}
