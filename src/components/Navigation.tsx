import { FileDown, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { homeHashHref, navItems, profile } from '../data/portfolio'

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState<string>('')
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

  // Active section scroll-spy using IntersectionObserver
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('')
      return
    }

    const sectionIds = navItems.map((item) => item.href.replace('#', ''))
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (sectionElements.length === 0) return

    // Track intersecting entries to select the most relevant active section
    const visibleEntries = new Map<string, IntersectionObserverEntry>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleEntries.set(entry.target.id, entry)
          } else {
            visibleEntries.delete(entry.target.id)
          }
        })

        // Edge case: top of the page (Hero section), no section link is active
        if (window.scrollY < 120) {
          setActiveSection('')
          return
        }

        // Edge case: scrolled to the bottom of the page, activate the last section (#contact)
        const docEl = document.documentElement
        if (window.innerHeight + window.scrollY >= docEl.scrollHeight - 60) {
          setActiveSection('contact')
          return
        }

        // Pick the visible section closest to the top of the viewport (below 74px navbar)
        const active = Array.from(visibleEntries.values()).sort(
          (a, b) => Math.abs(a.boundingClientRect.top - 80) - Math.abs(b.boundingClientRect.top - 80)
        )[0]

        if (active) {
          setActiveSection(active.target.id)
        }
      },
      {
        rootMargin: '-74px 0px -40% 0px',
        threshold: [0, 0.1, 0.25],
      }
    )

    sectionElements.forEach((el) => observer.observe(el))

    const handleScrollBoundaries = () => {
      const scrollY = window.scrollY
      const docEl = document.documentElement
      if (scrollY < 120) {
        setActiveSection('')
      } else if (window.innerHeight + scrollY >= docEl.scrollHeight - 60) {
        setActiveSection('contact')
      }
    }

    window.addEventListener('scroll', handleScrollBoundaries, { passive: true })
    handleScrollBoundaries()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScrollBoundaries)
    }
  }, [location.pathname])

  // Smooth scroll-progress tracking via requestAnimationFrame
  useEffect(() => {
    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(() => {
        const docEl = document.documentElement
        const totalScroll = docEl.scrollHeight - window.innerHeight
        const progress = totalScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / totalScroll)) : 0
        setScrollProgress(progress)
        rafId = null
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [location.pathname])

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
      {/* 2px glowing cyber scroll-progress indicator */}
      <div
        className="scroll-progress-bar"
        role="progressbar"
        aria-hidden="true"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <nav className="nav container" aria-label="Primary navigation">
        <div className="brand-wrapper flex items-center gap-3">
          <Link className="brand" to="/" onClick={closeMenuForNavigation} aria-label="Rishav home">
            <span>{profile.shortName}</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-full w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
              STATUS: ONLINE // SOC MODE
            </span>
          </div>
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
        <div
          className={`nav-backdrop ${open ? 'is-open' : ''}`}
          aria-hidden="true"
          onClick={dismissMenu}
        />
        <div
          id="main-navigation"
          ref={menuPanelRef}
          className={`nav-panel ${open ? 'is-open' : ''}`}
        >
          <div className="nav-links flex items-center">
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '')
              const isActive = location.pathname === '/' && activeSection === sectionId
              return (
                <Link
                  key={item.href}
                  to={homeHashHref(location.pathname, item.href)}
                  onClick={closeMenuForNavigation}
                  className={isActive ? 'is-active' : undefined}
                  aria-current={isActive ? 'location' : undefined}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="nav-active-dot" aria-hidden="true" />}
                </Link>
              )
            })}
          </div>
          <a
            className="nav-cv-cyan-btn"
            href="/resume.pdf"
            download="Rishav_Kumar_Cybersecurity_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenuForNavigation}
            aria-label="Download Rishav Kumar's Cybersecurity Resume"
          >
            <FileDown aria-hidden="true" size={14} />
            <span>[ Download CV ]</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
