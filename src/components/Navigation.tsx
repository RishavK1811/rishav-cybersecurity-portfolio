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

  const returnFocusToToggle = () => menuToggleRef.current?.focus()
  const dismissMenu = () => {
    setOpen(false)
    window.requestAnimationFrame(returnFocusToToggle)
  }
  const closeMenuForNavigation = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return

    const keepFocusInMenu = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        dismissMenu()
        return
      }

      if (event.key !== 'Tab') return

      const focusableInPanel = Array.from(
        menuPanelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []
      )
      const allFocusables = [menuToggleRef.current, ...focusableInPanel].filter(
        (el): el is HTMLElement => Boolean(el)
      )

      if (allFocusables.length === 0) return

      const first = allFocusables[0]
      const last = allFocusables[allFocusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
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

    const focusFirstMenuItem = window.setTimeout(() => {
      menuPanelRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled])')?.focus()
    }, 10)

    window.addEventListener('keydown', keepFocusInMenu)
    document.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('resize', handleResize)

    return () => {
      window.clearTimeout(focusFirstMenuItem)
      window.removeEventListener('keydown', keepFocusInMenu)
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
        {open && <button className="nav-backdrop" type="button" tabIndex={-1} aria-label="Close navigation menu" onClick={dismissMenu} />}
        <div id="main-navigation" ref={menuPanelRef} className={`nav-panel ${open ? 'is-open' : ''}`} role={open ? 'dialog' : undefined} aria-modal={open || undefined} aria-label={open ? 'Primary navigation' : undefined}>
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
