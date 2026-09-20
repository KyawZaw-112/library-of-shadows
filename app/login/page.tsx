"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";

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
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-4xl text-mist">Sign in</h1>
      <p className="mt-2 text-sm text-mist/55">Uses your Supabase project. Admin: email containing “admin”.</p>
      <form onSubmit={go} className="mt-6 space-y-3">
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@campus.edu" className="glass w-full rounded-xl px-4 py-3 text-sm" />
        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="glass w-full rounded-xl px-4 py-3 text-sm" />
        {err && <p className="text-sm text-rose">{err}</p>}
        <button disabled={busy} className="w-full rounded-full bg-ember py-3 font-semibold text-ink">
          {busy ? "Opening…" : "Enter the stacks"}
        </button>
      </form>
      <button type="button" onClick={google} className="mt-3 w-full rounded-full border border-ember/30 py-3 text-sm">
        Continue with Google
      </button>
      <p className="mt-4 text-sm text-mist/50">
        New here?{" "}
        <Link href="/register/" className="text-ember">
          Create account
        </Link>
      </p>
    </main>
  );
}
