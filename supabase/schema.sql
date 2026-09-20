-- Library of Shadows — Postgres / Supabase schema
-- Enable in SQL editor after creating the project.

create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type product_type as enum ('book', 'accessory', 'bundle');
create type product_format as enum ('physical', 'bundle');
create type order_status as enum (
  'pending_payment', 'placed', 'packing', 'shipped', 'delivered', 'cancelled', 'refunded'
);
create type payment_method as enum ('promptpay', 'card', 'ewallet', 'stripe');
create type reading_goal as enum ('leisure', 'self_dev', 'english', 'exams', 'mixed');
create type app_role as enum ('customer', 'admin', 'support');

-- ---------------------------------------------------------------------------
-- Users (extends auth.users)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  phone text,
  reading_goal reading_goal default 'mixed',
  loyalty_points integer not null default 0 check (loyalty_points >= 0),
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  user_id uuid references public.profiles (id) on delete cascade,
  role app_role not null default 'customer',
  primary key (user_id, role)
);

create table public.user_preferences (
  user_id uuid references public.profiles (id) on delete cascade,
  genre_slug text not null,
  weight numeric not null default 1,
  primary key (user_id, genre_slug)
);

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  label text default 'Home',
  recipient text not null,
  phone text not null,
  line1 text not null,
  line2 text,
  district text,
  province text not null,
  postal_code text not null,
  country text not null default 'TH',
  is_default boolean not null default false
);

-- ---------------------------------------------------------------------------
-- Catalog
-- ---------------------------------------------------------------------------
create table public.genres (
  slug text primary key,
  name text not null,
  accent text
);

insert into public.genres (slug, name, accent) values
  ('self-development', 'Self-Development', '#c9a227'),
  ('romance', 'Romance', '#e8a0bf'),
  ('mystery', 'Mystery / Thriller', '#7eb8da'),
  ('english-learning', 'English Learning', '#9fd4b3'),
  ('fiction', 'Fiction', '#c4b5fd'),
  ('academic', 'Academic', '#94a3b8');

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  sku text unique not null,
  type product_type not null default 'book',
  format product_format not null default 'physical',
  title text not null,
  subtitle text,
  author text,
  description text,
  genre_slug text references public.genres (slug),
  language text default 'en',
  cover_url text,
  price_thb numeric(12,2) not null check (price_thb >= 0),
  compare_at_thb numeric(12,2),
  rating_avg numeric(3,2) not null default 0,
  rating_count integer not null default 0,
  stock_qty integer not null default 0,
  low_stock_threshold integer not null default 5,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.bundle_items (
  bundle_id uuid not null references public.products (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete restrict,
  quantity integer not null default 1 check (quantity > 0),
  primary key (bundle_id, product_id),
  check (bundle_id <> product_id)
);

create index products_genre_idx on public.products (genre_slug);
create index products_price_idx on public.products (price_thb);
create index products_search_idx on public.products using gin (
  to_tsvector('simple', coalesce(title,'') || ' ' || coalesce(author,'') || ' ' || coalesce(subtitle,''))
);

-- ---------------------------------------------------------------------------
-- Commerce
-- ---------------------------------------------------------------------------
create table public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.profiles (id) on delete cascade,
  updated_at timestamptz not null default now()
);

create table public.cart_items (
  cart_id uuid not null references public.carts (id) on delete cascade,
  product_id uuid not null references public.products (id),
  quantity integer not null default 1 check (quantity > 0),
  primary key (cart_id, product_id)
);

