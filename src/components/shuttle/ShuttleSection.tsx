import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Car, Gem, ShieldCheck, Clock3, ArrowRight } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useTheme } from '@/hooks/useTheme'
import { BUSINESS } from '@/lib/business'

/* ----------------------------------------------------------------
   Exclusive shuttle service — MStyle's signature differentiator:
   clients are chauffeured to and from the lounge for weddings,
   engagements and special occasions. Rendered as a rose-gold
   editorial band between services and testimonials.
   ---------------------------------------------------------------- */
export default function ShuttleSection() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const reduce = useReducedMotion()

  const perks = [
    { icon: Gem, label: t.shuttle.badge },
    { icon: ShieldCheck, label: t.shuttle.note.replace(/\.$/, '') },
    { icon: Clock3, label: t.contact.phoneNote },
  ]

  return (
    <section id="shuttle" className="relative py-14 md:py-20 px-4 md:px-6" style={{ background: 'var(--color-section-bg-2)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden p-8 md:p-12 group"
          style={{
            borderRadius: '24px',
            background: isDark
              ? 'linear-gradient(120deg, #5e372d 0%, #9c5f4e 45%, #bd7f6c 100%)'
              : 'linear-gradient(120deg, #bd7f6c 0%, #d9a08f 55%, #9c5f4e 100%)',
            boxShadow: isDark
              ? '0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)'
              : '0 8px 32px rgba(156,95,78,0.25), 0 2px 8px rgba(64,34,25,0.08)',
          }}
        >
          {/* Decorative glows */}
          <div className="absolute -top-14 -end-10 w-56 h-56 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" aria-hidden="true" />
          <div className="absolute -bottom-16 -start-8 w-48 h-48 bg-black/10 rounded-full blur-3xl" aria-hidden="true" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">

            {/* Icon medallion */}
            <div className="shrink-0 max-lg:mx-auto">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/40 bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Car className="w-9 h-9 md:w-11 md:h-11 text-white" aria-hidden="true" />
              </div>
            </div>

            {/* Copy */}
            <div className="flex-1 min-w-0 max-lg:text-center">
              <span className="inline-block text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/80 mb-3">
                {t.shuttle.badge}
              </span>
              <h2 className="font-heading font-medium text-2xl md:text-4xl text-white leading-tight mb-3">
                {t.shuttle.titlePart1}
                <em className="italic">{t.shuttle.titleAccent}</em>
              </h2>
              <p className="text-sm md:text-base text-white/85 leading-relaxed max-w-xl max-lg:mx-auto">
                {t.shuttle.description}
              </p>
              <p className="mt-3 font-heading italic text-white/90 text-base md:text-lg">
                {t.shuttle.note}
              </p>
            </div>

            {/* CTA */}
            <div className="shrink-0 max-lg:mx-auto flex flex-col items-center gap-3">
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary py-3.5 px-7 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:bg-white/90 hover:shadow-lg active:scale-[0.97]"
              >
                <Car className="w-4 h-4" aria-hidden="true" />
                {t.shuttle.cta}
              </a>
              <Link
                to="/vip"
                className="group inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/85 hover:text-white transition-colors"
              >
                {t.vip.label}
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Perk row (screenreader-friendly, decorative for sighted users) */}
          <div className="relative z-10 mt-8 pt-6 border-t border-white/20 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-3">
            {perks.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-white/75">
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
