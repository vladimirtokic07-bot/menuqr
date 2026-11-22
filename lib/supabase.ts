import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import {
  createBrowserClient,
  createServerClient,
} from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Missing Supabase environment variables. ' +
      'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local'
  )
}

// Definitively-typed references for use inside closures. Control-flow narrowing
// is not preserved inside function bodies for these module-level bindings.
const SUPABASE_URL: string = supabaseUrl
const SUPABASE_PUBLISHABLE_KEY: string = supabasePublishableKey

const globalForSupabase = globalThis as unknown as {
  supabase: SupabaseClient | undefined
}

/**
 * Anonymous client for public, read-only data (e.g. the guest menu at /m/[slug]).
 * Kept as-is so existing guest pages never break.
 */
export const supabase: SupabaseClient =
  globalForSupabase.supabase ?? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)

if (process.env.NODE_ENV !== 'production') {
  globalForSupabase.supabase = supabase
}

const globalForBrowserSupabase = globalThis as unknown as {
  browserSupabase: SupabaseClient | undefined
}

/**
 * Cookie-based client for the browser (Client Components).
 * Use for auth actions such as signInWithPassword / signOut.
 */
export function createBrowserSupabaseClient(): SupabaseClient {
  if (!globalForBrowserSupabase.browserSupabase) {
    globalForBrowserSupabase.browserSupabase = createBrowserClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    )
  }
  return globalForBrowserSupabase.browserSupabase
}

/**
 * Cookie-based client for Server Components / Server Actions / Route Handlers.
 * Must be created per request because it reads the request cookies.
 *
 * `next/headers` is imported lazily so this module stays safe to import from
 * Client Components (which must not pull in server-only code).
 */
export async function createServerSupabaseClient(): Promise<SupabaseClient> {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()

  return createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // `setAll` is called from a Server Component where cookies are read-only.
          // Safe to ignore: sessions are refreshed by the browser client or middleware.
        }
      },
    },
  })
}
