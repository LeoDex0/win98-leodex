'use client'

import WindowFrame from '@/components/window/WindowFrame'
import { useWindowManager } from '@/components/window/useWindowManager'
import { WINDOW_LAYOUT } from '@/components/window/windowLayout'
import DesktopIcon from './DesktopIcon'
import Taskbar from './Taskbar'
import MyComputerContent from '@/components/content/MyComputerContent'
import MyWorkContent from '@/components/content/MyWorkContent'
import AboutContent from '@/components/content/AboutContent'
import SkillsContent from '@/components/content/SkillsContent'
import ContactContent from '@/components/content/ContactContent'
import { IconComputer, IconFolder, IconMail, IconNotepad, IconDriveD } from '@/components/icons/PixelIcons'

export default function DesktopView() {
  const open = useWindowManager((s) => s.open)

  return (
    <div className="hidden md:block fixed inset-0 overflow-hidden" style={{ background: 'var(--desktop-teal)' }}>
      <div className="flex flex-col gap-4 p-4">
        <DesktopIcon label="My Computer" icon={<IconComputer size={32} />} onOpen={() => open('my-computer')} />
        <DesktopIcon label="My Work" icon={<IconFolder size={32} />} onOpen={() => open('my-work')} />
        <DesktopIcon label="Contact Me" icon={<IconMail size={32} />} onOpen={() => open('contact')} />
      </div>

      <WindowFrame id="my-computer" title="My Computer" icon={<IconComputer size={16} />} {...WINDOW_LAYOUT['my-computer']}>
        <MyComputerContent />
      </WindowFrame>
      <WindowFrame id="my-work" title="My Work" icon={<IconFolder size={16} />} {...WINDOW_LAYOUT['my-work']}>
        <MyWorkContent />
      </WindowFrame>
      <WindowFrame id="about" title="about-me.txt - Notepad" icon={<IconNotepad size={16} />} {...WINDOW_LAYOUT['about']}>
        <AboutContent />
      </WindowFrame>
      <WindowFrame id="skills" title="Skills (D:)" icon={<IconDriveD size={16} />} {...WINDOW_LAYOUT['skills']}>
        <SkillsContent />
      </WindowFrame>
      <WindowFrame id="contact" title="Send Message" icon={<IconMail size={16} />} {...WINDOW_LAYOUT['contact']}>
        <ContactContent />
      </WindowFrame>

      <Taskbar />
    </div>
  )
}
