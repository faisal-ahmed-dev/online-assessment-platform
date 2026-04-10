export const QUERY_KEYS = {
  exams: {
    all: ["exams"] as const,
    byId: (id: string) => ["exam", id] as const,
    questions: (ids: string[]) => ["questions", ids] as const,
  },
  candidates: {
    byExam: (examId: string) => ["candidates", examId] as const,
  },
} as const
