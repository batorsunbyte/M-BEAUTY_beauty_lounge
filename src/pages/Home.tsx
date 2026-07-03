import Hero from '../components/hero/Hero'
import Showcase from '../components/showcase/Showcase'
import MarqueeBand from '../components/ui/MarqueeBand'
import JourneySection from '../components/journey/JourneySection'
import BeforeAfterSection from '../components/beforeafter/BeforeAfterSection'
import ShuttleSection from '../components/shuttle/ShuttleSection'
import TestimonialsDemo from '../components/testimonials/Demo'
import ContactSection from '../components/contact/ContactSection'
import { useLanguage } from '../i18n/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { getMeta } from '../i18n/seo'

export default function Home() {
  const { language } = useLanguage()
  const meta = getMeta(language)
  usePageMeta({ title: meta.title, description: meta.description, lang: language })

  return (
    <>
      <Hero />
      {/* Curtain: everything below scrolls OVER the pinned hero
          (overflow:clip keeps the rounded edge without breaking the
          sticky journey panel inside). */}
      <div
        className="relative z-20 rounded-t-[36px]"
        style={{
          overflow: 'clip',
          background: 'var(--color-bg-body)',
          boxShadow: '0 -28px 56px rgba(64,34,25,0.12)',
        }}
      >
        <Showcase />
        <MarqueeBand />
        <JourneySection />
        <BeforeAfterSection />
        <ShuttleSection />
        <TestimonialsDemo />
        <MarqueeBand reverse />
        <ContactSection />
      </div>
    </>
  )
}
