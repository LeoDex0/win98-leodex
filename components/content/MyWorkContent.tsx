import { PROJECTS } from '@/lib/data'
import ProjectCard from './ProjectCard'

export default function MyWorkContent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-2">
      {PROJECTS.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
