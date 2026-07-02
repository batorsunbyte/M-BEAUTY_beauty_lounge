import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { SparkleBackground } from '@/components/ui/SparkleBackground'
import { AuroraBackground } from '@/components/ui/AuroraBackground'
import RotatingBadge from '@/components/ui/RotatingBadge'
import BentoTile from '@/components/ui/BentoTile'
import { heroImages } from '@/lib/images'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const { t } = useLanguage()
  const h = heroImages
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  /* Subtle parallax: the image cluster drifts up slower than the page scrolls. */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bentoY = useTransform(scrollYProgress, [0, 1], [0, -70])

  /* The slogan as three huge lines, each revealed from behind a mask. */
  const lines = [t.hero.titlePart1.trim(), t.hero.titleElegance, t.hero.titlePart2.trim()]

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(165deg, var(--color-hero-bg-1) 0%, var(--color-hero-bg-2) 35%, var(--color-hero-bg-3) 65%, var(--color-hero-bg-1) 100%)',
      }}
    >
      {/* Living background: drifting rose-gold aurora, gold dust, silk threads + sparkles */}
      <AuroraBackground dust={26} silk />
      <SparkleBackground particleColor="#BD7F6C" speed={2} particleDensity={80} />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pt-[112px] pb-32">

        {/* ── Statement headline, full width ── */}
        <motion.span
          className="inline-block font-body text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-5"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
        >
          {t.hero.eyebrow}
        </motion.span>

        <h1
          className="font-heading font-medium tracking-tight mb-10 md:mb-14"
          /* min sized so the longest German line ("Selbstbewusstsein.")
             still fits a 320px viewport without clipping */
          style={{ fontSize: 'clamp(2rem, 8.2vw, 7rem)', lineHeight: 1.04, color: 'var(--color-text-heading)' }}
        >
          {lines.map((line, i) => (
            <span key={i} className={`block overflow-hidden pb-[0.08em] -mb-[0.08em] ${i === 2 ? 'ps-[9%]' : ''}`}>
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

        {/* ── Below: copy + CTAs left, floating image cluster right ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <motion.div
            className="max-lg:text-center"
            initial={reduce ? false : { opacity: 0, y: 26 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.85, ease: EASE }}
          >
            <p
              className="text-lg leading-[1.7] mb-9 max-w-[520px] max-lg:mx-auto"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {t.hero.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10 max-lg:justify-center">
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
              {t.hero.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 + i * 0.1, duration: 0.7, ease: EASE }}
                >
                  <div className="font-heading text-2xl md:text-3xl font-semibold leading-none" style={{ color: 'var(--color-text-heading)' }}>
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-xs font-medium tracking-[0.03em]" style={{ color: 'var(--color-text-label)' }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: bento image cluster (parallax + rotating badge) ── */}
          <motion.div
            className="relative grid grid-cols-2 auto-rows-[104px] md:auto-rows-[128px] gap-3 md:gap-4"
            style={reduce ? undefined : { y: bentoY }}
          >
            <BentoTile className="col-span-1 row-span-2" src={h.portrait.local} fallback={h.portrait.fallback} eager index={0} />
            <BentoTile className="col-span-1 row-span-1" src={h.styling.local} fallback={h.styling.fallback} eager index={1} />
            <BentoTile className="col-span-1 row-span-1" src={h.makeup.local} fallback={h.makeup.fallback} index={2} />
            <BentoTile className="col-span-2 row-span-1" src={h.lounge.local} fallback={h.lounge.fallback} index={3} />

            {/* Editorial signature: spinning circular badge overlapping the cluster */}
            <motion.div
              className="absolute -top-9 -end-4 md:-top-12 md:-end-8 z-20 hidden sm:block"
              initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -30 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.05, duration: 0.9, ease: EASE }}
            >
              <RotatingBadge />
            </motion.div>
          </motion.div>
        </div>
      </div>

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
