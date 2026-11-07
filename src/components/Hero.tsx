import {
  ArrowDownRight,
  Briefcase,
  Check,
  Code2,
  Compass,
  ContactRound,
  Copy,
  FileDown,
  FileText,
  GraduationCap,
  Mail,
  ShieldCheck,
  Terminal as TerminalIcon,
  type LucideIcon,
} from 'lucide-react'
import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { configuredProfileLinks, profile, type ProfileLink } from '../data/portfolio'
import { Terminal } from './Terminal'

export function Hero() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const socialIcons: Record<ProfileLink['kind'], LucideIcon> = {
    github: Code2,
    linkedin: ContactRound,
    email: Mail,
  }
  const socialLinks = configuredProfileLinks()

  const handleCopyEmail = async () => {
    if (!profile.email) return
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2200)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = profile.email
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2200)
    }
  }

  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-content-grid grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-10 items-center">
        {/* Left Column: Headline, Bio & Primary CTAs */}
        <div className="hero-main xl:col-span-7 flex flex-col justify-center">
          {/* Eyebrow & Live Security Status Badge */}
          <div className="hero-eyebrow-row flex flex-wrap items-center gap-3 mb-4">
            <span className="eyebrow">{profile.portfolioPeriod}</span>
            <div
              className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-full w-fit shadow-sm"
              role="status"
              aria-label="Available for Internships & Entry-Level SOC / Blue Team Roles"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                Available for Internships &amp; Entry-Level SOC / Blue Team Roles
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

          {/* Recruiter Quick-Scan Strip */}
          <div className="recruiter-quick-strip bg-slate-900/75 border border-cyan-500/30 rounded-lg p-3 sm:p-3.5 my-3.5 backdrop-blur-md shadow-md shadow-black/30">
            <div className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-slate-800">
              <span className="text-[10.5px] font-mono font-bold tracking-wider text-cyan-400 flex items-center gap-1.5 uppercase">
                <Briefcase size={12} className="text-cyan-400" aria-hidden="true" />
                Recruiter Quick-Scan Strip
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                READY FOR HIRE
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="bg-slate-950/70 border border-slate-800/80 rounded p-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
                  Target Roles
                </span>
                <span className="text-slate-100 font-semibold block leading-tight">
                  SOC Analyst L1 · Junior Cybersecurity Analyst · Blue Team
                </span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800/80 rounded p-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
                  Education
                </span>
                <span className="text-slate-100 font-semibold block leading-tight">
                  BCA (Cybersecurity Focus) · CIMAGE Patna (2025–2028)
                </span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800/80 rounded p-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
                  Key Credentials
                </span>
                <span className="text-slate-100 font-semibold block leading-tight">
                  Google Cybersecurity · CLLMSP (82%) · Pre Security
                </span>
              </div>
            </div>
          </div>

          {/* HR-Friendly Recruiter TL;DR Card */}
          <div className="hero-tldr-card bg-slate-900/60 backdrop-blur-md border border-cyan-500/25 rounded-lg p-3.5 my-3 shadow-lg shadow-black/40">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-800/80">
              <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-400 flex items-center gap-1.5 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
                Executive Summary · Candidate Highlights
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
          <div className="hero-footer-row flex flex-wrap items-center gap-4 mt-5">
            <div className="hero-actions flex flex-wrap items-center gap-3">
              <Link className="button" to="#projects">
                Explore Projects <ArrowDownRight aria-hidden="true" size={18} />
              </Link>
              <div className="inline-flex items-center rounded border border-cyan-500/40 bg-slate-900/80 shadow-sm overflow-hidden">
                <a
                  className="btn-cyan-glow flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Rishav Kumar's Cybersecurity Resume in new browser tab"
                >
                  <FileText aria-hidden="true" size={15} />
                  <span>View Resume ↗</span>
                </a>
                <a
                  className="px-2.5 py-2 text-slate-400 hover:text-cyan-300 border-l border-slate-800 hover:bg-cyan-500/10 transition-colors"
                  href="/resume.pdf"
                  download="Rishav_Kumar_Cybersecurity_Resume.pdf"
                  aria-label="Download PDF Resume file"
                  title="Download Resume PDF"
                >
                  <FileDown aria-hidden="true" size={15} />
                </a>
              </div>
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

          {/* Official Email Strip with 1-Click Copy */}
          {profile.email && (
            <div className="hero-email-strip flex flex-wrap items-center gap-2 mt-4 pt-3.5 border-t border-slate-800/70">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Direct Contact:
              </span>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-xs font-mono shadow-sm">
                <Mail size={13} className="text-cyan-400 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${profile.email}`}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold"
                  aria-label={`Send direct email to ${profile.email}`}
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/60 transition-all font-mono"
                  aria-label="Copy email address to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={11} className="text-emerald-400" aria-hidden="true" />
                      <span className="text-emerald-400 font-semibold">[ Copied! ]</span>
                    </>
                  ) : (
                    <>
                      <Copy size={11} aria-hidden="true" />
                      <span>[ Copy Email ]</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Mini Interactive Cyber Terminal */}
        <div className="hero-terminal-column xl:col-span-5 w-full flex justify-center">
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
