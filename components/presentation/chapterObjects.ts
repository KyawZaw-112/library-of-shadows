import type { Kind } from "./objects";

export type Slot = {
  kind: Kind;
  pos: [number, number, number];
  scale: number;
  /** main body colour */
  color: string;
  /** accent colour — ribbons, pins, ticks, highlights */
  color2: string;
};

const C = {
  navy: "#4a63b0",
  indigo: "#6366f1",
  violet: "#8b5cf6",
  plum: "#a855f7",
  sky: "#38bdf8",
  cyan: "#22d3ee",
  teal: "#2dd4bf",
  mint: "#34d399",
  grass: "#4ade80",
  lime: "#a3e635",
  amber: "#f59e0b",
  orange: "#fb923c",
  coral: "#fb7185",
  rose: "#f43f5e",
  pink: "#ec4899",
  gold: "#eab308",
  yellow: "#facc15",
  cream: "#fde68a",
  slate: "#64748b",
};

const M = (kind: Kind, color: string, color2: string): Slot => ({
  kind,
  pos: [0.18, 0.0, 0],
  scale: 1.0,
  color,
  color2,
});

const L = (kind: Kind, x: number, y: number, color: string, color2: string): Slot => ({
  kind,
  pos: [x, y, 0.36],
  scale: 0.42,
  color,
  color2,
});

/**
 * Two-to-three objects per page. The same kind never repeats across
 * neighbouring pages, so every transition swaps a visibly different shape.
 */
export const chapterSlots: Record<string, Slot[]> = {
  cover: [M("bookStack", C.navy, C.coral), L("star", -0.92, 0.5, C.gold, C.navy)],
  founders: [M("people", C.sky, C.gold), L("openBook", -0.98, -0.3, C.violet, C.gold)],
  objective: [M("pillars", C.violet, C.mint), L("badges", -0.95, 0.42, C.mint, C.violet)],
  problem: [M("clock", C.rose, C.coral), L("cone", -0.95, -0.32, C.orange, C.rose)],
  solution: [M("shelf", C.mint, C.gold), L("cart", -0.95, 0.44, C.teal, C.gold)],
  value: [M("gift", C.coral, C.sky), L("heart", -0.95, -0.3, C.pink, C.coral)],
  market: [M("phone", C.sky, C.pink), L("people", -0.95, 0.42, C.violet, C.sky)],
  journey: [M("funnel", C.indigo, C.teal), L("letter", -0.95, -0.3, C.amber, C.indigo)],
  pricing: [M("tags", C.coral, C.gold), L("coins", -0.95, 0.44, C.gold, C.coral)],
  revenue: [M("donut", C.mint, C.cream), L("coins", -0.95, -0.3, C.amber, C.mint)],
  costs: [M("coins", C.orange, C.navy), L("box", -0.95, 0.44, C.slate, C.orange)],
  profit: [M("bars", C.grass, C.gold), L("coins", -0.95, -0.3, C.lime, C.grass)],
  breakeven: [M("scale", C.teal, C.coral), L("bars", -0.95, 0.44, C.cyan, C.teal)],
  marketing: [M("megaphone", C.plum, C.gold), L("star", -0.95, -0.3, C.yellow, C.plum)],
  competitors: [M("columns", C.navy, C.rose), L("badges", -0.95, 0.44, C.rose, C.navy)],
  feasibility: [M("badges", C.mint, C.sky), L("path", -0.95, -0.3, C.sky, C.mint)],
  risk: [M("cone", C.coral, C.gold), L("box", -0.95, 0.44, C.slate, C.coral)],
  roadmap: [M("path", C.sky, C.pink), L("badges", -0.95, -0.3, C.pink, C.sky)],
  yes: [M("trophy", C.gold, C.coral), L("bookStack", -0.95, 0.44, C.navy, C.gold), L("heart", 0.0, -0.98, C.pink, C.gold)],
};
