# MStyle Beauty Lounge

Website für **MStyle Beauty Lounge** — Beauty Lounge für Damen am Floridsdorfer Markt 9, 1210 Wien.

> Schönheit. Selbstbewusstsein. Du. · جمالك في أيدٍ أمينة

## Stack

- Vite 8 + React 19 + TypeScript
- Tailwind CSS v4 (Token-System in `src/index.css`)
- framer-motion, HashRouter
- Eigenes i18n (`src/i18n/`) — **Deutsch / English / العربية** inkl. RTL-Support
- Dark Mode als Marken-Default (Schwarz + Roségold), Light Mode verfügbar

## Leistungen (Inhalt)

Damenfrisuren & Styling · Nagelpflege · Wimpern & Augenbrauen · Gesichtsbehandlungen & Make-up · Laser-Haarentfernung · **Exklusiver Fahrservice** für Hochzeiten, Verlobungen & besondere Anlässe.

## Entwicklung

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc + vite build → dist/
npm run preview
```

## Wichtige Dateien

| Datei | Zweck |
| --- | --- |
| `src/lib/business.ts` | **Zentrale Kontaktdaten** (Telefon, E-Mail, Adresse, Instagram, WhatsApp) |
| `src/i18n/translations.ts` | Alle Texte in DE/EN/AR |
| `src/i18n/legal.json` | Impressum + Datenschutz (DE/EN, `[PLATZHALTER: …]` ausfüllen!) |
| `src/lib/images.ts` | Bilder: local-first (`public/images/…`) mit Unsplash-Fallback |
| `GO-LIVE-CHECKLIST.md` | Offene Punkte vor Go-Live |

## Eigene Fotos einpflegen

Einfach Dateien unter `public/images/` mit den Namen aus `src/lib/images.ts` ablegen
(z. B. `public/images/hero/hero-1.jpg`). Solange keine lokale Datei existiert,
greift automatisch der kuratierte Unsplash-Fallback.

---

Made by [SunByte](https://sunbyte.at)
