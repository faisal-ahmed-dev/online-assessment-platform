"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useExamStore } from "@/app/lib/stores/exam.store"
import { MOCK_EXAMS, MOCK_QUESTIONS } from "@/app/data/mock-exams"
import { ExamModel } from "@/app/lib/models/exam"
import { QuestionModel } from "@/app/lib/models/question"

const EXAMS_QUERY_KEY = ["exams"] as const
const QUESTIONS_QUERY_KEY = (ids: string[]) => ["questions", ids] as const

export function useExams() {
  const { exams, setExams, addExam } = useExamStore()
  const qc = useQueryClient()

  useEffect(() => {
    if (exams.length === 0) {
      setExams(MOCK_EXAMS)
    }
  }, [])

  const { data, isLoading } = useQuery({
    queryKey: EXAMS_QUERY_KEY,
    queryFn: async (): Promise<ExamModel[]> => {
      await new Promise((r) => setTimeout(r, 400))
      return useExamStore.getState().exams
    },
    initialData: exams,
    staleTime: 0,
  })

  const createExam = useMutation({
    mutationFn: async (exam: ExamModel) => {
      await new Promise((r) => setTimeout(r, 300))
      addExam(exam)
      return exam
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: EXAMS_QUERY_KEY }),
  })

  return { exams: data ?? [], isLoading, createExam }
}

export function useExamById(examId: string) {
  const { exams } = useExamStore()
  return useQuery({
    queryKey: ["exam", examId],
    queryFn: async (): Promise<ExamModel | undefined> => {
      await new Promise((r) => setTimeout(r, 200))
      return useExamStore.getState().exams.find((e) => e.id === examId)
    },
    initialData: exams.find((e) => e.id === examId),
  })
}

export function useExamQuestions(questionSetIds: string[]) {
  return useQuery({
    queryKey: QUESTIONS_QUERY_KEY(questionSetIds),
    queryFn: async (): Promise<QuestionModel[]> => {
      await new Promise((r) => setTimeout(r, 200))
      return MOCK_QUESTIONS.filter((q) => questionSetIds.includes(q.id))
    },
    enabled: questionSetIds.length > 0,
  })
}
