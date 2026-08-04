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
        className="title-bar w-full text-left"
        style={{ minHeight: 44, boxShadow: 'none' }}
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
