import { useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { SparkleBackground } from '@/components/ui/SparkleBackground'
import { beforeAfterImage, handleImageError } from '@/lib/images'
import { useLanguage } from '../../i18n/LanguageContext'

/* ----------------------------------------------------------------
   Interactive before/after comparison: drag (or arrow-key) the
   handle to reveal the styled result. One portrait is used twice —
   the "before" side is graded down via CSS filters, so the pair
   never over-promises. The slider area is forced LTR so the drag
   math stays simple; labels remain localized.
   ---------------------------------------------------------------- */

const BEFORE_FILTER = 'saturate(0.45) contrast(0.9) brightness(0.94) sepia(0.1)'

export default function BeforeAfterSection() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const [pos, setPos] = useState(56)
  const areaRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const setFromClientX = useCallback((clientX: number) => {
    const rect = areaRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(94, Math.max(6, pct)))
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { setPos((p) => Math.max(6, p - 4)); e.preventDefault() }
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { setPos((p) => Math.min(94, p + 4)); e.preventDefault() }
    if (e.key === 'PageDown') { setPos((p) => Math.max(6, p - 10)); e.preventDefault() }
    if (e.key === 'PageUp') { setPos((p) => Math.min(94, p + 10)); e.preventDefault() }
    if (e.key === 'Home') { setPos(6); e.preventDefault() }
    if (e.key === 'End') { setPos(94); e.preventDefault() }
  }

  return (
    <section id="results" className="relative py-16 md:py-24 px-4 md:px-6" style={{ background: 'var(--color-section-bg-2)' }}>
      <SparkleBackground particleColor="#D9A08F" speed={2} particleDensity={50} />
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader
          eyebrow={t.beforeAfter.label}
          title={<>{t.beforeAfter.titlePart1}<em className="italic text-primary">{t.beforeAfter.titleAccent}</em></>}
          subtitle={t.beforeAfter.description}
          className="mb-10 md:mb-14"
        />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          {/* Slider area — internally LTR to keep the drag math direction-stable */}
          <div
            ref={areaRef}
            dir="ltr"
            role="slider"
            tabIndex={0}
            aria-label={t.beforeAfter.sliderAria}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={onKeyDown}
            onPointerDown={(e) => {
              // primary button only — right/middle click must not grab the handle
              if (e.pointerType === 'mouse' && e.button !== 0) return
              dragging.current = true
              setFromClientX(e.clientX)
              try {
                e.currentTarget.setPointerCapture?.(e.pointerId)
              } catch {
                // pointer id may already be gone (e.g. synthetic events) — the buttons check below still ends the drag
              }
            }}
            onPointerMove={(e) => {
              if (!dragging.current) return
              // capture lost + button released outside the element → stop following the hover
              if (e.pointerType === 'mouse' && e.buttons === 0) { dragging.current = false; return }
              setFromClientX(e.clientX)
            }}
            onPointerUp={() => { dragging.current = false }}
            onPointerCancel={() => { dragging.current = false }}
            onLostPointerCapture={() => { dragging.current = false }}
            className="group relative overflow-hidden rounded-[24px] border select-none cursor-ew-resize aspect-[4/5] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            style={{
              borderColor: 'var(--color-border-card)',
              boxShadow: 'var(--shadow-xl)',
              touchAction: 'pan-y',
            }}
          >
            {/* After (full) */}
            <img
              src={beforeAfterImage.local}
              onError={handleImageError(beforeAfterImage.fallback)}
              alt={t.beforeAfter.after}
              draggable={false}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Before (clipped from the left) */}
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden="true">
              <img
                src={beforeAfterImage.local}
                onError={handleImageError(beforeAfterImage.fallback)}
                alt=""
                draggable={false}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ filter: BEFORE_FILTER }}
              />
            </div>

            {/* Labels */}
            <span
              className="absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] backdrop-blur-sm"
              style={{ background: 'rgba(20,16,16,0.55)', color: '#e9d6cc' }}
            >
              {t.beforeAfter.before}
            </span>
            <span
              className="absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] backdrop-blur-sm bg-primary text-white"
            >
              {t.beforeAfter.after}
            </span>

            {/* Handle */}
            <div className="absolute top-0 bottom-0 z-10 pointer-events-none" style={{ left: `${pos}%` }} aria-hidden="true">
              <div className="absolute top-0 bottom-0 -translate-x-1/2 w-[2px] bg-white/85 shadow-[0_0_12px_rgba(0,0,0,0.45)]" />
              <div
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full border-2 border-white/90 bg-primary
                           flex items-center justify-center shadow-lg transition-transform duration-200 group-active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 7l-5 5 5 5" />
                  <path d="M15 7l5 5-5 5" />
                </svg>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs" style={{ color: 'var(--color-text-label)' }}>
            {t.beforeAfter.caption}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
