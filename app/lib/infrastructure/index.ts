import { useExamStore } from "@/app/lib/stores/exam.store"
import {
  MockExamRepository,
  MockQuestionRepository,
} from "./mock/mock-exam.repository"
import { MockUserRepository } from "./mock/mock-user.repository"
import { MockCandidateRepository } from "./mock/mock-candidate.repository"

export const examRepository = new MockExamRepository(
  () => useExamStore.getState(),
)
export const questionRepository = new MockQuestionRepository()
export const userRepository = new MockUserRepository()
export const candidateRepository = new MockCandidateRepository()
