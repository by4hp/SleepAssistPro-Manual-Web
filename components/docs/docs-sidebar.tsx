"use client"

import { useEffect, useState } from "react"
import { ChevronRight, Moon, Search, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import type { DocItem, DocSection, Language } from "@/lib/docs-data"
import type { DocsDataByLanguage } from "@/lib/manual-content.types"
import { Button } from "@/components/ui/button"
import { DocsLanguageMenu } from "@/components/docs/docs-language-menu"

interface DocsSidebarProps {
  activeSection: string
  activeItemId: string
  onNavigate: (sectionId: string, itemId?: string) => void
  isDark?: boolean
  onToggleTheme?: () => void
  language?: Language
  onSelectLanguage?: (language: Language) => void
  mobileOpen?: boolean
  onMobileOpenChange?: (open: boolean) => void
  docsDataByLanguage: DocsDataByLanguage
}

interface SidebarSearchResult {
  sectionId: string
  itemId?: string
  title: string
  meta: string
  content: string
}

function sanitizeSearchContent(content: string) {
  return content
    .replace(/\{\{download-button\|[^|]+\|([^|]+)\|([^}]+)\}\}/g, "$1 $2")
    .replace(/\{\{jump-link\|([^|]+)\|[^|]+\|[^}]+\}\}/g, "$1")
    .replace(/\{\{image-row\|([^|]*)\|[^|]+\|([^|]*)\|[^}]+\}\}/g, "$1 $2")
    .replace(/!\[(.*?)\]\((.+?)\)/g, " $1 ")
    .replace(/\s+/g, " ")
    .trim()
}

