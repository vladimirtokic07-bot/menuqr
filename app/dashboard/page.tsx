"use client"

import { useMemo, useState } from "react"
import {
  BarChart3,
  Clock3,
  ChevronDown,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  LayoutGrid,
  Menu,
  MoreHorizontal,
  Pencil,
  Plus,
  QrCode,
  Search,
  Settings,
  SlidersHorizontal,
  Trash2,
  UtensilsCrossed,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

const initialItems = [
  { id: 1, name: "Whipped ricotta", description: "Honey, sea salt, olive oil & sourdough", category: "Appetizers", price: "$12", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=160&q=80", active: true, badges: ["Vegetarian", "Chef's choice"] },
  { id: 2, name: "Garden bowl", description: "Ancient grains, greens, avocado & tahini", category: "Main courses", price: "$18", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=160&q=80", active: true, badges: ["Vegetarian"] },
  { id: 3, name: "Roasted salmon", description: "Citrus greens, crispy potatoes & dill oil", category: "Main courses", price: "$24", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=160&q=80", active: true, badges: ["Chef's choice"] },
  { id: 4, name: "Tiramisu", description: "Espresso-soaked ladyfingers & mascarpone", category: "Desserts", price: "$9", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=160&q=80", active: false, badges: [] },
  { id: 5, name: "Matcha latte", description: "Ceremonial matcha, oat milk & vanilla", category: "Drinks", price: "$5", image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=160&q=80", active: true, badges: ["Vegetarian"] },
]

const navItems = [
  { label: "Menu items", icon: UtensilsCrossed, active: true },
  { label: "Categories", icon: LayoutGrid },
  { label: "QR code", icon: QrCode },
  { label: "Analytics", icon: BarChart3 },
  { label: "Settings", icon: Settings },
]

function StatCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: typeof BarChart3 }) {
  return <Card className="border-stone-200/80 bg-white shadow-none"><CardContent className="p-5"><div className="mb-5 flex items-center justify-between"><p className="text-xs font-medium text-stone-500">{label}</p><span className="grid size-8 place-items-center rounded-lg bg-[#edf2ea] text-emerald-900"><Icon className="size-4" /></span></div><p className="font-serif text-3xl tracking-tight text-emerald-950">{value}</p><p className="mt-1 text-xs text-stone-400">{detail}</p></CardContent></Card>
}

function AddItemDialog({ onAdd }: { onAdd: (item: (typeof initialItems)[number]) => void }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Appetizers")
  const [price, setPrice] = useState("")
  const [photo, setPhoto] = useState("")
  const [badges, setBadges] = useState<string[]>([])
  const toggleBadge = (badge: string) => setBadges((current) => current.includes(badge) ? current.filter((item) => item !== badge) : [...current, badge])
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim() || !price.trim()) return
    onAdd({ id: Date.now(), name, description, category, price: `$${price}`, image: photo || "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=160&q=80", active: true, badges })
    setName(""); setDescription(""); setPrice(""); setPhoto(""); setBadges([]); setOpen(false)
  }
  return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-emerald-900 px-4 text-sm font-medium text-white shadow-xs transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"><Plus className="size-4" />Add new item</DialogTrigger><DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl"><DialogHeader><DialogTitle className="font-serif text-2xl text-emerald-950">Add new item</DialogTitle><DialogDescription>Add a dish guests will love. You can edit all details later.</DialogDescription></DialogHeader><form onSubmit={submit} className="flex flex-col gap-5"><div className="grid gap-4 sm:grid-cols-2"><div className="flex flex-col gap-2"><Label htmlFor="item-name">Name</Label><Input id="item-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Whipped ricotta" required /></div><div className="flex flex-col gap-2"><Label htmlFor="item-price">Price (USD)</Label><div className="relative"><span className="absolute left-3 top-2.5 text-sm text-stone-400">$</span><Input id="item-price" className="pl-7" value={price} onChange={(event) => setPrice(event.target.value.replace(/[^0-9.]/g, ""))} placeholder="12.00" required /></div></div></div><div className="flex flex-col gap-2"><Label htmlFor="item-description">Description</Label><Textarea id="item-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="A short, appetizing description" /></div><div className="grid gap-4 sm:grid-cols-2"><div className="flex flex-col gap-2"><Label>Category</Label><Select value={category} onValueChange={setCategory}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectGroup>{["Appetizers", "Soups", "Main courses", "Desserts", "Drinks"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectGroup></SelectContent></Select></div><div className="flex flex-col gap-2"><Label htmlFor="item-photo">Photo URL</Label><Input id="item-photo" value={photo} onChange={(event) => setPhoto(event.target.value)} placeholder="Paste an image URL" /></div></div><div className="flex flex-col gap-3"><Label>Badges</Label><div className="grid gap-3 sm:grid-cols-3">{["Vegetarian", "Spicy", "Chef's choice"].map((badge) => <label key={badge} className="flex items-center gap-2 text-sm text-stone-600"><Checkbox checked={badges.includes(badge)} onCheckedChange={() => toggleBadge(badge)} />{badge}</label>)}</div></div><div className="flex flex-col gap-3"><Label>Allergens</Label><div className="flex flex-wrap gap-3">{["Milk", "Wheat", "Eggs", "Fish", "Nuts", "Sesame"].map((allergen) => <label key={allergen} className="flex items-center gap-2 text-sm text-stone-600"><Checkbox />{allergen}</label>)}</div></div><DialogFooter><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit" className="bg-emerald-900 text-white hover:bg-emerald-800">Save item</Button></DialogFooter></form></DialogContent></Dialog>
}

export default function DashboardPage() {
  const [items, setItems] = useState(initialItems)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const filteredItems = useMemo(() => items.filter((item) => {
    const matchesSearch = `${item.name} ${item.description}`.toLowerCase().includes(search.toLowerCase())
    return matchesSearch && (category === "all" || item.category === category)
  }), [items, search, category])
  const toggleItem = (id: number, active: boolean) => setItems((current) => current.map((item) => item.id === id ? { ...item, active } : item))
  const deleteItem = (id: number) => setItems((current) => current.filter((item) => item.id !== id))

  return <div className="min-h-screen bg-[#f7f7f4] text-emerald-950"><aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-stone-200 bg-white lg:flex"><div className="flex h-16 items-center gap-2 border-b border-stone-100 px-6"><span className="grid size-8 place-items-center rounded-lg bg-emerald-900 text-lime-300"><QrCode className="size-4" /></span><span className="font-semibold tracking-tight">Menu<span className="text-emerald-600">QR</span></span></div><div className="flex flex-1 flex-col px-3 py-5"><p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[.2em] text-stone-400">Workspace</p><nav className="flex flex-col gap-1">{navItems.map(({ label, icon: Icon, active }) => <a key={label} href={label === "QR code" ? "/m/olive-salt" : `#${label.toLowerCase().replace(" ", "-")}`} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-[#edf2ea] text-emerald-900" : "text-stone-500 hover:bg-stone-50 hover:text-emerald-900"}`}><Icon className="size-4" />{label}{label === "QR code" && <ExternalLink className="ml-auto size-3" />}</a>)}</nav><div className="mt-auto rounded-2xl bg-emerald-950 p-4 text-white"><p className="text-xs font-semibold">Need a hand?</p><p className="mt-1 text-[11px] leading-5 text-white/60">Our team is here to help you make the most of your menu.</p><button className="mt-3 flex items-center gap-1 text-xs font-semibold text-lime-300">Visit help center <ChevronRight className="size-3" /></button></div></div></aside><div className="lg:pl-64"><header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-stone-200/80 bg-[#f7f7f4]/90 px-4 backdrop-blur sm:px-8"><div className="flex items-center gap-3"><button className="grid size-9 place-items-center rounded-lg border border-stone-200 bg-white lg:hidden" aria-label="Open navigation"><Menu className="size-4" /></button><div><p className="text-sm font-semibold text-emerald-950">Olive &amp; Salt</p><p className="hidden text-[11px] text-stone-400 sm:block">Restaurant workspace</p></div></div><DropdownMenu><DropdownMenuTrigger className="flex items-center gap-2 rounded-full p-1.5 pr-2 transition-colors hover:bg-white"><span className="grid size-8 place-items-center rounded-full bg-amber-200 text-[11px] font-bold text-amber-900">JM</span><span className="hidden text-sm font-medium text-stone-600 sm:block">Jamie Morgan</span><ChevronDown className="size-3.5 text-stone-400" /></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>Account settings</DropdownMenuItem><DropdownMenuItem>Team members</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem>Sign out</DropdownMenuItem></DropdownMenuContent></DropdownMenu></header><main className="mx-auto max-w-[1440px] px-4 py-7 sm:px-8"><div className="mb-7 flex flex-col justify-between gap-4 xl:flex-row xl:items-end"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-emerald-600">Overview</p><h1 className="mt-1 font-serif text-4xl tracking-tight text-emerald-950">Good morning, Jamie.</h1><p className="mt-2 text-sm text-stone-500">Here&apos;s what&apos;s happening with your menu today.</p></div><Button variant="outline" className="w-fit border-stone-200 bg-white text-emerald-950"><ExternalLink data-icon="inline-start" />View live menu</Button></div><div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Menu views this month" value="12,486" detail="+18.4% from last month" icon={BarChart3} /><StatCard label="Scans today" value="284" detail="+12.1% from yesterday" icon={QrCode} /><StatCard label="Most viewed dish" value="Garden bowl" detail="1,842 views this month" icon={UtensilsCrossed} /><StatCard label="Avg. time on menu" value="2m 18s" detail="+24s from last month" icon={Clock3} /></div><div className="grid gap-6 xl:grid-cols-[1fr_310px]"><Card className="border-stone-200/80 bg-white shadow-none"><CardHeader className="flex flex-col gap-4 border-b border-stone-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"><div><CardTitle className="font-serif text-2xl font-normal text-emerald-950">Menu items</CardTitle><p className="mt-1 text-xs text-stone-400">Manage the dishes shown on your digital menu.</p></div><AddItemDialog onAdd={(item) => setItems((current) => [item, ...current])} /></CardHeader><CardContent className="p-0"><div className="flex flex-col gap-3 border-b border-stone-100 p-4 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-2.5 size-4 text-stone-400" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search menu items" className="pl-9" /></div><Select value={category} onValueChange={setCategory}><SelectTrigger className="w-full sm:w-44"><SlidersHorizontal className="size-4 text-stone-400" /><SelectValue placeholder="All categories" /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="all">All categories</SelectItem>{["Appetizers", "Soups", "Main courses", "Desserts", "Drinks"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectGroup></SelectContent></Select></div><div className="overflow-x-auto"><Table><TableHeader><TableRow className="hover:bg-transparent"><TableHead className="pl-5">Item</TableHead><TableHead>Category</TableHead><TableHead>Price</TableHead><TableHead>Status</TableHead><TableHead className="pr-5 text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{filteredItems.map((item) => <TableRow key={item.id}><TableCell className="min-w-[240px] pl-5"><div className="flex items-center gap-3"><img src={item.image} alt="" className="size-10 rounded-lg object-cover" /><div><p className="font-medium text-emerald-950">{item.name}</p><p className="max-w-[180px] truncate text-xs text-stone-400">{item.description}</p></div></div></TableCell><TableCell className="text-stone-500">{item.category}</TableCell><TableCell className="font-medium text-emerald-950">{item.price}</TableCell><TableCell><div className="flex items-center gap-2"><Switch checked={item.active} onCheckedChange={(checked) => toggleItem(item.id, checked)} /><span className={`text-xs ${item.active ? "text-emerald-700" : "text-stone-400"}`}>{item.active ? "Active" : "Paused"}</span></div></TableCell><TableCell className="pr-5 text-right"><div className="flex justify-end gap-1"><Button variant="ghost" size="icon" aria-label={`Edit ${item.name}`}><Pencil className="size-4" /></Button><Button variant="ghost" size="icon" aria-label={`Delete ${item.name}`} onClick={() => deleteItem(item.id)}><Trash2 className="size-4 text-stone-400 hover:text-red-600" /></Button></div></TableCell></TableRow>)}</TableBody></Table></div></CardContent></Card><Card className="border-stone-200/80 bg-emerald-950 text-white shadow-none"><CardHeader className="p-5"><div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-lime-300">Your QR code</p><CardTitle className="mt-2 font-serif text-2xl font-normal">Ready to share</CardTitle></div><QrCode className="size-5 text-lime-300" /></div></CardHeader><CardContent className="p-5 pt-0"><div className="rounded-2xl bg-white p-4"><img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https%3A%2F%2Fmenuqr.com%2Fm%2Folive-salt" alt="QR code for the Olive & Salt digital menu" className="mx-auto aspect-square w-full max-w-[190px]" /></div><p className="mt-4 truncate text-xs text-white/50">menuqr.com/m/olive-salt</p><div className="mt-4 flex gap-2"><Button variant="secondary" className="flex-1 bg-white/10 text-white hover:bg-white/20" onClick={() => window.alert("PNG download is ready to connect.")}><Download data-icon="inline-start" />PNG</Button><Button variant="secondary" className="flex-1 bg-white/10 text-white hover:bg-white/20" onClick={() => window.alert("PDF download is ready to connect.")}><FileText data-icon="inline-start" />PDF</Button></div><div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4"><span className="text-xs text-white/55">Scans this month</span><span className="font-serif text-2xl text-lime-300">1,248</span></div></CardContent></Card></div></main></div></div>
}

