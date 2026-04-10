"use client"

import { Users, FileText, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExamModel } from "@/app/lib/models/exam"
import { ExamStatus } from "@/app/config/enums"
import { formatMinutes } from "@/app/lib/utils/format-time"

const STATUS_MAP: Record<ExamStatus, { label: string; className: string }> = {
  [ExamStatus.Upcoming]: {
    label: "Upcoming",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  [ExamStatus.Active]: {
    label: "Active",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  [ExamStatus.Completed]: {
    label: "Completed",
    className: "bg-gray-50 text-gray-600 border-gray-200",
  },
}

type ExamCardProps =
  | {
      variant: "employer"
      exam: ExamModel
      onViewCandidates: () => void
    }
  | {
      variant: "candidate"
      exam: ExamModel
      onStart: () => void
    }

export function ExamCard(props: ExamCardProps) {
  const { exam } = props
  const status = STATUS_MAP[exam.status]

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 flex flex-col gap-5 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-[#111827] font-semibold text-base leading-snug flex-1">
          {exam.title}
        </h3>
        <Badge
          variant="outline"
          className={`text-xs shrink-0 ${status.className}`}
        >
          {status.label}
        </Badge>
      </div>

      {/* Metadata */}
      <div className="flex flex-col gap-2">
        {props.variant === "employer" ? (
          <>
            <MetaItem
              icon={<Users className="h-4 w-4" />}
              label="Candidates"
              value={exam.totalCandidates.toLocaleString()}
            />
            <MetaItem
              icon={<FileText className="h-4 w-4" />}
              label="Question Set"
              value={exam.questionSetIds.length.toString()}
            />
            <MetaItem
              icon={<Calendar className="h-4 w-4" />}
              label="Exam Slots"
              value={exam.totalSlots.toString()}
            />
          </>
        ) : (
          <>
            <MetaItem
              icon={<Clock className="h-4 w-4" />}
              label="Duration"
              value={formatMinutes(exam.durationMinutes)}
            />
            <MetaItem
              icon={<FileText className="h-4 w-4" />}
              label="Questions"
              value={exam.questionSetIds.length.toString()}
            />
            <MetaItem
              icon={<FileText className="h-4 w-4" />}
              label="Question Sets"
              value={exam.totalQuestionSet?.toString() ?? "—"}
            />
          </>
        )}
      </div>

      {/* Action */}
      <div className="mt-auto">
        {props.variant === "employer" ? (
          <Button
            variant="outline"
            size="sm"
            className="border-[#6C3AE8] text-[#6C3AE8] hover:bg-[#6C3AE8] hover:text-white transition-colors"
            onClick={props.onViewCandidates}
          >
            View Candidates
          </Button>
        ) : (
          <Button
            size="sm"
            className="bg-[#6C3AE8] hover:bg-[#5B2FD4] text-white"
            onClick={props.onStart}
            disabled={exam.status === ExamStatus.Completed}
          >
            {exam.status === ExamStatus.Completed ? "Completed" : "Start"}
          </Button>
        )}
      </div>
    </div>
  )
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
      <span className="text-[#9CA3AF]">{icon}</span>
      <span>{label}:</span>
      <span className="text-[#374151] font-medium">{value}</span>
    </div>
  )
}
