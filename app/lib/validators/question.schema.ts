import { z } from "zod"
import { requiredString } from "./common-rules"
import { QuestionType } from "@/app/config/enums"

export const questionSchema = z
  .object({
    title: requiredString,
    type: z.nativeEnum(QuestionType, {
      errorMap: () => ({ message: "Please select a question type" }),
    }),
    options: z.array(z.string()).default([]),
    points: z.coerce.number().min(1).default(1),
  })
  .refine(
    (data) => {
      if (data.type !== QuestionType.Text) {
        return data.options.filter(Boolean).length >= 2
      }
      return true
    },
    {
      message: "At least 2 options are required for this question type",
      path: ["options"],
    },
  )

export type QuestionSchema = z.infer<typeof questionSchema>
