import { Code2, ContactRound, Mail, Send } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { profile } from '../data/portfolio'

type ContactField = 'name' | 'email' | 'message'
type ContactErrors = Partial<Record<ContactField, string>>

export function Contact() {
  const canEmail = Boolean(profile.email)
  const [fieldErrors, setFieldErrors] = useState<ContactErrors>({})
  const errorSummaryRef = useRef<HTMLDivElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formElement = event.currentTarget
    const form = new FormData(formElement)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()
    const emailInput = formElement.elements.namedItem('email') as HTMLInputElement
    const errors: ContactErrors = {
      name: name ? undefined : 'Enter your name.',
      email: emailInput.validity.valid ? undefined : email ? 'Enter a valid email address.' : 'Enter your email address.',
      message: message ? undefined : 'Enter a message.',
    }

    if (Object.values(errors).some(Boolean)) {
      setFieldErrors(errors)
      window.setTimeout(() => errorSummaryRef.current?.focus(), 0)
      return
    }

    setFieldErrors({})
    const subject = `Portfolio message from ${name}`
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`
    window.location.assign(`mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  function clearFieldError(field: ContactField) {
    setFieldErrors((errors) => errors[field] ? { ...errors, [field]: undefined } : errors)
  }

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="container contact-card">
        <div>
          <p className="eyebrow">Get in Touch</p>
          <h2 id="contact-title">Let&apos;s start with<br />a conversation.</h2>
          <div className="contact-metadata-list">
            <div className="contact-metadata-row">
              <span className="contact-metadata-label">Opportunities</span>
              <span className="contact-metadata-value">Internships &amp; Entry Roles</span>
            </div>
            <div className="contact-metadata-row">
              <span className="contact-metadata-label">Focus</span>
              <span className="contact-metadata-value">Defensive Security &amp; SOC</span>
            </div>
            <div className="contact-metadata-row">
              <span className="contact-metadata-label">Communication</span>
              <span className="contact-metadata-value">Direct &amp; Professional</span>
            </div>
          </div>
        </div>
        <div className="contact-side">
          <div>
            <p>
              Interested in an internship, a technical conversation, or a thoughtful exchange about learning defensive cybersecurity? I&apos;d be glad to connect.
            </p>
            {(profile.linkedin || profile.github) && (
              <div className="contact-actions-row flex flex-wrap items-center gap-3 mt-6">
                {profile.linkedin && (
                  <a className="button" href={profile.linkedin} target="_blank" rel="noreferrer">
                    <ContactRound aria-hidden="true" size={17} /> Connect on LinkedIn
                  </a>
                )}
                {profile.github && (
                  <a className="button button-quiet" href={profile.github} target="_blank" rel="noreferrer">
                    <Code2 aria-hidden="true" size={17} /> View GitHub
                  </a>
                )}
              </div>
            )}
          </div>
          {canEmail ? (
            <form className="contact-form mt-4" onSubmit={handleSubmit} noValidate>
              {Object.values(fieldErrors).some(Boolean) && (
                <div className="form-error-summary" ref={errorSummaryRef} role="alert" tabIndex={-1}>
                  Please correct the highlighted fields before opening your email draft.
                </div>
              )}
              <div className="contact-form-grid">
                <label htmlFor="contact-name">
                  <span>Name</span>
                  <input id="contact-name" name="name" autoComplete="name" required aria-invalid={fieldErrors.name ? true : undefined} aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined} onInput={() => clearFieldError('name')} />
                  {fieldErrors.name && <span className="field-error" id="contact-name-error">{fieldErrors.name}</span>}
                </label>
                <label htmlFor="contact-email">
                  <span>Email</span>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required aria-invalid={fieldErrors.email ? true : undefined} aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined} onInput={() => clearFieldError('email')} />
                  {fieldErrors.email && <span className="field-error" id="contact-email-error">{fieldErrors.email}</span>}
                </label>
              </div>
              <label htmlFor="contact-message">
                <span>Message</span>
                <textarea id="contact-message" name="message" rows={4} required aria-invalid={fieldErrors.message ? true : undefined} aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined} onInput={() => clearFieldError('message')} />
                {fieldErrors.message && <span className="field-error" id="contact-message-error">{fieldErrors.message}</span>}
              </label>
              <button className="button" type="submit">
                Open email draft <Send aria-hidden="true" size={17} />
              </button>
            </form>
          ) : (
            <div className="contact-unconfigured flex items-center gap-3 mt-4" role="status">
              <Mail aria-hidden="true" size={18} />
              <span>Direct email is currently withheld; please connect via LinkedIn or explore verified repositories on GitHub.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
