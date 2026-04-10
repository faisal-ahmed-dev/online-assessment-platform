import { CandidateModel } from "@/app/lib/models/candidate"

export interface ICandidateRepository {
  getByExamId(examId: string): Promise<CandidateModel[]>
}
