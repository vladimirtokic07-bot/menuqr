'use client'

import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  Clock3,
  Menu,
  QrCode,
  ScanLine,
  Sparkles,
  UtensilsCrossed,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const features = [
  {
    icon: Zap,
    eyebrow: 'MOVE FAST',
    title: 'Instant updates',
    text: 'Change prices, pause a dish, or add a special in seconds. Every guest sees the latest version.',
    className: 'md:col-span-2 bg-emerald-950 text-white',
    iconClassName: 'bg-lime-300 text-emerald-950',
  },
  {
    icon: ScanLine,
    eyebrow: 'KEEP IT SIMPLE',
    title: 'Zero contact',
    text: 'One quick scan takes guests straight to your menu. No app, no waiting, no friction.',
    className: 'bg-amber-50',
    iconClassName: 'bg-amber-200 text-amber-950',
  },
  {
    icon: BarChart3,
    eyebrow: 'KNOW MORE',
    title: 'Useful analytics',
    text: 'See what guests view most, when they browse, and what makes them order.',
    className: 'bg-white',
    iconClassName: 'bg-emerald-100 text-emerald-900',
  },
  {
    icon: Clock3,
    eyebrow: 'SAVE HOURS',
    title: 'Made for busy teams',
    text: 'Set it up once and keep your front of house focused on hospitality.',
    className: 'md:col-span-2 bg-stone-100',
    iconClassName: 'bg-white text-emerald-900',
  },
]

