import type en from '../assets/en.json'

export type Locale = 'en' | 'ro'

export type Translation = typeof en

export type Project = Translation['projects'][number]
