import type { WorkCategorySlug, WorkPeriodSlug } from './workCategories'

export function workPath(periodSlug: WorkPeriodSlug, category: WorkCategorySlug) {
  return `/work/${periodSlug}/${category}`
}
