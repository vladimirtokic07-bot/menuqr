import type { SupabaseClient, User } from "@supabase/supabase-js"

/**
 * Returns the authenticated user for the current request, or null when there
 * is no session.
 *
 * The server client is imported lazily so this module stays safe to import in
 * tests without Supabase env vars; pass a client explicitly to unit-test.
 */
export async function getSessionUser(
  client?: SupabaseClient
): Promise<User | null> {
  let supabase = client

  if (!supabase) {
    const { createServerSupabaseClient } = await import("@/lib/supabase")
    supabase = await createServerSupabaseClient()
  }

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    // Session invalid or expired - treat as unauthenticated.
    return null
  }

  return data.user ?? null
}
