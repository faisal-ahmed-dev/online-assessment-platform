"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { QuestionModel } from "@/app/lib/models/question"
import { QuestionType } from "@/app/config/enums"
import { cn } from "@/lib/utils"

interface QuestionRendererProps {
  question: QuestionModel
  questionNumber: number
  totalQuestions: number
  answer: string | string[] | null
  onAnswer: (answer: string | string[]) => void
}

export function QuestionRenderer({
  question,
  questionNumber,
  totalQuestions,
  answer,
  onAnswer,
}: QuestionRendererProps) {
  const selectedValues = Array.isArray(answer) ? answer : answer ? [answer] : []

  const toggleCheckbox = (option: string) => {
    const current = Array.isArray(answer) ? answer : []
    if (current.includes(option)) {
      onAnswer(current.filter((a) => a !== option))
    } else {
      onAnswer([...current, option])
    }
  }

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-8">
      {/* Question header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs text-[#9CA3AF] font-medium">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="text-xs text-[#9CA3AF]">•</span>
        <span className="text-xs text-[#9CA3AF]">{question.points} pt</span>
      </div>

      {/* Question text */}
      <p className="text-[#111827] font-medium text-base leading-relaxed mb-6">
        Q{questionNumber}. {question.title}
      </p>

      {/* Answer area */}
      {question.type === QuestionType.Radio && (
        <RadioGroup
          value={typeof answer === "string" ? answer : ""}
          onValueChange={onAnswer}
          className="space-y-3"
        >
          {question.options.map((option, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors",
                typeof answer === "string" && answer === option
                  ? "border-[#6C3AE8] bg-[#6C3AE8]/5"
                  : "border-[#E5E7EB] hover:border-[#6C3AE8]/40",
              )}
            >
              <RadioGroupItem value={option} id={`opt-${i}`} />
              <Label
                htmlFor={`opt-${i}`}
                className="flex-1 cursor-pointer text-sm text-[#374151]"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}

      {question.type === QuestionType.Checkbox && (
        <div className="space-y-3">
          {question.options.map((option, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors",
                selectedValues.includes(option)
                  ? "border-[#6C3AE8] bg-[#6C3AE8]/5"
                  : "border-[#E5E7EB] hover:border-[#6C3AE8]/40",
              )}
              onClick={() => toggleCheckbox(option)}
            >
              <Checkbox
                id={`opt-${i}`}
                checked={selectedValues.includes(option)}
                onCheckedChange={() => toggleCheckbox(option)}
                className="data-[state=checked]:bg-[#6C3AE8] data-[state=checked]:border-[#6C3AE8]"
              />
              <Label
                htmlFor={`opt-${i}`}
                className="flex-1 cursor-pointer text-sm text-[#374151]"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      )}

      {question.type === QuestionType.Text && (
        <Textarea
          placeholder="Write your answer here..."
          className="min-h-40 border-[#D1D5DB] text-sm resize-none"
          value={typeof answer === "string" ? answer : ""}
          onChange={(e) => onAnswer(e.target.value)}
        />
      )}
    </div>
  )
}
