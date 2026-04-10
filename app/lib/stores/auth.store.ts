"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { UserModel } from "@/app/lib/models/user"
import { AUTH_COOKIE_KEY, AUTH_STORAGE_KEY } from "@/app/config/constants"

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
        if (typeof document !== "undefined") {
          document.cookie = `${AUTH_COOKIE_KEY}=${user.role}; path=/; max-age=${60 * 60 * 24}`
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
        if (typeof document !== "undefined") {
          document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0`
        }
      },
    }),
    { name: AUTH_STORAGE_KEY },
  ),
)
