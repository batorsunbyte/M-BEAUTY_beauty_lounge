import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { journeyImages, handleImageError } from '@/lib/images'
import { AuroraBackground } from '@/components/ui/AuroraBackground'
import { useLanguage } from '../../i18n/LanguageContext'

/* ----------------------------------------------------------------
   Scroll-driven story: "a visit at MStyle" in four moments.
   The section is 4 viewport-heights tall; its inner panel sticks
   to the screen while scrolling scrubs through the steps — images
   crossfade with a soft Ken-Burns zoom, texts slide in, and a
   progress rail fills up. Falls back to a static stacked layout
   for prefers-reduced-motion.
   ---------------------------------------------------------------- */

const STEPS = journeyImages.length
const SEG = 1 / STEPS
const FADE = SEG * 0.28

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/* Visibility of step `index` at overall progress `p`. The fade windows
   are CENTERED on the segment borders so neighbouring steps overlap —
   a true crossfade (their opacities sum to 1 at the border) instead of
   a dip to the empty background. First step starts visible, last one
   stays visible. Mapper function instead of keyframe ranges so every
   step shares the exact same logic. */
function stepVisibility(index: number, p: number): number {
  const start = index * SEG
  const end = start + SEG
  const half = FADE / 2
  const fadeIn = index === 0 ? 1 : clamp01((p - (start - half)) / FADE)
  const fadeOut = index === STEPS - 1 ? 1 : clamp01((end + half - p) / FADE)
  return Math.min(fadeIn, fadeOut)
}

/* Reactively tracks a media query (used as height guard for the sticky panel). */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

function StepImage({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const o = useTransform(progress, (p) => stepVisibility(index, p))
  const scale = useTransform(progress, [index * SEG, index * SEG + SEG], [1.1, 1])
  const img = journeyImages[index]
  return (
    <motion.div className="absolute inset-0" style={{ opacity: o }}>
      <motion.img
        src={img.local}
        onError={handleImageError(img.fallback)}
        alt=""
        draggable={false}
        loading={index === 0 ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ scale }}
      />
      {/* Soft bottom vignette so the number stays readable */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{ background: 'linear-gradient(to top, rgba(18,12,11,0.55), transparent)' }}
      />
    </motion.div>
  )
}

function StepText({ progress, index, title, text }: {
  progress: MotionValue<number>
  index: number
  title: string
  text: string
}) {
  const o = useTransform(progress, (p) => stepVisibility(index, p))
  const y = useTransform(o, (v) => (1 - v) * 24)
  return (
    <motion.div className="absolute inset-0 flex flex-col justify-center" style={{ opacity: o, y }}>
      <span aria-hidden="true" className="font-heading text-5xl md:text-7xl font-medium leading-none text-primary/50 select-none">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3
        className="mt-4 font-heading font-medium leading-[1.08] tracking-tight"
        style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.9rem)', color: 'var(--color-text-heading)' }}
      >
        {title}
      </h3>
      <p className="mt-4 text-base md:text-lg leading-relaxed max-w-md" style={{ color: 'var(--color-text-muted)' }}>
        {text}
      </p>
    </motion.div>
  )
}

/* Static fallback for prefers-reduced-motion: plain stacked steps. */
function StaticJourney() {
  const { t } = useLanguage()
  return (
    <section id="journey" className="relative py-16 md:py-24 px-6" style={{ background: 'var(--color-section-bg-1)' }}>
      <div className="max-w-[1200px] mx-auto">
        <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
          {t.journey.label}
        </span>
        <h2
          className="font-heading font-medium leading-[1.06] tracking-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: 'var(--color-text-heading)' }}
        >
          {t.journey.titlePart1}
          <em className="italic text-primary">{t.journey.titleAccent}</em>
        </h2>
        <p className="text-base leading-relaxed max-w-xl mb-12" style={{ color: 'var(--color-text-muted)' }}>
          {t.journey.description}
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {t.journey.steps.map((step, i) => (
            <div key={step.title} className="rounded-[18px] overflow-hidden border" style={{ borderColor: 'var(--color-border-card)' }}>
              <img
                src={journeyImages[i].local}
                onError={handleImageError(journeyImages[i].fallback)}
                alt=""
                loading="lazy"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <span aria-hidden="true" className="font-heading text-2xl text-primary/60">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-1 font-heading text-xl font-medium" style={{ color: 'var(--color-text-heading)' }}>{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function JourneySection() {
  const { t, isRTL } = useLanguage()
  const reduce = useReducedMotion()
  /* On very short viewports (landscape phones) the sticky panel cannot
     fit header + image + text + rail — fall back to the static layout.
     On phones (<768px) the scroll-scrubbed 400vh pin janks and makes the
     page feel endless, so they get the static layout too. */
  const isShort = useMediaQuery('(max-height: 560px)')
  const isPhone = useMediaQuery('(max-width: 767px)')
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  if (reduce || isShort || isPhone) return <StaticJourney />

  return (
    <section id="journey" ref={ref} className="relative" style={{ height: `${STEPS * 100}vh` }}>
      <div
        className="sticky top-0 h-svh overflow-hidden flex flex-col"
        style={{ background: 'var(--color-section-bg-1)' }}
      >
        <AuroraBackground dust={14} />

        {/* Header */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pt-20 md:pt-[96px] pb-2 shrink-0">
          <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-2">
            {t.journey.label}
          </span>
          <h2
            className="font-heading font-medium leading-[1.06] tracking-tight"
            style={{ fontSize: 'clamp(1.6rem, 3.6vw, 2.9rem)', color: 'var(--color-text-heading)' }}
          >
            {t.journey.titlePart1}
            <em className="italic text-primary">{t.journey.titleAccent}</em>
          </h2>
          <p className="hidden md:block mt-2 text-sm max-w-md" style={{ color: 'var(--color-text-muted)' }}>
            {t.journey.description}
          </p>
        </div>

        {/* Steps */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex-1 min-h-0 grid grid-cols-1 max-lg:grid-rows-[1.4fr_1fr] lg:grid-cols-2 gap-6 lg:gap-14 items-stretch py-5">
          {/* Image panel — decorative; the story is carried by the step texts */}
          <div
            aria-hidden="true"
            className="relative overflow-hidden rounded-[22px] border min-h-0"
            style={{ borderColor: 'var(--color-border-card)', boxShadow: 'var(--shadow-lg)', background: 'var(--color-bg-card)' }}
          >
            {t.journey.steps.map((step, i) => (
              <StepImage key={step.title} progress={scrollYProgress} index={i} />
            ))}
          </div>

          {/* Text panel (stacked absolutely, scrubbed by scroll) */}
          <div className="relative min-h-[190px]">
            {t.journey.steps.map((step, i) => (
              <StepText key={step.title} progress={scrollYProgress} index={i} title={step.title} text={step.text} />
            ))}
          </div>
        </div>

        {/* Progress rail + scroll hint */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-7 shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative h-[3px] flex-1 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
              <motion.div
                className="absolute inset-y-0 start-0 w-full rounded-full bg-primary"
                style={{ scaleX: scrollYProgress, transformOrigin: isRTL ? 'right' : 'left' }}
              />
            </div>
            <span
              className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] whitespace-nowrap"
              style={{ color: 'var(--color-text-label)' }}
            >
              {t.journey.scrollHint}
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
