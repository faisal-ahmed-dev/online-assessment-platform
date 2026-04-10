import { IUserRepository } from "@/app/lib/infrastructure/repositories/user.repository"
import { LoginSchema } from "@/app/lib/validators/auth.schema"
import { UserRole } from "@/app/config/enums"
import { routes } from "@/app/config/routes"
import { UserModel } from "@/app/lib/models/user"

export interface AuthResult {
  success: boolean
  user?: UserModel
  redirectTo?: string
  error?: string
}

export class AuthService {
  constructor(private readonly userRepo: IUserRepository) {}

  async signIn(data: LoginSchema, role: UserRole): Promise<AuthResult> {
    const user = await this.userRepo.findByCredentials(
      data.email,
      data.password,
      role,
    )
    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }
    const redirectTo =
      role === UserRole.Employer
        ? routes.employer.dashboard
        : routes.candidate.dashboard
    return { success: true, user, redirectTo }
  }

  getSignOutRedirect(role: UserRole): string {
    return role === UserRole.Employer
      ? routes.auth.employerSignIn
      : routes.auth.candidateSignIn
  }
}
