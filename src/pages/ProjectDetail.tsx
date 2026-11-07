import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  FileCode2,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Terminal as TerminalIcon,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projects, type Project } from '../data/portfolio'
import { setProjectSeo } from '../utils/seo'

type CaseSectionProps = {
  num: string
  title: string
  id: string
  children: ReactNode
}

function CaseSection({ num, title, id, children }: CaseSectionProps) {
  return (
    <section className="case-section" aria-labelledby={id}>
      <div className="case-section-header">
        <span className="case-section-num">{num}</span>
        <h2 id={id}>{title}</h2>
      </div>
      <div className="case-section-body">{children}</div>
    </section>
  )
}

interface SecurityTakeaway {
  focus: string
  impact: string
  verification: string
  scope: string
}

function getSecurityTakeaways(project: Project): SecurityTakeaway {
  switch (project.slug) {
    case 'password-security-checker':
      return {
        focus: 'Authentication Hardening & Input Validation',
        impact:
          'Enforces client-side credential complexity policies to eliminate predictable, single-class passwords before database submission.',
        verification:
          'Deterministic 5-rule evaluation engine verifying length, uppercase, lowercase, numeric digits, and symbol diversity.',
        scope:
          'Standalone local CLI utility execution; zero external network exposure or persistent credential storage.',
      }
    case 'network-scanner':
      return {
        focus: 'Network Reconnaissance & Surface Discovery',
        impact:
          'Assists blue team asset inventory by cataloging reachable IP addresses and open listening service ports.',
        verification:
          'Structured TCP/UDP probe handshakes coupled with round-trip latency (RTT) measurement matrices.',
        scope:
          'Strictly restricted to authorized local virtual lab subnets (192.168.1.0/24); non-production target scope.',
      }
    case 'security-log-analyzer':
      return {
        focus: 'SOC Telemetry & Anomaly Detection',
        impact:
          'Rapidly identifies anomalous brute-force authentication attempts and privilege escalation spikes in syslog feeds.',
        verification:
          'High-throughput regex parsing engine correlating failed auth thresholds against temporal windows.',
        scope:
          'Sanitized offline Linux authentication log exports; zero interception of live production traffic.',
      }
    case 'web-security-practice-lab':
      return {
        focus: 'Application Security & Origin Hardening',
        impact:
          'Tests defensive HTTP headers (CSP, HSTS, CORS) and request boundary validation against injection flaws.',
        verification:
          'Controlled browser inspection suite validating response header enforcement and sanitization policies.',
        scope:
          'Isolated containerized Docker testbed built strictly for defensive educational security exercises.',
      }
    default:
      return {
        focus: project.category,
        impact: project.summary,
        verification: 'Structured technical approach with verified diagnostic validation.',
        scope: 'Authorized local development and virtual lab environments only.',
      }
  }
}

