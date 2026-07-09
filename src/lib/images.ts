/**
 * Image path configuration.
 *
 * Each entry has:
 *   - `local`  → path served from public/images/ (or directly the fallback
 *                URL when the file doesn't exist — see below)
 *   - `fallback` → curated Unsplash URL used when the local file is missing
 *
 * How it works:
 *   1. At build time, vite.config.ts injects __LOCAL_IMAGES__ — the list of
 *      files that actually exist under public/images/.
 *   2. entry() checks that list: if the local file exists, `local` points to
 *      it; otherwise `local` IS the fallback URL, so the browser loads the
 *      Unsplash image immediately instead of paying a 404 round-trip first.
 *   3. onError → handleImageError stays as a safety net either way.
 *
 * To replace an image with a real MStyle photo, drop the file into
 * public/images/ under the matching name and restart/rebuild. All fallbacks
 * below were visually verified (beauty/lounge motifs, women only).
 * Fallbacks use `auto=format` (AVIF/WebP) + q=75 to keep mobile loads light.
 */

/** Prefix public/ assets with the Vite base so they work on any subpath (GH Pages etc.). */
const asset = (p: string) => import.meta.env.BASE_URL + p

const LOCAL_FILES = new Set(__LOCAL_IMAGES__.map((p) => `images/${p}`))

/** Image entry with local + fallback */
export interface ImageEntry {
  local: string
  fallback: string
}

const entry = (localPath: string, fallback: string): ImageEntry =>
  LOCAL_FILES.has(localPath)
    ? { local: asset(localPath), fallback }
    : { local: fallback, fallback }

// --- Hero bento (4 tiles) ---
export const heroImages = {
  portrait: entry('images/hero/hero-1.jpg', 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=500&h=700&fit=crop&crop=faces&auto=format&q=75'),
  styling: entry('images/hero/hero-2.jpg', 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=320&fit=crop&auto=format&q=75'),
  makeup: entry('images/hero/hero-3.jpg', 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=320&fit=crop&auto=format&q=75'),
  lounge: entry('images/hero/hero-4.jpg', 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&h=400&fit=crop&auto=format&q=75'),
} as const

// --- Services bento (5 tiles, order = t.services.items) ---
export const serviceImages = {
  hair: entry('images/services/service-1-haar.jpg', 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900&h=900&fit=crop&auto=format&q=75'),
  nails: entry('images/services/service-2-naegel.jpg', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=800&fit=crop&auto=format&q=75'),
  lashes: entry('images/services/service-3-wimpern.jpg', 'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?w=600&h=800&fit=crop&auto=format&q=75'),
  face: entry('images/services/service-4-gesicht.jpg', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=800&fit=crop&auto=format&q=75'),
  laser: entry('images/services/service-5-laser.jpg', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&h=600&fit=crop&crop=faces&auto=format&q=75'),
} as const

// --- Testimonial avatars (women only) ---
export const testimonialAvatars = {
  avatar1: entry('images/testimonials/avatar-1.jpg', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=75&w=150&h=150'),
  avatar2: entry('images/testimonials/avatar-2.jpg', 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=75&w=150&h=150'),
  avatar3: entry('images/testimonials/avatar-3.jpg', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=75&w=150&h=150'),
  avatar4: entry('images/testimonials/avatar-4.jpg', 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=75&w=150&h=150'),
  avatar5: entry('images/testimonials/avatar-5.jpg', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=75&w=150&h=150'),
  avatar6: entry('images/testimonials/avatar-6.jpg', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=75&w=150&h=150'),
  avatar7: entry('images/testimonials/avatar-7.jpg', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=75&w=150&h=150'),
  avatar8: entry('images/testimonials/avatar-8.jpg', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=75&w=150&h=150'),
  avatar9: entry('images/testimonials/avatar-9.jpg', 'https://images.unsplash.com/photo-1592621385612-4d7129426394?auto=format&fit=crop&q=75&w=150&h=150'),
} as const

// --- Gallery bento grid (real lounge photos — swap the local files with your own) ---
export const galleryWork = [
  entry('images/gallery/work-1.jpg', 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=900&h=900&fit=crop&auto=format&q=75'),  // lounge interior (black + rosé)
  entry('images/gallery/work-2.jpg', 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&h=600&fit=crop&auto=format&q=75'),  // blow-dry & styling
  entry('images/gallery/work-3.jpg', 'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?w=600&h=600&fit=crop&auto=format&q=75'),  // lash extensions
  entry('images/gallery/work-4.jpg', 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&h=600&fit=crop&auto=format&q=75'),  // nail design
  entry('images/gallery/work-5.jpg', 'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=600&h=600&fit=crop&auto=format&q=75'),  // make-up palette
  entry('images/gallery/work-6.jpg', 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=600&h=600&fit=crop&auto=format&q=75'),  // bridal up-do
  entry('images/gallery/work-7.jpg', 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&h=600&fit=crop&crop=faces&auto=format&q=75'), // brows & face
  entry('images/gallery/work-8.jpg', 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=900&h=600&fit=crop&auto=format&q=75'),  // styling stations
] as const

// --- Journey (scroll story, order = t.journey.steps) ---
export const journeyImages = [
  entry('images/journey/step-1.jpg', 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=900&h=1100&fit=crop&auto=format&q=75'),  // wash & care
  entry('images/journey/step-2.jpg', 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=900&h=1100&fit=crop&auto=format&q=75'),   // curls & styling
  entry('images/journey/step-3.jpg', 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=900&h=1100&fit=crop&auto=format&q=75'), // up-do finishing touches
  entry('images/journey/step-4.jpg', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&h=1100&fit=crop&auto=format&q=75'), // big-night reveal
] as const

// --- VIP & occasions page (order = t.vip.items) ---
export const vipImages = [
  entry('images/vip/vip-1-styling.jpg', 'https://images.unsplash.com/photo-1629326017926-9cad9c909196?w=900&h=700&fit=crop&auto=format&q=75'),   // bridal up-do with pearl vine + veil
  entry('images/vip/vip-2-fahrservice.jpg', 'https://images.unsplash.com/photo-1762155815397-7ef09ece751c?w=900&h=700&fit=crop&auto=format&q=75'), // bride seated in the wedding car, open door
  entry('images/vip/vip-3-dekoration.jpg', 'https://images.unsplash.com/photo-1708601421001-fbce55077b95?w=900&h=700&fit=crop&auto=format&q=75'),  // rosé ballroom with hanging florals
  entry('images/vip/vip-4-auto.jpg', 'https://images.unsplash.com/photo-1561100966-f6aa0145e8e6?w=900&h=700&fit=crop&auto=format&q=75'),       // white vintage wedding car, rose garland on the hood
] as const

// --- Before/after comparison (one portrait; "before" is graded via CSS filter) ---
export const beforeAfterImage = entry(
  'images/before-after/result.jpg',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1100&h=1300&fit=crop&crop=faces&auto=format&q=75',
)

/**
 * Handles an <img> onError by falling back to the URL.
 * Usage: <img src={entry.local} onError={handleImageError(entry.fallback)} />
 */
export function handleImageError(fallbackUrl: string) {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    if (img.src !== fallbackUrl) {
      img.src = fallbackUrl
    }
  }
}
