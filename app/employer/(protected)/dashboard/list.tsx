"use client"

import { useRouter } from "next/navigation"
import { ExamList } from "@/app/components/exam/exam-list"
import { routes } from "@/app/config/routes"

export function EmployerExamList() {
  const router = useRouter()

  return (
    <ExamList
      variant="employer"
      onCardAction={(examId) =>
        router.push(routes.employer.exams.candidates(examId))
      }
      emptyMessage="No exams yet. Create your first online test."
    />
  )
}
