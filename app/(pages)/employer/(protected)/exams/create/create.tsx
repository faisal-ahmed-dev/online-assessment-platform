"use client"

import { useRouter } from "next/navigation"
import { MultiStepIndicator } from "@/app/components/exam/multi-step-indicator"
import { StepBasicInfo } from "@/app/components/exam/step-basic-info"
import { StepQuestionSets } from "@/app/components/exam/step-question-sets"
import { useMultiStepForm } from "@/app/lib/hooks/use-multi-step-form"
import { useExams } from "@/app/lib/hooks/use-exams"
import { generateId } from "@/app/lib/utils/generate-id"
import { ExamStatus } from "@/app/config/enums"
import { routes } from "@/app/config/routes"

const STEPS = ["Basic Info", "Question Sets"]

export function CreateExam() {
  const router = useRouter()
  const { currentStep, goNext, goBack, basicInfo, questions, resetDraft } =
    useMultiStepForm()
  const { createExam } = useExams()

  const handleSubmit = () => {
    if (!basicInfo) return
    const durationMinutes = Math.max(
      0,
      Math.round(
        (new Date(basicInfo.endTime).getTime() -
          new Date(basicInfo.startTime).getTime()) /
          60000,
      ),
    )
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

  return (
    <div>
      <div className="mb-8">
        <MultiStepIndicator steps={STEPS} currentStep={currentStep} />
      </div>
      {currentStep === 1 && (
        <StepBasicInfo
          onNext={goNext}
          onCancel={() => router.push(routes.employer.dashboard)}
        />
      )}
      {currentStep === 2 && (
        <StepQuestionSets
          onBack={goBack}
          onSubmit={handleSubmit}
          isSubmitting={createExam.isPending}
        />
      )}
    </div>
  )
}
