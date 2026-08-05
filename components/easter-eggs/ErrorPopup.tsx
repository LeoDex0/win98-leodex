'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconErrorBadge } from '@/components/icons/PixelIcons'

const SESSION_KEY = 'leodex98-error-shown'

export default function ErrorPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.sessionStorage.getItem(SESSION_KEY)) return
    const timer = setTimeout(() => {
      setVisible(true)
      window.sessionStorage.setItem(SESSION_KEY, '1')
    }, 25000)
    return () => clearTimeout(timer)
  }, [])

  // Deliberately not a full-page modal (no dark backdrop, no focus trap) —
  // it must never block reading/scrolling per the brief's "don't get in the
  // way" requirement. It's a dismissible joke, not a real blocking dialog.
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 50 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="window m-0 w-72 pointer-events-auto">
            <div className="title-bar">
              <div className="title-bar-text">System Error</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={() => setVisible(false)} />
              </div>
            </div>
            <div className="window-body flex items-start gap-3 pt-3">
              <IconErrorBadge size={32} />
              <p className="text-[13px] leading-snug">
                Error: too much talent.
                <br />
                Please contact LeoDex to resolve this issue.
              </p>
            </div>
            <div className="flex justify-end p-2 pt-0">
              <button type="button" className="default" onClick={() => setVisible(false)}>
                OK
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
