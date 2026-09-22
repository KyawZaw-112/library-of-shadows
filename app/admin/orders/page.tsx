"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LegacyAdminOrders() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/ops/orders/");
  }, [router]);
  return <p className="p-8 text-white/45">Moved to Ops → Orders…</p>;
}
