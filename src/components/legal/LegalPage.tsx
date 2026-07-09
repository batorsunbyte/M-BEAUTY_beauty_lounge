import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Info } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { getLegalDoc } from '../../i18n/legal'
import { usePageMeta } from '../../hooks/usePageMeta'
import { useTheme } from '@/hooks/useTheme'
import { BUSINESS } from '@/lib/business'
import PageBackdrop from '@/components/ui/PageBackdrop'

const PLACEHOLDER_SPLIT_RE = /(\[(?:PLATZHALTER|PLACEHOLDER)[^\]]*\])/g
const isPlaceholder = (s: string) => /^\[(?:PLATZHALTER|PLACEHOLDER)[^\]]*\]$/.test(s)

/** Highlights [PLATZHALTER: …] markers so the owner can spot what to fill in. */
function withPlaceholders(text: string, isDark: boolean): ReactNode {
  const parts = text.split(PLACEHOLDER_SPLIT_RE)
  return parts.map((part, i) =>
    isPlaceholder(part) ? (
      <mark
        key={i}
        className="rounded px-1 py-0.5 font-medium"
        style={{
          background: isDark ? 'rgba(217,160,143,0.22)' : 'rgba(189,127,108,0.16)',
          color: isDark ? '#eccabd' : '#7d4a3c',
        }}
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

export default function LegalPage({ kind }: { kind: 'impressum' | 'datenschutz' }) {
  const { language, t } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { doc, lastUpdated, isFallback } = getLegalDoc(kind, language)

  usePageMeta({
    title: `${doc.title} | ${BUSINESS.name}`,
    description: doc.intro.slice(0, 155),
    lang: language,
  })

  const headingColor = 'var(--color-text-heading)'
  const bodyColor = 'var(--color-text)'
  const mutedColor = 'var(--color-text-muted)'

  return (
    <main className="relative min-h-screen pt-[72px]">
      <PageBackdrop dust={10} />
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-10 transition-opacity hover:opacity-70"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          {t.footer.backToHome}
        </Link>

        {/* Fallback notice: legal text is German while the UI language is Arabic */}
        {isFallback && t.legal.fallbackNotice && (
          <div
            className="flex items-start gap-3 rounded-2xl border p-4 mb-8 text-sm leading-relaxed"
            style={{
              borderColor: isDark ? 'rgba(217,160,143,0.25)' : 'rgba(189,127,108,0.25)',
              background: isDark ? 'rgba(217,160,143,0.08)' : 'rgba(189,127,108,0.07)',
              color: bodyColor,
            }}
          >
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
            <span>{t.legal.fallbackNotice}</span>
          </div>
        )}

        {/* The document itself always renders in its own language/direction
            (German fallback stays LTR even in the Arabic UI). */}
        <div dir={isFallback ? 'ltr' : undefined} lang={isFallback ? 'de' : undefined}>
          {/* Title */}
          <h1
            className="font-heading font-bold text-3xl md:text-5xl mb-4 tracking-tight"
            style={{ color: headingColor }}
          >
            {doc.title}
          </h1>

          {lastUpdated && (
            <p className="text-xs uppercase tracking-[0.12em] mb-8" style={{ color: mutedColor }}>
              {t.legal.updatedLabel}: {lastUpdated}
            </p>
          )}

          {doc.intro && (
            <p className="text-base leading-relaxed mb-12" style={{ color: mutedColor }}>
              {withPlaceholders(doc.intro, isDark)}
            </p>
          )}

          {/* Sections */}
          <div className="space-y-10">
            {doc.sections.map((sec, i) => (
              <section key={i}>
                <h2
                  className="font-heading font-semibold text-xl md:text-2xl mb-4"
                  style={{ color: headingColor }}
                >
                  {sec.heading}
                </h2>

                {sec.paragraphs.map((p, j) => (
                  <p key={`p-${j}`} className="text-sm md:text-base leading-relaxed mb-3" style={{ color: bodyColor }}>
                    {withPlaceholders(p, isDark)}
                  </p>
                ))}

                {sec.bullets.length > 0 && (
                  <ul className="my-4 space-y-2 ps-1">
                    {sec.bullets.map((b, j) => (
                      <li key={`b-${j}`} className="flex gap-3 text-sm md:text-base leading-relaxed" style={{ color: bodyColor }}>
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{withPlaceholders(b, isDark)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {sec.paragraphsAfter.map((p, j) => (
                  <p key={`pa-${j}`} className="text-sm md:text-base leading-relaxed mb-3" style={{ color: bodyColor }}>
                    {withPlaceholders(p, isDark)}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
