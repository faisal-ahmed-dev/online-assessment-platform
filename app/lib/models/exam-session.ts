export interface ExamAnswerModel {
  questionId: string
  answer: string | string[] | null
}

export interface BehaviorEventModel {
  type: string
  timestamp: number
  count: number
}

export interface ExamSessionModel {
  examId: string
  candidateId: string
  startedAt: number
  answers: ExamAnswerModel[]
  behaviorEvents: BehaviorEventModel[]
  isSubmitted: boolean
  isTimeout: boolean
}
