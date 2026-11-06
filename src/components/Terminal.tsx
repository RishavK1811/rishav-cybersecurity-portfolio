import { Maximize2, Minimize2, Terminal as TerminalIcon } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { profile, projects, skills, certifications } from '../data/portfolio'

interface TerminalLine {
  id: number
  type: 'input' | 'output' | 'error' | 'system' | 'link'
  content: string
  href?: string
}

const PROMPT = 'visitor@rishav-sec:~$ '
const MAX_HISTORY = 50

let lineIdCounter = 0
function nextId(): number {
  return ++lineIdCounter
}

function line(type: TerminalLine['type'], content: string, href?: string): TerminalLine {
  return { id: nextId(), type, content, href }
}

function lines(type: TerminalLine['type'], contents: string[]): TerminalLine[] {
  return contents.map((c) => line(type, c))
}

function cmdHelp(): TerminalLine[] {
  return lines('output', [
    '',
    '  Available commands:',
    '  ──────────────────────────────────────────────────────────',
    '  help             List all valid interactive commands',
    '  whoami           Display Rishav\'s cybersecurity analyst profile',
    '  skills           Print categorized offensive/defensive tools',
    '  projects         List active security projects with links',
    '  certs            Display verified security certifications & links',
    '  cat contact.txt  Show contact channels and social coordinates',
    '  download-cv      Trigger immediate resume/CV download',
    '  clear            Clear the terminal screen',
    '',
  ])
}

function cmdCerts(): TerminalLine[] {
  const output: TerminalLine[] = [
    line('output', ''),
    line('system', '  Verified Certifications & Credentials:'),
    line('output', '  ──────────────────────────────────────────────────────────'),
  ]

  for (const cert of certifications) {
    const dateStr = cert.issueDate ? ` (${cert.issueDate})` : ''
    output.push(line('output', `  ▸ ${cert.title}${dateStr}`))
    output.push(line('output', `    Issuer: ${cert.issuer}${cert.credentialId ? ` · ID: ${cert.credentialId}` : ''}`))
    const targetUrl = cert.credentialUrl || cert.url
    if (targetUrl) {
      output.push(line('link', `    → Verify: ${targetUrl}`, targetUrl))
    }
    output.push(line('output', ''))
  }

  return output
}

function cmdWhoami(): TerminalLine[] {
  return lines('output', [
    '',
    `  ╭─ Identity: ${profile.name} (${profile.shortName})`,
    `  │  Role    : ${profile.role}`,
    '  │',
    `  │  Academic: ${profile.academicStatus} (${profile.educationPeriod})`,
    `  │  Campus  : ${profile.institution}`,
    '  │',
    '  │  Focus   : Defensive Security · SOC Operations · Protocol Triage',
    '  │  Tooling : Python 3 · Linux (Debian/Kali) · SQL · Bash · Wireshark',
    '  │  Status  : Open to cybersecurity internships & entry analyst roles',
    '  ╰─────────────────────────────────────────────────────────',
    '',
  ])
}

function cmdSkills(): TerminalLine[] {
  const output: TerminalLine[] = [line('output', '')]
  for (const group of skills) {
    output.push(line('system', `  [${group.title}]`))
    output.push(line('output', `    ${group.items.join('  ·  ')}`))
    output.push(line('output', ''))
  }
  return output
}

function cmdProjects(): TerminalLine[] {
  const published = projects.filter(
    (p) =>
      !p.status.toLowerCase().includes('draft') &&
      !p.status.toLowerCase().includes('placeholder')
  )
  const drafts = projects.filter(
    (p) =>
      p.status.toLowerCase().includes('draft') ||
      p.status.toLowerCase().includes('placeholder')
  )

  const output: TerminalLine[] = [
    line('output', ''),
    line('system', '  Verified Security Projects:'),
    line('output', '  ──────────────────────────────────────────────────────────'),
  ]

  for (const p of published) {
    output.push(line('output', `  ▸ ${p.title} [${p.category}]`))
    output.push(line('output', `    ${p.summary}`))
    if (p.github) {
      output.push(line('link', `    → GitHub Repository: ${p.github}`, p.github))
    }
    output.push(line('output', ''))
  }

  if (drafts.length > 0) {
    output.push(line('output', `  In-Progress Labs (${drafts.length}): ${drafts.map((d) => d.title).join(', ')}`))
    output.push(line('output', ''))
  }

  return output
}

function cmdContact(): TerminalLine[] {
  const output: TerminalLine[] = [
    line('output', ''),
    line('system', '  ┌─ cat contact.txt'),
    line('output', '  │'),
  ]

  if (profile.email) {
    output.push(line('output', `  │  Email   : ${profile.email}`))
  } else {
    output.push(line('output', '  │  Email   : [Direct Web3Forms transmission form active below]'))
  }

  if (profile.github) {
    output.push(line('link', `  │  GitHub  : ${profile.github}`, profile.github))
  }
  if (profile.linkedin) {
    output.push(line('link', `  │  LinkedIn: ${profile.linkedin}`, profile.linkedin))
  }

  output.push(line('output', '  │'))
  output.push(line('system', '  └─────────────────────────────────────────────────────────'))
  output.push(line('output', ''))
  return output
}

