import "server-only"

import fs from "node:fs"
import path from "node:path"
import { docsData as docsDataEn, quickLinks as quickLinksEn } from "@/lib/docs-data.en"
import { quickLinks as quickLinksZh } from "@/lib/docs-data.zh"
import type { DocSection } from "@/lib/docs-data.types"
import type { DocsDataByLanguage } from "@/lib/manual-content.types"
import { parseSectionMarkdown } from "@/lib/manual-markdown.mjs"

const zhMarkdownDir = path.join(process.cwd(), "content", "manual", "zh")
const enMarkdownDir = path.join(process.cwd(), "content", "manual", "en")

function loadMarkdownSections(targetDir: string) {
  if (!fs.existsSync(targetDir)) {
    return []
  }

  return fs
    .readdirSync(targetDir)
    .filter((filename) => filename.endsWith(".md"))
    .sort()
    .map((filename) => {
      const filePath = path.join(targetDir, filename)
      const markdown = fs.readFileSync(filePath, "utf8")
      return parseSectionMarkdown(markdown) as DocSection
    })
}

export function getDocsDataByLanguage(): DocsDataByLanguage {
  const zhMarkdownSections = loadMarkdownSections(zhMarkdownDir)
  const enMarkdownSections = loadMarkdownSections(enMarkdownDir)

  return {
    zh: zhMarkdownSections,
    en: enMarkdownSections.length > 0 ? enMarkdownSections : docsDataEn,
  }
}

export function getQuickLinksByLanguage() {
  return {
    zh: quickLinksZh,
    en: quickLinksEn,
  } as const
}
