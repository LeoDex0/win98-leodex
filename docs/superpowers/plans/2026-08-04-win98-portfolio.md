# Win98 Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone Windows-98-desktop-styled portfolio site for LeoDex at `D:\BaseAI\00-portfolioleodex`, reusing real content from the existing hub, and deploy it to its own new Vercel project.

**Architecture:** A single client-rendered "desktop" page with two parallel, CSS-switched trees — a floating-window desktop UI (≥768px) backed by a small Zustand window-manager store (open/close/focus/minimize/maximize, real taskbar restore), and a flattened accordion UI (<768px) reusing the same content components. Chrome comes from `98.css`; layout/responsiveness from Tailwind; interaction animation from Framer Motion.

**Tech Stack:** Next.js `16.3.0` (App Router) · React `19.2.8` · TypeScript · Tailwind CSS `^4` · `98.css@0.1.21` · `framer-motion@12.43.0` · `zustand@5.0.14` · `clsx@2.1.1`. Already installed and committed (see `docs/superpowers/specs/2026-08-04-win98-portfolio-design.md`).

## Global Constraints

- Exact dependency versions above — do not add other UI/animation libraries (no GSAP, no Lenis, no react95, no icon packs). `98.css` is a styling foundation only; all components are hand-built React.
- English copy only. No i18n layer.
- Contact section = real Telegram/GitHub links only. No form submission, no email backend, no fake "sending..." state.
- No real window drag or resize-by-handle. Windows open at fixed positions from `WINDOW_LAYOUT` (Task 4).
- No fabricated stats/testimonials anywhere.
- Desktop = exactly 3 icons: My Computer, My Work, Contact Me. About Me and Skills are only reachable through My Computer (see design spec's "Information architecture").
- Mobile (<768px, Tailwind `md` breakpoint) = no floating windows, no taskbar, no z-index stacking — a flattened single-column accordion of 4 sections (My Work, About, Skills, Contact) reusing the same content components as desktop. Tap targets ≥44px.
- Minimize and maximize are real (not decorative) — see design spec's window-manager section for why.
- Attribution required somewhere in the UI: "MS Sans Serif reconstruction by 'lou' (CC BY-SA), 98.css by Jordan Scales (MIT)" — placed in the Start Menu footer (Task 12).
- All 7 project URLs/screenshots/descriptions must match `D:\BaseAI\portfolio\index.html` exactly (see Task 1) — these are real deployed sites, not placeholders.
- No test framework is installed in this account's projects (confirmed: neither `D:\BaseAI\Reustorant` nor `D:\BaseAI\portfolio` have one). Verification for every task is: (a) `npx tsc --noEmit` for type correctness, and (b) either a concrete grep/read check for static-content tasks, or a Playwright MCP-driven interactive browser check (navigate → click → screenshot/snapshot → confirm) for anything visual/behavioral. This matches how every other project in this account is verified.
- Dev server runs on port `3012` (Reustorant uses 3011; keeping each project on its own fixed port).

---

### Task 1: Static data layer and project assets

**Files:**
- Create: `lib/data.ts`
- Create (copy): `public/images/il-faro.png`, `public/images/hotel-fellini.png`, `public/images/windows-style.png`, `public/images/palyanytsya.png`, `public/images/studio-nova.png`, `public/images/prime-estate.png`, `public/images/pulse-fit.png`

**Interfaces:**
- Produces: `Project`, `StackItem`, `ContactLink` types; `PROJECTS`, `BIO`, `ENGINEERING_BULLETS`, `MOTION_BULLETS`, `STACK`, `CONTACT_LINKS` constants — every later content component imports from this file, nothing else.

- [ ] **Step 1: Copy the 7 screenshot assets from the existing hub**

```bash
mkdir -p "D:/BaseAI/00-portfolioleodex/public/images"
cp "D:/BaseAI/portfolio/images/il-faro.png" "D:/BaseAI/00-portfolioleodex/public/images/"
cp "D:/BaseAI/portfolio/images/hotel-fellini.png" "D:/BaseAI/00-portfolioleodex/public/images/"
cp "D:/BaseAI/portfolio/images/windows-style.png" "D:/BaseAI/00-portfolioleodex/public/images/"
cp "D:/BaseAI/portfolio/images/palyanytsya.png" "D:/BaseAI/00-portfolioleodex/public/images/"
cp "D:/BaseAI/portfolio/images/studio-nova.png" "D:/BaseAI/00-portfolioleodex/public/images/"
cp "D:/BaseAI/portfolio/images/prime-estate.png" "D:/BaseAI/00-portfolioleodex/public/images/"
cp "D:/BaseAI/portfolio/images/pulse-fit.png" "D:/BaseAI/00-portfolioleodex/public/images/"
```

Expected: `ls "D:/BaseAI/00-portfolioleodex/public/images"` lists all 7 files.

- [ ] **Step 2: Write `lib/data.ts`**

```ts
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
```

- [ ] **Step 3: Verify**

Run: `cd "D:/BaseAI/00-portfolioleodex" && npx tsc --noEmit`
Expected: no errors.

Run: `grep -c "slug:" lib/data.ts`
Expected: `7`

- [ ] **Step 4: Commit**

```bash
git add lib/data.ts public/images
git commit -m "Add portfolio data layer and project screenshots"
```

---

### Task 2: Global styles, font cascade, root layout

**Files:**
- Modify: `app/globals.css` (replace entire contents)
- Modify: `app/layout.tsx` (replace entire contents)
- Modify: `app/page.tsx` (temporary placeholder content, replaced in Task 11)
- Modify: `package.json` (dev/start scripts get a fixed port)

**Interfaces:**
- Produces: CSS custom properties `--desktop-teal`, `--taskbar-height` (consumed by Tasks 5, 11, 12, 13); `.win98-btn` class (consumed by Tasks 6, 9) for real `<a>` links styled as 98.css buttons (98.css itself only styles bare `<button>`/`input[type=submit]` elements, confirmed by reading `node_modules/98.css/style.css`).

- [ ] **Step 1: Replace `app/globals.css`**

```css
@import "tailwindcss";
@import "98.css/dist/98.css";

:root {
  --desktop-teal: #008080;
  --taskbar-height: 40px;
}

html,
body {
  height: 100%;
}

body {
  margin: 0;
  font-family: "Pixelated MS Sans Serif", Arial, sans-serif;
}

/* 98.css only styles bare <button>/input[type=submit] elements with this
   raised-bevel look. Real <a> links (project/contact "Open" CTAs) need the
   same treatment applied explicitly so they stay real, crawlable, right-
   clickable links instead of fake onClick buttons. */
.win98-btn {
  display: inline-block;
  box-sizing: border-box;
  text-decoration: none;
  color: transparent;
  text-shadow: 0 0 var(--text-color);
  background: var(--surface);
  box-shadow: var(--border-raised-outer), var(--border-raised-inner);
  min-width: 75px;
  min-height: 23px;
  padding: 4px 12px;
  text-align: center;
  font-family: "Pixelated MS Sans Serif", Arial;
  font-size: 11px;
}

.win98-btn:active {
  box-shadow: var(--border-sunken-outer), var(--border-sunken-inner);
  text-shadow: 1px 1px var(--text-color);
}
```

- [ ] **Step 2: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LeoDex — Web Developer',
  description:
    "LeoDex's freelance portfolio, styled as a Windows 98 desktop. Business websites built to feel expensive, wrapped in a nostalgic OS.",
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Replace `app/page.tsx` with a temporary cascade check**

```tsx
export default function Home() {
  return (
    <div className="p-8" style={{ background: 'var(--desktop-teal)' }}>
      <div className="window" style={{ width: 300 }}>
        <div className="title-bar">
          <div className="title-bar-text">Cascade check</div>
          <div className="title-bar-controls">
            <button aria-label="Close" />
          </div>
        </div>
        <div className="window-body">
          <button type="button">Test button</button>
          <a href="#" className="win98-btn ml-2">
            Test link
          </a>
        </div>
      </div>
    </div>
  )
}
```

This is replaced by the real `<Desktop />` in Task 11 — it exists only to visually prove the Tailwind → 98.css → custom-override cascade order is correct before building on top of it.

- [ ] **Step 4: Fix dev/start ports in `package.json`**

Change:
```json
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
```
to:
```json
    "dev": "next dev -p 3012",
    "build": "next build",
    "start": "next start -p 3012",
```

- [ ] **Step 5: Verify visually**

Run: `cd "D:/BaseAI/00-portfolioleodex" && npm run dev` (background/separate terminal)

Use the Playwright MCP tools:
1. `browser_navigate` to `http://localhost:3012`
2. `browser_take_screenshot`
3. Confirm: a teal background, a real Win98-style beveled window with a blue title bar reading "Cascade check", a raised 3D "Test button" and an identically-styled "Test link" next to it (not a plain blue underlined link — if it looks like a plain link, `.win98-btn` isn't matching, check the class name and that `globals.css` was actually rebuilt).

- [ ] **Step 6: Commit**

```bash
git add app/globals.css app/layout.tsx app/page.tsx package.json
git commit -m "Wire up 98.css + Tailwind cascade and root layout"
```

---

### Task 3: Pixel icon set

**Files:**
- Create: `components/icons/PixelIcons.tsx`

**Interfaces:**
- Produces: `IconComputer`, `IconFolder`, `IconMail`, `IconDriveC`, `IconDriveD`, `IconNotepad`, `IconFileExe`, `IconFileDll`, `IconErrorBadge`, `IconTelegram`, `IconGithub` — all `(props: { size?: number; className?: string }) => JSX.Element`, each `aria-hidden="true"` (every call site pairs them with visible text, per accessibility note below).

- [ ] **Step 1: Write `components/icons/PixelIcons.tsx`**

```tsx
const INK = '#000000'
const FACE = '#c0c0c0'
const SCREEN = '#0000aa'
const TEAL = '#008080'
const YELLOW = '#ffcc00'
const WHITE = '#ffffff'
const RED = '#aa0000'
const LINE = '#7a7a7a'

type Rect = [number, number, number, number, string]

interface IconProps {
  size?: number
  className?: string
}

function Glyph({ rects, size = 32, className }: { rects: Rect[] } & IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {rects.map(([x, y, w, h, fill], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={fill} />
      ))}
    </svg>
  )
}

export function IconComputer({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [1, 1, 13, 9, INK],
        [2, 2, 11, 7, FACE],
        [3, 3, 9, 5, SCREEN],
        [7, 10, 2, 2, INK],
        [4, 12, 8, 2, INK],
        [5, 12, 6, 1, FACE],
      ]}
    />
  )
}

export function IconFolder({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [1, 4, 6, 2, INK],
        [2, 5, 4, 1, YELLOW],
        [1, 6, 14, 9, INK],
        [2, 7, 12, 7, YELLOW],
      ]}
    />
  )
}

export function IconMail({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [1, 3, 14, 10, INK],
        [2, 4, 12, 8, WHITE],
        [2, 4, 2, 1, LINE],
        [4, 5, 2, 1, LINE],
        [6, 6, 2, 1, LINE],
        [8, 6, 2, 1, LINE],
        [10, 5, 2, 1, LINE],
        [12, 4, 2, 1, LINE],
      ]}
    />
  )
}

function driveRects(accent: string): Rect[] {
  return [
    [1, 1, 14, 14, INK],
    [2, 2, 12, 12, FACE],
    [3, 3, 10, 4, accent],
    [3, 9, 10, 1, INK],
    [3, 11, 4, 2, FACE],
  ]
}

export function IconDriveC({ size, className }: IconProps) {
  return <Glyph size={size} className={className} rects={driveRects(SCREEN)} />
}

export function IconDriveD({ size, className }: IconProps) {
  return <Glyph size={size} className={className} rects={driveRects(TEAL)} />
}

export function IconNotepad({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [2, 1, 11, 14, INK],
        [3, 2, 9, 12, WHITE],
        [4, 4, 7, 1, LINE],
        [4, 6, 7, 1, LINE],
        [4, 8, 7, 1, LINE],
        [4, 10, 7, 1, LINE],
        [10, 1, 3, 3, FACE],
      ]}
    />
  )
}

export function IconFileExe({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [2, 1, 11, 14, INK],
        [3, 2, 9, 12, WHITE],
        [10, 1, 3, 3, FACE],
        [5, 9, 6, 4, SCREEN],
      ]}
    />
  )
}

export function IconFileDll({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [2, 1, 11, 14, INK],
        [3, 2, 9, 12, WHITE],
        [10, 1, 3, 3, FACE],
        [5, 9, 6, 4, TEAL],
      ]}
    />
  )
}

export function IconErrorBadge({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [2, 2, 12, 12, RED],
        [1, 4, 14, 8, RED],
        [4, 1, 8, 14, RED],
        [4, 4, 2, 2, WHITE],
        [6, 6, 2, 2, WHITE],
        [8, 8, 2, 2, WHITE],
        [10, 10, 2, 2, WHITE],
        [10, 4, 2, 2, WHITE],
        [8, 6, 2, 2, WHITE],
        [6, 8, 2, 2, WHITE],
        [4, 10, 2, 2, WHITE],
      ]}
    />
  )
}

export function IconTelegram({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [1, 7, 2, 2, SCREEN],
        [3, 6, 2, 2, SCREEN],
        [5, 5, 2, 2, SCREEN],
        [7, 4, 2, 2, SCREEN],
        [9, 3, 6, 2, SCREEN],
        [3, 8, 2, 2, SCREEN],
        [5, 9, 2, 2, SCREEN],
        [7, 10, 2, 2, SCREEN],
        [9, 11, 2, 2, SCREEN],
        [5, 7, 4, 2, FACE],
      ]}
    />
  )
}

export function IconGithub({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [4, 2, 2, 2, INK],
        [10, 2, 2, 2, INK],
        [3, 4, 10, 8, INK],
        [5, 7, 1, 1, WHITE],
        [10, 7, 1, 1, WHITE],
        [2, 12, 2, 2, INK],
        [12, 12, 2, 2, INK],
      ]}
    />
  )
}
```

- [ ] **Step 2: Verify**

Run: `cd "D:/BaseAI/00-portfolioleodex" && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Visual smoke test**

Temporarily add `import { IconComputer, IconFolder, IconMail, IconDriveC, IconDriveD, IconNotepad, IconFileExe, IconFileDll, IconErrorBadge, IconTelegram, IconGithub } from '@/components/icons/PixelIcons'` to `app/page.tsx` and render each at `size={32}` in a `flex gap-2` row inside the cascade-check window body. Screenshot via Playwright (`browser_navigate` to `localhost:3012`, `browser_take_screenshot`). Confirm all 11 render as distinguishable crisp (not blurry) pixel glyphs, not blank/broken. Revert `app/page.tsx` back to the Task 2 version afterward (this was only a throwaway visual check, not part of the shipped page).

- [ ] **Step 4: Commit**

```bash
git add components/icons/PixelIcons.tsx
git commit -m "Add hand-built pixel icon set"
```

---

### Task 4: Window manager store

**Files:**
- Create: `components/window/useWindowManager.ts`
- Create: `components/window/windowLayout.ts`

**Interfaces:**
- Produces: `WindowId` union type; `useWindowManager()` hook with state `{openIds, runtime}` and actions `open(id)`, `close(id)`, `focus(id)`, `toggleMinimize(id)`, `toggleMaximize(id)`; pure helpers `windowZIndex(openIds, id): number` and `isTopWindow(openIds, id): boolean`. `WINDOW_LAYOUT: Record<WindowId, {top: string; left: string; width: number}>`.
- Consumed by: Task 5 (`WindowFrame`), Task 10 (`MyComputerContent`), Task 11 (`DesktopView`/`DesktopIcon`), Task 12 (`Taskbar`/`StartMenu`).

- [ ] **Step 1: Write `components/window/useWindowManager.ts`**

```ts
'use client'

import { create } from 'zustand'

export type WindowId = 'my-computer' | 'my-work' | 'about' | 'skills' | 'contact'

interface WindowRuntimeState {
  minimized: boolean
  maximized: boolean
}

interface WindowManagerState {
  openIds: WindowId[]
  runtime: Partial<Record<WindowId, WindowRuntimeState>>
  open: (id: WindowId) => void
  close: (id: WindowId) => void
  focus: (id: WindowId) => void
  toggleMinimize: (id: WindowId) => void
  toggleMaximize: (id: WindowId) => void
}

export const useWindowManager = create<WindowManagerState>((set) => ({
  openIds: [],
  runtime: {},

  open: (id) =>
    set((state) => {
      if (state.openIds.includes(id)) {
        return {
          openIds: [...state.openIds.filter((x) => x !== id), id],
          runtime: { ...state.runtime, [id]: { ...state.runtime[id]!, minimized: false } },
        }
      }
      return {
        openIds: [...state.openIds, id],
        runtime: { ...state.runtime, [id]: { minimized: false, maximized: false } },
      }
    }),

  close: (id) =>
    set((state) => {
      const runtime = { ...state.runtime }
      delete runtime[id]
      return { openIds: state.openIds.filter((x) => x !== id), runtime }
    }),

  focus: (id) =>
    set((state) => {
      if (!state.openIds.includes(id)) return state
      return { openIds: [...state.openIds.filter((x) => x !== id), id] }
    }),

  // Un-minimizing also focuses (moves to end of openIds). Minimizing leaves
  // stacking order untouched so the window restores to the same place.
  toggleMinimize: (id) =>
    set((state) => {
      const current = state.runtime[id]
      if (!current) return state
      const minimized = !current.minimized
      return {
        runtime: { ...state.runtime, [id]: { ...current, minimized } },
        openIds: minimized ? state.openIds : [...state.openIds.filter((x) => x !== id), id],
      }
    }),

  toggleMaximize: (id) =>
    set((state) => {
      const current = state.runtime[id]
      if (!current) return state
      return { runtime: { ...state.runtime, [id]: { ...current, maximized: !current.maximized } } }
    }),
}))

export function isTopWindow(openIds: WindowId[], id: WindowId): boolean {
  return openIds.length > 0 && openIds[openIds.length - 1] === id
}

export function windowZIndex(openIds: WindowId[], id: WindowId): number {
  const idx = openIds.indexOf(id)
  return idx === -1 ? 20 : 20 + idx
}
```

- [ ] **Step 2: Write `components/window/windowLayout.ts`**

```ts
import type { WindowId } from './useWindowManager'

export const WINDOW_LAYOUT: Record<WindowId, { top: string; left: string; width: number }> = {
  'my-computer': { top: '12%', left: '6%', width: 320 },
  'my-work': { top: '8%', left: '22%', width: 720 },
  about: { top: '16%', left: '16%', width: 460 },
  skills: { top: '20%', left: '32%', width: 520 },
  contact: { top: '24%', left: '40%', width: 400 },
}
```

- [ ] **Step 3: Verify logic with a throwaway script**

There is no test runner in this project (see Global Constraints), so verify the two pure helpers directly with `npx tsx`:

```bash
cd "D:/BaseAI/00-portfolioleodex"
npm install --no-save tsx
npx tsx -e "
import { windowZIndex, isTopWindow } from './components/window/useWindowManager'

function check(name: string, actual: unknown, expected: unknown) {
  if (actual !== expected) {
    throw new Error(name + ': expected ' + expected + ', got ' + actual)
  }
}

const order = ['my-work', 'contact', 'about'] as const
check('first window z-index', windowZIndex([...order], 'my-work'), 20)
check('last window z-index', windowZIndex([...order], 'about'), 22)
check('unopened window falls back to base z', windowZIndex([...order], 'skills'), 20)
check('last id in openIds is top', isTopWindow([...order], 'about'), true)
check('non-last id is not top', isTopWindow([...order], 'contact'), false)
console.log('useWindowManager helper checks passed')
"
```

Expected output: `useWindowManager helper checks passed` and exit code 0. If any `check()` fails it throws immediately and the script exits non-zero — that's a real failure, not a missed log line.

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/window/useWindowManager.ts components/window/windowLayout.ts
git commit -m "Add window manager store (open/close/focus/minimize/maximize)"
```

---

### Task 5: WindowFrame chrome component

**Files:**
- Create: `components/window/WindowFrame.tsx`

**Interfaces:**
- Consumes: `useWindowManager`, `windowZIndex`, `isTopWindow`, `WindowId` from Task 4.
- Produces: `<WindowFrame id title icon top left width>{children}</WindowFrame>` — consumed by Task 11 (`DesktopView`, one instance per window id).

- [ ] **Step 1: Write `components/window/WindowFrame.tsx`**

```tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'
import { useWindowManager, windowZIndex, isTopWindow, type WindowId } from './useWindowManager'

interface WindowFrameProps {
  id: WindowId
  title: string
  icon: ReactNode
  top: string
  left: string
  width: number
  children: ReactNode
}

export default function WindowFrame({ id, title, icon, top, left, width, children }: WindowFrameProps) {
  const openIds = useWindowManager((s) => s.openIds)
  const runtime = useWindowManager((s) => s.runtime[id])
  const focus = useWindowManager((s) => s.focus)
  const close = useWindowManager((s) => s.close)
  const toggleMinimize = useWindowManager((s) => s.toggleMinimize)
  const toggleMaximize = useWindowManager((s) => s.toggleMaximize)

  const isOpen = openIds.includes(id)
  const isMinimized = runtime?.minimized ?? false
  const isMaximized = runtime?.maximized ?? false
  const isActive = isTopWindow(openIds, id)

  return (
    <AnimatePresence>
      {isOpen && !isMinimized && (
        <motion.div
          className="fixed"
          style={{
            top: isMaximized ? 8 : top,
            left: isMaximized ? 8 : left,
            right: isMaximized ? 8 : undefined,
            bottom: isMaximized ? 'calc(var(--taskbar-height) + 8px)' : undefined,
            width: isMaximized ? 'auto' : `min(${width}px, calc(100vw - 32px))`,
            zIndex: windowZIndex(openIds, id),
          }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.14, ease: 'easeOut' }}
          onMouseDown={() => focus(id)}
        >
          <div className={`window m-0 ${!isActive ? 'inactive' : ''}`}>
            <div className={`title-bar ${!isActive ? 'inactive' : ''}`}>
              <div className="title-bar-text flex items-center gap-1.5">
                {icon}
                {title}
              </div>
              <div className="title-bar-controls">
                <button aria-label="Minimize" onClick={() => toggleMinimize(id)} />
                <button aria-label={isMaximized ? 'Restore' : 'Maximize'} onClick={() => toggleMaximize(id)} />
                <button aria-label="Close" onClick={() => close(id)} />
              </div>
            </div>
            <div className="window-body max-h-[70vh] overflow-auto">{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

Note: the top-level wrapper has no `hidden md:block` — responsive visibility is controlled once, at the `DesktopView` root in Task 11, not per-window. Keeping it out of `WindowFrame` avoids two sources of truth for the same breakpoint switch.

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` — expected: no errors (this will report unused-import/prop errors if `WindowFrame` is malformed, even though nothing renders it yet).

- [ ] **Step 3: Commit**

```bash
git add components/window/WindowFrame.tsx
git commit -m "Add WindowFrame chrome with real minimize/maximize/close/focus"
```

---

### Task 6: My Work content

**Files:**
- Create: `components/content/ProjectCard.tsx`
- Create: `components/content/MyWorkContent.tsx`

**Interfaces:**
- Consumes: `Project`, `PROJECTS` from `lib/data.ts` (Task 1); `.win98-btn` class from `app/globals.css` (Task 2).
- Produces: `<MyWorkContent />` (no props) — consumed by Task 11 (`DesktopView`) and Task 14 (`MobileView`).

- [ ] **Step 1: Write `components/content/ProjectCard.tsx`**

```tsx
import Image from 'next/image'
import type { Project } from '@/lib/data'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="window m-0">
      <div className="title-bar">
        <div className="title-bar-text">{project.slug}</div>
        <div className="title-bar-controls">
          {/* Decorative only — nested per-project mini-windows aren't real,
              independently manageable OS windows like the top-level 5. */}
          <button aria-label="Close" tabIndex={-1} />
        </div>
      </div>
      <div className="window-body">
        <div className="relative w-full h-28 border border-black/30">
          <Image
            src={project.image}
            alt={`${project.slug} preview`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 340px"
          />
        </div>
        <p className="mt-2 text-[12px] font-bold">{project.tag}</p>
        <p className="text-[12px] leading-snug">{project.description}</p>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="win98-btn mt-2 block w-full">
          Open project →
        </a>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write `components/content/MyWorkContent.tsx`**

```tsx
import { PROJECTS } from '@/lib/data'
import ProjectCard from './ProjectCard'

export default function MyWorkContent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-2">
      {PROJECTS.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
```

No fixed `max-w`/`min-w` here — this component is reused inside both a fixed-width desktop `WindowFrame` (Task 11) and a fluid mobile accordion body (Task 14), so it must size itself from its parent, not dictate its own width.

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — expected: no errors.

Temporarily render `<MyWorkContent />` inside `app/page.tsx`'s cascade-check window body, screenshot via Playwright at `localhost:3012`. Confirm: 7 project mini-windows in a grid, each with a real screenshot image (not broken), tag, description, and a raised "Open project →" button. Click one "Open project →" link with `browser_click` and confirm (via `browser_network_requests` or a new tab check) it targets the correct external URL rather than erroring. Revert `app/page.tsx`.

- [ ] **Step 4: Commit**

```bash
git add components/content/ProjectCard.tsx components/content/MyWorkContent.tsx
git commit -m "Add My Work content (project grid)"
```

---

### Task 7: About Me content

**Files:**
- Create: `components/content/AboutContent.tsx`

**Interfaces:**
- Consumes: `BIO`, `ENGINEERING_BULLETS`, `MOTION_BULLETS` from `lib/data.ts` (Task 1).
- Produces: `<AboutContent />` (no props) — consumed by Task 11 and Task 14.

- [ ] **Step 1: Write `components/content/AboutContent.tsx`**

```tsx
import { BIO, ENGINEERING_BULLETS, MOTION_BULLETS } from '@/lib/data'

export default function AboutContent() {
  return (
    <div className="bg-white">
      <div className="flex gap-3 border-b border-black/20 px-2 py-1 text-[12px] bg-[var(--button-face)]">
        <span>File</span>
        <span>Edit</span>
        <span>Search</span>
        <span>Help</span>
      </div>
      <div className="p-3 font-mono text-[13px] leading-relaxed whitespace-pre-wrap">
        <p>{BIO}</p>
        <p className="mt-3 font-bold">WHAT I BUILD</p>
        <p className="mt-1 font-bold text-black/70">— Site engineering —</p>
        <ul>
          {ENGINEERING_BULLETS.map((line) => (
            <li key={line}>- {line}</li>
          ))}
        </ul>
        <p className="mt-2 font-bold text-black/70">— Motion & polish —</p>
        <ul>
          {MOTION_BULLETS.map((line) => (
            <li key={line}>- {line}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` — expected: no errors.

Temporarily render `<AboutContent />` in `app/page.tsx`'s cascade-check window, screenshot. Confirm: white "paper" background, a decorative File/Edit/Search/Help menu row, monospace body text, bio paragraph, two bulleted capability lists under "WHAT I BUILD". Revert `app/page.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/content/AboutContent.tsx
git commit -m "Add About Me content (Notepad-styled)"
```

---

### Task 8: Skills content

**Files:**
- Create: `components/content/SkillsContent.tsx`

**Interfaces:**
- Consumes: `STACK` from `lib/data.ts` (Task 1); `IconFileExe`, `IconFileDll` from `components/icons/PixelIcons.tsx` (Task 3).
- Produces: `<SkillsContent />` (no props) — consumed by Task 11 and Task 14.

- [ ] **Step 1: Write `components/content/SkillsContent.tsx`**

```tsx
import { STACK } from '@/lib/data'
import { IconFileExe, IconFileDll } from '@/components/icons/PixelIcons'

export default function SkillsContent() {
  return (
    <div>
      <div className="grid grid-cols-[24px_1fr_110px] gap-x-2 border-b border-black/30 pb-1 text-[12px] font-bold px-1">
        <span />
        <span>Name</span>
        <span>Type</span>
      </div>
      <div className="sunken-panel max-h-64 overflow-auto mt-1">
        <table className="w-full text-[12px]">
          <tbody>
            {STACK.map((item) => (
              <tr key={item.name} className="align-top">
                <td className="w-7 py-1 pl-1">
                  {item.icon === 'exe' ? <IconFileExe size={16} /> : <IconFileDll size={16} />}
                </td>
                <td className="py-1 pr-2">
                  <div className="font-bold">{item.name}</div>
                  <div className="text-black/70">{item.comment}</div>
                </td>
                <td className="py-1 text-black/70">{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

No fixed `min-w` — same reuse reasoning as `MyWorkContent` (Task 6).

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` — expected: no errors.

Temporarily render `<SkillsContent />` in the cascade-check window, screenshot. Confirm: an Explorer-details-view-style list with a sunken scrollable panel, small file-type icons, tech names formatted as filenames (e.g. "NextJS.exe"), and a Type column. Revert `app/page.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/content/SkillsContent.tsx
git commit -m "Add Skills content (Explorer file-list styled)"
```

---

### Task 9: Contact content

**Files:**
- Create: `components/content/ContactContent.tsx`

**Interfaces:**
- Consumes: `CONTACT_LINKS` from `lib/data.ts` (Task 1); `IconTelegram`, `IconGithub` from `PixelIcons.tsx` (Task 3); `.win98-btn` from `globals.css` (Task 2).
- Produces: `<ContactContent />` (no props) — consumed by Task 11 and Task 14.

- [ ] **Step 1: Write `components/content/ContactContent.tsx`**

```tsx
import { CONTACT_LINKS } from '@/lib/data'
import { IconTelegram, IconGithub } from '@/components/icons/PixelIcons'

const ICONS = { telegram: IconTelegram, github: IconGithub }

export default function ContactContent() {
  return (
    <div className="p-1">
      <p className="text-[13px] mb-3">Available for freelance projects. Fastest way to reach me:</p>
      <div className="sunken-panel p-2 flex flex-col gap-2">
        {CONTACT_LINKS.map((link) => {
          const Icon = ICONS[link.icon]
          return (
            <div key={link.label} className="flex items-center justify-between gap-3 flex-wrap">
              <span className="flex items-center gap-2 text-[13px]">
                <Icon size={20} />
                {link.label} <span className="text-black/60">{link.handle}</span>
              </span>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="win98-btn">
                Open →
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` — expected: no errors.

Temporarily render `<ContactContent />` in the cascade-check window, screenshot. Confirm: a sunken panel with 2 rows (Telegram, GitHub), each with a recognizable icon, handle text, and a raised "Open →" button. Click each with `browser_click` and confirm they link to `https://t.me/xeDoeL` and `https://github.com/LeoDex0` respectively (check `href` via `browser_snapshot`, don't need to actually follow off-site). Revert `app/page.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/content/ContactContent.tsx
git commit -m "Add Contact content (send-message styled links)"
```

---

### Task 10: My Computer content

**Files:**
- Create: `components/content/MyComputerContent.tsx`

**Interfaces:**
- Consumes: `useWindowManager` (Task 4); `IconDriveC`, `IconDriveD` (Task 3).
- Produces: `<MyComputerContent />` (no props) — consumed by Task 11 only (desktop-only; mobile flattens About/Skills to top-level accordion items instead, see Task 14).

- [ ] **Step 1: Write `components/content/MyComputerContent.tsx`**

```tsx
'use client'

import { useWindowManager } from '@/components/window/useWindowManager'
import { IconDriveC, IconDriveD } from '@/components/icons/PixelIcons'

export default function MyComputerContent() {
  const open = useWindowManager((s) => s.open)

  return (
    <div className="flex gap-6 p-3">
      <button
        type="button"
        onClick={() => open('about')}
        className="flex w-20 flex-col items-center gap-1 text-center"
      >
        <IconDriveC size={32} />
        <span className="text-[12px] leading-tight">About Me (C:)</span>
      </button>
      <button
        type="button"
        onClick={() => open('skills')}
        className="flex w-20 flex-col items-center gap-1 text-center"
      >
        <IconDriveD size={32} />
        <span className="text-[12px] leading-tight">Skills (D:)</span>
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` — expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/content/MyComputerContent.tsx
git commit -m "Add My Computer content (drive icons opening About/Skills)"
```

---

### Task 11: Desktop icons, DesktopView, real page wiring

**Files:**
- Create: `components/desktop/DesktopIcon.tsx`
- Create: `components/desktop/DesktopView.tsx`
- Modify: `app/page.tsx` (replace cascade-check placeholder with the real page)

**Interfaces:**
- Consumes: `useWindowManager` (Task 4), `WindowFrame`+`WINDOW_LAYOUT` (Tasks 4–5), all 5 content components (Tasks 6–10), `IconComputer`/`IconFolder`/`IconMail`/`IconNotepad`/`IconDriveD` (Task 3).
- Produces: `<DesktopView />` — consumed by Task 15 (`Desktop.tsx`).

This is the first point where the desktop is fully click-through-able end to end: 3 icons → 5 real windows, with focus/close/minimize/maximize all working.

- [ ] **Step 1: Write `components/desktop/DesktopIcon.tsx`**

```tsx
'use client'

import type { ReactNode } from 'react'

interface DesktopIconProps {
  label: string
  icon: ReactNode
  onOpen: () => void
}

export default function DesktopIcon({ label, icon, onOpen }: DesktopIconProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-20 flex-col items-center gap-1 rounded p-1 text-center focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/80"
    >
      <span className="drop-shadow-[1px_1px_0_rgba(0,0,0,0.6)]">{icon}</span>
      <span className="text-white text-[13px] leading-tight [text-shadow:1px_1px_0_rgba(0,0,0,0.8)]">
        {label}
      </span>
    </button>
  )
}
```

- [ ] **Step 2: Write `components/desktop/DesktopView.tsx`**

```tsx
'use client'

import WindowFrame from '@/components/window/WindowFrame'
import { useWindowManager } from '@/components/window/useWindowManager'
import { WINDOW_LAYOUT } from '@/components/window/windowLayout'
import DesktopIcon from './DesktopIcon'
import MyComputerContent from '@/components/content/MyComputerContent'
import MyWorkContent from '@/components/content/MyWorkContent'
import AboutContent from '@/components/content/AboutContent'
import SkillsContent from '@/components/content/SkillsContent'
import ContactContent from '@/components/content/ContactContent'
import { IconComputer, IconFolder, IconMail, IconNotepad, IconDriveD } from '@/components/icons/PixelIcons'

export default function DesktopView() {
  const open = useWindowManager((s) => s.open)

  return (
    <div className="hidden md:block fixed inset-0 overflow-hidden" style={{ background: 'var(--desktop-teal)' }}>
      <div className="flex flex-col gap-4 p-4">
        <DesktopIcon label="My Computer" icon={<IconComputer size={32} />} onOpen={() => open('my-computer')} />
        <DesktopIcon label="My Work" icon={<IconFolder size={32} />} onOpen={() => open('my-work')} />
        <DesktopIcon label="Contact Me" icon={<IconMail size={32} />} onOpen={() => open('contact')} />
      </div>

      <WindowFrame id="my-computer" title="My Computer" icon={<IconComputer size={16} />} {...WINDOW_LAYOUT['my-computer']}>
        <MyComputerContent />
      </WindowFrame>
      <WindowFrame id="my-work" title="My Work" icon={<IconFolder size={16} />} {...WINDOW_LAYOUT['my-work']}>
        <MyWorkContent />
      </WindowFrame>
      <WindowFrame id="about" title="about-me.txt - Notepad" icon={<IconNotepad size={16} />} {...WINDOW_LAYOUT['about']}>
        <AboutContent />
      </WindowFrame>
      <WindowFrame id="skills" title="Skills (D:)" icon={<IconDriveD size={16} />} {...WINDOW_LAYOUT['skills']}>
        <SkillsContent />
      </WindowFrame>
      <WindowFrame id="contact" title="Send Message" icon={<IconMail size={16} />} {...WINDOW_LAYOUT['contact']}>
        <ContactContent />
      </WindowFrame>
    </div>
  )
}
```

- [ ] **Step 3: Replace `app/page.tsx`**

```tsx
import DesktopView from '@/components/desktop/DesktopView'

export default function Home() {
  return <DesktopView />
}
```

(This is further replaced in Task 15 once `MobileView` also exists — kept as `DesktopView`-only here so this task is independently testable.)

- [ ] **Step 4: Verify end-to-end desktop interaction**

Run `npm run dev`, then via Playwright MCP tools against `http://localhost:3012`:
1. `browser_take_screenshot` — confirm teal desktop, 3 icons top-left, no windows open.
2. `browser_click` "My Work" icon → confirm the My Work window appears with the 7-project grid.
3. `browser_click` "My Computer" icon → confirm a second window appears with 2 drive icons, and clicking My Work again brings it back to front (not behind My Computer) since it's the more-recently-focused one — click My Work's title bar via `browser_click`, then screenshot, confirm it's visually on top.
4. Inside the My Computer window, `browser_click` "About Me (C:)" → confirm the About window opens (Notepad style).
5. `browser_click` the Minimize button (`aria-label="Minimize"`) on the About window → confirm it disappears (taskbar doesn't exist yet at this task — just confirm it's gone from the DOM/screenshot; full restore-from-taskbar is verified in Task 12).
6. `browser_click` the Close button on My Computer → confirm it unmounts.
7. `browser_click` Maximize on My Work → confirm it grows to fill most of the viewport; click again (now "Restore") → confirm it returns to its original size/position.

- [ ] **Step 5: Commit**

```bash
git add components/desktop/DesktopIcon.tsx components/desktop/DesktopView.tsx app/page.tsx
git commit -m "Wire up desktop icons and all 5 windows end to end"
```

---

### Task 12: Taskbar, Start menu, clock

**Files:**
- Create: `components/desktop/Clock.tsx`
- Create: `components/desktop/StartMenu.tsx`
- Create: `components/desktop/Taskbar.tsx`
- Modify: `components/desktop/DesktopView.tsx` (mount `<Taskbar />`)

**Interfaces:**
- Consumes: `useWindowManager`, `WindowId` (Task 4); `IconComputer`/`IconFolder`/`IconMail`/`IconNotepad`/`IconDriveD` (Task 3).
- Produces: `<Taskbar />` — consumed by `DesktopView` (this task).

- [ ] **Step 1: Write `components/desktop/Clock.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'

export default function Clock() {
  const [time, setTime] = useState('--:--')

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
    update()
    const interval = setInterval(update, 30_000)
    return () => clearInterval(interval)
  }, [])

  return <span className="status-bar-field">{time}</span>
}
```

- [ ] **Step 2: Write `components/desktop/StartMenu.tsx`**

```tsx
'use client'

import { useState, type ReactNode } from 'react'
import { useWindowManager, type WindowId } from '@/components/window/useWindowManager'
import { IconComputer, IconFolder, IconMail } from '@/components/icons/PixelIcons'

const ITEMS: { id: WindowId; label: string; icon: ReactNode }[] = [
  { id: 'my-computer', label: 'My Computer', icon: <IconComputer size={20} /> },
  { id: 'my-work', label: 'My Work', icon: <IconFolder size={20} /> },
  { id: 'contact', label: 'Contact Me', icon: <IconMail size={20} /> },
]

export default function StartMenu({ onClose }: { onClose: () => void }) {
  const open = useWindowManager((s) => s.open)
  const [shutdownJoke, setShutdownJoke] = useState(false)

  return (
    <div className="absolute bottom-full left-0 mb-0.5 w-56 window m-0" role="menu">
      <div className="window-body p-1 flex flex-col gap-0.5">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="menuitem"
            className="flex items-center gap-2 px-2 py-1.5 text-left text-[13px] hover:bg-[var(--dialog-blue)] hover:text-white"
            onClick={() => {
              open(item.id)
              onClose()
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
        <hr className="my-1 border-black/20" />
        {shutdownJoke ? (
          <p className="px-2 py-1.5 text-[12px] text-black/70">Nice try. LeoDex doesn&apos;t shut down.</p>
        ) : (
          <button
            type="button"
            role="menuitem"
            className="flex items-center gap-2 px-2 py-1.5 text-left text-[13px] hover:bg-[var(--dialog-blue)] hover:text-white"
            onClick={() => setShutdownJoke(true)}
          >
            Shut Down...
          </button>
        )}
        <p className="px-2 pt-2 text-[10px] text-black/50 border-t border-black/10">
          UI: MS Sans Serif reconstruction by &quot;lou&quot; (CC BY-SA) · 98.css by Jordan Scales (MIT)
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Write `components/desktop/Taskbar.tsx`**

```tsx
'use client'

import { useState, type ReactNode } from 'react'
import { useWindowManager, type WindowId } from '@/components/window/useWindowManager'
import StartMenu from './StartMenu'
import Clock from './Clock'
import { IconComputer, IconFolder, IconMail, IconNotepad, IconDriveD } from '@/components/icons/PixelIcons'

const TITLE: Record<WindowId, string> = {
  'my-computer': 'My Computer',
  'my-work': 'My Work',
  about: 'about-me.txt',
  skills: 'Skills (D:)',
  contact: 'Send Message',
}

const ICON: Record<WindowId, ReactNode> = {
  'my-computer': <IconComputer size={16} />,
  'my-work': <IconFolder size={16} />,
  about: <IconNotepad size={16} />,
  skills: <IconDriveD size={16} />,
  contact: <IconMail size={16} />,
}

export default function Taskbar() {
  const [startOpen, setStartOpen] = useState(false)
  const openIds = useWindowManager((s) => s.openIds)
  const runtime = useWindowManager((s) => s.runtime)
  const focus = useWindowManager((s) => s.focus)
  const toggleMinimize = useWindowManager((s) => s.toggleMinimize)

  function handleTaskbarClick(id: WindowId, isFocused: boolean, isMinimized: boolean) {
    if (isMinimized) {
      toggleMinimize(id) // store re-focuses automatically on restore
    } else if (isFocused) {
      toggleMinimize(id) // click on the active window's own button minimizes it
    } else {
      focus(id)
    }
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex items-center gap-1 px-1 window m-0 rounded-none"
      style={{ height: 'var(--taskbar-height)', zIndex: 40 }}
    >
      <div className="relative">
        {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
        <button
          type="button"
          className="flex items-center gap-1 font-bold text-[13px] px-2"
          onClick={() => setStartOpen((v) => !v)}
        >
          <IconComputer size={16} />
          Start
        </button>
      </div>

      <div className="h-6 w-px bg-black/30 mx-1" />

      <div className="flex items-center gap-1 flex-1 overflow-x-auto">
        {openIds.map((id) => {
          const isFocused = openIds[openIds.length - 1] === id
          const isMinimized = runtime[id]?.minimized ?? false
          return (
            <button
              key={id}
              type="button"
              className="flex items-center gap-1.5 px-2 h-7 text-[12px] max-w-[140px] truncate"
              style={
                isFocused && !isMinimized
                  ? { boxShadow: 'var(--border-sunken-outer), var(--border-sunken-inner)' }
                  : undefined
              }
              onClick={() => handleTaskbarClick(id, isFocused, isMinimized)}
            >
              {ICON[id]}
              {TITLE[id]}
            </button>
          )
        })}
      </div>

      <Clock />
    </div>
  )
}
```

- [ ] **Step 4: Mount `<Taskbar />` in `DesktopView.tsx`**

Add the import and render it as the last child inside `DesktopView`'s root div, after the 5 `WindowFrame` instances:

```tsx
import Taskbar from './Taskbar'
// ...
      <WindowFrame id="contact" title="Send Message" icon={<IconMail size={16} />} {...WINDOW_LAYOUT['contact']}>
        <ContactContent />
      </WindowFrame>

      <Taskbar />
    </div>
  )
}
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit` — expected: no errors.

Via Playwright against `localhost:3012`:
1. Screenshot — confirm a taskbar strip at the bottom with a "Start" button and a live clock on the right.
2. `browser_click` "Start" → confirm the popup menu appears above it with My Computer/My Work/Contact Me, a "Shut Down..." item, and the small attribution line at the bottom.
3. `browser_click` "Shut Down..." → confirm it replaces itself with the "Nice try..." text (not a real navigation/crash).
4. `browser_click` "My Work" in the Start menu → confirm the My Work window opens AND a matching taskbar button appears.
5. `browser_click` that taskbar button once (window is focused) → confirm the window disappears (minimized) and the taskbar button remains, visually un-pressed.
6. `browser_click` the same taskbar button again → confirm the window reappears and is focused (on top).
7. Open a second window, click its taskbar button while it's already focused → confirm minimize; click a *different*, non-focused-but-open window's taskbar button → confirm it comes to front without minimizing.

- [ ] **Step 6: Commit**

```bash
git add components/desktop/Clock.tsx components/desktop/StartMenu.tsx components/desktop/Taskbar.tsx components/desktop/DesktopView.tsx
git commit -m "Add taskbar, Start menu, and live clock"
```

---

### Task 13: Easter eggs — visitor counter and error popup

**Files:**
- Create: `components/easter-eggs/VisitorCounter.tsx`
- Create: `components/easter-eggs/ErrorPopup.tsx`
- Modify: `components/desktop/DesktopView.tsx` (mount both)

**Interfaces:**
- Consumes: `IconErrorBadge` (Task 3).
- Produces: `<VisitorCounter />`, `<ErrorPopup />` — both consumed by `DesktopView` (this task).

- [ ] **Step 1: Write `components/easter-eggs/VisitorCounter.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'leodex98-visits'

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const stored = Number(window.localStorage.getItem(STORAGE_KEY) ?? '1337')
    const next = stored + 1
    window.localStorage.setItem(STORAGE_KEY, String(next))
    setCount(next)
  }, [])

  if (count === null) return null

  const digits = String(count).padStart(6, '0').split('')

  return (
    <div className="fixed flex flex-col items-center gap-1 window m-0 p-1" style={{ bottom: 'calc(var(--taskbar-height) + 8px)', right: 8 }}>
      <span className="text-[10px] px-1">You are visitor #</span>
      <div className="flex bg-black">
        {digits.map((d, i) => (
          <span
            key={i}
            className="w-4 text-center font-mono text-[14px] text-lime-400 bg-black border-r border-lime-900 last:border-r-0"
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write `components/easter-eggs/ErrorPopup.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconErrorBadge } from '@/components/icons/PixelIcons'

const SESSION_KEY = 'leodex98-error-shown'

export default function ErrorPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.sessionStorage.getItem(SESSION_KEY)) return
    const timer = setTimeout(() => {
      setVisible(true)
      window.sessionStorage.setItem(SESSION_KEY, '1')
    }, 8000)
    return () => clearTimeout(timer)
  }, [])

  // Deliberately not a full-page modal (no dark backdrop, no focus trap) —
  // it must never block reading/scrolling per the brief's "don't get in the
  // way" requirement. It's a dismissible joke, not a real blocking dialog.
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 50 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="window m-0 w-72 pointer-events-auto">
            <div className="title-bar">
              <div className="title-bar-text">System Error</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={() => setVisible(false)} />
              </div>
            </div>
            <div className="window-body flex items-start gap-3 pt-3">
              <IconErrorBadge size={32} />
              <p className="text-[13px] leading-snug">
                Error: too much talent.
                <br />
                Please contact LeoDex to resolve this issue.
              </p>
            </div>
            <div className="flex justify-end p-2 pt-0">
              <button type="button" className="default" onClick={() => setVisible(false)}>
                OK
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

Note `pointer-events-none` on the full-screen wrapper (so it never blocks clicks on the desktop underneath) with `pointer-events-auto` on the dialog itself (so the dialog remains clickable) — this is what makes "not a real blocking modal" actually true rather than just visually true.

- [ ] **Step 3: Mount both in `DesktopView.tsx`**

```tsx
import VisitorCounter from '@/components/easter-eggs/VisitorCounter'
import ErrorPopup from '@/components/easter-eggs/ErrorPopup'
// ...
      <Taskbar />
      <VisitorCounter />
      <ErrorPopup />
    </div>
  )
}
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` — expected: no errors.

Via Playwright:
1. Navigate fresh (clear storage first via `browser_evaluate` running `localStorage.clear(); sessionStorage.clear();`, then reload) to `localhost:3012`.
2. Screenshot — confirm the visitor counter widget bottom-right shows `001338` (seed 1337 + 1).
3. Reload again — confirm it increments to `001339`.
4. Wait ~8.5s (`browser_wait_for` with time), screenshot — confirm the "System Error / too much talent" dialog appeared, centered, without a dark page-dimming backdrop.
5. Confirm the desktop icons are still clickable while the error dialog is showing (click "My Work" behind it) — proves it's non-blocking.
6. Click "OK" — confirm it dismisses. Reload the page within the same session — confirm it does NOT reappear (sessionStorage gate working).

- [ ] **Step 5: Commit**

```bash
git add components/easter-eggs/VisitorCounter.tsx components/easter-eggs/ErrorPopup.tsx components/desktop/DesktopView.tsx
git commit -m "Add visitor counter and one-time error popup easter eggs"
```

---

### Task 14: Mobile accordion view

**Files:**
- Create: `components/window/AccordionSection.tsx`
- Create: `components/desktop/MobileView.tsx`

**Interfaces:**
- Consumes: `MyWorkContent`, `AboutContent`, `SkillsContent`, `ContactContent` (Tasks 6–9); `IconFolder`/`IconNotepad`/`IconDriveD`/`IconMail` (Task 3).
- Produces: `<MobileView />` — consumed by Task 15 (`Desktop.tsx`).

- [ ] **Step 1: Write `components/window/AccordionSection.tsx`**

```tsx
'use client'

import { useState, type ReactNode } from 'react'

interface AccordionSectionProps {
  title: string
  icon: ReactNode
  defaultOpen?: boolean
  children: ReactNode
}

export default function AccordionSection({ title, icon, defaultOpen = false, children }: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="window m-0">
      {/* A single real <button> as the whole tappable header — NOT 98.css's
          .title-bar-controls button (that would nest a <button> inside this
          <button>, which is invalid HTML). The expand/collapse indicator is
          a plain span, not a second interactive control. */}
      <button
        type="button"
        className="title-bar w-full text-left min-h-[44px]"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="title-bar-text flex items-center gap-1.5 flex-1">
          {icon}
          {title}
        </span>
        <span className="text-white text-[11px] pr-1" aria-hidden="true">
          {open ? '▾' : '▸'}
        </span>
      </button>
      {open && <div className="window-body">{children}</div>}
    </div>
  )
}
```

- [ ] **Step 2: Write `components/desktop/MobileView.tsx`**

```tsx
import AccordionSection from '@/components/window/AccordionSection'
import MyWorkContent from '@/components/content/MyWorkContent'
import AboutContent from '@/components/content/AboutContent'
import SkillsContent from '@/components/content/SkillsContent'
import ContactContent from '@/components/content/ContactContent'
import { IconFolder, IconNotepad, IconDriveD, IconMail } from '@/components/icons/PixelIcons'

export default function MobileView() {
  return (
    <div className="md:hidden min-h-screen p-3 flex flex-col gap-3" style={{ background: 'var(--desktop-teal)' }}>
      <div className="text-center py-4">
        <h1 className="text-white text-2xl font-bold [text-shadow:1px_1px_0_rgba(0,0,0,0.8)]">LeoDex</h1>
        <p className="text-white text-[13px] [text-shadow:1px_1px_0_rgba(0,0,0,0.8)]">Web Developer — Italy</p>
      </div>

      <AccordionSection title="My Work" icon={<IconFolder size={16} />} defaultOpen>
        <MyWorkContent />
      </AccordionSection>
      <AccordionSection title="about-me.txt" icon={<IconNotepad size={16} />}>
        <AboutContent />
      </AccordionSection>
      <AccordionSection title="Skills (D:)" icon={<IconDriveD size={16} />}>
        <SkillsContent />
      </AccordionSection>
      <AccordionSection title="Send Message" icon={<IconMail size={16} />}>
        <ContactContent />
      </AccordionSection>
    </div>
  )
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — expected: no errors.

Temporarily render `<MobileView />` instead of `<DesktopView />` in `app/page.tsx`. Via Playwright: `browser_resize` to `390x844` (iPhone-ish), navigate to `localhost:3012`, screenshot. Confirm: a centered "LeoDex / Web Developer — Italy" header, then 4 stacked accordion sections with title-bar-styled headers, "My Work" expanded by default showing the project grid in a single column, others collapsed showing a `▸`. Tap "about-me.txt" header, screenshot, confirm it expands in place (no overlay, page just grows) and shows the Notepad content full-width with no horizontal scrollbar. Revert `app/page.tsx` to the Task 11 version.

- [ ] **Step 4: Commit**

```bash
git add components/window/AccordionSection.tsx components/desktop/MobileView.tsx
git commit -m "Add mobile accordion view"
```

---

### Task 15: Combine Desktop + Mobile, finalize page

**Files:**
- Create: `components/desktop/Desktop.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `DesktopView` (Task 11), `MobileView` (Task 14).
- Produces: `<Desktop />` — the final root component rendered by `app/page.tsx`.

- [ ] **Step 1: Write `components/desktop/Desktop.tsx`**

```tsx
'use client'

import DesktopView from './DesktopView'
import MobileView from './MobileView'

export default function Desktop() {
  return (
    <>
      <DesktopView />
      <MobileView />
    </>
  )
}
```

Both trees always mount; `DesktopView` is `hidden md:block`, `MobileView` is `md:hidden` (already set in Tasks 11/14) — a pure-CSS breakpoint switch with no client-side `matchMedia`/`useEffect`, so there's no SSR/hydration mismatch and no flash of the wrong layout.

- [ ] **Step 2: Replace `app/page.tsx`**

```tsx
import Desktop from '@/components/desktop/Desktop'

export default function Home() {
  return <Desktop />
}
```

- [ ] **Step 3: Full build check**

Run: `cd "D:/BaseAI/00-portfolioleodex" && npm run build`
Expected: build succeeds with no type or lint errors. (This is the first point the whole tree gets compiled together — it will surface any cross-task interface drift, e.g. a prop name that changed between when `WindowFrame` was written in Task 5 and when it's consumed in Task 11.)

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/desktop/Desktop.tsx app/page.tsx
git commit -m "Combine desktop and mobile views behind a CSS breakpoint switch"
```

---

### Task 16: Full interactive verification pass

**Files:** none (verification only; fix forward into whichever file if something's broken).

- [ ] **Step 1: Desktop pass**

`npm run dev`, then via Playwright at `localhost:3012` (desktop viewport, default size):
1. Screenshot the empty desktop.
2. Open all 3 desktop icons; from My Computer, open both About and Skills. Screenshot with all 5 windows open — confirm readable overlap/cascade, no window fully hidden behind another with no way to reach it (all 5 should have taskbar buttons at minimum).
3. Confirm every project's "Open project →" and both Contact "Open →" links have correct real `href`s via `browser_snapshot` (cross-check against `lib/data.ts`).
4. Minimize 2 windows, maximize 1, confirm taskbar reflects all 5 states correctly, restore each from the taskbar.
5. Resize the browser narrower step by step (e.g. 1024px → 900px → 800px) while windows are open — confirm `min(width, calc(100vw - 32px))` keeps every window fully on-screen with no horizontal page scrollbar.

- [ ] **Step 2: Mobile pass**

`browser_resize` to `375x667` (small phone) and separately `390x844`:
1. Screenshot the full scrolled page (all 4 accordion sections, expanding each one at a time).
2. Confirm no element causes horizontal overflow at 375px width — check with `browser_evaluate` running `document.documentElement.scrollWidth <= document.documentElement.clientWidth`.
3. Confirm every tap target (accordion headers, project "Open project →" buttons, contact "Open →" buttons) is at least 44px tall.

- [ ] **Step 3: Fix anything found**

If any check in Steps 1–2 fails, fix it in the relevant component from Tasks 1–14 (not a new file) and re-run the specific failing check.

- [ ] **Step 4: Commit (only if fixes were made)**

```bash
git add -A
git commit -m "Fix issues found in full interactive verification pass"
```

---

### Task 17: Deploy to a new, independent Vercel project

**Files:** none.

- [ ] **Step 1: Confirm git identity matches the account (avoids the known stuck-Building hang)**

```bash
cd "D:/BaseAI/00-portfolioleodex"
git config user.email
git config user.name
```
Expected: `leodexyt@gmail.com` / `LeoDex0` (already confirmed during planning — re-check here in case anything changed).

- [ ] **Step 2: Deploy**

```bash
cd "D:/BaseAI/00-portfolioleodex"
npx vercel@latest --prod --yes
```

This is a brand-new directory with no existing Vercel link, so this both creates a new Vercel project and deploys it — it will **not** touch the existing `portfolio` project. Follow the same pattern already used for every other project in this account.

- [ ] **Step 3: Verify the live deployment**

Take the production URL printed by the CLI. Via Playwright, `browser_navigate` to it, screenshot, and spot-check: desktop loads with the teal background and 3 icons, My Work opens and shows real screenshots (confirms `public/images` deployed correctly), one external project link resolves.

- [ ] **Step 4: Report the live URL back**

Confirm the final production URL is different from `https://portfolio-leo-dex.vercel.app` (the existing hub) — this was an explicit requirement.

---

## Self-Review Notes

- **Spec coverage:** every design-spec section maps to a task — desktop/icons (11), My Work (6), About (7), Skills (8), Contact (9), My Computer nesting (10), window manager incl. real minimize/maximize (4–5), taskbar/Start menu/attribution (12), easter eggs (13), mobile accordion (14), responsive switch (15), deploy (17). Data/assets (1) and styling foundation (2) underpin everything.
- **Placeholder scan:** no TBD/TODO; every step has real, complete code or an exact command.
- **Type consistency:** `WindowId` is defined once (Task 4) and reused verbatim everywhere else (Tasks 5, 10, 11, 12) — no parallel string-literal unions. Content component names (`MyWorkContent`, `AboutContent`, `SkillsContent`, `ContactContent`) are identical between their desktop usage (Task 11) and mobile usage (Task 14).
- **Fixed during this review:** two real bugs caught while designing Task 14 before they were ever written — (1) nesting a 98.css `.title-bar-controls` `<button>` inside `AccordionSection`'s own outer `<button>` would have been invalid HTML (fixed by using a plain `<span>` indicator instead); (2) `SkillsContent`/`ContactContent`/`MyWorkContent` originally had hardcoded `min-w`/`max-w` values that would have forced horizontal overflow on narrow phones once reused inside the mobile accordion (fixed by leaving them fluid and letting the parent — `WindowFrame` width on desktop, accordion body on mobile — control sizing).
