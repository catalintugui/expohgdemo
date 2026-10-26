import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/I18nContext'
import type { Project } from '../i18n/types'
import { projectPathForProject } from '../lib/workPaths'

type ProjectGridProps = {
  projects?: Project[]
  limit?: number
}

export function ProjectGrid({ projects, limit }: ProjectGridProps) {
  const { t } = useTranslation()
  const items = limit ? t.projects.slice(0, limit) : (projects ?? t.projects)

  return (
    <div className="works__grid">
      {items.map((project) => (
        <Link
          key={project.slug}
          to={projectPathForProject(project)}
          className="work-card"
        >
          <div
            className={
              project.hero
                ? 'work-card__frame work-card__frame--has-image'
                : 'work-card__frame'
            }
            role="img"
            aria-label={
              project.hero
                ? project.title
                : `${t.common.placeholderFor} ${project.title}`
            }
          >
            {project.hero ? (
              <img
                className="work-card__image"
                src={project.hero}
                alt={project.title}
              />
            ) : null}
          </div>
          <div className="work-card__body">
            <span className="work-card__index">{project.index}</span>
            <h3>{project.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
