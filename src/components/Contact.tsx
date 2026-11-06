import {
  AlertTriangle,
  CheckCircle2,
  Code2,
  ContactRound,
  Loader2,
  Mail,
  Send,
} from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { profile } from '../data/portfolio'

type ContactField = 'name' | 'email' | 'subject' | 'message'
type ContactErrors = Partial<Record<ContactField, string>>
type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

const FALLBACK_ACCESS_KEY = 'e45a2f0e-8b3f-43c2-812a-3875e978b3ff'
const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || FALLBACK_ACCESS_KEY

if (!import.meta.env.VITE_WEB3FORMS_ACCESS_KEY && import.meta.env.DEV) {
  console.warn(
    '[Web3Forms] Missing VITE_WEB3FORMS_ACCESS_KEY in environment variables. Falling back to default repository key.'
  )
}

export function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [fieldErrors, setFieldErrors] = useState<ContactErrors>({})
  const errorSummaryRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const isSubmitting = status === 'submitting'

  function handleInputChange(field: ContactField, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
    }
    if (status === 'error') {
      setStatus('idle')
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) return

    const name = formData.name.trim()
    const email = formData.email.trim()
    const subject = formData.subject.trim()
    const message = formData.message.trim()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const errors: ContactErrors = {
      name: name ? undefined : 'Enter your name.',
      email: !email
        ? 'Enter your email address.'
        : !emailRegex.test(email)
          ? 'Enter a valid email address.'
          : undefined,
      subject: subject ? undefined : 'Enter a subject.',
      message: message ? undefined : 'Enter a message.',
    }

    if (Object.values(errors).some(Boolean)) {
      setFieldErrors(errors)
      window.setTimeout(() => errorSummaryRef.current?.focus(), 0)
      return
    }

    setFieldErrors({})
    setStatus('submitting')
    setErrorMessage('')

    try {
      const formElement = event.currentTarget
      const payload = new FormData(formElement)

      // Ensure key and processed fields are appended cleanly
      payload.set('access_key', WEB3FORMS_ACCESS_KEY)
      payload.set('name', name)
      payload.set('email', email)
      payload.set('subject', subject ? `[PORTFOLIO CONTACT] ${subject}` : `Portfolio Contact from ${name}`)
      payload.set('message', message)
      payload.set('from_name', name)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: payload,
      })

      const data = (await response.json()) as { success?: boolean; message?: string }

      if (response.ok && data.success) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
        if (formRef.current) {
          formRef.current.reset()
        }
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Connection timed out or invalid key.')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Connection timed out or network unreachable.'
      )
    }
  }

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="container contact-card">
        <div>
          <p className="eyebrow">Get in Touch</p>
          <h2 id="contact-title">
            Let&apos;s start with
            <br />
            a conversation.
          </h2>
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
            {(profile.linkedin || profile.github || profile.email) && (
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
                {profile.email && (
                  <a className="button button-quiet" href={`mailto:${profile.email}`}>
                    <Mail aria-hidden="true" size={17} /> Send Email
                  </a>
                )}
              </div>
            )}
          </div>

          <form
            ref={formRef}
            className="contact-form mt-4"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Honeypot Botcheck trap for Web3Forms anti-spam */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Validation Error Summary */}
            {Object.values(fieldErrors).some(Boolean) && (
              <div
                className="form-error-summary font-mono text-xs"
                ref={errorSummaryRef}
                role="alert"
                tabIndex={-1}
              >
                [!] Validation Alert: Please correct the highlighted fields before transmitting packet.
              </div>
            )}

            {/* Terminal Success Banner */}
            {status === 'success' && (
              <div
                role="status"
                aria-live="polite"
                className="flex items-start gap-3 p-3.5 border border-emerald-500/40 bg-emerald-950/20 text-emerald-300 font-mono text-xs sm:text-sm rounded shadow-[0_0_16px_rgba(16,185,129,0.15)]"
              >
                <CheckCircle2
                  size={18}
                  className="text-emerald-400 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div className="space-y-0.5">
                  <div className="font-semibold text-emerald-300 tracking-wide">
                    [+] Transmission Ack: Message delivered successfully.
                  </div>
                  <p className="text-emerald-400/80 text-[11.5px]">
                    Packet routed to personal inbox via Web3Forms gateway. A response will follow shortly.
                  </p>
                </div>
              </div>
            )}

            {/* Terminal Error Banner */}
            {status === 'error' && (
              <div
                role="alert"
                aria-live="assertive"
                className="flex items-start gap-3 p-3.5 border border-rose-500/40 bg-rose-950/20 text-rose-300 font-mono text-xs sm:text-sm rounded shadow-[0_0_16px_rgba(244,63,94,0.15)]"
              >
                <AlertTriangle
                  size={18}
                  className="text-rose-400 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div className="space-y-0.5">
                  <div className="font-semibold text-rose-300 tracking-wide">
                    [-] Transmission Failed: {errorMessage || 'Connection timed out or invalid key.'}
                  </div>
                  <p className="text-rose-400/80 text-[11.5px]">
                    Packet delivery failed. Please verify network access or retry transmission.
                  </p>
                </div>
              </div>
            )}

            <div className="contact-form-grid">
              <label htmlFor="contact-name">
                <span>Name</span>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  disabled={isSubmitting}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your Name / Call Sign"
                  aria-invalid={fieldErrors.name ? true : undefined}
                  aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {fieldErrors.name && (
                  <span className="field-error" id="contact-name-error">
                    {fieldErrors.name}
                  </span>
                )}
              </label>

              <label htmlFor="contact-email">
                <span>Email</span>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={isSubmitting}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="contact@domain.com"
                  aria-invalid={fieldErrors.email ? true : undefined}
                  aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {fieldErrors.email && (
                  <span className="field-error" id="contact-email-error">
                    {fieldErrors.email}
                  </span>
                )}
              </label>
            </div>

            <label htmlFor="contact-subject">
              <span>Subject</span>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                disabled={isSubmitting}
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="e.g., Security Internship / Defensive Project Inquiry"
                aria-invalid={fieldErrors.subject ? true : undefined}
                aria-describedby={fieldErrors.subject ? 'contact-subject-error' : undefined}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {fieldErrors.subject && (
                <span className="field-error" id="contact-subject-error">
                  {fieldErrors.subject}
                </span>
              )}
            </label>

            <label htmlFor="contact-message">
              <span>Message</span>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                disabled={isSubmitting}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Compose your transmission here..."
                aria-invalid={fieldErrors.message ? true : undefined}
                aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {fieldErrors.message && (
                <span className="field-error" id="contact-message-error">
                  {fieldErrors.message}
                </span>
              )}
            </label>

            <button
              className="button disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden="true" size={17} />
                  <span>[ TRANSMITTING_PACKET... ]</span>
                </>
              ) : status === 'success' ? (
                <>
                  <span>Transmit Another Message</span>
                  <Send aria-hidden="true" size={17} />
                </>
              ) : (
                <>
                  <span>Transmit Message</span>
                  <Send aria-hidden="true" size={17} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
