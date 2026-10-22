import { BookOpen, Cpu, Network, ShieldCheck, Terminal, Wrench, type LucideIcon } from 'lucide-react'
import { skills } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

const categoryIcons: Record<string, LucideIcon> = {
  'Programming & Scripting': Terminal,
  'Programming & Web': Terminal,
  Programming: Terminal,
  'Networking & Protocols': Network,
  Networking: Network,
  'Systems & Administration': Cpu,
  'Operating Systems & CLI': Cpu,
  'Operating Systems': Cpu,
  'Defensive Security & SOC': ShieldCheck,
  'Cybersecurity Concepts': ShieldCheck,
  Cybersecurity: ShieldCheck,
  'Tools & Utilities': Wrench,
  'Development Tools': Wrench,
  'Active Learning & Practice': BookOpen,
  'Currently Exploring': BookOpen,
  'Currently Learning': BookOpen,
}

export function Skills() {
  const activeSkills = skills.filter((group) => group.items.length > 0)

  return (
    <section id="skills" className="section section-surface" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          id="skills-title"
          eyebrow="Skills &amp; Competencies"
          title={<>Tools, concepts,<br />and technical range.</>}
          description="A verified overview of practical technologies, systems, and protocols studied through coursework and lab experimentation."
        />
        {activeSkills.length > 0 ? (
          <div className="skill-grid">
            {activeSkills.map((group) => {
              const Icon = categoryIcons[group.title] ?? ShieldCheck
              return (
                <article className="skill-card" key={group.title}>
                  <div className="skill-card-top flex items-center justify-between">
                    <span className="skill-group-name">{group.title}</span>
                    <div className="skill-card-icon" aria-hidden="true">
                      <Icon size={18} />
                    </div>
                  </div>
                  <ul className="tag-list flex flex-wrap gap-2 mt-4">
                    {group.items.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="honest-placeholder" style={{ marginTop: '36px' }}>
            <p>Skill entries will appear once verified through coursework and projects.</p>
          </div>
        )}
      </div>
    </section>
  )
}
