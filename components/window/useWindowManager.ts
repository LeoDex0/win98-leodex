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
