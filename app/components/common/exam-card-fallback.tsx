// Fallback skeleton used before boneyard bones are generated (first run)
export function ExamCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 animate-pulse">
      <div className="h-5 bg-[#E5E7EB] rounded w-3/4 mb-5" />
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-[#E5E7EB] rounded w-1/2" />
        <div className="h-4 bg-[#E5E7EB] rounded w-2/5" />
        <div className="h-4 bg-[#E5E7EB] rounded w-1/3" />
      </div>
      <div className="h-10 bg-[#E5E7EB] rounded w-40" />
    </div>
  )
}
