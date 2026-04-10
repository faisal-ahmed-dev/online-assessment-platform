import { ICandidateRepository } from "@/app/lib/infrastructure/repositories/candidate.repository"
import { CandidateModel } from "@/app/lib/models/candidate"

export class CandidateService {
  constructor(private readonly candidateRepo: ICandidateRepository) {}

  async getByExam(examId: string): Promise<CandidateModel[]> {
    return this.candidateRepo.getByExamId(examId)
  }
}
