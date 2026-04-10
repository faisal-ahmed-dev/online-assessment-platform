import {
  IExamRepository,
  IQuestionRepository,
} from "@/app/lib/infrastructure/repositories/exam.repository"
import { ExamBasicInfoSchema } from "@/app/lib/validators/exam.schema"
import { ExamModel } from "@/app/lib/models/exam"
import { QuestionModel } from "@/app/lib/models/question"
import { ExamStatus } from "@/app/config/enums"
import { generateId } from "@/app/lib/utils/generate-id"
import { MOCK_EXAMS } from "@/app/data/mock-exams"

export class ExamService {
  constructor(
    private readonly examRepo: IExamRepository,
    private readonly questionRepo: IQuestionRepository,
  ) {}

  async listAll(): Promise<ExamModel[]> {
    return this.examRepo.getAll()
  }

  async getById(id: string): Promise<ExamModel | undefined> {
    return this.examRepo.getById(id)
  }

  async getQuestions(ids: string[]): Promise<QuestionModel[]> {
    return this.questionRepo.getByIds(ids)
  }

  async create(exam: ExamModel): Promise<ExamModel> {
    return this.examRepo.create(exam)
  }

  async createFromForm(
    basicInfo: ExamBasicInfoSchema,
    questions: QuestionModel[],
  ): Promise<ExamModel> {
    const durationMinutes = Math.max(
      0,
      Math.round(
        (new Date(basicInfo.endTime).getTime() -
          new Date(basicInfo.startTime).getTime()) /
          60000,
      ),
    )
    const exam: ExamModel = {
      id: generateId(),
      ...basicInfo,
      durationMinutes,
      questionSetIds: questions.map((q) => q.id),
      status: ExamStatus.Upcoming,
    }
    return this.examRepo.create(exam)
  }

  getSeedData(): ExamModel[] {
    return MOCK_EXAMS
  }
}
