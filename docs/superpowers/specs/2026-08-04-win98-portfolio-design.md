# Win98 Portfolio — Design Spec

## Overview

A second, standalone freelance portfolio site for LeoDex, styled as a Windows 98 desktop with early-2000s-web flourishes. It is a companion/experiment to the existing terminal-themed hub (`D:\BaseAI\portfolio`, live at portfolio-leo-dex.vercel.app) — **not a replacement**. Separate folder, separate git repo, separate Vercel project, separate URL. Same real content (name, projects, contact), completely different visual concept, per the user's explicit "different link, don't make it the same" instruction.

Single language: English only (no i18n layer, unlike the original hub's 7 languages).

## Content source (reused verbatim from the existing hub)

Pulled from `D:\BaseAI\portfolio\index.html`:

- **Identity**: name "LeoDex", role "Web Developer", based in Italy. Contact: Telegram `@xeDoeL` (`https://t.me/xeDoeL`), GitHub `LeoDex0` (`https://github.com/LeoDex0`).
- **7 projects** (name, tag, description, live URL, screenshot) — il-faro-rimini, hotel-fellini, windows-style-trading (PVC windows co. — coincidental naming clash with "Windows" theme, keep tag text as-is, it's about literal PVC windows/doors), palyanytsya-trattoria, studio-nova, prime-estate, pulse-fit. Screenshots copied from `D:\BaseAI\portfolio\images\*.png` into this project's `public/images/`.
- **Stack list**: Next.js, React, TypeScript, Tailwind CSS, GSAP, Framer Motion (extended with Zustand and 98.css for this build's own Skills window — see below).
- **Capability bullets**: the two existing lists (`eng_1..eng_6` "Site engineering", `motion_1..motion_6` "Motion & polish") reused as prose in the About window.

No fabricated stats or testimonials — same honesty rule as the original hub.

## Information architecture

Desktop shows exactly 3 icons (matches the user's brief): **My Computer**, **My Work**, **Contact Me**.

- **My Work** (direct open) → project grid window.
- **Contact Me** (direct open) → contact window.
- **My Computer** (direct open) → an Explorer icon-view window containing 2 further icons, authentic to how a real "My Computer" window lists drives:
  - **About Me (C:)** → opens the About window (Notepad/readme.txt style).
  - **Skills (D:)** → opens the Skills window (Explorer details-list style).

This satisfies all 4 content windows from the brief (My Work, About Me, Skills, Contact) while keeping the literal desktop to the 3 icons named in the brief, and adds one extra layer of authentic OS-flavored navigation without inventing new top-level clutter.

## Window manager behavior

A real (small-scale) window manager, not just static cards:

- **Open**: click a desktop/Explorer icon → window mounts with a scale/fade "launch" animation (Framer Motion), centered (with slight cascade offset if multiple are open).
- **Focus/z-index**: clicking a window (or its taskbar button) brings it to front; inactive windows' title bars switch to the 98.css `.title-bar.inactive` (grey) style.
- **Close** (X): unmounts the window and removes its taskbar entry.
- **Minimize** (_): hides the window but **keeps its taskbar button** — clicking that button restores it. This is upgraded from "purely decorative" (as literally suggested in the brief) to actually working, since the taskbar bookkeeping needed for it is essentially free once window state is centrally managed — it makes the "real functionality, not just a picture" requirement land harder.
- **Maximize** (□): toggles the window between its default size and filling the desktop area. Also real, same reasoning as minimize.
- **No drag, no resize-by-handle.** Windows open centered/cascaded and stay put. This matches the brief (which only asked for decorative min/close, not a fully manipulable OS) and avoids drag-vs-mobile-scroll conflicts entirely.
- State lives in a single Zustand store (`useWindowManager`): list of open windows with `{id, minimized, zIndex}`, a `focus(id)`, `open(id)`, `close(id)`, `toggleMinimize(id)`, `toggleMaximize(id)`.

**Taskbar** (bottom, fixed): Start button with a decorative popup menu (My Computer / My Work / Contact Me shortcuts + a "Shut Down..." joke item that just shows a dead-end "nice try" dialog — no real navigation, pure flavor, does not count against the easter-egg budget below), a row of buttons for currently-open windows, and a live-updating clock on the right (same client-clock pattern the original hub already uses).

## Visual system

- **Base**: [98.css](https://www.npmjs.com/package/98.css) (`^0.1.21`, MIT) supplies the authentic `.window` / `.title-bar` / `.title-bar-controls` (real `aria-label="Minimize/Maximize/Close"` buttons, not divs) / `.status-bar` / `.field-row` / `.sunken-panel` primitives and pixelated scrollbar styling. Custom React components are built on top for layout, the grid system, and responsiveness — 98.css is a styling foundation, not a component library, so this stays fully under our control.
- **Font**: 98.css bundles real "MS Sans Serif" webfont files (`ms_sans_serif.woff2` / `ms_sans_serif_bold.woff2`), loaded via `next/font/local`. This is a CC-BY-SA-3.0 pixel-font recreation (not Microsoft's proprietary font) — a small credit line ("MS Sans Serif reconstruction by 'lou', 98.css by Jordan Scales") goes in the footer fine print to satisfy attribution. Base size stays ≥14px with real (non-pixel-cramped) line-height so the "readable, normal contrast" requirement from the brief holds even though the font looks bitmap-y.
- **Icons**: no external icon pack (avoids licensing/sourcing risk). A small set of hand-built pixel-grid SVGs (crisp-edged, not blurry raster) covers: Computer, Folder, Envelope, Drive/Disk ×2 (About/Skills), Notepad, generic App/DLL file icons (×2, reused across Skills rows), and an error-dialog badge (white X on red). 98.css's own bundled control-icon SVGs (`close.svg`, `minimize.svg`, `maximize.svg`, `restore.svg`) are used as-is for title-bar buttons.
- **Desktop background**: solid teal (`#008080`, the actual Windows 98 default desktop color) — no photographic imagery, keeps it authentic and lightweight. A faint repeating pixel pattern on top of the teal is acceptable as a later polish pass but is not required.

## Window contents

- **My Work**: grid of the 7 projects; each project renders as its own nested mini-window (small title bar showing the project's folder-style slug, e.g. `il-faro-rimini/`, matching the naming already used on the original hub) with screenshot, tag, description, and a real `Open project →` link/button to the live deployed site.
- **About Me (C:)**: Notepad-styled window (monospace body text, decorative "File Edit Search Help" menu row) containing a short original bio paragraph plus the two existing capability lists ("what I build") reused as dash-bullets — no literal word "Skills" here, to avoid overlapping with the dedicated Skills window.
- **Skills (D:)**: Explorer details-view list (Name / Type / Comment columns) of the stack — Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Zustand, GSAP — each row using one of the two generic file icons plus a one-line plain-English comment (e.g. "React framework, App Router").
- **Contact Me**: "Send Message"-styled dialog with two real channel rows (Telegram, GitHub) — icon, handle, `Open →` button linking out. No fake submitting form (confirmed with the user: links only, no backend).

## Easter eggs (2, per the brief's "don't clutter" limit)

1. **Visitor counter**: classic odometer-digit GIF-look counter in a corner of the desktop, real count via `localStorage` increment on load (not literally global, but reads/feels real — same honesty bar as anything else client-only on this site).
2. **`Error: too much talent`**: a genuine 98.css error dialog (error badge icon, OK button) that appears once per session after a short delay, dismissible, gated by a `sessionStorage` flag so it never nags twice in one visit.

Nothing else hidden beyond this — no Konami codes, no secondary pages, to keep this build focused (that density of easter egg already exists on the original hub; this one stays lean per the brief).

## Responsive / mobile

Below a `md` breakpoint, the desktop/window paradigm is replaced outright: desktop icons become a simple icon-menu row/grid at the top, and each "window" becomes a full-width card in a single-column accordion (title-bar-styled header doubles as the accordion trigger, tap to expand/collapse). No fixed-size floating windows, no z-index stacking, no taskbar — those are desktop-only affordances. Tap targets ≥44px. This matches the brief's explicit mobile requirement.

## Tech stack

Next.js `16.2.12` (App Router) + React `19.2.4` + TypeScript, Tailwind CSS `^4` (layout/responsive utilities only — visual chrome comes from 98.css), `98.css@0.1.21`, `framer-motion@12.43.0` (window open/close/minimize/maximize transitions, icon press feedback, error dialog), `zustand@5.0.14` (window manager store), `clsx@2.1.1`. No GSAP/Lenis here — Framer Motion alone covers this build's animation needs; adding a second animation library would be unused weight, not "maximum stack."

## Non-goals

- No backend/contact form, no email integration (Telegram/GitHub links only — confirmed).
- No i18n (English only — confirmed).
- No real window drag or resize-by-handle.
- No fabricated testimonials/stats.

## Deployment

Local source: `D:\BaseAI\00-portfolioleodex` (already scaffolded, own git repo, git identity confirmed matching `leodexyt@gmail.com` / `LeoDex0` — no stale-identity Vercel-hang risk). New, independent Vercel project (not linked to the existing `portfolio` project) — separate production URL, e.g. `00-portfolioleodex.vercel.app` or a cleaner chosen slug at deploy time. Deployed via `npx vercel --prod --yes`, same pattern as the rest of this account's projects.
