"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/lib/stores/auth.store"
import { LoginSchema } from "@/app/lib/validators/auth.schema"
import { UserRole } from "@/app/config/enums"
import { authService } from "@/app/lib/services"

export function useAuth(role: UserRole) {
  const { login, logout, user, isAuthenticated } = useAuthStore()
  const router = useRouter()

  const signIn = useCallback(
    async (data: LoginSchema): Promise<{ success: boolean; error?: string }> => {
      const result = await authService.signIn(data, role)
      if (result.success && result.user) {
        login(result.user)
        router.push(result.redirectTo!)
      }
      return { success: result.success, error: result.error }
    },
    [role, login, router],
  )

  const signOut = useCallback(() => {
    logout()
    router.push(authService.getSignOutRedirect(role))
  }, [role, logout, router])

  return { signIn, signOut, user, isAuthenticated }
}
