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
