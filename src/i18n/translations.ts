export type Language = 'de' | 'en' | 'ar'

export const LANGUAGES: { code: Language; label: string; name: string }[] = [
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ar', label: 'عربي', name: 'العربية' },
]

/** Languages rendered right-to-left — keeps <html dir> in sync (see LanguageContext). */
export const RTL_LANGUAGES: Language[] = ['ar']

export interface TranslationStrings {
  // Navbar
  nav: {
    home: string
    services: string
    contact: string
    gallery: string
    switchLight: string
    switchDark: string
    toggleMenu: string
    language: string
  }

  // Hero section
  hero: {
    eyebrow: string
    titlePart1: string
    titleElegance: string
    titlePart2: string
    description: string
    ctaPrimary: string
    ctaSecondary: string
    stats: Array<{ value: string; label: string }>
    ticker: string[]
  }

  // Services bento section
  services: {
    label: string
    titleLine1: string
    titleLine2: string
    description: string
    cta: string
    items: Array<{
      title: string
      tag: string
      alt: string
    }>
  }

  // Scroll journey ("a visit at MStyle") section
  journey: {
    label: string
    titlePart1: string
    titleAccent: string
    description: string
    scrollHint: string
    steps: Array<{ title: string; text: string }>
  }

  // Before/after comparison section
  beforeAfter: {
    label: string
    titlePart1: string
    titleAccent: string
    description: string
    before: string
    after: string
    caption: string
    sliderAria: string
  }

  // Exclusive shuttle service section
  shuttle: {
    badge: string
    titlePart1: string
    titleAccent: string
    description: string
    note: string
    cta: string
  }

  // Contact section
  contact: {
    badge: string
    titlePart1: string
    titlePerfectLook: string
    subtitle: string
    addressStreet: string
    addressCity: string
    openInMaps: string
    call: string
    phoneNote: string
    instagram: string
    instagramNote: string
    email: string
    emailNote: string
    ctaTitle: string
    ctaSubtitle: string
    bookAppointment: string
    callUs: string
    whatsapp: string
  }

  // Footer
  footer: {
    tagline: string
    services: string
    serviceLinks: string[]
    studio: string
    gallery: string
    contact: string
    booking: string
    contactLabel: string
    cityCountry: string
    rights: string
    designedInVienna: string
    tags: string[]
    impressum: string
    datenschutz: string
    backToHome: string
  }

  // Testimonials
  testimonials: {
    eyebrow: string
    heading: string
    subtitle: string
    regionAria: string
    avatarAlt: string
    items: Array<{
      text: string
      name: string
      role: string
    }>
  }

  // Gallery page
  gallery: {
    eyebrow: string
    title: string
    subtitle: string
    tiles: Array<{ title: string; tag: string }>
  }

  // Legal pages
  legal: {
    /** Shown above the (German) legal text when the UI language has no own legal version. */
    fallbackNotice: string
    updatedLabel: string
  }
}

