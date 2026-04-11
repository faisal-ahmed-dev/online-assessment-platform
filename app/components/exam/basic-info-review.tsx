"use client"

import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExamBasicInfoSchema } from "@/app/lib/validators/exam.schema"
import { QUESTION_TYPE_LABELS } from "@/app/lib/constants/exam-labels"

interface BasicInfoReviewProps {
  basicInfo: ExamBasicInfoSchema
  durationMinutes: number
  onEdit: () => void
  onNext: () => void
  onCancel: () => void
}

export function BasicInfoReview({
  basicInfo,
  durationMinutes,
  onEdit,
  onNext,
  onCancel,
}: BasicInfoReviewProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-[#334155]">Basic Information</h2>
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1.5 text-sm font-medium text-[#6C3AE8] hover:text-[#5B2FD4] transition-colors"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
        </div>

        {/* Online Test Title */}
        <div className="mb-5">
          <p className="text-xs font-medium text-[#64748B] mb-1">Online Test Title</p>
          <p className="text-sm font-medium text-[#334155]">{basicInfo.title}</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <div>
            <p className="text-xs font-medium text-[#64748B] mb-1">Total Candidates</p>
            <p className="text-sm font-semibold text-[#334155]">
              {Number(basicInfo.totalCandidates).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#64748B] mb-1">Total Slots</p>
            <p className="text-sm font-semibold text-[#334155]">{basicInfo.totalSlots}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#64748B] mb-1">Total Question Set</p>
            <p className="text-sm font-semibold text-[#334155]">{basicInfo.totalQuestionSet}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#64748B] mb-1">Duration Per Slots (Minutes)</p>
            <p className="text-sm font-semibold text-[#334155]">{durationMinutes}</p>
          </div>
        </div>

        {/* Question Type */}
        <div>
          <p className="text-xs font-medium text-[#64748B] mb-1">Question Type</p>
          <p className="text-sm font-medium text-[#334155]">{QUESTION_TYPE_LABELS[basicInfo.questionType]}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          className="border-[#E5E7EB] text-[#334155] px-8 h-12 rounded-xl font-semibold"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="bg-[#6C3AE8] hover:bg-[#5B2FD4] text-white px-8 h-12 rounded-xl font-semibold"
          onClick={onNext}
        >
          Save &amp; Continue
        </Button>
      </div>
    </div>
  )
}
