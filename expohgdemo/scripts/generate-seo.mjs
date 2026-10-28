#!/usr/bin/env node
/**
 * Post-build SEO: full sitemap + static HTML shells per route so crawlers
 * receive title/description/canonical and readable body content without JS.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const SITE_URL = process.env.VITE_SITE_URL || 'https://haralamb-georgescu.ro'
const TODAY = new Date().toISOString().slice(0, 10)

const PERIOD_SLUG = { a: 'romania', b: 'usa' }

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function absoluteUrl(pathname) {
  if (!pathname || pathname === '/') return `${SITE_URL}/`
  return `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}

function replaceMeta(html, { title, description, path: routePath, image }) {
  const url = absoluteUrl(routePath)
  const ogImage = image || `${SITE_URL}/og-poster.jpg`

  let next = html
  next = next.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
  next = next.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  )
  next = next.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${url}" />`,
  )
  next = next.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
  )
  next = next.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  )
  next = next.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${url}" />`,
  )
  next = next.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image" content="${escapeHtml(ogImage)}" />`,
  )
  next = next.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
  )
  next = next.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  )
  next = next.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`,
  )
  return next
}

function withEmptyRoot(html) {
  return html.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    '<div id="root"></div>',
  )
}

function injectRoot(html, bodyHtml) {
  return withEmptyRoot(html).replace(
    /<div id="root"><\/div>/,
    `<div id="root">${bodyHtml}</div>`,
  )
}

function seoShell({ heading, lead, paragraphs = [], links = [] }) {
  const paras = paragraphs
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join('')
  const nav = links
    .map(
      (link) =>
        `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`,
    )
    .join('')

  // Keep crawlable links/text in the initial HTML; hide visually to avoid a
  // flash before the React app replaces #root.
  return `
    <main class="seo-prerender" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0">
      <p><a href="/">Haralamb Georgescu — Arhiva Digitală</a></p>
      <h1>${escapeHtml(heading)}</h1>
      ${lead ? `<p><strong>${escapeHtml(lead)}</strong></p>` : ''}
      ${paras}
      ${nav ? `<ul>${nav}</ul>` : ''}
    </main>
  `
}

async function writeRouteHtml(template, route) {
  const filePath =
    route.path === '/'
      ? path.join(DIST, 'index.html')
      : path.join(DIST, route.path.replace(/^\//, ''), 'index.html')

  await mkdir(path.dirname(filePath), { recursive: true })

  let html = replaceMeta(template, route)
  html = injectRoot(html, route.body)
  await writeFile(filePath, html, 'utf8')
}

function projectPath(project) {
  const period = PERIOD_SLUG[project.period] || 'romania'
  return `/work/${period}/${project.category}/${project.slug}`
}

function buildSitemap(urls) {
  const entries = urls
    .map(
      (entry) => `  <url>
    <loc>${absoluteUrl(entry.path)}</loc>
    <lastmod>${entry.lastmod || TODAY}</lastmod>
    <changefreq>${entry.changefreq || 'monthly'}</changefreq>
    <priority>${entry.priority ?? '0.5'}</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`
}

async function main() {
  const templatePath = path.join(DIST, 'index.html')
  const roPath = path.join(ROOT, 'src/assets/ro.json')

  const [templateRaw, roRaw] = await Promise.all([
    readFile(templatePath, 'utf8'),
    readFile(roPath, 'utf8'),
  ])
  // Allow re-running after a previous SEO pass (root may already have content).
  const template = withEmptyRoot(templateRaw)
  const ro = JSON.parse(roRaw)

  const categoryLabels = {
    housing: ro.workCategories.housing,
    'public-buildings': ro.workCategories.publicBuildings,
    'exhibition-competitions': ro.workCategories.exhibitionCompetitions,
    design: ro.workCategories.design,
  }

  const workCategories = [
    'housing',
    'public-buildings',
    'exhibition-competitions',
    'design',
  ]
  const periods = [
    { slug: 'romania', label: ro.workPage.periodRomania },
    { slug: 'usa', label: ro.workPage.periodSua },
  ]

  const sharedLinks = [
    { href: '/about', label: ro.homePage.exploreAbout },
    { href: '/exhibition', label: ro.homePage.exploreExhibition },
    { href: '/work/romania/housing', label: `${ro.homePage.exploreWork} — România` },
    { href: '/work/usa/housing', label: `${ro.homePage.exploreWork} — SUA` },
  ]

  /** @type {Array<{path: string, title: string, description: string, body: string, image?: string, priority?: string, changefreq?: string}>} */
  const routes = []

  routes.push({
    path: '/',
    title: ro.meta.title,
    description: ro.meta.description,
    priority: '1.0',
    changefreq: 'weekly',
    body: seoShell({
      heading: 'Haralamb Georgescu — Arhiva Digitală',
      lead: ro.homePage.lead,
      paragraphs: ro.homePage.body,
      links: sharedLinks,
    }),
  })

  routes.push({
    path: '/about',
    title: `${ro.aboutPage.heading} — ${ro.architect.name}`,
    description: ro.aboutPage.lead,
    priority: '0.9',
    body: seoShell({
      heading: `${ro.aboutPage.heading} — ${ro.architect.name}`,
      lead: ro.aboutPage.lead,
      paragraphs: ro.aboutPage.intro,
      links: sharedLinks,
    }),
  })

  routes.push({
    path: '/exhibition',
    title: `${ro.exhibitionPage.heading} — ${ro.architect.name}`,
    description: ro.exhibitionPage.lead,
    priority: '0.9',
    body: seoShell({
      heading: `${ro.exhibitionPage.heading} — ${ro.architect.name}`,
      lead: ro.exhibitionPage.lead,
      paragraphs: ro.exhibition.statement,
      links: sharedLinks,
    }),
  })

  for (const period of periods) {
    for (const category of workCategories) {
      const pathName = `/work/${period.slug}/${category}`
      const categoryLabel = categoryLabels[category]
      routes.push({
        path: pathName,
        title: `${categoryLabel} — ${period.label} — ${ro.architect.name}`,
        description: `${ro.workPage.lead} ${period.label} · ${categoryLabel}.`,
        priority: '0.7',
        body: seoShell({
          heading: `${categoryLabel} — ${period.label}`,
          lead: ro.workPage.lead,
          paragraphs: [
            `Proiecte din categoria ${categoryLabel}, perioada ${period.label}, documentate în Arhiva Haralamb Georgescu.`,
          ],
          links: [
            ...sharedLinks,
            ...ro.projects
              .filter(
                (p) =>
                  PERIOD_SLUG[p.period] === period.slug && p.category === category,
              )
              .slice(0, 40)
              .map((p) => ({
                href: projectPath(p),
                label: p.title,
              })),
          ],
        }),
      })
    }
  }

  for (const project of ro.projects) {
    const pathName = projectPath(project)
    const description =
      (typeof project.details?.description === 'string' &&
        project.details.description.trim()) ||
      `${project.title}. ${ro.meta.description}`
    const firstImage = (project.images || []).find(Boolean)
    const image = firstImage
      ? firstImage.startsWith('http')
        ? firstImage
        : absoluteUrl(firstImage)
      : undefined

    routes.push({
      path: pathName,
      title: `${project.title} — ${ro.architect.name}`,
      description: description.slice(0, 300),
      image,
      priority: '0.6',
      body: seoShell({
        heading: project.title,
        lead: `Proiect de ${ro.architect.name}`,
        paragraphs: [
          typeof project.details?.description === 'string'
            ? project.details.description
            : '',
          typeof project.details?.addressCurrent === 'string'
            ? project.details.addressCurrent
            : '',
        ].filter(Boolean),
        links: [
          {
            href: `/work/${PERIOD_SLUG[project.period]}/${project.category}`,
            label: 'Înapoi la categorie',
          },
          ...sharedLinks,
        ],
      }),
    })
  }

  for (const route of routes) {
    await writeRouteHtml(template, route)
  }

  const sitemap = buildSitemap(
    routes.map((route) => ({
      path: route.path,
      priority: route.priority,
      changefreq: route.changefreq,
    })),
  )
  await writeFile(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8')
  // Keep public copy in sync for local reference / non-dist deploys
  await writeFile(path.join(ROOT, 'public/sitemap.xml'), sitemap, 'utf8')

  console.log(
    `✓ SEO: wrote ${routes.length} HTML shells + sitemap.xml (${SITE_URL})`,
  )
}

main().catch((error) => {
  console.error('✗ generate-seo failed:', error)
  process.exit(1)
})
