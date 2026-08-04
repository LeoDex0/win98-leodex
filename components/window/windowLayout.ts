import type { WindowId } from './useWindowManager'

export const WINDOW_LAYOUT: Record<WindowId, { top: string; left: string; width: number }> = {
  'my-computer': { top: '12%', left: '6%', width: 320 },
  'my-work': { top: '8%', left: '22%', width: 720 },
  about: { top: '16%', left: '16%', width: 460 },
  skills: { top: '20%', left: '32%', width: 520 },
  contact: { top: '24%', left: '40%', width: 400 },
}
