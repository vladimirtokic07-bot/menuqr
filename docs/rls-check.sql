-- rls-check.sql - P3-T2 Row Level Security assertions.
-- Run in the Supabase SQL editor as the connection role. RLS is exercised by
-- switching roles inside each DO block; this script does NOT mutate data (no
-- sentinel insert/cleanup), so there is nothing to grant or reset afterward.
--
-- PREREQUISITE (the manual linking step from seed.sql):
--   UPDATE businesses SET owner_id = '<demo-owner-uuid>' WHERE slug = 'olive-salt';
--
-- Replace the placeholders below:
--   <OWNER_UUID>  - the same demo owner UUID used in the linking step.
--   <OTHER_UUID>  - any DIFFERENT uuid (need not exist in auth.users).
--
-- For A3 to report a non-zero scan count, open /m/olive-salt once as a guest so
-- at least one menu_scans row exists. The assertions still pass with zero scans.
--
-- Each DO block sets its own role at the start, because SET LOCAL ROLE is
-- scoped to the transaction and would otherwise leak into the next block. Each
-- assertion raises an exception on FAIL and emits a NOTICE on PASS.

-- ===== A1: anon cannot UPDATE menu_items =====
do $$
declare
  v bigint;
begin
  set local role anon;
  begin
    update menu_items set name = name where true;
    get diagnostics v = row_count;
    if v <> 0 then
      raise exception 'FAIL: anon updated % menu_items rows', v;
    end if;
  exception
    when insufficient_privilege then
      null; -- permission denied also means anon cannot update
  end;
  raise notice 'PASS: anon cannot UPDATE menu_items';
end $$;

-- ===== A1b: anon cannot UPDATE businesses =====
do $$
declare
  v bigint;
begin
  set local role anon;
  begin
    update businesses set name = name where true;
    get diagnostics v = row_count;
    if v <> 0 then
      raise exception 'FAIL: anon updated % businesses rows', v;
    end if;
  exception
    when insufficient_privilege then
      null;
  end;
  raise notice 'PASS: anon cannot UPDATE businesses';
end $$;

-- ===== A1c: anon cannot UPDATE categories =====
do $$
declare
  v bigint;
begin
  set local role anon;
  begin
    update categories set name = name where true;
    get diagnostics v = row_count;
    if v <> 0 then
      raise exception 'FAIL: anon updated % categories rows', v;
    end if;
  exception
    when insufficient_privilege then
      null;
  end;
  raise notice 'PASS: anon cannot UPDATE categories';
end $$;

-- ===== A2: anon cannot SELECT menu_scans =====
do $$
declare
  v bigint;
begin
  set local role anon;
  begin
    select count(*) into v from menu_scans;
    if v <> 0 then
      raise exception 'FAIL: anon saw % menu_scans rows', v;
    end if;
  exception
    when insufficient_privilege then
      null;
  end;
  raise notice 'PASS: anon cannot SELECT menu_scans';
end $$;

-- ===== A3: owner can UPDATE own businesses/categories/menu_items and SELECT own scans =====
do $$
declare
  vb bigint;
  vc bigint;
  vi bigint;
  vs bigint;
begin
  set local role authenticated;
  perform set_config('request.jwt.claims', '{"sub":"<OWNER_UUID>","role":"authenticated"}', true);

  update businesses set name = name where true;
  get diagnostics vb = row_count;
  if vb = 0 then
    raise exception 'FAIL: owner updated 0 businesses (is owner_id linked?)';
  end if;

  update categories set name = name where true;
  get diagnostics vc = row_count;
  if vc = 0 then
    raise exception 'FAIL: owner updated 0 categories';
  end if;

  update menu_items set name = name where true;
  get diagnostics vi = row_count;
  if vi = 0 then
    raise exception 'FAIL: owner updated 0 menu_items';
  end if;

  select count(*) into vs from menu_scans;
  raise notice 'PASS: owner updated % businesses / % categories / % items and sees % scans',
    vb, vc, vi, vs;
end $$;

-- ===== A4: another owner cannot touch this owner's rows =====
do $$
declare
  vb bigint;
  vc bigint;
  vi bigint;
  vs bigint;
begin
  set local role authenticated;
  perform set_config('request.jwt.claims', '{"sub":"<OTHER_UUID>","role":"authenticated"}', true);

  update businesses set name = name where true;
  get diagnostics vb = row_count;
  update categories set name = name where true;
  get diagnostics vc = row_count;
  update menu_items set name = name where true;
  get diagnostics vi = row_count;
  select count(*) into vs from menu_scans;

  if vb <> 0 or vc <> 0 or vi <> 0 or vs <> 0 then
    raise exception 'FAIL: other owner touched rows (businesses=%, categories=%, items=%, scans=%)',
      vb, vc, vi, vs;
  end if;
  raise notice 'PASS: other owner cannot touch this owner''s rows';
end $$;

-- ===== Done =====
-- No cleanup step: nothing is inserted or deleted by this script.
