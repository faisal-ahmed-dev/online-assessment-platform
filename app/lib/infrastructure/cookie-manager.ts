import { AUTH_COOKIE_KEY } from "@/app/config/constants"

export const cookieManager = {
  setAuthRole(role: string): void {
    if (typeof document !== "undefined") {
      document.cookie = `${AUTH_COOKIE_KEY}=${role}; path=/; max-age=${60 * 60 * 24}`
    }
  },
  clearAuth(): void {
    if (typeof document !== "undefined") {
      document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0`
    }
  },
}
