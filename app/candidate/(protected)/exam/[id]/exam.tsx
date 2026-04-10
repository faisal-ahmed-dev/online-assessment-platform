"use client"

import { useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppNavbar } from "@/app/components/layouts/app-navbar"
import { AppFooter } from "@/app/components/layouts/app-footer"
import { ExamTimer } from "@/app/components/exam/exam-timer"
import { QuestionRenderer } from "@/app/components/exam/question-renderer"
import { QuestionNavigator } from "@/app/components/exam/question-navigator"
import { BehaviorWarningToast } from "@/app/components/exam/behavior-warning-toast"
import { ConfirmDialog } from "@/app/components/common/confirm-dialog"
import { useExamById, useExamQuestions } from "@/app/lib/hooks/use-exams"
import { useExamSessionStore } from "@/app/lib/stores/exam-session.store"
import { useAuthStore } from "@/app/lib/stores/auth.store"
import { useBehaviorTracker } from "@/app/lib/hooks/use-behavior-tracker"
import { BehaviorEventType } from "@/app/config/enums"
import { routes } from "@/app/config/routes"

export function ExamScreen({ examId }: { examId: string }) {
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

  const { data: exam } = useExamById(examId)
  const { data: questions = [] } = useExamQuestions(exam?.questionSetIds ?? [])

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

  const handleManualSubmit = () => {
    submitSession()
    clearSession()
    router.push(routes.candidate.examCompleted(examId))
  }

  if (!exam || !session || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6]">
        <p className="text-[#6B7280]">Loading exam...</p>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const currentAnswer =
    session.answers.find((a) => a.questionId === currentQuestion?.id)?.answer ?? null
  const answeredIds = session.answers.map((a) => a.questionId)
  const isLast = currentQuestionIndex === questions.length - 1

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <AppNavbar
        rightSlot={
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#374151] font-medium">
              Question ({currentQuestionIndex + 1}/{questions.length})
            </span>
            <ExamTimer
              durationSeconds={exam.durationMinutes * 60}
              startedAt={session.startedAt}
              onExpire={handleExpire}
            />
          </div>
        }
      />

      <BehaviorWarningToast events={session.behaviorEvents} />

      <main className="flex-1 pt-24 pb-8">
        <div className="max-w-screen-xl mx-auto px-20">
          <div className="flex gap-6">
            {/* Sidebar navigator */}
            <div className="w-52 shrink-0">
              <QuestionNavigator
                totalQuestions={questions.length}
                currentIndex={currentQuestionIndex}
                answeredIds={answeredIds}
                questionIds={questions.map((q) => q.id)}
                onSelect={goToQuestion}
              />
            </div>

            {/* Main question area */}
            <div className="flex-1 space-y-6">
              {currentQuestion && (
                <QuestionRenderer
                  question={currentQuestion}
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={questions.length}
                  answer={currentAnswer}
                  onAnswer={(answer) => setAnswer(currentQuestion.id, answer)}
                />
              )}

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="border-[#D1D5DB] text-[#374151] h-12 px-6"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>

                <div className="flex gap-3">
                  <ConfirmDialog
                    trigger={
                      <Button
                        variant="outline"
                        className="border-[#6C3AE8] text-[#6C3AE8] hover:bg-[#6C3AE8] hover:text-white h-12 px-6"
                      >
                        Submit Exam
                      </Button>
                    }
                    title="Submit Exam"
                    description={`You have answered ${answeredIds.length} of ${questions.length} questions. Are you sure you want to submit?`}
                    confirmLabel="Yes, Submit"
                    onConfirm={handleManualSubmit}
                  />
                  {!isLast && (
                    <Button
                      onClick={nextQuestion}
                      className="bg-[#6C3AE8] hover:bg-[#5B2FD4] text-white h-12 px-6"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
