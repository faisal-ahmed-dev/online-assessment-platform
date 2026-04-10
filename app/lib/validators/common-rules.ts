import { z } from "zod"

export const requiredString = z.string().min(1, "This field is required")
export const optionalString = z.string().optional()
export const requiredNumber = z.coerce.number().min(1, "Must be at least 1")
export const isoDateTimeString = z.string().min(1, "Date/time is required")
