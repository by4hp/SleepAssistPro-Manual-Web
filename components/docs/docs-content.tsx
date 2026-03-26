"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, ArrowUp, ArrowLeft, ChevronRight, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { getDocsData, type DocItem, type DocSection, type Language } from "@/lib/docs-data"
import { resolveManualAssetSrc } from "@/lib/manual-assets"
import { Button } from "@/components/ui/button"

interface DocsContentProps {
  activeSection: string
  activeItemId: string
  onNavigate: (sectionId: string, itemId?: string) => void
  language: Language
}

// Render inline bold (**text**) within a string
function renderInlineMarkdown(
  text: string,
  onNavigate?: (sectionId: string, itemId?: string) => void
): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\{\{jump-link\|[^|]+\|[^|]+\|[^}]+\}\})/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
    }

    const jumpLinkMatch = part.match(/^\{\{jump-link\|([^|]+)\|([^|]+)\|([^}]+)\}\}$/)
    if (jumpLinkMatch) {
      const [, label, sectionId, itemId] = jumpLinkMatch
      return (
        <button
          key={i}
          type="button"
          onClick={() => onNavigate?.(sectionId, itemId)}
          className="pressable mx-1 inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/8 px-2 py-0.5 align-middle text-sm font-medium text-primary transition-colors hover:bg-primary/14"
        >
          <span>{label}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      )
    }

    return part
  })
}

function renderStoreLogo(platform: string) {
  if (platform.toLowerCase() === "ios") {
    return (
      <img
        src={resolveManualAssetSrc("/manual/chapter-01/app-store.png")}
        alt=""
        aria-hidden="true"
        className="h-6 w-6 rounded-md object-cover"
      />
    )
  }

  if (platform.toLowerCase() === "android") {
    return (
      <img
        src={resolveManualAssetSrc("/manual/chapter-01/google-play.png")}
        alt=""
        aria-hidden="true"
        className="h-6 w-6 rounded-md object-cover"
      />
    )
  }

  return <Download className="h-4 w-4 shrink-0" />
}

