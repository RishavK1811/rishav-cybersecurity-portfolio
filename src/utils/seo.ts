import { profile, type Project } from '../data/portfolio'

export const HOMEPAGE_SEO = {
  title: 'Rishav Kumar | Cybersecurity & Cloud Portfolio',
  description:
    'Cybersecurity student specializing in Network Packet Analysis, Static Security Analysis (SAST), and Google Cloud Platform.',
  ogTitle: 'Rishav Kumar | Cybersecurity Portfolio',
  ogDescription:
    'Explore my security projects, GCP challenge labs, and certifications.',
} as const

export const DEFAULT_PRODUCTION_URL = 'https://rishavkumarportfolio.vercel.app'

let cachedSiteUrl: string | null = null

export function getSiteUrl(): string {
  if (cachedSiteUrl !== null) {
    return cachedSiteUrl
  }

  if (typeof __APP_SITE_URL__ !== 'undefined' && __APP_SITE_URL__) {
    cachedSiteUrl = __APP_SITE_URL__.replace(/\/+$/, '')
    return cachedSiteUrl
  }

  if (import.meta.env.DEV && typeof window !== 'undefined' && window.location) {
    const base = import.meta.env.BASE_URL.replace(/\/+$/, '')
    cachedSiteUrl = `${window.location.origin}${base}`
    return cachedSiteUrl
  }

  cachedSiteUrl = DEFAULT_PRODUCTION_URL
  return cachedSiteUrl
}

export function updateCanonical(url: string | null): void {
  const existingLinks = document.querySelectorAll('link[rel="canonical"]')
  if (url) {
    if (existingLinks.length > 0) {
      existingLinks[0].setAttribute('href', url)
      for (let i = 1; i < existingLinks.length; i++) {
        existingLinks[i].remove()
      }
    } else {
      const link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      link.setAttribute('href', url)
      document.head.appendChild(link)
    }
  } else {
    existingLinks.forEach((el) => el.remove())
  }
}

export function updateMetaTag(
  selector: string,
  attributeName: string,
  attributeValue: string,
  content: string | null,
): void {
  const existing = document.querySelectorAll(selector)
  if (content !== null) {
    if (existing.length > 0) {
      existing[0].setAttribute('content', content)
      for (let i = 1; i < existing.length; i++) {
        existing[i].remove()
      }
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute(attributeName, attributeValue)
      meta.setAttribute('content', content)
      document.head.appendChild(meta)
    }
  } else {
    existing.forEach((el) => el.remove())
  }
}

export function updateRobots(noindex: boolean): void {
  if (noindex) {
    updateMetaTag('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow')
  } else {
    updateMetaTag('meta[name="robots"]', 'name', 'robots', null)
  }
}

export function setHomepageSeo(): void {
  const siteUrl = getSiteUrl()
  document.title = HOMEPAGE_SEO.title
  updateMetaTag('meta[name="description"]', 'name', 'description', HOMEPAGE_SEO.description)
  updateMetaTag('meta[property="og:title"]', 'property', 'og:title', HOMEPAGE_SEO.ogTitle)
  updateMetaTag('meta[property="og:description"]', 'property', 'og:description', HOMEPAGE_SEO.ogDescription)
  updateMetaTag('meta[property="og:image"]', 'property', 'og:image', `${siteUrl}/og-banner.svg`)
  updateMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', '1200')
  updateMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', '630')
  updateMetaTag('meta[property="og:image:type"]', 'property', 'og:image:type', 'image/svg+xml')
  updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
  updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', `${siteUrl}/og-banner.svg`)

  if (siteUrl) {
    const homeUrl = `${siteUrl}/`
    updateCanonical(homeUrl)
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', homeUrl)
  } else {
    updateCanonical(null)
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', null)
  }

  updateRobots(false)
}

export function setProjectSeo(project: Project | undefined): () => void {
  const siteUrl = getSiteUrl()

  if (project) {
    const projectTitle = `${project.title} — Case Study | ${profile.name} (${profile.shortName})`
    document.title = projectTitle
    updateMetaTag('meta[name="description"]', 'name', 'description', project.summary)
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', projectTitle)
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', project.summary)
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', `${siteUrl}/og-banner.svg`)
    updateMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', '1200')
    updateMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', '630')
    updateMetaTag('meta[property="og:image:type"]', 'property', 'og:image:type', 'image/svg+xml')
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', `${siteUrl}/og-banner.svg`)

    if (siteUrl) {
      const projectUrl = `${siteUrl}/projects/${project.slug}`
      updateCanonical(projectUrl)
      updateMetaTag('meta[property="og:url"]', 'property', 'og:url', projectUrl)
    } else {
      updateCanonical(null)
      updateMetaTag('meta[property="og:url"]', 'property', 'og:url', null)
    }

    updateRobots(false)
  } else {
    const notFoundTitle = `Case Study Not Found | ${profile.name} (${profile.shortName})`
    document.title = notFoundTitle
    updateMetaTag('meta[name="description"]', 'name', 'description', HOMEPAGE_SEO.description)
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', notFoundTitle)
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', null)
    updateCanonical(null)
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', null)
    updateRobots(true)
  }

  return () => {
    setHomepageSeo()
  }
}

export function setNotFoundSeo(): () => void {
  const notFoundTitle = `Page Not Found | ${profile.name} (${profile.shortName})`
  document.title = notFoundTitle
  updateMetaTag('meta[name="description"]', 'name', 'description', HOMEPAGE_SEO.description)
  updateMetaTag('meta[property="og:title"]', 'property', 'og:title', notFoundTitle)
  updateMetaTag('meta[property="og:description"]', 'property', 'og:description', null)
  updateCanonical(null)
  updateMetaTag('meta[property="og:url"]', 'property', 'og:url', null)
  updateRobots(true)

  return () => {
    setHomepageSeo()
  }
}
