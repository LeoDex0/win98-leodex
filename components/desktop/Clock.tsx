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
