"use client"

import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/lib/stores/auth.store"
import { useExamSessionStore } from "@/app/lib/stores/exam-session.store"
import { ExamList } from "@/app/components/exam/exam-list"
import { routes } from "@/app/config/routes"

export function CandidateExamList() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { session, startSession } = useExamSessionStore()

  const handleAction = (examId: string) => {
    if (!user) return
    if (!session || session.examId !== examId) {
      startSession(examId, user.id)
    }
    router.push(routes.candidate.exam(examId))
  }

  return (
    <ExamList
      variant="candidate"
      onCardAction={handleAction}
      emptyMessage="No exams available."
    />
  )
}
