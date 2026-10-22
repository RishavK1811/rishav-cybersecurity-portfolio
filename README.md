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
npm run build
npm run preview
```

`npm run build` creates a deployable production site in `dist/`.

## Deployment

Deploy the contents of `dist/` to a static host such as Vercel, Netlify, GitHub Pages, or Cloudflare Pages. Configure your provider to rewrite unknown routes to `index.html` so direct visits to `/projects/<slug>` load the React app.

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
