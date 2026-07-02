import { galleryWork } from '@/lib/images'
import { useLanguage } from '../../i18n/LanguageContext'
import SectionHeader from '@/components/ui/SectionHeader'
import BentoTile from '@/components/ui/BentoTile'

/* ----------------------------------------------------------------
   Gallery — editorial bento grid of lounge impressions.
   Captions come from translations (DE / EN / AR).
   ---------------------------------------------------------------- */

/* bento packing for 8 tiles on a 4-col grid */
const SPANS = ['col-span-2 row-span-2', '', '', '', '', '', '', 'col-span-2']

export default function GalleryGrid() {
  const { t } = useLanguage()

  return (
    <section className="relative w-full">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <SectionHeader eyebrow={t.gallery.eyebrow} title={t.gallery.title} subtitle={t.gallery.subtitle} className="mb-9 md:mb-14" />

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[200px] gap-3 md:gap-4">
          {galleryWork.map((img, i) => (
            <BentoTile
              key={i}
              src={img.local}
              fallback={img.fallback}
              tag={t.gallery.tiles[i]?.tag}
              title={t.gallery.tiles[i]?.title}
              index={i}
              eager={i < 3}
              className={SPANS[i]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
