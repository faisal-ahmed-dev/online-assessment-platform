"use client"

import { useQuery } from "@tanstack/react-query"
import { MOCK_CANDIDATES } from "@/app/data/mock-exams"
import { CandidateModel } from "@/app/lib/models/candidate"

export function useCandidates(examId: string) {
  return useQuery({
    queryKey: ["candidates", examId],
    queryFn: async (): Promise<CandidateModel[]> => {
      await new Promise((r) => setTimeout(r, 400))
      return MOCK_CANDIDATES.filter((c) => c.examId === examId)
    },
    enabled: !!examId,
  })
}
