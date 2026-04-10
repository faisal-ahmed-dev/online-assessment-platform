import { Phone, Mail } from "lucide-react"
import { HELPLINE } from "@/app/config/constants"

export function AppFooter() {
  return (
    <footer className="h-20 bg-[#1A1B2E]">
      <div className="h-full max-w-screen-xl mx-auto px-20 flex items-center justify-between">
        {/* Powered by */}
        <div className="flex items-center gap-2">
          <span className="text-[#9CA3AF] text-sm">Powered by</span>
          <div className="flex items-center gap-1">
            <span className="text-white font-black text-base tracking-tight">
              AK
              <span className="italic font-black text-[#6C3AE8]">i</span>J
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-[7px] font-bold text-white tracking-widest uppercase">
                RESOURCE
              </span>
              <span className="text-[5.5px] text-[#9CA3AF] tracking-wider uppercase">
                RECRUITING LIMITLESS
              </span>
            </div>
          </div>
        </div>

        {/* Helpline */}
        <div className="flex items-center gap-6">
          <span className="text-[#9CA3AF] text-sm">Helpline</span>
          <a
            href={`tel:${HELPLINE.phone}`}
            className="flex items-center gap-2 text-white text-sm hover:text-[#6C3AE8] transition-colors"
          >
            <Phone className="h-5 w-5" />
            {HELPLINE.phone}
          </a>
          <a
            href={`mailto:${HELPLINE.email}`}
            className="flex items-center gap-2 text-white text-sm hover:text-[#6C3AE8] transition-colors"
          >
            <Mail className="h-5 w-5" />
            {HELPLINE.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
