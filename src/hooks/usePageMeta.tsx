import { useEffect } from 'react'
import { BUSINESS } from '@/lib/business'

const OG_LOCALE: Record<string, string> = {
  de: 'de_AT',
  en: 'en_US',
  ar: 'ar_AR',
}

/** Production origin used for canonical + og:url. Keep in sync with index.html. */
const BASE_URL = BUSINESS.siteUrl

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

interface PageMetaOptions {
  title: string
  description: string
  /** Language code used for og:locale + the self-referential canonical (de/en/ar). */
  lang?: string
}

/**
 * Keeps document.title + the SEO/Open-Graph/Twitter meta tags and the canonical
 * link in sync with the current page and language. Re-runs whenever any input
 * changes, so it is safe to call from any page (Home, Impressum, Datenschutz)
 * without the tags fighting each other across route or language switches.
 *
 * Canonical + og:url are made self-referential per language (de = default,
 * en/ar add ?lang=) so they match the hreflang alternates in index.html.
 */
export function usePageMeta({ title, description, lang }: PageMetaOptions) {
  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)

    // Open Graph
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)

    // Twitter (mirror OG so share previews are localized too)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)

    if (lang) {
      if (OG_LOCALE[lang]) setMeta('property', 'og:locale', OG_LOCALE[lang])
      const url = lang === 'de' ? BASE_URL : `${BASE_URL}?lang=${lang}`
      setMeta('property', 'og:url', url)
      setCanonical(url)
    }
  }, [title, description, lang])
}
