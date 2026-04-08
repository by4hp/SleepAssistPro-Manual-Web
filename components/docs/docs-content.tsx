"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, ArrowUp, ArrowLeft, ChevronRight, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DocItem, DocSection, Language } from "@/lib/docs-data"
import type { DocsDataByLanguage } from "@/lib/manual-content.types"
import { resolveManualAssetSrc } from "@/lib/manual-assets"
import { Button } from "@/components/ui/button"

interface DocsContentProps {
  activeSection: string
  activeItemId: string
  onNavigate: (sectionId: string, itemId?: string) => void
  language: Language
  docsDataByLanguage: DocsDataByLanguage
  readerMode?: boolean
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
          className="pressable mx-1 inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/8 px-2 py-0.5 align-middle text-sm font-medium text-primary transition-colors hover:bg-primary/14 dark:border-[#1B6E87] dark:bg-[#0E303F] dark:text-[#4197B5] dark:hover:bg-[#0E303F]"
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
        "overflow-hidden",
        compact ? "h-full" : "my-4"
      )}
    >
      <img
        src={resolvedSrc}
        alt={alt}
        className={cn(
          "mx-auto h-auto w-full rounded-lg object-contain",
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
          className="my-5 rounded-3xl border border-border/60 bg-[linear-gradient(135deg,color-mix(in_oklch,var(--card)_96%,white),color-mix(in_oklch,var(--secondary)_78%,var(--card)))] p-4 shadow-[0_18px_50px_-38px_rgba(15,23,42,0.45)] dark:border-[#39434F] dark:bg-[#1B232D]"
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

            <div className="inline-flex items-center gap-3 rounded-2xl border border-border/80 bg-[color-mix(in_oklch,var(--secondary)_78%,white)] px-4 py-3 text-sm font-medium text-foreground shadow-[0_10px_24px_-18px_rgba(15,23,42,0.38)] dark:border-[#1B6E87] dark:bg-[#0E303F] dark:text-[#4197B5]">
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
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    )
  }

  return (
    <article>
      <header className="mb-8 border-b border-border/35 pb-8 dark:border-[#39434F]/50">
        <h1 className="mb-3 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          {section.title}
        </h1>
      </header>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          {language === "zh" ? "欢迎使用 Sleep Assist" : "Welcome to Sleep Assist"}
        </h2>
        <p className="manual-copy max-w-2xl text-[0.82rem] leading-6 sm:text-[0.88rem] sm:leading-7">
          {language === "zh"
            ? "这是一份适用于 Ergomotion 智能床 App 的使用手册，可以帮助您下载和安装 App、连接智能床、注册或登录账号、了解常用功能，并在遇到问题时快速找到排查方法。第一次使用时，建议按章节顺序阅读；日常使用中如果遇到具体问题，也可以直接跳到对应章节查看。"
            : "This manual is designed for both first-time and everyday Sleep Assist users. If you are new, reading in order is the easiest path. If you run into a problem, you can also jump straight to the chapter that matches it."}
        </p>
      </section>

      <section className="mb-10">
        <div className="rounded-2xl border border-border/50 bg-card/60 p-4 backdrop-blur-sm dark:border-[#39434F] dark:bg-[#1B232D]">
          <h2 className="manual-copy mb-3 text-sm font-medium">
            {language === "zh" ? "章节入口" : "Chapter Shortcuts"}
          </h2>
          <div className="space-y-2">
            {docsData.map((sectionItem) => (
            <div
              key={sectionItem.id}
              className={cn(
                "overflow-hidden rounded-xl border border-border/50 bg-background transition-all hover:border-primary/50 dark:border-[#39434F] dark:bg-[#060C13] dark:hover:border-[#1B6E87]",
                expandedSections.includes(sectionItem.id) && "dark:border-[#4A5562]"
              )}
            >
                <button
                  type="button"
                  onClick={() => toggleSection(sectionItem.id)}
                  className="pressable flex w-full items-center justify-between gap-4 px-3 py-2.5 text-left"
                  aria-expanded={expandedSections.includes(sectionItem.id)}
                >
                  <span className="block min-w-0 text-sm font-semibold text-foreground">{sectionItem.title}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                      expandedSections.includes(sectionItem.id) && "rotate-90"
                    )}
                  />
                </button>

                {expandedSections.includes(sectionItem.id) && (
                  <div className="px-3 pb-3">
                    {sectionItem.description && (
                      <p className="px-1 pb-3 text-sm leading-6 text-muted-foreground">
                        {sectionItem.description}
                      </p>
                    )}

                    <div className="space-y-1.5">
                      <button
                        type="button"
                        onClick={() => onNavigate(sectionItem.id)}
                        className="pressable group flex w-full items-center justify-between rounded-lg bg-transparent px-3 py-2.5 text-left transition-all hover:bg-primary/5 dark:bg-transparent dark:hover:bg-[#141D27]"
                      >
                        <span className="manual-copy text-sm font-medium group-hover:text-foreground dark:group-hover:text-white">
                          {language === "zh" ? "进入本章" : "Open Chapter"}
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground/70 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </button>

                      <div className="space-y-1">
                      {sectionItem.items.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => onNavigate(sectionItem.id, item.id)}
                          className="pressable group flex w-full items-center justify-between rounded-lg bg-transparent px-3 py-2.5 text-left transition-all hover:bg-primary/5 dark:bg-transparent dark:hover:bg-[#141D27]"
                        >
                          <span className="manual-copy text-sm font-medium group-hover:text-foreground dark:group-hover:text-white">{item.title}</span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground/70 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}

// ── Section overview (no item selected) ───────────────────────────────────────
function SectionOverview({
  section,
  onNavigate,
  language,
}: {
  section: DocSection
  onNavigate: DocsContentProps['onNavigate']
  language: Language
}) {
  return (
    <article>
      <header className="mb-8 border-b border-border/35 pb-8 dark:border-[#39434F]/50">
        <h1 className="mb-3 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          {section.title}
        </h1>
        {section.description && (
          <p className="manual-copy text-[0.92rem] leading-6 sm:text-base sm:leading-7">{section.description}</p>
        )}
      </header>

      <section className="rounded-2xl border border-border/50 bg-card/60 p-4 backdrop-blur-sm dark:border-[#39434F] dark:bg-[#1B232D]">
        <h2 className="manual-copy mb-3 text-sm font-semibold">
          {language === "zh" ? "本章目录" : "In This Chapter"}
        </h2>

        <div className="space-y-2">
          {section.items.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(section.id, item.id)}
              className="pressable group flex w-full items-center justify-between rounded-xl border border-border/50 bg-background px-3 py-2.5 text-left transition-all hover:border-primary/50 dark:border-[#39434F] dark:bg-[#060C13] dark:hover:border-[#1B6E87]"
            >
              <span className="manual-copy pr-3 text-sm font-medium">
                {item.title}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground dark:text-[#A0A6AE] dark:group-hover:text-white" />
            </button>
          ))}
        </div>
      </section>
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
      <header className="mb-6 border-b border-border/35 pb-6 dark:border-[#39434F]/50">
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
          <div className="rounded-2xl border border-border/50 bg-card/60 p-4 backdrop-blur-sm dark:border-[#39434F] dark:bg-[#1B232D]">
            <h2 className="manual-copy mb-3 text-sm font-semibold">
              {language === "zh" ? "本节目录" : "In This Section"}
            </h2>
            <div className="space-y-2">
              {item.children.map((child) => (
                <button
                  key={child.id}
                  type="button"
                  onClick={() => onNavigate(entry.sectionId, child.id)}
                  className="pressable flex w-full items-center justify-between rounded-xl border border-border/50 bg-background/70 px-3 py-2.5 text-left text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground dark:border-[#39434F] dark:bg-[#060C13] dark:text-[#A0A6AE] dark:hover:bg-[#1B232D] dark:hover:text-white"
                >
                  <span className="manual-copy text-sm font-medium">
                    {child.title}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Children as subsections (only for parent items) */}
      {item.children && item.children.length > 0 && (
        <div className="space-y-8 border-t border-border/30 pt-8 dark:border-[#39434F]/45">
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
      <footer className="mt-12 flex flex-col gap-4 border-t border-border/35 pt-8 sm:flex-row sm:justify-between dark:border-[#39434F]/50">
        {prev ? (
          <button
            onClick={() => onNavigate(prev.sectionId, prev.item.id)}
            className="pressable group flex flex-col items-start rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm px-4 py-3.5 text-left transition-all hover:border-primary/50 hover:shadow-sm sm:max-w-[45%] figma-state-card"
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
            className="pressable group flex flex-col items-end rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm px-4 py-3.5 text-right transition-all hover:border-primary/50 hover:shadow-sm sm:max-w-[45%] figma-state-card"
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

function ReaderModePage({
  docsData,
  language,
}: {
  docsData: DocSection[]
  language: Language
}) {
  const copy = language === "zh"
    ? {
        title: "Sleep Assist 用户手册",
        subtitle: "长网页阅读模式",
        description:
          "这里会把整份手册按章节串成一页，适合连续阅读、校对文案，或直接导出为 PDF。",
        sectionNav: "章节导航",
        contents: "目录",
        version: "版本 1.0.0",
        chapterCount: `${docsData.length} 个章节`,
      }
    : {
        title: "Sleep Assist User Manual",
        subtitle: "Reader Mode",
        description:
          "This mode lays out the full manual as one continuous page for long-form reading, copy review, or PDF export.",
        sectionNav: "Chapter navigation",
        contents: "Contents",
        version: "Version 1.0.0",
        chapterCount: `${docsData.length} chapters`,
      }

  const handleReaderJump = (sectionId: string, itemId?: string) => {
    const targetId = itemId || `reader-${sectionId}`
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <article className="reader-mode-page">
      <header className="reader-cover mb-8 overflow-hidden rounded-[2rem] border border-border/50 bg-[radial-gradient(circle_at_top_left,rgba(65,151,181,0.16),transparent_38%),linear-gradient(180deg,color-mix(in_oklch,var(--card)_85%,var(--background)),color-mix(in_oklch,var(--card)_92%,transparent))] p-6 backdrop-blur-sm dark:border-[#39434F] dark:bg-[radial-gradient(circle_at_top_left,rgba(65,151,181,0.14),transparent_34%),linear-gradient(180deg,#1B232D,#0F171F)] print:mb-8 print:break-after-page print:rounded-none print:border-none print:bg-transparent print:p-0">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-muted-foreground">
          {copy.subtitle}
        </p>
        <h1 className="mb-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground lg:text-[2.7rem] lg:leading-tight">
          {copy.title}
        </h1>
        <p className="manual-copy max-w-3xl text-[0.9rem] leading-7 sm:text-[0.95rem]">
          {copy.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2 print:mt-8">
          <span className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground dark:border-[#39434F] dark:bg-[#060C13]">
            Sleep Assist
          </span>
          <span className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground dark:border-[#39434F] dark:bg-[#060C13]">
            {copy.version}
          </span>
          <span className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground dark:border-[#39434F] dark:bg-[#060C13]">
            {copy.chapterCount}
          </span>
        </div>
      </header>

      <section className="reader-contents mb-10 rounded-[1.75rem] border border-border/50 bg-card/60 p-5 backdrop-blur-sm dark:border-[#39434F] dark:bg-[#1B232D] print:mb-8 print:break-after-page print:rounded-none print:border-none print:bg-transparent print:p-0">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="manual-copy text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {copy.contents}
          </h2>
          <p className="print-hidden text-xs text-muted-foreground">{copy.sectionNav}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {docsData.map((section) => (
            <div
              key={section.id}
              className="rounded-2xl border border-border/50 bg-background/70 p-4 dark:border-[#39434F] dark:bg-[#060C13] print:break-inside-avoid print:rounded-xl print:border print:bg-transparent print:p-3"
            >
              <button
                type="button"
                onClick={() => handleReaderJump(section.id)}
                className="reader-toc-link pressable group mb-2 flex w-full items-center justify-between text-left"
              >
                <span className="text-sm font-semibold text-foreground">
                  {section.title}
                </span>
                <ChevronRight className="print-hidden h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground dark:text-[#A0A6AE] dark:group-hover:text-white" />
              </button>
              {section.items.length > 0 && (
                <div className="space-y-1.5">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleReaderJump(section.id, item.id)}
                      className="reader-toc-link pressable block w-full text-left text-[0.8rem] leading-5 text-muted-foreground transition-colors hover:text-foreground dark:text-[#A0A6AE] dark:hover:text-white"
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="reader-mode-nav print-hidden mb-10 rounded-2xl border border-border/50 bg-card/60 p-4 backdrop-blur-sm dark:border-[#39434F] dark:bg-[#1B232D]">
        <h2 className="manual-copy mb-3 text-sm font-semibold">
          {copy.sectionNav}
        </h2>
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {docsData.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => handleReaderJump(section.id)}
              className="pressable group flex items-center justify-between rounded-xl border border-border/50 bg-background px-3 py-2.5 text-left transition-all hover:border-primary/50 dark:border-[#39434F] dark:bg-[#060C13] dark:hover:border-[#1B6E87]"
            >
              <span className="manual-copy text-sm font-medium">
                {section.title}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground dark:text-[#A0A6AE] dark:group-hover:text-white" />
            </button>
          ))}
        </div>
      </section>

      <div className="space-y-10 print:space-y-8">
        {docsData.map((section) => (
          <section
            key={section.id}
            id={`reader-${section.id}`}
            className="reader-section scroll-mt-24 border-b border-border/35 pb-10 last:border-b-0 last:pb-0 dark:border-[#39434F]/45 print:border-b-0 print:pb-0"
          >
            <header className="mb-8">
              <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
                {section.title}
              </h2>
              {section.description && (
                <p className="manual-copy max-w-3xl text-[0.9rem] leading-7 sm:text-[0.95rem]">
                  {section.description}
                </p>
              )}
            </header>

            <div className="space-y-8 print:space-y-6">
              {section.items.map((item) => (
                <section key={item.id} id={item.id} className="reader-item scroll-mt-24 print:break-inside-avoid-page">
                  <h3 className="mb-4 text-xl font-semibold tracking-tight text-foreground lg:text-2xl">
                    {item.title}
                  </h3>
                  <div>{renderContent(item.content, handleReaderJump)}</div>

                  {item.children && item.children.length > 0 && (
                    <div className="mt-8 space-y-8 border-t border-border/25 pt-8 dark:border-[#39434F]/35 print:space-y-6">
                      {item.children.map((child) => (
                        <section key={child.id} id={child.id} className="reader-child scroll-mt-24 print:break-inside-avoid-page">
                          <h4 className="mb-3 text-base font-semibold text-foreground lg:text-lg">
                            {child.title}
                          </h4>
                          <div>{renderContent(child.content, handleReaderJump)}</div>
                        </section>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export function DocsContent({
  activeSection,
  activeItemId,
  onNavigate,
  language,
  docsDataByLanguage,
  readerMode = false,
}: DocsContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const docsData = docsDataByLanguage[language]
  const flatList = buildFlatList(docsData)

  const currentSection = docsData.find(s => s.id === activeSection)
  const activeEntry = activeItemId ? findEntry(flatList, activeSection, activeItemId) : undefined
  const activeChildId =
    activeEntry?.item.children?.find((child) => child.id === activeItemId)?.id ?? null

  // Scroll to top for normal pages, or scroll to the inline child anchor when present.
  useEffect(() => {
    if (readerMode) return

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
    if (readerMode) return

    const el = containerRef.current
    if (!el) return
    const onScroll = () => setShowBackToTop(el.scrollTop > 300)
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative flex-1 overflow-hidden">
      <div
        ref={containerRef}
        className={cn(
          readerMode ? "overflow-visible" : "h-full overflow-y-auto scrollbar-thin"
        )}
      >
        <div className={cn(readerMode ? "" : "mx-auto max-w-3xl px-6 py-8 lg:px-8 lg:py-12")}>

          {readerMode && (
            <ReaderModePage docsData={docsData} language={language} />
          )}

          {/* Quick-start landing (section page, no item selected) */}
          {!readerMode && currentSection && activeSection === 'quick-start' && !activeItemId && (
            <QuickStartLanding
              section={currentSection}
              onNavigate={onNavigate}
              docsData={docsData}
              language={language}
            />
          )}

          {/* Section overview when no item is selected */}
          {!readerMode && currentSection && !activeItemId && activeSection !== 'quick-start' && (
            <SectionOverview section={currentSection} onNavigate={onNavigate} language={language} />
          )}

          {/* Item page */}
          {!readerMode && currentSection && activeEntry && (
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
          "print-hidden fixed bottom-6 right-6 z-50 rounded-full shadow-lg transition-all duration-300 lg:bottom-8 lg:right-8",
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
