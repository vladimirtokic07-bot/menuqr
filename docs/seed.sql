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

-- ===== Ownership (P3-T2) =====
-- owner_id is nullable by design: the existing olive-salt row has no owner
-- until the manual linking step below. NULL never equals auth.uid(), so
-- unowned rows stay invisible/immutable to owners (fail-closed).
alter table businesses
  add column if not exists owner_id uuid references auth.users(id) on delete set null;

create index if not exists businesses_owner_id_idx on businesses (owner_id);

-- MANUAL STEP (run in Supabase SQL editor, AFTER creating the demo owner in
-- Authentication -> Users):
--   UPDATE businesses SET owner_id = '<demo-owner-uuid>' WHERE slug = 'olive-salt';

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

-- ===== Owner RLS policies (P3-T2) =====
-- Public SELECT using (true) stays active because the menu is public by design
-- (guest scans QR). Owner SELECT policies are defensive/documentation only;
-- isolation is enforced on WRITE (UPDATE/INSERT), not READ.
drop policy if exists "owner_select_businesses" on businesses;
drop policy if exists "owner_update_businesses" on businesses;
drop policy if exists "owner_select_categories" on categories;
drop policy if exists "owner_update_categories" on categories;
drop policy if exists "owner_select_menu_items"  on menu_items;
drop policy if exists "owner_update_menu_items"  on menu_items;
drop policy if exists "owner_select_menu_scans"  on menu_scans;

create policy "owner_select_businesses" on businesses for select to authenticated using (owner_id = auth.uid());
create policy "owner_update_businesses" on businesses for update to authenticated using (owner_id = auth.uid());

create policy "owner_select_categories" on categories for select to authenticated using (business_id in (select id from businesses where owner_id = auth.uid()));
create policy "owner_update_categories" on categories for update to authenticated using (business_id in (select id from businesses where owner_id = auth.uid()));

create policy "owner_select_menu_items" on menu_items for select to authenticated using (business_id in (select id from businesses where owner_id = auth.uid()));
create policy "owner_update_menu_items" on menu_items for update to authenticated using (business_id in (select id from businesses where owner_id = auth.uid()));

create policy "owner_select_menu_scans" on menu_scans for select to authenticated using (business_id in (select id from businesses where owner_id = auth.uid()));

-- ===== Table privileges (P3-T2) =====
-- Postgres checks table privileges BEFORE row-level security, so the
-- authenticated role needs table-level grants for the owner policies above to
-- be reachable. GRANT is idempotent (re-running is a no-op).
grant update on businesses, categories, menu_items to authenticated;
grant select on menu_scans to authenticated;

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

-- ===== Scan tracking (T5): rolling 24h dedupe via SECURITY DEFINER =====
-- Runs as the function owner, so the internal SELECT works even though the
-- anon role only has INSERT on menu_scans (no SELECT).
create or replace function public.register_scan(
  p_business_id uuid,
  p_ip_hash text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from public.menu_scans
    where business_id = p_business_id
      and ip_hash = p_ip_hash
      and scanned_at > now() - interval '24 hours'
  ) then
    insert into public.menu_scans (business_id, ip_hash)
    values (p_business_id, p_ip_hash);
  end if;
end;
$$;

-- Least privilege: only anon (guest menu) and authenticated may call it.
revoke all on function public.register_scan(uuid, text) from public;
grant execute on function public.register_scan(uuid, text) to anon, authenticated;