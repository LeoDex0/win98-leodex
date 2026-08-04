'use client'

import { useWindowManager } from '@/components/window/useWindowManager'
import { IconDriveC, IconDriveD } from '@/components/icons/PixelIcons'

export default function MyComputerContent() {
  const open = useWindowManager((s) => s.open)

  return (
    <div className="flex gap-6 p-3">
      <button
        type="button"
        onClick={() => open('about')}
        className="flex w-20 flex-col items-center gap-1 text-center"
      >
        <IconDriveC size={32} />
        <span className="text-[12px] leading-tight">About Me (C:)</span>
      </button>
      <button
        type="button"
        onClick={() => open('skills')}
        className="flex w-20 flex-col items-center gap-1 text-center"
      >
        <IconDriveD size={32} />
        <span className="text-[12px] leading-tight">Skills (D:)</span>
      </button>
    </div>
  )
}
