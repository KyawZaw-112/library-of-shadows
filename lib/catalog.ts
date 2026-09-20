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

/** Merch-only SKUs. Individual books load live from Open Library. */
export const products: Product[] = [
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
    cover: "",
    description: "Two Open Library picks + notebook + bookmark, packed for campus.",
    stock: 15,
    contents: ["2 curated books", "Shadow notebook", "Bookmark"],
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
    rating: 4.8,
    ratingCount: 61,
    format: "Bundle",
    cover: "",
    description: "Three self-help titles from Open Library, student price.",
    stock: 12,
    contents: ["3 self-development books"],
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
    rating: 4.7,
    ratingCount: 44,
    format: "Bundle",
    cover: "",
    description: "Three romance works from Open Library.",
    stock: 20,
    contents: ["3 romance books"],
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
    cover: "",
    description: "Three mystery/thriller works from Open Library.",
    stock: 14,
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
    cover: "",
    description: "Fluency stack pulled from Open Library education titles.",
    stock: 16,
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
    cover: "",
    description: "One curated Open Library title a month.",
    stock: 99,
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
    cover: "",
    description: "Stationery & gifts — 10% of planned revenue mix.",
    stock: 80,
  },
];

export const bundles = products.filter((p) => p.format === "Bundle");

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
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
  { q: "Where do titles come from?", a: "Catalog books are loaded live from Open Library (covers, authors, subjects). Prices follow our student bands ฿249 / ฿299 / ฿499." },
];
