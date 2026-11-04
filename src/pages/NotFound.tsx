import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setNotFoundSeo } from '../utils/seo'

export function NotFound() {
  useEffect(() => {
    return setNotFoundSeo()
  }, [])

  return (
    <section className="page-section container empty-page">
      <p className="eyebrow">404</p>
      <h1>There&apos;s nothing here.</h1>
      <p>Try returning to the portfolio home.</p>
      <Link className="button" to="/">
        <ArrowLeft aria-hidden="true" size={18} /> Back home
      </Link>
    </section>
  )
}