create table public.wishlist_items (
  user_id uuid not null references public.profiles (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create table public.coupons (
  code text primary key,
  description text,
  percent_off numeric(5,2),
  amount_off_thb numeric(12,2),
  first_order_only boolean not null default false,
  min_subtotal_thb numeric(12,2) default 0,
  starts_at timestamptz,
  ends_at timestamptz,
  max_redemptions integer,
  times_redeemed integer not null default 0,
  is_active boolean not null default true
);

insert into public.coupons (code, description, percent_off, first_order_only)
values ('WELCOME10', 'First-order 10% off', 10, true);

create table public.delivery_zones (
  id serial primary key,
  province text,
  postal_prefix text,
  fee_thb numeric(12,2) not null
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  user_id uuid not null references public.profiles (id),
  status order_status not null default 'pending_payment',
  address_snapshot jsonb not null,
  subtotal_thb numeric(12,2) not null,
  discount_thb numeric(12,2) not null default 0,
  delivery_fee_thb numeric(12,2) not null default 0,
  points_redeemed integer not null default 0,
  total_thb numeric(12,2) not null,
  coupon_code text references public.coupons (code),
  payment_method payment_method,
  payment_ref text,
  tracking_number text,
  notes text,
  placed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id),
  title_snapshot text not null,
  sku_snapshot text not null,
  unit_price_thb numeric(12,2) not null,
  quantity integer not null,
  is_bundle boolean not null default false
);

create table public.order_events (
  id bigserial primary key,
  order_id uuid not null references public.orders (id) on delete cascade,
  status order_status not null,
  message text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Reviews & loyalty
-- ---------------------------------------------------------------------------
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  body text,
  photo_urls text[] default '{}',
  created_at timestamptz not null default now(),
  unique (product_id, user_id)
);

create table public.points_ledger (
  id bigserial primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  order_id uuid references public.orders (id),
  delta integer not null,
  reason text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Admin ops
-- ---------------------------------------------------------------------------
create table public.inventory_alerts (
  id bigserial primary key,
  product_id uuid not null references public.products (id),
  stock_qty integer not null,
  created_at timestamptz not null default now(),
  acknowledged_at timestamptz
);

create table public.monthly_cost_targets (
  year_month date primary key,
  break_even_thb numeric(12,2) not null
);

-- ---------------------------------------------------------------------------
-- Triggers: updated_at, low stock, rating rollup
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();
create trigger orders_touch before update on public.orders
  for each row execute function public.touch_updated_at();

create or replace function public.flag_low_stock()
returns trigger language plpgsql as $$
begin
  if new.stock_qty <= new.low_stock_threshold and
     (tg_op = 'INSERT' or old.stock_qty > old.low_stock_threshold) then
    insert into public.inventory_alerts (product_id, stock_qty)
    values (new.id, new.stock_qty);
  end if;
  return new;
end $$;

create trigger products_low_stock after insert or update of stock_qty on public.products
  for each row execute function public.flag_low_stock();

create or replace function public.rollup_rating()
returns trigger language plpgsql as $$
begin
  update public.products p set
    rating_avg = (select coalesce(avg(rating),0) from public.reviews r where r.product_id = coalesce(new.product_id, old.product_id)),
    rating_count = (select count(*) from public.reviews r where r.product_id = coalesce(new.product_id, old.product_id))
  where p.id = coalesce(new.product_id, old.product_id);
  return null;
end $$;

create trigger reviews_rollup after insert or update or delete on public.reviews
  for each row execute function public.rollup_rating();

-- New auth user → profile
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)));
  insert into public.user_roles (user_id, role) values (new.id, 'customer');
  insert into public.carts (user_id) values (new.id);
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.user_preferences enable row level security;
alter table public.addresses enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.order_events enable row level security;
alter table public.reviews enable row level security;
alter table public.points_ledger enable row level security;

create policy "public read products" on public.products for select using (is_active = true);
create policy "public read genres" on public.genres for select using (true);

create policy "own profile" on public.profiles for all using (auth.uid() = id);
create policy "own prefs" on public.user_preferences for all using (auth.uid() = user_id);
create policy "own addresses" on public.addresses for all using (auth.uid() = user_id);
create policy "own cart" on public.carts for all using (auth.uid() = user_id);
create policy "own wishlist" on public.wishlist_items for all using (auth.uid() = user_id);
create policy "own orders" on public.orders for select using (auth.uid() = user_id);
create policy "reviews read" on public.reviews for select using (true);
create policy "reviews write own" on public.reviews for insert with check (auth.uid() = user_id);

create or replace function public.is_admin()
returns boolean language sql stable as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = 'admin'
  );
$$;
