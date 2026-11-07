import { Mail } from 'lucide-react'
import { useLocation } from 'react-router-dom'

export function QuickConnectFab() {
  const location = useLocation()

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
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 print:hidden">
      <a
        href="#contact"
        onClick={handleClick}
        className="fab-btn group relative flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-slate-900/85 backdrop-blur-md border border-cyan-500/40 text-cyan-400 shadow-xl shadow-cyan-950/40 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-400 transition-all duration-200"
        aria-label="Quick Connect: Contact Rishav Kumar"
      >
        {/* Subtle Radar Pulse Ring */}
        <span className="absolute -inset-0.5 rounded-full bg-cyan-400/25 animate-ping opacity-60 pointer-events-none" />

        {/* Mail Icon with Live Status Dot */}
        <span className="relative flex items-center justify-center">
          <Mail size={17} className="transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
        </span>

        {/* Monospace Quick Connect Label */}
        <span className="relative text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap">
          Quick Connect
        </span>
      </a>
    </div>
  )
}
