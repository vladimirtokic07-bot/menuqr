-- MenuQR seed - blueprint for a fresh Supabase project (Phase 2).
-- Safe to re-run: idempotent (ON CONFLICT DO UPDATE + DROP POLICY IF EXISTS).
-- Works on BOTH a fresh DB and an existing DB (adds missing column + unique indexes).
-- Re-running SYNCs existing rows to the perfected values below (source of truth).
-- 1 business, 5 categories, 6 menu_items. USD, no images (MVP).

create extension if not exists pgcrypto;

-- ===== Tables =====
create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  created_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  display_order integer not null default 0
);

create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  category_id uuid not null references categories(id) on delete cascade,
  name text not null,
  description text,
  price_cents integer not null,
  display_order integer not null default 0,
  is_active boolean not null default true,
  is_vegetarian boolean not null default false,
  is_spicy boolean not null default false,
  is_chef_choice boolean not null default false,
  allergens text[] not null default '{}',
  calories integer,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists menu_scans (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  scanned_at timestamptz not null default now(),
  ip_hash text
);

-- ===== Idempotent schema hardening (applies to pre-existing tables too) =====
alter table menu_items add column if not exists display_order integer not null default 0;
create unique index if not exists businesses_slug_key on businesses (slug);
create unique index if not exists categories_business_name_key on categories (business_id, name);
create unique index if not exists menu_items_business_name_key on menu_items (business_id, name);

-- ===== Row Level Security =====
alter table businesses enable row level security;
alter table categories enable row level security;
alter table menu_items enable row level security;
alter table menu_scans enable row level security;

drop policy if exists "public_read_businesses" on businesses;
drop policy if exists "public_read_categories" on categories;
drop policy if exists "public_read_menu_items"  on menu_items;
drop policy if exists "public_insert_scans"     on menu_scans;

create policy "public_read_businesses" on businesses for select using (true);
create policy "public_read_categories" on categories for select using (true);
create policy "public_read_menu_items"  on menu_items  for select using (true);
create policy "public_insert_scans"     on menu_scans  for insert with check (true);

-- ===== Seed: business =====
insert into businesses (name, slug)
values ('Olive & Salt', 'olive-salt')
on conflict (slug) do update set name = excluded.name;

-- ===== Seed: categories =====
insert into categories (business_id, name, display_order)
select b.id, c.name, c.ord
from businesses b
cross join (values
  ('Appetizers', 1),
  ('Soups', 2),
  ('Main courses', 3),
  ('Desserts', 4),
  ('Drinks', 5)
) as c(name, ord)
where b.slug = 'olive-salt'
on conflict (business_id, name) do update set display_order = excluded.display_order;

-- ===== Seed: menu_items =====
insert into menu_items
  (business_id, category_id, name, description, price_cents, display_order,
   is_vegetarian, is_chef_choice, allergens, calories, image_url)
select
  b.id,
  cat.id,
  i.name,
  i.description,
  i.price_cents,
  i.display_order,
  i.is_vegetarian,
  i.is_chef_choice,
  i.allergens,
  i.calories,
  null
from businesses b
cross join (values
  ('Whipped ricotta',     'Appetizers',   'Honey, sea salt, olive oil & sourdough',    1200, 1, true,  true,  array['Dairy','Wheat']::text[],          420),
  ('Garden bowl',         'Appetizers',   'Ancient grains, greens, avocado & tahini',  1800, 2, true,  false, array['Sesame']::text[],              610),
  ('Roasted tomato soup', 'Soups',        'Slow-roasted tomatoes, basil & cream',       900, 1, true,  false, array['Dairy']::text[],               320),
  ('Roasted salmon',      'Main courses', 'Citrus greens, crispy potatoes & dill butter', 2400, 1, false, true,  array['Dairy','Fish']::text[],         780),
  ('Tiramisu',            'Desserts',     'Espresso-soaked ladyfingers & mascarpone',  1100, 1, true,  false, array['Gluten','Dairy','Eggs']::text[], 540),
  ('Matcha latte',        'Drinks',       'Ceremonial matcha, oat milk & honey',      500, 1, true,  false, array[]::text[],                   180)
) as i(name, category, description, price_cents, display_order, is_vegetarian, is_chef_choice, allergens, calories)
join categories cat on cat.business_id = b.id and cat.name = i.category
where b.slug = 'olive-salt'
on conflict (business_id, name) do update set
  category_id    = excluded.category_id,
  description    = excluded.description,
  price_cents    = excluded.price_cents,
  display_order  = excluded.display_order,
  is_vegetarian  = excluded.is_vegetarian,
  is_chef_choice = excluded.is_chef_choice,
  allergens      = excluded.allergens,
  calories       = excluded.calories,
  image_url      = excluded.image_url;