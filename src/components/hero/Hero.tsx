import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { SparkleBackground } from '@/components/ui/SparkleBackground'
import { AuroraBackground } from '@/components/ui/AuroraBackground'
import RotatingBadge from '@/components/ui/RotatingBadge'
import { heroImages, handleImageError } from '@/lib/images'

const EASE = [0.16, 1, 0.3, 1] as const

/* ----------------------------------------------------------------
   Hero, "curtain" edition: on desktop the whole section pins to the
   viewport (.hero-curtain, index.css) and the rest of the page
   scrolls OVER it — the background never moves. While being covered
   the hero content gently fades/scales back. Two LARGE overlapping
   image cards sit beside (not below) the statement headline, with
   the spinning badge on their edge.
   ---------------------------------------------------------------- */
export default function Hero() {
  const { t } = useLanguage()
  const h = heroImages
  const reduce = useReducedMotion()

  /* Recede while the curtain (following content) slides over. */
  const { scrollY } = useScroll()
  const contentOpacity = useTransform(scrollY, [0, 420, 820], [1, 1, 0.25])
  const contentScale = useTransform(scrollY, [0, 820], [1, 0.955])

  /* The slogan as three lines, each revealed from behind a mask. */
  const lines = [t.hero.titlePart1.trim(), t.hero.titleElegance, t.hero.titlePart2.trim()]

  return (
    <section
      id="hero"
      className="hero-curtain relative z-0 min-h-svh flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(165deg, var(--color-hero-bg-1) 0%, var(--color-hero-bg-2) 35%, var(--color-hero-bg-3) 65%, var(--color-hero-bg-1) 100%)',
      }}
    >
      {/* Living background: aurora, gold dust, silk threads, sparkles */}
      <AuroraBackground dust={26} silk />
      <SparkleBackground particleColor="#BD7F6C" speed={2} particleDensity={80} />

      {/* Background substance: giant outlined watermark M + fine rings.
          Physically anchored (right/left, not start/end) so the backdrop
          looks IDENTICAL in German and Arabic — see .hero-watermark. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="hero-watermark">M</span>
        <span className="hero-ring w-[46vw] h-[46vw] max-w-[680px] max-h-[680px]" style={{ top: '8%', right: '-8%' }} />
        <span className="hero-ring w-[30vw] h-[30vw] max-w-[440px] max-h-[440px]" style={{ bottom: '-6%', left: '16%' }} />
      </div>

      <motion.div
        className="relative z-10 flex-1 flex items-center w-full"
        style={reduce ? undefined : { opacity: contentOpacity, scale: contentScale }}
      >
        <div className="w-full max-w-[1200px] mx-auto px-6 pt-[100px] pb-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 items-center">

          {/* ── Left: statement copy ── */}
          <div className="max-lg:text-center">
            <motion.span
              className="inline-block font-body text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            >
              {t.hero.eyebrow}
            </motion.span>

            <h1
              className="font-heading font-medium tracking-tight mb-7"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', lineHeight: 1.05, color: 'var(--color-text-heading)' }}
            >
              {lines.map((line, i) => (
                <span key={i} className={`block overflow-hidden pb-[0.08em] -mb-[0.08em] ${i === 2 ? 'ps-[9%] max-lg:ps-0' : ''}`}>
                  <motion.span
                    className="block"
                    initial={reduce ? false : { y: '112%' }}
                    animate={reduce ? undefined : { y: '0%' }}
                    transition={{ delay: 0.2 + i * 0.13, duration: 0.95, ease: EASE }}
                  >
                    {i === 1 ? <em className="italic text-primary">{line}</em> : line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.85, ease: EASE }}
            >
              <p className="text-lg leading-[1.7] mb-8 max-w-[500px] max-lg:mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                {t.hero.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-9 max-lg:justify-center">
                <a
                  href="#contact"
                  className="group btn-shimmer inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm tracking-wide text-white bg-primary hover:bg-primary-hover transition-all duration-300 hover:scale-[1.04] active:scale-[0.97]"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden="true" />
                </a>
                <a
                  href="#showcase"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-medium text-sm tracking-wide border transition-all duration-300 hover:scale-[1.04] hover:border-primary/50 active:scale-[0.97]"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-heading)' }}
                >
                  {t.hero.ctaSecondary}
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-5 max-w-md max-lg:mx-auto">
                {t.hero.stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-heading text-2xl md:text-3xl font-semibold leading-none" style={{ color: 'var(--color-text-heading)' }}>
                      {s.value}
                    </div>
                    <div className="mt-1.5 text-xs font-medium tracking-[0.03em]" style={{ color: 'var(--color-text-label)' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: two LARGE overlapping image cards + badge ── */}
          <div className="relative h-[56vh] min-h-[400px] max-h-[640px] max-lg:h-auto max-lg:aspect-[4/5] max-lg:max-w-[440px] max-lg:mx-auto max-lg:w-full">

            {/* Portrait — the dominant card */}
            <motion.img
              src={h.portrait.local}
              onError={handleImageError(h.portrait.fallback)}
              alt={t.services.items[3]?.alt ?? ''}
              fetchPriority="high"
              decoding="async"
              draggable={false}
              className="absolute top-0 end-0 w-[74%] h-[86%] object-cover rounded-[26px]"
              style={{ boxShadow: 'var(--shadow-xl)' }}
              initial={reduce ? false : { opacity: 0, y: 44, scale: 1.05 }}
              animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.45, duration: 1, ease: EASE }}
            />

            {/* Styling shot — overlaps the portrait from the lower start side */}
            <motion.img
              src={h.styling.local}
              onError={handleImageError(h.styling.fallback)}
              alt={t.services.items[0]?.alt ?? ''}
              draggable={false}
              className="absolute bottom-0 start-0 w-[54%] h-[44%] object-cover rounded-[22px]"
              style={{
                boxShadow: 'var(--shadow-lg)',
                border: '6px solid var(--color-hero-bg-1)',
              }}
              initial={reduce ? false : { opacity: 0, y: 44, scale: 1.05 }}
              animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.68, duration: 1, ease: EASE }}
            />

            {/* Spinning editorial badge on the portrait's edge */}
            <motion.div
              className="absolute -top-7 end-[64%] md:-top-9 z-20"
              initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -30 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.0, duration: 0.9, ease: EASE }}
            >
              <RotatingBadge />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Service ticker ── */}
      <div
        className="absolute bottom-5 left-0 right-0 z-10 pointer-events-none select-none"
        style={{
          paddingLeft: '5vw',
          paddingRight: '5vw',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div className="brand-ticker-track flex items-center w-max" style={{ animation: 'brandTicker 50s linear infinite' }} aria-hidden="true">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {t.hero.ticker.map((word, i) => (
                <span
                  key={`${dup}-${i}`}
                  className="flex items-center gap-4 mx-8 whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-nav)', fontSize: '1.05rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-text-muted)', opacity: 0.5 }}
                >
                  <span>{word}</span>
                  <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: 1, background: 'var(--primary)', opacity: 0.5, transform: 'rotate(45deg)' }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
