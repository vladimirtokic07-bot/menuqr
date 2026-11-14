import { supabase } from "@/lib/supabase"
import { formatPrice } from "@/lib/format"
import { GuestMenuView, type GuestMenuItem } from "@/components/guest-menu-view"

export const dynamic = "force-dynamic"

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function PublicMenuPage({ params }: PageProps) {
  const { slug } = await params

  const { data: business } = await supabase
    .from("businesses")
    .select("id, name")
    .eq("slug", slug)
    .single()

  if (!business) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fbfaf6] px-6 text-center text-[#173b2d]">
        <p className="text-sm text-[#7a8077]">This menu could not be found.</p>
      </main>
    )
  }

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
