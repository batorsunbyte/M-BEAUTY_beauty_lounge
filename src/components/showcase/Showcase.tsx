import { ArrowRight } from 'lucide-react'
import { SparkleBackground } from '@/components/ui/SparkleBackground'
import SectionHeader from '@/components/ui/SectionHeader'
import BentoTile from '@/components/ui/BentoTile'
import { serviceImages } from '@/lib/images'
import { useLanguage } from '../../i18n/LanguageContext'

/* Order matches t.services.items */
const IMAGES = [
  serviceImages.hair,
  serviceImages.nails,
  serviceImages.lashes,
  serviceImages.face,
  serviceImages.laser,
]

/* bento packing for 5 tiles on a 3-col grid */
const SPANS = ['col-span-2 row-span-2', '', '', '', 'col-span-2']

export default function Showcase() {
  const { t } = useLanguage()
  const items = t.services.items

  return (
    <section
      id="showcase"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(170deg, var(--color-section-bg-1) 0%, var(--color-section-bg-2) 60%, var(--color-hero-bg-2) 100%)',
        color: 'var(--color-text)',
      }}
    >
      <SparkleBackground particleColor="#C08A7D" speed={1.5} particleDensity={60} />

      <div className="relative z-[1] w-full max-w-[1200px] mx-auto px-6 py-20 md:py-28">
        <SectionHeader
          eyebrow={t.services.label}
          title={<>{t.services.titleLine1} {t.services.titleLine2}</>}
          subtitle={t.services.description}
          className="mb-10 md:mb-14"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[150px] md:auto-rows-[210px] gap-3 md:gap-4">
          {IMAGES.map((img, i) => (
            <BentoTile
              key={i}
              src={img.local}
              fallback={img.fallback}
              tag={items[i]?.tag}
              title={items[i]?.title}
              index={i}
              eager={i === 0}
              className={SPANS[i]}
            />
          ))}
        </div>

        <div className="mt-10 md:mt-12 flex max-md:justify-center">
          <a
            href="#contact"
            className="group btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-sm tracking-wide text-white bg-primary hover:bg-primary-hover transition-all duration-300 hover:scale-[1.04] active:scale-[0.97]"
          >
            {t.services.cta}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
