"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, X } from "lucide-react"
import { BehaviorEventModel } from "@/app/lib/models/exam-session"
import { BehaviorEventType } from "@/app/config/enums"
import { cn } from "@/lib/utils"

const EVENT_MESSAGES: Record<string, string> = {
  [BehaviorEventType.TabSwitch]: "Tab switch detected",
  [BehaviorEventType.FullscreenExit]: "Fullscreen exit detected",
  [BehaviorEventType.WindowBlur]: "Window focus lost",
}

interface BehaviorWarningToastProps {
  events: BehaviorEventModel[]
}

export function BehaviorWarningToast({ events }: BehaviorWarningToastProps) {
  const [visible, setVisible] = useState(false)
  const [lastEvent, setLastEvent] = useState<BehaviorEventModel | null>(null)
  const prevCountRef = useState(() =>
    events.reduce((acc, e) => acc + e.count, 0),
  )[0]

  const totalCount = events.reduce((acc, e) => acc + e.count, 0)

  useEffect(() => {
    if (totalCount === 0) return

    // Find the most recently updated event
    const sorted = [...events].sort((a, b) => b.timestamp - a.timestamp)
    setLastEvent(sorted[0])
    setVisible(true)

    const timer = setTimeout(() => setVisible(false), 4000)
    return () => clearTimeout(timer)
  }, [totalCount])

  if (!visible || !lastEvent) return null

  const message = EVENT_MESSAGES[lastEvent.type] ?? "Suspicious activity detected"

  return (
    <div
      className={cn(
        "fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3",
        "bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-5 py-3 shadow-lg",
        "animate-in slide-in-from-top-2 duration-300",
      )}
    >
      <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
      <div>
        <p className="text-sm font-semibold">
          {message}{" "}
          <span className="font-normal">({lastEvent.count}×)</span>
        </p>
        <p className="text-xs text-amber-600">
          This activity has been recorded and reported.
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="text-amber-500 hover:text-amber-700 ml-2"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
