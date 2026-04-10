import type { Metadata } from "next"
import { CandidateSignIn } from "./signin"

export const metadata: Metadata = {
  title: "Candidate Sign In — Akij Resource",
}

export default function CandidateSignInPage() {
  return <CandidateSignIn />
}
