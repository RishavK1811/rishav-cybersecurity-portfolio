import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Code2,
  ContactRound,
  Copy,
  Loader2,
  Mail,
  Send,
} from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { contactMetadata, profile } from '../data/portfolio'

type ContactField = 'name' | 'email' | 'subject' | 'message'
type ContactErrors = Partial<Record<ContactField, string>>
type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''

if (!WEB3FORMS_ACCESS_KEY && import.meta.env.DEV) {
  console.warn(
    '[Web3Forms] Missing VITE_WEB3FORMS_ACCESS_KEY in environment variables. Please set it in your .env or Vercel dashboard.'
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
  const [copiedEmail, setCopiedEmail] = useState(false)
  const errorSummaryRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const isSubmitting = status === 'submitting'

  const handleCopyEmail = async () => {
    if (!profile.email) return
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2500)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = profile.email
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2500)
    }
  }

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

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus('error')
      setErrorMessage(
        'Gateway configuration error: Missing access key. Please configure environment variable.'
      )
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
            {contactMetadata.map((item) => (
              <div key={item.label} className="contact-metadata-row">
                <span className="contact-metadata-label">{item.label}</span>
                <span className="contact-metadata-value">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Dedicated Direct Email & Copy Strip */}
          {profile.email && (
            <div className="direct-email-box bg-slate-900/80 border border-slate-800 p-3.5 rounded-lg mt-6 shadow-sm">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Direct Recruiter &amp; Team Contact:
              </span>
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <span className="text-sm font-mono text-cyan-400 select-all font-semibold">
                  {profile.email}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/50 transition-all"
                  aria-label="Copy email address to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={13} className="text-emerald-400" aria-hidden="true" />
                      <span className="text-emerald-400 font-semibold">[ Copied! ]</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} aria-hidden="true" />
                      <span>[ Copy Email ]</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="contact-side">
          <div>
            <p>
              Available for entry-level SOC Analyst positions, Blue Team internships, and technical cybersecurity discussions. Feel free to connect directly via email, LinkedIn, or the inquiry form below.
            </p>
            {(profile.linkedin || profile.github || profile.email) && (
              <div className="contact-actions-row flex flex-wrap items-center gap-3 mt-6">
                {profile.linkedin && (
                  <a className="button" href={profile.linkedin} target="_blank" rel="noreferrer">
                    <ContactRound aria-hidden="true" size={17} /> Connect on LinkedIn
                  </a>
                )}
                {profile.email && (
                  <a className="button button-quiet" href={`mailto:${profile.email}`}>
                    <Mail aria-hidden="true" size={17} /> Send Email
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
                [!] Form Validation: Please correct the highlighted fields before submitting.
              </div>
            )}

            {/* Success Banner */}
            {status === 'success' && (
              <div
                role="status"
                aria-live="polite"
                className="flex items-start gap-3 p-3.5 border border-emerald-500/40 bg-emerald-950/20 text-emerald-300 font-sans text-xs sm:text-sm rounded shadow-[0_0_16px_rgba(16,185,129,0.15)]"
              >
                <CheckCircle2
                  size={18}
                  className="text-emerald-400 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div className="space-y-0.5">
                  <div className="font-semibold text-emerald-300 tracking-wide font-mono">
                    [✓] Message Delivered Successfully
                  </div>
                  <p className="text-emerald-400/90 text-xs">
                    Thank you for reaching out! Your message was delivered directly to my inbox and I will respond promptly.
                  </p>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {status === 'error' && (
              <div
                role="alert"
                aria-live="assertive"
                className="flex items-start gap-3 p-3.5 border border-rose-500/40 bg-rose-950/20 text-rose-300 font-sans text-xs sm:text-sm rounded shadow-[0_0_16px_rgba(244,63,94,0.15)]"
              >
                <AlertTriangle
                  size={18}
                  className="text-rose-400 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div className="space-y-0.5">
                  <div className="font-semibold text-rose-300 tracking-wide font-mono">
                    [!] Delivery Issue: {errorMessage || 'Connection timed out or network error.'}
                  </div>
                  <p className="text-rose-400/90 text-xs">
                    Unable to transmit form. Please reach out directly at{' '}
                    <a href={`mailto:${profile.email}`} className="underline font-mono text-cyan-300">
                      {profile.email}
                    </a>
                    .
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
                  placeholder="Your Name / Organization"
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
                  placeholder="recruiter@company.com"
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
                placeholder="e.g., SOC Analyst Opening / Security Internship Inquiry"
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
                placeholder="Write your message or inquiry here..."
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
                  <span>Sending Message...</span>
                </>
              ) : status === 'success' ? (
                <>
                  <span>Send Another Message</span>
                  <Send aria-hidden="true" size={17} />
                </>
              ) : (
                <>
                  <span>Send Message</span>
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
