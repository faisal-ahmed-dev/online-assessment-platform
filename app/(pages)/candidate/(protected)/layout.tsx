"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/lib/stores/auth.store"
import { UserRole } from "@/app/config/enums"
import { routes } from "@/app/config/routes"
import { AppNavbar } from "@/app/components/layouts/app-navbar"
import { AppFooter } from "@/app/components/layouts/app-footer"
import { UserDropdown } from "@/app/components/layouts/user-dropdown"
import { useAuth } from "@/app/lib/hooks/use-auth"

export default function CandidateProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isAuthenticated } = useAuthStore()
  const { signOut } = useAuth(UserRole.Candidate)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== UserRole.Candidate) {
      router.replace(routes.auth.candidateSignIn)
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== UserRole.Candidate) return null

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <AppNavbar rightSlot={<UserDropdown user={user} onLogout={signOut} />} />
      <main className="flex-1 pt-20">
        <div className="max-w-screen-xl mx-auto px-4 py-6 sm:px-8 sm:py-8 lg:px-20 lg:py-10">{children}</div>
      </main>
      <AppFooter />
    </div>
  )
}
