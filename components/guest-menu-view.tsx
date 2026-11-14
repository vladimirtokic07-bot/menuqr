"use client"

import { useMemo, useState } from "react"
import { ChevronRight, Clock3, Flame, Leaf, Search, X } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export type GuestMenuItem = {
  id: string
  name: string
  description: string
  price: string
  category: string
  imageUrl: string | null
  badges: string[]
  allergens: string[]
  calories: number | null
}

type GuestMenuViewProps = {
  businessName: string
  categories: string[]
  items: GuestMenuItem[]
}

export function GuestMenuView({ businessName, categories, items }: GuestMenuViewProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")
  const [selectedItem, setSelectedItem] = useState<GuestMenuItem | null>(null)
  const [language, setLanguage] = useState("EN")

  const tabs = ["All", ...categories]
  const monogram = businessName
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase()

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()
    return items.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory
      const matchesSearch =
        !query || `${item.name} ${item.description}`.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, search, items])

  return (
    <main className="min-h-screen bg-[#fbfaf6] pb-28 text-[#173b2d]">
      <div className="mx-auto w-full max-w-xl px-5">
        <header className="flex items-start justify-between gap-4 pb-7 pt-7">
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#173b2d] text-sm font-semibold tracking-tight text-[#f5e8cf]">
              {monogram}
            </div>
            <div>
              <p className="font-serif text-xl leading-tight text-[#173b2d]">{businessName}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-[#7c8177]">
                Seasonal food · Good company
              </p>
            </div>
          </div>
          <div
            className="flex shrink-0 rounded-full border border-[#d8d7cc] bg-white/70 p-1 text-[10px] font-semibold tracking-[0.12em] text-[#8a8d84] shadow-sm"
            aria-label="Choose language"
          >
            {["EN", "ES", "FR"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLanguage(item)}
                className={`rounded-full px-2.5 py-1.5 transition-colors ${
                  language === item ? "bg-[#173b2d] text-white" : "hover:text-[#173b2d]"
                }`}
                aria-pressed={language === item}
              >
                {item}
              </button>
            ))}
          </div>
        </header>
        <section aria-label="Find a dish">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9a9d94]"
              data-icon="inline-start"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search the menu"
              aria-label="Search the menu"
              className="h-12 w-full rounded-2xl border border-[#e3e1d8] bg-white pl-11 pr-4 text-sm text-[#173b2d] shadow-[0_6px_20px_rgba(39,56,44,0.04)] outline-none transition placeholder:text-[#a2a39d] focus:border-[#8da794] focus:ring-2 focus:ring-[#8da794]/20"
            />
          </div>
          <div
            className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 py-5"
            role="tablist"
            aria-label="Menu categories"
          >
            {tabs.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                  activeCategory === category
                    ? "border-[#173b2d] bg-[#173b2d] text-white"
                    : "border-[#dcdcd2] bg-white/70 text-[#687067] hover:border-[#9eb09e] hover:text-[#173b2d]"
                }`}
                role="tab"
                aria-selected={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
        <section aria-labelledby="menu-heading">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a06d42]">
                Today&apos;s menu
              </p>
              <h1
                id="menu-heading"
                className="mt-1 font-serif text-3xl tracking-tight text-[#173b2d]"
              >
                Made for lingering
              </h1>
            </div>
            <span className="flex items-center gap-1 pb-1 text-[11px] text-[#8b8f86]">
              <Clock3 className="size-3.5" /> 8:00–22:00
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedItem(item)}
                className="group flex w-full gap-4 rounded-3xl border border-[#e9e5da] bg-white/85 p-3 text-left shadow-[0_8px_24px_rgba(55,65,47,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(55,65,47,0.1)]"
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="size-[104px] shrink-0 rounded-2xl object-cover"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="flex size-[104px] shrink-0 items-center justify-center rounded-2xl bg-[#edf2ea] text-[#9aa79a]"
                  >
                    <Leaf className="size-6" />
                  </div>
                )}
                <span className="flex min-w-0 flex-1 flex-col py-1">
                  <span className="flex items-start justify-between gap-2">
                    <span className="font-serif text-[19px] leading-tight text-[#173b2d]">
                      {item.name}
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-[#a06d42]">
                      {item.price}
                    </span>
                  </span>
                  <span className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#747970]">
                    {item.description}
                  </span>
                  <span className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {item.badges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1 rounded-full bg-[#edf2ea] px-2 py-1 text-[9px] font-semibold text-[#477052]"
                      >
                        {badge === "Vegetarian" ? (
                          <Leaf className="size-3" />
                        ) : badge === "Spicy" ? (
                          <Flame className="size-3" />
                        ) : null}
                        {badge}
                      </span>
                    ))}
                  </span>
                </span>
                <ChevronRight className="mt-1 size-4 shrink-0 text-[#c0bfb5] transition group-hover:translate-x-0.5" />
              </button>
            ))}
            {filteredItems.length === 0 && (
              <div className="rounded-3xl border border-dashed border-[#d8d7cc] bg-white/50 px-6 py-12 text-center text-sm text-[#7a8077]">
                No dishes match your search.
              </div>
            )}
          </div>
        </section>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#e5e1d5] bg-[#fbfaf6]/90 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md">
        <button
          type="button"
          onClick={() => window.alert("Your waiter has been notified.")}
          className="mx-auto flex h-12 w-full max-w-xl items-center justify-center rounded-2xl bg-[#173b2d] text-sm font-semibold text-white shadow-[0_8px_24px_rgba(23,59,45,0.2)] transition hover:bg-[#24533f]"
        >
          Call waiter
        </button>
      </div>

      <Sheet open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="mx-auto max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-[2rem] border-0 bg-[#fbfaf6] p-0 text-[#173b2d]"
        >
          {selectedItem && (
            <>
              <div className="relative h-56 sm:h-72">
                {selectedItem.imageUrl ? (
                  <img src={selectedItem.imageUrl} alt="" className="size-full object-cover" />
                ) : (
                  <div
                    aria-hidden
                    className="flex size-full items-center justify-center bg-[#edf2ea] font-serif text-3xl text-[#9aa79a]"
                  >
                    {monogram}
                  </div>
                )}
                <SheetClose
                  render={
                    <button
                      type="button"
                      aria-label="Close details"
                      className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-emerald-950/85 text-white shadow-lg backdrop-blur-sm transition hover:bg-emerald-950"
                    />
                  }
                >
                  <X className="size-5" />
                </SheetClose>
              </div>
              <div className="flex flex-col gap-5 p-6 pb-9">
                <SheetHeader className="flex-row items-start justify-between gap-4 space-y-0 text-left">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a06d42]">
                      {selectedItem.category}
                    </p>
                    <SheetTitle className="mt-1 font-serif text-3xl font-normal text-[#173b2d]">
                      {selectedItem.name}
                    </SheetTitle>
                  </div>
                  <p className="pt-2 text-lg font-semibold text-[#a06d42]">{selectedItem.price}</p>
                </SheetHeader>
                <p className="text-sm leading-7 text-[#626b61]">{selectedItem.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#93988e]">
                      Allergens
                    </p>
                    <p className="mt-2 text-sm text-[#173b2d]">
                      {selectedItem.allergens.length > 0
                        ? selectedItem.allergens.join(" · ")
                        : "None"}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#93988e]">
                      Nutrition
                    </p>
                    <p className="mt-2 text-sm text-[#173b2d]">
                      {selectedItem.calories != null ? `${selectedItem.calories} kcal` : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </main>
  )
}
