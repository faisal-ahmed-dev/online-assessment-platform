"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { questionSchema, QuestionSchema } from "@/app/lib/validators/question.schema"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Plus } from "lucide-react"
import { RichTextEditor } from "@/app/components/common/rich-text-editor"
import { QuestionModel } from "@/app/lib/models/question"
import { QuestionType } from "@/app/config/enums"
import { generateId } from "@/app/lib/utils/generate-id"

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"]

const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  [QuestionType.Radio]: "MCQ",
  [QuestionType.Checkbox]: "Checkbox",
  [QuestionType.Text]: "Text",
}

interface QuestionModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (question: QuestionModel) => void
  defaultValues?: QuestionModel
  mode: "add" | "edit"
  questionNumber?: number
}

const EMPTY_OPTION = ""

export function QuestionModal({
  open,
  onClose,
  onSubmit,
  defaultValues,
  mode,
  questionNumber = 1,
}: QuestionModalProps) {
  const initOptions =
    defaultValues?.options && defaultValues.options.length >= 2
      ? defaultValues.options
      : [EMPTY_OPTION, EMPTY_OPTION]

  const [options, setOptions] = useState<string[]>(initOptions)
  const [resetKey, setResetKey] = useState(0)
  const [correctAnswerError, setCorrectAnswerError] = useState<string | null>(null)
  const [correctIndices, setCorrectIndices] = useState<Set<number>>(() => {
    if (!defaultValues?.correctAnswer) return new Set()
    return new Set(
      defaultValues.correctAnswer
        .split(",")
        .map(Number)
        .filter((n) => !isNaN(n)),
    )
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<QuestionSchema>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      type: defaultValues?.type ?? QuestionType.Radio,
      points: defaultValues?.points ?? 1,
      options: initOptions,
      correctAnswer: defaultValues?.correctAnswer ?? "",
    },
  })

  const questionType = watch("type")
  const isTextType = questionType === QuestionType.Text
  const isCheckbox = questionType === QuestionType.Checkbox

  const updateOption = (index: number, value: string) => {
    const next = options.map((o, i) => (i === index ? value : o))
    setOptions(next)
    setValue("options", next)
  }

  const addOption = () => {
    const next = [...options, EMPTY_OPTION]
    setOptions(next)
    setValue("options", next)
  }

  const removeOption = (index: number) => {
    const next = options.filter((_, i) => i !== index)
    setOptions(next)
    setValue("options", next)
    const updated = new Set<number>()
    correctIndices.forEach((ci) => {
      if (ci < index) updated.add(ci)
      else if (ci > index) updated.add(ci - 1)
    })
    setCorrectIndices(updated)
    setValue("correctAnswer", [...updated].join(","))
  }

  const toggleCorrect = (index: number) => {
    const updated = new Set(correctIndices)
    if (isCheckbox) {
      if (updated.has(index)) updated.delete(index)
      else updated.add(index)
    } else {
      updated.clear()
      if (!correctIndices.has(index)) updated.add(index)
    }
    setCorrectIndices(updated)
    setValue("correctAnswer", [...updated].join(","))
    if (updated.size > 0) setCorrectAnswerError(null)
  }

  const resetForm = () => {
    const defaultOpts = [EMPTY_OPTION, EMPTY_OPTION]
    setOptions(defaultOpts)
    setCorrectIndices(new Set())
    setCorrectAnswerError(null)
    setResetKey((k) => k + 1)
    reset({
      title: "",
      type: QuestionType.Radio,
      points: 1,
      options: defaultOpts,
      correctAnswer: "",
    })
  }

  const buildAndSubmit = (data: QuestionSchema, keepOpen: boolean) => {
    // Validate correct answer selection for choice-based questions
    if (!isTextType && correctIndices.size === 0) {
      setCorrectAnswerError("Please select at least one correct answer")
      return
    }
    setCorrectAnswerError(null)

    onSubmit({
      id: defaultValues?.id ?? generateId(),
      title: data.title,
      type: data.type,
      options: isTextType ? [] : options.filter((o) => o.replace(/<[^>]*>/g, "").trim()),
      correctAnswer: [...correctIndices].join(",") || null,
      points: data.points,
    })
    if (keepOpen) {
      resetForm()
    } else {
      resetForm()
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-3xl p-0 gap-0 max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">
          {mode === "add" ? "Add Question" : "Edit Question"}
        </DialogTitle>

        <form onSubmit={handleSubmit((data) => buildAndSubmit(data, false))}>
          {/* ── Modal header ── */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E5E7EB] flex-wrap sticky top-0 bg-white z-10">
            <div className="w-7 h-7 rounded-full bg-[#6C3AE8] text-white flex items-center justify-center text-sm font-semibold shrink-0">
              {questionNumber}
            </div>
            <span className="text-sm font-semibold text-[#111827] whitespace-nowrap">
              Question {questionNumber}
            </span>
            <div className="flex items-center gap-2 ml-auto flex-wrap">
              <span className="text-sm font-medium text-[#374151] whitespace-nowrap">
                Score:
              </span>
              <Input
                type="number"
                min={1}
                className="h-8 w-16 border-[#D1D5DB] text-center px-2 text-sm"
                {...register("points")}
              />
              <Select
                value={watch("type")}
                onValueChange={(v) =>
                  setValue("type", v as QuestionType, { shouldValidate: true })
                }
              >
                <SelectTrigger className="h-8 w-32 border-[#D1D5DB] text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(QuestionType).map((t) => (
                    <SelectItem key={t} value={t}>
                      {QUESTION_TYPE_LABELS[t]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button
                type="button"
                onClick={() => { resetForm(); onClose() }}
                className="text-[#9CA3AF] hover:text-red-500 transition-colors p-1"
                title="Discard and close"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* ── Question rich-text area ── */}
          <div className="px-6 pt-4 pb-2">
            <RichTextEditor
              key={`question-${resetKey}`}
              defaultValue={defaultValues?.title ?? ""}
              onChange={(html) => setValue("title", html, { shouldValidate: true })}
              placeholder="Enter your question here..."
              minHeight="80px"
              resetKey={resetKey}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* ── Answer options (hidden for Text type) ── */}
          {!isTextType && (
            <div className="px-6 py-2 space-y-3">
              {options.map((optValue, index) => (
                <div key={index} className="border border-[#E5E7EB] rounded-lg overflow-visible">
                  {/* Option header row */}
                  <div className="flex items-center gap-3 px-3 py-2 bg-[#F9FAFB] border-b border-[#E5E7EB] rounded-t-lg">
                    <div className="w-6 h-6 rounded-full border-2 border-[#D1D5DB] flex items-center justify-center text-xs font-semibold text-[#6B7280] shrink-0">
                      {OPTION_LETTERS[index] ?? index + 1}
                    </div>
                    <Checkbox
                      id={`correct-${index}`}
                      checked={correctIndices.has(index)}
                      onCheckedChange={() => toggleCorrect(index)}
                      className="border-[#D1D5DB] data-[state=checked]:bg-[#6C3AE8] data-[state=checked]:border-[#6C3AE8]"
                    />
                    <label
                      htmlFor={`correct-${index}`}
                      className="text-sm text-[#374151] cursor-pointer select-none flex-1"
                    >
                      Set as correct answer
                    </label>
                    {options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="text-[#9CA3AF] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Option rich-text editor */}
                  <div className="p-2">
                    <RichTextEditor
                      key={`option-${index}-${resetKey}`}
                      defaultValue={optValue}
                      onChange={(html) => updateOption(index, html)}
                      placeholder={`Option ${OPTION_LETTERS[index] ?? index + 1}`}
                      minHeight="48px"
                      resetKey={resetKey}
                    />
                  </div>
                </div>
              ))}

              {errors.options && (
                <p className="text-red-500 text-xs">
                  {errors.options.message as string}
                </p>
              )}

              {correctAnswerError && (
                <p className="text-red-500 text-xs">{correctAnswerError}</p>
              )}

              <button
                type="button"
                onClick={addOption}
                className="flex items-center gap-1.5 text-sm text-[#6C3AE8] hover:text-[#5B2FD4] font-medium transition-colors"
              >
                <Plus className="h-4 w-4" />
                Another options
              </button>
            </div>
          )}

          {/* ── Footer ── */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E5E7EB] mt-2 sticky bottom-0 bg-white">
            <Button
              type="button"
              variant="outline"
              className="border-[#6C3AE8] text-[#6C3AE8] hover:bg-[#6C3AE8] hover:text-white px-6"
              onClick={handleSubmit((data) => buildAndSubmit(data, false))}
            >
              Save
            </Button>
            {mode === "add" && (
              <Button
                type="button"
                className="bg-[#6C3AE8] hover:bg-[#5B2FD4] text-white px-6"
                onClick={handleSubmit((data) => buildAndSubmit(data, true))}
              >
                Save & Add More
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