function cmdDownloadCv(): TerminalLine[] {
  const resumeUrl = profile.resumePath || '/resume.pdf'
  const anchor = document.createElement('a')
  anchor.href = resumeUrl
  anchor.download = 'Rishav_Kumar_CV.pdf'
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)

  return lines('output', [
    '',
    '  [+] Executing: GET /resume.pdf -> Rishav_Kumar_CV.pdf',
    '  [+] Status: 200 OK (Packet stream received)',
    '  [+] Download initiated successfully. Check your browser downloads.',
    '',
  ])
}

function executeCommand(raw: string): TerminalLine[] {
  const trimmed = raw.trim()
  if (!trimmed) return []

  const lower = trimmed.toLowerCase()

  switch (lower) {
    case 'help':
      return cmdHelp()
    case 'whoami':
      return cmdWhoami()
    case 'skills':
      return cmdSkills()
    case 'projects':
      return cmdProjects()
    case 'certs':
    case 'certifications':
      return cmdCerts()
    case 'cat contact.txt':
      return cmdContact()
    case 'download-cv':
      return cmdDownloadCv()
    case 'clear':
      return []
    default:
      return [
        line('error', `command not found: ${trimmed}. Type 'help' for available commands.`),
      ]
  }
}

function getWelcomeBanner(): TerminalLine[] {
  return lines('system', [
    '╔══════════════════════════════════════════════════════════════════╗',
    '║  RISHAV-SEC KERNEL v5.19.0-defensive-amd64 (tty1)                ║',
    '║  Type "help" to view available security commands                 ║',
    '║  Try: whoami, skills, projects, certs, cat contact.txt, download-cv ║',
    '╚══════════════════════════════════════════════════════════════════╝',
    '',
  ])
}

export function Terminal() {
  const [history, setHistory] = useState<TerminalLine[]>(getWelcomeBanner)
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = useCallback(() => {
    const command = input.trim()
    const inputLine = line('input', `${PROMPT}${input}`)
    const newHistory = [...history, inputLine]

    if (command) {
      setCmdHistory((prev) => {
        const filtered = prev.filter((c) => c !== command)
        return [...filtered, command].slice(-MAX_HISTORY)
      })
    }

    if (command.toLowerCase() === 'clear') {
      setHistory([])
      setInput('')
      setHistoryIndex(-1)
      return
    }

    const output = executeCommand(command)
    setHistory([...newHistory, ...output])
    setInput('')
    setHistoryIndex(-1)
  }, [input, history])

  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSubmit()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (cmdHistory.length === 0) return
        const newIndex =
          historyIndex === -1
            ? cmdHistory.length - 1
            : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(cmdHistory[newIndex])
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (historyIndex === -1) return
        const newIndex = historyIndex + 1
        if (newIndex >= cmdHistory.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(cmdHistory[newIndex])
        }
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault()
        setHistory([])
      }
    },
    [handleSubmit, cmdHistory, historyIndex]
  )

  return (
    <section className="terminal-section container" aria-label="Interactive Cybersecurity Terminal">
      <div className="interactive-terminal">
        {/* Terminal Header Bar */}
        <div className="terminal-titlebar">
          <div className="terminal-titlebar-left flex items-center gap-3">
            <div className="terminal-titlebar-dots" aria-hidden="true">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
            </div>
            <span className="terminal-titlebar-text flex items-center gap-2">
              <TerminalIcon size={13} className="text-emerald-400" aria-hidden="true" />
              <span>visitor@rishav-sec: ~ (bash)</span>
            </span>
          </div>

          <div className="terminal-titlebar-actions">
            <button
              type="button"
              className="terminal-titlebar-btn"
              onClick={() => setIsCollapsed((c) => !c)}
              aria-label={isCollapsed ? 'Expand terminal' : 'Collapse terminal'}
              title={isCollapsed ? 'Expand terminal' : 'Collapse terminal'}
            >
              {isCollapsed ? <Maximize2 size={12} aria-hidden="true" /> : <Minimize2 size={12} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        {!isCollapsed && (
          <div
            ref={scrollRef}
            className="terminal-body"
            onClick={focusInput}
            role="log"
            aria-label="Terminal command execution output"
            aria-live="polite"
          >
            {history.map((entry) => (
              <div key={entry.id} className={`terminal-line terminal-line-${entry.type}`}>
                {entry.type === 'link' && entry.href ? (
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noreferrer"
                    className="terminal-link"
                  >
                    {entry.content}
                  </a>
                ) : (
                  <span>{entry.content}</span>
                )}
              </div>
            ))}

            {/* Prompt & Input Line */}
            <div className="terminal-input-line">
              <span className="terminal-prompt" aria-hidden="true">
                {PROMPT}
              </span>
              <input
                ref={inputRef}
                type="text"
                className="terminal-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                aria-label="Terminal command prompt"
                placeholder="type 'help' or command..."
              />
              <span className="terminal-cursor" aria-hidden="true" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// Alias export for versatility
export { Terminal as InteractiveTerminal }
