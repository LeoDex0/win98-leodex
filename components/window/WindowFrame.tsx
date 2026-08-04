'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'
import { useWindowManager, windowZIndex, isTopWindow, type WindowId } from './useWindowManager'

interface WindowFrameProps {
  id: WindowId
  title: string
  icon: ReactNode
  top: string
  left: string
  width: number
  children: ReactNode
}

export default function WindowFrame({ id, title, icon, top, left, width, children }: WindowFrameProps) {
  const openIds = useWindowManager((s) => s.openIds)
  const runtime = useWindowManager((s) => s.runtime[id])
  const focus = useWindowManager((s) => s.focus)
  const close = useWindowManager((s) => s.close)
  const toggleMinimize = useWindowManager((s) => s.toggleMinimize)
  const toggleMaximize = useWindowManager((s) => s.toggleMaximize)

  const isOpen = openIds.includes(id)
  const isMinimized = runtime?.minimized ?? false
  const isMaximized = runtime?.maximized ?? false
  const isActive = isTopWindow(openIds, id)

  return (
    <AnimatePresence>
      {isOpen && !isMinimized && (
        <motion.div
          className="fixed"
          style={{
            top: isMaximized ? 8 : top,
            left: isMaximized ? 8 : left,
            right: isMaximized ? 8 : undefined,
            bottom: isMaximized ? 'calc(var(--taskbar-height) + 8px)' : undefined,
            width: isMaximized ? 'auto' : `min(${width}px, calc(100vw - 32px))`,
            zIndex: windowZIndex(openIds, id),
          }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.14, ease: 'easeOut' }}
          onMouseDown={() => focus(id)}
        >
          <div className={`window m-0 ${!isActive ? 'inactive' : ''}`}>
            <div className={`title-bar ${!isActive ? 'inactive' : ''}`}>
              <div className="title-bar-text flex items-center gap-1.5">
                {icon}
                {title}
              </div>
              <div className="title-bar-controls">
                <button aria-label="Minimize" onClick={() => toggleMinimize(id)} />
                <button aria-label={isMaximized ? 'Restore' : 'Maximize'} onClick={() => toggleMaximize(id)} />
                <button aria-label="Close" onClick={() => close(id)} />
              </div>
            </div>
            <div className="window-body max-h-[70vh] overflow-auto">{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
