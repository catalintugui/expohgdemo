import en from '../assets/en.json'
import ro from '../assets/ro.json'
import type { Locale, Translation } from './types'

export const translations: Record<Locale, Translation> = {
  en,
  ro,
}

export const LOCALES: Locale[] = ['en', 'ro']

export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_STORAGE_KEY = 'expo-hg-locale'
