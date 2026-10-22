import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="page-section container empty-page">
      <p className="eyebrow">404</p>
      <h1>There&apos;s nothing here.</h1>
      <p>Try returning to the portfolio home.</p>
      <Link className="button" to="/"><ArrowLeft aria-hidden="true" size={18} /> Back home</Link>
    </section>
  )
}
