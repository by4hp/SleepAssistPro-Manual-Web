import type { Language } from "@/lib/docs-data"
import type { DocSection } from "@/lib/docs-data.types"

export type DocsDataByLanguage = Record<Language, DocSection[]>
