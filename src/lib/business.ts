/**
 * Single source of truth for MStyle Beauty Lounge contact & business data.
 * Update HERE and everything (contact section, footer, legal pages) follows.
 */
export const BUSINESS = {
  name: 'MStyle Beauty Lounge',
  shortName: 'MStyle',

  phoneDisplay: '+43 681 8113 5700',
  phoneHref: 'tel:+4368181135700',
  whatsappUrl: 'https://wa.me/4368181135700',

  email: 'Mstyle@unlmtd.at',

  instagramHandle: '@MStylesalon',
  instagramUrl: 'https://www.instagram.com/mstylesalon/',

  addressStreet: 'Floridsdorfer Markt 9',
  addressZip: '1210',
  addressCity: 'Wien',

  mapsUrl: 'https://maps.google.com/?q=Floridsdorfer+Markt+9,+1210+Wien',
  mapsEmbed: 'https://www.google.com/maps?q=Floridsdorfer+Markt+9,+1210+Wien&output=embed',

  /** TODO: replace with the real domain once registered (see GO-LIVE-CHECKLIST.md). */
  siteUrl: 'https://mstyle.beauty/',
} as const
