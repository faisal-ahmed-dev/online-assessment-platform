"use client"

/**
 * /boneyard — public page used exclusively by `npx boneyard-js build`.
 *
 * Renders every named <Skeleton> component with loading={false} so boneyard
 * can snapshot the real DOM at every breakpoint. Each section is isolated so
 * the CLI captures one bone per <Skeleton name> block.
 *
 * Run:  npx boneyard-js build http://localhost:3000/boneyard
 */

import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { AppNavbar } from "@/app/components/layouts/app-navbar"
import { AppFooter } from "@/app/components/layouts/app-footer"
import { ExamCard } from "@/app/components/exam/exam-card"
import { QuestionRenderer } from "@/app/components/exam/question-renderer"
import { QuestionNavigator } from "@/app/components/exam/question-navigator"
import {
  ExamListSkeleton,
  CandidateTableSkeleton,
  ExamScreenSkeleton,
  ExamCompletedSkeleton,
} from "@/app/components/common/loading-skeleton"
import { MOCK_EXAMS, MOCK_QUESTIONS, MOCK_CANDIDATES } from "@/app/data/mock-exams"

const noop = () => {}

// ─── Snapshot: exam-card-list ─────────────────────────────────────────────────

function ExamCardListPreview() {
  return (
    <ExamListSkeleton loading={false}>
      <div className="grid grid-cols-2 gap-6">
        {MOCK_EXAMS.map((exam) => (
          <ExamCard
            key={exam.id}
            variant="candidate"
            exam={exam}
            onStart={noop}
          />
        ))}
      </div>
    </ExamListSkeleton>
  )
}

// ─── Snapshot: candidate-table ────────────────────────────────────────────────

function CandidateTablePreview() {
  return (
    <CandidateTableSkeleton loading={false}>
      <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F9FAFB]">
              <TableHead className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Name</TableHead>
              <TableHead className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Email</TableHead>
              <TableHead className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Ref ID</TableHead>
              <TableHead className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Score</TableHead>
              <TableHead className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Submitted At</TableHead>
              <TableHead className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_CANDIDATES.map((c) => {
              const statusMap = {
                completed: "bg-green-50 text-green-700 border-green-200",
                timeout: "bg-red-50 text-red-700 border-red-200",
                pending: "bg-amber-50 text-amber-700 border-amber-200",
              }
              return (
                <TableRow key={c.id} className="hover:bg-[#F9FAFB]">
                  <TableCell className="font-medium text-[#111827] text-sm">{c.name}</TableCell>
                  <TableCell className="text-sm text-[#6B7280]">{c.email}</TableCell>
                  <TableCell className="text-sm text-[#6B7280] font-mono">{c.refId}</TableCell>
                  <TableCell className="text-sm text-[#374151] font-semibold">
                    {c.score !== null ? `${c.score} / ${c.totalQuestions}` : "—"}
                  </TableCell>
                  <TableCell className="text-sm text-[#6B7280]">
                    {c.submittedAt ? new Date(c.submittedAt).toLocaleString() : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs ${statusMap[c.status]}`}>
                      {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </CandidateTableSkeleton>
  )
}

// ─── Snapshot: exam-screen ────────────────────────────────────────────────────

function ExamScreenPreview() {
  const exam = MOCK_EXAMS[0]
  const questions = MOCK_QUESTIONS.slice(0, 5)
  const currentIndex = 0
  const currentQuestion = questions[currentIndex]

  return (
    <ExamScreenSkeleton loading={false}>
      <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
        <AppNavbar
          rightSlot={
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#374151] font-medium">
                Question ({currentIndex + 1}/{questions.length})
              </span>
              <div className="text-sm font-semibold text-[#6C3AE8]">29:45</div>
            </div>
          }
        />

        <main className="flex-1 pt-24 pb-8">
          <div className="max-w-screen-xl mx-auto px-20">
            <div className="flex gap-6">
              <div className="w-52 shrink-0">
                <QuestionNavigator
                  totalQuestions={questions.length}
                  currentIndex={currentIndex}
                  answeredIds={["q-001"]}
                  questionIds={questions.map((q) => q.id)}
                  onSelect={noop}
                />
              </div>

              <div className="flex-1 space-y-6">
                <QuestionRenderer
                  question={currentQuestion}
                  questionNumber={currentIndex + 1}
                  totalQuestions={questions.length}
                  answer="Bollinger Bands"
                  onAnswer={noop}
                />

                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    disabled
                    className="border-[#D1D5DB] text-[#374151] h-12 px-6"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="border-[#6C3AE8] text-[#6C3AE8] h-12 px-6"
                    >
                      Submit Exam
                    </Button>
                    <Button className="bg-[#6C3AE8] hover:bg-[#5B2FD4] text-white h-12 px-6">
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <AppFooter />
      </div>
    </ExamScreenSkeleton>
  )
}

// ─── Snapshot: exam-completed ─────────────────────────────────────────────────

function ExamCompletedPreview() {
  const exam = MOCK_EXAMS[0]

  return (
    <ExamCompletedSkeleton loading={false}>
      <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
        <AppNavbar />
        <main className="flex-1 flex items-center justify-center pt-20 pb-20">
          <div className="text-center max-w-lg px-4">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-[#111827] mb-4">Test Completed</h1>
            <p className="text-[#6B7280] text-base leading-relaxed mb-8">
              Congratulations!{" "}
              <span className="font-semibold text-[#374151]">Md. Naimur Rahman</span>, You have
              completed your{" "}
              <span className="font-semibold text-[#374151]">{exam.title}</span>.
              Thank you for participating.
            </p>
            <Button className="bg-[#6C3AE8] hover:bg-[#5B2FD4] text-white h-12 px-8">
              Back to Dashboard
            </Button>
          </div>
        </main>
        <AppFooter />
      </div>
    </ExamCompletedSkeleton>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BoneyardPage() {
  return (
    <div className="space-y-16 py-8">
      <section>
        <p className="text-xs text-[#9CA3AF] font-mono px-8 mb-4">skeleton: exam-card-list</p>
        <div className="px-8">
          <ExamCardListPreview />
        </div>
      </section>

      <section>
        <p className="text-xs text-[#9CA3AF] font-mono px-8 mb-4">skeleton: candidate-table</p>
        <div className="px-8">
          <CandidateTablePreview />
        </div>
      </section>

      <section>
        <p className="text-xs text-[#9CA3AF] font-mono mb-4">skeleton: exam-screen</p>
        <ExamScreenPreview />
      </section>

      <section>
        <p className="text-xs text-[#9CA3AF] font-mono mb-4">skeleton: exam-completed</p>
        <ExamCompletedPreview />
      </section>
    </div>
  )
}
