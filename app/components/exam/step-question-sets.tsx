"use client"

import { useState } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QuestionModal } from "./question-modal"
import { ConfirmDialog } from "@/app/components/common/confirm-dialog"
import { EmptyState } from "@/app/components/common/empty-state"
import { QuestionModel } from "@/app/lib/models/question"
import { useExamStore } from "@/app/lib/stores/exam.store"
import { QuestionType } from "@/app/config/enums"

const TYPE_BADGE: Record<QuestionType, string> = {
  [QuestionType.Radio]: "bg-purple-50 text-purple-700 border-purple-200",
  [QuestionType.Checkbox]: "bg-blue-50 text-blue-700 border-blue-200",
  [QuestionType.Text]: "bg-amber-50 text-amber-700 border-amber-200",
}

const TYPE_LABEL: Record<QuestionType, string> = {
  [QuestionType.Radio]: "MCQ",
  [QuestionType.Checkbox]: "Checkbox",
  [QuestionType.Text]: "Essay",
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
  const { questions, addQuestion, updateQuestion, deleteQuestion } =
    useExamStore()
  const [addOpen, setAddOpen] = useState(false)
  const [editQuestion, setEditQuestion] = useState<QuestionModel | null>(null)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#111827]">
            Question Sets
          </h2>
          <Button
            size="sm"
            variant="outline"
            className="border-[#6C3AE8] text-[#6C3AE8] hover:bg-[#6C3AE8] hover:text-white"
            onClick={() => setAddOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Question
          </Button>
        </div>

        {questions.length === 0 ? (
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
        ) : (
          <div className="space-y-3">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className="flex items-start gap-4 p-4 border border-[#E5E7EB] rounded-lg hover:border-[#6C3AE8]/30 transition-colors"
              >
                <span className="text-sm font-semibold text-[#9CA3AF] w-6 shrink-0 mt-0.5">
                  {index + 1}.
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#111827] font-medium leading-snug line-clamp-2">
                    {q.title}
                  </p>
                  {q.options.length > 0 && (
                    <p className="text-xs text-[#9CA3AF] mt-1">
                      {q.options.length} options
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant="outline"
                    className={`text-xs ${TYPE_BADGE[q.type]}`}
                  >
                    {TYPE_LABEL[q.type]}
                  </Badge>
                  <span className="text-xs text-[#9CA3AF] font-medium">
                    {q.points}pt
                  </span>
                  <button
                    onClick={() => setEditQuestion(q)}
                    className="text-[#9CA3AF] hover:text-[#6C3AE8] transition-colors p-1"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <ConfirmDialog
                    trigger={
                      <button className="text-[#9CA3AF] hover:text-red-500 transition-colors p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    }
                    title="Delete Question"
                    description="Are you sure you want to delete this question? This action cannot be undone."
                    confirmLabel="Delete"
                    variant="destructive"
                    onConfirm={() => deleteQuestion(q.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-[#D1D5DB] text-[#374151] px-8 h-12"
        >
          Back
        </Button>
        <ConfirmDialog
          trigger={
            <Button
              className="bg-[#6C3AE8] hover:bg-[#5B2FD4] text-white px-8 h-12"
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
        mode="add"
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
        />
      )}
    </div>
  )
}
