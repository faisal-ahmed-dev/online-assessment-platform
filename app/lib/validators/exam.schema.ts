import { z } from "zod"
import { requiredString, requiredNumber, isoDateTimeString } from "./common-rules"
import { QuestionType } from "@/app/config/enums"

export const examBasicInfoSchema = z
  .object({
    title: requiredString,
    totalCandidates: requiredNumber,
    totalSlots: requiredNumber,
    totalQuestionSet: requiredNumber,
    questionType: z.nativeEnum(QuestionType, {
      errorMap: () => ({ message: "Please select a question type" }),
    }),
    startTime: isoDateTimeString,
    endTime: isoDateTimeString,
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "End time must be after start time",
    path: ["endTime"],
  })

export type ExamBasicInfoSchema = z.infer<typeof examBasicInfoSchema>
