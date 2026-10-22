import { journey } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

export function Journey() {
  return (
    <section id="journey" className="section section-surface" aria-labelledby="journey-title">
      <div className="container journey-layout">
        <SectionHeading
          id="journey-title"
          eyebrow="Journey &amp; Direction"
          title={<>A deliberate<br />starting point.</>}
          description="A concise timeline of what is real now, what is being developed, and the opportunity ahead."
        />
        <ol className="timeline">
          {journey.map((item) => (
            <li key={item.title}>
              <div className="timeline-badge-col">
                <span className="timeline-node" />
                <span className="timeline-label">{item.label}</span>
              </div>
              <div className="timeline-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
