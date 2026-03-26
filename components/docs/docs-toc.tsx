"use client"

import { cn } from "@/lib/utils"
import { getDocsData, type Language } from "@/lib/docs-data"

interface DocsTocProps {
  activeSection: string
  activeItemId: string
  onNavigate: (sectionId: string, itemId?: string) => void
  language: Language
}

export function DocsToc({ activeSection, activeItemId, onNavigate, language }: DocsTocProps) {
  const docsData = getDocsData(language)
  const currentSection = docsData.find(s => s.id === activeSection)
  if (!currentSection) return null
  if (activeSection === "quick-start" && !activeItemId) return null

  // Find the active top-level item — child ids map back to their parent page.
  const activeTopItem = currentSection.items.find(
    item => item.id === activeItemId || item.children?.some(c => c.id === activeItemId)
  )
  const tocItems = activeTopItem
    ? (activeTopItem.children ?? [])
    : currentSection.items

  if (tocItems.length === 0) return null

  const handleTocClick = (itemId: string) => {
    if (activeTopItem?.children?.some((child) => child.id === itemId)) {
      document.getElementById(itemId)?.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }

    onNavigate(activeSection, itemId)
  }

  return (
    <aside className="hidden w-56 shrink-0 xl:block">
      <div className="sticky top-8 pr-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {activeTopItem
            ? language === "zh" ? "本页目录" : "On This Page"
            : language === "zh" ? "本章内容" : "In This Chapter"}
        </h3>
        <nav className="space-y-0.5">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTocClick(item.id)}
              className={cn(
                "pressable block w-full truncate rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors",
                activeItemId === item.id
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
              )}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
