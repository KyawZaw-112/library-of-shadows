export type Genre = {
  slug: string;
  name: string;
  hint: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  rating: number;
  format: "Physical" | "Bundle";
  tag?: string;
  cover: string;
};

export const genres: Genre[] = [
  { slug: "self-development", name: "Self-Development", hint: "Become the version you keep promising" },
  { slug: "romance", name: "Romance", hint: "Slow burn, late nights, last pages" },
  { slug: "mystery", name: "Mystery / Thriller", hint: "Keep the lamp on" },
  { slug: "english-learning", name: "English Learning", hint: "Read your way into fluency" },
  { slug: "fiction", name: "Fiction", hint: "Worlds that refuse to stay on the shelf" },
  { slug: "academic", name: "Academic", hint: "Campus, theory, survival" },
];

export const recommended: Product[] = [
  {
    id: "1",
    slug: "atomic-habits-campus",
    title: "Atomic Habits (Campus Edition)",
    author: "James Clear",
    genre: "Self-Development",
    price: 429,
    rating: 4.9,
    format: "Physical",
    tag: "For you",
    cover: "from-[#3a1d12] to-[#1a0e18]",
  },
  {
    id: "2",
    slug: "the-silent-patient",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Mystery / Thriller",
    price: 389,
    rating: 4.7,
    format: "Physical",
    cover: "from-[#122033] to-[#0c0a12]",
  },
  {
    id: "3",
    slug: "english-shadowing",
    title: "Shadowing English at Midnight",
    author: "L. Hart",
    genre: "English Learning",
    price: 349,
    rating: 4.8,
    format: "Physical",
    tag: "Learners",
    cover: "from-[#143326] to-[#0e1018]",
  },
  {
    id: "4",
    slug: "letters-in-plum-ink",
    title: "Letters in Plum Ink",
    author: "Mira Solene",
    genre: "Romance",
    price: 359,
    rating: 4.6,
    format: "Physical",
    cover: "from-[#3a1528] to-[#120810]",
  },
];

export const bundles: Product[] = [
  {
    id: "b1",
    slug: "student-starter",
    title: "Student Starter Bundle",
    author: "2 books + notebook + bookmark",
    genre: "Academic",
    price: 799,
    rating: 4.9,
    format: "Bundle",
    tag: "Best value",
    cover: "from-[#2a1a10] to-[#1a1024]",
  },
  {
    id: "b2",
    slug: "self-dev-trio",
    title: "Self-Development Trio",
    author: "3 curated titles",
    genre: "Self-Development",
    price: 999,
    rating: 4.8,
    format: "Bundle",
    cover: "from-[#241018] to-[#10182a]",
  },
  {
    id: "b3",
    slug: "romance-thriller",
    title: "Romance / Thriller Night",
    author: "Two genres, one weekend",
    genre: "Romance",
    price: 689,
    rating: 4.7,
    format: "Bundle",
    cover: "from-[#1a1028] to-[#2a1218]",
  },
];
