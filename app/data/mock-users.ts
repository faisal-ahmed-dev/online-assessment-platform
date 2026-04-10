import { UserRole } from "@/app/config/enums"
import { UserModel } from "@/app/lib/models/user"

export const MOCK_EMPLOYER: UserModel = {
  id: "emp-001",
  email: "employer@akij.work",
  name: "HR Manager",
  refId: "EMP-2024-001",
  role: UserRole.Employer,
}

export const MOCK_CANDIDATES_USERS: UserModel[] = [
  {
    id: "cand-001",
    email: "candidate@akij.work",
    name: "Md. Naimur Rahman",
    refId: "CAND-2024-001",
    role: UserRole.Candidate,
  },
  {
    id: "cand-002",
    email: "alice@akij.work",
    name: "Alice Rahman",
    refId: "CAND-2024-002",
    role: UserRole.Candidate,
  },
]

export const MOCK_CANDIDATE = MOCK_CANDIDATES_USERS[0]
