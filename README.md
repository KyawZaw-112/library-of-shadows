# Library of Shadows

Dark-mode bookshop for university students, young adults, and English learners (18–30).

**Live:** https://kyawzaw-112.github.io/library-of-shadows/

## Demo (no backend required)

State lives in `localStorage` so GitHub Pages can run the full flow.

| Role | How |
|---|---|
| Shopper | Register / login with any email |
| Admin | Email containing `admin` e.g. `admin@shadows.local` |
| Coupon | `WELCOME10` (first order, 10%) |
| Points | 1 pt / ฿10 · 100 pts = ฿20 |

## Routes

`/` catalog `/catalog` PDP `/product/[slug]` cart checkout account orders support onboarding  
Admin: `/admin` `/admin/products` `/admin/orders` `/admin/analytics`

## Run locally

```bash
pnpm install
pnpm dev
```

Production static export (GitHub Pages):

```bash
set GITHUB_PAGES=true
pnpm build
```

## Later: real backend

`supabase/schema.sql` + `docs/ARCHITECTURE.md` — Auth, RLS, PromptPay webhooks.
