import { BaseModel } from "./base"
import { UserRole } from "@/app/config/enums"

export interface UserModel extends BaseModel {
  email: string
  name: string
  refId: string
  role: UserRole
}
