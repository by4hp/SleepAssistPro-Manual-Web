"use client"

import { useEffect, useState } from "react"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { DocsContent } from "@/components/docs/docs-content"
import { DocsToc } from "@/components/docs/docs-toc"
import { DocsHeader } from "@/components/docs/docs-header"
import type { Language } from "@/lib/docs-data"
import type { DocsDataByLanguage } from "@/lib/manual-content.types"

interface DocsPageClientProps {
  docsDataByLanguage: DocsDataByLanguage
  initialLanguage: Language
}

const LANGUAGE_STORAGE_KEY = "sleepassistpro-language"

function persistPreference(key: string, value: string) {
  window.localStorage.setItem(key, value)
  document.cookie = `${key}=${value}; path=/; max-age=31536000; samesite=lax`
}

export function DocsPageClient({
  docsDataByLanguage,
  initialLanguage,
}: DocsPageClientProps) {
  const [activeSection, setActiveSection] = useState("quick-start")
  const [activeItemId, setActiveItemId] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>(initialLanguage)
  const [isReaderMode, setIsReaderMode] = useState(false)
  const [preferencesHydrated, setPreferencesHydrated] = useState(false)

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    let nextLanguage = initialLanguage
    if (savedLanguage === "zh" || savedLanguage === "en") {
      nextLanguage = savedLanguage
    }

    setLanguage(nextLanguage)
    setPreferencesHydrated(true)
  }, [initialLanguage])

  useEffect(() => {
    if (!preferencesHydrated) return
    document.documentElement.lang = language
    persistPreference(LANGUAGE_STORAGE_KEY, language)
  }, [language, preferencesHydrated])

  const handleNavigate = (sectionId: string, itemId?: string) => {
    setActiveSection(sectionId)
    setActiveItemId(itemId || "")
  }

  const handleSelectLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage)
  }

  const handleToggleReaderMode = () => {
    setIsReaderMode((current) => !current)
    setMobileMenuOpen(false)
  }

  return (
    <div
      className={
        isReaderMode
          ? "min-h-[100dvh] bg-background"
          : "flex h-[100dvh] min-h-[100dvh] flex-col overflow-hidden bg-background"
      }
    >
      <DocsHeader
        onNavigate={handleNavigate}
        language={language}
        onSelectLanguage={handleSelectLanguage}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((open) => !open)}
        docsDataByLanguage={docsDataByLanguage}
        isReaderMode={isReaderMode}
        onToggleReaderMode={handleToggleReaderMode}
      />

      {isReaderMode ? (
        <main className="reader-print-shell mx-auto w-full max-w-5xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-10">
          <DocsContent
            activeSection={activeSection}
            activeItemId={activeItemId}
            onNavigate={handleNavigate}
            language={language}
            docsDataByLanguage={docsDataByLanguage}
            readerMode
          />
        </main>
      ) : (
        <div className="relative flex flex-1 overflow-hidden">
          <DocsSidebar
            activeSection={activeSection}
            activeItemId={activeItemId}
            onNavigate={handleNavigate}
            language={language}
            onSelectLanguage={handleSelectLanguage}
            mobileOpen={mobileMenuOpen}
            onMobileOpenChange={setMobileMenuOpen}
            docsDataByLanguage={docsDataByLanguage}
          />

          <main className="flex flex-1 overflow-hidden">
            <DocsContent
              activeSection={activeSection}
              activeItemId={activeItemId}
              onNavigate={handleNavigate}
              language={language}
              docsDataByLanguage={docsDataByLanguage}
            />
            <DocsToc
              activeSection={activeSection}
              activeItemId={activeItemId}
              onNavigate={handleNavigate}
              language={language}
              docsDataByLanguage={docsDataByLanguage}
            />
          </main>
        </div>
      )}
    </div>
  )
}
