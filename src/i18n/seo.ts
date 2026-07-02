import seoData from './seo.json'
import type { Language } from './translations'

export interface MetaEntry {
  title: string
  description: string
}

interface SeoData {
  meta: Record<Language, MetaEntry>
  keywords: string[]
}

const data = seoData as unknown as SeoData

export function getMeta(language: Language): MetaEntry {
  return data.meta[language]
}

export const seoKeywords: string[] = data.keywords
