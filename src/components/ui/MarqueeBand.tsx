import { useLanguage } from '../../i18n/LanguageContext'

/* ----------------------------------------------------------------
   Big editorial marquee: the brand slogan as huge outlined words
   drifting across the page — every 4th word is filled & italic for
   rhythm. Purely decorative (aria-hidden); the global reduced-motion
   rules freeze it into a static typographic band.
   ---------------------------------------------------------------- */
export default function MarqueeBand({ reverse = false }: { reverse?: boolean }) {
  const { t } = useLanguage()
  const words = t.hero.marquee

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden py-6 md:py-9 select-none"
      style={{ background: 'var(--color-section-bg-2)' }}
    >
      <div
        className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        {Array.from({ length: 2 }).map((_, dup) => (
          <div key={dup} className="flex items-center shrink-0">
            {Array.from({ length: 3 }).map((_, rep) =>
              words.map((word, i) => (
                <span key={`${dup}-${rep}-${i}`} className="flex items-center">
                  <span className={`marquee-word ${(rep * words.length + i) % 4 === 3 ? 'marquee-word-filled' : ''} mx-5 md:mx-8`}>
                    {word}
                  </span>
                  <span
                    className="inline-block w-2 h-2 rounded-full shrink-0"
                    style={{ background: 'var(--primary)', opacity: 0.45 }}
                  />
                </span>
              )),
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
