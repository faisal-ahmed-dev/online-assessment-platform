"use client"

import { useState, useEffect, useRef } from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useExamTimer } from "@/app/lib/hooks/use-exam-timer"
import { formatSeconds } from "@/app/lib/utils/format-time"

interface ExamTimerProps {
  durationSeconds: number
  startedAt: number
  onExpire: () => void
}

export function ExamTimer({
  durationSeconds,
  startedAt,
  onExpire,
}: ExamTimerProps) {
  const { getRemainingSeconds } = useExamTimer({
    durationSeconds,
    startedAt,
    onExpire,
  })

  const [remaining, setRemaining] = useState(() => getRemainingSeconds())

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getRemainingSeconds())
    }, 1000)
    return () => clearInterval(interval)
  }, [getRemainingSeconds])

  const isUrgent = remaining < 60
  const isWarning = remaining < 300 && remaining >= 60

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 font-mono text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors",
        isUrgent && "bg-red-50 text-red-600 animate-pulse",
        isWarning && "bg-amber-50 text-amber-600",
        !isUrgent && !isWarning && "bg-[#F3F4F6] text-[#374151]",
      )}
    >
      <Clock className="h-4 w-4" />
      <span>{formatSeconds(remaining)} left</span>
    </div>
  )
}
