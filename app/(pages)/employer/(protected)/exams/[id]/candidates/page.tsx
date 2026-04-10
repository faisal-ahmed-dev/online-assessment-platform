import type { Metadata } from "next"
import { PageHeader } from "@/app/components/layouts/page-header"
import { routes } from "@/app/config/routes"
import { CandidatesList } from "./list"

export const metadata: Metadata = {
  title: "Candidates — Employer | Akij Resource",
}

export default async function CandidatesPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <>
      <PageHeader title="Candidates" backHref={routes.employer.dashboard} />
      <CandidatesList examId={id} />
    </>
  )
}
