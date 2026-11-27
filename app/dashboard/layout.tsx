import { redirect } from "next/navigation"
import type { ReactNode } from "react"

import { getSessionUser } from "@/lib/auth"

export const dynamic = "force-dynamic"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await getSessionUser()

  if (!user) {
    redirect("/login")
  }

  return <>{children}</>
}