const de: TranslationStrings = {
  nav: {
    home: 'Startseite',
    services: 'Leistungen',
    contact: 'Kontakt',
    gallery: 'Galerie',
    switchLight: 'Zum hellen Modus wechseln',
    switchDark: 'Zum dunklen Modus wechseln',
    toggleMenu: 'Menü umschalten',
    language: 'Sprache wählen',
  },

  hero: {
    eyebrow: 'Beauty Lounge am Floridsdorfer Markt',
    titlePart1: 'Schönheit. ',
    titleElegance: 'Selbstbewusstsein.',
    titlePart2: ' Du.',
    description:
      'Erleben Sie professionelle Beauty-Behandlungen in eleganter, privater Atmosphäre — von Damenfrisuren über Wimpern und Make-up bis zur dauerhaften Laser-Haarentfernung. Ihre Schönheit in besten Händen.',
    ctaPrimary: 'Termin vereinbaren',
    ctaSecondary: 'Unsere Leistungen',
    stats: [
      { value: '5', label: 'Beauty-Bereiche' },
      { value: 'VIP', label: 'Fahrservice' },
      { value: '1210', label: 'Wien-Floridsdorf' },
    ],
    ticker: [
      'Damenfrisuren',
      'Styling',
      'Nagelpflege',
      'Wimpern',
      'Augenbrauen',
      'Gesichtsbehandlungen',
      'Make-up',
      'Laser-Haarentfernung',
      'Fahrservice',
    ],
  },

  services: {
    label: 'Unsere Leistungen',
    titleLine1: 'Beauty von Kopf',
    titleLine2: 'bis Fingerspitze',
    description:
      'Damenfrisuren, Nagelpflege, Wimpern & Augenbrauen, Gesichtsbehandlungen & Make-up sowie dauerhafte Laser-Haarentfernung — professionell, hygienisch und mit Liebe zum Detail.',
    cta: 'Termin vereinbaren',
    items: [
      { title: 'Damenfrisuren & Styling', tag: 'Haar', alt: 'Stylistin föhnt und stylt das Haar einer Kundin' },
      { title: 'Nagelpflege', tag: 'Nägel', alt: 'Gepflegte Hände mit elegantem Nageldesign' },
      { title: 'Wimpern & Augenbrauen', tag: 'Augen', alt: 'Perfekt geformte Wimpern und Augenbrauen in Nahaufnahme' },
      { title: 'Gesichtsbehandlungen & Make-up', tag: 'Beauty', alt: 'Professionelles Make-up wird aufgetragen' },
      { title: 'Laser-Haarentfernung', tag: 'Laser', alt: 'Sanfte, dauerhafte Laser-Haarentfernung im Studio' },
    ],
  },

  journey: {
    label: 'Das MStyle-Erlebnis',
    titlePart1: 'Vom Ankommen ',
    titleAccent: 'bis zum Auftritt',
    description: 'Scrollen Sie durch einen Besuch bei uns — vier Momente, die den Unterschied machen.',
    scrollHint: 'Weiterscrollen',
    steps: [
      {
        title: 'Beratung & Pflege',
        text: 'Wir nehmen uns Zeit, hören zu und bereiten Haar und Haut mit hochwertiger Pflege vor.',
      },
      {
        title: 'Styling',
        text: 'Föhnen, Locken oder glätten — Ihre Frisur nimmt Form an, mit Präzision und Premium-Produkten.',
      },
      {
        title: 'Feinschliff',
        text: 'Hochstecken, Wimpern, Make-up: die Details, die aus einem Look Ihren Look machen.',
      },
      {
        title: 'Ihr Auftritt',
        text: 'Sie verlassen die Lounge bereit für Ihren Moment — auf Wunsch bringt Sie unser Fahrservice direkt hin.',
      },
    ],
  },

  beforeAfter: {
    label: 'Vorher / Nachher',
    titlePart1: 'Der Unterschied, ',
    titleAccent: 'den man sieht',
    description: 'Ziehen Sie den Regler zur Seite und sehen Sie, was professionelles Styling ausmacht.',
    before: 'Vorher',
    after: 'Nachher',
    caption: 'Beispielhafte Darstellung — echte Ergebnisse laufend auf unserem Instagram.',
    sliderAria: 'Vorher-Nachher-Vergleich',
  },

  shuttle: {
    badge: 'Exklusiver Service',
    titlePart1: 'Ihr persönlicher ',
    titleAccent: 'Fahrservice',
    description:
      'Für Hochzeiten, Verlobungen, Partys und besondere Anlässe bieten wir unseren Kundinnen einen Fahrservice von und zur Lounge an — bequem, sicher und stilvoll.',
    note: 'Weil Sie das Beste verdienen.',
    cta: 'Fahrservice anfragen',
  },

  contact: {
    badge: 'Besuchen Sie unsere Lounge',
    titlePart1: 'Lassen Sie uns Ihren ',
    titlePerfectLook: 'perfekten Look kreieren',
    subtitle:
      'Sie finden uns direkt am Floridsdorfer Markt in 1210 Wien. Kommen Sie vorbei, rufen Sie an oder schreiben Sie uns auf WhatsApp — wir freuen uns auf Sie.',
    addressStreet: 'Floridsdorfer Markt 9',
    addressCity: '1210 Wien, Österreich',
    openInMaps: 'In Maps öffnen',
    call: 'Anrufen',
    phoneNote: 'Wir sind gerne für Sie da',
    instagram: 'Instagram',
    instagramNote: 'Looks, Ergebnisse & Aktionen',
    email: 'E-Mail',
    emailNote: 'Antwort meist binnen 24 Stunden',
    ctaTitle: 'Bereit für Ihren Termin?',
    ctaSubtitle: 'Schreiben Sie uns auf WhatsApp oder rufen Sie an — wir kümmern uns um den Rest.',
    bookAppointment: 'Termin buchen',
    callUs: 'Anrufen',
    whatsapp: 'WhatsApp',
  },

  footer: {
    tagline: 'Schönheit. Selbstbewusstsein. Du. — Ihre Beauty Lounge am Floridsdorfer Markt, 1210 Wien.',
    services: 'Leistungen',
    serviceLinks: [
      'Damenfrisuren & Styling',
      'Nagelpflege',
      'Wimpern & Augenbrauen',
      'Gesichtsbehandlungen & Make-up',
      'Laser-Haarentfernung',
    ],
    studio: 'Lounge',
    gallery: 'Galerie',
    contact: 'Kontakt',
    booking: 'Termin buchen',
    contactLabel: 'Kontakt',
    cityCountry: 'Floridsdorfer Markt 9, 1210 Wien',
    rights: 'Alle Rechte vorbehalten.',
    designedInVienna: 'Mit Sorgfalt in Wien gestaltet',
    tags: ['Damen', 'Beauty', 'Lounge'],
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
    backToHome: 'Zurück zur Startseite',
  },

  testimonials: {
    eyebrow: 'Stimmen',
    heading: 'Was unsere Kundinnen sagen',
    subtitle:
      'Vertrauen entsteht durch Ergebnisse. Das sagen Kundinnen über ihre Besuche bei MStyle.',
    regionAria: 'Kundenstimmen',
    avatarAlt: 'Avatar von {name}',
    items: [
      {
        text: 'Endlich eine Lounge, in der ich mich als Frau komplett wohlfühle. Diskret, elegant und das Styling sitzt jedes Mal perfekt.',
        name: 'Amina K.',
        role: 'Stammkundin',
      },
      {
        text: 'Für meine Hochzeit wurde ich komplett gestylt — Haare, Make-up, Wimpern. Und der Fahrservice hat mich pünktlich und stressfrei hingebracht. Ein Traum.',
        name: 'Sarah M.',
        role: 'Braut',
      },
      {
        text: 'Nach der Laser-Behandlung bin ich das ständige Rasieren endlich los. Professionell aufgeklärt, sanft durchgeführt, sichtbares Ergebnis.',
        name: 'Dilara T.',
        role: 'Stammkundin',
      },
      {
        text: 'Meine Wimpernverlängerung hält wochenlang und sieht trotzdem natürlich aus. Genau das, was ich gesucht habe.',
        name: 'Jasmin H.',
        role: 'Stammkundin',
      },
      {
        text: 'Das Abend-Make-up für die Verlobung meiner Schwester war umwerfend — auf den Fotos sah ich besser aus als je zuvor.',
        name: 'Nour A.',
        role: 'Kundin',
      },
      {
        text: 'Saubere Arbeit, ehrliche Beratung und Nägel, die wochenlang halten. Ich komme jedes Mal gerne wieder.',
        name: 'Melanie S.',
        role: 'Stammkundin',
      },
      {
        text: 'Meine Augenbrauen wurden noch nie so schön geformt. Kleine Veränderung, riesiger Unterschied im ganzen Gesicht.',
        name: 'Katharina B.',
        role: 'Neukundin',
      },
      {
        text: 'Die Gesichtsbehandlung war pure Erholung — meine Haut strahlt seitdem und die Atmosphäre ist herrlich entspannt.',
        name: 'Rania E.',
        role: 'Kundin',
      },
      {
        text: 'Man merkt sofort, dass hier mit Herz gearbeitet wird. Persönlich, herzlich und immer auf meine Wünsche eingegangen.',
        name: 'Leyla Ö.',
        role: 'Stammkundin',
      },
    ],
  },

  gallery: {
    eyebrow: 'Galerie',
    title: 'Einblicke in die Lounge',
    subtitle:
      'Ein Blick in unsere Beauty Lounge am Floridsdorfer Markt — Styling, Wimpern, Make-up und Momente, die bleiben.',
    tiles: [
      { title: 'Unsere Lounge', tag: 'Ambiente' },
      { title: 'Föhnen & Styling', tag: 'Haar' },
      { title: 'Wimpernverlängerung', tag: 'Wimpern' },
      { title: 'Nageldesign', tag: 'Nägel' },
      { title: 'Make-up', tag: 'Beauty' },
      { title: 'Braut-Styling', tag: 'Anlässe' },
      { title: 'Augenbrauen', tag: 'Brauen' },
      { title: 'Styling-Plätze', tag: 'Ambiente' },
    ],
  },

  legal: {
    fallbackNotice: '',
    updatedLabel: 'Stand',
  },
}

