"use client"

import { UserRole } from "@/app/config/enums"
import { MOCK_CANDIDATE_CREDENTIALS } from "@/app/config/constants"
import { SignInForm } from "@/app/components/common/sign-in-form"

export function CandidateSignIn() {
  return (
    <SignInForm
      role={UserRole.Candidate}
      demoCredentials={MOCK_CANDIDATE_CREDENTIALS}
    />
  )
}
