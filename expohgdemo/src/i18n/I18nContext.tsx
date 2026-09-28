import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  LOCALES,
  translations,
} from './translations'
import type { Locale, Translation } from './types'

type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translation
}

const I18nContext = createContext<I18nContextValue | null>(null)

function readStoredLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored && LOCALES.includes(stored as Locale)) {
    return stored as Locale
  }
  return DEFAULT_LOCALE
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    localStorage.setItem(LOCALE_STORAGE_KEY, next)
  }, [])

  const t = translations[locale]

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t.meta.title

    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute('content', t.meta.description)
    }
  }, [locale, t])

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useTranslation() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider')
  }
  return context
}
