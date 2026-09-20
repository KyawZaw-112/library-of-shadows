# Library of Shadows — Project Architecture

Gothic bookshop e-commerce for university students, young adults, and English learners (18–30). Mobile-first, dark, cozy, conversion-oriented.

## 1. System overview

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ Next.js App │────▶│  Supabase        │────▶│ PostgreSQL      │
│ (App Router)│     │  Auth + RLS      │     │ + Realtime      │
│ Tailwind    │     │  Storage (photos)│     └─────────────────┘
│ Framer Motion     │  Edge Functions  │
└──────┬──────┘     └────────┬─────────┘
       │                     │
       │              ┌──────▼──────┐
       │              │ Payments    │
       │              │ Stripe      │
       │              │ PromptPay   │
       │              │ E-wallets   │
       │              └─────────────┘
       │
       ▼
 LINE OA / Live chat  ·  Admin dashboard (same Next.js, /admin)
```

**Frontend:** Next.js 14 (App Router), React Server Components where possible, Tailwind, Framer Motion, Lucide.

**Backend:** Supabase (Auth, Postgres, Storage, Realtime, Edge Functions). Node only for payment webhooks and packing-slip PDF if needed.

**Auth:** Email/password, Google, Apple. Profiles extend `auth.users`. Onboarding quiz writes `user_preferences`.

**Realtime:** Order status, low-stock alerts, live chat presence.

## 2. App routes

| Route | Purpose |
|---|---|
| `/` | Homepage: hero, recs, bundles, catalog teaser |
| `/onboarding` | Genre / goal quiz |
| `/catalog` | Filters: genre, price, rating, format |
| `/product/[slug]` | Book or bundle PDP |
| `/search` | Autocomplete + results |
| `/cart` `/wishlist` | Commerce |
| `/checkout` | Address, fees, coupons, pay |
| `/account/orders` | Tracking |
| `/account/points` | Loyalty |
| `/support` | FAQ + LINE |
| `/admin/*` | Inventory, orders, analytics (role = admin) |

## 3. Recommendation engine (v1)

Deterministic, no ML infra:

1. Preferred genres from onboarding (`user_preferences`).
2. Boost titles matching last 90 days of `order_items`.
3. Reading goals (`reading_goal`: fluency, exams, leisure).
4. Fallback: bestsellers + “Student Starter” bundles.

Homepage section `Recommended For You` is a server query joining products × preferences × purchase history, ranked by score.

## 4. Bundling

- `products.type` = `book` | `accessory` | `bundle`
- Bundles have `bundle_items` (child product + qty)
- Price can be `fixed` or `sum(children) * (1 - discount_pct)`
- Inventory: decrement children (or dedicated bundle SKU if pre-packed)

## 5. Checkout & payments

1. Cart → validate stock & coupons.
2. Create `orders` (`pending_payment`) + `order_items` snapshot.
3. Edge Function creates payment intent:
   - **Stripe** (cards / wallets)
   - **PromptPay QR** (Omise / Stripe Thailand / local PSP)
4. Webhook → `paid` → decrement stock, award loyalty points.
5. Admin packing → `shipped` + tracking number → Realtime to buyer.

Delivery fee: zone table (`delivery_zones`) by province / postal prefix.

## 6. Loyalty

- `points_ledger`: earn `floor(thb * earn_rate)` on paid orders
- Redeem as `coupon` or `order.points_redeemed` (cap % of subtotal)
- First-order coupon seeded in `coupons` (`WELCOME10`)

## 7. Admin analytics

Materialized views / SQL:

- Monthly GMV, AOV, break-even vs `monthly_cost_target`
- Top genres, retention (repeat order rate 90d)
- Low stock (`stock_qty <= low_stock_threshold`)

## 8. Security

- RLS on all tables: users own their rows; admins via `user_roles`
- Never trust client prices; recompute from products
- Signed storage URLs for review photos
- Rate-limit search and checkout Edge Functions

## 9. Folder layout

```
app/                 # Next.js routes
components/          # UI
lib/                 # supabase client, recs, money
supabase/schema.sql  # source of truth
docs/ARCHITECTURE.md
```
