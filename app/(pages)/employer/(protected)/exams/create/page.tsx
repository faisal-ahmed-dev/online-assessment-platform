import type { Metadata } from "next"
import { CreateExam } from "./create"

export const metadata: Metadata = {
  title: "Create Online Test — Employer | Akij Resource",
}

export default function CreateExamPage() {
  return <CreateExam />
}
