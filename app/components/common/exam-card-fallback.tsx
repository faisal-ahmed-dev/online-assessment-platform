// Fallback skeleton used before boneyard bones are generated (first run)
export function ExamCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 animate-pulse">
      <div className="h-5 bg-[#E5E7EB] rounded w-3/4 mb-5" />
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-[#E5E7EB] rounded w-1/2" />
        <div className="h-4 bg-[#E5E7EB] rounded w-2/5" />
        <div className="h-4 bg-[#E5E7EB] rounded w-1/3" />
      </div>
      <div className="h-10 bg-[#E5E7EB] rounded w-40" />
    </div>
  )
}

// Fallback for the full exam screen (two-column layout: navigator sidebar + question card)
export function ExamScreenFallback() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6] animate-pulse">
      {/* Navbar */}
      <div className="h-20 bg-white border-b border-[#E5E7EB] shrink-0" />

      <main className="flex-1 pt-24 pb-8">
        <div className="max-w-screen-xl mx-auto px-20">
          <div className="flex gap-6">
            {/* Question navigator sidebar */}
            <div className="w-52 shrink-0 space-y-3">
              <div className="h-4 bg-[#E5E7EB] rounded w-2/3" />
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-9 w-9 bg-[#E5E7EB] rounded" />
                ))}
              </div>
            </div>

            {/* Question card */}
            <div className="flex-1 space-y-6">
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 space-y-6">
                {/* Question number + title */}
                <div className="space-y-3">
                  <div className="h-4 bg-[#E5E7EB] rounded w-24" />
                  <div className="h-6 bg-[#E5E7EB] rounded w-4/5" />
                  <div className="h-6 bg-[#E5E7EB] rounded w-3/5" />
                </div>

                {/* Radio options */}
                <div className="space-y-4 pt-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#E5E7EB] shrink-0" />
                      <div className="h-4 bg-[#E5E7EB] rounded flex-1" style={{ maxWidth: `${60 + i * 8}%` }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center justify-between">
                <div className="h-12 w-32 bg-[#E5E7EB] rounded" />
                <div className="flex gap-3">
                  <div className="h-12 w-36 bg-[#E5E7EB] rounded" />
                  <div className="h-12 w-28 bg-[#6C3AE8]/20 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="h-16 bg-[#1A1B2E]" />
    </div>
  )
}

// Fallback for the exam completed page (centered success card)
export function ExamCompletedFallback() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6] animate-pulse">
      {/* Navbar */}
      <div className="h-20 bg-white border-b border-[#E5E7EB] shrink-0" />

      <main className="flex-1 flex items-center justify-center pt-20 pb-20">
        <div className="text-center max-w-lg px-4 space-y-6">
          {/* Circle icon placeholder */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-[#E5E7EB]" />
          </div>

          {/* Title */}
          <div className="h-9 bg-[#E5E7EB] rounded w-56 mx-auto" />

          {/* Body text */}
          <div className="space-y-2">
            <div className="h-4 bg-[#E5E7EB] rounded w-4/5 mx-auto" />
            <div className="h-4 bg-[#E5E7EB] rounded w-3/5 mx-auto" />
          </div>

          {/* Button */}
          <div className="h-12 bg-[#6C3AE8]/20 rounded w-48 mx-auto" />
        </div>
      </main>

      {/* Footer */}
      <div className="h-16 bg-[#1A1B2E]" />
    </div>
  )
}
