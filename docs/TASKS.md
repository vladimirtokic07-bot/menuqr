# MenuQR - Task Board (Phase 2: Database integration)

Legend: [ ] todo | [x] done
Rule: one task in progress at a time. Loop per task: spec -> plan -> review -> act -> verify -> commit.

## [X] T1 - Env guard for Supabase client
Goal: fail fast with a clear error if env vars are missing.
Files: lib/supabase.ts
Verify: dev server starts; with a var removed locally, error message is clear.
Commit: fix: add env validation to supabase client

## [x] T2 - Live connection audit
Goal: prove guest read works and guest write is blocked.
Files: none (terminal checks only)
Verify: GET menu_items -> HTTP 200 with 6 rows; POST menu_items -> HTTP 401/403.
Commit: none

## [x] T3 - Guest menu live data
Goal: /m/[slug] renders categories and dishes from Supabase.
Files: app/m/[slug]/page.tsx, components/guest-menu-view.tsx (new), lib/format.ts (new)
Verify: /m/olive-salt shows 6 dishes grouped by category; changing a price in
Supabase Table Editor shows the new price after browser refresh.
Commit: feat: load guest menu from supabase

## [x] T4 - Unknown slug handling
Goal: friendly not-found page for unknown slugs.
Files: app/m/[slug]/page.tsx, app/m/[slug]/not-found.tsx (new)
Verify: /m/does-not-exist renders friendly message with HTTP 404.
Commit: feat: add not-found state for guest menu

## [x] T5 - Scan tracking
Goal: each guest menu view inserts one row into menu_scans.
Files: app/m/[slug]/page.tsx
Verify: after 2 page visits, menu_scans row count grows by 2.
Commit: feat: track guest menu scans

## [x] T6 - Docs sync and phase close
Goal: update DB.md and PRD.md to reflect live integration; close Phase 2.
Files: docs/DB.md, docs/PRD.md, docs/TASKS.md
Verify: docs match reality; all tasks checked.
Commit: docs: sync specs after phase 2

---

## Phase 3: Owner dashboard & analytics

Legend: [ ] todo | [x] done
Rule: one task in progress at a time. Loop per task: spec -> plan -> review -> act -> verify -> commit.
Board rules (same as Phase 2): per task Goal / Files / Verify / Commit; English only; strict scope; agent never pushes; checkboxes updated by human only.
Manual steps live inside each task's Goal; the human runs them in the Supabase dashboard / SQL editor.

OUT OF SCOPE for Phase 3: image uploads, multi-tenant onboarding, payments, i18n, chart libraries.

## [ ] P3-T1 - Owner auth foundation
Goal: add Supabase Auth (email+password), a /login page, and auth helpers. Manual step: create one demo owner user in the Supabase dashboard.
Files: package.json (add @supabase/ssr), lib/supabase.ts (add server + client auth helpers), app/login/page.tsx (new), components/login-form.tsx (new)
Verify: /login renders; signing in with the demo owner redirects to /dashboard; invalid credentials show a user-facing error (no console.log).
Commit: feat: add owner auth foundation

## [ ] P3-T2 - Ownership + protection
Goal: add businesses.owner_id, owner RLS policies for businesses/categories/menu_items (SELECT + UPDATE) and menu_scans (SELECT for the owner via businesses.owner_id = auth.uid()), plus a server-side guard that redirects /dashboard to /login when there is no session. Manual step: link the demo owner uuid to the olive-salt business.
Files: docs/seed.sql (owner_id column + owner RLS policies), lib/auth.ts (session helper), app/dashboard/layout.tsx (new)
Verify: logged-out visit to /dashboard redirects to /login; the owner can read and update their own business, category, and menu_item rows; the owner can read only their own menu_scans; the owner cannot read or update another owner's rows.
Commit: feat: add ownership model and dashboard route protection

## [ ] P3-T3 - Dashboard live data
Goal: replace the mock dashboard with real categories/items fetched via the owner session; fix the 2 pre-existing TS errors in app/dashboard/page.tsx as part of the rewrite.
Files: app/dashboard/page.tsx (rewrite)
Verify: /dashboard renders Olive & Salt categories/items from Supabase; typecheck/build passes with no TS errors.
Commit: feat: load dashboard data from supabase

## [ ] P3-T4 - Item editing
Goal: edit price/description/is_active from the dashboard via a server action; the guest menu reflects changes after refresh.
Files: app/dashboard/page.tsx, lib/actions.ts (new server action)
Verify: changing a price in the dashboard shows the new price on /m/olive-salt after refresh; toggling is_active hides the item from the guest menu.
Commit: feat: edit menu items from dashboard

## [ ] P3-T5 - QR code
Goal: generate a QR code for /m/[slug] using qrcode.react, encoded from the current public origin via window.location.origin (never a hardcoded localhost URL), with preview + download.
Files: package.json (add qrcode.react), components/qr-code.tsx (new), app/dashboard/page.tsx
Verify: dashboard shows a QR for olive-salt; scanning it with a phone opens the live menu; the download button exports an image.
Commit: feat: add qr code preview and download

## [ ] P3-T6 - Analytics
Goal: add stat cards for scans today / last 7 days / total / unique ip_hash (no chart library).
Files: app/dashboard/page.tsx, lib/analytics.ts (new)
Verify: each card shows the correct count based on menu_scans rows.
Commit: feat: add scan analytics stat cards

## [ ] P3-T7 - Docs sync + cleanup
Goal: update PRD/DB/Tech and the env var list; remove leftovers (mock data, dead code).
Files: docs/PRD.md, docs/DB.md, docs/Tech.md
Verify: docs match reality; no leftover mock/dashboard dead code remains.
Commit: docs: sync specs after phase 3