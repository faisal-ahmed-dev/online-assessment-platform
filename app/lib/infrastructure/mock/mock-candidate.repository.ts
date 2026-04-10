import { ICandidateRepository } from "../repositories/candidate.repository"
import { MOCK_CANDIDATES } from "@/app/data/mock-exams"
import { CandidateModel } from "@/app/lib/models/candidate"
import { mockDelay, MOCK_DELAY } from "@/app/lib/constants/mock-delay"

export class MockCandidateRepository implements ICandidateRepository {
  async getByExamId(examId: string): Promise<CandidateModel[]> {
    await mockDelay(MOCK_DELAY.list)
    return MOCK_CANDIDATES.filter((c) => c.examId === examId)
  }
}
