"use client"

import Link from "next/link"
import { Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppNavbar } from "@/app/components/layouts/app-navbar"
import { AppFooter } from "@/app/components/layouts/app-footer"
import { useAuthStore } from "@/app/lib/stores/auth.store"
import { routes } from "@/app/config/routes"

export default function TimeoutPage() {
  const { user } = useAuthStore()

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <AppNavbar />
      <main className="flex-1 flex items-center justify-center pt-20 pb-20">
        <div className="text-center max-w-lg px-4">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
              <Timer className="h-12 w-12 text-red-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#111827] mb-4">Timeout!</h1>
          <p className="text-[#6B7280] text-base leading-relaxed mb-8">
            Dear{" "}
            <span className="font-semibold text-[#374151]">{user?.name}</span>, Your exam
            time has been finished. Thank you for participating.
          </p>
          <Link href={routes.candidate.dashboard}>
            <Button className="bg-[#6C3AE8] hover:bg-[#5B2FD4] text-white h-12 px-8">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </main>
      <AppFooter />
    </div>
  )
}
