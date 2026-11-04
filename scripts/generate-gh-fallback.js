import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const indexHtmlPath = path.join(distDir, 'index.html')
const fallbackPath = path.join(distDir, '404.html')
const sitemapPath = path.join(distDir, 'sitemap.xml')
const robotsPath = path.join(distDir, 'robots.txt')

const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const customSiteUrl = process.env.SITE_URL?.replace(/\/+$/, '')
const siteUrl = customSiteUrl || (isGitHubPages ? 'https://rishavk1811.github.io/rishav-cybersecurity-portfolio' : '')

// 1. GitHub Pages 404 Fallback for client-side deep routing
if (isGitHubPages) {
  if (fs.existsSync(indexHtmlPath)) {
    fs.copyFileSync(indexHtmlPath, fallbackPath)
    console.log('✓ Generated dist/404.html from dist/index.html for GitHub Pages deep routing')
  } else {
    console.warn('⚠ dist/index.html not found, unable to generate dist/404.html')
  }
} else {
  if (fs.existsSync(fallbackPath)) {
    fs.unlinkSync(fallbackPath)
  }
}

// 2. Discover published projects from portfolio.ts (excluding drafts and blueprint placeholders)
function getPublishedProjectSlugs() {
  const portfolioTsPath = path.resolve(__dirname, '../src/data/portfolio.ts')
  const content = fs.readFileSync(portfolioTsPath, 'utf8')
  const blocks = content.split(/\{\s*slug:\s*'/).slice(1)
  const published = []
  for (const block of blocks) {
    const slug = block.split("'")[0]
    const statusMatch = block.match(/status:\s*'([^']+)'/)
    const status = statusMatch ? statusMatch[1].toLowerCase() : ''
    const isDraft =
      status.includes('draft') ||
      status.includes('placeholder') ||
      status.includes('required') ||
      status.includes('in-progress') ||
      status.includes('tbd')
    if (!isDraft) {
      published.push(slug)
    }
  }
  return published
}

const publishedSlugs = getPublishedProjectSlugs()

// 3. Deployment-aware Sitemap and Robots.txt
if (siteUrl) {
  const projectUrlsXml = publishedSlugs
    .map(
      (slug) => `  <url>
    <loc>${siteUrl}/projects/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('\n')

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
${projectUrlsXml}
</urlset>
`
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8')

  const robotsContent = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
  fs.writeFileSync(robotsPath, robotsContent, 'utf8')
  console.log(`✓ Configured dist/sitemap.xml and dist/robots.txt with canonical domain: ${siteUrl}`)
  console.log(`  Published sitemap routes: / and ${publishedSlugs.map((s) => `/projects/${s}`).join(', ')}`)
} else {
  // Root build without explicit SITE_URL: do not fabricate domain or misdirect to GitHub Pages subpath
  const robotsContent = `User-agent: *
Allow: /
`
  fs.writeFileSync(robotsPath, robotsContent, 'utf8')
  if (fs.existsSync(sitemapPath)) {
    fs.unlinkSync(sitemapPath)
  }
  console.log('ℹ Root production build: robots.txt configured. (Supply SITE_URL=<url> to generate domain-specific sitemap.xml)')
}