function CodeSnippet({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = code
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="code-snippet-box">
      <div className="code-snippet-header flex items-center justify-between">
        <span className="code-snippet-label">{label || 'Technical Specification'}</span>
        <button
          type="button"
          className={`copy-btn ${copied ? 'is-copied' : ''}`}
          onClick={handleCopy}
          aria-label={copied ? 'Copied code to clipboard' : 'Copy code to clipboard'}
        >
          {copied ? (
            <>
              <Check size={12} aria-hidden="true" />
              <span>[ Copied! ]</span>
            </>
          ) : (
            <>
              <Copy size={12} aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="case-code-block" tabIndex={0} aria-label={label || 'Code snippet'}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

function isPlaceholderText(text: string): boolean {
  const trimmed = text.trim()
  if (!trimmed) return true
  const lower = trimmed.toLowerCase()
  return (
    lower.startsWith('replace') ||
    lower.startsWith('describe') ||
    lower.startsWith('document') ||
    lower.startsWith('explain') ||
    lower.startsWith('record') ||
    lower.startsWith('summarize') ||
    lower.startsWith('capture') ||
    lower.startsWith('define') ||
    lower.startsWith('clarify') ||
    lower.startsWith('list') ||
    lower.startsWith('state') ||
    lower.startsWith('add ') ||
    lower.startsWith('add\t') ||
    lower.startsWith('no results are published yet') ||
    lower.startsWith('awaiting') ||
    lower.startsWith('draft') ||
    lower.startsWith('todo') ||
    lower.startsWith('tbd') ||
    lower.includes('replace this with') ||
    lower.includes('add your real') ||
    lower.includes('editable project entry') ||
    lower.includes('editable record') ||
    lower.includes('editable entry') ||
    lower.includes('project details required') ||
    lower.includes('learning notes required')
  )
}

function getValidItems(items?: string[]): string[] {
  if (!items || !Array.isArray(items)) return []
  return items.filter((item) => typeof item === 'string' && !isPlaceholderText(item))
}

function isPlaceholder(value: unknown): boolean {
  if (!value) return true
  if (Array.isArray(value)) {
    if (value.length === 0) return true
    return value.every((item) => typeof item === 'string' && isPlaceholderText(item))
  }
  if (typeof value === 'string') {
    return isPlaceholderText(value)
  }
  return false
}

export function ProjectDetail() {
  const { slug } = useParams()
  const projectIndex = projects.findIndex((entry) => entry.slug === slug)
  const project = projectIndex >= 0 ? projects[projectIndex] : undefined

  // Circular navigation across portfolio projects
  const prevProject =
    projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1]
  const nextProject =
    projectIndex >= 0 && projectIndex < projects.length - 1
      ? projects[projectIndex + 1]
      : projects[0]

  useEffect(() => {
    return setProjectSeo(project)
  }, [project])

  if (!project) {
    return (
      <section className="page-section container empty-page">
        <p className="eyebrow">Project not found</p>
        <h1>This case study doesn&apos;t exist.</h1>
        <Link className="button" to="/#projects">
          <ArrowLeft aria-hidden="true" size={18} /> Back to projects
        </Link>
      </section>
    )
  }

  const takeaways = getSecurityTakeaways(project)

  const hasRealProblem = !isPlaceholder(project.problem)
  const hasRealObjective = !isPlaceholder(project.objective)
  const validApproach = getValidItems(project.approach)
  const hasRealApproach = validApproach.length > 0
  const validTools = getValidItems(project.tools)
  const hasRealTools = validTools.length > 0
  const hasRealImplementation = !isPlaceholder(project.implementation)
  const hasRealTesting = !isPlaceholder(project.testing)
  const hasRealChallenges = !isPlaceholder(project.challenges)
  const hasRealLimitations = !isPlaceholder(project.limitations)

  const hasAnyRealDetails =
    hasRealProblem ||
    hasRealObjective ||
    hasRealApproach ||
    hasRealTools ||
    hasRealImplementation ||
    hasRealTesting ||
    hasRealChallenges ||
    hasRealLimitations

  const sections: { id: string; title: string; content: ReactNode }[] = [
    {
      id: 'section-overview',
      title: 'Overview',
      content: <p>{project.summary}</p>,
    },
  ]

  if (hasRealProblem) {
    sections.push({
      id: 'section-problem',
      title: 'Problem statement',
      content: <p>{project.problem}</p>,
    })
  }

  if (hasRealObjective) {
    sections.push({
      id: 'section-objective',
      title: 'Objective',
      content: <p>{project.objective}</p>,
    })
  }

  if (hasRealApproach) {
    sections.push({
      id: 'section-approach',
      title: 'Technical approach',
      content: (
        <ol className="approach-list">
          {validApproach.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      ),
    })
  }

  if (hasRealTools) {
    sections.push({
      id: 'section-tools',
      title: 'Tools used',
      content: (
        <ul className="tag-list flex flex-wrap gap-2">
          {validTools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      ),
    })
  }

  if (hasRealImplementation) {
    sections.push({
      id: 'section-implementation',
      title: 'Implementation details',
      content: (
        <div className="case-implementation-stack">
          <p>{project.implementation}</p>
          {project.slug === 'password-security-checker' && (
            <>
              <CodeSnippet
                label="Python Rule-Evaluation Pipeline (main.py)"
                code={`# Core 5-rule evaluation pipeline (main.py)
special_characters = "!@#$%^&*()-_=+[]{}|;:',.<>?/\`~"

has_min_length = len(password) >= 8
has_upper      = any(ch.isupper() for ch in password)
has_lower      = any(ch.islower() for ch in password)
has_digit      = any(ch.isdigit() for ch in password)
has_special    = any(ch in special_characters for ch in password)`}
              />
              <CodeSnippet
                label="Interactive Terminal Command"
                code="python3 main.py"
              />
            </>
          )}
        </div>
      ),
    })
  }

  if (hasRealTesting) {
    sections.push({
      id: 'section-testing',
      title: 'Testing & verification',
      content: <p>{project.testing}</p>,
    })
  }

  if (hasRealChallenges) {
    sections.push({
      id: 'section-challenges',
      title: 'Challenges & lessons',
      content: <p>{project.challenges}</p>,
    })
  }

  if (hasRealLimitations) {
    sections.push({
      id: 'section-limitations',
      title: 'Known limitations (v1)',
      content: <p>{project.limitations}</p>,
    })
  }

  return (
    <article className="case-study">
      <header className="case-hero container">
        <div className="case-hero-grid">
          <div className="case-hero-content flex flex-col">
            <Link className="back-link flex items-center gap-2" to="/#projects">
              <ArrowLeft aria-hidden="true" size={16} /> All projects
            </Link>
            <span className="case-eyebrow">{project.category}</span>
            <h1 className="case-title">{project.title}</h1>
            <p className="case-lead">{project.summary}</p>
            <div className="case-status-row flex flex-wrap items-center gap-3 mt-5">
              <span className="case-status-pill">{project.status}</span>
            </div>
            {project.github && (
              <div className="case-actions flex flex-wrap items-center gap-3 mt-6">
                <a
                  className="button"
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${project.title} repository on GitHub`}
                >
                  <Code2 aria-hidden="true" size={17} /> View GitHub Repository
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="case-content container">
        {/* Quick Takeaways / Security Impact Summary Box */}
        <div className="case-takeaways-card" aria-label="Quick Takeaways & Security Impact">
          <div className="case-takeaways-header">
            <div className="takeaways-icon-box" aria-hidden="true">
              <ShieldCheck size={20} />
            </div>
            <div>
              <span className="takeaways-eyebrow">Executive Summary</span>
              <h2 className="takeaways-title">Quick Takeaways &amp; Security Impact</h2>
            </div>
          </div>
          <div className="takeaways-grid">
            <div className="takeaway-item">
              <span className="takeaway-label">
                <ShieldAlert size={14} aria-hidden="true" /> Security Focus
              </span>
              <p className="takeaway-value">{takeaways.focus}</p>
            </div>
            <div className="takeaway-item">
              <span className="takeaway-label">
                <CheckCircle2 size={14} aria-hidden="true" /> Defensive Impact
              </span>
              <p className="takeaway-value">{takeaways.impact}</p>
            </div>
            <div className="takeaway-item">
              <span className="takeaway-label">
                <TerminalIcon size={14} aria-hidden="true" /> Verification
              </span>
              <p className="takeaway-value">{takeaways.verification}</p>
            </div>
            <div className="takeaway-item">
              <span className="takeaway-label">
                <Lock size={14} aria-hidden="true" /> Scope &amp; Boundary
              </span>
              <p className="takeaway-value">{takeaways.scope}</p>
            </div>
          </div>
        </div>

        {sections.map((sec, index) => (
          <CaseSection
            key={sec.id}
            num={String(index + 1).padStart(2, '0')}
            title={sec.title}
            id={sec.id}
          >
            {sec.content}
          </CaseSection>
        ))}

        {!hasAnyRealDetails && (
          <div className="case-progress-notice" role="status">
            <div className="progress-notice-header flex items-center gap-3">
              <div className="notice-icon-box">
                <FileCode2 aria-hidden="true" size={20} />
              </div>
              <div>
                <h3>Lab Blueprint — Documentation in Progress</h3>
                <span className="notice-sub">
                  Awaiting verified lab execution &amp; source publication
                </span>
              </div>
            </div>
            <div className="progress-notice-body">
              <p>
                This entry represents an active architectural blueprint in the{' '}
                <strong>Labs in Progress</strong> track. It is intentionally separated from
                completed tools until full implementation and repeatable testing in an authorized
                virtual lab are finalized.
              </p>
            </div>
            {/* Blueprint Architecture Spec Command with Copy */}
            <CodeSnippet
              label="Planned Implementation Spec / Lab Command"
              code={
                project.slug === 'network-scanner'
                  ? './netscan --range 192.168.1.0/24 --ports 22,80,443 --stealth'
                  : project.slug === 'security-log-analyzer'
                  ? 'python3 parse_logs.py --input /var/log/auth.log --threshold 5 --output report.json'
                  : 'docker compose -f docker-compose.lab.yml up --build -d'
              }
            />
          </div>
        )}
      </div>

      {/* Case Study Inter-Project Navigation Cards */}
      <nav className="container case-pagination" aria-label="Case study navigation">
        <div className="case-pagination-grid">
          <Link
            className="case-pagination-link prev"
            to={`/projects/${prevProject.slug}`}
            aria-label={`Go to previous project: ${prevProject.title}`}
          >
            <span className="pagination-dir">
              <ArrowLeft aria-hidden="true" size={14} /> Previous Project
            </span>
            <span className="pagination-title">{prevProject.title}</span>
            <span className="pagination-meta">{prevProject.category}</span>
          </Link>

          <Link
            className="case-pagination-link next"
            to={`/projects/${nextProject.slug}`}
            aria-label={`Go to next project: ${nextProject.title}`}
          >
            <span className="pagination-dir">
              Next Project <ArrowRight aria-hidden="true" size={14} />
            </span>
            <span className="pagination-title">{nextProject.title}</span>
            <span className="pagination-meta">{nextProject.category}</span>
          </Link>
        </div>
      </nav>
    </article>
  )
}
