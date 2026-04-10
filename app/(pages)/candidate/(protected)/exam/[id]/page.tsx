import { ExamScreen } from "./exam"

export default async function ExamPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ExamScreen examId={id} />
}
