export interface Project {
  slug: string
  tag: string
  description: string
  url: string
  image: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'il-faro-rimini/',
    tag: 'Restaurant',
    description:
      'Seafood restaurant in Italy — menu, gallery, table reservations, and family history since 1978.',
    url: 'https://il-faro-rimini.vercel.app',
    image: '/images/il-faro.png',
  },
  {
    slug: 'hotel-fellini/',
    tag: 'Hotel · Rimini',
    description:
      'Cinema-inspired boutique hotel on the Rimini seafront — room & experience catalogs, a real booking flow with server-side validation, and a concierge journal across a dozen pages.',
    url: 'https://hotel-site-omega-two.vercel.app',
    image: '/images/hotel-fellini.png',
  },
  {
    slug: 'windows-style-trading/',
    tag: 'Local Business',
    description:
      'PVC windows and doors company in Italy — product catalog, pricing, and consultation requests.',
    url: 'https://windows-style-trading.vercel.app',
    image: '/images/windows-style.png',
  },
  {
    slug: 'palyanytsya-trattoria/',
    tag: 'Restaurant · Riccione',
    description:
      'Ukrainian restaurant in Riccione — menu, hours, and reservations for handmade traditional dishes.',
    url: 'https://palyanytsya-trattoria.vercel.app',
    image: '/images/palyanytsya.png',
  },
  {
    slug: 'studio-nova/',
    tag: 'Architecture & Interior',
    description:
      'Architecture and interior design studio — project gallery, studio philosophy, and process timeline.',
    url: 'https://studio-nova-leo-dex.vercel.app',
    image: '/images/studio-nova.png',
  },
  {
    slug: 'prime-estate/',
    tag: 'Real Estate',
    description: 'Real estate agency — property listings, agent profiles, and a location-based search hero.',
    url: 'https://prime-estate-leo-dex.vercel.app',
    image: '/images/prime-estate.png',
  },
  {
    slug: 'pulse-fit/',
    tag: 'Fitness',
    description: 'Strength and conditioning gym — class schedule, trainer profiles, and membership pricing.',
    url: 'https://pulse-fit-leo-dex.vercel.app',
    image: '/images/pulse-fit.png',
  },
]

export const BIO =
  "Hi, I'm LeoDex — a web developer based in Italy. I build fast, animated Next.js sites for real businesses: restaurants, hotels, agencies, studios. The 7 builds under \"My Work\" are self-initiated concept pieces, not commissioned client work — I build for any industry; these are just a sample of what that looks like in practice."

export const ENGINEERING_BULLETS: string[] = [
  'Multi-page architecture — routing, layouts, structured content',
  'Forms with schema validation & server-side handling (Zod + Server Actions)',
  'Booking / reservation flows — date, time, and party-size selection',
  'Product & service catalogs with category pages',
  'SEO — dynamic Open Graph images, favicons, and metadata generated in code',
  'Accessible, reusable UI systems — dialogs, carousels, calendars, tabs, toasts',
]

export const MOTION_BULLETS: string[] = [
  'Custom cursor effects & magnetic hover links',
  'Buttery-smooth scrolling',
  'Scroll-triggered reveals & page-transition animations',
  'Parallax imagery, marquee tickers, animated counters',
  'Grain/noise textures, preloaders, before/after sliders',
  'Fully responsive, fast, TypeScript end-to-end',
]

export interface StackItem {
  name: string
  type: string
  comment: string
  icon: 'exe' | 'dll'
}

export const STACK: StackItem[] = [
  { name: 'NextJS.exe', type: 'Application', comment: 'React framework, App Router', icon: 'exe' },
  { name: 'React.exe', type: 'Application', comment: 'UI library', icon: 'exe' },
  { name: 'TypeScript.dll', type: 'System file', comment: 'Typed JavaScript', icon: 'dll' },
  { name: 'TailwindCSS.dll', type: 'System file', comment: 'Utility-first styling', icon: 'dll' },
  { name: 'FramerMotion.dll', type: 'System file', comment: 'Animation & gestures', icon: 'dll' },
  { name: 'Zustand.dll', type: 'System file', comment: 'State management', icon: 'dll' },
  { name: 'GSAP.exe', type: 'Application', comment: 'Scroll & timeline animation', icon: 'exe' },
]

export interface ContactLink {
  label: string
  handle: string
  url: string
  icon: 'telegram' | 'github'
}

export const CONTACT_LINKS: ContactLink[] = [
  { label: 'Telegram', handle: '@xeDoeL', url: 'https://t.me/xeDoeL', icon: 'telegram' },
  { label: 'GitHub', handle: 'LeoDex0', url: 'https://github.com/LeoDex0', icon: 'github' },
]
