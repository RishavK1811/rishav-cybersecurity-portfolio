import { profile } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

export function About() {
  return (
    <section id="about" className="section container about-grid" aria-labelledby="about-title">
      <div>
        <SectionHeading id="about-title" eyebrow="About &amp; Approach" title={<>Learning by building,<br />not by claiming.</>} />
        <div className="about-copy">
          <p>{profile.about}</p>
          <p>Every project here is designed to become a clear record of the problem, the approach, the evidence, and the next thing to improve.</p>
        </div>
      </div>
      <div className="methodology-panel flex flex-col gap-3.5" aria-label="Core operating methodology">
        <article className="methodology-card bento-card">
          <h4>Controlled Lab Practice</h4>
          <p>Grounding concepts in isolated, virtualized practice environments to study defensive controls and protocol behaviors from first principles.</p>
        </article>
        <article className="methodology-card bento-card">
          <h4>Strict Authorized Scope</h4>
          <p>Uncompromising commitment to authorized boundaries, documented testing targets, and responsible security standards.</p>
        </article>
        <article className="methodology-card bento-card">
          <h4>Evidence &amp; Remediation</h4>
          <p>Every exploration pairs findings with verifiable observations, root-cause analysis, and practical mitigation steps.</p>
        </article>
        <article className="methodology-card bento-card border-l-2 border-emerald-400">
          <h4 className="text-emerald-400">SOC &amp; Blue Team Readiness</h4>
          <p>Trained in SIEM fundamentals, event log auditing, and protocol triage; prepared to contribute immediately to incident investigation and defensive security workflows.</p>
        </article>
      </div>
    </section>
  )
}
