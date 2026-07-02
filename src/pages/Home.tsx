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
      <Showcase />
      <MarqueeBand />
      <JourneySection />
      <BeforeAfterSection />
      <ShuttleSection />
      <TestimonialsDemo />
      <MarqueeBand reverse />
      <ContactSection />
    </>
  )
}
