import { AuroraBackground } from './AuroraBackground'
import { SparkleBackground } from './SparkleBackground'

/* ----------------------------------------------------------------
   The start page's living background, packaged for every subpage:
   rosé gradient + drifting aurora orbs + gold dust + silk threads +
   sparkles + the outlined watermark M with fine rings.

   FIXED to the viewport (content scrolls over it) — this matches how
   the pinned hero feels on the start page, keeps long pages (legal,
   VIP) from stretching the decor, and costs one viewport-sized layer
   instead of a page-sized one. Decorative only.
   ---------------------------------------------------------------- */
interface PageBackdropProps {
  dust?: number
  silk?: boolean
  watermark?: boolean
}

export default function PageBackdrop({ dust = 18, silk = true, watermark = true }: PageBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        background: 'linear-gradient(165deg, var(--color-hero-bg-1) 0%, var(--color-hero-bg-2) 35%, var(--color-hero-bg-3) 65%, var(--color-hero-bg-1) 100%)',
      }}
    >
      <AuroraBackground dust={dust} silk={silk} />
      <SparkleBackground particleColor="#BD7F6C" speed={2} particleDensity={60} />
      {watermark && (
        <>
          <span className="hero-watermark">M</span>
          <span className="hero-ring w-[46vw] h-[46vw] max-w-[680px] max-h-[680px]" style={{ top: '8%', right: '-8%' }} />
          <span className="hero-ring w-[30vw] h-[30vw] max-w-[440px] max-h-[440px]" style={{ bottom: '-6%', left: '16%' }} />
        </>
      )}
    </div>
  )
}
