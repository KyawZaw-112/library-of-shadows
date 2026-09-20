"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/ui/reveal";
import { GenreGrid } from "@/components/ui/genre-grid";
import { motion } from "framer-motion";

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
    <main className="mx-auto max-w-xl px-4 py-16">
      <Reveal>
      <h1 className="font-display text-5xl text-white">Taste quiz</h1>
      <p className="mt-2 text-sm text-white/45">Sixty seconds. We light Recommended from this.</p>
      </Reveal>
      <h2 className="mt-10 text-[11px] tracking-[0.25em] text-white/40 uppercase">Genres</h2>
      <Reveal delay={0.1} className="mt-4">
        <GenreGrid
          picked={picked}
          onToggle={(slug) =>
            setPicked((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]))
          }
        />
      </Reveal>
      <h2 className="mt-10 text-[11px] tracking-[0.25em] text-white/40 uppercase">Goal</h2>
      <div className="mt-3 space-y-2">
        {goals.map((g) => (
          <label key={g.id} className="glass flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-sm text-white/80">
            <input type="radio" checked={goal === g.id} onChange={() => setGoal(g.id)} className="accent-white" />
            {g.label}
          </label>
        ))}
      </div>
      <motion.button
        whileTap={{ scale: 0.99 }}
        className="mt-10 w-full rounded-full bg-white py-3 font-medium text-black transition hover:bg-white/90"
        onClick={() => {
          if (!user) login("guest@shadows.local", "Guest reader", { genres: picked, goal });
          else completeOnboarding(picked, goal);
          router.push("/");
        }}
      >
        Light my shelf
      </motion.button>
    </main>
  );
}
