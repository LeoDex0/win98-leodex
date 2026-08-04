'use client'

import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'leodex98-visits'

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const didIncrement = useRef(false)

  useEffect(() => {
    if (didIncrement.current) return
    didIncrement.current = true

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
