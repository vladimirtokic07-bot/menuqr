import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#fbfaf6] px-6 text-center text-[#173b2d]">
      <div className="flex size-12 items-center justify-center rounded-full bg-[#173b2d] text-sm font-semibold text-[#f5e8cf]">
        404
      </div>
      <h1 className="font-serif text-3xl tracking-tight text-[#173b2d]">
        Menu not found
      </h1>
      <p className="max-w-sm text-sm leading-6 text-[#7a8077]">
        The QR code you scanned may be incorrect, or this menu is no longer
        available.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex h-12 items-center justify-center rounded-2xl bg-[#173b2d] px-6 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(23,59,45,0.2)] transition hover:bg-[#24533f]"
      >
        Back to home
      </Link>
    </main>
  )
}
