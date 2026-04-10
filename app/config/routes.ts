export const routes = {
  auth: {
    employerSignIn: "/employer/signin",
    candidateSignIn: "/candidate/signin",
  },
  employer: {
    dashboard: "/employer/dashboard",
    exams: {
      create: "/employer/exams/create",
      candidates: (examId: string) => `/employer/exams/${examId}/candidates`,
    },
  },
  candidate: {
    dashboard: "/candidate/dashboard",
    exam: (examId: string) => `/candidate/exam/${examId}`,
    examCompleted: (examId: string) => `/candidate/exam/${examId}/completed`,
    examTimeout: (examId: string) => `/candidate/exam/${examId}/timeout`,
  },
} as const
