import { IExamRepository, IQuestionRepository } from "../repositories/exam.repository"
import { MOCK_QUESTIONS } from "@/app/data/mock-exams"
import { ExamModel } from "@/app/lib/models/exam"
import { QuestionModel } from "@/app/lib/models/question"
import { mockDelay, MOCK_DELAY } from "@/app/lib/constants/mock-delay"

type ExamStoreGetter = () => { exams: ExamModel[]; addExam: (exam: ExamModel) => void }

export class MockExamRepository implements IExamRepository {
  constructor(private readonly getStore: ExamStoreGetter) {}

  async getAll(): Promise<ExamModel[]> {
    await mockDelay(MOCK_DELAY.list)
    return this.getStore().exams
  }

  async getById(id: string): Promise<ExamModel | undefined> {
    await mockDelay(MOCK_DELAY.single)
    return this.getStore().exams.find((e) => e.id === id)
  }

  async create(exam: ExamModel): Promise<ExamModel> {
    await mockDelay(MOCK_DELAY.mutation)
    this.getStore().addExam(exam)
    return exam
  }
}

export class MockQuestionRepository implements IQuestionRepository {
  async getByIds(ids: string[]): Promise<QuestionModel[]> {
    await mockDelay(MOCK_DELAY.single)
    return MOCK_QUESTIONS.filter((q) => ids.includes(q.id))
  }
}
