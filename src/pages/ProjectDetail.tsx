import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Clock, Code2, FileCode2, Network, Shield } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { profile, projects } from '../data/portfolio'

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

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : undefined
  const nextProject =
    projectIndex >= 0 && projectIndex < projects.length - 1
      ? projects[projectIndex + 1]
      : undefined

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — ${profile.name} (${profile.shortName})`
    } else {
      document.title = `Project Not Found — ${profile.name} (${profile.shortName})`
    }
    return () => {
      document.title = `${profile.name} (${profile.shortName}) — Cybersecurity & Systems Portfolio`
    }
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
            <pre className="case-code-block" aria-label="Password validation logic summary">
              <code>{`# Core 5-rule evaluation pipeline (main.py)
special_characters = "!@#$%^&*()-_=+[]{}|;:',.<>?/\`~"

has_min_length = len(password) >= 8
has_upper      = any(ch.isupper() for ch in password)
has_lower      = any(ch.islower() for ch in password)
has_digit      = any(ch.isdigit() for ch in password)
has_special    = any(ch in special_characters for ch in password)`}</code>
            </pre>
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
          <div className="case-hero-content flex flex-col justify-center">
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
                <a className="button" href={project.github} target="_blank" rel="noreferrer">
                  <Code2 aria-hidden="true" size={17} /> View GitHub Repository
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="case-content container">
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
                <span className="notice-sub">Awaiting verified lab execution &amp; source publication</span>
              </div>
            </div>
            <div className="progress-notice-body">
              <p>
                This entry represents an active architectural blueprint in the <strong>Labs in Progress</strong> track. It is intentionally separated from completed tools until full implementation and repeatable testing in an authorized virtual lab are finalized.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Case Study Inter-Project Navigation */}
      <nav className="container case-pagination" aria-label="Case study navigation">
        <div className="case-pagination-grid">
          {prevProject ? (
            <Link className="case-pagination-link prev" to={`/projects/${prevProject.slug}`}>
              <span className="pagination-dir">
                <ArrowLeft aria-hidden="true" size={14} /> Previous Project
              </span>
              <span className="pagination-title">{prevProject.title}</span>
            </Link>
          ) : (
            <Link className="case-pagination-link prev" to="/#projects">
              <span className="pagination-dir">
                <ArrowLeft aria-hidden="true" size={14} /> Project Index
              </span>
              <span className="pagination-title">All Selected Work</span>
            </Link>
          )}

          {nextProject ? (
            <Link className="case-pagination-link next" to={`/projects/${nextProject.slug}`}>
              <span className="pagination-dir">
                Next Project <ArrowRight aria-hidden="true" size={14} />
              </span>
              <span className="pagination-title">{nextProject.title}</span>
            </Link>
          ) : (
            <Link className="case-pagination-link next" to="/#projects">
              <span className="pagination-dir">
                Return to Overview <ArrowUpRight aria-hidden="true" size={14} />
              </span>
              <span className="pagination-title">All Selected Work</span>
            </Link>
          )}
        </div>
      </nav>
    </article>
  )
}
