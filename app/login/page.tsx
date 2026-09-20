"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import { AuthShell } from "@/components/ui/auth-shell";

export default function LoginPage() {
  const { signIn } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const go = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const msg = await signIn(email, password);
    setBusy(false);
    if (msg) setErr(msg);
    else router.push("/");
  };

  const google = async () => {
    if (!supabase) return setErr("Supabase is not configured.");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/" },
    });
    if (error) setErr(error.message);
  };

  return (
    <AuthShell
      title="Sign in"
      subtitle="Admin emails contain “admin”."
      image="https://covers.openlibrary.org/b/id/10523338-L.jpg"
    >
      <form onSubmit={go} className="space-y-3">
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@campus.edu" className="glass w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30" />
        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="glass w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30" />
        {err && <p className="text-sm text-white">{err}</p>}
        <motion.button
          type="submit"
          disabled={busy}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-full bg-white py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-40"
        >
          {busy ? "Opening…" : "Enter the stacks"}
        </motion.button>
      </form>
      <button type="button" onClick={google} className="mt-3 w-full rounded-full border border-white/20 py-3 text-sm text-white hover:border-white/50">
        Continue with Google
      </button>
      <p className="mt-4 text-sm text-white/50">
        New here?{" "}
        <Link href="/register/" className="text-white underline">
          Create account
        </Link>
      </p>
    </AuthShell>
  );
}
