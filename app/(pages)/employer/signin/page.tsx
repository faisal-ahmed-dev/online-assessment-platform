import type { Metadata } from "next"
import { EmployerSignIn } from "./signin"

export const metadata: Metadata = {
  title: "Employer Sign In — Akij Resource",
}

export default function EmployerSignInPage() {
  return <EmployerSignIn />
}
