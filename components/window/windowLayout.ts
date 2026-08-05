import type { WindowId } from './useWindowManager'

export const WINDOW_LAYOUT: Record<WindowId, { top: string; left: string; width: number }> = {
  'my-computer': { top: '14%', left: '8%', width: 320 },
  'my-work': { top: '6%', left: '16%', width: 920 },
  about: { top: '16%', left: '20%', width: 460 },
  skills: { top: '20%', left: '34%', width: 520 },
  contact: { top: '24%', left: '42%', width: 400 },
}
