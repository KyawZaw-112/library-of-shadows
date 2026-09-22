"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LegacyAdminAnalytics() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/owner/analytics/");
  }, [router]);
  return <p className="p-8 text-white/45">Moved to Owner → Finance…</p>;
}
