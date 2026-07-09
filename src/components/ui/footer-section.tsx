'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/InstagramIcon';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '../../i18n/LanguageContext';
import { BUSINESS } from '@/lib/business';

interface FooterLink {
    title: string;
    href?: string;
    external?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
    label: string;
    links: FooterLink[];
}

function useFooterLinks(): FooterSection[] {
    const { t } = useLanguage();
    /* NOTE: internal links use hash-router hrefs (#/...) — plain paths
       like /gallery would 404 on GitHub Pages. */
    return [
        {
            label: t.footer.services,
            links: t.footer.serviceLinks.map((title) => ({ title, href: '#/' })),
        },
        {
            label: t.footer.studio,
            links: [
                { title: t.nav.vip, href: '#/vip' },
                { title: t.footer.gallery, href: '#/gallery' },
                { title: t.footer.booking, href: BUSINESS.whatsappUrl, external: true },
                { title: t.contact.instagram, href: BUSINESS.instagramUrl, external: true },
            ],
        },
        {
            label: t.footer.contactLabel,
            links: [
                { title: t.footer.cityCountry, href: BUSINESS.mapsUrl, external: true, icon: MapPin },
                { title: BUSINESS.phoneDisplay, href: BUSINESS.phoneHref, icon: Phone },
                { title: BUSINESS.email, href: `mailto:${BUSINESS.email}`, icon: Mail },
                { title: BUSINESS.instagramHandle, href: BUSINESS.instagramUrl, external: true, icon: InstagramIcon },
            ],
        },
    ];
}

function SunByteBadge({ isDark }: { isDark: boolean }) {
    const glowColor = isDark ? 'rgba(217,160,143,0.15)' : 'rgba(189,127,108,0.10)';
    const borderColor = isDark ? 'rgba(217,160,143,0.20)' : 'rgba(189,127,108,0.18)';
    const iconColor = isDark ? '#d9a08f' : '#bd7f6c';
    const textColor = isDark ? '#a39790' : '#7A6259';
    const nameColor = isDark ? '#d9a08f' : '#bd7f6c';

    return (
        <div className="flex justify-center pt-2">
            <a
                href="https://sunbyte.at"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                style={{
                    borderColor,
                    background: isDark
                        ? 'rgba(255,255,255,0.03)'
                        : 'rgba(255,255,255,0.6)',
                    boxShadow: `0 0 20px ${glowColor}, inset 0 1px 0 ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)'}`,
                }}
                aria-label="Made by SunByte — visit sunbyte.at"
            >
                {/* Sun icon */}
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="flex-shrink-0 transition-transform duration-500 group-hover:rotate-90"
                    style={{ color: iconColor }}
                >
                    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>

                {/* Text */}
                <span className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide">
                    <span style={{ color: textColor }}>Made by</span>
                    <span
                        className="font-bold tracking-wider uppercase"
                        style={{ color: nameColor }}
                    >
                        SunByte
                    </span>
                    <span
                        className="text-[9px] font-semibold tracking-widest uppercase opacity-60"
                        style={{ color: textColor }}
                    >
                        .at
                    </span>
                </span>

                {/* Hover glow ring */}
                <span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        boxShadow: `0 0 28px ${isDark ? 'rgba(217,160,143,0.25)' : 'rgba(189,127,108,0.18)'}`,
                    }}
                />
            </a>
        </div>
    );
}

export function Footer() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { t } = useLanguage();
    const footerLinks = useFooterLinks();

    return (
        <footer
            className="relative w-full"
            style={{
                background: isDark
                    ? 'linear-gradient(180deg, #0f0b0b 0%, #0a0707 100%)'
                    : 'linear-gradient(180deg, #F2E6DF 0%, #EBDCD2 100%)',
            }}
        >
            {/* Top accent line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            {/* Warm radial glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(217,160,143,0.12), transparent 55%)' }} />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-14 lg:py-20">
                <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
                    <AnimatedContainer className="space-y-4">
                        <div className="flex items-center gap-2.5">
                            <Sparkles className="size-6" style={{ color: isDark ? '#d9a08f' : '#bd7f6c' }} />
                            <span className="flex flex-col leading-none">
                                <span className="font-heading text-lg font-semibold" style={{ color: isDark ? '#f0e7e2' : '#1F1310' }}>
                                    M<span className="text-primary">Style</span>
                                </span>
                                <span className="brand-sub text-[0.5rem] font-semibold uppercase mt-1" style={{ color: isDark ? '#a39790' : '#9A837B' }}>
                                    Beauty Lounge
                                </span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs" style={{ color: isDark ? '#a39790' : '#7A6259' }}>
                            {t.footer.tagline}
                        </p>
                        <p className="text-xs pt-2" style={{ color: isDark ? '#736a65' : '#9A837B' }}>
                            &copy; {new Date().getFullYear()} {BUSINESS.name}. {t.footer.rights}
                        </p>
                    </AnimatedContainer>

                    <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
                        {footerLinks.map((section, index) => (
                            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                                <div className="mb-10 md:mb-0">
                                    <h3 className="text-xs font-heading font-semibold tracking-wider uppercase" style={{ color: isDark ? '#eccabd' : '#9A837B' }}>
                                        {section.label}
                                    </h3>
                                    <ul className="mt-4 space-y-2.5 text-sm" style={{ color: isDark ? '#d9cfca' : '#5C453E' }}>
                                        {section.links.map((link) => (
                                            <li key={link.title}>
                                                {link.href ? (
                                                    <a
                                                        href={link.href}
                                                        className="footer-link flex items-center"
                                                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                                    >
                                                        {link.icon && <link.icon className="me-1.5 size-3.5 opacity-50 shrink-0" />}
                                                        <span className="break-all">{link.title}</span>
                                                    </a>
                                                ) : (
                                                    <span className="flex items-center">
                                                        {link.icon && <link.icon className="me-1.5 size-3.5 opacity-50 shrink-0" />}
                                                        <span className="break-all">{link.title}</span>
                                                    </span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </AnimatedContainer>
                        ))}
                    </div>
                </div>

                {/* Bottom divider + credit */}
                <div className="mt-14 pt-6 border-t flex flex-col gap-4" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(189,127,108,0.14)' }}>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs tracking-wide" style={{ color: isDark ? '#736a65' : '#9A837B' }}>
                            {t.footer.designedInVienna}
                        </p>

                        {/* Legal links — required in Austria */}
                        <nav
                            className="flex items-center gap-5 text-xs font-medium"
                            style={{ color: isDark ? '#a39790' : '#7A6259' }}
                            aria-label={t.footer.contactLabel}
                        >
                            <Link to="/impressum" className="footer-link">
                                {t.footer.impressum}
                            </Link>
                            <Link to="/datenschutz" className="footer-link">
                                {t.footer.datenschutz}
                            </Link>
                        </nav>

                        <div className="flex items-center text-xs" style={{ color: isDark ? '#736a65' : '#9A837B' }}>
                            {t.footer.tags.map((tag, i) => (
                                <React.Fragment key={tag}>
                                    {i > 0 && <span className="inline-block w-1 h-1 rounded-full bg-primary/40 mx-2" />}
                                    <span>{tag}</span>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Agency credit badge */}
                    <SunByteBadge isDark={isDark} />
                </div>
            </div>
        </footer>
    );
};

type ViewAnimationProps = {
    delay?: number;
    className?: ComponentProps<typeof motion.div>['className'];
    children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
