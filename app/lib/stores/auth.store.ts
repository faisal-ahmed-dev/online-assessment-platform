"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { UserModel } from "@/app/lib/models/user"
import { AUTH_STORAGE_KEY } from "@/app/config/constants"
import { cookieManager } from "@/app/lib/infrastructure/cookie-manager"

interface AuthState {
  user: Nullable<UserModel>
  isAuthenticated: boolean
  login: (user: UserModel) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => {
        set({ user, isAuthenticated: true })
        cookieManager.setAuthRole(user.role)
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
        cookieManager.clearAuth()
      },
    }),
    { name: AUTH_STORAGE_KEY },
  ),
)
