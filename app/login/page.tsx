import { redirect } from 'next/navigation'
import { QrCode } from 'lucide-react'

import { createServerSupabaseClient } from '@/lib/supabase'
import { LoginForm } from '@/components/login-form'

export const dynamic = 'force-dynamic'

export default async function LoginPage() {
  // Manual step (P3-T1) - create the demo owner in the Supabase dashboard:
  //   Authentication -> Users -> Add user
  //   - check "Auto Confirm User"
  //   - password must be at least 6 characters
  // Save the new user's UUID for P3-T2 (link it to businesses.owner_id).
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7f4] px-5 py-12 text-emerald-950">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-2">
          <span className="grid size-9 place-items-center rounded-lg bg-emerald-900 text-lime-300">
            <QrCode className="size-4" />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Menu<span className="text-emerald-600">QR</span>
          </span>
        </div>

        <div className="rounded-3xl border border-stone-200/80 bg-white p-8 shadow-sm sm:p-10">
          <div className="mb-8 space-y-2 text-center">
            <h1 className="font-serif text-3xl tracking-tight text-emerald-950">
              Owner sign in
            </h1>
            <p className="text-sm text-stone-500">
              Access your dashboard to manage your menu.
            </p>
          </div>
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-stone-400">
          MenuQR &middot; made for hospitality.
        </p>
      </div>
    </main>
  )
}
