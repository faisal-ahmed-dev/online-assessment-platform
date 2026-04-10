import { IUserRepository } from "../repositories/user.repository"
import { MOCK_EMPLOYER, MOCK_CANDIDATE } from "@/app/data/mock-users"
import {
  MOCK_EMPLOYER_CREDENTIALS,
  MOCK_CANDIDATE_CREDENTIALS,
} from "@/app/config/constants"
import { UserRole } from "@/app/config/enums"
import { UserModel } from "@/app/lib/models/user"

export class MockUserRepository implements IUserRepository {
  async findByCredentials(
    email: string,
    password: string,
    role: UserRole,
  ): Promise<UserModel | null> {
    const credentials =
      role === UserRole.Employer
        ? MOCK_EMPLOYER_CREDENTIALS
        : MOCK_CANDIDATE_CREDENTIALS

    const user =
      role === UserRole.Employer ? MOCK_EMPLOYER : MOCK_CANDIDATE

    if (email === credentials.email && password === credentials.password) {
      return user
    }
    return null
  }
}
