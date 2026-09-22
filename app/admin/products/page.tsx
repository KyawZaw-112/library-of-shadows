"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LegacyAdminProducts() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/ops/inventory/");
  }, [router]);
  return <p className="p-8 text-white/45">Moved to Ops → Inventory…</p>;
}
