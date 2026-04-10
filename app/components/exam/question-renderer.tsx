"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { QuestionModel } from "@/app/lib/models/question"
import { QuestionType } from "@/app/config/enums"
import { cn } from "@/lib/utils"

interface AnswerRendererProps {
  options: string[]
  answer: string | string[] | null
  onAnswer: (answer: string | string[]) => void
}

function RadioAnswerRenderer({ options, answer, onAnswer }: AnswerRendererProps) {
  return (
    <RadioGroup
      value={typeof answer === "string" ? answer : ""}
      onValueChange={onAnswer}
      className="space-y-3"
    >
      {options.map((option, i) => (
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
  )
}

function CheckboxAnswerRenderer({ options, answer, onAnswer }: AnswerRendererProps) {
  const selectedValues = Array.isArray(answer) ? answer : answer ? [answer] : []

  const toggle = (option: string) => {
    const current = Array.isArray(answer) ? answer : []
    if (current.includes(option)) {
      onAnswer(current.filter((a) => a !== option))
    } else {
      onAnswer([...current, option])
    }
  }

  return (
    <div className="space-y-3">
      {options.map((option, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors",
            selectedValues.includes(option)
              ? "border-[#6C3AE8] bg-[#6C3AE8]/5"
              : "border-[#E5E7EB] hover:border-[#6C3AE8]/40",
          )}
          onClick={() => toggle(option)}
        >
          <Checkbox
            id={`opt-${i}`}
            checked={selectedValues.includes(option)}
            onCheckedChange={() => toggle(option)}
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
  )
}

function TextAnswerRenderer({ answer, onAnswer }: AnswerRendererProps) {
  return (
    <Textarea
      placeholder="Write your answer here..."
      className="min-h-40 border-[#D1D5DB] text-sm resize-none"
      value={typeof answer === "string" ? answer : ""}
      onChange={(e) => onAnswer(e.target.value)}
    />
  )
}

const QUESTION_RENDERERS: Record<
  QuestionType,
  React.ComponentType<AnswerRendererProps>
> = {
  [QuestionType.Radio]: RadioAnswerRenderer,
  [QuestionType.Checkbox]: CheckboxAnswerRenderer,
  [QuestionType.Text]: TextAnswerRenderer,
}

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
  const AnswerComponent = QUESTION_RENDERERS[question.type]

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-8">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs text-[#9CA3AF] font-medium">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="text-xs text-[#9CA3AF]">•</span>
        <span className="text-xs text-[#9CA3AF]">{question.points} pt</span>
      </div>

      <p className="text-[#111827] font-medium text-base leading-relaxed mb-6">
        Q{questionNumber}. {question.title}
      </p>

      <AnswerComponent
        options={question.options}
        answer={answer}
        onAnswer={onAnswer}
      />
    </div>
  )
}
