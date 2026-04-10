import { BaseModel, BaseListModel } from "./base"
import { QuestionType, ExamStatus } from "@/app/config/enums"

export interface ExamModel extends BaseModel {
  title: string
  totalCandidates: number
  totalSlots: number
  questionSetIds: string[]
  questionType: QuestionType
  startTime: string
  endTime: string
  durationMinutes: number
  negativeMarkingValue: number
  status: ExamStatus
}

export interface ExamSearchModel {
  searchTitle?: string
  status?: ExamStatus
}

export interface ExamListModel extends BaseListModel<ExamModel> {}
