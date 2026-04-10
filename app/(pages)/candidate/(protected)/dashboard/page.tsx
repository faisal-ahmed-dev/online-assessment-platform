import type { Metadata } from "next"
import { PageHeader } from "@/app/components/layouts/page-header"
import { CandidateExamList } from "./list"

export const metadata: Metadata = {
  title: "Dashboard — Candidate | Akij Resource",
}

export default function CandidateDashboardPage() {
  return (
    <>
      <PageHeader title="Online Tests" />
      <CandidateExamList />
    </>
  )
}
