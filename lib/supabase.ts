import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Missing Supabase environment variables. ' +
      'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local'
  )
}

const globalForSupabase = globalThis as unknown as {
  supabase: SupabaseClient | undefined
}

export const supabase: SupabaseClient =
  globalForSupabase.supabase ?? createClient(supabaseUrl, supabasePublishableKey)

if (process.env.NODE_ENV !== 'production') {
  globalForSupabase.supabase = supabase
}
