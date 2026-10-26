import { Navigate, useParams } from 'react-router-dom'
import { BauhausAccent } from '../components/BauhausAccent'
import { ProjectGrid } from '../components/ProjectGrid'
import { useTranslation } from '../i18n/I18nContext'
import type { Project } from '../i18n/types'
import {
  isWorkCategorySlug,
  WORK_CATEGORY_LABEL_KEYS,
  type WorkCategorySlug,
} from '../lib/workCategories'
import {
  isWorkSectionKey,
  WORK_SECTION_LABEL_KEYS,
  WORK_SECTIONS_BY_CATEGORY,
} from '../lib/workSections'

type WorkPageProps = {
  period: Project['period']
}

function projectSection(project: Project): string | null {
  if (!('section' in project) || typeof project.section !== 'string') return null
  return project.section
}

export function WorkPage({ period }: WorkPageProps) {
  const { t } = useTranslation()
  const { category: categoryParam } = useParams<{ category?: string }>()

  if (categoryParam && !isWorkCategorySlug(categoryParam)) {
    return <Navigate to={period === 'a' ? '/work/romania/housing' : '/work/usa/housing'} replace />
  }

  const category = categoryParam as WorkCategorySlug | undefined
  const projects = t.projects.filter(
    (project) =>
      project.period === period && (!category || project.category === category),
  )
  const section =
    period === 'a'
      ? { title: t.workPage.periodRomania, subtitle: t.workPage.periodRomaniaSubtitle }
      : { title: t.workPage.periodSua, subtitle: t.workPage.periodSuaSubtitle }
  const categoryLabel = category
    ? t.workCategories[WORK_CATEGORY_LABEL_KEYS[category]]
    : null

  const sectionOrder = category ? WORK_SECTIONS_BY_CATEGORY[category] : []

  const groupedSections =
    category && sectionOrder.length > 0
      ? sectionOrder
          .map((key) => ({
            key,
            title: t.workSections[WORK_SECTION_LABEL_KEYS[key]],
            projects: projects.filter((project) => projectSection(project) === key),
          }))
          .filter((group) => group.projects.length > 0)
      : []

  const knownSections = new Set(sectionOrder)
  const unsectioned = projects.filter((project) => {
    const key = projectSection(project)
    if (!key) return true
    if (!isWorkSectionKey(key)) return true
    return !knownSections.has(key)
  })

  const metaLabel = categoryLabel
    ? `${section.subtitle} · ${categoryLabel}`
    : section.subtitle

  return (
    <>
      <section className="hero page-section">
        <div className="container hero__grid">
          <div>
            <BauhausAccent />
            <h2>{t.workPage.heading}</h2>
            <div className="hero__meta">
              <span>
                {projects.length} {t.workPage.projectsCount}
              </span>
              <span>{metaLabel}</span>
            </div>
          </div>
          <p className="hero__lead">{t.workPage.lead}</p>
        </div>
      </section>

      {groupedSections.length > 0 ? (
        <>
          {groupedSections.map((group) => (
            <section key={group.key} className="works page-section">
              <div className="container">
                <div className="section-head">
                  <h2>{group.title}</h2>
                  <span className="label">{metaLabel}</span>
                </div>
                <ProjectGrid projects={group.projects} />
              </div>
            </section>
          ))}
          {unsectioned.length > 0 ? (
            <section className="works page-section">
              <div className="container">
                <div className="section-head">
                  <h2>{categoryLabel ?? section.title}</h2>
                  <span className="label">{metaLabel}</span>
                </div>
                <ProjectGrid projects={unsectioned} />
              </div>
            </section>
          ) : null}
        </>
      ) : (
        <section className="works page-section">
          <div className="container">
            <div className="section-head">
              <h2>{categoryLabel ?? section.title}</h2>
              <span className="label">{metaLabel}</span>
            </div>
            <ProjectGrid projects={projects} />
          </div>
        </section>
      )}
    </>
  )
}
