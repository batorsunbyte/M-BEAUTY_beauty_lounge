import { motion, useReducedMotion } from 'framer-motion'
import { Phone } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { AuroraBackground } from '@/components/ui/AuroraBackground'
import { vipImages, handleImageError } from '@/lib/images'
import { useLanguage } from '../i18n/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { BUSINESS } from '@/lib/business'

const EASE = [0.16, 1, 0.3, 1] as const

/* ----------------------------------------------------------------
   VIP & occasions page: everything MStyle offers around weddings,
   engagements and celebrations — bridal styling, shuttle service,
   venue decoration and car decoration — bundled as one story with
   a single WhatsApp/phone call-to-action.
   ---------------------------------------------------------------- */
export default function VipService() {
  const { t, language } = useLanguage()
  const reduce = useReducedMotion()

  usePageMeta({
    title: `${t.vip.label} | ${BUSINESS.name}`,
    description: t.vip.intro.slice(0, 155),
    lang: language,
  })

  return (
    <main className="relative min-h-screen pt-[72px] overflow-hidden" style={{ background: 'var(--color-bg-body)' }}>
      <AuroraBackground dust={14} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-14 md:py-20">
        <SectionHeader
          eyebrow={t.vip.label}
          title={<>{t.vip.titlePart1}<em className="italic text-primary">{t.vip.titleAccent}</em></>}
          subtitle={t.vip.intro}
          className="mb-10 md:mb-16"
        />

        {/* ── The four occasion services ── */}
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2">
          {t.vip.items.map((item, i) => (
            <motion.article
              key={item.title}
              className="group overflow-hidden rounded-[22px] border"
              style={{
                borderColor: 'var(--color-border-card)',
                background: 'var(--color-bg-card)',
                boxShadow: 'var(--shadow-md)',
              }}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: (i % 2) * 0.12, duration: 0.8, ease: EASE }}
            >
              <div className="overflow-hidden">
                <img
                  src={vipImages[i].local}
                  onError={handleImageError(vipImages[i].fallback)}
                  alt={item.title}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                />
              </div>
              <div className="p-6 md:p-7">
                <span aria-hidden="true" className="font-heading text-xl text-primary/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-1 font-heading text-xl md:text-2xl font-medium" style={{ color: 'var(--color-text-heading)' }}>
                  {item.title}
                </h2>
                <p className="mt-2.5 text-sm md:text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {item.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── Note + CTA band ── */}
        <motion.div
          className="relative overflow-hidden mt-10 md:mt-14 p-8 md:p-12 text-center"
          style={{
            borderRadius: '24px',
            background: 'linear-gradient(120deg, #bd7f6c 0%, #d9a08f 55%, #9c5f4e 100%)',
            boxShadow: '0 8px 32px rgba(156,95,78,0.25)',
          }}
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="absolute -top-14 -end-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-16 -start-8 w-48 h-48 bg-black/10 rounded-full blur-3xl" aria-hidden="true" />

          <p className="relative z-10 font-heading italic text-lg md:text-2xl text-white max-w-2xl mx-auto leading-relaxed">
            {t.vip.note}
          </p>
          <div className="relative z-10 mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={BUSINESS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary py-3.5 px-7 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:bg-white/90 hover:shadow-lg active:scale-[0.97]"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.52 3.48A11.86 11.86 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22a9.94 9.94 0 01-5.07-1.39l-.36-.21-3.67.96.98-3.57-.23-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.46-7.49c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.07 4.47.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
              </svg>
              {t.vip.cta}
            </a>
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white py-3.5 px-7 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.97] border border-white/10"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              {t.vip.ctaCall}
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
