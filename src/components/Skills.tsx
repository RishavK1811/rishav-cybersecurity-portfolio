import {
  Code2,
  Cpu,
  Lock,
  Network,
  Search,
  Shield,
  Terminal,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useId, useState, type CSSProperties } from 'react'
import { skills } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { SectionHeading } from './SectionHeading'

const categoryIcons: Record<string, LucideIcon> = {
  'Defensive Security & SOC': Shield,
  'Networking & Protocols': Network,
  'Systems & Administration': Cpu,
  'Programming & Scripting': Code2,
  'Tools & Utilities': Terminal,
  'Active Learning & Practice': Lock,
  'Programming & Web': Code2,
  Programming: Code2,
  Networking: Network,
  'Operating Systems & CLI': Cpu,
  'Operating Systems': Cpu,
  'Cybersecurity Concepts': Shield,
  Cybersecurity: Shield,
  'Development Tools': Terminal,
  'Currently Exploring': Lock,
  'Currently Learning': Lock,
}

export function Skills() {
  const { ref, revealed } = useReveal<HTMLElement>()
  const searchInputId = useId()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const activeSkills = skills.filter((group) => group.items.length > 0)
  const totalSkillsCount = activeSkills.reduce((acc, group) => acc + group.items.length, 0)

  const normalizedQuery = searchQuery.trim().toLowerCase()

  // Filter groups by selected category and search query
  const visibleGroups = activeSkills.filter((group) => {
    if (selectedCategory !== 'All' && group.title !== selectedCategory) {
      return false
    }
    if (!normalizedQuery) return true
    const titleMatches = group.title.toLowerCase().includes(normalizedQuery)
    const itemsMatch = group.items.some((item) => item.toLowerCase().includes(normalizedQuery))
    return titleMatches || itemsMatch
  })

  // Count total skills matching search query across filtered groups
  const matchingSkillsCount = visibleGroups.reduce((acc, group) => {
    if (!normalizedQuery) return acc + group.items.length
    return (
      acc +
      group.items.filter(
        (item) => item.toLowerCase().includes(normalizedQuery) || group.title.toLowerCase().includes(normalizedQuery)
      ).length
    )
  }, 0)

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
  }

  return (
    <section
      id="skills"
      ref={ref}
      className={`section section-surface reveal-section ${revealed ? 'is-revealed' : ''}`}
      aria-labelledby="skills-title"
    >
      <div className="container">
        <SectionHeading
          id="skills-title"
          eyebrow="Cybersecurity Arsenal &amp; Technical Matrix"
          title={<>Tools, protocols,<br />and defensive range.</>}
          description="A structured matrix of defensive tools, network protocols, system administration utilities, and scripting languages practiced through lab experimentation and coursework."
        />

        {activeSkills.length > 0 ? (
          <>
            {/* Interactive Arsenal Control Bar */}
            <div className="skills-toolbar">
              <div className="skills-toolbar-top flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Search Input Bar */}
                <div className="skills-search-wrapper">
                  <Search aria-hidden="true" size={15} className="skills-search-icon" />
                  <input
                    id={searchInputId}
                    type="search"
                    className="skills-search-input"
                    placeholder={`Search ${totalSkillsCount} tools, protocols, languages (e.g., Python, SIEM, Wireshark)...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search cybersecurity tools and skills"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="skills-search-clear"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search input"
                    >
                      <X size={14} aria-hidden="true" />
                    </button>
                  )}
                </div>

                {/* Status Indicator Pill */}
                <div className="skills-live-status" role="status" aria-live="polite">
                  <span className="skills-status-dot" aria-hidden="true" />
                  <span>
                    {searchQuery
                      ? `MATCHING: ${matchingSkillsCount} / ${totalSkillsCount} CAPABILITIES`
                      : `INDEXED: ${totalSkillsCount} VERIFIED CAPABILITIES`}
                  </span>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div
                className="skills-filter-bar flex flex-wrap gap-2 mt-4"
                role="tablist"
                aria-label="Filter skills by security category"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === 'All'}
                  className={`skills-filter-chip ${selectedCategory === 'All' ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory('All')}
                >
                  <span>All Arsenal</span>
                  <span className="skills-filter-count">[{totalSkillsCount}]</span>
                </button>
                {activeSkills.map((group) => {
                  const isSelected = selectedCategory === group.title
                  return (
                    <button
                      key={group.title}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      className={`skills-filter-chip ${isSelected ? 'is-active' : ''}`}
                      onClick={() => setSelectedCategory(group.title)}
                      onMouseEnter={() => setHoveredCategory(group.title)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <span>{group.title}</span>
                      <span className="skills-filter-count">[{group.items.length}]</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Technical Matrix Grid */}
            {visibleGroups.length > 0 ? (
              <div className="skill-grid mt-6">
                {visibleGroups.map((group, index) => {
                  const Icon = categoryIcons[group.title] ?? Shield
                  const isHighlighted = hoveredCategory === group.title
                  return (
                    <article
                      className={`skill-card stagger-card ${isHighlighted ? 'is-emphasized' : ''}`}
                      key={group.title}
                      style={{ '--stagger-index': index } as CSSProperties}
                    >
                      <div className="skill-card-top flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="skill-card-icon" aria-hidden="true">
                            <Icon size={18} />
                          </div>
                          <div>
                            <h3 className="skill-group-name">{group.title}</h3>
                          </div>
                        </div>
                        <span
                          className="skill-count-badge"
                          aria-label={`${group.items.length} capabilities`}
                        >
                          [{group.items.length < 10 ? `0${group.items.length}` : group.items.length}]
                        </span>
                      </div>
                      <ul className="skill-pill-list flex flex-wrap gap-2 mt-4" role="list">
                        {group.items.map((skill) => {
                          const isMatch = Boolean(
                            normalizedQuery && skill.toLowerCase().includes(normalizedQuery)
                          )
                          return (
                            <li
                              key={skill}
                              className={`skill-pill ${isMatch ? 'is-matching' : ''}`}
                            >
                              <span className="skill-pill-prefix" aria-hidden="true">&gt;</span>
                              <span className="skill-pill-text">{skill}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </article>
                  )
                })}
              </div>
            ) : (
              <div className="skills-empty-state">
                <p className="skills-empty-text">
                  No cybersecurity capabilities found matching &quot;{searchQuery}&quot;.
                </p>
                <button
                  type="button"
                  className="button button-small button-quiet mt-4"
                  onClick={handleResetFilters}
                >
                  Reset Arsenal Filters
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="honest-placeholder" style={{ marginTop: '36px' }}>
            <p>Skill entries will appear once verified through coursework and projects.</p>
          </div>
        )}
      </div>
    </section>
  )
}
