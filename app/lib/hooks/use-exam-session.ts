"use client"

import { useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useExamById, useExamQuestions } from "@/app/lib/hooks/use-exams"
import { useExamSessionStore } from "@/app/lib/stores/exam-session.store"
import { useAuthStore } from "@/app/lib/stores/auth.store"
import { useBehaviorTracker } from "@/app/lib/hooks/use-behavior-tracker"
import { BehaviorEventType } from "@/app/config/enums"
import { routes } from "@/app/config/routes"

export function useExamSession(examId: string) {
  const router = useRouter()
  const { user } = useAuthStore()
  const {
    session,
    currentQuestionIndex,
    startSession,
    setAnswer,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    recordBehaviorEvent,
    submitSession,
    setTimeout: setSessionTimeout,
    clearSession,
  } = useExamSessionStore()

  const { data: exam, isLoading: examLoading } = useExamById(examId)
  const { data: questions = [], isLoading: questionsLoading } =
    useExamQuestions(exam?.questionSetIds ?? [])

  const isLoading = examLoading || questionsLoading || !session

  useEffect(() => {
    if (user && exam && (!session || session.examId !== examId)) {
      startSession(examId, user.id)
    }
  }, [user, exam, examId])

  const handleBehaviorEvent = useCallback(
    (type: BehaviorEventType) => recordBehaviorEvent(type),
    [recordBehaviorEvent],
  )

  const { requestFullscreen } = useBehaviorTracker({
    isActive: !!session && !session.isSubmitted,
    onEvent: handleBehaviorEvent,
  })

  useEffect(() => {
    requestFullscreen()
  }, [])

  const handleExpire = useCallback(() => {
    setSessionTimeout()
    clearSession()
    router.push(routes.candidate.examTimeout(examId))
  }, [examId, router])

  const handleManualSubmit = useCallback(() => {
    submitSession()
    clearSession()
    router.push(routes.candidate.examCompleted(examId))
  }, [examId, router])

  const currentQuestion = questions[currentQuestionIndex]
  const currentAnswer =
    session?.answers.find((a) => a.questionId === currentQuestion?.id)
      ?.answer ?? null
  const answeredIds = session?.answers.map((a) => a.questionId) ?? []
  const isLast = currentQuestionIndex === questions.length - 1

  return {
    exam,
    questions,
    session,
    isLoading,
    currentQuestion,
    currentAnswer,
    answeredIds,
    isLast,
    currentQuestionIndex,
    setAnswer,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    handleExpire,
    handleManualSubmit,
  }
}
