"use client"

import { useEffect, useCallback } from "react"
import { BehaviorEventType } from "@/app/config/enums"

interface UseBehaviorTrackerProps {
  isActive: boolean
  onEvent: (type: BehaviorEventType) => void
}

export function useBehaviorTracker({
  isActive,
  onEvent,
}: UseBehaviorTrackerProps) {
  useEffect(() => {
    if (!isActive) return

    const handleVisibilityChange = () => {
      if (document.hidden) onEvent(BehaviorEventType.TabSwitch)
    }
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) onEvent(BehaviorEventType.FullscreenExit)
    }
    const handleBlur = () => onEvent(BehaviorEventType.WindowBlur)

    document.addEventListener("visibilitychange", handleVisibilityChange)
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    window.addEventListener("blur", handleBlur)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      window.removeEventListener("blur", handleBlur)
    }
  }, [isActive, onEvent])

  const requestFullscreen = useCallback(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {})
    }
  }, [])

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {})
    }
  }, [])

  return { requestFullscreen, exitFullscreen }
}
