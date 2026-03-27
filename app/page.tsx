import { unstable_noStore as noStore } from "next/cache"
import { cookies } from "next/headers"
import { DocsPageClient } from "@/components/docs/docs-page-client"
import { getDocsDataByLanguage } from "@/lib/manual-content"

export const dynamic = "force-dynamic"

export default async function DocsPage() {
  if (process.env.NODE_ENV === "development") {
    noStore()
  }

  const cookieStore = await cookies()
  const initialLanguage = cookieStore.get("sleepassistpro-language")?.value === "en" ? "en" : "zh"
  const initialTheme = cookieStore.get("sleepassistpro-theme")?.value === "light" ? "light" : "dark"
  const docsDataByLanguage = getDocsDataByLanguage()

  return (
    <DocsPageClient
      docsDataByLanguage={docsDataByLanguage}
      initialLanguage={initialLanguage}
      initialTheme={initialTheme}
    />
  )
}
