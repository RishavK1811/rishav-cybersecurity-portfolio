import { ArrowDownRight, Code2, ContactRound, FileDown, Mail, type LucideIcon } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { configuredProfileLinks, profile, type ProfileLink } from '../data/portfolio'

const EarthCanvas = lazy(() => import('./EarthCanvas').then(m => ({ default: m.EarthCanvas })))

export function Hero() {
  const socialIcons: Record<ProfileLink['kind'], LucideIcon> = { github: Code2, linkedin: ContactRound, email: Mail }
  const socialLinks = configuredProfileLinks()

  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">{profile.portfolioPeriod}</p>
        <h1 id="hero-title">Building secure <br className="hero-break" />digital systems.</h1>
        <p className="hero-intro">{profile.intro}</p>
        <div className="hero-actions flex flex-wrap items-center gap-3">
          <Link className="button" to="#projects">
            Explore Projects <ArrowDownRight aria-hidden="true" size={18} />
          </Link>
          {profile.resumePath && (
            <a className="button button-quiet" href={profile.resumePath} download>
              Download Resume <FileDown aria-hidden="true" size={17} />
            </a>
          )}
        </div>
        {socialLinks.length > 0 && (
          <div className="social-row flex items-center gap-2" aria-label="Social links">
            {socialLinks.map(({ label, url, kind, opensInNewTab }) => {
              const Icon = socialIcons[kind]
              return <a key={label} href={url} target={opensInNewTab ? '_blank' : undefined} rel={opensInNewTab ? 'noreferrer' : undefined} aria-label={label}>
                <Icon aria-hidden="true" size={18} />
              </a>
            })}
          </div>
        )}
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="hero-earth-container">
          <Suspense fallback={
            <div className="earth-loader" aria-hidden="true">
              <div className="earth-loader-spinner" />
            </div>
          }>
            <EarthCanvas />
          </Suspense>
        </div>
        <p className="hero-earth-caption">Illustrative Cyber Activity</p>
      </div>
    </section>
  )
}
