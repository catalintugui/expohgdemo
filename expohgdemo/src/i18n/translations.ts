import type { Locale, Translation } from './types'

export const LOCALES: Locale[] = ['en', 'ro']

export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_STORAGE_KEY = 'expo-hg-locale'

const loaders: Record<Locale, () => Promise<Translation>> = {
  en: () => import('../assets/en.json').then((m) => m.default as Translation),
  ro: () => import('../assets/ro.json').then((m) => m.default as Translation),
}

const cache: Partial<Record<Locale, Translation>> = {}

export async function loadTranslation(locale: Locale): Promise<Translation> {
  const cached = cache[locale]
  if (cached) return cached

  const translation = await loaders[locale]()
  cache[locale] = translation
  return translation
}

export function getCachedTranslation(locale: Locale): Translation | undefined {
  return cache[locale]
}
