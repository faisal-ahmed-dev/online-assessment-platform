"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { questionSchema, QuestionSchema } from "@/app/lib/validators/question.schema"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash2, Plus } from "lucide-react"
import { QuestionModel } from "@/app/lib/models/question"
import { QuestionType } from "@/app/config/enums"
import { generateId } from "@/app/lib/utils/generate-id"

const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  [QuestionType.Radio]: "MCQ (Single Answer)",
  [QuestionType.Checkbox]: "Checkbox (Multiple Answer)",
  [QuestionType.Text]: "Text / Essay",
}

interface QuestionModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (question: QuestionModel) => void
  defaultValues?: QuestionModel
  mode: "add" | "edit"
}

export function QuestionModal({
  open,
  onClose,
  onSubmit,
  defaultValues,
  mode,
}: QuestionModalProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<QuestionSchema>({
    resolver: zodResolver(questionSchema),
    defaultValues: defaultValues
      ? {
          title: defaultValues.title,
          type: defaultValues.type,
          options: defaultValues.options.length
            ? defaultValues.options
            : ["", ""],
          points: defaultValues.points,
        }
      : {
          type: QuestionType.Radio,
          options: ["", ""],
          points: 1,
        },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-expect-error useFieldArray with primitive array
    name: "options",
  })

  const questionType = watch("type")
  const isTextType = questionType === QuestionType.Text

  const handleFormSubmit = (data: QuestionSchema) => {
    onSubmit({
      id: defaultValues?.id ?? generateId(),
      title: data.title,
      type: data.type,
      options: isTextType ? [] : data.options?.filter(Boolean) ?? [],
      correctAnswer: defaultValues?.correctAnswer ?? null,
      points: data.points,
    })
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add Question" : "Edit Question"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          {/* Question Type */}
          <div>
            <Label className="text-sm font-medium text-[#374151] mb-1.5 block">
              Question Type <span className="text-red-500">*</span>
            </Label>
            <Select
              defaultValue={watch("type")}
              onValueChange={(v) =>
                setValue("type", v as QuestionType, { shouldValidate: true })
              }
            >
              <SelectTrigger className="h-11 border-[#D1D5DB]">
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
          </div>

          {/* Points */}
          <div>
            <Label className="text-sm font-medium text-[#374151] mb-1.5 block">
              Points <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              min={1}
              className="h-11 border-[#D1D5DB]"
              {...register("points")}
            />
          </div>

          {/* Question Title */}
          <div>
            <Label className="text-sm font-medium text-[#374151] mb-1.5 block">
              Question Title <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Enter your question"
              className="h-11 border-[#D1D5DB]"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Options (only for non-text) */}
          {!isTextType && (
            <div>
              <Label className="text-sm font-medium text-[#374151] mb-2 block">
                Answer Options <span className="text-red-500">*</span>
              </Label>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-[#D1D5DB] shrink-0" />
                    <Input
                      placeholder={`Option ${index + 1}`}
                      className="h-10 border-[#D1D5DB] flex-1"
                      {...register(`options.${index}` as const)}
                    />
                    {fields.length > 2 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-[#9CA3AF] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {errors.options && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.options.message as string}
                </p>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2 text-[#6C3AE8] hover:text-[#5B2FD4]"
                onClick={() => append("")}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Option
              </Button>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-[#D1D5DB]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#6C3AE8] hover:bg-[#5B2FD4] text-white"
            >
              {mode === "add" ? "Add Question" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
