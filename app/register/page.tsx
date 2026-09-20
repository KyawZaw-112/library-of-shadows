"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function RegisterPage() {
  const { login } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const go = (e: FormEvent) => {
    e.preventDefault();
    login(email, name);
    router.push("/onboarding/");
  };

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-4xl text-mist">Create account</h1>
      <form onSubmit={go} className="mt-6 space-y-3">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="glass w-full rounded-xl px-4 py-3 text-sm" />
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="glass w-full rounded-xl px-4 py-3 text-sm" />
        <input required type="password" placeholder="Password (demo)" className="glass w-full rounded-xl px-4 py-3 text-sm" />
        <button className="w-full rounded-full bg-ember py-3 font-semibold text-ink">Join</button>
      </form>
    </main>
  );
}
