"use client"

import { Badge } from "@/components/ui/badge"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { CandidateTableSkeleton } from "@/app/components/common/loading-skeleton"
import { EmptyState } from "@/app/components/common/empty-state"
import { useCandidates } from "@/app/lib/hooks/use-candidates"
import { cn } from "@/lib/utils"

const STATUS_MAP = {
  completed: { label: "Completed", className: "bg-green-50 text-green-700 border-green-200" },
  timeout: { label: "Timeout", className: "bg-red-50 text-red-700 border-red-200" },
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700 border-amber-200" },
}

export function CandidatesList({ examId }: { examId: string }) {
  const { data: candidates, isLoading } = useCandidates(examId)

  return (
    <CandidateTableSkeleton loading={isLoading}>
      <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
        {!isLoading && (!candidates || candidates.length === 0) ? (
          <EmptyState message="No candidates found for this exam." />
        ) : (
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
              {(candidates ?? []).map((c) => {
                const status = STATUS_MAP[c.status]
                return (
                  <TableRow key={c.id} className="hover:bg-[#F9FAFB] transition-colors">
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
                      <Badge variant="outline" className={cn("text-xs", status.className)}>
                        {status.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </CandidateTableSkeleton>
  )
}
