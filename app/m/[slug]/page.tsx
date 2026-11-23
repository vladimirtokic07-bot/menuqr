import { headers } from "next/headers"
import { notFound } from "next/navigation"
import { after } from "next/server"

import { supabase } from "@/lib/supabase"
import { formatPrice } from "@/lib/format"
import { hashIp } from "@/lib/hash"
import { GuestMenuView, type GuestMenuItem } from "@/components/guest-menu-view"

export const dynamic = "force-dynamic"

const scanHashSalt = process.env.SCAN_HASH_SALT

if (!scanHashSalt) {
  throw new Error(
    "Missing SCAN_HASH_SALT environment variable. Set it in .env.local"
  )
}

// Definitively-typed reference for use inside function declarations.
// Control-flow narrowing is not preserved inside function bodies for these
// module-level bindings (same pattern as lib/supabase.ts).
const SCAN_HASH_SALT: string = scanHashSalt

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function PublicMenuPage({ params }: PageProps) {
  const { slug } = await params

  const requestHeaders = await headers()
  const forwardedFor = requestHeaders.get("x-forwarded-for")
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown"

  const { data: business } = await supabase
    .from("businesses")
    .select("id, name")
    .eq("slug", slug)
    .single()

  if (!business) notFound()

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .eq("business_id", business.id)
    .order("display_order")

  const { data: items } = await supabase
    .from("menu_items")
    .select("*")
    .eq("business_id", business.id)
    .eq("is_active", true)
    .order("display_order")

  const ipHash = hashIp(ip, SCAN_HASH_SALT)
  const businessId = business.id

  after(async () => {
    try {
      const { error } = await supabase.rpc("register_scan", {
        p_business_id: businessId,
        p_ip_hash: ipHash,
      })

      if (error) {
        console.error("Scan tracking failed:", error.message)
      }
    } catch (error) {
      console.error("Scan tracking failed:", error)
    }
  })

  const nameById = new Map<string, string>(
    (categories ?? []).map((category): [string, string] => [category.id, category.name])
  )

  const mappedItems: GuestMenuItem[] = (items ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description ?? "",
    price: formatPrice(item.price_cents),
    category: nameById.get(item.category_id) ?? "",
    imageUrl: item.image_url ?? null,
    badges: [
      ...(item.is_vegetarian ? ["Vegetarian"] : []),
      ...(item.is_spicy ? ["Spicy"] : []),
      ...(item.is_chef_choice ? ["Chef's choice"] : []),
    ],
    allergens: item.allergens ?? [],
    calories: item.calories ?? null,
  }))

  return (
    <GuestMenuView
      businessName={business.name}
      categories={(categories ?? []).map((category) => category.name)}
      items={mappedItems}
    />
  )
}
