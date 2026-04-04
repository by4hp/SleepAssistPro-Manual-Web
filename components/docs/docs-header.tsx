"use client"

import { Fragment, useEffect, useState } from "react"
import { Search, Menu, X, ScrollText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { DocItem, DocSection, Language } from "@/lib/docs-data"
import type { DocsDataByLanguage } from "@/lib/manual-content.types"
import { DocsLanguageMenu } from "@/components/docs/docs-language-menu"

interface DocsHeaderProps {
  onNavigate: (sectionId: string, itemId?: string) => void
  language: Language
  onSelectLanguage: (language: Language) => void
  mobileMenuOpen?: boolean
  onToggleMobileMenu?: () => void
  docsDataByLanguage: DocsDataByLanguage
  isReaderMode?: boolean
  onToggleReaderMode: () => void
}

interface SearchResult {
  sectionId: string
  sectionTitle: string
  itemId?: string
  title: string
  content: string
  meta: string
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
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

function getMatchPreview(content: string, query: string) {
  const normalized = sanitizeSearchContent(content)
  if (!normalized) return ""

  const lowerContent = normalized.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const matchIndex = lowerContent.indexOf(lowerQuery)

  if (matchIndex === -1) {
    return normalized.slice(0, 96) + (normalized.length > 96 ? "..." : "")
  }

  const start = Math.max(0, matchIndex - 32)
  const end = Math.min(normalized.length, matchIndex + query.length + 64)
  const prefix = start > 0 ? "..." : ""
  const suffix = end < normalized.length ? "..." : ""
  return `${prefix}${normalized.slice(start, end).trim()}${suffix}`
}

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text

  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, "ig"))
  return parts.map((part, index) => {
    if (part.toLowerCase() === query.toLowerCase()) {
      return (
        <mark
          key={`${part}-${index}`}
          className="rounded bg-primary/15 px-0.5 text-foreground dark:bg-[#0E303F] dark:text-[#4197B5]"
        >
          {part}
        </mark>
      )
    }

    return <Fragment key={`${part}-${index}`}>{part}</Fragment>
  })
}

