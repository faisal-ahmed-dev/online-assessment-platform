import { BaseModel } from "./base"

export interface CandidateModel extends BaseModel {
  name: string
  email: string
  refId: string
  examId: string
  score: Nullable<number>
  totalQuestions: number
  submittedAt: Nullable<string>
  status: "pending" | "completed" | "timeout"
}
