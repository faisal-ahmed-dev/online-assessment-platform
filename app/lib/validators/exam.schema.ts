import { z } from "zod"
import { requiredString, requiredNumber, isoDateTimeString } from "./common-rules"
import { QuestionType } from "@/app/config/enums"

export const examBasicInfoSchema = z
  .object({
    title: requiredString,
    totalCandidates: requiredNumber,
    totalSlots: requiredNumber,
    questionType: z.nativeEnum(QuestionType, {
      errorMap: () => ({ message: "Please select a question type" }),
    }),
    startTime: isoDateTimeString,
    endTime: isoDateTimeString,
    durationMinutes: requiredNumber,
    negativeMarkingValue: z.coerce.number().min(0).default(0),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "End time must be after start time",
    path: ["endTime"],
  })

export type ExamBasicInfoSchema = z.infer<typeof examBasicInfoSchema>
