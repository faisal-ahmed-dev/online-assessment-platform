"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
  ExamSessionModel,
  ExamAnswerModel,
} from "@/app/lib/models/exam-session"
import { EXAM_SESSION_STORAGE_KEY } from "@/app/config/constants"

interface ExamSessionState {
  session: Nullable<ExamSessionModel>
  currentQuestionIndex: number
  startSession: (examId: string, candidateId: string) => void
  setAnswer: (questionId: string, answer: string | string[]) => void
  nextQuestion: () => void
  prevQuestion: () => void
  goToQuestion: (index: number) => void
  recordBehaviorEvent: (type: string) => void
  submitSession: () => void
  setTimeout: () => void
  clearSession: () => void
}

export const useExamSessionStore = create<ExamSessionState>()(
  persist(
    (set) => ({
      session: null,
      currentQuestionIndex: 0,

      startSession: (examId, candidateId) =>
        set({
          session: {
            examId,
            candidateId,
            startedAt: Date.now(),
            answers: [],
            behaviorEvents: [],
            isSubmitted: false,
            isTimeout: false,
          },
          currentQuestionIndex: 0,
        }),

      setAnswer: (questionId, answer) =>
        set((s) => {
          if (!s.session) return s
          const answers = [...s.session.answers]
          const idx = answers.findIndex((a) => a.questionId === questionId)
          const entry: ExamAnswerModel = { questionId, answer }
          if (idx >= 0) answers[idx] = entry
          else answers.push(entry)
          return { session: { ...s.session, answers } }
        }),

      nextQuestion: () =>
        set((s) => ({ currentQuestionIndex: s.currentQuestionIndex + 1 })),

      prevQuestion: () =>
        set((s) => ({
          currentQuestionIndex: Math.max(0, s.currentQuestionIndex - 1),
        })),

      goToQuestion: (index) => set({ currentQuestionIndex: index }),

      recordBehaviorEvent: (type) =>
        set((s) => {
          if (!s.session) return s
          const events = [...s.session.behaviorEvents]
          const idx = events.findIndex((e) => e.type === type)
          if (idx >= 0) {
            events[idx] = {
              ...events[idx],
              count: events[idx].count + 1,
              timestamp: Date.now(),
            }
          } else {
            events.push({ type, timestamp: Date.now(), count: 1 })
          }
          return { session: { ...s.session, behaviorEvents: events } }
        }),

      submitSession: () =>
        set((s) =>
          s.session
            ? { session: { ...s.session, isSubmitted: true } }
            : s,
        ),

      setTimeout: () =>
        set((s) =>
          s.session
            ? { session: { ...s.session, isTimeout: true, isSubmitted: true } }
            : s,
        ),

      clearSession: () => set({ session: null, currentQuestionIndex: 0 }),
    }),
    { name: EXAM_SESSION_STORAGE_KEY },
  ),
)
