import { useEffect, useRef, useState } from 'react'

interface RevealOptions {
  threshold?: number
  rootMargin?: string
}

export function useReveal<T extends HTMLElement = HTMLElement>(options: number | RevealOptions = 0.1) {
  const threshold = typeof options === 'number' ? options : options.threshold ?? 0.1
  const rootMargin = typeof options === 'number' ? '0px 0px -24px 0px' : options.rootMargin ?? '0px 0px -24px 0px'
  const ref = useRef<T | null>(null)
  const [revealed, setRevealed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setRevealed(true)
      return
    }

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setRevealed(true)
      return
    }

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setRevealed(true)
      }
    }

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handleMotionChange)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      if (typeof mq.removeEventListener === 'function') {
        mq.removeEventListener('change', handleMotionChange)
      }
    }
  }, [threshold, rootMargin])

  return { ref, revealed }
}
