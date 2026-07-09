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

- [x] Domain registriert: **mstyle.beauty** (GoDaddy, 2026-07-06)
- [x] Alle URLs im Code auf https://mstyle.beauty umgestellt (index.html, business.ts, robots.txt, sitemap.xml, legal.json)
- [x] Deploy-Workflow: `.github/workflows/deploy.yml` — jeder Push/Merge auf main baut + deployt automatisch
- [x] `public/CNAME` = mstyle.beauty
- [x] **Repo auf public gestellt** (2026-07-08, manuell durch Zakir)
- [x] GitHub Pages aktiviert (build_type=workflow) + Custom Domain mstyle.beauty gesetzt
- [x] GoDaddy-DNS: 4× A-Record @ → 185.199.108–111.153; CNAME www → batorsunbyte.github.io
- [x] **HTTPS live + erzwungen** (2026-07-09): Zertifikat ausgestellt, `https_enforced=true`, http→https 301-Redirect verifiziert (Hinweis: Zertifikat hing anfangs wegen GitHub-Pages-Störung; Fix = Domain via API entfernen + neu setzen)
- [ ] `og-image.jpg` nach Deploy testen: WhatsApp/Instagram-Link-Vorschau prüfen

## 3. Echte Inhalte

- [ ] **Echte Fotos der Autodekoration + Raumdeko** vom Kunden (VIP-Seite nutzt bei der Autodeko aktuell ein Symbolbild) → `public/images/vip/vip-1..4.jpg`
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
