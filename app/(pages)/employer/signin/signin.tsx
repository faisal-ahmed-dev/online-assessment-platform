"use client"

import { UserRole } from "@/app/config/enums"
import { MOCK_EMPLOYER_CREDENTIALS } from "@/app/config/constants"
import { SignInForm } from "@/app/components/common/sign-in-form"

export function EmployerSignIn() {
  return (
    <SignInForm
      role={UserRole.Employer}
      demoCredentials={MOCK_EMPLOYER_CREDENTIALS}
    />
  )
}
