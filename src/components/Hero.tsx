import {
  ArrowDownRight,
  Code2,
  Compass,
  ContactRound,
  FileDown,
  GraduationCap,
  Mail,
  ShieldCheck,
  Terminal as TerminalIcon,
  type LucideIcon,
} from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { configuredProfileLinks, profile, type ProfileLink } from '../data/portfolio'
import { Terminal } from './Terminal'

export function Hero() {
  const socialIcons: Record<ProfileLink['kind'], LucideIcon> = {
    github: Code2,
    linkedin: ContactRound,
    email: Mail,
  }
  const socialLinks = configuredProfileLinks()

  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-content-grid grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Headline, Bio & Primary CTAs */}
        <div className="hero-main lg:col-span-7 flex flex-col justify-center">
          {/* Eyebrow & Live Security Status Badge */}
          <div className="hero-eyebrow-row flex flex-wrap items-center gap-3 mb-4">
            <span className="eyebrow">{profile.portfolioPeriod}</span>
            <div
              className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-full w-fit shadow-sm"
              role="status"
              aria-label="Status: Online // SOC Mode"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                STATUS: ONLINE // SOC MODE
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 id="hero-title" className="hero-title">
            Building secure <br className="hero-break" />digital systems.
          </h1>

          {/* Identity & Role Subtitle */}
          <div className="hero-identity-row">
            <span className="hero-name">{profile.name}</span>
            <span className="hero-identity-sep" aria-hidden="true">—</span>
            <span className="hero-role-text">{profile.role}</span>
          </div>

          {/* Intro Paragraph */}
          <p className="hero-intro">{profile.intro}</p>

          {/* HR-Friendly Recruiter TL;DR Card */}
          <div className="hero-tldr-card bg-slate-900/60 backdrop-blur-md border border-cyan-500/25 rounded-lg p-3.5 my-5 shadow-lg shadow-black/40">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-800/80">
              <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-400 flex items-center gap-1.5 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
                Executive Summary // Recruiter TL;DR
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                3-SEC SCAN
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono font-bold select-none">&gt;</span>
                <span><strong className="text-slate-100">Academic Background:</strong> BCA Student at CIMAGE Patna (2025–2028), building verifiable foundations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono font-bold select-none">&gt;</span>
                <span><strong className="text-slate-100">Industry Credentials:</strong> Certified LLM Security Professional (CLLMSP) &amp; Google Cybersecurity Specialization.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono font-bold select-none">&gt;</span>
                <span><strong className="text-slate-100">Core Focus:</strong> Defensive Security, SOC Analysis, SIEM Log Auditing, and Python Security Automation.</span>
              </li>
            </ul>
          </div>

          {/* CTAs & Social Links */}
          <div className="hero-footer-row flex flex-wrap items-center gap-4 mt-6">
            <div className="hero-actions flex flex-wrap items-center gap-3">
              <Link className="button" to="#projects">
                Explore Projects <ArrowDownRight aria-hidden="true" size={18} />
              </Link>
              <a
                className="btn-cyan-glow"
                href="/resume.pdf"
                download="Rishav_Kumar_Cybersecurity_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Rishav Kumar's Cybersecurity Resume"
              >
                <FileDown aria-hidden="true" size={15} />
                <span>[ Download CV ]</span>
              </a>
              <Link className="button button-quiet" to="#contact">
                Contact <Mail aria-hidden="true" size={16} />
              </Link>
            </div>

            {socialLinks.length > 0 && (
              <div className="social-row flex items-center gap-2" aria-label="Social links">
                {socialLinks.map(({ label, url, kind, opensInNewTab }) => {
                  const Icon = socialIcons[kind]
                  return (
                    <a
                      key={label}
                      href={url}
                      target={opensInNewTab ? '_blank' : undefined}
                      rel={opensInNewTab ? 'noreferrer' : undefined}
                      aria-label={label}
                    >
                      <Icon aria-hidden="true" size={18} />
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Mini Interactive Cyber Terminal */}
        <div className="hero-terminal-column lg:col-span-5 w-full flex justify-center">
          <Terminal />
        </div>
      </div>

      {/* Technical Overview Ledger (Telemetry Cards) */}
      <div className="hero-ledger" aria-label="Technical profile overview">
        <div className="hero-ledger-card" style={{ '--stagger-index': 0 } as CSSProperties}>
          <div className="hero-ledger-header">
            <GraduationCap size={15} className="hero-ledger-icon" aria-hidden="true" />
            <span className="hero-ledger-label">Academic Track</span>
          </div>
          <div className="hero-ledger-value">{profile.academicStatus} ({profile.educationPeriod})</div>
          <div className="hero-ledger-meta">{profile.institution}</div>
        </div>

        <div className="hero-ledger-card" style={{ '--stagger-index': 1 } as CSSProperties}>
          <div className="hero-ledger-header">
            <ShieldCheck size={15} className="hero-ledger-icon" aria-hidden="true" />
            <span className="hero-ledger-label">Primary Discipline</span>
          </div>
          <div className="hero-ledger-value">Defensive Security &amp; SOC</div>
          <div className="hero-ledger-meta">Blue teaming, protocol analysis &amp; triage</div>
        </div>

        <div className="hero-ledger-card" style={{ '--stagger-index': 2 } as CSSProperties}>
          <div className="hero-ledger-header">
            <TerminalIcon size={15} className="hero-ledger-icon" aria-hidden="true" />
            <span className="hero-ledger-label">Core Tooling</span>
          </div>
          <div className="hero-ledger-value">Python · Linux CLI · SQL</div>
          <div className="hero-ledger-meta">Automation, log parsing &amp; shell scripts</div>
        </div>

        <div className="hero-ledger-card" style={{ '--stagger-index': 3 } as CSSProperties}>
          <div className="hero-ledger-header">
            <Compass size={15} className="hero-ledger-icon" aria-hidden="true" />
            <span className="hero-ledger-label">Hands-On Practice</span>
          </div>
          <div className="hero-ledger-value">TryHackMe &amp; CTF Labs</div>
          <div className="hero-ledger-meta">Network packet capture &amp; security audits</div>
        </div>
      </div>
    </section>
  )
}
