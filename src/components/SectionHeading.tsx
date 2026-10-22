import type { ReactNode } from 'react'

type SectionHeadingProps = {
  id?: string
  eyebrow: string
  title: ReactNode
  description?: string
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description && <p className="section-description max-w-xl">{description}</p>}
    </div>
  )
}
