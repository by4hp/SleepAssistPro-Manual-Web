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
  initialTheme: "light" | "dark"
}

const LANGUAGE_STORAGE_KEY = "sleepassistpro-language"
const THEME_STORAGE_KEY = "sleepassistpro-theme"

function persistPreference(key: string, value: string) {
  window.localStorage.setItem(key, value)
  document.cookie = `${key}=${value}; path=/; max-age=31536000; samesite=lax`
}

export function DocsPageClient({
  docsDataByLanguage,
  initialLanguage,
  initialTheme,
}: DocsPageClientProps) {
  const [activeSection, setActiveSection] = useState("quick-start")
  const [activeItemId, setActiveItemId] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>(initialLanguage)
  const [isDark, setIsDark] = useState(initialTheme === "dark")

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (savedLanguage === "zh" || savedLanguage === "en") {
      setLanguage(savedLanguage)
    }

    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (savedTheme === "light" || savedTheme === "dark") {
      setIsDark(savedTheme === "dark")
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    persistPreference(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    document.documentElement.style.colorScheme = isDark ? "dark" : "light"
    persistPreference(THEME_STORAGE_KEY, isDark ? "dark" : "light")
  }, [isDark])

  const handleNavigate = (sectionId: string, itemId?: string) => {
    setActiveSection(sectionId)
    setActiveItemId(itemId || "")
  }

  const handleToggleTheme = () => {
    setIsDark((current) => !current)
  }

  const handleSelectLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage)
  }

  return (
    <div className="flex h-[100dvh] min-h-[100dvh] flex-col overflow-hidden bg-background">
      <DocsHeader
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        language={language}
        onSelectLanguage={handleSelectLanguage}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((open) => !open)}
        docsDataByLanguage={docsDataByLanguage}
      />

      <div className="relative flex flex-1 overflow-hidden">
        <DocsSidebar
          activeSection={activeSection}
          activeItemId={activeItemId}
          onNavigate={handleNavigate}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
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
    </div>
  )
}
