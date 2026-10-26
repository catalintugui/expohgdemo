import type { WorkCategorySlug } from './workCategories'

export type WorkSectionKey =
  | 'single-family'
  | 'semi-collective'
  | 'collective'
  | 'temporary'
  | 'cultural-centers'
  | 'commercial-centers'
  | 'health-centers'
  | 'elderly-centers'
  | 'office-buildings'
  | 'churches'
  | 'sports-recreation'
  | 'interiors'
  | 'exteriors'

export const WORK_SECTION_LABEL_KEYS: Record<
  WorkSectionKey,
  | 'singleFamily'
  | 'semiCollective'
  | 'collective'
  | 'temporary'
  | 'culturalCenters'
  | 'commercialCenters'
  | 'healthCenters'
  | 'elderlyCenters'
  | 'officeBuildings'
  | 'churches'
  | 'sportsRecreation'
  | 'interiors'
  | 'exteriors'
> = {
  'single-family': 'singleFamily',
  'semi-collective': 'semiCollective',
  collective: 'collective',
  temporary: 'temporary',
  'cultural-centers': 'culturalCenters',
  'commercial-centers': 'commercialCenters',
  'health-centers': 'healthCenters',
  'elderly-centers': 'elderlyCenters',
  'office-buildings': 'officeBuildings',
  churches: 'churches',
  'sports-recreation': 'sportsRecreation',
  interiors: 'interiors',
  exteriors: 'exteriors',
}

/** Display order of sections within each work category. */
export const WORK_SECTIONS_BY_CATEGORY: Record<WorkCategorySlug, WorkSectionKey[]> = {
  housing: ['single-family', 'semi-collective', 'collective', 'temporary'],
  'public-buildings': [
    'cultural-centers',
    'commercial-centers',
    'health-centers',
    'elderly-centers',
    'office-buildings',
    'churches',
    'sports-recreation',
  ],
  'exhibition-competitions': [],
  design: ['interiors', 'exteriors'],
}

export function isWorkSectionKey(value: string): value is WorkSectionKey {
  return value in WORK_SECTION_LABEL_KEYS
}
