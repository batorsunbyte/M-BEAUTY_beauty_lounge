import { motion, useReducedMotion } from 'framer-motion'
import { Phone, Mail, MapPin, CalendarCheck } from 'lucide-react'
import { InstagramIcon } from '@/components/ui/InstagramIcon'
import SectionHeader from '@/components/ui/SectionHeader'
import type { ReactNode } from 'react'
import { SparkleBackground } from '@/components/ui/SparkleBackground'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '../../i18n/LanguageContext'
import { BUSINESS } from '@/lib/business'

/* ── Animated card wrapper with reduced-motion support ── */
function Card({
    className,
    style,
    delay = 0,
    children,
}: {
    className?: string
    style?: React.CSSProperties
    delay?: number
    children: ReactNode
}) {
    const shouldReduce = useReducedMotion()

    if (shouldReduce) {
        return <div className={className} style={style}>{children}</div>
    }

    return (
        <motion.div
            initial={{ translateY: 16, opacity: 0 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, scale: 1.01 }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    )
}

export default function ContactSection() {
    const { theme } = useTheme()
    const { t } = useLanguage()
    const isDark = theme === 'dark'

    const cardShadow = isDark
        ? '0 4px 16px rgba(0,0,0,0.4), 0 12px 40px rgba(0,0,0,0.5)'
        : '0 4px 16px rgba(64,34,25,0.06), 0 12px 40px rgba(64,34,25,0.08)'

    const glassBorder = isDark
        ? 'rgba(255,255,255,0.08)'
        : 'rgba(189,127,108,0.12)'

    const textHeading = 'var(--color-text-heading)'
    const textMuted = 'var(--color-text-muted)'

    return (
        <section id="contact" className="relative py-16 md:py-24 px-4 md:px-6">
            <SparkleBackground particleColor="#D9A08F" speed={3} particleDensity={70} />
            <div className="max-w-5xl mx-auto relative z-20">
                {/* ── Section header ── */}
                <SectionHeader
                    eyebrow={t.contact.badge}
                    title={<>{t.contact.titlePart1}<em className="italic text-primary">{t.contact.titlePerfectLook}</em></>}
                    subtitle={t.contact.subtitle}
                    className="mb-10 md:mb-14"
                />

                {/* ── Row 1: Map (left) + 3 cards (right) ── */}
                <div className="flex flex-col lg:flex-row gap-4 md:gap-5 items-stretch">

                    {/* Map — full bleed, with address pill */}
                    <Card
                        delay={0.05}
                        className="relative overflow-hidden lg:w-[58%] border group"
                        style={{
                            borderColor: glassBorder,
                            boxShadow: cardShadow,
                            borderRadius: '18px',
                        }}
                    >
                        <div className="h-full min-h-[320px] lg:min-h-0 relative" style={{ background: isDark ? '#1d1413' : 'var(--color-cream-dark)' }}>
                            <iframe
                                src={BUSINESS.mapsEmbed}
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: isDark ? 'invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)' : 'none' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="MStyle Beauty Lounge — Google Maps"
                                className="absolute inset-0 w-full h-full"
                            />
                            {/* Address pill overlay */}
                            <a
                                href={BUSINESS.mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute bottom-3 start-3 end-3 sm:end-auto z-10 flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-md border transition-transform duration-300 hover:scale-[1.02]"
                                style={{
                                    background: isDark ? 'rgba(20,16,16,0.82)' : 'rgba(255,255,255,0.88)',
                                    borderColor: glassBorder,
                                }}
                            >
                                <MapPin className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                                <span className="text-xs font-semibold leading-tight" style={{ color: textHeading }}>
                                    {t.contact.addressStreet}, {t.contact.addressCity}
                                </span>
                                <span className="text-[0.65rem] font-bold uppercase tracking-wider text-primary whitespace-nowrap">
                                    {t.contact.openInMaps}
                                </span>
                            </a>
                        </div>
                    </Card>

                    {/* Right column: 3 cards in 2 rows */}
                    <div className="lg:w-[42%] flex flex-col gap-4 md:gap-5">

                        {/* Top row: Phone + Instagram side by side */}
                        <div className="flex gap-4 md:gap-5">

                            {/* Phone */}
                            <Card
                                delay={0.12}
                                className="relative overflow-hidden flex-1 p-5 border group"
                                style={{
                                    borderColor: glassBorder,
                                    boxShadow: cardShadow,
                                    background: isDark
                                        ? 'linear-gradient(135deg, rgba(32,24,23,0.8), rgba(189,127,108,0.12))'
                                        : 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(247,234,228,0.5))',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '18px',
                                }}
                            >
                                <div className="absolute -top-4 -end-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
                                <div className="relative z-10">
                                    <div className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center mb-2">
                                        <Phone className="w-3.5 h-3.5" />
                                    </div>
                                    <h3 className="text-xs font-heading font-bold mb-1" style={{ color: textHeading }}>{t.contact.call}</h3>
                                    <a
                                        href={BUSINESS.phoneHref}
                                        dir="ltr"
                                        className="block text-base font-heading font-bold group-hover:text-primary transition-colors duration-300 leading-tight"
                                        style={{ color: textHeading }}
                                    >
                                        {BUSINESS.phoneDisplay}
                                    </a>
                                    <p className="mt-1.5 text-[10px] font-medium" style={{ color: textMuted }}>{t.contact.phoneNote}</p>
                                </div>
                            </Card>

                            {/* Instagram */}
                            <Card
                                delay={0.18}
                                className="relative overflow-hidden flex-1 p-5 border group"
                                style={{
                                    borderColor: glassBorder,
                                    boxShadow: cardShadow,
                                    background: isDark
                                        ? 'linear-gradient(160deg, rgba(32,24,23,0.8), rgba(217,160,143,0.1))'
                                        : 'linear-gradient(160deg, rgba(255,255,255,0.8), rgba(217,160,143,0.08))',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '18px',
                                }}
                            >
                                <div className="absolute -bottom-4 -start-4 w-20 h-20 bg-primary/8 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
                                <div className="relative z-10">
                                    <div className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center mb-2">
                                        <InstagramIcon className="w-3.5 h-3.5" />
                                    </div>
                                    <h3 className="text-xs font-heading font-bold mb-1" style={{ color: textHeading }}>{t.contact.instagram}</h3>
                                    <a
                                        href={BUSINESS.instagramUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        dir="ltr"
                                        className="block text-base font-heading font-bold group-hover:text-primary transition-colors duration-300 leading-tight break-all"
                                        style={{ color: textHeading }}
                                    >
                                        {BUSINESS.instagramHandle}
                                    </a>
                                    <p className="mt-1.5 text-[10px] font-medium" style={{ color: textMuted }}>{t.contact.instagramNote}</p>
                                </div>
                            </Card>
                        </div>

                        {/* Bottom row: Email full width */}
                        <Card
                            delay={0.24}
                            className="relative overflow-hidden p-5 border group"
                            style={{
                                borderColor: glassBorder,
                                boxShadow: cardShadow,
                                background: isDark
                                    ? 'linear-gradient(200deg, rgba(32,24,23,0.8), rgba(189,127,108,0.14))'
                                    : 'linear-gradient(200deg, rgba(255,255,255,0.8), rgba(247,234,228,0.6))',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '18px',
                            }}
                        >
                            <div className="absolute top-0 end-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
                            <div className="relative z-10">
                                <div className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center mb-2">
                                    <Mail className="w-3.5 h-3.5" />
                                </div>
                                <h3 className="text-xs font-heading font-bold mb-1" style={{ color: textHeading }}>{t.contact.email}</h3>
                                <a
                                    href={`mailto:${BUSINESS.email}`}
                                    dir="ltr"
                                    className="block text-sm font-semibold group-hover:text-primary transition-colors duration-300 break-all leading-snug"
                                    style={{ color: 'var(--color-text)' }}
                                >
                                    {BUSINESS.email}
                                </a>
                                <p className="mt-1.5 text-[10px] font-medium" style={{ color: textMuted }}>{t.contact.emailNote}</p>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* ── Row 2: CTA bar — full width ── */}
                <Card
                    delay={0.3}
                    className="relative overflow-hidden mt-4 md:mt-5 p-6 md:p-8 group"
                    style={{
                        boxShadow: cardShadow,
                        background: isDark
                            ? 'linear-gradient(120deg, #5e372d, #9c5f4e, #bd7f6c)'
                            : 'linear-gradient(120deg, #bd7f6c, #d9a08f, #9c5f4e)',
                        borderRadius: '20px',
                    }}
                >
                    <div className="absolute -bottom-8 -end-8 w-44 h-44 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
                    <div className="absolute -top-10 -start-6 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-1.5">{t.contact.ctaTitle}</h3>
                            <p className="text-sm text-white/80 leading-relaxed max-w-md">{t.contact.ctaSubtitle}</p>
                        </div>
                        <div className="flex flex-wrap gap-3 lg:shrink-0">
                            <a
                                href={BUSINESS.whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className="flex items-center justify-center gap-2 bg-white text-primary py-3 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:bg-white/90 hover:shadow-lg active:scale-[0.97]"
                            >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.52 3.48A11.86 11.86 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22a9.94 9.94 0 01-5.07-1.39l-.36-.21-3.67.96.98-3.57-.23-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.46-7.49c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.07 4.47.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
                                </svg>
                                {t.contact.whatsapp}
                            </a>
                            <a
                                href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(t.contact.bookAppointment)}`}
                                className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white py-3 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.97] border border-white/10"
                            >
                                <CalendarCheck className="w-3.5 h-3.5" />
                                {t.contact.bookAppointment}
                            </a>
                            <a
                                href={BUSINESS.phoneHref}
                                className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white py-3 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.97] border border-white/10"
                            >
                                <Phone className="w-3.5 h-3.5" />
                                {t.contact.callUs}
                            </a>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
