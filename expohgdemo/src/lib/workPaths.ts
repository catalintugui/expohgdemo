import type { WorkCategorySlug, WorkPeriodSlug } from './workCategories'

type WorkPeriod = 'a' | 'b'

const PERIOD_TO_SLUG: Record<WorkPeriod, WorkPeriodSlug> = {
  a: 'romania',
  b: 'usa',
}

export function workPath(periodSlug: WorkPeriodSlug, category: WorkCategorySlug) {
  return `/work/${periodSlug}/${category}`
}

export function projectPathForProject(project: {
  slug: string
  period: string
  category: string
}) {
  const periodSlug = PERIOD_TO_SLUG[project.period as WorkPeriod] ?? 'romania'
  const category = project.category as WorkCategorySlug
  return `${workPath(periodSlug, category)}/${project.slug}`
}

export function workPathForPeriod(period: string, category?: WorkCategorySlug) {
  const periodSlug = PERIOD_TO_SLUG[period as WorkPeriod] ?? 'romania'
  return category ? workPath(periodSlug, category) : `/work/${periodSlug}`
}

export function workPathForProject(project: {
  period: string
  category: string
}) {
  const periodSlug = PERIOD_TO_SLUG[project.period as WorkPeriod] ?? 'romania'
  const category = project.category as WorkCategorySlug
  return workPath(periodSlug, category)
}