function renderImageCard({
  alt,
  src,
  caption,
  compact = false,
}: {
  alt: string
  src: string
  caption?: string
  compact?: boolean
}) {
  const resolvedSrc = resolveManualAssetSrc(src)

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-3",
        compact ? "h-full" : "my-4"
      )}
    >
      <img
        src={resolvedSrc}
        alt={alt}
        className={cn(
          "mx-auto h-auto w-full rounded-xl border border-border/40 bg-background object-contain shadow-sm",
          compact
            ? "max-w-[16rem] sm:max-w-[18rem] lg:max-w-full"
            : "max-w-[16rem] sm:max-w-[18rem] lg:max-w-[30%]"
        )}
      />
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function renderContent(
  content: string,
  onNavigate?: (sectionId: string, itemId?: string) => void
) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let currentList: string[] = []
  let listType: 'ul' | 'ol' | null = null
  let orderedListStart = 1
  let key = 0

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      const ListTag = listType
      elements.push(
        <ListTag
          key={key++}
          start={listType === 'ol' ? orderedListStart : undefined}
          className={cn(
            "my-3 space-y-1.5 ml-5",
            listType === 'ol' ? "list-decimal" : "list-disc"
          )}
        >
          {currentList.map((item, i) => (
            <li key={i} className="manual-copy text-[0.84rem] leading-6 sm:text-[0.88rem] sm:leading-7">
              {renderInlineMarkdown(item, onNavigate)}
            </li>
          ))}
        </ListTag>
      )
      currentList = []
      listType = null
      orderedListStart = 1
    }
  }

  lines.forEach((line) => {
    const trimmedLine = line.trim()
    if (!trimmedLine) return

    const downloadButtonMatch = trimmedLine.match(/^\{\{download-button\|([^|]+)\|([^|]+)\|(.+)\}\}$/)
    if (downloadButtonMatch) {
      flushList()
      const [, platform, label, description] = downloadButtonMatch
      elements.push(
        <div
          key={key++}
          className="my-5 rounded-3xl border border-border/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(240,247,248,0.92))] p-4 shadow-[0_18px_50px_-38px_rgba(15,23,42,0.45)] dark:bg-[linear-gradient(135deg,rgba(35,46,57,0.95),rgba(22,31,39,0.98))]"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {platform}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>

            <div className="inline-flex items-center gap-3 rounded-2xl border border-border/80 bg-[color-mix(in_oklch,var(--secondary)_78%,white)] px-4 py-3 text-sm font-medium text-foreground shadow-[0_10px_24px_-18px_rgba(15,23,42,0.38)] dark:border-white/8 dark:bg-[color-mix(in_oklch,var(--secondary)_82%,var(--card))] dark:text-foreground">
              {renderStoreLogo(platform)}
              <span>{label}</span>
            </div>
          </div>
        </div>
      )
      return
    }

    const imageRowMatch = trimmedLine.match(/^\{\{image-row\|([^|]*)\|([^|]+)\|([^|]*)\|(.+)\}\}$/)
    if (imageRowMatch) {
      flushList()
      const [, captionA, srcA, captionB, srcB] = imageRowMatch
      elements.push(
        <div
          key={key++}
          className="my-4 grid gap-4 md:mx-auto md:max-w-[60%] md:grid-cols-2"
        >
          {renderImageCard({
            alt: captionA || "Screenshot 1",
            src: srcA,
            caption: captionA || undefined,
            compact: true,
          })}
          {renderImageCard({
            alt: captionB || "Screenshot 2",
            src: srcB,
            caption: captionB || undefined,
            compact: true,
          })}
        </div>
      )
      return
    }

    const imageMatch = trimmedLine.match(/^!\[(.*?)\]\((.+?)\)$/)
    if (imageMatch) {
      flushList()
      const [, alt, src] = imageMatch
      elements.push(<div key={key++}>{renderImageCard({ alt: alt || "", src })}</div>)
      return
    }

    // Bold standalone lines are treated as third-level headings inside item content.
    if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
      flushList()
      elements.push(
        <h3
          key={key++}
          className="scroll-mt-24 mt-6 mb-2 text-base font-semibold tracking-tight text-foreground lg:text-lg"
        >
          {trimmedLine.slice(2, -2)}
        </h3>
      )
      return
    }

    // Unordered list
    if (trimmedLine.startsWith('- ')) {
      if (listType !== 'ul') { flushList(); listType = 'ul' }
      currentList.push(trimmedLine.slice(2))
      return
    }

    // Ordered list
    const orderedMatch = trimmedLine.match(/^(\d+)\.\s(.+)$/)
    if (orderedMatch) {
      if (listType !== 'ol') {
        flushList()
        listType = 'ol'
        orderedListStart = Number(orderedMatch[1])
      }
      currentList.push(orderedMatch[2])
      return
    }

    // Regular paragraph
    flushList()
      elements.push(
      <p key={key++} className="manual-copy my-3 text-[0.84rem] leading-6 sm:text-[0.88rem] sm:leading-7">
        {renderInlineMarkdown(trimmedLine, onNavigate)}
      </p>
    )
  })

  flushList()
  return elements
}

// ── Flat navigation list: top-level items only; children render inline ───────
interface FlatEntry {
  sectionId: string
  sectionTitle: string
  item: DocItem
}

function buildFlatList(docsData: DocSection[]): FlatEntry[] {
  const list: FlatEntry[] = []
  for (const section of docsData) {
    for (const item of section.items) {
      list.push({ sectionId: section.id, sectionTitle: section.title, item })
    }
  }
  return list
}

function findEntry(flatList: FlatEntry[], sectionId: string, itemId: string): FlatEntry | undefined {
  return flatList.find(
    (entry) =>
      entry.sectionId === sectionId &&
      (entry.item.id === itemId || entry.item.children?.some((child) => child.id === itemId))
  )
}

