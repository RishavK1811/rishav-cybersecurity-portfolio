import { Award, ArrowUpRight } from 'lucide-react'
import { certifications } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

export function Certifications() {
  return (
    <section id="certifications" className="section container certifications" aria-labelledby="certifications-title">
      <SectionHeading
        id="certifications-title"
        eyebrow="Verified Credentials"
        title={<>Evidence, when<br />it is earned.</>}
        description="Completed credentials and verified achievements belong here. Learning-in-progress is labelled separately."
      />
      {certifications.length > 0 ? (
        <div className="credential-list flex flex-col gap-3">
          {certifications.map((credential) => (
            <article className="credential" key={credential.title}>
              <Award aria-hidden="true" size={21} />
              <div className="credential-info">
                <h3>{credential.title}</h3>
                <p>
                  {credential.issuer}
                  {credential.issued ? ` · Issued ${credential.issued}` : ''}
                  {credential.credentialId ? ` · ID: ${credential.credentialId}` : ''}
                </p>
              </div>
              <div className="credential-meta-right flex items-center gap-3">
                <span className={`credential-status ${credential.status}`}>
                  {credential.status === 'completed' ? 'Completed' : 'In progress'}
                </span>
                {credential.url && (
                  <a
                    href={credential.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Verify ${credential.title} certificate`}
                    className="credential-verify-link"
                  >
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </a>
                )}
              </div>
            </article>
          ))}
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
            In alignment with ethical security practice, credentials and certifications are published here only once formally completed and independently verifiable (e.g., certificate ID or official transcript).
          </p>
          <div className="ledger-status">
            <span>● Currently building foundational competencies through coursework &amp; self-directed study</span>
          </div>
        </div>
      )}
    </section>
  )
}
