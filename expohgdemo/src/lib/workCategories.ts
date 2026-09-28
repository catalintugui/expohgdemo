export const WORK_PERIOD_SLUGS = ['romania', 'usa'] as const

export type WorkPeriodSlug = (typeof WORK_PERIOD_SLUGS)[number]

export const WORK_CATEGORY_SLUGS = [
  'housing',
  'public-buildings',
  'exhibition-competitions',
  'design',
] as const

export type WorkCategorySlug = (typeof WORK_CATEGORY_SLUGS)[number]

export const WORK_CATEGORY_LABEL_KEYS: Record<
  WorkCategorySlug,
  'housing' | 'publicBuildings' | 'exhibitionCompetitions' | 'design'
> = {
  housing: 'housing',
  'public-buildings': 'publicBuildings',
  'exhibition-competitions': 'exhibitionCompetitions',
  design: 'design',
}

export const WORK_PERIODS = [
  { slug: 'romania' as const, period: 'a' as const, labelKey: 'workRomania' as const },
  { slug: 'usa' as const, period: 'b' as const, labelKey: 'workSua' as const },
]
