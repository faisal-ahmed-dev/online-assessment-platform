"use client"

import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/app/lib/constants/query-keys"
import { candidateService } from "@/app/lib/services"

export function useCandidates(examId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.candidates.byExam(examId),
    queryFn: () => candidateService.getByExam(examId),
    enabled: !!examId,
  })
}
