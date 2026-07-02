/**
 * Image path configuration.
 *
 * Each entry has:
 *   - `local`  → path served from public/images/
 *   - `fallback` → curated Unsplash URL used when the local file is missing
 *
 * How it works:
 *   1. The <img> tag tries to load the local path first.
 *   2. If the local file doesn't exist (404), the browser triggers `onError`.
 *   3. The onError handler swaps `src` to the fallback URL.
 *
 * To replace an image with a real MStyle photo, simply drop the file into
 * public/images/ under the matching name. All fallbacks below were visually
 * verified (beauty/lounge motifs, women only).
 */

/** Prefix public/ assets with the Vite base so they work on any subpath (GH Pages etc.). */
const asset = (p: string) => import.meta.env.BASE_URL + p

// --- Hero bento (4 tiles) ---
export const heroImages = {
  portrait: {
    local: asset('images/hero/hero-1.jpg'),
    fallback: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=500&h=700&fit=crop&crop=faces&q=80',
  },
  styling: {
    local: asset('images/hero/hero-2.jpg'),
    fallback: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=320&fit=crop&q=80',
  },
  makeup: {
    local: asset('images/hero/hero-3.jpg'),
    fallback: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=320&fit=crop&q=80',
  },
  lounge: {
    local: asset('images/hero/hero-4.jpg'),
    fallback: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&h=400&fit=crop&q=80',
  },
} as const

// --- Services bento (5 tiles, order = t.services.items) ---
export const serviceImages = {
  hair: {
    local: asset('images/services/service-1-haar.jpg'),
    fallback: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900&h=900&fit=crop&q=80',
  },
  nails: {
    local: asset('images/services/service-2-naegel.jpg'),
    fallback: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=800&fit=crop&q=80',
  },
  lashes: {
    local: asset('images/services/service-3-wimpern.jpg'),
    fallback: 'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?w=600&h=800&fit=crop&q=80',
  },
  face: {
    local: asset('images/services/service-4-gesicht.jpg'),
    fallback: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=800&fit=crop&q=80',
  },
  laser: {
    local: asset('images/services/service-5-laser.jpg'),
    fallback: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&h=600&fit=crop&crop=faces&q=80',
  },
} as const

// --- Testimonial avatars (women only) ---
export const testimonialAvatars = {
  avatar1: {
    local: asset('images/testimonials/avatar-1.jpg'),
    fallback: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
  },
  avatar2: {
    local: asset('images/testimonials/avatar-2.jpg'),
    fallback: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=150&h=150',
  },
  avatar3: {
    local: asset('images/testimonials/avatar-3.jpg'),
    fallback: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
  },
  avatar4: {
    local: asset('images/testimonials/avatar-4.jpg'),
    fallback: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150&h=150',
  },
  avatar5: {
    local: asset('images/testimonials/avatar-5.jpg'),
    fallback: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
  },
  avatar6: {
    local: asset('images/testimonials/avatar-6.jpg'),
    fallback: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150',
  },
  avatar7: {
    local: asset('images/testimonials/avatar-7.jpg'),
    fallback: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=150&h=150',
  },
  avatar8: {
    local: asset('images/testimonials/avatar-8.jpg'),
    fallback: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
  },
  avatar9: {
    local: asset('images/testimonials/avatar-9.jpg'),
    fallback: 'https://images.unsplash.com/photo-1592621385612-4d7129426394?auto=format&fit=crop&q=80&w=150&h=150',
  },
} as const

// --- Gallery bento grid (real lounge photos — swap the local files with your own) ---
export const galleryWork = [
  { local: asset('images/gallery/work-1.jpg'), fallback: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=900&h=900&fit=crop&q=80' },  // lounge interior (black + rosé)
  { local: asset('images/gallery/work-2.jpg'), fallback: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&h=600&fit=crop&q=80' },  // blow-dry & styling
  { local: asset('images/gallery/work-3.jpg'), fallback: 'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?w=600&h=600&fit=crop&q=80' },  // lash extensions
  { local: asset('images/gallery/work-4.jpg'), fallback: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&h=600&fit=crop&q=80' },  // nail design
  { local: asset('images/gallery/work-5.jpg'), fallback: 'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=600&h=600&fit=crop&q=80' },  // make-up palette
  { local: asset('images/gallery/work-6.jpg'), fallback: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=600&h=600&fit=crop&q=80' },  // bridal up-do
  { local: asset('images/gallery/work-7.jpg'), fallback: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&h=600&fit=crop&crop=faces&q=80' }, // brows & face
  { local: asset('images/gallery/work-8.jpg'), fallback: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=900&h=600&fit=crop&q=80' },  // styling stations
] as const

/** Image entry with local + fallback */
export interface ImageEntry {
  local: string
  fallback: string
}

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
