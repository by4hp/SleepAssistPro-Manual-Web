"use client"

import { ChevronDown, Languages } from "lucide-react"
import type { Language } from "@/lib/docs-data"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface DocsLanguageMenuProps {
  language: Language
  onSelectLanguage: (language: Language) => void
  uiLanguage: Language
  className?: string
  align?: "start" | "center" | "end"
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"
  onAfterSelect?: () => void
}

export function DocsLanguageMenu({
  language,
  onSelectLanguage,
  uiLanguage,
  className,
  align = "end",
  variant = "ghost",
  size = "sm",
  onAfterSelect,
}: DocsLanguageMenuProps) {
  const copy = uiLanguage === "zh"
    ? {
        menuLabel: "选择语言",
        triggerLabel: "语言",
        options: {
          zh: "中文",
          en: "English",
        },
      }
    : {
        menuLabel: "Choose language",
        triggerLabel: "Language",
        options: {
          zh: "中文",
          en: "English",
        },
      }

  const currentLanguageLabel = copy.options[language]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn("gap-2", className)}
          aria-label={`${copy.triggerLabel}: ${currentLanguageLabel}`}
        >
          <Languages className="h-4 w-4" />
          <span>{currentLanguageLabel}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="min-w-40">
        <DropdownMenuLabel>{copy.menuLabel}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={(value) => {
            onSelectLanguage(value as Language)
            onAfterSelect?.()
          }}
        >
          <DropdownMenuRadioItem value="zh">
            <span>{copy.options.zh}</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">
            <span>{copy.options.en}</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