const plans = [
  {
    name: 'Starter',
    description: 'Everything you need to go digital.',
    price: '$0',
    detail: 'forever',
    features: ['1 digital menu', 'Unlimited menu scans', 'QR code generator', 'Basic customization'],
    featured: false,
  },
  {
    name: 'Pro',
    description: 'For restaurants ready to grow.',
    price: '$19',
    detail: 'per location / month',
    features: ['Unlimited menus & locations', 'Advanced analytics', 'Custom branding', 'Priority support'],
    featured: true,
  },
]

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[min(74vw,292px)] rotate-[4deg] sm:w-[310px]">
      <div className="absolute -inset-5 rounded-[3rem] bg-lime-300/20 blur-2xl" />
      <div className="relative rounded-[2.7rem] border-[7px] border-emerald-950 bg-emerald-950 p-2 shadow-2xl shadow-emerald-950/30">
        <div className="overflow-hidden rounded-[2.05rem] bg-[#fbfaf6]">
          <div className="flex items-center justify-between bg-emerald-900 px-5 pb-4 pt-5 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-tight">
              <span className="grid size-7 place-items-center rounded-full bg-lime-300 text-emerald-950"><UtensilsCrossed className="size-3.5" /></span>
              olive & salt
            </div>
            <Menu className="size-4" />
          </div>
          <div className="p-4">
            <div className="mb-5 rounded-2xl bg-[#e8eadf] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/60">Welcome to</p>
              <p className="mt-1 font-serif text-2xl text-emerald-950">olive & salt</p>
              <p className="mt-1 text-[10px] text-stone-500">Seasonal food · Good company</p>
            </div>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-serif text-lg font-semibold text-emerald-950">Today&apos;s menu</p>
              <span className="rounded-full bg-lime-100 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-800">Fresh</span>
            </div>
            <div className="flex flex-col gap-3">
              {[
                ['Whipped ricotta', 'Honey · sourdough', '$12'],
                ['Garden bowl', 'Grains · herbs · tahini', '$18'],
                ['Roasted salmon', 'Citrus · greens', '$24'],
              ].map(([name, description, price]) => (
                <div key={name} className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div><p className="text-xs font-semibold text-stone-800">{name}</p><p className="mt-0.5 text-[10px] text-stone-400">{description}</p></div>
                  <p className="text-xs font-semibold text-emerald-900">{price}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-emerald-900 py-3 text-[10px] font-semibold text-white"><QrCode className="size-3.5" /> Scan to order</div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-5 left-2 hidden rounded-2xl sm:-left-16 sm:block border border-white/80 bg-white px-3 py-2 shadow-lg shadow-emerald-950/10 sm:-left-16">
        <div className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-lg bg-lime-200 text-emerald-950"><QrCode className="size-4" /></span><div><p className="text-[9px] font-bold uppercase tracking-wider text-stone-400">Live menu</p><p className="text-xs font-semibold text-emerald-950">Always current</p></div></div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfaf6] text-emerald-950">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight"><span className="grid size-9 place-items-center rounded-xl bg-emerald-900 text-lime-300"><QrCode className="size-5" /></span><span className="text-lg">Menu<span className="text-emerald-600">QR</span></span></a>
        <div className="hidden items-center gap-8 text-sm font-medium text-emerald-950/65 md:flex"><a href="#features" className="transition-colors hover:text-emerald-900">Features</a><a href="#pricing" className="transition-colors hover:text-emerald-900">Pricing</a><a href="#demo" className="transition-colors hover:text-emerald-900">See demo</a></div>
        <a href="#pricing" className="hidden rounded-full bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 md:inline-block">Get started <ArrowRight className="ml-1 inline size-3.5" /></a>
        <details className="group md:hidden">
          <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-full border border-emerald-900/10 bg-white text-emerald-950 shadow-sm [&::-webkit-details-marker]:hidden"><Menu className="size-5 group-open:hidden" /><span className="hidden text-xl leading-none group-open:block">×</span><span className="sr-only">Open menu</span></summary>
          <div className="absolute inset-x-5 top-[4.75rem] z-10 rounded-3xl border border-stone-200 bg-[#fbfaf6] p-3 shadow-2xl shadow-emerald-950/15">
            <div className="flex flex-col gap-1 text-sm font-semibold text-emerald-950"><a href="#features" className="rounded-2xl px-4 py-3 hover:bg-white">Features</a><a href="#pricing" className="rounded-2xl px-4 py-3 hover:bg-white">Pricing</a><a href="#demo" className="rounded-2xl px-4 py-3 hover:bg-white">See demo</a></div>
            <a href="#pricing" className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-900 px-4 py-3 text-sm font-semibold text-white">Get started <ArrowRight className="size-3.5" /></a>
          </div>
        </details>
      </nav>

      <section id="top" className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-16 md:pt-24 lg:grid-cols-[1.02fr_.98fr] lg:px-12 lg:pb-32">
        <div className="max-w-xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm"><Sparkles className="size-3.5 text-amber-500" /> The menu your guests deserve</div>
          <h1 className="font-serif text-[clamp(2.9rem,10vw,6.8rem)] leading-[.88] tracking-[-.065em] text-emerald-950">Your menu,<br /><em className="font-normal text-emerald-600">always</em> <span className="whitespace-nowrap">up-to-date.</span></h1>
          <p className="mt-7 max-w-md text-base leading-7 text-stone-600 sm:text-lg">Create a beautiful QR-code digital menu in 5 minutes. No app download required for your guests.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#pricing"><Button size="lg" className="h-12 w-full rounded-full bg-emerald-900 px-6 text-sm text-white hover:bg-emerald-800 sm:w-auto">Create your menu <ArrowRight data-icon="inline-end" /></Button></a><a href="#demo"><Button variant="outline" size="lg" className="h-12 w-full rounded-full border-emerald-900/20 bg-transparent px-6 text-sm text-emerald-950 hover:bg-white sm:w-auto">See live demo <ChevronRight data-icon="inline-end" /></Button></a></div>
          <div className="mt-10 flex items-center gap-3 text-xs text-stone-500"><div className="flex -space-x-2"><span className="grid size-7 place-items-center rounded-full border-2 border-[#fbfaf6] bg-amber-200 text-[10px] font-bold text-amber-900">JM</span><span className="grid size-7 place-items-center rounded-full border-2 border-[#fbfaf6] bg-emerald-200 text-[10px] font-bold text-emerald-900">AR</span><span className="grid size-7 place-items-center rounded-full border-2 border-[#fbfaf6] bg-orange-200 text-[10px] font-bold text-orange-900">SL</span></div><span>Loved by 2,000+ independent spots</span></div>
        </div>
        <div id="demo" className="relative flex min-h-[460px] items-center justify-center rounded-[2rem] bg-emerald-900 px-6 py-14 sm:min-h-[560px]"><div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#d9f99d 1px, transparent 1px)', backgroundSize: '24px 24px' }} /><div className="absolute left-7 top-8 text-[10px] font-bold uppercase tracking-[.3em] text-lime-200/70">A better way to dine</div><PhoneMockup /></div>
      </section>

      <section aria-label="Trusted by independent restaurants" className="border-b border-stone-200/80 bg-[#f2f1eb] px-5 py-8 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><p className="text-center text-[10px] font-bold uppercase tracking-[.25em] text-stone-400">Trusted by 2,000+ independent spots</p><div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-center text-sm font-semibold tracking-tight text-stone-400 grayscale sm:grid-cols-5"><span>olive &amp; salt</span><span>Bistro 7</span><span>Kafana Kod Mare</span><span>Pepper &amp; Fig</span><span>Caffe Verde</span></div></div></section>

      <section id="features" className="border-y border-stone-200/80 bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-7xl"><div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-emerald-600">Less admin. More hospitality.</p><h2 className="max-w-xl font-serif text-4xl leading-tight tracking-[-.04em] text-emerald-950 sm:text-5xl">Everything your menu needs.<br /><span className="text-stone-400">Nothing it doesn&apos;t.</span></h2></div><p className="max-w-xs text-sm leading-6 text-stone-500">Built to feel as thoughtful as the food you serve.</p></div><div className="grid gap-4 md:grid-cols-4">{features.map((feature) => { const Icon = feature.icon; return <article key={feature.title} className={`rounded-3xl p-6 sm:p-8 ${feature.className}`}><span className={`mb-6 grid size-11 sm:mb-12 place-items-center rounded-2xl ${feature.iconClassName}`}><Icon className="size-5" /></span><p className="text-[10px] font-bold uppercase tracking-[.2em] opacity-60">{feature.eyebrow}</p><h3 className="mt-2 font-serif text-2xl tracking-tight">{feature.title}</h3><p className="mt-3 max-w-sm text-sm leading-6 opacity-65">{feature.text}</p></article> })}</div></div></section>

      <section id="pricing" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-2xl text-center"><p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-emerald-600">Simple pricing</p><h2 className="font-serif text-4xl tracking-[-.04em] sm:text-5xl">Start small. Grow freely.</h2><p className="mt-4 text-stone-500">No contracts, no surprise fees. Just a better menu.</p></div><div className="mx-auto mt-12 grid max-w-3xl gap-4 md:grid-cols-2">{plans.map((plan) => <article key={plan.name} className={`rounded-3xl border p-7 sm:p-9 ${plan.featured ? 'border-emerald-900 bg-emerald-900 text-white shadow-xl shadow-emerald-950/15' : 'border-stone-200 bg-white'}`}><div className="flex items-center justify-between"><h3 className="font-serif text-2xl">{plan.name}</h3>{plan.featured && <span className="rounded-full bg-lime-300 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-950">Most popular</span>}</div><p className={`mt-2 text-sm ${plan.featured ? 'text-white/60' : 'text-stone-500'}`}>{plan.description}</p><div className="mt-8 flex items-baseline gap-2"><span className="font-serif text-5xl">{plan.price}</span><span className={`text-xs ${plan.featured ? 'text-white/55' : 'text-stone-400'}`}>{plan.detail}</span></div><ul className="mt-8 flex flex-col gap-3">{plan.features.map((item) => <li key={item} className="flex items-center gap-2 text-sm"><Check className={`size-4 ${plan.featured ? 'text-lime-300' : 'text-emerald-600'}`} />{item}</li>)}</ul><a href="#top" className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-colors ${plan.featured ? 'bg-lime-300 text-emerald-950 hover:bg-lime-200' : 'border border-emerald-900/15 text-emerald-950 hover:bg-stone-50'}`}>{plan.featured ? 'Start free trial' : 'Get started'}</a></article>)}</div></section>

      <section id="faq" className="border-t border-stone-200/80 bg-[#f2f1eb] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-24"><div><p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-emerald-600">Good to know</p><h2 className="max-w-sm font-serif text-4xl tracking-[-.04em] text-emerald-950 sm:text-5xl">Questions, answered.</h2></div><Accordion className="w-full">{[
        ['Do my guests need an app?', 'No. Guests scan the QR code with their phone camera and your menu opens instantly in their browser.'],
        ['Can I update prices myself?', 'Yes. Your menu editor is built for quick updates, so you can change prices, availability, and specials without waiting on support.'],
        ['What happens after the free trial?', 'You can stay on the Starter plan for free or upgrade to Pro when you need more locations, analytics, and branding controls.'],
        ['Can the menu be translated?', 'Yes. Pro menus can be translated into multiple languages so every guest can browse comfortably.'],
      ].map(([question, answer], index) => <AccordionItem key={question} value={`item-${index}`} className="border-emerald-900/10"><AccordionTrigger className="py-5 text-base text-emerald-950 hover:no-underline sm:text-lg">{question}</AccordionTrigger><AccordionContent className="pb-5 leading-6 text-stone-600">{answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>

      <footer className="border-t border-stone-200 bg-white px-5 py-8 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between"><a href="#top" className="flex items-center gap-2 font-semibold text-emerald-950"><span className="grid size-7 place-items-center rounded-lg bg-emerald-900 text-lime-300"><QrCode className="size-3.5" /></span>MenuQR</a><p>© 2025 MenuQR. Made for hospitality.</p><div className="flex gap-5"><a href="#features" className="hover:text-emerald-900">Features</a><a href="#pricing" className="hover:text-emerald-900">Pricing</a><a href="#top" className="hover:text-emerald-900">Privacy</a></div></div></footer>
    </main>
  )
}
