"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { examBasicInfoSchema, ExamBasicInfoSchema } from "@/app/lib/validators/exam.schema"
import { useExamStore } from "@/app/lib/stores/exam.store"
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
import { QuestionType } from "@/app/config/enums"

const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  [QuestionType.Radio]: "MCQ (Single Answer)",
  [QuestionType.Checkbox]: "Checkbox (Multiple Answer)",
  [QuestionType.Text]: "Text / Essay",
}

interface StepBasicInfoProps {
  onNext: () => void
}

export function StepBasicInfo({ onNext }: StepBasicInfoProps) {
  const { basicInfo, setBasicInfo } = useExamStore()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ExamBasicInfoSchema>({
    resolver: zodResolver(examBasicInfoSchema),
    defaultValues: basicInfo ?? {
      questionType: QuestionType.Radio,
      negativeMarkingValue: 0,
    },
  })

  const onSubmit = (data: ExamBasicInfoSchema) => {
    setBasicInfo(data)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-8">
        <h2 className="text-lg font-semibold text-[#111827] mb-6">
          Basic Information
        </h2>

        {/* Title */}
        <div className="mb-5">
          <Label htmlFor="title" className="text-sm font-medium text-[#374151] mb-1.5 block">
            Online Test Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="Enter exam title"
            className="h-[52px] border-[#D1D5DB]"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Row: Total Candidates + Total Slots */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <Label className="text-sm font-medium text-[#374151] mb-1.5 block">
              Total Candidates <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              placeholder="e.g. 10000"
              className="h-[52px] border-[#D1D5DB]"
              {...register("totalCandidates")}
            />
            {errors.totalCandidates && (
              <p className="text-red-500 text-xs mt-1">
                {errors.totalCandidates.message}
              </p>
            )}
          </div>
          <div>
            <Label className="text-sm font-medium text-[#374151] mb-1.5 block">
              Total Slots <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              placeholder="e.g. 3"
              className="h-[52px] border-[#D1D5DB]"
              {...register("totalSlots")}
            />
            {errors.totalSlots && (
              <p className="text-red-500 text-xs mt-1">
                {errors.totalSlots.message}
              </p>
            )}
          </div>
        </div>

        {/* Row: Question Type + Duration + Negative Marking */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div>
            <Label className="text-sm font-medium text-[#374151] mb-1.5 block">
              Question Type <span className="text-red-500">*</span>
            </Label>
            <Select
              defaultValue={watch("questionType")}
              onValueChange={(v) =>
                setValue("questionType", v as QuestionType, {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="h-[52px] border-[#D1D5DB]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(QuestionType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {QUESTION_TYPE_LABELS[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.questionType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.questionType.message}
              </p>
            )}
          </div>
          <div>
            <Label className="text-sm font-medium text-[#374151] mb-1.5 block">
              Duration (minutes) <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              placeholder="e.g. 30"
              className="h-[52px] border-[#D1D5DB]"
              {...register("durationMinutes")}
            />
            {errors.durationMinutes && (
              <p className="text-red-500 text-xs mt-1">
                {errors.durationMinutes.message}
              </p>
            )}
          </div>
          <div>
            <Label className="text-sm font-medium text-[#374151] mb-1.5 block">
              Negative Marking
            </Label>
            <Input
              type="number"
              step="0.25"
              placeholder="e.g. 0.25"
              className="h-[52px] border-[#D1D5DB]"
              {...register("negativeMarkingValue")}
            />
          </div>
        </div>

        {/* Row: Start Time + End Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-[#374151] mb-1.5 block">
              Start Time <span className="text-red-500">*</span>
            </Label>
            <Input
              type="datetime-local"
              className="h-[52px] border-[#D1D5DB]"
              {...register("startTime")}
            />
            {errors.startTime && (
              <p className="text-red-500 text-xs mt-1">
                {errors.startTime.message}
              </p>
            )}
          </div>
          <div>
            <Label className="text-sm font-medium text-[#374151] mb-1.5 block">
              End Time <span className="text-red-500">*</span>
            </Label>
            <Input
              type="datetime-local"
              className="h-[52px] border-[#D1D5DB]"
              {...register("endTime")}
            />
            {errors.endTime && (
              <p className="text-red-500 text-xs mt-1">
                {errors.endTime.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button
          type="submit"
          className="bg-[#6C3AE8] hover:bg-[#5B2FD4] text-white px-8 h-12"
        >
          Next: Question Sets
        </Button>
      </div>
    </form>
  )
}
