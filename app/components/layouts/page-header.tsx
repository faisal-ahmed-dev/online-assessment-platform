import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface PageHeaderProps {
  title: string
  backHref?: string
  action?: React.ReactNode
}

export function PageHeader({ title, backHref, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {backHref && (
          <Link
            href={backHref}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#F3F4F6] transition-colors text-[#6B7280]"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        )}
        <h1 className="text-xl sm:text-2xl font-semibold text-[#111827]">{title}</h1>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
