import legalData from './legal.json'
import type { Language } from './translations'

export interface LegalSection {
  heading: string
  paragraphs: string[]
  bullets: string[]
  paragraphsAfter: string[]
}

export interface LegalDoc {
  title: string
  intro: string
  sections: LegalSection[]
}

export interface LegalBlock {
  /* Legal texts exist in German (legally binding) + English.
     Other UI languages (Arabic) fall back to the German original. */
  de: LegalDoc
  en: LegalDoc
  lastUpdated: string
  complianceNotes: string
}

interface LegalData {
  impressum: LegalBlock
  datenschutz: LegalBlock
}

const data = legalData as unknown as LegalData

export function getLegalDoc(kind: 'impressum' | 'datenschutz', language: Language): {
  doc: LegalDoc
  lastUpdated: string
  /** true when the doc is shown in a different language than the UI (→ show notice). */
  isFallback: boolean
} {
  const block = data[kind]
  const hasOwn = language === 'de' || language === 'en'
  const doc = hasOwn ? block[language as 'de' | 'en'] : block.de
  return { doc, lastUpdated: block.lastUpdated, isFallback: !hasOwn }
}
