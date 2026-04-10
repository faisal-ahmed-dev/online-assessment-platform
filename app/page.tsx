import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { AUTH_COOKIE_KEY } from "@/app/config/constants"
import { routes } from "@/app/config/routes"
import { UserRole } from "@/app/config/enums"

export default async function RootPage() {
  const cookieStore = await cookies()
  const role = cookieStore.get(AUTH_COOKIE_KEY)?.value

  if (role === UserRole.Employer) {
    redirect(routes.employer.dashboard)
  }

  if (role === UserRole.Candidate) {
    redirect(routes.candidate.dashboard)
  }

  redirect(routes.auth.employerSignIn)
}
