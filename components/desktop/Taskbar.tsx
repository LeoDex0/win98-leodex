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
