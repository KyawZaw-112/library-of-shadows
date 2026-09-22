import type { Product } from "./catalog";
import { remember } from "./openlibrary";

export type BookCondition = "like-new" | "good" | "fair";

export type ListingStatus = "pending" | "listed" | "sold" | "rejected";

export type ResaleListing = {
  id: string;
  createdAt: string;
  status: ListingStatus;
  credited: boolean;
  sellerEmail: string;
  sellerName: string;
  workSlug: string;
  title: string;
  author: string;
  cover: string;
  genre: string;
  genreSlug: string;
  condition: BookCondition;
  listPrice: number;
  buyback: number;
  price: number;
};

export const conditions: { id: BookCondition; label: string; hint: string }[] = [
  { id: "like-new", label: "Like new", hint: "No writing, tight spine" },
  { id: "good", label: "Good", hint: "Light wear, all pages intact" },
  { id: "fair", label: "Fair", hint: "Creases, notes, still readable" },
];

/** Shop pays seller this cut of the new-copy price. */
const buybackRate: Record<BookCondition, number> = {
  "like-new": 0.5,
  good: 0.4,
  fair: 0.28,
};

/** Storefront resale price. */
const sellRate: Record<BookCondition, number> = {
  "like-new": 0.7,
  good: 0.58,
  fair: 0.45,
};

export function quoteResale(listPrice: number, condition: BookCondition) {
  const buyback = Math.max(40, Math.round(listPrice * buybackRate[condition]));
  const price = Math.max(buyback + 30, Math.round(listPrice * sellRate[condition]));
  return { buyback, price };
}

export function conditionLabel(c: BookCondition) {
  return conditions.find((x) => x.id === c)?.label ?? c;
}

export function listingToProduct(l: ResaleListing): Product {
  const p: Product = {
    id: l.id,
    slug: l.id,
    sku: l.id,
    title: l.title,
    author: l.author,
    genre: l.genre,
    genreSlug: l.genreSlug,
    price: l.price,
    compareAt: l.listPrice,
    rating: 4.4,
    ratingCount: 0,
    format: "Used",
    tag: conditionLabel(l.condition),
    cover: l.cover,
    description: `Pre-loved · ${conditionLabel(l.condition)}. Inspected by Library of Shadows. Originally ${l.listPrice} THB new.`,
    stock: l.status === "listed" ? 1 : 0,
  };
  remember(p);
  return p;
}

export const seedListings: ResaleListing[] = [
  {
    id: "RS-DEMO-1",
    createdAt: new Date().toISOString(),
    status: "listed",
    credited: false,
    sellerEmail: "campus@demo.los",
    sellerName: "Campus seller",
    workSlug: "OL17977664W",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://covers.openlibrary.org/b/id/12539702-L.jpg",
    genre: "Self-Development",
    genreSlug: "self-development",
    condition: "good",
    listPrice: 299,
    ...quoteResale(299, "good"),
  },
  {
    id: "RS-DEMO-2",
    createdAt: new Date().toISOString(),
    status: "listed",
    credited: false,
    sellerEmail: "campus@demo.los",
    sellerName: "Campus seller",
    workSlug: "OL82586W",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "https://covers.openlibrary.org/b/id/12820599-L.jpg",
    genre: "Romance",
    genreSlug: "romance",
    condition: "like-new",
    listPrice: 249,
    ...quoteResale(249, "like-new"),
  },
];
