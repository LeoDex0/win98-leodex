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
