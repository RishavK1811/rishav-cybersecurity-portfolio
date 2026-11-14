import { ArrowUpRight, Award, CheckCircle2, ChevronDown, ChevronUp, Eye, ExternalLink, ShieldCheck, X } from 'lucide-react'
import { useEffect, useState, type CSSProperties } from 'react'
import { certifications, type Certification } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { SectionHeading } from './SectionHeading'

export function Certifications() {
  const { ref, revealed } = useReveal<HTMLElement>()
  const [showAllCerts, setShowAllCerts] = useState(false)
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

  const visibleCertifications = showAllCerts ? certifications : certifications.slice(0, 3)
  const remainingCount = Math.max(0, certifications.length - 3)

  // Scroll lock and Escape key listener for Certificate Modal
  useEffect(() => {
    if (selectedCert) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedCert(null)
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = originalOverflow
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [selectedCert])

  const handleToggleExpand = () => {
    if (showAllCerts) {
      setShowAllCerts(false)
      const el = document.getElementById('certifications')
      if (el) {
        const topOffset = el.getBoundingClientRect().top + window.scrollY - 74
        window.scrollTo({ top: topOffset, behavior: 'smooth' })
      }
    } else {
      setShowAllCerts(true)
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
              const isRevealedExtra = showAllCerts && index >= 3

              return (
                <article
                  className={`credential-card bento-card stagger-card ${isFeatured ? 'is-featured' : ''} ${isRevealedExtra ? 'is-revealed-extra' : ''}`}
                  key={credential.title}
                  style={{
                    '--stagger-index': Math.min(index, 2),
                    '--reveal-index': Math.max(0, index - 3),
                  } as CSSProperties}
                  role="listitem"
                >
                  <div className="credential-card-inner flex flex-col justify-between h-full w-full">
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
                      <div className="credential-body-content text-left">
                        <h3 className="credential-title-text text-left font-bold text-slate-100">{credential.title}</h3>
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

                    {/* Footer Action - Bottom Aligned */}
                    <div className="credential-card-footer mt-auto pt-4 flex items-center justify-between gap-2 border-t border-slate-800/80">
                      <button
                        type="button"
                        onClick={() => setSelectedCert(credential)}
                        className="credential-modal-trigger inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
                        aria-label={`Inspect ${credential.title}`}
                      >
                        <Eye size={13} aria-hidden="true" />
                        <span>View Certificate</span>
                      </button>

                      {hasUrl && targetUrl ? (
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Verify ${credential.title} on official platform`}
                          className="credential-verify-action"
                        >
                          <span>Verify</span>
                          <ArrowUpRight aria-hidden="true" size={13} />
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
                          <span>[ Verified ]</span>
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
                aria-expanded={showAllCerts}
                aria-controls="certifications-grid"
              >
                {showAllCerts ? (
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

      {/* Certificate Modal - Mobile & Desktop Responsive */}
      {selectedCert && (
        <div
          className="cert-modal-overlay"
          onClick={() => setSelectedCert(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-heading"
        >
          <div
            className="cert-modal-content bento-card relative max-w-xl w-full mx-3 sm:mx-4 flex flex-col gap-4 bg-slate-950/95 border border-emerald-500/30 shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 pr-2">
                <ShieldCheck size={18} className="text-emerald-400 shrink-0" aria-hidden="true" />
                <h3 id="cert-modal-heading" className="text-sm sm:text-base font-bold text-slate-100 truncate">
                  {selectedCert.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="text-slate-400 hover:text-emerald-400 font-mono text-xs px-2 py-1 rounded bg-slate-900 border border-slate-800 transition-colors shrink-0 flex items-center gap-1"
                aria-label="Close modal (Escape)"
              >
                <X size={14} aria-hidden="true" />
                <span className="hidden sm:inline">Esc</span>
              </button>
            </div>

            {/* Modal Body / Image */}
            {selectedCert.imageUrl ? (
              <div className="flex justify-center items-center py-2">
                <img
                  src={selectedCert.imageUrl}
                  alt={`${selectedCert.title} Certificate`}
                  className="max-h-[70vh] sm:max-h-[80vh] w-auto max-w-full object-contain rounded-lg border border-slate-800"
                />
              </div>
            ) : (
              <div className="py-6 px-4 bg-slate-900/60 border border-emerald-500/20 rounded-xl flex flex-col items-center text-center gap-3">
                <Award size={42} className="text-emerald-400" aria-hidden="true" />
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                    Verified Industry Credential
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-100">
                    {selectedCert.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Issued by <strong className="text-slate-100">{selectedCert.issuer}</strong> · {selectedCert.issueDate || selectedCert.issued}
                  </p>
                  {selectedCert.credentialId && (
                    <div className="mt-2 text-xs font-mono text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800 inline-block">
                      ID: <span className="text-cyan-400">{selectedCert.credentialId}</span>
                    </div>
                  )}
                </div>

                {selectedCert.skills && selectedCert.skills.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                    {selectedCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs font-mono text-slate-400">
              <span>Press [Esc] or click outside to dismiss</span>
              {(selectedCert.credentialUrl || selectedCert.url) && (
                <a
                  href={selectedCert.credentialUrl || selectedCert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="button text-xs py-1.5 px-3 flex items-center gap-1.5"
                >
                  <span>Verify Credential</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

