# Library of Shadows

Dark-mode e-commerce for university students, young adults, and English learners.

## What’s in this repo

| Path | Contents |
|---|---|
| `docs/ARCHITECTURE.md` | Full-stack architecture, recs, payments, admin |
| `supabase/schema.sql` | Users, products, bundles, orders, reviews, loyalty, RLS |
| `app/` + `components/HomePage.tsx` | Mobile-first homepage (Next.js + Tailwind + Framer Motion) |

## Run the homepage

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database

Create a Supabase project, then run `supabase/schema.sql` in the SQL editor. Wire env:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Brand

Charcoal / plum / navy, ember gold accents, Cormorant Garamond + Outfit, glass cards, grain overlay.
