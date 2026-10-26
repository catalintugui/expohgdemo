import { Navigate, useParams } from 'react-router-dom'
import { useTranslation } from '../i18n/I18nContext'
import { projectPathForProject } from '../lib/workPaths'

export function LegacyProjectRedirect() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const project = t.projects.find((item) => item.slug === slug)

  if (!project) {
    return <Navigate to="/work/romania/housing" replace />
  }

  return <Navigate to={projectPathForProject(project)} replace />
}
