"use client"

import { useEffect, useRef, useCallback } from "react"

interface UseExamTimerProps {
  durationSeconds: number
  startedAt: number
  onExpire: () => void
}

export function useExamTimer({
  durationSeconds,
  startedAt,
  onExpire,
}: UseExamTimerProps) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  const getRemainingSeconds = useCallback((): number => {
    const elapsed = Math.floor((Date.now() - startedAt) / 1000)
    return Math.max(0, durationSeconds - elapsed)
  }, [durationSeconds, startedAt])

  useEffect(() => {
    const tick = () => {
      if (getRemainingSeconds() <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        onExpireRef.current()
      }
    }
    intervalRef.current = setInterval(tick, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [getRemainingSeconds])

  return { getRemainingSeconds }
}
