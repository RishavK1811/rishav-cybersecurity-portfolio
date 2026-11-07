# Rishav Kumar — Cybersecurity Portfolio

[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, high-performance cybersecurity and defensive systems portfolio engineered for **Rishav Kumar** — BCA Student (2025–2028) at CIMAGE Group of Institutions, Patna, specializing in defensive security, SOC analysis, Python security automation, and network defense.

---

## Overview

This portfolio showcases verified cybersecurity projects, practical security automation tools, academic coursework, and CTF/lab milestones. Built with an attacker-informed defensive mindset, it couples modern engineering standards with an editorial terminal-inspired cyber aesthetic.

- **GitHub Profile**: [github.com/RishavK1811](https://github.com/RishavK1811)
- **LinkedIn Profile**: [linkedin.com/in/rishav-kumar-317134368](https://www.linkedin.com/in/rishav-kumar-317134368/)

---

## Key Features

- **🌐 3D Interactive Globe**: High-fidelity WebGL Earth rendering built with Three.js, visualising global threat telemetry and network nodes with smooth camera interactions.
- **💻 Terminal Cyber Aesthetic**: Precision-crafted UI featuring glassmorphic overlays, DM Mono diagnostics, neon status indicators, and responsive command-line motifs.
- **📬 Zero-Backend Contact Form**: Fully serverless contact pipeline powered by Web3Forms AJAX API. Submissions route directly to personal Gmail inbox with honeypot botcheck anti-spam traps and terminal packet transmission feedback (`idle`, `submitting`, `success`, `error`).
- **📱 Fully Responsive & Accessible**: WCAG AA compliant with keyboard skip-navigation, semantic HTML5 landmarks, ARIA live regions for transmission alerts, and fluid mobile breakpoints.
- **🔍 SEO & Social Ready**: Dynamic OpenGraph tags, Twitter cards, JSON-LD structured schemas (`Person`, `WebSite`), and deployment-aware `sitemap.xml` / `robots.txt` generation.

---

## Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Core** | React 19, TypeScript, Vite |
| **Styling & UI** | Tailwind CSS v4, Custom CSS Tokens, DM Mono & Manrope |
| **Icons & Media** | Lucide React |
| **3D Visualization** | Three.js WebGL Textures |
| **Routing** | React Router v7 with Deep-Route History Restoration |
| **Services** | Web3Forms AJAX Endpoint (Serverless Email Routing) |

---

## Local Setup & Development

### 1. Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### 2. Clone the Repository
```bash
git clone https://github.com/RishavK1811/rishav-cybersecurity-portfolio.git
cd rishav-cybersecurity-portfolio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy the example environment file and add your Web3Forms access key:
```bash
cp .env.example .env
```
Edit `.env`:
```env
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
```
*(You can obtain a free access key at [web3forms.com](https://web3forms.com).)*

### 5. Launch Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## Verification & Build Commands

- **Type Check**: Validate TypeScript types across all modules:
  ```bash
  npm run typecheck
  ```
- **Production Build (Root Domain)**: Builds optimized production assets in `dist/`:
  ```bash
  npm run build
  ```
- **Preview Production Build**:
  ```bash
  npm run preview
  ```
- **GitHub Pages Build**: Builds assets tailored for GitHub Pages repository subpaths and generates `dist/404.html` for client-side deep routing:
  ```bash
  npm run build:gh-pages
  ```

---

## Deployment Guide

### Option 1: Vercel (Recommended)
1. Push your repository to GitHub.
2. Import the project into the [Vercel Dashboard](https://vercel.com/dashboard).
3. Framework Preset: **Vite**.
4. Build Command: `npm run build` | Output Directory: `dist`.
5. Under **Settings > Environment Variables**, add:
   - **Key**: `VITE_WEB3FORMS_ACCESS_KEY`
   - **Value**: Your Web3Forms access key.
6. Click **Deploy**.

### Option 2: GitHub Pages
1. In `package.json`, the `build:gh-pages` script is preconfigured with `GITHUB_PAGES=true`.
2. Push your changes to the `main` branch.
3. In GitHub Repository **Settings > Pages**, set the deployment source to **GitHub Actions**.
4. The build pipeline runs `scripts/generate-gh-fallback.js` automatically to generate `dist/404.html` for seamless SPA deep links.

---

## Project Structure

```text
├── public/                 # Static public assets, resume & sitemap
│   ├── favicon.svg         # SVG favicon
│   ├── resume.pdf          # Curated resume CV
│   ├── robots.txt          # Crawler instructions
│   └── sitemap.xml         # Search index sitemap
├── scripts/                # Build-time automated scripts
│   └── generate-gh-fallback.js # SPA routing fallback & sitemap generator
├── src/
│   ├── components/         # Reusable UI sections (Hero, Projects, Contact, etc.)
│   ├── data/               # Centralized portfolio data & metadata
│   ├── hooks/              # Custom React hooks (useReveal, etc.)
│   ├── pages/              # Home, ProjectDetail & NotFound views
│   ├── utils/              # SEO management & site metadata helpers
│   ├── App.tsx             # Root application shell & routing
│   ├── index.css           # Tailwind CSS imports & cyber design tokens
│   └── main.tsx            # React application entry point
├── .env.example            # Environment variable template
├── index.html              # HTML shell with OpenGraph & JSON-LD schemas
└── vite.config.ts          # Vite build & plugin configuration
```

---

## License & Attribution

Designed and maintained by **Rishav Kumar**. Released under the [MIT License](LICENSE).
