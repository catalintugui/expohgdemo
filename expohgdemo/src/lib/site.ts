export const SITE_URL = 'https://haralamb-georgescu.ro'
export const SITE_NAME = 'Arhiva Digitală Haralamb Georgescu'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-poster.jpg`

export function absoluteUrl(path: string) {
  if (!path || path === '/') return `${SITE_URL}/`
  let normalized = path.startsWith('/') ? path : `/${path}`
  // Live host 301s page URLs to a trailing slash; keep sitemap/canonicals final.
  const isFile = /\.[a-z0-9]+$/i.test(normalized)
  if (!isFile && !normalized.endsWith('/')) normalized += '/'
  return `${SITE_URL}${normalized}`
}
