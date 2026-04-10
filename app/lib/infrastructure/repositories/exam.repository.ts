import { ExamModel } from "@/app/lib/models/exam"
import { QuestionModel } from "@/app/lib/models/question"

export interface IExamRepository {
  getAll(): Promise<ExamModel[]>
  getById(id: string): Promise<ExamModel | undefined>
  create(exam: ExamModel): Promise<ExamModel>
}

export interface IQuestionRepository {
  getByIds(ids: string[]): Promise<QuestionModel[]>
}
