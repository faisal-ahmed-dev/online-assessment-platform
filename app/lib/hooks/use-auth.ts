"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/lib/stores/auth.store"
import { LoginSchema } from "@/app/lib/validators/auth.schema"
import { MOCK_EMPLOYER, MOCK_CANDIDATE } from "@/app/data/mock-users"
import {
  MOCK_EMPLOYER_CREDENTIALS,
  MOCK_CANDIDATE_CREDENTIALS,
} from "@/app/config/constants"
import { routes } from "@/app/config/routes"
import { UserRole } from "@/app/config/enums"

export function useAuth(role: UserRole) {
  const { login, logout, user, isAuthenticated } = useAuthStore()
  const router = useRouter()

  const signIn = useCallback(
    async (data: LoginSchema): Promise<{ success: boolean; error?: string }> => {
      const credentials =
        role === UserRole.Employer
          ? MOCK_EMPLOYER_CREDENTIALS
          : MOCK_CANDIDATE_CREDENTIALS
      const mockUser =
        role === UserRole.Employer ? MOCK_EMPLOYER : MOCK_CANDIDATE

      if (
        data.email === credentials.email &&
        data.password === credentials.password
      ) {
        login(mockUser)
        router.push(
          role === UserRole.Employer
            ? routes.employer.dashboard
            : routes.candidate.dashboard,
        )
        return { success: true }
      }

      return { success: false, error: "Invalid email or password" }
    },
    [role, login, router],
  )

  const signOut = useCallback(() => {
    logout()
    router.push(
      role === UserRole.Employer
        ? routes.auth.employerSignIn
        : routes.auth.candidateSignIn,
    )
  }, [role, logout, router])

  return { signIn, signOut, user, isAuthenticated }
}
