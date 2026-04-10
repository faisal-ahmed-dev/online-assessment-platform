import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/app/components/layouts/page-header"
import { Button } from "@/components/ui/button"
import { routes } from "@/app/config/routes"
import { EmployerExamList } from "./list"

export const metadata: Metadata = {
  title: "Dashboard — Employer | Akij Resource",
}

export default function EmployerDashboardPage() {
  return (
    <>
      <PageHeader
        title="Online Tests"
        action={
          <Link href={routes.employer.exams.create}>
            <Button className="bg-[#6C3AE8] hover:bg-[#5B2FD4] text-white h-12 px-6">
              Create Online Test
            </Button>
          </Link>
        }
      />
      <EmployerExamList />
    </>
  )
}
