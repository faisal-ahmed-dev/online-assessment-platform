"use client"

import { ChevronDown, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserModel } from "@/app/lib/models/user"

interface UserDropdownProps {
  user: UserModel
  onLogout: () => void
}

export function UserDropdown({ user, onLogout }: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 hover:bg-[#F3F4F6] rounded-lg px-3 py-2 transition-colors">
          <div className="text-right">
            <p className="text-sm font-medium text-[#111827] leading-none">
              {user.name}
            </p>
            <p className="text-xs text-[#6B7280] mt-0.5">{user.refId}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-[#6B7280]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-3 py-2">
          <p className="text-sm font-medium text-[#111827]">{user.name}</p>
          <p className="text-xs text-[#6B7280]">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className="text-red-600 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
