import { ArrowUpRight, Award, CheckCircle2, ShieldCheck } from 'lucide-react'
import { certifications } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

export function Certifications() {
  return (
    <section
      id="certifications"
      className="section container certifications"
      aria-labelledby="certifications-title"
    >
      <div className="certifications-heading-wrap">
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
      </div>

      {certifications.length > 0 ? (
        <div className="credential-list flex flex-col gap-4">
          {certifications.map((credential) => {
            const hasUrl = Boolean(credential.credentialUrl || credential.url)
            const targetUrl = credential.credentialUrl || credential.url
            const displayDate = credential.issueDate || credential.issued

            return (
              <article className="credential-card" key={credential.title}>
                <div className="credential-card-top">
                  <div className="credential-icon-wrap" aria-hidden="true">
                    <Award size={20} className="credential-icon" />
                  </div>

                  <div className="credential-main">
                    <div className="credential-header-row">
                      <h3 className="credential-title">{credential.title}</h3>
                      <div className="credential-badge-wrap">
                        {credential.status === 'completed' || !credential.status ? (
                          <span className="credential-status completed flex items-center gap-1.5">
                            <ShieldCheck size={12} aria-hidden="true" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="credential-status in-progress">
                            In Progress
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="credential-issuer">{credential.issuer}</p>

                    <div className="credential-meta-row">
                      {displayDate && (
                        <span className="credential-meta-item">
                          Issued {displayDate}
                        </span>
                      )}
                      {displayDate && credential.credentialId && (
                        <span className="credential-meta-sep" aria-hidden="true">
                          ·
                        </span>
                      )}
                      {credential.credentialId && (
                        <span className="credential-meta-item">
                          ID:{' '}
                          <code className="credential-id-code">
                            {credential.credentialId}
                          </code>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {credential.skills && credential.skills.length > 0 && (
                  <div
                    className="credential-skills"
                    aria-label="Security skill tags"
                  >
                    {credential.skills.map((skill) => (
                      <span key={skill} className="credential-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <div className="credential-action-row">
                  {hasUrl && targetUrl ? (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Verify ${credential.title} on official platform`}
                      className="credential-verify-btn"
                    >
                      <span>Verify Credential</span>
                      <ArrowUpRight aria-hidden="true" size={14} />
                    </a>
                  ) : (
                    <div
                      className="credential-verified-pill"
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
              </article>
            )
          })}
        </div>
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
