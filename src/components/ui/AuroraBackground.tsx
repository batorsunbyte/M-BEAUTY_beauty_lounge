import { useEffect, useMemo, useRef, useState } from 'react'

/* ----------------------------------------------------------------
   Animated brand background, layered:
     · three drifting rose-gold glow orbs + rotating conic sheen
     · film-grain overlay
     · optional gold dust — tiny glowing particles floating upwards
     · optional silk lines — curved threads with travelling light
       pearls (offset-path, auto-hidden where unsupported)

   Pure CSS animations (transform/opacity only, see index.css) — cheap
   on the GPU. Everything PAUSES while the section is offscreen
   (IntersectionObserver toggles .aurora-paused) and is reduced or
   hidden for prefers-reduced-motion and small screens.
   ---------------------------------------------------------------- */

interface AuroraProps {
  className?: string
  /** floating gold dust particles */
  dust?: number
  /** curved silk lines with travelling light pearls (hero only) */
  silk?: boolean
}

/* Deterministic pseudo-random per particle index — stable across
   renders and mounts (no Math.random → no re-render drift). */
function dustParticle(i: number) {
  const a = ((i * 73 + 11) % 97) / 97
  const b = ((i * 41 + 13) % 89) / 89
  const c = ((i * 29 + 7) % 83) / 83
  return {
    left: 2 + a * 96,                    // %
    size: 2 + b * 3.5,                   // px
    dur: 14 + b * 14,                    // s — full climb
    delay: -(c * 28),                    // negative → already mid-flight
    drift: (a - 0.5) * 120,              // px sideways over the climb
    twinkle: 2.6 + c * 2.2,              // s
    twinkleDelay: -(a * 4),              // s
  }
}

const SILK_PATHS = [
  'M -60 620 C 320 500, 760 760, 1560 540',
  'M -60 710 C 420 610, 900 850, 1560 650',
  'M -60 520 C 260 450, 820 640, 1560 440',
]

export function AuroraBackground({ className = '', dust = 0, silk = false }: AuroraProps) {
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

  const particles = useMemo(
    () => Array.from({ length: dust }, (_, i) => dustParticle(i)),
    [dust],
  )

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

      {silk && (
        <div className="aurora-silk">
          <svg viewBox="0 0 1500 900" preserveAspectRatio="none" fill="none">
            <defs>
              <linearGradient id="silkGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="var(--aurora-silk)" stopOpacity="0" />
                <stop offset="0.25" stopColor="var(--aurora-silk)" />
                <stop offset="0.75" stopColor="var(--aurora-silk)" />
                <stop offset="1" stopColor="var(--aurora-silk)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {SILK_PATHS.map((d) => (
              <path key={d} d={d} stroke="url(#silkGrad)" strokeWidth="1.4" />
            ))}
          </svg>
          {/* light pearls travelling along the silk threads */}
          {SILK_PATHS.map((d, i) => (
            <span
              key={d}
              className="aurora-pearl"
              style={{
                '--pearl-path': `path('${d}')`,
                '--pearl-dur': `${10 + i * 3.5}s`,
                '--pearl-delay': `${-(i * 4.2)}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {particles.map((p, i) => (
        <span
          key={i}
          className="aurora-dust-p"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            '--dust-dur': `${p.dur}s`,
            '--dust-delay': `${p.delay}s`,
            '--dust-drift': `${p.drift}px`,
            '--dust-twinkle': `${p.twinkle}s`,
            '--dust-twinkle-delay': `${p.twinkleDelay}s`,
          } as React.CSSProperties}
        />
      ))}

      <div className="aurora-grain" />
    </div>
  )
}
