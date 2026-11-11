# MenuQR - Task Board (Phase 2: Database integration)

Legend: [ ] todo | [x] done
Rule: one task in progress at a time. Loop per task: spec -> plan -> review -> act -> verify -> commit.

## [ ] T1 - Env guard for Supabase client
Goal: fail fast with a clear error if env vars are missing.
Files: lib/supabase.ts
Verify: dev server starts; with a var removed locally, error message is clear.
Commit: fix: add env validation to supabase client

## [ ] T2 - Live connection audit
Goal: prove guest read works and guest write is blocked.
Files: none (terminal checks only)
Verify: GET menu_items -> HTTP 200 with 6 rows; POST menu_items -> HTTP 401/403.
Commit: none

## [ ] T3 - Guest menu live data
Goal: /m/[slug] renders categories and dishes from Supabase.
Files: app/m/[slug]/page.tsx, components/guest-menu-view.tsx (new), lib/format.ts (new)
Verify: /m/olive-salt shows 6 dishes grouped by category; changing a price in
Supabase Table Editor shows the new price after browser refresh.
Commit: feat: load guest menu from supabase

## [ ] T4 - Unknown slug handling
Goal: friendly not-found page for unknown slugs.
Files: app/m/[slug]/page.tsx, app/m/[slug]/not-found.tsx (new)
Verify: /m/does-not-exist renders friendly message with HTTP 404.
Commit: feat: add not-found state for guest menu

## [ ] T5 - Scan tracking
Goal: each guest menu view inserts one row into menu_scans.
Files: app/m/[slug]/page.tsx
Verify: after 2 page visits, menu_scans row count grows by 2.
Commit: feat: track guest menu scans

## [ ] T6 - Docs sync and phase close
Goal: update DB.md and PRD.md to reflect live integration; close Phase 2.
Files: docs/DB.md, docs/PRD.md, docs/TASKS.md
Verify: docs match reality; all tasks checked.
Commit: docs: sync specs after phase 2