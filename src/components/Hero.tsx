import {
  ArrowDownRight,
  Code2,
  Compass,
  ContactRound,
  FileDown,
  GraduationCap,
  Mail,
  ShieldCheck,
  Terminal,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { configuredProfileLinks, profile, type ProfileLink } from '../data/portfolio'

export function Hero() {
  const socialIcons: Record<ProfileLink['kind'], LucideIcon> = {
    github: Code2,
    linkedin: ContactRound,
    email: Mail,
  }
  const socialLinks = configuredProfileLinks()

  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-main">
        {/* Eyebrow & Status Row */}
        <div className="hero-eyebrow-row">
          <span className="eyebrow">{profile.portfolioPeriod}</span>
          {profile.statusMessage && (
            <span className="hero-status-pill">
              <span className="hero-status-dot" aria-hidden="true" />
              <span>{profile.statusMessage}</span>
            </span>
          )}
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

        {/* CTAs & Social Links */}
        <div className="hero-footer-row">
          <div className="hero-actions flex flex-wrap items-center gap-3">
            <Link className="button" to="#projects">
              Explore Projects <ArrowDownRight aria-hidden="true" size={18} />
            </Link>
            {profile.resumePath && (
              <a className="button button-quiet" href={profile.resumePath} download>
                Download Resume <FileDown aria-hidden="true" size={17} />
              </a>
            )}
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

      {/* Technical Overview Ledger (Telemetry Cards) */}
      <div className="hero-ledger" aria-label="Technical profile overview">
        <div className="hero-ledger-card">
          <div className="hero-ledger-header">
            <GraduationCap size={15} className="hero-ledger-icon" aria-hidden="true" />
            <span className="hero-ledger-label">Academic Track</span>
          </div>
          <div className="hero-ledger-value">{profile.academicStatus} ({profile.educationPeriod})</div>
          <div className="hero-ledger-meta">{profile.institution}</div>
        </div>

        <div className="hero-ledger-card">
          <div className="hero-ledger-header">
            <ShieldCheck size={15} className="hero-ledger-icon" aria-hidden="true" />
            <span className="hero-ledger-label">Primary Discipline</span>
          </div>
          <div className="hero-ledger-value">Defensive Security &amp; SOC</div>
          <div className="hero-ledger-meta">Blue teaming, protocol analysis &amp; triage</div>
        </div>

        <div className="hero-ledger-card">
          <div className="hero-ledger-header">
            <Terminal size={15} className="hero-ledger-icon" aria-hidden="true" />
            <span className="hero-ledger-label">Core Tooling</span>
          </div>
          <div className="hero-ledger-value">Python · Linux CLI · SQL</div>
          <div className="hero-ledger-meta">Automation, log parsing &amp; shell scripts</div>
        </div>

        <div className="hero-ledger-card">
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
