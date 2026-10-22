import { useEffect } from 'react'
import { useLocation, type Location } from 'react-router-dom'

/** Keeps client-side route changes and in-page destinations predictable. */
export function HashScrollRestorer({ location: customLocation }: { location?: Location } = {}) {
  const routerLocation = useLocation()
  const { hash, key, pathname } = customLocation ?? routerLocation

  useEffect(() => {
    let retryTimer: number | undefined
    let settleTimer: number | undefined
    let attempts = 0

    const restoreScroll = () => {
      if (!hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        return
      }

      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'auto' })
      } else if (attempts < 5) {
        attempts += 1
        retryTimer = window.setTimeout(restoreScroll, 50)
      }
    }

    const frame = window.requestAnimationFrame(() => {
      restoreScroll()
      // Let the browser finish any navigation restoration before applying the final position.
      settleTimer = window.setTimeout(restoreScroll, 50)
    })

    return () => {
      window.cancelAnimationFrame(frame)
      if (retryTimer) window.clearTimeout(retryTimer)
      if (settleTimer) window.clearTimeout(settleTimer)
    }
  }, [hash, key, pathname])

  return null
}
