import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface MultiStepIndicatorProps {
  steps: string[]
  currentStep: number
}

export function MultiStepIndicator({
  steps,
  currentStep,
}: MultiStepIndicatorProps) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((label, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isActive = stepNumber === currentStep

        return (
          <div key={label} className="flex items-center">
            {/* Step */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all",
                  isCompleted &&
                    "bg-[#6C3AE8] text-white",
                  isActive &&
                    "bg-[#6C3AE8] text-white ring-4 ring-[#6C3AE8]/20",
                  !isCompleted &&
                    !isActive &&
                    "bg-[#E5E7EB] text-[#9CA3AF]",
                )}
              >
                {isCompleted ? <Check className="h-3 w-3" /> : stepNumber}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  isActive ? "text-[#6C3AE8]" : "text-[#9CA3AF]",
                  isCompleted && "text-[#374151]",
                )}
              >
                {label}
              </span>
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-px w-16 mx-3 transition-all",
                  isCompleted ? "bg-[#6C3AE8]" : "bg-[#E5E7EB]",
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
