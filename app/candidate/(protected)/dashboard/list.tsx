"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ExamCard } from "@/app/components/exam/exam-card"
import { ExamListSkeleton } from "@/app/components/common/loading-skeleton"
import { ExamCardSkeleton } from "@/app/components/common/exam-card-fallback"
import { EmptyState } from "@/app/components/common/empty-state"
import { useExams } from "@/app/lib/hooks/use-exams"
import { useAuthStore } from "@/app/lib/stores/auth.store"
import { useExamSessionStore } from "@/app/lib/stores/exam-session.store"
import { routes } from "@/app/config/routes"

export function CandidateExamList() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { session, startSession } = useExamSessionStore()
  const { exams, isLoading } = useExams()
  const [search, setSearch] = useState("")

  const filtered = exams.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()),
  )

  const handleStart = (examId: string) => {
    if (!user) return
    if (!session || session.examId !== examId) {
      startSession(examId, user.id)
    }
    router.push(routes.candidate.exam(examId))
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-[621px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
          <Input
            placeholder="Search by exam title"
            className="pl-10 h-12 border-[#D1D5DB] bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <ExamListSkeleton loading={isLoading}>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ExamCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState message={search ? `No exams found for "${search}"` : "No exams available."} />
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {filtered.map((exam) => (
              <ExamCard
                key={exam.id}
                variant="candidate"
                exam={exam}
                onStart={() => handleStart(exam.id)}
              />
            ))}
          </div>
        )}
      </ExamListSkeleton>
    </div>
  )
}
