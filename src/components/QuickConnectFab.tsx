import { Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { profile } from '../data/portfolio'

export function QuickConnectFab() {
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Automatically hide FAB when #contact section or the footer is in view
    const contactSection = document.getElementById('contact')
    const footerElement = document.querySelector('footer')

    const elementsToWatch = [contactSection, footerElement].filter(
      (el): el is HTMLElement => Boolean(el)
    )

    if (elementsToWatch.length === 0) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // If either contact section or footer is visible, hide the FAB to prevent overlapping
        const isNearBottom = entries.some((entry) => entry.isIntersecting)
        setIsVisible(!isNearBottom)
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: [0, 0.05, 0.1],
      }
    )

    elementsToWatch.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [location.pathname])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault()
      const contactEl = document.getElementById('contact')
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' })
        const firstInput = contactEl.querySelector<HTMLInputElement>('input, textarea')
        firstInput?.focus({ preventScroll: true })
      }
    }
  }

  return (
    <div
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 print:hidden transition-all duration-300 ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <a
        href="#contact"
        onClick={handleClick}
        className="fab-btn group relative flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 text-cyan-400 shadow-lg shadow-black/40 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-400 transition-all duration-200"
        aria-label={`Quick Connect: Contact Rishav Kumar (${profile.email})`}
        title={`Quick Connect: Contact Rishav Kumar (${profile.email})`}
      >
        {/* Mail Icon with Status Indicator */}
        <span className="relative flex items-center justify-center">
          <Mail size={16} className="transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
        </span>

        {/* Professional Quick Connect Label */}
        <span className="relative text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap">
          Quick Connect
        </span>
      </a>
    </div>
  )
}
