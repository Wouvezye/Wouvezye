"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type LanguageCode, t as translate } from "@/lib/i18n"

interface LanguageContextType {
  lang: LanguageCode
  setLang: (lang: LanguageCode) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>("fr")

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem("wuvezye_lang") as LanguageCode | null
    if (stored) {
      setLangState(stored)
    }
  }, [])

  const setLang = (newLang: LanguageCode) => {
    setLangState(newLang)
    localStorage.setItem("wuvezye_lang", newLang)
  }

  const t = (key: string) => translate(key, lang)

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
