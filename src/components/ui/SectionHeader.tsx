import type { ReactNode } from 'react'

/* ----------------------------------------------------------------
   Shared editorial section header (gallery style):
   small eyebrow chip · large Fraunces title · side paragraph.
   ---------------------------------------------------------------- */
interface SectionHeaderProps {
  eyebrow: string
  title: ReactNode
  subtitle?: string
  className?: string
}

export default function SectionHeader({ eyebrow, title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-5 ${className}`}>
      <div className="max-w-xl max-md:text-center max-md:mx-auto">
        <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
          {eyebrow}
        </span>
        <h2
          className="font-heading font-medium leading-[1.06] tracking-tight"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: 'var(--color-text-heading)' }}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p
          className="md:text-right md:max-w-xs text-base leading-relaxed max-md:text-center max-md:mx-auto"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