const en: TranslationStrings = {
  nav: {
    home: 'Home',
    services: 'Services',
    contact: 'Contact',
    gallery: 'Gallery',
    switchLight: 'Switch to light mode',
    switchDark: 'Switch to dark mode',
    toggleMenu: 'Toggle menu',
    language: 'Choose language',
  },

  hero: {
    eyebrow: 'Beauty Lounge at Floridsdorfer Markt, Vienna',
    titlePart1: 'Beauty. ',
    titleElegance: 'Confidence.',
    titlePart2: ' You.',
    description:
      'Experience professional beauty treatments in an elegant, private atmosphere — from ladies’ hairstyling to lashes, make-up and permanent laser hair removal. Your beauty in the best hands.',
    ctaPrimary: 'Book Appointment',
    ctaSecondary: 'Our Services',
    stats: [
      { value: '5', label: 'Beauty Services' },
      { value: 'VIP', label: 'Shuttle Service' },
      { value: '1210', label: 'Vienna-Floridsdorf' },
    ],
    ticker: [
      'Ladies’ Hair',
      'Styling',
      'Nail Care',
      'Lashes',
      'Brows',
      'Facials',
      'Make-up',
      'Laser Hair Removal',
      'Shuttle Service',
    ],
  },

  services: {
    label: 'Our Services',
    titleLine1: 'Beauty from head',
    titleLine2: 'to fingertip',
    description:
      'Ladies’ hairstyling, nail care, lashes & brows, facials & make-up and permanent laser hair removal — professional, hygienic and with an eye for every detail.',
    cta: 'Book an Appointment',
    items: [
      { title: 'Ladies’ Hair & Styling', tag: 'Hair', alt: 'Stylist blow-drying and styling a client’s hair' },
      { title: 'Nail Care', tag: 'Nails', alt: 'Well-groomed hands with elegant nail design' },
      { title: 'Lashes & Brows', tag: 'Eyes', alt: 'Perfectly shaped lashes and brows in close-up' },
      { title: 'Facials & Make-up', tag: 'Beauty', alt: 'Professional make-up being applied' },
      { title: 'Laser Hair Removal', tag: 'Laser', alt: 'Gentle, permanent laser hair removal in the studio' },
    ],
  },

  journey: {
    label: 'The MStyle Experience',
    titlePart1: 'From walking in ',
    titleAccent: 'to turning heads',
    description: 'Scroll through a visit with us — four moments that make the difference.',
    scrollHint: 'Keep scrolling',
    steps: [
      {
        title: 'Consultation & Care',
        text: 'We take our time, listen, and prepare hair and skin with premium care.',
      },
      {
        title: 'Styling',
        text: 'Blow-dry, curls or sleek — your hairstyle takes shape with precision and premium products.',
      },
      {
        title: 'Finishing Touches',
        text: 'Up-dos, lashes, make-up: the details that turn a look into your look.',
      },
      {
        title: 'Your Moment',
        text: 'You leave the lounge ready for your moment — and on request, our shuttle takes you right there.',
      },
    ],
  },

  beforeAfter: {
    label: 'Before / After',
    titlePart1: 'A difference ',
    titleAccent: 'you can see',
    description: 'Drag the slider and see what professional styling really does.',
    before: 'Before',
    after: 'After',
    caption: 'Illustrative example — real results regularly on our Instagram.',
    sliderAria: 'Before-after comparison',
  },

  shuttle: {
    badge: 'Exclusive Service',
    titlePart1: 'Your personal ',
    titleAccent: 'shuttle service',
    description:
      'For weddings, engagements, parties and special occasions we offer our clients a shuttle service to and from the lounge — comfortable, safe and stylish.',
    note: 'Because you deserve the best.',
    cta: 'Request Shuttle Service',
  },

  contact: {
    badge: 'Visit Our Lounge',
    titlePart1: 'Let’s Create Your ',
    titlePerfectLook: 'Perfect Look',
    subtitle:
      'You will find us right at Floridsdorfer Markt in 1210 Vienna. Drop by, call us or message us on WhatsApp — we look forward to welcoming you.',
    addressStreet: 'Floridsdorfer Markt 9',
    addressCity: '1210 Vienna, Austria',
    openInMaps: 'Open in Maps',
    call: 'Call',
    phoneNote: 'We are happy to help',
    instagram: 'Instagram',
    instagramNote: 'Looks, results & offers',
    email: 'Email',
    emailNote: 'We usually reply within 24 hours',
    ctaTitle: 'Ready for your appointment?',
    ctaSubtitle: 'Message us on WhatsApp or give us a call — we will take care of the rest.',
    bookAppointment: 'Book Appointment',
    callUs: 'Call Us',
    whatsapp: 'WhatsApp',
  },

  footer: {
    tagline: 'Beauty. Confidence. You. — Your beauty lounge at Floridsdorfer Markt, Vienna.',
    services: 'Services',
    serviceLinks: [
      'Ladies’ Hair & Styling',
      'Nail Care',
      'Lashes & Brows',
      'Facials & Make-up',
      'Laser Hair Removal',
    ],
    studio: 'Lounge',
    gallery: 'Gallery',
    contact: 'Contact',
    booking: 'Book Appointment',
    contactLabel: 'Contact',
    cityCountry: 'Floridsdorfer Markt 9, 1210 Vienna',
    rights: 'All rights reserved.',
    designedInVienna: 'Designed with care in Vienna',
    tags: ['Ladies', 'Beauty', 'Lounge'],
    impressum: 'Imprint',
    datenschutz: 'Privacy Policy',
    backToHome: 'Back to home',
  },

  testimonials: {
    eyebrow: 'Reviews',
    heading: 'What Our Clients Say',
    subtitle:
      'Trust is built on results. Here is what clients say about their visits to MStyle.',
    regionAria: 'Client testimonials',
    avatarAlt: 'Avatar of {name}',
    items: [
      {
        text: 'Finally a lounge where I feel completely at ease as a woman. Discreet, elegant, and the styling is spot on every single time.',
        name: 'Amina K.',
        role: 'Loyal Client',
      },
      {
        text: 'They styled me head to toe for my wedding — hair, make-up, lashes. And the shuttle service got me there on time and stress-free. A dream.',
        name: 'Sarah M.',
        role: 'Bride',
      },
      {
        text: 'After the laser treatment I am finally done with constant shaving. Honest consultation, gentle treatment, visible results.',
        name: 'Dilara T.',
        role: 'Loyal Client',
      },
      {
        text: 'My lash extensions last for weeks and still look natural. Exactly what I was looking for.',
        name: 'Jasmin H.',
        role: 'Loyal Client',
      },
      {
        text: 'The evening make-up for my sister’s engagement was stunning — I have never looked better in photos.',
        name: 'Nour A.',
        role: 'Client',
      },
      {
        text: 'Clean work, honest advice and nails that last for weeks. I am always happy to come back.',
        name: 'Melanie S.',
        role: 'Loyal Client',
      },
      {
        text: 'My brows have never been shaped this beautifully. A small change with a huge impact on my whole face.',
        name: 'Katharina B.',
        role: 'New Client',
      },
      {
        text: 'The facial was pure relaxation — my skin has been glowing ever since and the atmosphere is wonderfully calm.',
        name: 'Rania E.',
        role: 'Client',
      },
      {
        text: 'You can tell right away that they work with heart here. Personal, warm and always attentive to my wishes.',
        name: 'Leyla Ö.',
        role: 'Loyal Client',
      },
    ],
  },

  gallery: {
    eyebrow: 'Gallery',
    title: 'Inside the Lounge',
    subtitle:
      'A look inside our beauty lounge at Floridsdorfer Markt — styling, lashes, make-up and moments that last.',
    tiles: [
      { title: 'Our Lounge', tag: 'Interior' },
      { title: 'Blow-dry & Styling', tag: 'Hair' },
      { title: 'Lash Extensions', tag: 'Lashes' },
      { title: 'Nail Design', tag: 'Nails' },
      { title: 'Make-up', tag: 'Beauty' },
      { title: 'Bridal Styling', tag: 'Occasions' },
      { title: 'Brows', tag: 'Brows' },
      { title: 'Styling Stations', tag: 'Interior' },
    ],
  },

  legal: {
    fallbackNotice: 'The legally binding version of this page is German. An English version is provided for convenience.',
    updatedLabel: 'Last updated',
  },
}

