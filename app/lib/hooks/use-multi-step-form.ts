"use client"

import { useExamStore } from "@/app/lib/stores/exam.store"

export function useMultiStepForm() {
  const { currentStep, setStep, basicInfo, questions, resetDraft } =
    useExamStore()

  const canAdvance = (): boolean => basicInfo !== null
  const goNext = () => {
    if (canAdvance()) setStep(2)
  }
  const goBack = () => setStep(1)

  return { currentStep, goNext, goBack, canAdvance, basicInfo, questions, resetDraft }
}
