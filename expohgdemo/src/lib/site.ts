export const SITE_URL = 'https://haralamb-georgescu.ro'
export const SITE_NAME = 'Arhiva Digitală Haralamb Georgescu'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-poster.jpg`

export function absoluteUrl(path: string) {
  if (!path || path === '/') return `${SITE_URL}/`
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}
