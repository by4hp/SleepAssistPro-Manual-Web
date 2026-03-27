"use client"

import { useEffect, useState } from "react"
import { ChevronRight, Search, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Language } from "@/lib/docs-data"
import type { DocsDataByLanguage } from "@/lib/manual-content.types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
        search: "搜索文档...",
        noResults: "未找到相关内容",
        searchHint: "输入关键词后直接筛选目录",
        enterChapter: "进入本章",
        toggleTheme: "切换主题",
      }
    : {
        search: "Search docs...",
        noResults: "No results found",
        searchHint: "Type to filter the menu",
        enterChapter: "Open chapter",
        toggleTheme: "Toggle theme",
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
    onClose?.()
    setSearchQuery("")
  }

  const searchResults = searchQuery.trim()
    ? docsData.flatMap(section => {
        const results: Array<{ section: typeof section; item?: typeof section.items[0] }> = []

        if (section.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push({ section })
        }

        section.items.forEach(item => {
          if (
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.content.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            results.push({ section, item })
          }
          item.children?.forEach(child => {
            if (
              child.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              child.content.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
              results.push({ section, item: child })
            }
          })
        })

        return results
      }).slice(0, 8)
    : []

  const handleSearchSelect = (sectionId: string, itemId?: string) => {
    onNavigate(sectionId, itemId)
    setSearchQuery("")
    onClose?.()
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="border-b border-border/50 px-4 py-3 lg:hidden">
        <div className="flex items-center rounded-xl border border-border/60 bg-background/70 px-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            placeholder={copy.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 bg-transparent px-3 py-2 text-sm focus-visible:ring-0"
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{copy.searchHint}</p>
      </div>

      {/* Navigation — native scroll, fills remaining height */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin mt-0">
        {searchQuery.trim() ? (
          <div className="space-y-1">
            {searchResults.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">{copy.noResults}</p>
            ) : (
              searchResults.map((result, index) => (
                <button
                  key={`${result.section.id}-${result.item?.id || "main"}-${index}`}
                  onClick={() => handleSearchSelect(result.section.id, result.item?.id)}
                  className="pressable flex w-full flex-col items-start rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-primary/5"
                >
                  <span className="text-sm font-medium text-foreground">
                    {result.item?.title || result.section.title}
                  </span>
                  <span className="mt-0.5 text-xs text-muted-foreground">
                    {result.item ? result.section.title : copy.search}
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
                        ? "bg-primary/10"
                        : "hover:bg-primary/5"
                    )}
                  >
                    <button
                      onClick={() => handleSectionTitleClick(section.id)}
                      className={cn(
                        "pressable min-w-0 flex-1 rounded-lg px-1 py-1 text-left text-sm font-medium transition-colors",
                        isSectionActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
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
                    <div className="ml-3 mt-1 space-y-0.5 border-l border-border/40 pl-3">
                      {isMobile && (
                        <button
                          onClick={() => handleNavigate(section.id)}
                          className={cn(
                            "pressable flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-sm font-medium transition-colors",
                            activeSection === section.id && !activeItemId
                              ? "bg-primary/5 text-primary"
                              : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
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
                                ? "text-primary bg-primary/5"
                                : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
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
      <div className="shrink-0 border-t border-border/50 px-4 py-3">
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
      <aside className="hidden lg:flex lg:w-72 lg:shrink-0 lg:flex-col lg:border-r lg:border-border/50 lg:bg-card lg:overflow-hidden">
        <SidebarContent {...props} isMobile={false} />
      </aside>

      {/* Mobile dropdown */}
      <div
        className={cn(
          "absolute inset-x-0 inset-y-0 z-30 border-b border-border/60 bg-background/95 backdrop-blur-md transition duration-200 lg:hidden",
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
