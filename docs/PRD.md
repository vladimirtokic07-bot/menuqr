# MenuQR — Your menu, always up-to-date

## Vision
A fast, reliable, and beautiful QR-code digital menu SaaS for cafes and restaurants globally. It replaces printed menus, allowing instant price updates and providing basic guest analytics.

## Target Audience
Independent cafe and restaurant owners who want to modernize their guest experience without technical complexity.

## Core Features (MVP)
1. **Landing Page**: Marketing site explaining the value proposition, features, and pricing.
2. **Guest Menu (`/m/[slug]`)**: Mobile-first, dynamic menu viewed by guests after scanning a QR code. Includes categories, item details (allergens, calories), and a "Call waiter" button.
3. **Owner Dashboard (`/dashboard`)**: Protected route where owners can manage menu items (CRUD), view basic analytics (scans, views), and download their unique QR code.
4. **Authentication**: Secure login for restaurant owners (via Supabase Auth).
5. **Database**: Supabase PostgreSQL to store businesses, menu items, categories, and scan analytics.

## Implemented State (Phase 2)
The MVP is wired to a live Supabase project. Guests see real database rows, not mock data.

- **Landing Page**: Marketing site (value proposition, features, pricing, FAQ).
- **Guest Menu (`/m/[slug]`)**: Mobile-first menu rendered server-side from Supabase — categories, dishes, allergens, calories, badges (vegetarian / spicy / chef's choice), search and category filters, and a "Call waiter" button.
- **Not-found state**: Unknown slugs render a friendly 404 page (`app/m/[slug]/not-found.tsx`).
- **Scan tracking**: Every guest menu view hashes the visitor IP with `sha256(ip + SCAN_HASH_SALT)` and records one row in `menu_scans` via the `register_scan()` RPC. Duplicate scans from the same hash within a rolling 24h window are ignored (dedupe inside the function).
- **Database**: Supabase PostgreSQL stores businesses, categories, menu items, and scan analytics. Reads are public; guests can only insert into `menu_scans`. See `DB.md` for the full schema and RLS policies.

## Environment Variables
Both local development (`.env.local`) and the Vercel deployment must define:

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Client + build | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Client + build | Supabase publishable (anon) key |
| `SCAN_HASH_SALT` | Server only | Salt for hashing visitor IPs before storing scan analytics |

### Vercel requirement
These three variables must be set in **Vercel → Project Settings → Environment Variables** (not only in `.env.local`). The app fails fast:
- `lib/supabase.ts` throws at import time if `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is missing.
- `app/m/[slug]/page.tsx` throws at module load if `SCAN_HASH_SALT` is missing.

`SCAN_HASH_SALT` intentionally has no `NEXT_PUBLIC_` prefix, so it stays server-side and is never exposed to the browser.