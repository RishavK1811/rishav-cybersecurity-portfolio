import { ArrowUp, Code2, ContactRound, Mail, type LucideIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { configuredProfileLinks, homeHashHref, navItems, profile, type ProfileLink } from '../data/portfolio'

type FooterProps = { compact?: boolean }

export function Footer({ compact = false }: FooterProps) {
  const location = useLocation()
  const socialIcons: Record<ProfileLink['kind'], LucideIcon> = { github: Code2, linkedin: ContactRound, email: Mail }
  const socialLinks = configuredProfileLinks()

  return (
    <footer className={`site-footer ${compact ? 'footer-compact' : ''}`}>
      <div className="container">
        <div className="footer-head">
          <Link className="brand" to="/" aria-label="Rishav home"><span>{profile.shortName}</span></Link>
          <p>{profile.academicStatus} exploring cybersecurity, network security, and software development.</p>
          <Link className="back-to-top" to={homeHashHref(location.pathname, '#main-content')}>Back to top <ArrowUp aria-hidden="true" size={16} /></Link>
        </div>
        {!compact && (
          <div className="footer-navigation flex flex-wrap gap-x-6 gap-y-4">
            {navItems.map((item) => <Link to={homeHashHref(location.pathname, item.href)} key={item.href}>{item.label}</Link>)}
          </div>
        )}
        <div className="footer-bottom flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} {profile.name}. Built with care.</span>
          {socialLinks.length > 0 && <div className="footer-socials flex items-center gap-2">{socialLinks.map(({ label, url, kind, opensInNewTab }) => { const Icon = socialIcons[kind]; return <a key={label} href={url} target={opensInNewTab ? '_blank' : undefined} rel={opensInNewTab ? 'noreferrer' : undefined} aria-label={label}><Icon aria-hidden="true" size={17} /></a> })}</div>}
        </div>
      </div>
    </footer>
  )
}
