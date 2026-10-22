import { useEffect, useRef, useState } from 'react'

export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null)
  const [revealed, setRevealed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, revealed }
}
