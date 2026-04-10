"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronDown,
} from "lucide-react"

interface RichTextEditorProps {
  defaultValue?: string
  onChange?: (html: string) => void
  placeholder?: string
  minHeight?: string
  /** Pass a new key to force-reset the editor content */
  resetKey?: number | string
}

export function RichTextEditor({
  defaultValue = "",
  onChange,
  placeholder = "Enter text here...",
  minHeight = "80px",
  resetKey,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [showStyleMenu, setShowStyleMenu] = useState(false)
  const [showAlignMenu, setShowAlignMenu] = useState(false)

  // Seed initial content
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = defaultValue
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]) // Re-run only when reset is requested

  const exec = useCallback(
    (command: string, value?: string) => {
      editorRef.current?.focus()
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      document.execCommand(command, false, value ?? undefined)
      onChange?.(editorRef.current?.innerHTML ?? "")
    },
    [onChange],
  )

  const handleInput = () => {
    onChange?.(editorRef.current?.innerHTML ?? "")
  }

  const closeMenus = () => {
    setShowStyleMenu(false)
    setShowAlignMenu(false)
  }

  return (
    <div className="border border-[#E5E7EB] rounded-lg overflow-visible">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1.5 bg-[#F9FAFB] border-b border-[#E5E7EB] flex-wrap rounded-t-lg">
        {/* Undo / Redo */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); exec("undo") }}
          className="p-1 text-[#6B7280] hover:text-[#111827] transition-colors"
          title="Undo"
        >
          <Undo2 className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); exec("redo") }}
          className="p-1 text-[#6B7280] hover:text-[#111827] transition-colors"
          title="Redo"
        >
          <Redo2 className="h-3.5 w-3.5" />
        </button>

        <span className="w-px h-4 bg-[#E5E7EB] mx-1" />

        {/* Text style dropdown */}
        <div className="relative">
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); setShowStyleMenu((v) => !v); setShowAlignMenu(false) }}
            className="flex items-center gap-1 px-2 py-0.5 text-xs text-[#374151] border border-[#E5E7EB] rounded bg-white hover:bg-[#F3F4F6] transition-colors"
          >
            Normal text <ChevronDown className="h-3 w-3" />
          </button>
          {showStyleMenu && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50 min-w-[130px]">
              {(
                [
                  { label: "Normal text", tag: "p" },
                  { label: "Heading 1", tag: "h1" },
                  { label: "Heading 2", tag: "h2" },
                  { label: "Heading 3", tag: "h3" },
                ] as const
              ).map(({ label, tag }) => (
                <button
                  key={tag}
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); exec("formatBlock", tag); closeMenus() }}
                  className="block w-full text-left px-3 py-1.5 text-xs text-[#374151] hover:bg-[#F3F4F6] first:rounded-t-lg last:rounded-b-lg"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Align dropdown */}
        <div className="relative ml-1">
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); setShowAlignMenu((v) => !v); setShowStyleMenu(false) }}
            className="flex items-center gap-0.5 px-1.5 py-0.5 text-xs text-[#374151] border border-[#E5E7EB] rounded bg-white hover:bg-[#F3F4F6] transition-colors"
            title="Text alignment"
          >
            <AlignLeft className="h-3 w-3" />
            <ChevronDown className="h-3 w-3" />
          </button>
          {showAlignMenu && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50 min-w-[100px]">
              <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("justifyLeft"); closeMenus() }} className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-[#374151] hover:bg-[#F3F4F6] rounded-t-lg"><AlignLeft className="h-3 w-3" /> Left</button>
              <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("justifyCenter"); closeMenus() }} className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-[#374151] hover:bg-[#F3F4F6]"><AlignCenter className="h-3 w-3" /> Center</button>
              <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("justifyRight"); closeMenus() }} className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-[#374151] hover:bg-[#F3F4F6] rounded-b-lg"><AlignRight className="h-3 w-3" /> Right</button>
            </div>
          )}
        </div>

        <span className="w-px h-4 bg-[#E5E7EB] mx-1" />

        {/* Bold */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); exec("bold") }}
          className="p-1 text-[#6B7280] hover:text-[#111827] transition-colors font-bold"
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-3.5 w-3.5" />
        </button>

        {/* Italic */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); exec("italic") }}
          className="p-1 text-[#6B7280] hover:text-[#111827] transition-colors"
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Editable content area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onClick={closeMenus}
        data-placeholder={placeholder}
        style={{ minHeight }}
        className="px-3 py-2 text-sm text-[#111827] focus:outline-none bg-white rounded-b-lg
          [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-[#9CA3AF] [&:empty]:before:pointer-events-none"
      />
    </div>
  )
}
