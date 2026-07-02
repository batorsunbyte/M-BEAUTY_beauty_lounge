import { useEffect, useRef, useState } from 'react'

/* ----------------------------------------------------------------
   Animated brand background: three slowly drifting rose-gold glow
   orbs + a rotating conic sheen + a film-grain overlay. Pure CSS
   animations (transform-only, see index.css) — cheap on the GPU
   and automatically disabled by the global prefers-reduced-motion
   rules. Colors adapt to light/dark via the --aurora-* variables.

   The animations PAUSE while the section is offscreen (Intersection
   Observer toggles .aurora-paused) so the compositor can go idle —
   matters on low-end phones and for battery life.
   ---------------------------------------------------------------- */
export function AuroraBackground({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [onScreen, setOnScreen] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: '100px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${onScreen ? '' : 'aurora-paused'} ${className}`}
    >
      <div className="aurora-orb aurora-orb-1" />
      <div className="aurora-orb aurora-orb-2" />
      <div className="aurora-orb aurora-orb-3" />
      <div className="aurora-sheen" />
      <div className="aurora-grain" />
    </div>
  )
}
