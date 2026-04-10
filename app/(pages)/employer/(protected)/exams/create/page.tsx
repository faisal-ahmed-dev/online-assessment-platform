import type { Metadata } from "next"
import { PageHeader } from "@/app/components/layouts/page-header"
import { routes } from "@/app/config/routes"
import { CreateExam } from "./create"

export const metadata: Metadata = {
  title: "Create Online Test — Employer | Akij Resource",
}

export default function CreateExamPage() {
  return (
    <>
      <PageHeader title="Manage Online Test" backHref={routes.employer.dashboard} />
      <CreateExam />
    </>
  )
}
