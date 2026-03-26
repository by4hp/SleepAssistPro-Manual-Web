import { docsData as docsDataEn, quickLinks as quickLinksEn } from "@/lib/docs-data.en"
import { docsData as docsDataZh, quickLinks as quickLinksZh } from "@/lib/docs-data.zh"

export type { DocItem, DocSection } from "@/lib/docs-data.types"

export type Language = "zh" | "en"

export const docsDataByLanguage = {
  zh: docsDataZh,
  en: docsDataEn,
} as const

export const quickLinksByLanguage = {
  zh: quickLinksZh,
  en: quickLinksEn,
} as const

export function getDocsData(language: Language) {
  return docsDataByLanguage[language]
}

export function getQuickLinks(language: Language) {
  return quickLinksByLanguage[language]
}

// Backward-compatible exports for components that still import zh content directly.
export const docsData = docsDataZh
export const quickLinks = quickLinksZh