function SidebarContent({
  activeSection,
  activeItemId,
  onNavigate,
  isDark,
  onToggleTheme,
  language = "zh",
  onSelectLanguage,
  onClose,
  isMobile = false,
  docsDataByLanguage,
}: DocsSidebarProps & { onClose?: () => void; isMobile?: boolean }) {
  const [expandedSections, setExpandedSections] = useState<string[]>([activeSection])
  const [searchQuery, setSearchQuery] = useState("")
  const docsData = docsDataByLanguage[language]

  const copy = language === "zh"
    ? {
        enterChapter: "进入本章",
        toggleTheme: "切换主题",
        search: "搜索文档...",
        noResults: "未找到相关内容",
      }
    : {
        enterChapter: "Open chapter",
        toggleTheme: "Toggle theme",
        search: "Search docs...",
        noResults: "No results found",
      }

  useEffect(() => {
    setExpandedSections((prev) => (prev.includes(activeSection) ? prev : [...prev, activeSection]))
  }, [activeSection])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
    )
  }

  const handleSectionTitleClick = (sectionId: string) => {
    onNavigate(sectionId)
    toggleSection(sectionId)
  }

  const handleNavigate = (sectionId: string, itemId?: string) => {
    onNavigate(sectionId, itemId)
    setSearchQuery("")
    onClose?.()
  }

  const buildSearchResults = () => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return [] as SidebarSearchResult[]

    const results: SidebarSearchResult[] = []

    const pushResult = ({
      section,
      item,
      parentItem,
    }: {
      section: DocSection
      item?: DocItem
      parentItem?: DocItem
    }) => {
      const title = item?.title || section.title
      const content = item?.content || section.description || ""
      const haystack = `${title} ${sanitizeSearchContent(content)}`.toLowerCase()
      if (!haystack.includes(query)) return

      results.push({
        sectionId: section.id,
        itemId: item?.id,
        title,
        meta: parentItem ? `${section.title} · ${parentItem.title}` : section.title,
        content,
      })
    }

    docsData.forEach((section) => {
      pushResult({ section })

      section.items.forEach((item) => {
        pushResult({ section, item })

        item.children?.forEach((child) => {
          pushResult({ section, item: child, parentItem: item })
        })
      })
    })

    const seen = new Set<string>()
    return results.filter((result) => {
      const key = `${result.sectionId}-${result.itemId || "section"}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    }).slice(0, 8)
  }

  const searchResults = buildSearchResults()

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {isMobile && (
        <div className="shrink-0 px-4 pb-2 pt-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground dark:text-[#A0A6AE]" />
            <Input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={copy.search}
              className="h-10 rounded-xl border-border/60 bg-background pl-9 dark:border-[#39434F] dark:bg-[#060C13]"
            />
          </div>
        </div>
      )}

      {/* Navigation — native scroll, fills remaining height */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin mt-0">
        {isMobile && searchQuery.trim() ? (
          <div className="space-y-1 px-1">
            {searchResults.length === 0 ? (
              <p className="rounded-xl px-3 py-4 text-sm text-muted-foreground dark:text-[#A0A6AE]">
                {copy.noResults}
              </p>
            ) : (
              searchResults.map((result, index) => (
                <button
                  key={`${result.sectionId}-${result.itemId || "section"}-${index}`}
                  onClick={() => handleNavigate(result.sectionId, result.itemId)}
                  className="pressable flex w-full flex-col items-start rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-primary/5 dark:hover:bg-[#1B232D]"
                >
                  <span className="text-sm font-medium text-foreground">{result.title}</span>
                  <span className="mt-0.5 text-xs text-muted-foreground dark:text-[#A0A6AE]">
                    {result.meta}
                  </span>
                </button>
              ))
            )}
          </div>
        ) : (
        <div className="space-y-1">
          {docsData.map((section) => {
            const isSectionExpanded = expandedSections.includes(section.id)
            const isSectionActive = activeSection === section.id

            return (
              <div key={section.id}>
                {/* Section row */}
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-2 py-1.5",
                    isSectionActive
                      ? "bg-primary/10 dark:bg-[#0E303F]"
                      : "hover:bg-primary/5 dark:hover:bg-[#1B232D]"
                  )}
                >
                  <button
                    onClick={() => handleSectionTitleClick(section.id)}
                    className={cn(
                      "pressable min-w-0 flex-1 rounded-lg px-1 py-1 text-left text-sm font-medium transition-colors",
                      isSectionActive
                        ? "text-primary dark:text-[#4197B5]"
                        : "text-muted-foreground hover:text-foreground dark:text-[#A0A6AE] dark:hover:text-white"
                    )}
                  >
                    <span className="block truncate">{section.title}</span>
                  </button>
                  <button
                    type="button"
                    aria-label={
                      language === "zh"
                        ? isSectionExpanded
                          ? `收起 ${section.title}`
                          : `展开 ${section.title}`
                        : isSectionExpanded
                          ? `Collapse ${section.title}`
                          : `Expand ${section.title}`
                    }
                    aria-expanded={isSectionExpanded}
                    onClick={() => toggleSection(section.id)}
                    className={cn(
                      "pressable flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-background/80 hover:text-foreground",
                      "dark:text-[#A0A6AE] dark:hover:bg-[#1B232D] dark:hover:text-white",
                      isSectionExpanded && "text-foreground"
                    )}
                  >
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isSectionExpanded && "rotate-90"
                      )}
                    />
                  </button>
                </div>

                {/* Section items */}
                {isSectionExpanded && (
                  <div className="ml-3 mt-1 space-y-0.5 pl-3">
                    {isMobile && (
                      <button
                        onClick={() => handleNavigate(section.id)}
                        className={cn(
                          "pressable flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-sm font-medium transition-colors",
                          activeSection === section.id && !activeItemId
                            ? "bg-primary/5 text-primary dark:bg-[#0E303F] dark:text-[#4197B5]"
                            : "text-muted-foreground hover:bg-primary/5 hover:text-foreground dark:text-[#A0A6AE] dark:hover:bg-[#1B232D] dark:hover:text-white"
                        )}
                      >
                        <span className="truncate">{copy.enterChapter}</span>
                      </button>
                    )}
                    {section.items.map((item) => {
                      const isItemActive = activeItemId === item.id
                      const hasActiveChild = item.children?.some(c => c.id === activeItemId) ?? false

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavigate(section.id, item.id)}
                          className={cn(
                            "pressable flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-sm font-medium transition-colors",
                            isItemActive || hasActiveChild
                              ? "bg-primary/5 text-primary dark:bg-[#0E303F] dark:text-[#4197B5]"
                              : "text-muted-foreground hover:bg-primary/5 hover:text-foreground dark:text-[#A0A6AE] dark:hover:bg-[#1B232D] dark:hover:text-white"
                          )}
                        >
                          <span className="truncate">{item.title}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        )}
      </nav>

      {/* Footer */}
      <div className="shrink-0 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {language === "zh" ? "版本 1.0.0" : "Version 1.0.0"} · © 2026 Sleep Assist® Pro
          </p>
          {isMobile && (
            <div className="flex items-center gap-2">
              <DocsLanguageMenu
                language={language}
                uiLanguage={language}
                onSelectLanguage={(nextLanguage) => onSelectLanguage?.(nextLanguage)}
                onAfterSelect={onClose}
                variant="ghost"
                size="sm"
                className="px-2"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleTheme}
                className="h-9 w-9"
                aria-label={copy.toggleTheme}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function DocsSidebar(props: DocsSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-72 lg:shrink-0 lg:flex-col lg:bg-card lg:overflow-hidden dark:bg-[#0F171F]">
        <SidebarContent {...props} isMobile={false} />
      </aside>

      {/* Mobile dropdown */}
      <div
        className={cn(
          "absolute inset-x-0 inset-y-0 z-30 bg-background/95 backdrop-blur-md transition duration-200 lg:hidden dark:bg-[#0F171F]",
          props.mobileOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        )}
        aria-hidden={!props.mobileOpen}
      >
        <SidebarContent
          {...props}
          isMobile
          onClose={() => props.onMobileOpenChange?.(false)}
        />
      </div>
    </>
  )
}
