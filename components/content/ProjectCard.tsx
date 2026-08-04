import Image from 'next/image'
import type { Project } from '@/lib/data'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="window m-0">
      <div className="title-bar">
        <div className="title-bar-text">{project.slug}</div>
        <div className="title-bar-controls">
          {/* Decorative only — nested per-project mini-windows aren't real,
              independently manageable OS windows like the top-level 5. */}
          <button aria-label="Close" tabIndex={-1} />
        </div>
      </div>
      <div className="window-body">
        <div className="relative w-full h-28 border border-black/30">
          <Image
            src={project.image}
            alt={`${project.slug} preview`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 340px"
          />
        </div>
        <p className="mt-2 text-[12px] font-bold">{project.tag}</p>
        <p className="text-[12px] leading-snug">{project.description}</p>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="win98-btn mt-2 block w-full">
          Open project →
        </a>
      </div>
    </div>
  )
}
