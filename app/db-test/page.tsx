import { supabase } from '@/lib/supabase'

export default async function DbTestPage() {
  const { data, error } = await supabase
    .from('menu_items')
    .select('name, price_cents, is_active')

  return (
    <pre style={{ padding: 24, fontFamily: 'monospace' }}>
      {JSON.stringify({ data, error }, null, 2)}
    </pre>
  )
}