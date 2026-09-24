export type Mood = "ink" | "emerald" | "amber" | "rose" | "violet" | "sky" | "sun";

export type Theme = {
  /** page gradient — soft pastel, like the reference icon's ground */
  bg: [string, string];
  /** headline ink — deep navy, never pure black */
  ink: string;
  /** muted body text */
  soft: string;
  /** vivid accent for kickers, stats, rules */
  accent: string;
  /** soft blob behind the objects */
  glow: string;
  /** scroll rail */
  rail: string;
};

const INK = "#26314f";
const SOFT = "rgba(38,49,79,0.62)";

export const themes: Record<Mood, Theme> = {
  ink: {
    bg: ["#eef2ff", "#dbe4ff"],
    ink: INK,
    soft: SOFT,
    accent: "#5b6ef5",
    glow: "rgba(122,142,255,0.30)",
    rail: "#5b6ef5",
  },
  violet: {
    bg: ["#f4eeff", "#e3d7ff"],
    ink: INK,
    soft: SOFT,
    accent: "#8b5cf6",
    glow: "rgba(167,139,250,0.30)",
    rail: "#8b5cf6",
  },
  sky: {
    bg: ["#e9f5ff", "#d0e9ff"],
    ink: INK,
    soft: SOFT,
    accent: "#2f9be0",
    glow: "rgba(91,184,240,0.32)",
    rail: "#2f9be0",
  },
  emerald: {
    bg: ["#e7faf2", "#cdf2e2"],
    ink: INK,
    soft: SOFT,
    accent: "#14a87c",
    glow: "rgba(79,195,161,0.32)",
    rail: "#14a87c",
  },
  amber: {
    bg: ["#fff5e6", "#ffe6c4"],
    ink: INK,
    soft: SOFT,
    accent: "#d9822b",
    glow: "rgba(255,176,124,0.34)",
    rail: "#d9822b",
  },
  rose: {
    bg: ["#ffeef4", "#ffd7e3"],
    ink: INK,
    soft: SOFT,
    accent: "#e2547e",
    glow: "rgba(255,143,184,0.32)",
    rail: "#e2547e",
  },
  sun: {
    bg: ["#fffce6", "#fff0b8"],
    ink: INK,
    soft: SOFT,
    accent: "#c9a000",
    glow: "rgba(255,206,74,0.34)",
    rail: "#c9a000",
  },
};

export function themeFor(mood: Mood): Theme {
  return themes[mood] ?? themes.ink;
}
