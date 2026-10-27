import type { Project } from '../i18n/types'

export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim()
}

const COUNTRY_ALIASES: Record<string, Project['period']> = {
  // Romania
  ro: 'a',
  romania: 'a',
  // USA / SUA
  us: 'b',
  usa: 'b',
  sua: 'b',
  america: 'b',
  american: 'b',
  unitedstates: 'b',
  unitedstatesofamerica: 'b',
  stateleunite: 'b',
  stateleunitealeamericii: 'b',
}

function countryAliasKey(value: string): string {
  return normalizeSearchText(value).replace(/[^a-z0-9]+/g, '')
}

function periodForCountryQuery(normalizedQuery: string): Project['period'] | null {
  return COUNTRY_ALIASES[countryAliasKey(normalizedQuery)] ?? null
}

function fieldBlob(project: Project): string {
  const { details } = project
  return [
    project.title,
    project.year,
    project.type,
    details.category,
    details.beneficiary,
    details.collaborator,
    details.authYear,
    details.addressArchive,
    details.addressCurrent,
  ]
    .filter(Boolean)
    .join(' ')
}

type RankedProject = {
  project: Project
  score: number
}

export function searchProjects(projects: Project[], query: string): Project[] {
  const normalizedQuery = normalizeSearchText(query)
  if (!normalizedQuery) return []

  const countryPeriod = periodForCountryQuery(normalizedQuery)
  if (countryPeriod) {
    return projects
      .filter((project) => project.period === countryPeriod)
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title))
  }

  const ranked: RankedProject[] = []

  for (const project of projects) {
    const title = normalizeSearchText(project.title)
    const blob = normalizeSearchText(fieldBlob(project))

    let score = 0
    if (title.startsWith(normalizedQuery)) score = 3
    else if (title.includes(normalizedQuery)) score = 2
    else if (blob.includes(normalizedQuery)) score = 1
    else continue

    ranked.push({ project, score })
  }

  ranked.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return a.project.title.localeCompare(b.project.title)
  })

  return ranked.map((item) => item.project)
}
