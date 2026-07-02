import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/* ----------------------------------------------------------------
   Shared editorial section header (gallery style):
   small eyebrow chip · large Fraunces title revealed from behind a
   mask when scrolled into view · side paragraph fading in after.
   ---------------------------------------------------------------- */
interface SectionHeaderProps {
  eyebrow: string
  title: ReactNode
  subtitle?: string
  className?: string
}

const EASE = [0.16, 1, 0.3, 1] as const

export default function SectionHeader({ eyebrow, title, subtitle, className = '' }: SectionHeaderProps) {
  const reduce = useReducedMotion()

  return (
    <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-5 ${className}`}>
      <div className="max-w-xl max-md:text-center max-md:mx-auto">
        <motion.span
          className="inline-block font-body text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {eyebrow}
        </motion.span>
        <h2
          className="font-heading font-medium leading-[1.06] tracking-tight overflow-hidden pb-[0.1em] -mb-[0.1em]"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: 'var(--color-text-heading)' }}
        >
          <motion.span
            className="block"
            initial={reduce ? false : { y: '110%' }}
            whileInView={reduce ? undefined : { y: '0%' }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: 0.08, duration: 0.85, ease: EASE }}
          >
            {title}
          </motion.span>
        </h2>
      </div>
      {subtitle && (
        <motion.p
          className="md:text-end md:max-w-xs text-base leading-relaxed max-md:text-center max-md:mx-auto"
          style={{ color: 'var(--color-text-muted)' }}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
