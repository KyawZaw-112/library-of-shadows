"use client";

import dynamic from "next/dynamic";

const PresentationDeck = dynamic(() => import("@/components/presentation/PresentationDeck"), {
  ssr: false,
  loading: () => (
    <main className="grid min-h-screen place-items-center bg-[#eef2ff] text-[#26314f]/45">Opening the stacks…</main>
  ),
});

export default function PresentationPage() {
  return <PresentationDeck />;
}
