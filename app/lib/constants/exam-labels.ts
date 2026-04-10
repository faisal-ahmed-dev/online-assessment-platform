import { QuestionType, ExamStatus } from "@/app/config/enums"

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  [QuestionType.Radio]: "MCQ",
  [QuestionType.Checkbox]: "Checkbox",
  [QuestionType.Text]: "Text",
}

export const QUESTION_TYPE_LABELS_LONG: Record<QuestionType, string> = {
  [QuestionType.Radio]: "MCQ (Single Answer)",
  [QuestionType.Checkbox]: "Checkbox (Multiple Answer)",
  [QuestionType.Text]: "Text / Essay",
}

export const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"] as const

export const QUESTION_TYPE_BADGE: Record<QuestionType, string> = {
  [QuestionType.Radio]: "bg-purple-50 text-purple-700 border border-purple-200",
  [QuestionType.Checkbox]: "bg-blue-50 text-blue-700 border border-blue-200",
  [QuestionType.Text]: "bg-amber-50 text-amber-700 border border-amber-200",
}

export const EXAM_STATUS_MAP: Record<ExamStatus, { label: string; className: string }> = {
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

export const CANDIDATE_STATUS_MAP = {
  completed: { label: "Completed", className: "bg-green-50 text-green-700 border-green-200" },
  timeout: { label: "Timeout", className: "bg-red-50 text-red-700 border-red-200" },
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700 border-amber-200" },
} as const
