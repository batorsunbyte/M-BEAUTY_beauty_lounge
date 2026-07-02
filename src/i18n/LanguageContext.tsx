import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { translations, RTL_LANGUAGES, type Language, type TranslationStrings } from './translations'

interface LanguageContextValue {
  language: Language
  t: TranslationStrings
  /** true when the active language renders right-to-left (Arabic). */
  isRTL: boolean
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'mstyle-language'
const SUPPORTED: Language[] = ['de', 'en', 'ar']

function isLanguage(value: unknown): value is Language {
  return value === 'de' || value === 'en' || value === 'ar'
}

function getInitialLanguage(): Language {
  try {
    // 1. Explicit ?lang= in the URL wins (used by shared links + hreflang alternates).
    const param = new URLSearchParams(window.location.search).get('lang')?.toLowerCase()
    if (isLanguage(param)) return param
    // 2. Previously chosen language.
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLanguage(stored)) return stored
    // 3. Browser preference, otherwise German (primary market: Vienna).
    const browser = navigator.language?.slice(0, 2).toLowerCase()
    if (isLanguage(browser)) return browser
  } catch {
    // localStorage / navigator / location not available
  }
  return 'de'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = useCallback((lang: Language) => {
    if (!SUPPORTED.includes(lang)) return
    setLanguageState(lang)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // localStorage not available
    }
  }, [])

  const isRTL = RTL_LANGUAGES.includes(language)

  // Keep <html lang> and <html dir> in sync for SEO, accessibility and RTL layout.
  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  }, [language, isRTL])

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, t, isRTL, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
