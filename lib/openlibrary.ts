import type { Product } from "./catalog";
import { genres } from "./catalog";

const OL = "https://openlibrary.org";
const COVER = "https://covers.openlibrary.org/b/id";

export const genreQuery: Record<string, string> = {
  "self-development": "subject=self-help",
  romance: "subject=romance",
  mystery: "subject=mystery",
  "english-learning": "q=english+language+learning",
  fiction: "subject=fiction",
  academic: "subject=study+skills",
};

type Doc = {
  key: string;
  title?: string;
  author_name?: string[];
  cover_i?: number;
  ratings_average?: number;
  ratings_count?: number;
  first_publish_year?: number;
  subject?: string[];
  isbn?: string[];
  first_sentence?: string[] | string;
};

const cache: Record<string, Product> = {};

export function remember(p: Product | Product[]) {
  (Array.isArray(p) ? p : [p]).forEach((x) => {
    cache[x.slug] = x;
  });
}

export function getCached(slug: string) {
  return cache[slug];
}

function priceFromKey(key: string) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return ([249, 299, 499] as const)[h % 3];
}

function sentence(doc: Doc) {
  const s = doc.first_sentence;
  if (Array.isArray(s)) return s[0] || "";
  return s || "";
}

export function mapDoc(doc: Doc, genreSlug = "fiction"): Product {
  const slug = doc.key.replace("/works/", "").replace(/^\//, "");
  const g = genres.find((x) => x.slug === genreSlug);
  const cover = doc.cover_i
    ? `${COVER}/${doc.cover_i}-L.jpg`
    : doc.isbn?.[0]
      ? `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-L.jpg`
      : "";
  const p: Product = {
    id: slug,
    slug,
    sku: "OL-" + slug,
    title: doc.title || "Untitled",
    author: (doc.author_name || ["Unknown"]).slice(0, 2).join(", "),
    genre: g?.name || "Fiction",
    genreSlug,
    price: priceFromKey(doc.key),
    rating: Math.round((doc.ratings_average || 4.2) * 10) / 10,
    ratingCount: doc.ratings_count || 0,
    format: "Physical",
    cover,
    description:
      sentence(doc) ||
      `From Open Library. First published ${doc.first_publish_year || "—"}. ${(doc.subject || []).slice(0, 6).join(", ")}`,
    stock: 18,
  };
  remember(p);
  return p;
}

export async function searchOpenLibrary(params: { q?: string; genreSlug?: string; limit?: number }) {
  const limit = params.limit ?? 24;
  let url = `${OL}/search.json?limit=${limit}&fields=key,title,author_name,cover_i,ratings_average,ratings_count,first_publish_year,subject,isbn`;
  if (params.genreSlug && genreQuery[params.genreSlug]) url += `&${genreQuery[params.genreSlug]}`;
  else if (params.q) url += `&q=${encodeURIComponent(params.q)}`;
  else url += `&q=popular+fiction`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Open Library search failed");
  const data = (await res.json()) as { docs: Doc[] };
  const genreSlug = params.genreSlug || "fiction";
  return (data.docs || [])
    .filter((d) => d.title && (d.cover_i || d.isbn?.[0]))
    .map((d) => mapDoc(d, params.genreSlug || guessGenre(d) || genreSlug))
    .slice(0, limit);
}

function guessGenre(doc: Doc) {
  const s = (doc.subject || []).join(" ").toLowerCase();
  if (s.includes("romance")) return "romance";
  if (s.includes("mystery") || s.includes("thriller")) return "mystery";
  if (s.includes("self-help") || s.includes("self help")) return "self-development";
  if (s.includes("study") || s.includes("education")) return "academic";
  return "fiction";
}

export async function fetchWork(slug: string) {
  const hit = cache[slug];
  if (hit?.description && hit.cover) return hit;
  const key = slug.startsWith("OL") ? `/works/${slug}` : `/${slug}`;
  const res = await fetch(`${OL}${key}.json`);
  if (!res.ok) return hit;
  const w = await res.json();
  const desc = typeof w.description === "string" ? w.description : w.description?.value || "";
  const coverId = w.covers?.[0];
  const p: Product = {
    id: slug,
    slug,
    sku: "OL-" + slug,
    title: w.title || hit?.title || "Untitled",
    author: hit?.author || "Unknown",
    genre: hit?.genre || "Fiction",
    genreSlug: hit?.genreSlug || "fiction",
    price: hit?.price || priceFromKey(key),
    rating: hit?.rating || 4.2,
    ratingCount: hit?.ratingCount || 0,
    format: "Physical",
    cover: coverId ? `${COVER}/${coverId}-L.jpg` : hit?.cover || "",
    description: desc || hit?.description || "Open Library work.",
    stock: hit?.stock || 18,
  };
  remember(p);
  return p;
}
