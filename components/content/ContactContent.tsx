import { CONTACT_LINKS } from '@/lib/data'
import { IconTelegram, IconGithub } from '@/components/icons/PixelIcons'

const ICONS = { telegram: IconTelegram, github: IconGithub }

export default function ContactContent() {
  return (
    <div className="p-1">
      <p className="text-[13px] mb-3">Available for freelance projects. Fastest way to reach me:</p>
      <div className="sunken-panel p-2 flex flex-col gap-2">
        {CONTACT_LINKS.map((link) => {
          const Icon = ICONS[link.icon]
          return (
            <div key={link.label} className="flex items-center justify-between gap-3 flex-wrap">
              <span className="flex items-center gap-2 text-[13px]">
                <Icon size={20} />
                {link.label} <span className="text-black/60">{link.handle}</span>
              </span>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="win98-btn">
                Open →
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
