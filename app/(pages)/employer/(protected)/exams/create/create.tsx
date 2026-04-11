"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MultiStepIndicator } from "@/app/components/exam/multi-step-indicator"
import { StepBasicInfo } from "@/app/components/exam/step-basic-info"
import { StepQuestionSets } from "@/app/components/exam/step-question-sets"
import { BasicInfoReview } from "@/app/components/exam/basic-info-review"
import { useMultiStepForm } from "@/app/lib/hooks/use-multi-step-form"
import { useExams } from "@/app/lib/hooks/use-exams"
import { generateId } from "@/app/lib/utils/generate-id"
import { ExamStatus } from "@/app/config/enums"
import { routes } from "@/app/config/routes"
import { Button } from "@/components/ui/button"

const STEPS = ["Basic Info", "Questions"]

export function CreateExam() {
  const router = useRouter()
  const { currentStep, goNext, goBack, basicInfo, questions, resetDraft } =
    useMultiStepForm()
  const { createExam } = useExams()
  const [reviewingBasicInfo, setReviewingBasicInfo] = useState(false)

  const durationMinutes =
    basicInfo
      ? Math.max(
          0,
          Math.round(
            (new Date(basicInfo.endTime).getTime() -
              new Date(basicInfo.startTime).getTime()) /
              60000,
          ),
        )
      : 0

  const handleSubmit = () => {
    if (!basicInfo) return
    createExam.mutate(
      {
        id: generateId(),
        ...basicInfo,
        durationMinutes,
        questionSetIds: questions.map((q) => q.id),
        status: ExamStatus.Upcoming,
      },
      {
        onSuccess: () => {
          resetDraft()
          router.push(routes.employer.dashboard)
        },
      },
    )
  }

  const handleBackFromQuestions = () => {
    setReviewingBasicInfo(true)
    goBack()
  }

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
        <p className="text-xl font-semibold text-[#334155] mb-4">Manage Online Test</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 justify-between">
          <MultiStepIndicator steps={STEPS} currentStep={currentStep} />
          <Button
            variant="outline"
            className="border-[#E5E7EB] text-[#334155] font-semibold h-10 px-5 rounded-xl self-start sm:self-auto"
            onClick={() => router.push(routes.employer.dashboard)}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Step content — centered */}
      <div className="max-w-[954px] mx-auto w-full">
        {currentStep === 1 && !reviewingBasicInfo && (
          <StepBasicInfo
            onNext={() => setReviewingBasicInfo(true)}
            onCancel={() => router.push(routes.employer.dashboard)}
          />
        )}
        {currentStep === 1 && reviewingBasicInfo && basicInfo && (
          <BasicInfoReview
            basicInfo={basicInfo}
            durationMinutes={durationMinutes}
            onEdit={() => setReviewingBasicInfo(false)}
            onNext={() => {
              setReviewingBasicInfo(false)
              goNext()
            }}
            onCancel={() => router.push(routes.employer.dashboard)}
          />
        )}
        {currentStep === 2 && (
          <StepQuestionSets
            onBack={handleBackFromQuestions}
            onSubmit={handleSubmit}
            isSubmitting={createExam.isPending}
          />
        )}
      </div>
    </div>
  )
}
