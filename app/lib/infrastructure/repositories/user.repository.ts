import { UserModel } from "@/app/lib/models/user"
import { UserRole } from "@/app/config/enums"

export interface IUserRepository {
  findByCredentials(
    email: string,
    password: string,
    role: UserRole,
  ): Promise<UserModel | null>
}