// ── Quick-start landing ───────────────────────────────────────────────────────
function QuickStartLanding({
  section,
  onNavigate,
  docsData,
  language,
}: {
  section: DocSection
  onNavigate: DocsContentProps['onNavigate']
  docsData: DocSection[]
  language: Language
}) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["quick-start"])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    )
  }

  return (
    <article>
      <header className="mb-8 border-b border-border/50 pb-8">
        <h1 className="mb-3 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          {section.title}
        </h1>
      </header>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          {language === "zh" ? "欢迎使用 SleepAssistPro" : "Welcome to SleepAssistPro"}
        </h2>
        <p className="max-w-2xl text-[0.82rem] font-medium leading-6 text-muted-foreground/90 sm:text-[0.88rem] sm:leading-7">
          {language === "zh"
            ? "这份手册适合第一次使用和日常使用 SleepAssistPro 的用户；如果您是第一次使用，建议按照顺序阅读，如果遇到问题，也可以跳转到对应的章节查看。"
            : "This manual is designed for both first-time and everyday SleepAssistPro users. If you are new, reading in order is the easiest path. If you run into a problem, you can also jump straight to the chapter that matches it."}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-base font-semibold text-foreground lg:text-lg">
          {language === "zh" ? "章节入口" : "Chapter Shortcuts"}
        </h2>
        <div className="space-y-3">
          {docsData.map((sectionItem) => (
            <div
              key={sectionItem.id}
              className="rounded-xl border border-border/60 bg-background/80 backdrop-blur-sm transition-all hover:border-primary/40"
            >
              <button
                type="button"
                onClick={() => toggleSection(sectionItem.id)}
                className="pressable flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                aria-expanded={expandedSections.includes(sectionItem.id)}
              >
                <span className="block min-w-0 text-sm font-medium text-foreground">{sectionItem.title}</span>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    expandedSections.includes(sectionItem.id) && "rotate-90 text-primary"
                  )}
                />
              </button>

              {expandedSections.includes(sectionItem.id) && (
                <div className="border-t border-border/50 px-4 py-3">
                  {sectionItem.description && (
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                      {sectionItem.description}
                    </p>
                  )}
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => onNavigate(sectionItem.id)}
                      className="pressable group flex w-full items-center justify-between rounded-lg bg-primary/6 px-3 py-2.5 text-left transition-colors hover:bg-primary/10"
                    >
                      <span className="text-sm font-medium text-foreground">
                        {language === "zh" ? "进入本章" : "Open Chapter"}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </button>
                    {sectionItem.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onNavigate(sectionItem.id, item.id)}
                        className="pressable group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-primary/5"
                      >
                        <span className="text-sm text-muted-foreground group-hover:text-foreground">{item.title}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground/70 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}

// ── Section overview (no item selected) ───────────────────────────────────────
function SectionOverview({ section, onNavigate }: { section: DocSection; onNavigate: DocsContentProps['onNavigate'] }) {
  return (
    <article>
      <header className="mb-8 border-b border-border/50 pb-8">
        <h1 className="mb-3 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          {section.title}
        </h1>
        {section.description && (
          <p className="manual-copy text-[0.92rem] leading-6 sm:text-base sm:leading-7">{section.description}</p>
        )}
      </header>
      <div className="space-y-2">
        {section.items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(section.id, item.id)}
            className="pressable group flex w-full items-center justify-between rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm px-4 py-3 text-left transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm"
          >
            <span className="text-sm font-medium text-foreground">{item.title}</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </button>
        ))}
      </div>
    </article>
  )
}

