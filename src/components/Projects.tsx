import { ArrowUpRight, Code2, FlaskConical, MoveRight, ShieldCheck } from 'lucide-react'
import { useMemo, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { projects, type Project } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { SectionHeading } from './SectionHeading'

export function getProjectDomainCategory(p: Project): string {
  const text = `${p.slug} ${p.category} ${p.title} ${p.summary} ${p.tools.join(' ')}`.toLowerCase()
  if (
    text.includes('log') ||
    text.includes('soc') ||
    text.includes('auth') ||
    text.includes('blue team')
  ) {
    return 'Blue Team & SOC'
  }
  if (text.includes('network') || text.includes('scanner') || text.includes('port')) {
    return 'Network Analysis'
  }
  if (
    text.includes('password') ||
    text.includes('python') ||
    text.includes('script') ||
    text.includes('automation')
  ) {
    return 'Automation & Scripts'
  }
  if (text.includes('web') || text.includes('http') || text.includes('request')) {
    return 'Web Security & Labs'
  }
  return 'Security Tooling'
}

interface FilterTab {
  id: string
  label: string
  count: number
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const { ref, revealed } = useReveal<HTMLElement>()

  // Dynamically derive filter tabs and live counts from project data
  const filterTabs = useMemo<FilterTab[]>(() => {
    const categories = Array.from(new Set(projects.map(getProjectDomainCategory)))
    return [
      { id: 'all', label: 'All', count: projects.length },
      ...categories.map((cat) => ({
        id: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        label: cat,
        count: projects.filter((p) => getProjectDomainCategory(p) === cat).length,
      })),
    ]
  }, [])

  const selectedTab = filterTabs.find((t) => t.id === activeFilter)

  const featuredProject =
    projects.find((p) => p.slug === 'password-security-checker') ?? projects[0]
  const allLabProjects = projects.filter((p) => p.slug !== 'password-security-checker')

  // Determine whether featured project matches active filter
  const showFeatured =
    activeFilter === 'all' ||
    (featuredProject && getProjectDomainCategory(featuredProject) === selectedTab?.label)

  // Filter remaining lab projects
  const filteredLabs = allLabProjects.filter((project) => {
    if (activeFilter === 'all') return true
    return getProjectDomainCategory(project) === selectedTab?.label
  })

  return (
    <section
      id="projects"
      ref={ref}
      className={`section container reveal-section ${revealed ? 'is-revealed' : ''}`}
      aria-labelledby="projects-title"
    >
      <div className="section-topline">
        <SectionHeading
          id="projects-title"
          eyebrow="Selected Work"
          title={
            <>
              Projects with
              <br />
              room for proof.
            </>
          }
          description="Implemented security utilities alongside structured lab blueprints. Verified repositories link directly to source code; conceptual lab blueprints are explicitly marked."
        />
        {/* Dynamic Category Filter Tabs with Live Counter Badges */}
        <div className="project-filter-bar" role="group" aria-label="Filter projects by category">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`filter-chip ${activeFilter === tab.id ? 'is-active' : ''}`}
              aria-pressed={activeFilter === tab.id}
              onClick={() => setActiveFilter(tab.id)}
            >
              <span className="filter-chip-label">{tab.label}</span>
              <span className="filter-chip-count">[{tab.count}]</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Implemented Project */}
      {showFeatured && featuredProject && (
        <div className="featured-project-container mt-10">
          <article
            className="project-card featured-project-card stagger-card filter-card-animate"
            key={`${featuredProject.slug}-${activeFilter}`}
            style={{ '--stagger-index': 0 } as CSSProperties}
          >
            <div className="project-card-info">
              <div>
                <div className="project-meta-top flex items-center gap-2.5">
                  <span className="featured-badge">
                    <ShieldCheck aria-hidden="true" size={13} /> Featured Repository
                  </span>
                  <span className="project-category">{featuredProject.category}</span>
                </div>
                <h3>{featuredProject.title}</h3>
                <p>{featuredProject.summary}</p>
                <div className="project-tags flex flex-wrap gap-2">
                  <span className="tag-verified">{featuredProject.status}</span>
                  {featuredProject.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </div>
              <div className="project-actions flex flex-wrap items-center gap-3">
                {featuredProject.github && (
                  <a
                    className="button"
                    href={featuredProject.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${featuredProject.title} repository on GitHub`}
                  >
                    <Code2 aria-hidden="true" size={17} /> View Repository
                  </a>
                )}
                <Link
                  className="project-link"
                  to={`/projects/${featuredProject.slug}`}
                  aria-label={`Read case study for ${featuredProject.title}`}
                >
                  Case Study <MoveRight aria-hidden="true" size={16} />
                </Link>
              </div>
            </div>

            <div className="project-tech-preview" aria-hidden="true">
              <div className="tech-preview-header">
                <div className="tech-preview-controls flex items-center gap-1.5">
                  <span className="control-dot active" />
                  <span className="control-dot" />
                  <span className="control-dot" />
                </div>
                <span className="tech-preview-title">CLI Terminal · Rule-Based Validation</span>
                <span className="stat-value">Illustrative Terminal Output</span>
              </div>
              <div className="tech-preview-content">
                <div className="tech-preview-suite">
                  <div className="tech-cmd-line flex items-center gap-2">
                    <span className="tech-prompt">$</span>
                    <span className="tech-cmd">python3 main.py</span>
                  </div>
                  <div className="tech-cli-terminal">
                    <div className="cli-line">Please enter your password: **********</div>
                    <div className="cli-result-pass mt-1.5 flex items-center gap-1.5">
                      <span className="cli-status pass">Result: Meets basic rules [5/5 PASS]</span>
                    </div>
                    <div className="cli-divider my-2" />
                    <div className="cli-line">Please enter your password: mypass1</div>
                    <div className="cli-result-fail mt-1">
                      <div className="cli-status fail">Result: Does not meet basic rules [FAIL]</div>
                      <div className="cli-subtext">Unmet configured checks:</div>
                      <div className="cli-rule-item">• At least 8 characters</div>
                      <div className="cli-rule-item">• At least 1 uppercase letter</div>
                      <div className="cli-rule-item">• At least 1 special character</div>
                    </div>
                  </div>
                  <div className="tech-metric-bar flex items-center gap-2">
                    <span className="metric-tag">Rule Engine</span>
                    <span>Evaluates five configured checks: Length, Uppercase, Lowercase, Digits, Symbols</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* Labs in Progress Section */}
      {filteredLabs.length > 0 && (
        <div className="labs-section mt-14">
          <div className="labs-heading mb-6">
            <div className="flex items-center gap-2 mb-1.5">
              <FlaskConical aria-hidden="true" size={16} className="text-[#b5a0f2]" />
              <span className="eyebrow m-0 text-xs">Active Research &amp; Practice</span>
            </div>
            <h3 className="text-xl font-bold text-[#f5f2f8]">
              {activeFilter === 'all'
                ? 'Labs in Progress'
                : `${selectedTab?.label ?? ''} Projects`}
            </h3>
            <p className="labs-description mt-2 text-sm text-[#aaa4b5] max-w-2xl">
              {activeFilter === 'all'
                ? 'Controlled architectural blueprints and planned utilities exploring network discovery, authentication log parsing, and defensive HTTP boundaries in isolated lab environments.'
                : `Showing ${filteredLabs.length} ${
                    filteredLabs.length === 1 ? 'project' : 'projects'
                  } cataloged in this specialization.`}
            </p>
          </div>

          <div className="project-cards">
            {filteredLabs.map((project, index) => (
              <article
                className="project-card lab-card stagger-card filter-card-animate"
                key={`${project.slug}-${activeFilter}`}
                style={{ '--stagger-index': showFeatured ? index + 1 : index } as CSSProperties}
              >
                <div className="project-card-info">
                  <div>
                    <div className="project-meta-top flex items-center gap-2.5">
                      <span className="lab-badge">Lab Blueprint</span>
                      <span className="project-category">{project.category}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <div className="project-tags flex flex-wrap gap-2">
                      <span className="tag-draft">{project.status}</span>
                      {project.tools.map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                  </div>
                  <div className="project-actions flex items-center gap-3">
                    {project.github && (
                      <a
                        className="icon-link"
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Code2 aria-hidden="true" size={19} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        className="icon-link"
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${project.title} demo`}
                      >
                        <ArrowUpRight aria-hidden="true" size={19} />
                      </a>
                    )}
                    <Link
                      className="project-link"
                      to={`/projects/${project.slug}`}
                      aria-label={`View blueprint and scope for ${project.title}`}
                    >
                      Blueprint &amp; Scope <MoveRight aria-hidden="true" size={17} />
                    </Link>
                  </div>
                </div>

                <div className="project-tech-preview" aria-hidden="true">
                  <div className="tech-preview-header">
                    <div className="tech-preview-controls flex items-center gap-1.5">
                      <span className="control-dot" />
                      <span className="control-dot" />
                      <span className="control-dot" />
                    </div>
                    <span className="tech-preview-title">
                      {project.slug === 'network-scanner'
                        ? 'Host Discovery Matrix'
                        : project.slug === 'security-log-analyzer'
                        ? 'Parser Engine Stream'
                        : 'Defense Sandbox Inspector'}
                    </span>
                    <span className="stat-value">Sample Spec · Non-Executed</span>
                  </div>
                  <div className="tech-preview-content">
                    {project.slug === 'network-scanner' ? (
                      <div className="tech-preview-suite">
                        <div className="tech-cmd-line flex items-center gap-2">
                          <span className="tech-prompt">$</span>
                          <span className="tech-cmd">./netscan --range 192.168.1.0/24 --ports 22,80,443</span>
                        </div>
                        <div className="tech-matrix-wrap">
                          <div className="tech-matrix-row tech-matrix-head">
                            <span>Target Host</span>
                            <span>RTT</span>
                            <span>Port 22 (SSH)</span>
                            <span>Port 80 (HTTP)</span>
                            <span>Port 443 (TLS)</span>
                          </div>
                          <div className="tech-matrix-row">
                            <span className="host-name">192.168.1.1 [GW]</span>
                            <span>1.2ms</span>
                            <span className="port-closed">CLOSED</span>
                            <span className="port-open">OPEN</span>
                            <span className="port-open">OPEN</span>
                          </div>
                          <div className="tech-matrix-row">
                            <span className="host-name">192.168.1.15 [SRV]</span>
                            <span>0.8ms</span>
                            <span className="port-open">OPEN</span>
                            <span className="port-closed">CLOSED</span>
                            <span className="port-open">OPEN</span>
                          </div>
                          <div className="tech-matrix-row">
                            <span className="host-name">192.168.1.42 [DB]</span>
                            <span>2.4ms</span>
                            <span className="port-open">OPEN</span>
                            <span className="port-closed">CLOSED</span>
                            <span className="port-closed">CLOSED</span>
                          </div>
                        </div>
                        <div className="tech-metric-bar flex items-center gap-2">
                          <span className="metric-tag">Spec Mode</span>
                          <span>SYN Stealth Discovery · ARP Cache Query · Service Fingerprinting</span>
                        </div>
                      </div>
                    ) : project.slug === 'security-log-analyzer' ? (
                      <div className="tech-preview-suite">
                        <div className="tech-cmd-line flex items-center gap-2">
                          <span className="tech-prompt">$</span>
                          <span className="tech-cmd">python3 parse_logs.py --input /var/log/auth.log</span>
                        </div>
                        <div className="tech-log-stream">
                          <div className="log-line-item log-info">
                            <span className="log-timestamp">[10:14:22]</span>
                            <span className="log-badge-info">INFO</span>
                            <span className="log-msg">sshd: Listening on 0.0.0.0 port 22.</span>
                          </div>
                          <div className="log-line-item log-warn">
                            <span className="log-timestamp">[10:15:01]</span>
                            <span className="log-badge-warn">WARN</span>
                            <span className="log-msg">Failed password for invalid user admin from 192.168.1.104 port 49152</span>
                          </div>
                          <div className="log-line-item log-alert">
                            <span className="log-timestamp">[10:15:04]</span>
                            <span className="log-badge-alert">ALERT</span>
                            <span className="log-msg">Brute-force pattern identified: 5 attempts / 3s from 192.168.1.104</span>
                          </div>
                        </div>
                        <div className="tech-metric-bar flex items-center gap-2">
                          <span className="metric-tag">Ingest Engine</span>
                          <span>Syslog RFC 5424 Format · Regex Anomaly Extraction · Window Thresholding</span>
                        </div>
                      </div>
                    ) : (
                      <div className="tech-preview-suite">
                        <div className="tech-cmd-line flex items-center gap-2">
                          <span className="tech-prompt">$</span>
                          <span className="tech-cmd">curl -I https://sandbox.local/api/v1/auth</span>
                        </div>
                        <div className="tech-sandbox-terminal">
                          <div className="sandbox-header-row ok">
                            <span className="sandbox-status">HTTP/1.1 200 OK</span>
                          </div>
                          <div className="sandbox-body-row">
                            <span className="header-key">Content-Security-Policy:</span>
                            <span className="header-val">default-src &apos;self&apos;; frame-ancestors &apos;none&apos;</span>
                          </div>
                          <div className="sandbox-body-row">
                            <span className="header-key">Strict-Transport-Security:</span>
                            <span className="header-val">max-age=31536000; includeSubDomains</span>
                          </div>
                          <div className="sandbox-body-row">
                            <span className="header-key">X-Content-Type-Options:</span>
                            <span className="header-val">nosniff</span>
                          </div>
                          <div className="sandbox-body-row">
                            <span className="header-key">X-Frame-Options:</span>
                            <span className="header-val">DENY</span>
                          </div>
                        </div>
                        <div className="tech-metric-bar flex items-center gap-2">
                          <span className="metric-tag">Boundary Inspector</span>
                          <span>HTTP Security Response Headers · CORS Origin Audit · Cookie SameSite Policy</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!showFeatured && filteredLabs.length === 0 && (
        <div className="honest-placeholder mt-10">
          <p>No projects found in this category.</p>
        </div>
      )}
    </section>
  )
}
