# MenuQR - Database Schema (Supabase)

## Tables

### 1. `businesses`
- `id` (uuid, primary key)
- `name` (text, e.g., "Olive & Salt")
- `slug` (text, unique, e.g., "olive-salt")
- `created_at` (timestamp)

### 2. `categories`
- `id` (uuid, primary key)
- `business_id` (uuid, foreign key -> businesses.id)
- `name` (text, e.g., "Appetizers")
- `display_order` (int)

### 3. `menu_items`
- `id` (uuid, primary key)
- `business_id` (uuid, foreign key -> businesses.id)
- `category_id` (uuid, foreign key -> categories.id)
- `name` (text, e.g., "Whipped Ricotta")
- `description` (text)
- `price_cents` (int, e.g., 1200 for $12.00)
- `display_order` (int, default 0)
- `is_active` (boolean, default true)
- `is_vegetarian` (boolean, default false)
- `is_spicy` (boolean, default false)
- `is_chef_choice` (boolean, default false)
- `allergens` (text array, e.g., ['Sesame', 'Dairy'])
- `calories` (int, nullable)
- `image_url` (text, nullable)
- `created_at` (timestamptz, default now())

### 4. `menu_scans` (Analytics)
- `id` (uuid, primary key)
- `business_id` (uuid, foreign key -> businesses.id)
- `scanned_at` (timestamp, default now())
- `ip_hash` (text, anonymized)

## Unique Indexes
- `businesses_slug_key` — unique on `businesses(slug)`
- `categories_business_name_key` — unique on `categories(business_id, name)`
- `menu_items_business_name_key` — unique on `menu_items(business_id, name)`

## Row Level Security (RLS)
RLS is enabled on all four tables. Policies:

| Table | Policy | Command | Rule |
| --- | --- | --- | --- |
| `businesses` | `public_read_businesses` | SELECT | `using (true)` |
| `categories` | `public_read_categories` | SELECT | `using (true)` |
| `menu_items` | `public_read_menu_items` | SELECT | `using (true)` |
| `menu_scans` | `public_insert_scans` | INSERT | `with check (true)` |

Guests (anon role) can read the menu and insert scans only. There are no public UPDATE/DELETE policies.

## Scan tracking — `register_scan()`
```sql
register_scan(p_business_id uuid, p_ip_hash text) returns void
```
- `SECURITY DEFINER` with `search_path = public` — so the internal duplicate check works even though the anon role has no SELECT grant on `menu_scans`.
- Dedupe: inserts a new row only if no row exists for the same `(business_id, ip_hash)` within the last 24 hours.
- Privileges: `execute` granted to `anon` and `authenticated` only.
- `ip_hash` is computed in the app as `sha256(ip + SCAN_HASH_SALT)` (see `app/m/[slug]/page.tsx`); raw IPs are never stored.