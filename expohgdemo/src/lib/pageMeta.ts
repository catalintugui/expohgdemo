import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME } from './site'

export type PageMetaInput = {
  title: string
  description: string
  path: string
  image?: string
  noIndex?: boolean
}

function ensureMeta(
  attr: 'name' | 'property',
  key: string,
  content: string,
) {
  const selector = `meta[${attr}="${key}"]`
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function ensureCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

export function applyPageMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageMetaInput) {
  const url = absoluteUrl(path)
  const robots = noIndex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large'

  document.title = title
  ensureCanonical(url)

  ensureMeta('name', 'description', description)
  ensureMeta('name', 'robots', robots)
  ensureMeta('name', 'googlebot', noIndex ? 'noindex, follow' : 'index, follow')

  ensureMeta('property', 'og:type', 'website')
  ensureMeta('property', 'og:site_name', SITE_NAME)
  ensureMeta('property', 'og:title', title)
  ensureMeta('property', 'og:description', description)
  ensureMeta('property', 'og:url', url)
  ensureMeta('property', 'og:image', image)

  ensureMeta('name', 'twitter:card', 'summary_large_image')
  ensureMeta('name', 'twitter:title', title)
  ensureMeta('name', 'twitter:description', description)
  ensureMeta('name', 'twitter:image', image)
}
