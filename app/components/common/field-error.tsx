"use client"

interface FieldErrorProps {
  message?: string
  className?: string
}

export function FieldError({ message, className }: FieldErrorProps) {
  if (!message) return null
  return (
    <p className={`text-red-500 text-xs mt-1${className ? ` ${className}` : ""}`}>
      {message}
    </p>
  )
}