const ar: TranslationStrings = {
  nav: {
    home: 'الرئيسية',
    services: 'خدماتنا',
    contact: 'اتصلي بنا',
    gallery: 'المعرض',
    switchLight: 'التبديل إلى الوضع الفاتح',
    switchDark: 'التبديل إلى الوضع الداكن',
    toggleMenu: 'فتح/إغلاق القائمة',
    language: 'اختاري اللغة',
  },

  hero: {
    eyebrow: 'بيوتي لاونج في قلب فلوريدسدورف — فيينا',
    titlePart1: 'جمالُكِ. ',
    titleElegance: 'ثقتُكِ.',
    titlePart2: ' أنتِ.',
    description:
      'استمتعي بخدمات تجميل احترافية في أجواء أنيقة وخصوصية تامة — من تصفيف الشعر إلى الرموش والمكياج وإزالة الشعر بالليزر الدائمة. جمالك في أيدٍ أمينة.',
    ctaPrimary: 'احجزي موعدك',
    ctaSecondary: 'خدماتنا',
    stats: [
      { value: '5', label: 'أقسام تجميل' },
      { value: 'VIP', label: 'خدمة توصيل' },
      { value: '1210', label: 'فيينا — فلوريدسدورف' },
    ],
    ticker: [
      'تصفيف الشعر',
      'ستايل',
      'العناية بالأظافر',
      'رموش',
      'حواجب',
      'العناية بالبشرة',
      'مكياج',
      'إزالة الشعر بالليزر',
      'خدمة التوصيل',
    ],
  },

  services: {
    label: 'خدماتنا',
    titleLine1: 'جمالٌ متكامل،',
    titleLine2: 'من الشعر حتى أطراف الأصابع',
    description:
      'تصفيف الشعر والستايل، العناية بالأظافر، الرموش والحواجب، العناية بالبشرة والمكياج، وإزالة الشعر بالليزر الدائمة — باحترافية ونظافة تامة وعناية بأدق التفاصيل.',
    cta: 'احجزي موعدك الآن',
    items: [
      { title: 'تصفيف الشعر والستايل', tag: 'شعر', alt: 'مصففة شعر تجفف وتصفف شعر زبونة' },
      { title: 'العناية بالأظافر', tag: 'أظافر', alt: 'يدان معتنى بهما مع تصميم أظافر أنيق' },
      { title: 'الرموش والحواجب', tag: 'عيون', alt: 'رموش وحواجب مرسومة بإتقان عن قرب' },
      { title: 'العناية بالبشرة والمكياج', tag: 'بشرة', alt: 'وضع مكياج احترافي' },
      { title: 'إزالة الشعر بالليزر', tag: 'ليزر', alt: 'إزالة شعر دائمة ولطيفة بالليزر في الصالون' },
    ],
  },

  journey: {
    label: 'تجربة MStyle',
    titlePart1: 'من لحظة وصولكِ ',
    titleAccent: 'إلى إطلالتكِ المثالية',
    description: 'مرّري لتعيشي زيارة في صالوننا — أربع لحظات تصنع الفرق.',
    scrollHint: 'تابعي التمرير',
    steps: [
      {
        title: 'استشارة وعناية',
        text: 'نأخذ وقتنا، نستمع إليكِ، ونحضّر الشعر والبشرة بمنتجات عناية فاخرة.',
      },
      {
        title: 'التصفيف',
        text: 'تجفيف، تمويج أو تنعيم — تسريحتكِ تأخذ شكلها بدقة وبمنتجات مميزة.',
      },
      {
        title: 'اللمسات الأخيرة',
        text: 'تسريحات مرفوعة، رموش، مكياج: التفاصيل التي تجعل الإطلالة إطلالتكِ.',
      },
      {
        title: 'لحظتكِ',
        text: 'تغادرين الصالون جاهزة للحظتكِ — وعند الرغبة توصلكِ خدمتنا إلى مناسبتكِ مباشرة.',
      },
    ],
  },

  beforeAfter: {
    label: 'قبل / بعد',
    titlePart1: 'فرقٌ ',
    titleAccent: 'تراه العين',
    description: 'اسحبي المؤشر لتري ما يصنعه التصفيف الاحترافي.',
    before: 'قبل',
    after: 'بعد',
    caption: 'صورة توضيحية — النتائج الحقيقية تجدينها على إنستغرامنا.',
    sliderAria: 'مقارنة قبل وبعد',
  },

  shuttle: {
    badge: 'خدمة مميزة',
    titlePart1: 'خدمة توصيل ',
    titleAccent: 'خاصة بكِ',
    description:
      'نوفر خدمة توصيل الزبائن من وإلى الصالون للمناسبات الخاصة — الأعراس، الخطوبات، والحفلات — لتستمتعي بتجربة راقية ومريحة دون عناء.',
    note: 'لأنكِ تستحقين الأفضل.',
    cta: 'اطلبي خدمة التوصيل',
  },

  contact: {
    badge: 'زورينا في الصالون',
    titlePart1: 'لنبتكر معاً ',
    titlePerfectLook: 'إطلالتكِ المثالية',
    subtitle:
      'تجديننا مباشرة في سوق فلوريدسدورف في الحي 1210 بفيينا. مري بنا، اتصلي أو راسلينا على واتساب — يسعدنا استقبالك.',
    addressStreet: 'Floridsdorfer Markt 9',
    addressCity: '1210 فيينا، النمسا',
    openInMaps: 'افتحي الخريطة',
    call: 'اتصلي بنا',
    phoneNote: 'يسعدنا تواصلك معنا',
    instagram: 'إنستغرام',
    instagramNote: 'إطلالات، نتائج وعروض',
    email: 'البريد الإلكتروني',
    emailNote: 'نرد عادةً خلال 24 ساعة',
    ctaTitle: 'جاهزة لموعدك؟',
    ctaSubtitle: 'راسلينا على واتساب أو اتصلي بنا — لأنكِ تستحقين الأفضل.',
    bookAppointment: 'احجزي موعداً',
    callUs: 'اتصلي',
    whatsapp: 'واتساب',
  },

  footer: {
    tagline: 'جمالُكِ. ثقتُكِ. أنتِ. — صالونك للتجميل في سوق فلوريدسدورف، فيينا 1210.',
    services: 'خدماتنا',
    serviceLinks: [
      'تصفيف الشعر والستايل',
      'العناية بالأظافر',
      'الرموش والحواجب',
      'العناية بالبشرة والمكياج',
      'إزالة الشعر بالليزر',
    ],
    studio: 'الصالون',
    gallery: 'المعرض',
    contact: 'اتصلي بنا',
    booking: 'حجز موعد',
    contactLabel: 'تواصلي معنا',
    cityCountry: 'Floridsdorfer Markt 9, 1210 Wien',
    rights: 'جميع الحقوق محفوظة.',
    designedInVienna: 'صُمم بعناية في فيينا',
    tags: ['للسيدات', 'تجميل', 'لاونج'],
    impressum: 'بيانات الناشر',
    datenschutz: 'سياسة الخصوصية',
    backToHome: 'العودة إلى الصفحة الرئيسية',
  },

  testimonials: {
    eyebrow: 'آراء زبوناتنا',
    heading: 'ماذا تقول زبوناتنا',
    subtitle:
      'الثقة تُبنى بالنتائج. هذا ما تقوله زبوناتنا عن زياراتهن لـ MStyle.',
    regionAria: 'آراء الزبونات',
    avatarAlt: 'صورة {name}',
    items: [
      {
        text: 'أخيراً صالون أشعر فيه براحة تامة كامرأة. خصوصية، أناقة، وستايل مثالي في كل زيارة.',
        name: 'أمينة ك.',
        role: 'زبونة دائمة',
      },
      {
        text: 'جهزوني بالكامل ليوم زفافي — شعر، مكياج، رموش. وخدمة التوصيل أوصلتني في الوقت المحدد ومن دون أي توتر. حلم!',
        name: 'سارة م.',
        role: 'عروس',
      },
      {
        text: 'بعد جلسات الليزر تخلصت أخيراً من الحلاقة المستمرة. استشارة صادقة، جلسات لطيفة، ونتيجة واضحة.',
        name: 'ديلارا ت.',
        role: 'زبونة دائمة',
      },
      {
        text: 'رموشي تدوم أسابيع وتبدو طبيعية تماماً. هذا بالضبط ما كنت أبحث عنه.',
        name: 'ياسمين هـ.',
        role: 'زبونة دائمة',
      },
      {
        text: 'مكياج السهرة لخطوبة أختي كان مذهلاً — لم أبدُ في الصور أجمل من ذلك يوماً.',
        name: 'نور أ.',
        role: 'زبونة',
      },
      {
        text: 'عمل نظيف، نصيحة صادقة، وأظافر تدوم أسابيع. أعود في كل مرة بكل سرور.',
        name: 'ميلاني س.',
        role: 'زبونة دائمة',
      },
      {
        text: 'لم تُرسم حواجبي بهذا الجمال من قبل. تغيير صغير وفرق كبير في الوجه كله.',
        name: 'كاتارينا ب.',
        role: 'زبونة جديدة',
      },
      {
        text: 'جلسة العناية بالبشرة كانت استرخاءً خالصاً — بشرتي تتألق منذ ذلك الحين والأجواء هادئة ورائعة.',
        name: 'رانيا إ.',
        role: 'زبونة',
      },
      {
        text: 'تشعرين فوراً أن العمل هنا يتم بحب. تعامل شخصي ودافئ واهتمام حقيقي برغباتي.',
        name: 'ليلى أو.',
        role: 'زبونة دائمة',
      },
    ],
  },

  gallery: {
    eyebrow: 'المعرض',
    title: 'من داخل الصالون',
    subtitle:
      'نظرة داخل صالوننا في سوق فلوريدسدورف — ستايل، رموش، مكياج ولحظات لا تُنسى.',
    tiles: [
      { title: 'صالوننا', tag: 'أجواء' },
      { title: 'تجفيف وتصفيف', tag: 'شعر' },
      { title: 'تركيب الرموش', tag: 'رموش' },
      { title: 'تصميم الأظافر', tag: 'أظافر' },
      { title: 'مكياج', tag: 'تجميل' },
      { title: 'تجهيز العرائس', tag: 'مناسبات' },
      { title: 'الحواجب', tag: 'حواجب' },
      { title: 'أماكن التصفيف', tag: 'أجواء' },
    ],
  },

  legal: {
    fallbackNotice: 'النصوص القانونية أدناه متوفرة باللغة الألمانية، وهي النسخة الملزمة قانونياً. لأي استفسار يسعدنا تواصلك معنا.',
    updatedLabel: 'آخر تحديث',
  },
}

export const translations: Record<Language, TranslationStrings> = { de, en, ar }
