import { useLanguage } from '../../i18n/LanguageContext'
import { SparkleBackground } from '@/components/ui/SparkleBackground'
import BentoTile from '@/components/ui/BentoTile'
import { heroImages } from '@/lib/images'

export default function Hero() {
  const { t } = useLanguage()
  const h = heroImages

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(165deg, var(--color-hero-bg-1) 0%, var(--color-hero-bg-2) 35%, var(--color-hero-bg-3) 65%, var(--color-hero-bg-1) 100%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-60 z-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 700px 500px at 12% 25%, rgba(217,160,143,0.07) 0%, transparent 100%),' +
            'radial-gradient(ellipse 500px 500px at 88% 15%, rgba(189,127,108,0.09) 0%, transparent 100%),' +
            'radial-gradient(ellipse 600px 400px at 80% 85%, rgba(217,160,143,0.05) 0%, transparent 100%)',
        }}
      />
      <SparkleBackground particleColor="#BD7F6C" speed={2} particleDensity={80} />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pt-[104px] pb-28 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* ── Left: editorial content ── */}
        <div className="max-lg:text-center">
          <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-5">
            {t.hero.eyebrow}
          </span>

          <h1
            className="font-heading font-medium leading-[1.04] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5.2vw, 4.5rem)', color: 'var(--color-text-heading)' }}
          >
            {t.hero.titlePart1}
            <em className="italic text-primary">{t.hero.titleElegance}</em>
            {t.hero.titlePart2}
          </h1>

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
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-medium text-sm tracking-wide text-white bg-primary hover:bg-primary-hover transition-all duration-300 active:scale-[0.97]"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#showcase"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-medium text-sm tracking-wide border transition-all duration-300 active:scale-[0.97]"
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
        </div>

        {/* ── Right: bento image cluster ── */}
        <div className="grid grid-cols-2 auto-rows-[110px] md:auto-rows-[140px] gap-3 md:gap-4">
          <BentoTile className="col-span-1 row-span-2" src={h.portrait.local} fallback={h.portrait.fallback} eager index={0} />
          <BentoTile className="col-span-1 row-span-1" src={h.styling.local} fallback={h.styling.fallback} eager index={1} />
          <BentoTile className="col-span-1 row-span-1" src={h.makeup.local} fallback={h.makeup.fallback} index={2} />
          <BentoTile className="col-span-2 row-span-1" src={h.lounge.local} fallback={h.lounge.fallback} index={3} />
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
