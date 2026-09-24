import { competitors, financials, founders, pricingTable } from "./business";

export type Chapter = {
  id: string;
  kicker: string;
  title: string;
  lede?: string;
  aside?: string;
  stat?: string;
  statLabel?: string;
  bullets?: string[];
  rows?: { label: string; value: string }[];
  table?: { head: string[]; body: string[][] };
  note?: string;
  /** theme of this beat — drives the whole scene's colour */
  mood: "ink" | "emerald" | "amber" | "rose" | "violet" | "sky" | "sun";
  /** which 3D piece belongs to this page */
  object: string;
};

const F = founders.map((f) => ({ label: f.name, value: f.id }));

export const chapters: Chapter[] = [
  {
    id: "cover",
    kicker: "Digital business project",
    title: "Library of Shadows",
    lede: "Find your next story. A profitable, feasible e-bookstore for Bangkok students.",
    aside: "Scroll. Each page brings its own object.",
    mood: "ink",
    object: "bookStack",
  },
  {
    id: "founders",
    kicker: "The house",
    title: "Six founders",
    rows: F,
    mood: "violet",
    object: "people",
  },
  {
    id: "objective",
    kicker: "Why we exist",
    title: "Wanted. Realistic. Profitable.",
    bullets: [
      "Create customer value — easier discovery, affordable bundles.",
      "Generate sustainable profit — sales, memberships, stationery.",
      "Remain feasible — existing payments, limited range, test then expand.",
    ],
    note: "Key principle: a good e-business should be wanted by customers, realistic to operate, and able to generate sustainable profit.",
    mood: "sky",
    object: "pillars",
  },
  {
    id: "problem",
    kicker: "The problem",
    title: "Bookstores ask for time we do not have.",
    bullets: [
      "Not enough time to visit shops",
      "Hard to choose the right book",
      "Need affordable prices",
      "Need convenient delivery",
      "Too many titles, too many tastes",
    ],
    mood: "rose",
    object: "clock",
  },
  {
    id: "solution",
    kicker: "Our answer",
    title: "A shelf that already knows you.",
    bullets: [
      "Curated books",
      "Easy search",
      "Personalized recommendations",
      "Book bundles",
      "Digital payment",
      "Home delivery",
      "Customer reviews",
    ],
    mood: "emerald",
    object: "shelf",
  },
  {
    id: "value",
    kicker: "Why us",
    title: "Between mega-retail and the corner shop.",
    bullets: [
      "Affordable — competitive prices and student-friendly bundles",
      "Personalized — genres, purchases, reading goals",
      "Convenient — mobile-first site, no store visit needed",
      "Attractive bundles — Starter, Self-Development, Romance, Mystery, English",
      "Community — reviews, ratings, shared picks, loyalty points",
    ],
    note: "More tailored and community-driven than mega-retailers, but more convenient, affordable, and accessible than local shops.",
    mood: "emerald",
    object: "gift",
  },
  {
    id: "market",
    kicker: "Who we serve",
    title: "18–30 · Bangkok · mobile first",
    rows: [
      { label: "Age range", value: "18–30" },
      { label: "Initial location", value: "Bangkok" },
      { label: "Average target price", value: "฿299" },
      { label: "Primary behaviour", value: "Mobile · daily digital engagement" },
    ],
    note: "University students, young professionals, English learners. TikTok, Instagram, Facebook, LINE, Google.",
    mood: "sky",
    object: "phone",
  },
  {
    id: "journey",
    kicker: "B2C model",
    title: "Discover → keep.",
    bullets: [
      "Discover — TikTok / IG / Google",
      "Explore — the site",
      "Choose — search + recommend",
      "Order — cart",
      "Pay — PromptPay / card",
      "Fulfill — pack the book",
      "Deliver — door",
      "Retain — reviews / points",
    ],
    mood: "violet",
    object: "funnel",
  },
  {
    id: "pricing",
    kicker: "Products & pricing",
    title: "Student prices, healthy margins.",
    table: {
      head: ["Product", "Price", "Variable", "Contribution"],
      body: pricingTable.map((r) => [r.name, `฿${r.price}`, `฿${r.cost}`, `฿${r.contrib}`]),
    },
    note: "Example bundles: Student Starter ฿699 · Self-Development ฿799 · Romance ฿799. First-order promotion, loyalty rewards.",
    mood: "amber",
    object: "tags",
  },
  {
    id: "revenue",
    kicker: "How we earn",
    title: "70 · 20 · 10",
    stat: "70%",
    statLabel: "individual books",
    rows: [
      { label: "Individual book sales", value: "70%" },
      { label: "Bundles & memberships", value: "20%" },
      { label: "Stationery & gifts", value: "10%" },
    ],
    note: "Strategy: attract first purchase → repeat purchase → membership loyalty. Later: e-books, used-book marketplace, author events, corporate orders.",
    mood: "amber",
    object: "donut",
  },
  {
    id: "costs",
    kicker: "Cost structure",
    title: "฿170 a copy. ฿100,000 a month.",
    rows: [
      { label: "Book purchasing cost", value: "฿140" },
      { label: "Packaging", value: "฿10" },
      { label: "Delivery allocation", value: "฿15" },
      { label: "Payment processing", value: "฿5" },
      { label: "Storage", value: "฿25,000" },
      { label: "Staff / operations", value: "฿35,000" },
      { label: "Digital advertising", value: "฿20,000" },
      { label: "Website / software", value: "฿8,000" },
      { label: "Admin / utilities / contingency", value: "฿12,000" },
    ],
    note: "Cost control: bulk-buy popular books, avoid overstock, standardized packaging, track ad performance, negotiate with suppliers.",
    mood: "rose",
    object: "coins",
  },
  {
    id: "profit",
    kicker: "Base case · 1,200 books",
    title: "฿54,800 operating profit / month",
    stat: "฿54,800",
    statLabel: "operating profit / month",
    rows: [
      { label: "Monthly revenue", value: `฿${financials.revenueMo.toLocaleString()}` },
      { label: "Annual revenue", value: `฿${financials.revenueYr.toLocaleString()}` },
      { label: "Annual operating profit", value: `฿${financials.profitYr.toLocaleString()}` },
    ],
    mood: "emerald",
    object: "bars",
  },
  {
    id: "breakeven",
    kicker: "Break-even",
    title: "776 books. Then we breathe.",
    stat: "776",
    statLabel: "books to break even",
    lede: "Fixed ฿100,000 ÷ contribution ฿129. Target 1,200 sits comfortably above the line.",
    rows: [
      { label: "Break-even units", value: `${financials.breakEvenBooks} books / month` },
      { label: "Break-even sales", value: `฿${financials.breakEvenSales.toLocaleString()}` },
      { label: "Target", value: `${financials.targetBooks} / month` },
    ],
    mood: "sun",
    object: "scale",
  },
  {
    id: "marketing",
    kicker: "Funnel",
    title: "Discover. Trust. Trial. Repeat. Refer.",
    bullets: [
      "TikTok — recommendations, review videos, reading challenges, influencer collabs",
      "Instagram — book photos, reels, new arrivals, aesthetic content",
      "LINE — order updates, loyalty rewards, customer service",
      "Google — SEO, search ads, blog articles",
      "Influencers — BookTok, university, English-learning creators",
    ],
    mood: "violet",
    object: "megaphone",
  },
  {
    id: "competitors",
    kicker: "Vs the giants",
    title: "They have scale. We have a point of view.",
    table: {
      head: ["Factor", "Us", "SE-ED", "Naiin", "Asia Books"],
      body: competitors.map((r) => [r.factor, r.us, r.seed, r.naiin, r.asia]),
    },
    note: "Where competitors offer scale, Library of Shadows offers connection — personalization, student bundles, community, simple digital experience.",
    mood: "ink",
    object: "columns",
  },
  {
    id: "feasibility",
    kicker: "Can we actually run this?",
    title: "Pilot 500–800 titles first.",
    bullets: [
      "Market — students, young readers, professionals, English learners",
      "Technical — site, payment gateway, database, LINE, analytics",
      "Operational — small storage, limited inventory, delivery partners",
      "Financial — ฿358,800/mo revenue, ฿54,800/mo profit, BE at 776",
      "Legal / ethical — copyright, consumer protection, payment security, privacy",
    ],
    note: "Pilot-first: measure sales, feedback, repeat purchases, delivery performance, inventory turnover.",
    mood: "sky",
    object: "badges",
  },
  {
    id: "risk",
    kicker: "What can kill us",
    title: "Inventory is the main risk.",
    bullets: [
      "Low demand → pilot launch + customer surveys",
      "Too much inventory → start with popular books",
      "Strong competition → personalization and bundles",
      "Delivery problems → reliable delivery partners",
      "Price competition → focus on value, not a race to ฿0",
    ],
    note: "Solution: use sales data to identify bestsellers, cut slow movers, adjust purchasing, discount old stock.",
    mood: "rose",
    object: "cone",
  },
  {
    id: "roadmap",
    kicker: "Four phases",
    title: "Validate. Pilot. Optimize. Scale.",
    bullets: [
      "Weeks 1–2 — customer surveys, research categories, check competitor prices, website prototype",
      "Weeks 3–6 — launch 500–800 titles, target students, start social marketing, collect feedback",
      "Months 2–3 — improve recommendations, add popular books, improve packaging, adjust pricing",
      "Months 4–12 — increase selection, add e-books & memberships, partner with universities, expand delivery",
    ],
    note: "Core launch metrics: orders/month, revenue, contribution margin, CAC, repeat rate, AOV, inventory turnover, rating, refund rate.",
    mood: "amber",
    object: "path",
  },
  {
    id: "yes",
    kicker: "Recommendation",
    title: "Yes — but start small.",
    bullets: [
      "Clear customer need — convenient and affordable discovery",
      "Realistic digital model — discover, order, pay, review, all online",
      "Positive base-case financials — ฿54,800/month operating profit",
      "Measurable break-even — roughly 776 books/month",
      "Main uncertainty — repeat purchase and inventory management",
    ],
    lede: "Scale only when sales sit above break-even, readers return, stock turns, delivery holds, and margins stay honest.",
    aside: "Because the numbers say it works — and starting small means we find out cheap.",
    mood: "emerald",
    object: "trophy",
  },
];
