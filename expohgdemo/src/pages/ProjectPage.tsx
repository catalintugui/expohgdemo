import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { HouseIcon } from '../components/HouseIcon'
import { ProjectSlider } from '../components/ProjectSlider'
import { usePageMeta } from '../hooks/usePageMeta'
import { useTranslation } from '../i18n/I18nContext'
import { absoluteUrl } from '../lib/site'
import { projectPathForProject, workPathForProject } from '../lib/workPaths'

const DETAIL_ORDER = [
  'beneficiary',
  'authYear',
  'designYear',
  'archiveDocs',
  'addressCurrent',
  'collaborator',
  'buildingState',
  'description',
  'mapsLink',
] as const

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const location = useLocation()
  const { t } = useTranslation()
  const [heroOpen, setHeroOpen] = useState(false)

  const project = t.projects.find((item) => item.slug === slug)
  const canonicalPath = project
    ? projectPathForProject(project)
    : '/work/romania/housing'
  const detailDescription =
    typeof project?.details?.description === 'string'
      ? project.details.description.trim()
      : ''
  const firstImage = project?.images?.find(Boolean)
  const ogImage = firstImage
    ? firstImage.startsWith('http')
      ? firstImage
      : absoluteUrl(firstImage)
    : undefined

  usePageMeta({
    title: project
      ? `${project.title} — ${t.architect.name}`
      : t.meta.title,
    description:
      detailDescription ||
      (project
        ? `${project.title}. ${t.meta.description}`
        : t.meta.description),
    path: project ? canonicalPath : '/',
    image: ogImage,
    noIndex: !project,
  })

  useEffect(() => {
    if (!heroOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setHeroOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [heroOpen])

  if (!project) {
    return <Navigate to="/work/romania/housing" replace />
  }

  if (location.pathname !== canonicalPath) {
    return <Navigate to={canonicalPath} replace />
  }

  const workPath = workPathForProject(project)

  const images = project.images.filter(Boolean)
  const hasImages = images.length > 0

  const labels = t.projectPage.detailLabels
  const unknown = t.projectPage.unknown
  const details = project.details ?? {}

  const detailRows = DETAIL_ORDER.filter((key) => {
    if (!(key in details)) return false
    const raw = details[key as keyof typeof details]
    if (key === 'mapsLink') {
      return typeof raw === 'string' && /^https?:\/\//i.test(raw.trim())
    }
    return true
  }).map((key) => {
    const raw = details[key as keyof typeof details]
    const value = typeof raw === 'string' && raw.trim() ? raw.trim() : unknown
    const label = labels[key as keyof typeof labels]
    return { key, label, value }
  })

  return (
    <div className="page-fit page-fit--project">
      <section className="project-hero page-section">
        <div className="container project-hero__grid">
          <div
            className={
              project.hero
                ? 'project-hero__media'
                : 'project-hero__media project-hero__media--placeholder'
            }
            role={project.hero ? undefined : 'img'}
            aria-label={
              project.hero
                ? undefined
                : `${t.common.placeholderFor} ${project.title}`
            }
          >
            {project.hero ? (
              <button
                type="button"
                className="project-hero__open"
                onClick={() => setHeroOpen(true)}
                aria-label={project.title}
              >
                <img src={project.hero} alt={project.title} />
              </button>
            ) : (
              <HouseIcon className="project-hero__placeholder-icon" />
            )}
          </div>

          <div className="project-hero__content">
            <p className="project-hero__meta">
              {project.type} · {project.year}
            </p>
            <h1>{project.title}</h1>
            <div className="project-hero__body">
              {detailRows.map(({ key, label, value }) => (
                <p key={key}>
                  {key === 'mapsLink' ? (
                    <a
                      className="project-hero__maps-link"
                      href={value}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {label}
                    </a>
                  ) : (
                    <>
                      <strong className="project-hero__label">{label}</strong>:{' '}
                      {value}
                    </>
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {hasImages ? (
        <section className="project-gallery page-section">
          <div className="container">
            <ProjectSlider
              images={images}
              title={project.title}
              placeholderLabel={t.common.placeholderFor}
              prevLabel={t.projectPage.prev}
              nextLabel={t.projectPage.next}
              closeLabel={t.projectPage.close}
            />
          </div>
        </section>
      ) : null}

      <div className="container project-back">
        <Link to={workPath}>{t.projectPage.back}</Link>
      </div>

      {heroOpen && project.hero
        ? createPortal(
            <div
              className="project-hero-fs"
              role="dialog"
              aria-modal="true"
              aria-label={project.title}
              onClick={() => setHeroOpen(false)}
            >
              <button
                type="button"
                className="project-hero-fs__close"
                onClick={() => setHeroOpen(false)}
                aria-label={t.projectPage.close}
              >
                ×
              </button>
              <img
                className="project-hero-fs__image"
                src={project.hero}
                alt={project.title}
                onClick={(event) => event.stopPropagation()}
              />
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}
