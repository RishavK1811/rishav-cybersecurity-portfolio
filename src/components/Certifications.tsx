import { ArrowUpRight, Award, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import { useState, type CSSProperties } from 'react'
import { certifications } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { SectionHeading } from './SectionHeading'

export function Certifications() {
  const { ref, revealed } = useReveal<HTMLElement>()
  const [expanded, setExpanded] = useState(false)

  const visibleCertifications = expanded ? certifications : certifications.slice(0, 3)
  const remainingCount = Math.max(0, certifications.length - 3)

  const handleToggleExpand = () => {
    if (expanded) {
      setExpanded(false)
      const el = document.getElementById('certifications')
      if (el) {
        const topOffset = el.getBoundingClientRect().top + window.scrollY - 74
        window.scrollTo({ top: topOffset, behavior: 'smooth' })
      }
    } else {
      setExpanded(true)
    }
  }

  return (
    <section
      id="certifications"
      ref={ref}
      className={`section container certifications-section reveal-section ${revealed ? 'is-revealed' : ''}`}
      aria-labelledby="certifications-title"
    >
      <div className="certifications-header-wrap flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <SectionHeading
          id="certifications-title"
          eyebrow="Verified Credentials"
          title={
            <>
              Evidence, when
              <br />
              it is earned.
            </>
          }
          description="Formal certifications, specialized security training, and independently verifiable achievements from industry programs and academic partnerships."
        />
        {certifications.length > 0 && (
          <div
            className="certifications-volume-badge"
            role="status"
            aria-label={`Total Verified Credentials: ${certifications.length}`}
          >
            <span className="cert-status-dot" aria-hidden="true" />
            <span className="cert-status-text">
              VERIFIED CREDENTIALS // TOTAL: {certifications.length}
            </span>
          </div>
        )}
      </div>

      {certifications.length > 0 ? (
        <>
          <div
            id="certifications-grid"
            className="certifications-grid"
            role="list"
            aria-label="Certifications list"
          >
            {visibleCertifications.map((credential, index) => {
              const hasUrl = Boolean(credential.credentialUrl || credential.url)
              const targetUrl = credential.credentialUrl || credential.url
              const displayDate = credential.issueDate || credential.issued
              const isFeatured = index < 3
              const isRevealedExtra = expanded && index >= 3

              return (
                <article
                  className={`credential-card stagger-card ${isFeatured ? 'is-featured' : ''} ${isRevealedExtra ? 'is-revealed-extra' : ''}`}
                  key={credential.title}
                  style={{
                    '--stagger-index': Math.min(index, 2),
                    '--reveal-index': Math.max(0, index - 3),
                  } as CSSProperties}
                  role="listitem"
                >
                  <div className="credential-card-inner">
                    <div className="credential-card-top-section flex flex-col gap-3">
                      {/* Top Bar: Issuer Badge + Issue Date */}
                      <div className="credential-issuer-bar flex items-center justify-between gap-2">
                        <div className="credential-issuer-badge">
                          <Award size={13} className="credential-issuer-icon" aria-hidden="true" />
                          <span className="credential-issuer-name">{credential.issuer}</span>
                        </div>
                        {displayDate && (
                          <span className="credential-date-text">
                            {displayDate}
                          </span>
                        )}
                      </div>

                      {/* Main Body: Title + Credential ID */}
                      <div className="credential-body-content">
                        <h3 className="credential-title-text">{credential.title}</h3>
                        {credential.credentialId && (
                          <div className="credential-id-terminal-tag mt-2">
                            <span className="id-tag-prefix">ID:</span>
                            <code className="id-tag-value">{credential.credentialId}</code>
                          </div>
                        )}
                      </div>

                      {/* Skills Row */}
                      {credential.skills && credential.skills.length > 0 && (
                        <div
                          className="credential-skills-flow"
                          aria-label={`Skills for ${credential.title}`}
                        >
                          {credential.skills.map((skill) => (
                            <span key={skill} className="credential-skill-chip">
                              <span className="skill-dot" aria-hidden="true">•</span>
                              <span>{skill}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Action */}
                    <div className="credential-card-footer">
                      {hasUrl && targetUrl ? (
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Verify ${credential.title} on official platform`}
                          className="credential-verify-action"
                        >
                          <span>Verify Credential</span>
                          <ArrowUpRight aria-hidden="true" size={14} />
                        </a>
                      ) : (
                        <div
                          className="credential-verified-status"
                          aria-label="Verified Credential"
                        >
                          <CheckCircle2
                            size={13}
                            className="text-emerald-400"
                            aria-hidden="true"
                          />
                          <span>[ Verified Credential ]</span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Toggle Expand / Collapse Button */}
          {certifications.length > 3 && (
            <div className="certifications-toggle-wrap">
              <button
                type="button"
                className="certifications-toggle-btn"
                onClick={handleToggleExpand}
                aria-expanded={expanded}
                aria-controls="certifications-grid"
              >
                {expanded ? (
                  <>
                    <span>[ Show Less ↑ ]</span>
                    <ChevronUp size={15} aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <span>[ View All Certifications (+{remainingCount} More) ↓ ]</span>
                    <ChevronDown size={15} aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="honest-placeholder flex flex-col gap-4">
          <div className="honest-placeholder-header flex items-center gap-3">
            <Award aria-hidden="true" size={24} />
            <div>
              <h4>Credentials Policy</h4>
              <span className="stat-value">VERIFIED DISCLOSURE ONLY</span>
            </div>
          </div>
          <p>
            In alignment with ethical security practice, credentials and
            certifications are published here only once formally completed and
            independently verifiable.
          </p>
        </div>
      )}
    </section>
  )
}
