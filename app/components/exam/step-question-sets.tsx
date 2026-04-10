"use client"

import { useState } from "react"
import { Plus, CheckCircle2, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuestionModal } from "./question-modal"
import { ConfirmDialog } from "@/app/components/common/confirm-dialog"
import { EmptyState } from "@/app/components/common/empty-state"
import { QuestionModel } from "@/app/lib/models/question"
import { useExamStore } from "@/app/lib/stores/exam.store"
import { QuestionType } from "@/app/config/enums"

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"]

const TYPE_BADGE: Record<QuestionType, string> = {
  [QuestionType.Radio]: "bg-purple-50 text-purple-700 border border-purple-200",
  [QuestionType.Checkbox]: "bg-blue-50 text-blue-700 border border-blue-200",
  [QuestionType.Text]: "bg-amber-50 text-amber-700 border border-amber-200",
}

const TYPE_LABEL: Record<QuestionType, string> = {
  [QuestionType.Radio]: "MCQ",
  [QuestionType.Checkbox]: "Checkbox",
  [QuestionType.Text]: "Text",
}

interface StepQuestionSetsProps {
  onBack: () => void
  onSubmit: () => void
  isSubmitting?: boolean
}

export function StepQuestionSets({
  onBack,
  onSubmit,
  isSubmitting,
}: StepQuestionSetsProps) {
  const { questions, addQuestion, updateQuestion, deleteQuestion } = useExamStore()
  const [addOpen, setAddOpen] = useState(false)
  const [editQuestion, setEditQuestion] = useState<QuestionModel | null>(null)

  const getCorrectIndices = (q: QuestionModel): Set<number> => {
    if (!q.correctAnswer) return new Set()
    return new Set(
      q.correctAnswer
        .split(",")
        .map(Number)
        .filter((n) => !isNaN(n)),
    )
  }

  return (
    <div className="space-y-4">
      {/* Question cards */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
        {questions.length === 0 ? (
          <div className="p-8">
            <EmptyState
              message="No questions added yet. Click 'Add Question' to get started."
              action={
                <Button
                  size="sm"
                  className="bg-[#6C3AE8] hover:bg-[#5B2FD4] text-white"
                  onClick={() => setAddOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Question
                </Button>
              }
            />
          </div>
        ) : (
          <div className="divide-y divide-[#E5E7EB]">
            {questions.map((q, index) => {
              const correctIndices = getCorrectIndices(q)
              return (
                <div key={q.id} className="p-6">
                  {/* Question header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-[#374151]">
                      Question {index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${TYPE_BADGE[q.type]}`}>
                        {TYPE_LABEL[q.type]}
                      </span>
                      <span className="text-xs font-semibold text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded-full">
                        {q.points} pt
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-[#E5E7EB] mb-4" />

                  {/* Question text */}
                  <p className="text-sm font-medium text-[#111827] mb-3">
                    {q.title}
                  </p>

                  {/* Answer options */}
                  {q.options.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {q.options.map((opt, oi) => {
                        const isCorrect = correctIndices.has(oi)
                        return (
                          <div
                            key={oi}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                              isCorrect ? "bg-green-50" : "bg-[#F9FAFB]"
                            }`}
                          >
                            {isCorrect ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                            ) : (
                              <Circle className="h-4 w-4 text-[#D1D5DB] shrink-0" />
                            )}
                            <span className="text-xs font-semibold text-[#6B7280] w-4 shrink-0">
                              {OPTION_LETTERS[oi] ?? oi + 1}.
                            </span>
                            <span className={`text-sm ${isCorrect ? "text-green-700 font-medium" : "text-[#374151]"}`}>
                              {opt}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setEditQuestion(q)}
                      className="text-sm font-medium text-[#6C3AE8] hover:text-[#5B2FD4] transition-colors"
                    >
                      Edit
                    </button>
                    <ConfirmDialog
                      trigger={
                        <button
                          type="button"
                          className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                        >
                          Remove From Exam
                        </button>
                      }
                      title="Remove Question"
                      description="Are you sure you want to remove this question from the exam?"
                      confirmLabel="Remove"
                      variant="destructive"
                      onConfirm={() => deleteQuestion(q.id)}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Full-width Add Question button */}
        {questions.length > 0 && (
          <div className="p-4 border-t border-[#E5E7EB]">
            <Button
              type="button"
              className="w-full bg-[#6C3AE8] hover:bg-[#5B2FD4] text-white h-11"
              onClick={() => setAddOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-[#D1D5DB] text-[#374151] px-8 h-11"
        >
          Back
        </Button>
        <ConfirmDialog
          trigger={
            <Button
              className="bg-[#6C3AE8] hover:bg-[#5B2FD4] text-white px-8 h-11"
              disabled={questions.length === 0 || isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Submit Exam"}
            </Button>
          }
          title="Submit Exam"
          description={`You are about to create the exam with ${questions.length} question(s). Are you sure?`}
          confirmLabel="Yes, Submit"
          onConfirm={onSubmit}
        />
      </div>

      {/* Add modal */}
      <QuestionModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={addQuestion}
        onSaveAndAddMore={() => {
          // modal stays open, just resets — handled inside modal
        }}
        mode="add"
        questionNumber={questions.length + 1}
      />

      {/* Edit modal */}
      {editQuestion && (
        <QuestionModal
          open={!!editQuestion}
          onClose={() => setEditQuestion(null)}
          onSubmit={(q) => {
            updateQuestion(editQuestion.id, q)
            setEditQuestion(null)
          }}
          defaultValues={editQuestion}
          mode="edit"
          questionNumber={questions.findIndex((q) => q.id === editQuestion.id) + 1}
        />
      )}
    </div>
  )
}
