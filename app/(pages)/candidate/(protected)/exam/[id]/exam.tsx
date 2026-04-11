"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppNavbar } from "@/app/components/layouts/app-navbar"
import { AppFooter } from "@/app/components/layouts/app-footer"
import { ExamTimer } from "@/app/components/exam/exam-timer"
import { QuestionRenderer } from "@/app/components/exam/question-renderer"
import { QuestionNavigator } from "@/app/components/exam/question-navigator"
import { BehaviorWarningToast } from "@/app/components/exam/behavior-warning-toast"
import { ConfirmDialog } from "@/app/components/common/confirm-dialog"
import { ExamScreenSkeleton } from "@/app/components/common/loading-skeleton"
import { ExamScreenFallback } from "@/app/components/common/exam-card-fallback"
import { useExamSession } from "@/app/lib/hooks/use-exam-session"

export function ExamScreen({ examId }: { examId: string }) {
  const {
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
  } = useExamSession(examId)

  return (
    <ExamScreenSkeleton loading={isLoading}>
      {isLoading ? (
        <ExamScreenFallback />
      ) : (
        <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
          <AppNavbar
            rightSlot={
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-xs sm:text-sm text-[#374151] font-medium">
                  Q {currentQuestionIndex + 1}/{questions.length}
                </span>
                <ExamTimer
                  durationSeconds={exam!.durationMinutes * 60}
                  startedAt={session!.startedAt}
                  onExpire={handleExpire}
                />
              </div>
            }
          />

          <BehaviorWarningToast events={session!.behaviorEvents} />

          <main className="flex-1 pt-24 pb-8">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-20">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-52 shrink-0">
                  <QuestionNavigator
                    totalQuestions={questions.length}
                    currentIndex={currentQuestionIndex}
                    answeredIds={answeredIds}
                    questionIds={questions.map((q) => q.id)}
                    onSelect={goToQuestion}
                  />
                </div>

                <div className="flex-1 space-y-6">
                  {currentQuestion && (
                    <QuestionRenderer
                      question={currentQuestion}
                      questionNumber={currentQuestionIndex + 1}
                      totalQuestions={questions.length}
                      answer={currentAnswer}
                      onAnswer={(answer) =>
                        setAnswer(currentQuestion.id, answer)
                      }
                    />
                  )}

                  <div className="flex items-center justify-between gap-2">
                    <Button
                      variant="outline"
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="border-[#D1D5DB] text-[#374151] h-10 sm:h-12 px-3 sm:px-6"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Previous</span>
                    </Button>

                    <div className="flex gap-2 sm:gap-3">
                      <ConfirmDialog
                        trigger={
                          <Button
                            variant="outline"
                            className="border-[#6C3AE8] text-[#6C3AE8] hover:bg-[#6C3AE8] hover:text-white h-10 sm:h-12 px-3 sm:px-6 text-sm"
                          >
                            Submit
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
                          className="bg-[#6C3AE8] hover:bg-[#5B2FD4] text-white h-10 sm:h-12 px-3 sm:px-6"
                        >
                          <span className="hidden sm:inline">Next</span>
                          <ChevronRight className="h-4 w-4 sm:ml-1" />
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
      )}
    </ExamScreenSkeleton>
  )
}
