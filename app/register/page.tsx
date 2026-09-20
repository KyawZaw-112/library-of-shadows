"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function RegisterPage() {
  const { signUp } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  const go = async (e: FormEvent) => {
    e.preventDefault();
    const msg = await signUp(email, password, name);
    if (msg) {
      setErr(msg);
      return;
    }
    setInfo("Check your email if confirmation is on, then sign in.");
    router.push("/onboarding/");
  };

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-4xl text-mist">Create account</h1>
      <form onSubmit={go} className="mt-6 space-y-3">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="glass w-full rounded-xl px-4 py-3 text-sm" />
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="glass w-full rounded-xl px-4 py-3 text-sm" />
        <input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 6)" className="glass w-full rounded-xl px-4 py-3 text-sm" />
        {err && <p className="text-sm text-rose">{err}</p>}
        {info && <p className="text-sm text-ember">{info}</p>}
        <button className="w-full rounded-full bg-ember py-3 font-semibold text-ink">Join</button>
      </form>
    </main>
  );
}
