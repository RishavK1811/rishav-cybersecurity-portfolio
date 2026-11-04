export type ProfileLink = {
  label: string
  url: string
  kind: 'github' | 'linkedin' | 'email'
  opensInNewTab: boolean
}

export type Project = {
  slug: string
  title: string
  category: string
  summary: string
  problem: string
  objective: string
  approach: string[]
  tools: string[]
  implementation: string
  testing: string
  challenges: string
  limitations: string
  status: string
  github?: string
  demo?: string
  screenshots?: { alt: string; src: string }[]
}

export type SkillGroup = {
  title: string
  items: string[]
}

export type Certification = {
  title: string
  issuer: string
  issued?: string
  credentialId?: string
  url?: string
  status: 'completed' | 'in-progress'
}

export const profile = {
  name: 'Rishav Kumar',
  shortName: 'RK',
  role: 'BCA Student | Aspiring SOC Analyst | Defensive Security Enthusiast',
  statusMessage: 'Open to internship opportunities',
  academicStatus: 'BCA Student',
  institution: 'CIMAGE Group of Institutions, Patna',
  educationPeriod: '2025–2028',
  portfolioPeriod: 'Cybersecurity & Systems Portfolio',
  intro:
    "I'm a BCA student (2025–2028) at CIMAGE Group of Institutions, Patna, focused on cybersecurity, blue teaming, and defensive software development. I build practical tools with Python, study network fundamentals, and explore SOC workflows and CTF labs with an attacker mindset to build stronger defenses.",
  about:
    'I am an aspiring cybersecurity analyst and BCA student at CIMAGE Group of Institutions, Patna (2025–2028), specializing in defensive security, SOC operations, and security automation. My hands-on focus centers on Python scripting, Linux systems, networking protocols, SQL, and practical labs across TryHackMe and CTF environments. I believe in learning by building verifiable utilities, understanding how protocols function from first principles, and preparing for entry-level security analyst and internship opportunities.',
  email: '',
  github: 'https://github.com/RishavK1811',
  linkedin: 'https://www.linkedin.com/in/rishav-kumar-317134368/',
  resumePath: '',
} as const

// Verified competencies across coursework, projects, and active lab study
export const skills: SkillGroup[] = [
  {
    title: 'Programming & Scripting',
    items: ['Python 3', 'SQL basics', 'C / C++', 'Bash Scripting', 'Git & GitHub'],
  },
  {
    title: 'Networking & Protocols',
    items: ['TCP/IP Model', 'Subnetting & CIDR', 'DNS / DHCP', 'HTTP/S & TLS Basics', 'Socket Programming'],
  },
  {
    title: 'Systems & Administration',
    items: ['Linux (Debian / Kali)', 'CLI Utilities', 'Process & Service Auditing', 'Windows Administration'],
  },
  {
    title: 'Defensive Security & SOC',
    items: ['SOC Fundamentals', 'SIEM Concepts', 'Log Audit & Event Parsing', 'OWASP Core Concepts', 'Defensive Hardening'],
  },
  {
    title: 'Tools & Utilities',
    items: ['Wireshark', 'VS Code', 'Git / GitHub', 'Linux CLI Utilities', 'Nmap (Lab)'],
  },
  {
    title: 'Active Learning & Practice',
    items: ['TryHackMe Learning Paths', 'CTF Challenges', 'Python Security Automation', 'Rule-Based Password Auditing'],
  },
]

