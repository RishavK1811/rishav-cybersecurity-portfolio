# Rishav Kumar — Portfolio Profile & Verification Checklist

This document is your local review guide for maintaining an authentic, verified cybersecurity portfolio. Everything currently displayed on the website has been verified from your public records or clearly marked as in-progress/draft.

---

## 1. Verified & Publicly Live Data

The following profile details are active in `src/data/portfolio.ts`:
- **Identity & Education**: Rishav Kumar (`RK`), BCA Student (2025–2028), CIMAGE Group of Institutions, Patna.
- **Focus**: Defensive Security, Aspiring SOC Analyst, Python tooling, Linux & Network fundamentals.
- **Social & Profile Links**:
  - GitHub: [https://github.com/RishavK1811](https://github.com/RishavK1811)
  - LinkedIn: [https://www.linkedin.com/in/rishav-kumar-317134368/](https://www.linkedin.com/in/rishav-kumar-317134368/)
- **Live Featured Project**:
  - `Password Security Checker`: Verified Python 3 CLI repository ([RishavK1811/Password-Security-Checker](https://github.com/RishavK1811/Password-Security-Checker)) with rule breakdown and explicit v1 limitations (no entropy / breach checking).

---

## 2. Credentials Verification Checklist

### A. Completed & Displayed (Awaiting Verification Links)
These completed credentials are listed on your profile without external verification URLs to prevent broken links:
- [ ] **TryHackMe — Pre Security Certificate** (Completed: May 2026)
  - *Action*: Obtain your TryHackMe badge or certificate share URL from your TryHackMe profile, then add `url: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/...'` to the `certifications` array in `src/data/portfolio.ts`.
- [ ] **upEducators — AI Masterclass: Google for Education AI Implementation Program 2026** (Completed: April 2026)
  - *Action*: Obtain your certificate URL or verification link from upEducators, then add `url: '...'` to `src/data/portfolio.ts`.

### B. Unconfirmed / In-Progress Credentials (Pending Evidence Before Publishing)
The following credentials were identified during profile review but are **not yet published** on the live website because official completion links or certificates were not present in the workspace:
- [ ] **Google Cybersecurity Professional Certificate** (Coursera)
  - *Note*: Currently, only Course 1 (*Foundations of Cybersecurity*, Credential ID: `N5VCSYWNT9ED`) is verified and published.
  - *Action*: When all 8 courses are finished, update the certificate title in `src/data/portfolio.ts` to `Google Cybersecurity Professional Certificate` and update the verification URL.
- [ ] **Cisco — Introduction to Cybersecurity** (Networking Academy / Skills for All)
  - *Action*: Locate your Cisco NetAcad badge/certificate link via Credly or Cisco Networking Academy, verify date, and add to `certifications` in `src/data/portfolio.ts`.
- [ ] **CLLMSP — Certified LLM Security Practitioner** (Red Team Leaders)
  - *Note*: An assessment score of **82%** was recorded. This indicates an assessment test score, not certification validity or expiration.
  - *Action*: When your official certificate credential ID or verification link is issued, add it to `certifications` with `status: 'completed'`.
- [ ] **Google Cloud AI / Gemini Training Programs**
  - *Action*: When completing Google Cloud Skill Boost quests or badges, add the direct Cloud Skills Boost public profile URL or individual badge link.

---

## 3. Contact & Resume Placeholders

To maintain privacy and prevent broken downloads, these fields remain unconfigured by default:
- [ ] **Email Address (`email`)**:
  - Located in `src/data/portfolio.ts` -> `profile.email`.
  - Add your active contact address (e.g. `rishav@example.com`) to enable the email button in the hero and contact sections.
- [ ] **Resume File (`resumePath`)**:
  - Located in `src/data/portfolio.ts` -> `profile.resumePath`.
  - Place your sanitized resume PDF into the `public/` directory (e.g. `public/rishav-kumar-resume.pdf`).
  - Set `resumePath: '/rishav-kumar-resume.pdf'` to automatically enable the "Download CV / Resume" button in the hero.

---

## 4. GitHub Repositories Audit Summary

An audit of your GitHub account (`https://api.github.com/users/RishavK1811/repos`) identified 6 public repositories:
1. `Password-Security-Checker` (Python 3): **Featured as Completed Project (v1)**. Complete CLI utility with full 5-rule evaluation logic.
2. `Login-page-` (HTML/CSS): Web frontend interface mockups. Not featured as a security tool.
3. `RishavK1811`: Profile README repository (bio, badges, learning roadmap).
4. `RK-Portfolio`, `Portfolio-`, `Rishav-Kumar-Portfolio`: Earlier template experiments. Retained as reference archives.

---

## 5. Lab Draft Projects (Updating When Ready)

The portfolio includes three structured cybersecurity draft projects in `src/data/portfolio.ts`:
- `network-scanner` (`Network Scanner`)
- `security-log-analyzer` (`Security Log Analyzer`)
- `web-security-practice-lab` (`Web Security Practice Lab`)

These projects are clearly demarcated with `status: 'Draft — project details required'`. When you build or document your authorized lab work:
1. Update `summary`, `problem`, `objective`, `tools`, `implementation`, `testing`, `challenges`, and `limitations`.
2. Add your repository URL in `github`.
3. Change `status` from `Draft` to `Completed` or `Version 1`.
4. Run `npm run typecheck` and `npm run build` to confirm there are no syntax or formatting issues.
