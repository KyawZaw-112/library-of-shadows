"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { AuthShell } from "@/components/ui/auth-shell";

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
    <AuthShell
      title="Create account"
      subtitle="Join the stacks. Then a 60-second taste quiz."
      image="https://covers.openlibrary.org/b/id/8231856-L.jpg"
    >
      <form onSubmit={go} className="space-y-3">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="glass w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30" />
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="glass w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30" />
        <input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 6)" className="glass w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30" />
        {err && <p className="text-sm text-white">{err}</p>}
        {info && <p className="text-sm text-white/70">{info}</p>}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-full bg-white py-3 text-sm font-medium text-black transition hover:bg-white/90"
        >
          Join
        </motion.button>
      </form>
      <p className="mt-4 text-sm text-white/50">
        Already a reader?{" "}
        <Link href="/login/" className="text-white underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
