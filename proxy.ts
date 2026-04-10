import { NextRequest, NextResponse } from "next/server"
import { AUTH_COOKIE_KEY } from "@/app/config/constants"
import { UserRole } from "@/app/config/enums"
import { routes } from "@/app/config/routes"

const PUBLIC_PATHS = [
  routes.auth.employerSignIn,
  routes.auth.candidateSignIn,
  "/",
]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const role = request.cookies.get(AUTH_COOKIE_KEY)?.value as
    | UserRole
    | undefined

  // Allow public paths
  if (PUBLIC_PATHS.some((p) => pathname === p)) {
    return NextResponse.next()
  }

  // No auth cookie → redirect to appropriate signin
  if (!role) {
    if (pathname.startsWith("/employer")) {
      return NextResponse.redirect(
        new URL(routes.auth.employerSignIn, request.url),
      )
    }
    if (pathname.startsWith("/candidate")) {
      return NextResponse.redirect(
        new URL(routes.auth.candidateSignIn, request.url),
      )
    }
    return NextResponse.redirect(
      new URL(routes.auth.employerSignIn, request.url),
    )
  }

  // Prevent cross-panel access
  if (role === UserRole.Candidate && pathname.startsWith("/employer")) {
    return NextResponse.redirect(
      new URL(routes.candidate.dashboard, request.url),
    )
  }
  if (role === UserRole.Employer && pathname.startsWith("/candidate")) {
    return NextResponse.redirect(
      new URL(routes.employer.dashboard, request.url),
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|bones).*)"],
}
