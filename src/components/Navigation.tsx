import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { homeHashHref, navItems, profile } from '../data/portfolio'

export function Navigation() {
  const [open, setOpen] = useState(false)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const menuPanelRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const hasResume = Boolean(profile.resumePath)

  const returnFocusToToggle = () => {
    menuToggleRef.current?.focus({ preventScroll: true })
  }

  const dismissMenu = () => {
    setOpen(false)
    window.requestAnimationFrame(returnFocusToToggle)
  }

  const closeMenuForNavigation = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        dismissMenu()
      }
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (
        menuPanelRef.current &&
        !menuPanelRef.current.contains(target) &&
        menuToggleRef.current &&
        !menuToggleRef.current.contains(target)
      ) {
        dismissMenu()
      }
    }

    const handleResize = () => {
      if (window.innerWidth > 800) {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [open])

  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Primary navigation">
        <div className="brand-wrapper flex items-center gap-3">
          <Link className="brand" to="/" onClick={closeMenuForNavigation} aria-label="Rishav home">
            <span>{profile.shortName}</span>
          </Link>
          {profile.statusMessage && (
            <div className="nav-status-pill" aria-hidden="true">
              <span className="nav-status-dot" />
              <span>{profile.statusMessage}</span>
            </div>
          )}
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen((current) => !current)}
          ref={menuToggleRef}
        >
          {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
        {open && <div className="nav-backdrop" aria-hidden="true" onClick={dismissMenu} />}
        <div id="main-navigation" ref={menuPanelRef} className={`nav-panel ${open ? 'is-open' : ''}`}>
          <div className="nav-links flex items-center">
            {navItems.map((item) => (
              <Link key={item.href} to={homeHashHref(location.pathname, item.href)} onClick={closeMenuForNavigation}>
                {item.label}
              </Link>
            ))}
          </div>
          {hasResume && (
            <a className="button button-small" href={profile.resumePath} download onClick={closeMenuForNavigation}>
              Resume
            </a>
          )}
        </div>
      </nav>
    </header>
  )
}
