"use client"

import { cn } from "@/lib/utils"

interface QuestionNavigatorProps {
  totalQuestions: number
  currentIndex: number
  answeredIds: string[]
  questionIds: string[]
  onSelect: (index: number) => void
}

export function QuestionNavigator({
  totalQuestions,
  currentIndex,
  answeredIds,
  questionIds,
  onSelect,
}: QuestionNavigatorProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
      <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
        Questions
      </p>
      <div className="grid grid-cols-8 sm:grid-cols-10 lg:grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const isAnswered = answeredIds.includes(questionIds[index])
          const isCurrent = index === currentIndex

          return (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={cn(
                "w-8 h-8 rounded-lg text-xs font-semibold transition-all",
                isCurrent &&
                  "bg-[#6C3AE8] text-white ring-2 ring-[#6C3AE8]/30",
                !isCurrent &&
                  isAnswered &&
                  "bg-green-100 text-green-700 border border-green-200",
                !isCurrent &&
                  !isAnswered &&
                  "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]",
              )}
            >
              {index + 1}
            </button>
          )
        })}
      </div>
      <div className="mt-4 space-y-1.5">
        <LegendItem color="bg-[#6C3AE8]" label="Current" />
        <LegendItem color="bg-green-100 border border-green-200" label="Answered" />
        <LegendItem color="bg-[#F3F4F6]" label="Not answered" />
      </div>
    </div>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded ${color}`} />
      <span className="text-xs text-[#9CA3AF]">{label}</span>
    </div>
  )
}
