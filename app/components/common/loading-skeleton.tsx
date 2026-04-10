"use client"

// boneyard-js auto-generates pixel-perfect skeletons by snapshotting the real DOM.
// Run `npx boneyard-js build` once after the dev server is running to generate bones JSON.
// Each <Skeleton name="..." loading={...}> resolves its bones automatically via the registry.
import { Skeleton } from "boneyard-js/react"
import { ExamCardSkeleton as FallbackCard } from "./exam-card-fallback"

interface ExamListSkeletonProps {
  loading: boolean
  children: React.ReactNode
}

export function ExamListSkeleton({ loading, children }: ExamListSkeletonProps) {
  return (
    <Skeleton name="exam-card-list" loading={loading}>
      {children}
    </Skeleton>
  )
}

interface CandidateTableSkeletonProps {
  loading: boolean
  children: React.ReactNode
}

export function CandidateTableSkeleton({
  loading,
  children,
}: CandidateTableSkeletonProps) {
  return (
    <Skeleton name="candidate-table" loading={loading}>
      {children}
    </Skeleton>
  )
}
