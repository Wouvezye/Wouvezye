"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/language-context"
import { languages, type LanguageCode } from "@/lib/i18n"

export function LanguageSelector() {
  const { lang, setLang } = useLanguage()
  const currentLang = languages.find((l) => l.code === lang)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLang?.name || "Français"}</span>
          <span className="sm:hidden">{currentLang?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLang(language.code as LanguageCode)}
            className={`gap-2 ${lang === language.code ? "bg-muted" : ""}`}
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
