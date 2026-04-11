import Image from "next/image"
import Link from "next/link"

interface AppNavbarProps {
  rightSlot?: React.ReactNode
}

export function AppNavbar({ rightSlot }: AppNavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-white border-b border-[#E5E7EB]">
      <div className="h-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-[#1A1B2E] font-black text-xl tracking-tight">
              AK
              <span className="italic font-black text-[#6C3AE8]">i</span>J
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-[8px] font-bold text-[#1A1B2E] tracking-widest uppercase">
                RESOURCE
              </span>
              <span className="text-[6px] text-[#6B7280] tracking-wider uppercase">
                RECRUITING LIMITLESS
              </span>
            </div>
          </div>
        </Link>

        {/* Centered title */}
        <span className="hidden sm:block absolute left-1/2 -translate-x-1/2 text-[#1A1B2E] font-semibold text-lg">
          Akij Resource
        </span>

        {/* Right slot */}
        {rightSlot && <div className="flex items-center">{rightSlot}</div>}
      </div>
    </header>
  )
}
