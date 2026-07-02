import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../i18n/LanguageContext'
import { LANGUAGES } from '../i18n/translations'

const NAV_HREFS = [
  { href: '#hero', key: 'home' as const },
  { href: '#showcase', key: 'services' as const },
  { href: '#contact', key: 'contact' as const },
]

/* ── Segmented 3-way language switcher (DE | EN | عربي) ── */
function LangSwitcher({ isDark }: { isDark: boolean }) {
  const { language, setLanguage, t } = useLanguage()
  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="inline-flex items-center rounded-full p-0.5 border"
      style={{
        borderColor: 'var(--color-border)',
        background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.75)',
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
              color: active ? '#ffffff' : isDark ? '#a39790' : '#7A6259',
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
function BrandLogo({ color }: { color: string }) {
  return (
    <Link to="/" className="flex flex-col leading-none cursor-pointer select-none whitespace-nowrap shrink-0">
      <span
        className="text-[1.25rem] md:text-[1.4rem] font-semibold"
        style={{ fontFamily: 'var(--font-heading)', color }}
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
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'

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

  const logoColor = isDark ? '#f0e7e2' : '#1F1310'
  const navLinkColor = isDark ? '#d9cfca' : '#55443F'
  const hamburgerColor = isDark ? '#f0e7e2' : '#1F1310'

  return (
    <nav
      className="fixed top-0 left-0 right-0 h-[72px] z-[100] transition-[background-color,backdrop-filter,box-shadow] duration-300"
      style={{
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: scrolled ? 'var(--color-bg-overlay)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled
          ? isDark
            ? '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.4)'
            : '0 1px 3px rgba(64,34,25,0.04), 0 4px 16px rgba(64,34,25,0.06)'
          : 'none',
      }}
      aria-label="Main navigation"
    >
      {/* ── Inner container ──────────────────────────────── */}
      <div className="w-full max-w-[1200px] mx-auto px-6 flex items-center justify-between h-full">

        {/* Logo */}
        <BrandLogo color={logoColor} />

        {/* Desktop links — right side */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_HREFS.map((link) => (
            <Link
              key={link.href}
              to="/"
              onClick={() => handleHomeAnchor(link.href)}
              className="relative text-[0.8125rem] font-medium tracking-[0.06em] uppercase cursor-pointer
                         transition-colors duration-200 hover:text-primary
                         after:content-[''] after:absolute after:start-0 after:-bottom-[2px]
                         after:h-[2px] after:w-0 after:bg-primary after:rounded-full
                         after:transition-[width] after:duration-300
                         hover:after:w-full"
              style={{ color: navLinkColor, transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', fontFamily: 'var(--font-nav)' }}
            >
              {t.nav[link.key]}
            </Link>
          ))}
          <Link
            to="/gallery"
            className="relative text-[0.8125rem] font-medium tracking-[0.06em] uppercase cursor-pointer
                       transition-colors duration-200 hover:text-primary
                       after:content-[''] after:absolute after:start-0 after:-bottom-[2px]
                       after:h-[2px] after:w-0 after:bg-primary after:rounded-full
                       after:transition-[width] after:duration-300
                       hover:after:w-full"
            style={{ color: navLinkColor, transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', fontFamily: 'var(--font-nav)' }}
          >
            {t.nav.gallery}
          </Link>

          {/* Language switcher */}
          <LangSwitcher isDark={isDark} />

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="relative w-9 h-9 rounded-full flex items-center justify-center
                       transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer
                       border border-[var(--color-border)]"
            style={{
              background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.8)',
              color: isDark ? '#d9a08f' : '#bd7f6c',
            }}
            aria-label={isDark ? t.nav.switchLight : t.nav.switchDark}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile: language switcher + theme toggle + hamburger */}
        <div className="hidden max-md:flex items-center gap-2">
          <LangSwitcher isDark={isDark} />
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center
                       transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer
                       border border-[var(--color-border)]"
            style={{
              background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.8)',
              color: isDark ? '#d9a08f' : '#bd7f6c',
            }}
            aria-label={isDark ? t.nav.switchLight : t.nav.switchDark}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

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
                backgroundColor: menuOpen ? '#bd7f6c' : hamburgerColor,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block w-[22px] h-[2px] rounded-full transition-opacity duration-200"
              style={{ backgroundColor: hamburgerColor, opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-[22px] h-[2px] rounded-full transition-[transform] duration-300"
              style={{
                backgroundColor: menuOpen ? '#bd7f6c' : hamburgerColor,
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
        {NAV_HREFS.map((link, i) => (
          <Link
            key={link.href}
            to="/"
            onClick={() => handleHomeAnchor(link.href)}
            className="text-[1.875rem] font-medium cursor-pointer
                       transition-all duration-300 hover:text-primary hover:tracking-[0.04em]"
            style={{
              fontFamily: 'var(--font-nav)',
              color: isDark ? '#f0e7e2' : '#1F1310',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
              transitionDelay: menuOpen ? `${i * 80}ms` : '0ms',
            }}
          >
            {t.nav[link.key]}
          </Link>
        ))}
        <Link
          to="/gallery"
          onClick={closeMenu}
          className="text-[1.875rem] font-medium cursor-pointer
                     transition-all duration-300 hover:text-primary hover:tracking-[0.04em]"
          style={{
            fontFamily: 'var(--font-nav)',
            color: isDark ? '#f0e7e2' : '#1F1310',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
            transitionDelay: menuOpen ? `${NAV_HREFS.length * 80}ms` : '0ms',
          }}
        >
          {t.nav.gallery}
        </Link>
      </div>
    </nav>
  )
}
