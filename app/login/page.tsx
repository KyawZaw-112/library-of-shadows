"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";

export default function LoginPage() {
  const { login } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const go = (e: FormEvent) => {
    e.preventDefault();
    login(email, name);
    router.push("/");
  };

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-4xl text-mist">Sign in</h1>
      <p className="mt-2 text-sm text-mist/55">Demo auth — stored in your browser. Use an email with “admin” for the dashboard.</p>
      <form onSubmit={go} className="mt-6 space-y-3">
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@campus.edu" className="glass w-full rounded-xl px-4 py-3 text-sm" />
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Display name" className="glass w-full rounded-xl px-4 py-3 text-sm" />
        <button className="w-full rounded-full bg-ember py-3 font-semibold text-ink">Enter the stacks</button>
      </form>
      <button
        type="button"
        onClick={() => {
          login("reader@campus.edu", "Night Reader");
          router.push("/");
        }}
        className="mt-3 w-full rounded-full border border-ember/30 py-3 text-sm"
      >
        Continue with Google (demo)
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
