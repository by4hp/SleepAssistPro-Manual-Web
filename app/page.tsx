"use client"

import { useState, useEffect } from "react"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { DocsContent } from "@/components/docs/docs-content"
import { DocsToc } from "@/components/docs/docs-toc"
import { DocsHeader } from "@/components/docs/docs-header"

type Language = "zh" | "en"

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("quick-start")
  const [activeItemId, setActiveItemId] = useState("")
  const [isDark, setIsDark] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>("zh")

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const handleNavigate = (sectionId: string, itemId?: string) => {
    setActiveSection(sectionId)
    setActiveItemId(itemId || "")
  }

  const handleToggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const handleToggleLanguage = () => {
    setLanguage((current) => (current === "zh" ? "en" : "zh"))
  }

  return (
    <div className="flex h-[100dvh] min-h-[100dvh] flex-col overflow-hidden bg-background">
      {/* Header */}
      <DocsHeader
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((open) => !open)}
      />

      {/* Main layout */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <DocsSidebar
          activeSection={activeSection}
          activeItemId={activeItemId}
          onNavigate={handleNavigate}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
          language={language}
          onToggleLanguage={handleToggleLanguage}
          mobileOpen={mobileMenuOpen}
          onMobileOpenChange={setMobileMenuOpen}
        />

        {/* Content + TOC */}
        <main className="flex flex-1 overflow-hidden">
          <DocsContent
            activeSection={activeSection}
            activeItemId={activeItemId}
            onNavigate={handleNavigate}
          />
          <DocsToc
            activeSection={activeSection}
            activeItemId={activeItemId}
            onNavigate={handleNavigate}
          />
        </main>
      </div>
    </div>
  )
}
