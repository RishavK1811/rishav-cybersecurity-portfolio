import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { useLocation, type Location } from 'react-router-dom'

interface PageTransitionProps {
  children: (renderedLocation: Location) => ReactNode
}

interface ActiveTransition {
  skipTransition?: () => void
  finished?: Promise<void>
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  const [renderedLocation, setRenderedLocation] = useState<Location>(location)
  const isInitialMount = useRef(true)
  const activeTransitionRef = useRef<ActiveTransition | null>(null)
  const [isFallbackAnimating, setIsFallbackAnimating] = useState(false)

  useLayoutEffect(() => {
    // Direct URL loading / initial mount: render immediately without animation
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    // In-page hash navigation on the same pathname: update location immediately without transition
    if (location.pathname === renderedLocation.pathname) {
      setRenderedLocation(location)
      return
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const supportsViewTransitions =
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      typeof (document as unknown as { startViewTransition: unknown }).startViewTransition === 'function'

    // Cancel any ongoing transition to prevent overlapping animations during rapid clicks
    if (activeTransitionRef.current?.skipTransition) {
      try {
        activeTransitionRef.current.skipTransition()
      } catch {
        // Safe ignore if transition has already completed
      }
      activeTransitionRef.current = null
    }

    if (supportsViewTransitions && !prefersReducedMotion) {
      const doc = document as unknown as {
        startViewTransition: (callback: () => void) => ActiveTransition
      }

      const transition = doc.startViewTransition(() => {
        flushSync(() => {
          setRenderedLocation(location)
        })

        // Synchronously coordinate scroll position within the view transition snapshot
        if (location.hash) {
          const target = document.getElementById(decodeURIComponent(location.hash.slice(1)))
          if (target) {
            target.scrollIntoView({ block: 'start', behavior: 'auto' })
          } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
          }
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        }
      })

      activeTransitionRef.current = transition

      transition.finished
        ?.then(() => {
          // Route focus to main content container to preserve accessible keyboard context
          const mainContent = document.getElementById('main-content')
          mainContent?.focus({ preventScroll: true })
        })
        .catch(() => {
          // Suppress errors if skipped by another navigation
        })
        .finally(() => {
          if (activeTransitionRef.current === transition) {
            activeTransitionRef.current = null
          }
        })
    } else {
      // Fallback for browsers without View Transitions or when prefers-reduced-motion is active
      setRenderedLocation(location)

      if (location.hash) {
        const target = document.getElementById(decodeURIComponent(location.hash.slice(1)))
        if (target) {
          target.scrollIntoView({ block: 'start', behavior: 'auto' })
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }

      const mainContent = document.getElementById('main-content')
      mainContent?.focus({ preventScroll: true })

      if (!prefersReducedMotion) {
        setIsFallbackAnimating(true)
        const timer = window.setTimeout(() => {
          setIsFallbackAnimating(false)
        }, 360)
        return () => window.clearTimeout(timer)
      }
    }
  }, [location, renderedLocation.pathname])

  return (
    <div className={`page-transition-fallback ${isFallbackAnimating ? 'is-animating' : ''}`}>
      {children(renderedLocation)}
    </div>
  )
}
