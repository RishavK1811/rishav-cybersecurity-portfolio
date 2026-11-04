# Rishav — Cybersecurity Portfolio

A dark, editorial React portfolio for a BCA student building a credible cybersecurity-focused body of work. It intentionally avoids invented projects, credentials, results, social profiles, and contact information.

## Stack

- React + TypeScript + Vite
- React Router for project case-study pages
- Lucide React icons
- Custom CSS design tokens and responsive layouts

## Run locally

```bash
npm install
npm run dev
```

Open the local address printed by Vite (normally `http://localhost:5173`).

## Validate and build

```bash
npm run typecheck
```

### 1. Root-Domain Production Build (Vercel, Netlify, Custom Domain)

```bash
npm run build
npm run preview
```

Generates production assets with root-relative base path (`/`) in `dist/`.

### 2. GitHub Pages Production Build

```bash
npm run build:gh-pages
# or: GITHUB_PAGES=true npm run build
```

Generates production assets configured for the repository subpath (`/rishav-cybersecurity-portfolio/`) and creates `dist/404.html` for client-side deep routing.

## Deployment & Routing

- **Base Path Behavior**: GitHub Pages project sites are served from a subpath (`/<repo-name>/`), whereas platforms like Vercel or Netlify host directly from the domain root (`/`). Vite evaluates `process.env.GITHUB_PAGES === 'true'` to set `base: '/rishav-cybersecurity-portfolio/'` for GitHub Pages and `base: '/'` for root hosting.
- **GitHub Pages Deep-Route Fallback**: GitHub Pages does not support native SPA URL rewrites. To support direct links and browser refreshes on routes like `/projects/password-security-checker`, the GitHub Pages build script (`scripts/generate-gh-fallback.js`) copies the processed `dist/index.html` into `dist/404.html`. GitHub Pages serves `404.html` on unmatched routes while preserving the full URL pathname, allowing React Router (`<BrowserRouter basename={import.meta.env.BASE_URL}>`) to mount and resolve the correct project view.
- **Root Hosting (Vercel / Netlify / Cloudflare Pages)**: Deploy using standard `npm run build` and configure your provider's standard SPA rewrite rule (e.g., `/* -> /index.html 200`).

## Customize before publishing

Open [EDIT_ME.md](./EDIT_ME.md) and edit the central configuration in `src/data/portfolio.ts`. The site hides social and resume links until real destinations are provided. Draft projects and empty skill categories are deliberately visible as reminders to add verified information.

## Project structure

```text
src/
  components/       Reusable page sections and navigation
  data/             Personal profile, skills, projects, timeline, credentials
  pages/            Home, project case studies, and fallback page
  App.tsx           Routes and shared shell
  index.css         Design tokens, visual system, responsive styling
```

## Responsible portfolio note

Only document authorized security work. For every project, clearly describe its scope, testing conditions, limitations, and real outcomes. Do not claim tools, certifications, or findings you cannot support in an interview.
