import { Link, useSearchParams } from 'react-router-dom'
import { BauhausAccent } from '../components/BauhausAccent'
import { HouseIcon } from '../components/HouseIcon'
import { usePageMeta } from '../hooks/usePageMeta'
import { useTranslation } from '../i18n/I18nContext'
import { projectPathForProject } from '../lib/workPaths'
import { searchProjects } from '../lib/searchProjects'

function formatCount(template: string, count: number) {
  return template.replace('{count}', String(count))
}

export function SearchPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''
  const results = query ? searchProjects(t.projects, query) : []

  usePageMeta({
    title: `${t.searchPage.heading} — ${t.architect.name}`,
    description: t.meta.description,
    path: '/search',
    noIndex: true,
  })

  const countLabel =
    results.length === 1
      ? formatCount(t.searchPage.resultCount, results.length)
      : formatCount(t.searchPage.resultsCount, results.length)

  return (
    <>
      <section className="hero page-section">
        <div className="container hero__grid">
          <div>
            <BauhausAccent />
            <h2>{t.searchPage.heading}</h2>
            <div className="hero__meta">
              {query ? (
                <>
                  <span>
                    {t.searchPage.resultsFor} “{query}”
                  </span>
                  <span>{countLabel}</span>
                </>
              ) : (
                <span>{t.searchPage.emptyQuery}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="page-section search-results">
        <div className="container">
          {!query ? (
            <p className="search-results__empty">{t.searchPage.emptyQuery}</p>
          ) : results.length === 0 ? (
            <p className="search-results__empty">{t.searchPage.noResults}</p>
          ) : (
            <ul className="search-results__list">
              {results.map((project) => (
                <li key={project.slug}>
                  <Link
                    to={projectPathForProject(project)}
                    className="search-result"
                  >
                    <div
                      className={
                        project.hero
                          ? 'search-result__frame search-result__frame--has-image'
                          : 'search-result__frame search-result__frame--placeholder'
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
                          className="search-result__image"
                          src={project.hero}
                          alt=""
                        />
                      ) : (
                        <HouseIcon className="search-result__placeholder-icon" />
                      )}
                    </div>
                    <div className="search-result__body">
                      <span className="search-result__index">
                        {project.index}
                      </span>
                      <h3>{project.title}</h3>
                      <p className="search-result__meta">
                        {[project.year, project.type].filter(Boolean).join(' · ')}
                      </p>
                      {project.details.description ? (
                        <p className="search-result__desc">
                          {project.details.description}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
