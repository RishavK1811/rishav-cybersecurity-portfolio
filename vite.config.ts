import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

declare const process: { env: Record<string, string | undefined> }

function getSiteUrl(): string {
  const isGitHubPages = process.env.GITHUB_PAGES === 'true'
  const customSiteUrl = process.env.SITE_URL?.replace(/\/+$/, '')
  return customSiteUrl || (isGitHubPages ? 'https://rishavk1811.github.io/rishav-cybersecurity-portfolio' : '')
}

function seoPlugin(): Plugin {
  return {
    name: 'seo-plugin',
    transformIndexHtml(html) {
      const siteUrl = getSiteUrl()

      if (siteUrl) {
        const canonicalUrl = `${siteUrl}/`
        const canonicalMeta = `    <link rel="canonical" href="${canonicalUrl}" />\n    <meta property="og:url" content="${canonicalUrl}" />`
        return html.replace('<!-- CANONICAL_PLACEHOLDER -->', canonicalMeta)
      }
      return html.replace('<!-- CANONICAL_PLACEHOLDER -->', '')
    },
  }
}

export default defineConfig(() => {
  const isGitHubPages = process.env.GITHUB_PAGES === 'true'
  const siteUrl = getSiteUrl()

  return {
    base: isGitHubPages ? '/rishav-cybersecurity-portfolio/' : '/',
    plugins: [react(), tailwindcss(), seoPlugin()],
    define: {
      __APP_SITE_URL__: JSON.stringify(siteUrl),
    },
  }
})
