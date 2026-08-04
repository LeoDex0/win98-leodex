import AccordionSection from '@/components/window/AccordionSection'
import MyWorkContent from '@/components/content/MyWorkContent'
import AboutContent from '@/components/content/AboutContent'
import SkillsContent from '@/components/content/SkillsContent'
import ContactContent from '@/components/content/ContactContent'
import { IconFolder, IconNotepad, IconDriveD, IconMail } from '@/components/icons/PixelIcons'

export default function MobileView() {
  return (
    <div className="md:hidden min-h-screen p-3 flex flex-col gap-3" style={{ background: 'var(--desktop-teal)' }}>
      <div className="text-center py-4">
        <h1 className="text-white text-2xl font-bold [text-shadow:1px_1px_0_rgba(0,0,0,0.8)]">LeoDex</h1>
        <p className="text-white text-[13px] [text-shadow:1px_1px_0_rgba(0,0,0,0.8)]">Web Developer — Italy</p>
      </div>

      <AccordionSection title="My Work" icon={<IconFolder size={16} />} defaultOpen>
        <MyWorkContent />
      </AccordionSection>
      <AccordionSection title="about-me.txt" icon={<IconNotepad size={16} />}>
        <AboutContent />
      </AccordionSection>
      <AccordionSection title="Skills (D:)" icon={<IconDriveD size={16} />}>
        <SkillsContent />
      </AccordionSection>
      <AccordionSection title="Send Message" icon={<IconMail size={16} />}>
        <ContactContent />
      </AccordionSection>
    </div>
  )
}
