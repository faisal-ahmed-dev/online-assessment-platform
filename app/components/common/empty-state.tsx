import { FileX } from "lucide-react"

interface EmptyStateProps {
  message?: string
  action?: React.ReactNode
}

export function EmptyState({
  message = "No data found",
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-4">
        <FileX className="h-8 w-8 text-[#9CA3AF]" />
      </div>
      <p className="text-[#6B7280] text-base mb-6">{message}</p>
      {action && <div>{action}</div>}
    </div>
  )
}
