export type Genre = {
  slug: string;
  name: string;
  hint: string;
};

export type Product = {
  id: string;
  slug: string;
  sku: string;
  title: string;
  author: string;
  genre: string;
  genreSlug: string;
  price: number;
  compareAt?: number;
  rating: number;
  ratingCount: number;
  format: "Physical" | "Bundle";
  tag?: string;
  cover: string;
  description: string;
  stock: number;
  contents?: string[];
};

export const genres: Genre[] = [
  { slug: "self-development", name: "Self-Development", hint: "Become the version you keep promising" },
  { slug: "romance", name: "Romance", hint: "Slow burn, late nights, last pages" },
  { slug: "mystery", name: "Mystery / Thriller", hint: "Keep the lamp on" },
  { slug: "english-learning", name: "English Learning", hint: "Read your way into fluency" },
  { slug: "fiction", name: "Fiction", hint: "Worlds that refuse to stay on the shelf" },
  { slug: "academic", name: "Academic", hint: "Campus, theory, survival" },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "atomic-habits-campus",
    sku: "LOS-SD-001",
    title: "Atomic Habits (Campus Edition)",
    author: "James Clear",
    genre: "Self-Development",
    genreSlug: "self-development",
    price: 299,
    compareAt: 349,
    rating: 4.9,
    ratingCount: 214,
    format: "Physical",
    tag: "For you",
    cover: "from-[#3a1d12] to-[#1a0e18]",
    description: "Tiny systems for lecture halls, late buses, and the version of you who actually opens the book.",
    stock: 42,
  },
  {
    id: "2",
    slug: "the-silent-patient",
    sku: "LOS-MY-002",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Mystery / Thriller",
    genreSlug: "mystery",
    price: 299,
    rating: 4.7,
    ratingCount: 188,
    format: "Physical",
    cover: "from-[#122033] to-[#0c0a12]",
    description: "A painter who stops speaking. A therapist who cannot look away. Keep the lamp on.",
    stock: 31,
  },
  {
    id: "3",
    slug: "english-shadowing",
    sku: "LOS-EN-003",
    title: "Shadowing English at Midnight",
    author: "L. Hart",
    genre: "English Learning",
    genreSlug: "english-learning",
    price: 249,
    rating: 4.8,
    ratingCount: 96,
    format: "Physical",
    tag: "Learners",
    cover: "from-[#143326] to-[#0e1018]",
    description: "Shadowing drills, campus dialogues, and vocabulary that survives real conversations.",
    stock: 54,
  },
  {
    id: "4",
    slug: "letters-in-plum-ink",
    sku: "LOS-RO-004",
    title: "Letters in Plum Ink",
    author: "Mira Solene",
    genre: "Romance",
    genreSlug: "romance",
    price: 359,
    rating: 4.6,
    ratingCount: 141,
    format: "Physical",
    cover: "from-[#3a1528] to-[#120810]",
    description: "Two literature students, one forbidden archive, and letters that should have stayed sealed.",
    stock: 27,
  },
  {
    id: "5",
    slug: "deep-work-nights",
    sku: "LOS-SD-005",
    title: "Deep Work After Dusk",
    author: "Cal Newport (annot.)",
    genre: "Self-Development",
    genreSlug: "self-development",
    price: 399,
    rating: 4.7,
    ratingCount: 77,
    format: "Physical",
    cover: "from-[#1a2030] to-[#120810]",
    description: "Focus rituals for noisy dorms and glowing phones.",
    stock: 22,
  },
  {
    id: "6",
    slug: "grammar-in-the-gloom",
    sku: "LOS-EN-006",
    title: "Grammar in the Gloom",
    author: "N. Ellison",
    genre: "English Learning",
    genreSlug: "english-learning",
    price: 299,
    rating: 4.5,
    ratingCount: 64,
    format: "Physical",
    cover: "from-[#102418] to-[#0a0c10]",
    description: "Tenses, articles, and academic writing without the fluorescent-light textbook vibe.",
    stock: 60,
  },
  {
    id: "7",
    slug: "the-guest-list",
    sku: "LOS-MY-007",
    title: "The Guest List",
    author: "Lucy Foley",
    genre: "Mystery / Thriller",
    genreSlug: "mystery",
    price: 379,
    rating: 4.4,
    ratingCount: 120,
    format: "Physical",
    cover: "from-[#1a1228] to-[#08060c]",
    description: "A wedding on an island. Everyone is lying. Someone does not leave.",
    stock: 18,
  },
  {
    id: "8",
    slug: "campus-theory",
    sku: "LOS-AC-008",
    title: "How to Survive Theory Class",
    author: "A. Voss",
    genre: "Academic",
    genreSlug: "academic",
    price: 329,
    rating: 4.3,
    ratingCount: 51,
    format: "Physical",
    cover: "from-[#202428] to-[#0c0a10]",
    description: "Lit theory, citation panic, and the essay due at 23:59.",
    stock: 40,
  },
  {
    id: "9",
    slug: "night-circus-notes",
    sku: "LOS-FI-009",
    title: "The Night Circus",
    author: "Erin Morgenstern",
    genre: "Fiction",
    genreSlug: "fiction",
    price: 419,
    rating: 4.8,
    ratingCount: 230,
    format: "Physical",
    cover: "from-[#2a1810] to-[#0c0810]",
    description: "Black-and-white tents, impossible clocks, a contest dressed as wonder.",
    stock: 25,
  },
  {
    id: "b1",
    slug: "student-starter",
    sku: "LOS-BD-101",
    title: "Student Starter Bundle",
    author: "Library of Shadows",
    genre: "Academic",
    genreSlug: "academic",
    price: 699,
    compareAt: 980,
    rating: 4.9,
    ratingCount: 88,
    format: "Bundle",
    tag: "Best value",
    cover: "from-[#2a1a10] to-[#1a1024]",
    description: "Two campus titles, a linen notebook, and a brass bookmark. The care package a wiser senior would pack.",
    stock: 15,
    contents: ["Atomic Habits (Campus Edition)", "How to Survive Theory Class", "Shadow notebook", "Brass bookmark"],
  },
  {
    id: "b2",
    slug: "self-dev-trio",
    sku: "LOS-BD-102",
    title: "Self-Development Bundle",
    author: "Library of Shadows",
    genre: "Self-Development",
    genreSlug: "self-development",
    price: 799,
    compareAt: 1227,
    rating: 4.8,
    ratingCount: 61,
    format: "Bundle",
    cover: "from-[#241018] to-[#10182a]",
    description: "Three curated spines for rebuilding a semester.",
    stock: 12,
    contents: ["Atomic Habits (Campus Edition)", "Deep Work After Dusk", "Shadowing English at Midnight"],
  },
  {
    id: "b3",
    slug: "romance-thriller",
    sku: "LOS-BD-103",
    title: "Romance Bundle",
    author: "Library of Shadows",
    genre: "Romance",
    genreSlug: "romance",
    price: 799,
    compareAt: 897,
    rating: 4.7,
    ratingCount: 44,
    format: "Bundle",
    cover: "from-[#1a1028] to-[#2a1218]",
    description: "Three popular romance titles for one weekend.",
    stock: 20,
    contents: ["Letters in Plum Ink", "The Silent Patient", "bonus romance pick"],
  },
  {
    id: "b4",
    slug: "mystery-thriller-bundle",
    sku: "LOS-BD-104",
    title: "Mystery & Thriller Bundle",
    author: "Library of Shadows",
    genre: "Mystery / Thriller",
    genreSlug: "mystery",
    price: 799,
    rating: 4.6,
    ratingCount: 33,
    format: "Bundle",
    cover: "from-[#101828] to-[#0a0810]",
    description: "Three locked-room nights.",
    stock: 14,
    contents: ["The Silent Patient", "The Guest List", "mystery extra"],
  },
  {
    id: "b5",
    slug: "english-learning-bundle",
    sku: "LOS-BD-105",
    title: "English Learning Bundle",
    author: "Library of Shadows",
    genre: "English Learning",
    genreSlug: "english-learning",
    price: 799,
    rating: 4.7,
    ratingCount: 29,
    format: "Bundle",
    cover: "from-[#143326] to-[#101018]",
    description: "Fluency stack for campus conversations.",
    stock: 16,
    contents: ["Shadowing English at Midnight", "Grammar in the Gloom", "reader extra"],
  },
  {
    id: "m1",
    slug: "monthly-book-club",
    sku: "LOS-MB-201",
    title: "Monthly Book Club",
    author: "Library of Shadows",
    genre: "Fiction",
    genreSlug: "fiction",
    price: 699,
    rating: 4.8,
    ratingCount: 40,
    format: "Bundle",
    tag: "Membership",
    cover: "from-[#2a2010] to-[#120810]",
    description: "One curated title a month, student price.",
    stock: 99,
    contents: ["This month’s pick", "discussion card"],
  },
  {
    id: "s1",
    slug: "shadow-notebook",
    sku: "LOS-ST-301",
    title: "Shadow notebook + bookmark",
    author: "Library of Shadows",
    genre: "Academic",
    genreSlug: "academic",
    price: 249,
    rating: 4.5,
    ratingCount: 19,
    format: "Physical",
    tag: "Stationery",
    cover: "from-[#1a1410] to-[#0c0a08]",
    description: "Stationery & gifts — 10% of planned revenue mix.",
    stock: 80,
  },
];

export const recommended = products.filter((p) => ["1", "2", "3", "4"].includes(p.id));
export const bundles = products.filter((p) => p.format === "Bundle");

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function searchProducts(q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return products;
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(s) ||
      p.author.toLowerCase().includes(s) ||
      p.genre.toLowerCase().includes(s) ||
      p.sku.toLowerCase().includes(s),
  );
}

export const provinces = [
  { name: "Bangkok", fee: 40 },
  { name: "Nonthaburi", fee: 50 },
  { name: "Chiang Mai", fee: 80 },
  { name: "Phuket", fee: 90 },
  { name: "Khon Kaen", fee: 70 },
  { name: "Other", fee: 100 },
];

export const faqs = [
  { q: "How long is delivery?", a: "Bangkok 1–2 days, upcountry 2–5 days after packing." },
  { q: "Do you ship physical books only?", a: "Yes — spines, bundles, notebooks. No PDFs." },
  { q: "First order discount?", a: "Use WELCOME10 at checkout for 10% off your first paid order." },
  { q: "How do points work?", a: "Earn 1 point per ฿10 spent. 100 points = ฿20 off." },
  { q: "LINE support?", a: "Tap the LINE button on Support — demo links to line.me." },
];
