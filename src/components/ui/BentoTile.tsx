import { motion, useReducedMotion } from 'framer-motion'
import { handleImageError } from '@/lib/images'

/* ----------------------------------------------------------------
   Shared bento image tile (gallery style):
   rounded 18px · soft border · optional category chip · gradient
   caption with growing accent underline · hover zoom.
   ---------------------------------------------------------------- */
interface BentoTileProps {
  src: string
  fallback: string
  tag?: string
  title?: string
  index?: number
  className?: string
  eager?: boolean
}

export default function BentoTile({ src, fallback, tag, title, index = 0, className = '', eager }: BentoTileProps) {
  const reduce = useReducedMotion()
  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative m-0 overflow-hidden rounded-[18px] border ${className}`}
      style={{ borderColor: 'var(--color-border-card)', boxShadow: 'var(--shadow-sm)' }}
    >
      <img
        src={src}
        alt={title || ''}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={handleImageError(fallback)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      />

      {tag && (
        <span
          className="absolute top-3 left-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] backdrop-blur-sm"
          style={{ background: 'rgba(255,255,255,0.85)', color: '#b45309' }}
        >
          {tag}
        </span>
      )}

      {title && (
        <figcaption
          className="absolute inset-x-0 bottom-0 z-10 p-4 pt-10"
          style={{ background: 'linear-gradient(to top, rgba(26,18,18,0.62) 0%, rgba(26,18,18,0.08) 60%, transparent 100%)' }}
        >
          <span className="block font-heading text-white text-sm md:text-lg font-medium leading-tight">{title}</span>
          <span
            className="mt-1.5 block h-[2px] w-7 rounded-full origin-left transition-transform duration-500 group-hover:scale-x-[2.2]"
            style={{ background: 'linear-gradient(90deg, var(--primary), #d97706)' }}
          />
        </figcaption>
      )}
    </motion.figure>
  )
}
