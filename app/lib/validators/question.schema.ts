import { z } from "zod"
import { requiredString } from "./common-rules"
import { QuestionType } from "@/app/config/enums"

/** Strip HTML tags and return plain text — used to validate rich-text option fields */
const textContent = (html: string) => html.replace(/<[^>]*>/g, "").trim()

export const questionSchema = z
  .object({
    title: requiredString,
    type: z.nativeEnum(QuestionType, {
      errorMap: () => ({ message: "Please select a question type" }),
    }),
    options: z.array(z.string()).default([]),
    points: z.coerce.number().min(1).default(1),
    correctAnswer: z.string().default(""),
  })
  .refine(
    (data) => {
      if (data.type !== QuestionType.Text) {
        return data.options.filter((o) => textContent(o).length > 0).length >= 2
      }
      return true
    },
    {
      message: "At least 2 options are required for this question type",
      path: ["options"],
    },
  )

export type QuestionSchema = z.infer<typeof questionSchema>
