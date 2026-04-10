"use client"

import { create } from "zustand"
import { ExamModel } from "@/app/lib/models/exam"
import { QuestionModel } from "@/app/lib/models/question"
import { ExamBasicInfoSchema } from "@/app/lib/validators/exam.schema"

interface ExamStoreState {
  // Multi-step form draft
  currentStep: 1 | 2
  basicInfo: Nullable<ExamBasicInfoSchema>
  questions: QuestionModel[]
  setStep: (step: 1 | 2) => void
  setBasicInfo: (data: ExamBasicInfoSchema) => void
  addQuestion: (q: QuestionModel) => void
  updateQuestion: (id: string, q: Partial<QuestionModel>) => void
  deleteQuestion: (id: string) => void
  resetDraft: () => void
  // In-memory exam list
  exams: ExamModel[]
  setExams: (exams: ExamModel[]) => void
  addExam: (exam: ExamModel) => void
}

export const useExamStore = create<ExamStoreState>()((set) => ({
  currentStep: 1,
  basicInfo: null,
  questions: [],
  exams: [],
  setStep: (step) => set({ currentStep: step }),
  setBasicInfo: (data) => set({ basicInfo: data }),
  addQuestion: (q) => set((s) => ({ questions: [...s.questions, q] })),
  updateQuestion: (id, q) =>
    set((s) => ({
      questions: s.questions.map((item) =>
        item.id === id ? { ...item, ...q } : item,
      ),
    })),
  deleteQuestion: (id) =>
    set((s) => ({ questions: s.questions.filter((q) => q.id !== id) })),
  resetDraft: () => set({ currentStep: 1, basicInfo: null, questions: [] }),
  setExams: (exams) => set({ exams }),
  addExam: (exam) => set((s) => ({ exams: [exam, ...s.exams] })),
}))
