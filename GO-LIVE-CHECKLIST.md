# GO-LIVE-CHECKLIST — MStyle Beauty Lounge

Stand: 2026-07-02 · Alle Punkte prüfen, bevor die Seite öffentlich beworben wird.

## 1. Pflicht (rechtlich / inhaltlich)

- [ ] **Impressum vervollständigen** (`src/i18n/legal.json`): alle `[PLATZHALTER: …]`-Markierungen ersetzen
  - Vollständiger Firmenwortlaut + Rechtsform
  - Inhaber/in (vollständiger Name)
  - Gewerbewortlaut laut Gewerbeschein
  - Firmenbuch-/UID-Angaben bzw. Kleinunternehmer-Hinweis
- [ ] **Datenschutzerklärung** (`src/i18n/legal.json`): Platzhalter prüfen (Hosting-Anbieter, eingesetzte Dienste)
- [ ] **Öffnungszeiten** ergänzen, sobald bekannt:
  - Kontakt-Sektion (aktuell bewusst ohne Zeiten-Karte — stattdessen Instagram-Karte)
  - `index.html` JSON-LD → `openingHoursSpecification`
- [ ] **E-Mail-Adresse verifizieren**: `Mstyle@unlmtd.at` laut Flyer — Schreibweise/Erreichbarkeit testen

## 2. Domain & Deployment

- [ ] Echte Domain registrieren (z. B. mstyle-beauty.at) — bis dahin läuft alles auf GitHub Pages URL
- [ ] Nach Domain-Kauf ersetzen in: `index.html` (canonical, hreflang, og:url, JSON-LD), `src/lib/business.ts` (`siteUrl`), `public/robots.txt`, `public/sitemap.xml`
- [ ] GitHub Pages aktivieren (Settings → Pages → Deploy from branch bzw. Actions-Workflow)
- [ ] `og-image.jpg` nach Deploy testen: WhatsApp/Instagram-Link-Vorschau prüfen

## 3. Echte Inhalte

- [ ] **Echte Lounge-Fotos** einlegen unter `public/images/` (Namen siehe `src/lib/images.ts`):
  - `hero/hero-1..4.jpg` · `services/service-1..5-*.jpg` · `gallery/work-1..8.jpg`
  - Vorher komprimieren (max. 1600px, siehe Workflow: Größen-Check vor Commit)
- [ ] **Logo-Datei** vom Kunden (PNG/SVG mit Transparenz) → Navbar/Footer/Favicon ersetzen
  (aktuell: typografisches Lockup „MStyle / BEAUTY LOUNGE" + SVG-Favicon „M")
- [ ] **Echte Google-Bewertungen** sammeln → Testimonials nach und nach durch echte Zitate ersetzen
- [ ] **Google Business Profile** anlegen/claimen, Daten identisch zur Website halten
- [ ] Geo-Koordinaten im JSON-LD (`index.html`) gegen Google Business Profile prüfen (aktuell: Floridsdorfer Markt, approximiert)

## 4. Qualität

- [ ] Mobile-Test auf echtem Gerät (DE + AR! RTL-Layout durchscrollen)
- [ ] Instagram-Handle prüfen: Flyer zeigt „MStylesalon" — Link `instagram.com/mstylesalon` verifizieren
- [ ] WhatsApp-Nummer testen (`wa.me/4368181135700`)
- [ ] Lighthouse-Run (Performance/A11y/SEO)
