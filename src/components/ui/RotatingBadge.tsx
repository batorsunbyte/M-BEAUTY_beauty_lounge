/* ----------------------------------------------------------------
   Rotating circular badge: "MSTYLE · BEAUTY LOUNGE · WIEN 1210 ·"
   spinning slowly around a serif M — the little editorial signature
   that overlaps the hero image cluster. Brand text stays Latin in
   every language (it mirrors the logo), so no i18n/RTL handling is
   needed. Decorative only.
   ---------------------------------------------------------------- */
export default function RotatingBadge({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-28 h-28 md:w-36 md:h-36 rounded-full backdrop-blur-md border shadow-lg ${className}`}
      style={{
        background: 'color-mix(in srgb, var(--color-bg-body) 78%, transparent)',
        borderColor: 'var(--color-border)',
      }}
    >
      <svg viewBox="0 0 100 100" className="badge-spin absolute inset-0 w-full h-full">
        <defs>
          <path id="badge-circle" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
        </defs>
        <text
          style={{
            fontFamily: 'var(--font-nav)',
            fontSize: '10.2px',
            fontWeight: 700,
            letterSpacing: '0.24em',
            fill: 'var(--color-text-muted)',
          }}
        >
          <textPath href="#badge-circle">MSTYLE · BEAUTY LOUNGE · WIEN 1210 ·</textPath>
        </text>
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-heading font-medium text-3xl md:text-4xl text-primary"
        style={{ transform: 'translateY(-2px)' }}
      >
        M
      </span>
    </div>
  )
}
