import {
  examRepository,
  questionRepository,
  userRepository,
  candidateRepository,
} from "@/app/lib/infrastructure"
import { AuthService } from "./auth.service"
import { ExamService } from "./exam.service"
import { CandidateService } from "./candidate.service"

export const authService = new AuthService(userRepository)
export const examService = new ExamService(examRepository, questionRepository)
export const candidateService = new CandidateService(candidateRepository)
