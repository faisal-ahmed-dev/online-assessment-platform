"use client"

import { useForm, useWatch } from "react-hook-form"
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
import { Clock } from "lucide-react"
import { QUESTION_TYPE_LABELS_LONG } from "@/app/lib/constants/exam-labels"

const TOTAL_SLOTS_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const TOTAL_QUESTION_SET_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

/** Format duration from two ISO datetime strings into "Xh Ym" display */
function formatDuration(start: string, end: string): string {
  if (!start || !end) return ""
  const diffMs = new Date(end).getTime() - new Date(start).getTime()
  if (isNaN(diffMs) || diffMs <= 0) return ""
  const totalMinutes = Math.round(diffMs / 60000)
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  if (h > 0 && m > 0) return `${h}h ${m}m`
  if (h > 0) return `${h}h`
  return `${m}m`
}

interface StepBasicInfoProps {
  onNext: () => void
  onCancel?: () => void
}

export function StepBasicInfo({ onNext, onCancel }: StepBasicInfoProps) {
  const { basicInfo, setBasicInfo } = useExamStore()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ExamBasicInfoSchema>({
    resolver: zodResolver(examBasicInfoSchema),
    defaultValues: basicInfo ?? {},
  })

  const startTime = watch("startTime")
  const endTime = watch("endTime")
  const duration = formatDuration(startTime, endTime)

  const onSubmit = (data: ExamBasicInfoSchema) => {
    setBasicInfo(data)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-8">
        <h2 className="text-lg font-semibold text-[#111827] mb-6">
          Basic Information
        </h2>

        {/* Online Test Title */}
        <div className="mb-5">
          <Label className="text-sm font-medium text-[#374151] mb-1.5 block">
            Online Test Title <span className="text-red-500">*</span>
          </Label>
          <Input
            placeholder="Enter online test title"
            className="h-[52px] border-[#D1D5DB]"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Total Candidates + Total Slots */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <Label className="text-sm font-medium text-[#374151] mb-1.5 block">
              Total Candidates <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              placeholder="Enter total candidates"
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
            <Select
              defaultValue={basicInfo?.totalSlots?.toString()}
              onValueChange={(v) =>
                setValue("totalSlots", Number(v), { shouldValidate: true })
              }
            >
              <SelectTrigger className="h-[52px] border-[#D1D5DB]">
                <SelectValue placeholder="Select total shots" />
              </SelectTrigger>
              <SelectContent>
                {TOTAL_SLOTS_OPTIONS.map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.totalSlots && (
              <p className="text-red-500 text-xs mt-1">
                {errors.totalSlots.message}
              </p>
            )}
          </div>
        </div>

        {/* Total Question Set + Question Type */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <Label className="text-sm font-medium text-[#374151] mb-1.5 block">
              Total Question Set <span className="text-red-500">*</span>
            </Label>
            <Select
              defaultValue={basicInfo?.totalQuestionSet?.toString()}
              onValueChange={(v) =>
                setValue("totalQuestionSet", Number(v), { shouldValidate: true })
              }
            >
              <SelectTrigger className="h-[52px] border-[#D1D5DB]">
                <SelectValue placeholder="Select total question set" />
              </SelectTrigger>
              <SelectContent>
                {TOTAL_QUESTION_SET_OPTIONS.map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.totalQuestionSet && (
              <p className="text-red-500 text-xs mt-1">
                {errors.totalQuestionSet.message}
              </p>
            )}
          </div>
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
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(QuestionType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {QUESTION_TYPE_LABELS_LONG[type]}
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
        </div>

        {/* Start Time + End Time + Duration (auto) */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-medium text-[#374151] mb-1.5 block">
              Start Time <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type="datetime-local"
                className="h-[52px] border-[#D1D5DB] pr-10"
                {...register("startTime")}
              />
              <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] pointer-events-none" />
            </div>
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
            <div className="relative">
              <Input
                type="datetime-local"
                className="h-[52px] border-[#D1D5DB] pr-10"
                {...register("endTime")}
              />
              <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] pointer-events-none" />
            </div>
            {errors.endTime && (
              <p className="text-red-500 text-xs mt-1">
                {errors.endTime.message}
              </p>
            )}
          </div>
          <div>
            <Label className="text-sm font-medium text-[#374151] mb-1.5 block">
              Duration
            </Label>
            <Input
              readOnly
              value={duration}
              placeholder="Duration Time"
              className="h-[52px] border-[#D1D5DB] bg-[#F9FAFB] text-[#6B7280] cursor-default"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-6">
        <Button
          type="button"
          variant="outline"
          className="border-[#D1D5DB] text-[#374151] px-8 h-11"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-[#6C3AE8] hover:bg-[#5B2FD4] text-white px-8 h-11"
        >
          Save & Continue
        </Button>
      </div>
    </form>
  )
}