export function DocsHeader({
  onNavigate,
  language,
  onSelectLanguage,
  mobileMenuOpen,
  onToggleMobileMenu,
  docsDataByLanguage,
  isReaderMode = false,
  onToggleReaderMode,
}: DocsHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const docsData = docsDataByLanguage[language]

  const copy = language === "zh"
    ? {
        manual: "用户手册",
        openMenu: "打开菜单",
        closeMenu: "关闭菜单",
        search: "搜索文档...",
        searchTitle: "搜索文档",
        searchDescription: "搜索 Sleep Assist® Pro 用户文档的所有内容",
        noResults: "未找到相关内容",
        quickJump: "快速跳转",
        readerMode: "长页阅读",
        defaultMode: "默认阅读",
      }
    : {
        manual: "User Manual",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        search: "Search docs...",
        searchTitle: "Search docs",
        searchDescription: "Search across the Sleep Assist® Pro user manual",
        noResults: "No results found",
        quickJump: "Quick jump",
        readerMode: "Reader mode",
        defaultMode: "Default view",
      }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k"
      if (!isShortcut) return

      const target = event.target as HTMLElement | null
      const isTypingTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable

      if (isTypingTarget) return
      if (window.innerWidth < 1024) return

      event.preventDefault()
      setSearchOpen(true)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const buildSearchResults = () => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return [] as SearchResult[]

    const results: SearchResult[] = []

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
        sectionTitle: section.title,
        itemId: item?.id,
        title,
        content,
        meta: parentItem ? `${section.title} · ${parentItem.title}` : section.title,
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

  const handleSearchSelect = (sectionId: string, itemId?: string) => {
    onNavigate(sectionId, itemId)
    setSearchOpen(false)
    setSearchQuery("")
  }

  const handleGoHome = () => {
    onNavigate("quick-start")
  }

  return (
    <header className="site-chrome sticky top-0 z-40 bg-background/80 backdrop-blur-sm dark:bg-[#060C13]">
      <div aria-hidden="true" className="h-[env(safe-area-inset-top)] lg:hidden" />

      {/* Mobile Header */}
      <div className="flex h-14 items-center justify-between px-4 lg:hidden">
        <button
          type="button"
          onClick={handleGoHome}
          className="pressable flex items-center gap-3 rounded-lg transition-opacity hover:opacity-85"
        >
          <img
            src="/sleepassistpro-logo.svg"
            alt="Sleep Assist® Pro"
            className="h-8 w-8 shrink-0 rounded-lg"
          />
          <span className="text-xs text-muted-foreground">{copy.manual}</span>
        </button>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleReaderMode}
            className="h-9 w-9"
          >
            <ScrollText className="h-4 w-4" />
            <span className="sr-only">{isReaderMode ? copy.defaultMode : copy.readerMode}</span>
          </Button>
          {!isReaderMode && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleMobileMenu}
              className="h-9 w-9"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">{mobileMenuOpen ? copy.closeMenu : copy.openMenu}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex lg:h-14 lg:items-stretch">
        {/* Logo - Desktop only */}
        <button
          type="button"
          onClick={handleGoHome}
          className="pressable items-center gap-3 px-6 text-left transition-opacity hover:opacity-85 lg:flex lg:w-72 lg:shrink-0 dark:bg-[#0F171F]"
        >
          <img
            src="/sleepassistpro-logo.svg"
            alt="Sleep Assist® Pro"
            className="h-9 w-9 shrink-0 rounded-xl shadow-sm"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">Sleep Assist® Pro</span>
            <span className="text-xs text-muted-foreground">{copy.manual}</span>
          </div>
        </button>

        {/* Search & Actions - Desktop only */}
        <div className="flex flex-1 items-center px-6 lg:grid lg:h-14 lg:grid-cols-[1fr_minmax(18rem,32rem)_1fr] lg:gap-4">
          <div />
          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="h-9 w-full gap-2 text-sm text-muted-foreground dark:border-[#39434F] dark:bg-[#0F171F] dark:text-[#A0A6AE] dark:hover:border-[#1B6E87]/80 dark:hover:bg-[#0F171F] dark:hover:text-white"
              >
                <Search className="h-4 w-4" />
                <span>{copy.search}</span>
                <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex dark:border-[#39434F] dark:bg-[#060C13] dark:text-[#A0A6AE]">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg overflow-hidden p-0 dark:border-[#39434F] dark:bg-[#0F171F]" showCloseButton={false}>
              <DialogHeader className="sr-only">
                <DialogTitle>{copy.searchTitle}</DialogTitle>
                <DialogDescription>{copy.searchDescription}</DialogDescription>
              </DialogHeader>
              <div className="flex items-center border-b border-border/40 bg-background px-4 dark:border-[#39434F] dark:bg-[#060C13]">
                <Search className="h-4 w-4 text-muted-foreground dark:text-[#A0A6AE]" />
                <Input
                  placeholder={copy.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 bg-transparent px-3 py-4 text-sm shadow-none focus-visible:ring-0 dark:bg-transparent"
                  autoFocus
                />
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                {searchQuery.trim() && searchResults.length === 0 && (
                  <p className="p-4 text-center text-sm text-muted-foreground">
                    {copy.noResults}
                  </p>
                )}
                {searchResults.map((result, index) => (
                  <button
                    key={`${result.sectionId}-${result.itemId || 'main'}-${index}`}
                    onClick={() => handleSearchSelect(result.sectionId, result.itemId)}
                    className="pressable flex w-full flex-col items-start rounded-lg px-3 py-2 text-left transition-colors hover:bg-accent dark:hover:bg-[#0E303F]"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {highlightMatch(result.title, searchQuery)}
                    </span>
                    <span className="mt-0.5 text-xs text-muted-foreground">
                      {result.meta}
                    </span>
                    {result.content && (
                      <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {highlightMatch(getMatchPreview(result.content, searchQuery), searchQuery)}
                      </span>
                    )}
                  </button>
                ))}
                {!searchQuery.trim() && (
                  <div className="space-y-1 p-2">
                    <p className="px-2 py-1 text-xs font-medium text-muted-foreground">{copy.quickJump}</p>
                    {docsData.slice(0, 5).map((section) => (
                      <button
                        key={section.id}
                        onClick={() => handleSearchSelect(section.id)}
                        className="pressable flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent dark:hover:bg-[#0E303F]"
                      >
                        <span className="text-foreground">{section.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Actions */}
          <div className="flex items-center justify-self-end gap-2">
            <Button
              variant={isReaderMode ? "secondary" : "ghost"}
              size="sm"
              onClick={onToggleReaderMode}
              className={isReaderMode ? "dark:bg-[#1B232D] dark:text-white dark:hover:bg-[#1B232D]" : ""}
            >
              <ScrollText className="h-4 w-4" />
              <span>{isReaderMode ? copy.defaultMode : copy.readerMode}</span>
            </Button>
            <DocsLanguageMenu
              language={language}
              uiLanguage={language}
              onSelectLanguage={onSelectLanguage}
              variant="ghost"
              size="sm"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
