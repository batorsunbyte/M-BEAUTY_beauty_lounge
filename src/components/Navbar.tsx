import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { LANGUAGES } from '../i18n/translations'

/* Simple menu: Services (home anchor) · VIP page · Gallery page · Contact
   (home anchor). No "home" tab — the logo already leads home. */
const NAV_LINKS = [
  { kind: 'anchor' as const, href: '#showcase', key: 'services' as const },
  { kind: 'route' as const, to: '/vip', key: 'vip' as const },
  { kind: 'route' as const, to: '/gallery', key: 'gallery' as const },
  { kind: 'anchor' as const, href: '#contact', key: 'contact' as const },
]

/* Light-theme ink colors (site runs permanently in the light look) */
const INK_HEADING = '#1F1310'
const INK_NAV = '#55443F'
const INK_MUTED = '#7A6259'

/* ── Segmented 3-way language switcher (DE | EN | عربي) ── */
function LangSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="inline-flex items-center rounded-full p-0.5 border"
      style={{
        borderColor: 'var(--color-border)',
        background: 'rgba(255,255,255,0.75)',
      }}
    >
      {LANGUAGES.map((l) => {
        const active = language === l.code
        return (
          <button
            key={l.code}
            onClick={() => setLanguage(l.code)}
            aria-pressed={active}
            title={l.name}
            className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[0.62rem] md:text-[0.68rem] font-bold tracking-wider transition-all duration-300 cursor-pointer"
            style={{
              background: active ? 'var(--primary)' : 'transparent',
              color: active ? '#ffffff' : INK_MUTED,
            }}
          >
            {l.label}
          </button>
        )
      })}
    </div>
  )
}

/* ── Brand lockup: MStyle over a letterspaced BEAUTY LOUNGE line ── */
function BrandLogo() {
  return (
    <Link to="/" className="flex flex-col leading-none cursor-pointer select-none whitespace-nowrap shrink-0">
      <span
        className="text-[1.25rem] md:text-[1.4rem] font-semibold"
        style={{ fontFamily: 'var(--font-heading)', color: INK_HEADING }}
      >
        M<span className="text-primary">Style</span>
      </span>
      <span className="brand-sub text-[0.52rem] md:text-[0.56rem] font-semibold uppercase mt-1" style={{ color: 'var(--color-text-label)' }}>
        Beauty Lounge
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { t } = useLanguage()

  /* ── Scroll detection ────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Mobile menu helpers ─────────────────────────────── */
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && menuOpen) closeMenu() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen, closeMenu])

  /* ── Scroll to anchor after navigating home ──────────── */
  const handleHomeAnchor = useCallback((href: string) => {
    if (location.pathname === '/') {
      const id = href.replace('#', '')
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      closeMenu()
    }
  }, [location.pathname, closeMenu])

  return (
    <nav
      className="fixed top-0 left-0 right-0 h-[72px] z-[100]"
      aria-label="Main navigation"
    >
      {/* Bar background as its own child: backdrop-filter on <nav> itself
          would turn the nav into the containing block for the fixed mobile
          overlay below — the menu would then be pinned to the 72px bar
          instead of covering the viewport once the page is scrolled. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 transition-[background-color,backdrop-filter,box-shadow] duration-300"
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: scrolled ? 'var(--color-bg-overlay)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          boxShadow: scrolled
            ? '0 1px 3px rgba(64,34,25,0.04), 0 4px 16px rgba(64,34,25,0.06)'
            : 'none',
        }}
      />

      {/* ── Inner container ──────────────────────────────── */}
      <div className="w-full max-w-[1200px] mx-auto px-6 flex items-center justify-between h-full">

        {/* Logo */}
        <BrandLogo />

        {/* Desktop links — right side */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              to={link.kind === 'route' ? link.to : '/'}
              onClick={() => (link.kind === 'anchor' ? handleHomeAnchor(link.href) : closeMenu())}
              className="relative text-[0.8125rem] font-medium tracking-[0.06em] uppercase cursor-pointer
                         transition-colors duration-200 hover:text-primary
                         after:content-[''] after:absolute after:start-0 after:-bottom-[2px]
                         after:h-[2px] after:w-0 after:bg-primary after:rounded-full
                         after:transition-[width] after:duration-300
                         hover:after:w-full"
              style={{ color: INK_NAV, transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', fontFamily: 'var(--font-nav)' }}
            >
              {t.nav[link.key]}
            </Link>
          ))}

          {/* Language switcher */}
          <LangSwitcher />
        </div>

        {/* Mobile: language switcher + hamburger */}
        <div className="hidden max-md:flex items-center gap-2">
          <LangSwitcher />

          {/* Hamburger */}
          <button
            className="flex flex-col justify-center items-center gap-[5px] w-9 h-9 cursor-pointer z-[501]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={t.nav.toggleMenu}
            aria-expanded={menuOpen}
          >
            <span
              className="block w-[22px] h-[2px] rounded-full transition-[transform,opacity] duration-300"
              style={{
                backgroundColor: menuOpen ? '#bd7f6c' : INK_HEADING,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block w-[22px] h-[2px] rounded-full transition-opacity duration-200"
              style={{ backgroundColor: INK_HEADING, opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-[22px] h-[2px] rounded-full transition-[transform] duration-300"
              style={{
                backgroundColor: menuOpen ? '#bd7f6c' : INK_HEADING,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile overlay ───────────────────────────────── */}
      <div
        className="hidden max-md:flex fixed inset-0 flex-col items-center justify-center gap-10 z-[500]
                    transition-opacity duration-400"
        style={{
          backgroundColor: 'var(--color-bg-menu)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.key}
            to={link.kind === 'route' ? link.to : '/'}
            onClick={() => (link.kind === 'anchor' ? handleHomeAnchor(link.href) : closeMenu())}
            className="text-[1.875rem] font-medium cursor-pointer
                       transition-all duration-300 hover:text-primary hover:tracking-[0.04em]"
            style={{
              fontFamily: 'var(--font-nav)',
              color: INK_HEADING,
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
              transitionDelay: menuOpen ? `${i * 80}ms` : '0ms',
            }}
          >
            {t.nav[link.key]}
          </Link>
        ))}
      </div>
    </nav>
  )
}