// Project catalog: Verified repositories alongside clearly marked lab drafts
export const projects: Project[] = [
  {
    slug: 'password-security-checker',
    title: 'Password Security Checker',
    category: 'Security Tooling · Python',
    summary:
      'A lightweight Python command-line utility that evaluates passwords against five configurable character-composition and length requirements, then provides feedback on unmet rules.',
    problem:
      'Users frequently configure passwords that fail basic length and character-diversity standards without clear visibility into which specific policy criteria were missed. While simple composition rules do not evaluate guessability or protect against dictionary or credential-stuffing attacks, enforcing baseline complexity checks serves as a practical introduction to input validation and defensive credential policy principles.',
    objective:
      'Develop an accessible, standalone Python CLI utility that evaluates user-submitted passwords against five fundamental composition rules (length, uppercase, lowercase, numeric digits, and special characters) and outputs clear, actionable terminal feedback indicating which specific criteria were unmet.',
    approach: [
      'Validate input presence and enforce a minimum length threshold of 8 characters.',
      'Check character diversity for uppercase and lowercase alphabetical letters.',
      'Verify the presence of numeric digits (0–9).',
      'Check for special symbols against a defined character set (!@#$%^&*()-_=+[]{}|;:\',.<>?/`~).',
      'Report whether the input meets all basic rules and enumerate specific unmet requirements for remediation.',
    ],
    tools: ['Python 3', 'VS Code', 'Git', 'CLI'],
    implementation:
      'Built with Python 3 as an interactive CLI script (main.py). The utility receives user input, validates against empty strings, evaluates character classes through sequential condition parsing (isupper, islower, isdigit, and membership within a configured special-character lookup string), and renders immediate terminal diagnostics indicating which of the five basic policy rules passed or failed.',
    testing:
      'Tested locally against structured test cases: empty input, strings below minimum length (< 8 characters), single-class strings (alphabetic-only, numeric-only), and inputs satisfying all five configured rules. Verified that the output accurately reports compliance status and lists exact missing criteria.',
    challenges:
      'Structuring sequential character-parsing checks clearly in standard Python while keeping terminal diagnostics informative and unambiguous about which specific policy criteria failed without confusing basic rule compliance with comprehensive security validation.',
    limitations:
      'Rule-based policy validation only. Meeting all five rules does not guarantee that a password is cryptographically secure or resistant to dictionary attacks (e.g., common pattern substitutions). The utility does not calculate mathematical entropy, estimate guessability, check against breach databases such as HaveIBeenPwned, or generate secure passwords. These capabilities are documented as potential future learning milestones.',
    status: 'Version 1 · Implemented',
    github: 'https://github.com/RishavK1811/Password-Security-Checker',
  },
  {
    slug: 'network-scanner',
    title: 'Network Scanner',
    category: 'Security tooling · Draft',
    summary: 'A structured project entry for a network discovery and service enumeration utility designed for authorized virtual lab environments.',
    problem: 'Replace this with the real user or technical problem addressed by your project.',
    objective: 'Describe the safe, authorized goal and the scope of the work.',
    approach: ['Document the target environment and authorized scope.', 'Describe discovery logic and data handling.', 'Explain the output in plain language.'],
    tools: [],
    implementation: 'Add your real implementation details, design decisions, and relevant code links.',
    testing: 'No results are published yet. Replace this with actual test conditions and observed outcomes.',
    challenges: 'Document a real technical challenge and what you learned while resolving it.',
    limitations: 'State known limitations, assumptions, and next steps honestly.',
    status: 'Draft — project details required',
  },
  {
    slug: 'security-log-analyzer',
    title: 'Security Log Analyzer',
    category: 'Security tooling · Draft',
    summary: 'A structured project entry for an event parsing utility designed to inspect authentication failures and anomaly spikes in system logs.',
    problem: 'Replace this with the real problem your tool helped you investigate.',
    objective: 'Describe what the analyzer accepts, produces, and deliberately does not do.',
    approach: ['Define supported log formats.', 'Explain parsing or filtering rules.', 'Describe how findings are presented and verified.'],
    tools: [],
    implementation: 'Add the actual architecture, functions, and safeguards used in your implementation.',
    testing: 'No results are published yet. Add actual testing notes before sharing this page.',
    challenges: 'Add a genuine lesson about inconsistent data, false positives, or usability.',
    limitations: 'Explain coverage gaps, assumptions, and responsible-use boundaries.',
    status: 'Draft — project details required',
  },
  {
    slug: 'web-security-practice-lab',
    title: 'Web Security Practice Lab',
    category: 'Learning environment · Draft',
    summary: 'A structured record of controlled web security experiments focused on request validation, defensive HTTP headers, and origin boundaries.',
    problem: 'Describe the deliberately vulnerable practice environment or learning question.',
    objective: 'Clarify the authorized learning objective and responsible boundaries.',
    approach: ['Record the controlled environment.', 'Summarize the defensive concept explored.', 'Capture remediation or prevention notes.'],
    tools: [],
    implementation: 'Add only the implementation details appropriate to an authorized practice setting.',
    testing: 'No results are published yet. Summarize real observations and remediation validation.',
    challenges: 'Add an authentic learning challenge and the concept it clarified.',
    limitations: 'List what the exercise does not demonstrate in a production setting.',
    status: 'Draft — learning notes required',
  },
]

export const journey = [
  {
    label: '2025–2028',
    title: 'BCA Studies · CIMAGE Group of Institutions, Patna',
    text: 'Building a rigorous computing foundation with structured study in computer applications, programming, database systems, and software fundamentals.',
  },
  {
    label: 'In progress',
    title: 'Defensive Security & Practical Tooling',
    text: 'Developing hands-on skills in Python security automation, Linux administration, networking fundamentals, SOC workflows, and TryHackMe rooms.',
  },
  {
    label: 'Next',
    title: 'Cybersecurity Internship / SOC Analyst Opportunity',
    text: 'Seeking an internship or entry role in cybersecurity, SOC operations, or software development where disciplined execution and continuous learning can support defensive operations.',
  },
]

// Genuine verified certifications from publicly indexed profile records
export const certifications: Certification[] = [
  {
    title: 'Foundations of Cybersecurity',
    issuer: 'Google (Coursera)',
    issued: 'April 2026',
    credentialId: 'N5VCSYWNT9ED',
    url: 'https://www.coursera.org/account/accomplishments/verify/N5VCSYWNT9ED',
    status: 'completed',
  },
  {
    title: 'Pre Security Certificate',
    issuer: 'TryHackMe',
    issued: 'May 2026',
    status: 'completed',
  },
  {
    title: 'AI Masterclass – Google for Education AI Implementation Program 2026',
    issuer: 'upEducators',
    issued: 'April 2026',
    status: 'completed',
  },
]

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export function configuredProfileLinks(): ProfileLink[] {
  const links: ProfileLink[] = []

  if (profile.github) links.push({ label: 'GitHub', url: profile.github, kind: 'github', opensInNewTab: true })
  if (profile.linkedin) links.push({ label: 'LinkedIn', url: profile.linkedin, kind: 'linkedin', opensInNewTab: true })
  if (profile.email) links.push({ label: 'Email', url: `mailto:${profile.email}`, kind: 'email', opensInNewTab: false })

  return links
}

export function homeHashHref(pathname: string, hash: string) {
  return pathname === '/' ? hash : `/${hash}`
}