// ── Single item page ──────────────────────────────────────────────────────────
function ItemPage({
  entry,
  activeChildId,
  onNavigate,
  language,
  flatList,
}: {
  entry: FlatEntry
  activeChildId: string | null
  onNavigate: DocsContentProps['onNavigate']
  language: Language
  flatList: FlatEntry[]
}) {
  const { item } = entry
  const idx = flatList.indexOf(entry)
  const prev = idx > 0 ? flatList[idx - 1] : null
  const next = idx < flatList.length - 1 ? flatList[idx + 1] : null

  return (
    <article>
      {/* Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <button
          onClick={() => onNavigate(entry.sectionId)}
          className="pressable rounded-md px-1 py-0.5 transition-colors hover:text-foreground"
        >
          {entry.sectionTitle}
        </button>
        <span>/</span>
        <span className="text-foreground">{item.title}</span>
      </div>

      {/* Title */}
      <header className="mb-6 border-b border-border/50 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          {item.title}
        </h1>
      </header>

      {/* Content */}
      <div className="mb-8">
        {renderContent(item.content, onNavigate)}
      </div>

      {item.children && item.children.length > 0 && (
        <section className="mb-8 lg:hidden">
          <div className="rounded-2xl border border-border/50 bg-card/60 p-4 backdrop-blur-sm">
            <h2 className="mb-3 text-sm font-semibold text-foreground">
              {language === "zh" ? "本节目录" : "In This Section"}
            </h2>
            <div className="space-y-2">
              {item.children.map((child) => (
                <button
                  key={child.id}
                  type="button"
                  onClick={() => onNavigate(entry.sectionId, child.id)}
                  className={cn(
                    "pressable flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors",
                    activeChildId === child.id
                      ? "bg-primary/10 text-foreground"
                      : "bg-background/70 text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                  )}
                >
                  <span className="text-sm font-medium">{child.title}</span>
                  <ChevronRight className="h-4 w-4 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Children as subsections (only for parent items) */}
      {item.children && item.children.length > 0 && (
        <div className="space-y-8 border-t border-border/40 pt-8">
          {item.children.map((child) => (
            <section key={child.id} id={child.id} className="scroll-mt-24">
              <h2 className="mb-4 text-lg font-semibold text-foreground lg:text-xl">
                {child.title}
              </h2>
              <div>{renderContent(child.content, onNavigate)}</div>
            </section>
          ))}
        </div>
      )}

      {/* Prev / Next navigation */}
      <footer className="mt-12 flex flex-col gap-4 border-t border-border/50 pt-8 sm:flex-row sm:justify-between">
        {prev ? (
          <button
            onClick={() => onNavigate(prev.sectionId, prev.item.id)}
            className="pressable group flex flex-col items-start rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm px-4 py-3.5 text-left transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm sm:max-w-[45%]"
          >
            <span className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowLeft className="h-3 w-3" /> {language === "zh" ? "上一页" : "Previous"}
            </span>
            <span className="text-sm font-medium text-foreground group-hover:text-primary">
              {prev.item.title}
            </span>
          </button>
        ) : <div />}

        {next && (
          <button
            onClick={() => onNavigate(next.sectionId, next.item.id)}
            className="pressable group flex flex-col items-end rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm px-4 py-3.5 text-right transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm sm:max-w-[45%]"
          >
            <span className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
              {language === "zh" ? "下一页" : "Next"} <ArrowRight className="h-3 w-3" />
            </span>
            <span className="text-sm font-medium text-foreground group-hover:text-primary">
              {next.item.title}
            </span>
          </button>
        )}
      </footer>
    </article>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export function DocsContent({ activeSection, activeItemId, onNavigate, language }: DocsContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const docsData = getDocsData(language)
  const flatList = buildFlatList(docsData)

  const currentSection = docsData.find(s => s.id === activeSection)
  const activeEntry = activeItemId ? findEntry(flatList, activeSection, activeItemId) : undefined
  const activeChildId =
    activeEntry?.item.children?.find((child) => child.id === activeItemId)?.id ?? null

  // Scroll to top for normal pages, or scroll to the inline child anchor when present.
  useEffect(() => {
    if (activeChildId) {
      requestAnimationFrame(() => {
        document.getElementById(activeChildId)?.scrollIntoView({ behavior: "smooth", block: "start" })
      })
      return
    }

    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }, [activeSection, activeItemId, activeChildId])

  // Back-to-top visibility
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onScroll = () => setShowBackToTop(el.scrollTop > 300)
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative flex-1 overflow-hidden">
      <div ref={containerRef} className="h-full overflow-y-auto scrollbar-thin">
        <div className="mx-auto max-w-3xl px-6 py-8 lg:px-8 lg:py-12">

          {/* Quick-start landing (section page, no item selected) */}
          {currentSection && activeSection === 'quick-start' && !activeItemId && (
            <QuickStartLanding
              section={currentSection}
              onNavigate={onNavigate}
              docsData={docsData}
              language={language}
            />
          )}

          {/* Section overview when no item is selected */}
          {currentSection && !activeItemId && activeSection !== 'quick-start' && (
            <SectionOverview section={currentSection} onNavigate={onNavigate} />
          )}

          {/* Item page */}
          {currentSection && activeEntry && (
            <ItemPage
              entry={activeEntry}
              activeChildId={activeChildId}
              onNavigate={onNavigate}
              language={language}
              flatList={flatList}
            />
          )}

        </div>
      </div>

      {/* Back to top */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "fixed bottom-6 right-6 z-50 rounded-full shadow-lg transition-all duration-300 lg:bottom-8 lg:right-8",
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
        onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp className="h-4 w-4" />
        <span className="sr-only">{language === "zh" ? "返回顶部" : "Back to top"}</span>
      </Button>
    </div>
  )
}
