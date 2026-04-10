"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useExamStore } from "@/app/lib/stores/exam.store"
import { ExamModel } from "@/app/lib/models/exam"
import { QUERY_KEYS } from "@/app/lib/constants/query-keys"
import { examService } from "@/app/lib/services"

export function useExams() {
  const { exams, setExams } = useExamStore()
  const qc = useQueryClient()

  useEffect(() => {
    if (exams.length === 0) {
      setExams(examService.getSeedData())
    }
  }, [])

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.exams.all,
    queryFn: (): Promise<ExamModel[]> => examService.listAll(),
    initialData: exams,
    staleTime: 0,
  })

  const createExam = useMutation({
    mutationFn: (exam: ExamModel) => examService.create(exam),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.exams.all }),
  })

  return { exams: data ?? [], isLoading, createExam }
}

export function useExamById(examId: string) {
  const { exams } = useExamStore()
  return useQuery({
    queryKey: QUERY_KEYS.exams.byId(examId),
    queryFn: (): Promise<ExamModel | undefined> => examService.getById(examId),
    initialData: exams.find((e) => e.id === examId),
  })
}

export function useExamQuestions(questionSetIds: string[]) {
  return useQuery({
    queryKey: QUERY_KEYS.exams.questions(questionSetIds),
    queryFn: () => examService.getQuestions(questionSetIds),
    enabled: questionSetIds.length > 0,
  })
}
