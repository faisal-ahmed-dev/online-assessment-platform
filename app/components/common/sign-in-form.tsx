"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { loginSchema, LoginSchema } from "@/app/lib/validators/auth.schema"
import { useAuth } from "@/app/lib/hooks/use-auth"
import { UserRole } from "@/app/config/enums"
import { AppNavbar } from "@/app/components/layouts/app-navbar"
import { AppFooter } from "@/app/components/layouts/app-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField } from "./form-field"

interface SignInFormProps {
  role: UserRole
  demoCredentials: { email: string; password: string }
}

export function SignInForm({ role, demoCredentials }: SignInFormProps) {
  const { signIn } = useAuth(role)
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true)
    setServerError("")
    const result = await signIn(data)
    if (!result.success) {
      setServerError(result.error ?? "Login failed")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <AppNavbar />
      <main className="flex-1 flex items-center justify-center pt-20 pb-20 px-4">
        <div className="w-full max-w-[571px]">
          <h1 className="text-2xl font-semibold text-[#111827] text-center mb-6">
            Sign In
          </h1>
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                label="Email"
                error={errors.email?.message}
              >
                <Input
                  type="email"
                  placeholder="Your primary email address"
                  className="h-[52px] border-[#D1D5DB] text-sm"
                  {...register("email")}
                />
              </FormField>

              <FormField
                label="Password"
                error={errors.password?.message}
              >
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-[52px] border-[#D1D5DB] text-sm pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <button
                    type="button"
                    className="text-xs text-[#6C3AE8] hover:underline"
                  >
                    Forget Password?
                  </button>
                </div>
              </FormField>

              {serverError && (
                <p className="text-red-500 text-sm text-center">{serverError}</p>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-[#6C3AE8] hover:bg-[#5B2FD4] text-white text-sm font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Submit"}
              </Button>
            </form>
            <p className="text-center text-xs text-[#9CA3AF] mt-4">
              Demo:{" "}
              <span className="font-mono">{demoCredentials.email}</span> /{" "}
              <span className="font-mono">{demoCredentials.password}</span>
            </p>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  )
}
