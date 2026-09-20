"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { genres } from "@/lib/catalog";
import { useStore } from "@/lib/store";

const goals = [
  { id: "leisure", label: "Leisure / novels" },
  { id: "self_dev", label: "Self-development" },
  { id: "english", label: "English fluency" },
  { id: "exams", label: "Exams & campus" },
];

export default function OnboardingPage() {
  const { user, completeOnboarding, login } = useStore();
  const [picked, setPicked] = useState<string[]>(user?.genres ?? []);
  const [goal, setGoal] = useState(user?.goal || "leisure");
  const router = useRouter();

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <h1 className="font-display text-4xl text-mist">Taste quiz</h1>
      <p className="mt-2 text-sm text-mist/55">Sixty seconds. We light Recommended from this.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {genres.map((g) => {
          const on = picked.includes(g.slug);
          return (
            <button
              key={g.slug}
              type="button"
              onClick={() => setPicked((p) => (on ? p.filter((s) => s !== g.slug) : [...p, g.slug]))}
              className={`rounded-full border px-4 py-2 text-sm ${on ? "border-ember bg-ember/20 text-ember" : "border-ember/20"}`}
            >
              {g.name}
            </button>
          );
        })}
      </div>
      <div className="mt-6 space-y-2">
        {goals.map((g) => (
          <label key={g.id} className="glass flex items-center gap-2 rounded-xl px-4 py-3 text-sm">
            <input type="radio" checked={goal === g.id} onChange={() => setGoal(g.id)} />
            {g.label}
          </label>
        ))}
      </div>
      <button
        className="mt-8 w-full rounded-full bg-ember py-3 font-semibold text-ink"
        onClick={() => {
          if (!user) login("guest@shadows.local", "Guest reader", { genres: picked, goal });
          else completeOnboarding(picked, goal);
          router.push("/");
        }}
      >
        Light my shelf
      </button>
    </main>
  );
}
