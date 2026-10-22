import { ArrowUpRight, Code2, FlaskConical, MoveRight, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

export function Projects() {
  const featuredProject = projects.find((p) => p.slug === 'password-security-checker') ?? projects[0]
  const labProjects = projects.filter((p) => p.slug !== 'password-security-checker')

  return (
    <section id="projects" className="section container" aria-labelledby="projects-title">
      <div className="section-topline">
        <SectionHeading
          id="projects-title"
          eyebrow="Selected Work"
          title={<>Projects with<br />room for proof.</>}
          description="A collection of implemented security utilities and structured lab drafts. Implemented work links directly to source repositories; drafts remain explicitly marked."
        />
        <span className="draft-key">Source &amp; Lab Blueprints</span>
      </div>

      {/* Featured Implemented Project */}
      {featuredProject && (
        <div className="featured-project-container mt-10">
          <article className="project-card featured-project-card">
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
                  {featuredProject.tools.map((tool) => <span key={tool}>{tool}</span>)}
                </div>
              </div>
              <div className="project-actions flex flex-wrap items-center gap-3">
                {featuredProject.github && (
                  <a className="button" href={featuredProject.github} target="_blank" rel="noreferrer">
                    <Code2 aria-hidden="true" size={17} /> View Repository
                  </a>
                )}
                <Link className="project-link" to={`/projects/${featuredProject.slug}`}>
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
                <span className="tech-preview-title">CLI Terminal · Rule Validator</span>
                <span className="stat-value">Python 3 CLI · Verified</span>
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
                      <span className="cli-status pass">Result: Strong Password! ✅</span>
                    </div>
                    <div className="cli-divider my-2" />
                    <div className="cli-line">Please enter your password: mypass1</div>
                    <div className="cli-result-fail mt-1">
                      <div className="cli-status fail">Result: Weak Password! ❌</div>
                      <div className="cli-subtext">Your password should include the following:</div>
                      <div className="cli-rule-item">• At least 8 characters</div>
                      <div className="cli-rule-item">• At least 1 uppercase letter</div>
                      <div className="cli-rule-item">• At least 1 special character</div>
                    </div>
                  </div>
                  <div className="tech-metric-bar flex items-center gap-2">
                    <span className="metric-tag">Rule Engine</span>
                    <span>Evaluates 5 core criteria: Length, Uppercase, Lowercase, Digits, Symbols</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* Labs in Progress Section */}
      <div className="labs-section mt-14">
        <div className="labs-heading mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <FlaskConical aria-hidden="true" size={16} className="text-[#b5a0f2]" />
            <span className="eyebrow m-0 text-xs">Active Research &amp; Practice</span>
          </div>
          <h3 className="text-xl font-bold text-[#f5f2f8]">Labs in Progress</h3>
          <p className="labs-description mt-2 text-sm text-[#aaa4b5] max-w-2xl">
            Controlled experiments and architectural blueprints exploring networking, event parsing, and defensive web boundaries in authorized virtual lab environments.
          </p>
        </div>

        <div className="project-cards">
          {labProjects.map((project) => (
            <article className="project-card lab-card" key={project.slug}>
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
                    {project.tools.map((tool) => <span key={tool}>{tool}</span>)}
                  </div>
                </div>
                <div className="project-actions flex items-center gap-3">
                  {project.github && (
                    <a className="icon-link" href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}>
                      <Code2 aria-hidden="true" size={19} />
                    </a>
                  )}
                  {project.demo && (
                    <a className="icon-link" href={project.demo} target="_blank" rel="noreferrer" aria-label={`View ${project.title} demo`}>
                      <ArrowUpRight aria-hidden="true" size={19} />
                    </a>
                  )}
                  <Link className="project-link" to={`/projects/${project.slug}`}>
                    Case study <MoveRight aria-hidden="true" size={17} />
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
                          <span className="host-rtt">0.4ms</span>
                          <span className="port-state port-filtered">FILTERED</span>
                          <span className="port-state port-open">OPEN (HTTP/2)</span>
                          <span className="port-state port-open">OPEN (TLS 1.3)</span>
                        </div>
                        <div className="tech-matrix-row">
                          <span className="host-name">192.168.1.10 [SRV]</span>
                          <span className="host-rtt">1.1ms</span>
                          <span className="port-state port-open">OPEN (OpenSSH)</span>
                          <span className="port-state port-closed">CLOSED</span>
                          <span className="port-state port-closed">CLOSED</span>
                        </div>
                        <div className="tech-matrix-row">
                          <span className="host-name">192.168.1.24 [LAB]</span>
                          <span className="host-rtt">0.8ms</span>
                          <span className="port-state port-filtered">FILTERED</span>
                          <span className="port-state port-open">OPEN (DevApp)</span>
                          <span className="port-state port-closed">CLOSED</span>
                        </div>
                      </div>
                      <div className="tech-metric-bar flex items-center gap-2">
                        <span className="metric-tag">Spec Model</span>
                        <span>Illustrative port discovery matrix · Simulated RFC 1918 virtual lab</span>
                      </div>
                    </div>
                  ) : project.slug === 'security-log-analyzer' ? (
                    <div className="tech-preview-suite">
                      <div className="tech-cmd-line flex items-center gap-2">
                        <span className="tech-prompt">$</span>
                        <span className="tech-cmd">./log-analyzer --source /var/log/auth.log</span>
                      </div>
                      <div className="tech-events-stream">
                        <div className="tech-event-item">
                          <span className="event-time">14:22:01.402</span>
                          <span className="event-badge badge-warn">AUTH_FAIL</span>
                          <span className="event-desc">src=10.0.0.45:51224 user=admin [Failed password]</span>
                        </div>
                        <div className="tech-event-item">
                          <span className="event-time">14:22:03.811</span>
                          <span className="event-badge badge-warn">AUTH_FAIL</span>
                          <span className="event-desc">src=10.0.0.45:51228 user=root [Invalid credential]</span>
                        </div>
                        <div className="tech-event-item event-spike">
                          <span className="event-time">14:22:05.190</span>
                          <span className="event-badge badge-alert">SPIKE_TRIGGER</span>
                          <span className="event-desc">rule=MultipleAuthFailuresThreshold count=5/30s</span>
                        </div>
                      </div>
                      <div className="tech-metric-bar flex items-center gap-2">
                        <span className="metric-tag">Spec Model</span>
                        <span>Illustrative log anomaly parser · Synthetic test events</span>
                      </div>
                    </div>
                  ) : (
                    <div className="tech-preview-suite">
                      <div className="tech-cmd-line flex items-center gap-2">
                        <span className="tech-prompt">$</span>
                        <span className="tech-cmd">curl -i -X POST http://localhost:8080/api/transfer</span>
                      </div>
                      <div className="tech-sandbox-grid">
                        <div className="sandbox-card sandbox-req">
                          <div className="sandbox-card-header">
                            <span className="sandbox-tag tag-req">TEST REQUEST</span>
                            <span className="sandbox-method">POST /api/transfer</span>
                          </div>
                          <div className="sandbox-body">
                            <div>Origin: https://untrusted.test</div>
                            <div className="sandbox-warn">CSRF Token: [MISSING / INVALID]</div>
                          </div>
                        </div>
                        <div className="sandbox-card sandbox-res">
                          <div className="sandbox-card-header">
                            <span className="sandbox-tag tag-res">DEFENSIVE RESPONSE</span>
                            <span className="sandbox-status">403 FORBIDDEN</span>
                          </div>
                          <div className="sandbox-body">
                            <div>CSP: default-src &apos;self&apos; · XFO: DENY</div>
                            <div>X-Content-Type-Options: nosniff</div>
                          </div>
                        </div>
                      </div>
                      <div className="tech-metric-bar flex items-center gap-2">
                        <span className="metric-tag">Spec Model</span>
                        <span>Defensive HTTP header verification · Local sandbox suite</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
