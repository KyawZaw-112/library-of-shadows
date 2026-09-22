"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { deskHome } from "@/lib/roles";
import { useStore } from "@/lib/store";
import { Forbidden } from "@/components/desk/DeskShell";

/** Legacy URL — send staff to ops, owners to owner desk. */
export default function AdminRedirect() {
  const { user, ready } = useStore();
  const router = useRouter();
  useEffect(() => {
    if (!ready) return;
    if (user) router.replace(deskHome(user.role));
  }, [ready, user, router]);
  if (!user) return <Forbidden need="Staff or owner sign-in required." />;
  return <p className="p-8 text-white/45">Opening desk…</p>;
}
