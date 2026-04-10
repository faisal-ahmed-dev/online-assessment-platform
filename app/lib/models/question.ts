import { BaseModel } from "./base"
import { QuestionType } from "@/app/config/enums"

export interface QuestionModel extends BaseModel {
  title: string
  type: QuestionType
  options: string[]
  correctAnswer: Nullable<string>
  points: number
}
