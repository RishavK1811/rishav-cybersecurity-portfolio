import { Terminal as TerminalIcon } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { Link } from 'react-router-dom'
import { certifications, profile, projects, skills } from '../data/portfolio'

interface TerminalLine {
  id: number
  type: 'input' | 'output' | 'error' | 'system' | 'link'
  content: string
  href?: string
}

const PROMPT = 'visitor@rishav-sec:~$ '
const QUICK_COMMANDS = ['whoami', 'skills', 'projects', 'certs', 'contact', 'clear'] as const

let lineCounter = 0
function nextId(): number {
  return ++lineCounter
}

function line(type: TerminalLine['type'], content: string, href?: string): TerminalLine {
  return { id: nextId(), type, content, href }
}

const INITIAL_LINES: TerminalLine[] = [
  line('system', 'Security Analyst Workstation · Interactive Portfolio Console'),
  line('system', 'Click any command pill below or type commands into the prompt.'),
  line('system', '──────────────────────────────────────────────────────────'),
]

export function Terminal() {
  const [history, setHistory] = useState<TerminalLine[]>(INITIAL_LINES)
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalBodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [history, scrollToBottom])

  const executeCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim()
    const cmd = trimmed.toLowerCase()

    if (!trimmed) {
      setHistory((prev) => [...prev, line('input', `${PROMPT}`)])
      return
    }

    setCommandHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    const inputLine = line('input', `${PROMPT}${trimmed}`)

    if (cmd === 'clear') {
      setHistory(INITIAL_LINES)
      return
    }

    let outputLines: TerminalLine[] = []

    if (cmd === 'help') {
      outputLines = [
        line('output', 'Interactive Recruiter & Engineer Directory:'),
        line('output', '  whoami     - Candidate overview, target roles & availability'),
        line('output', '  skills     - Verified offensive & defensive security tools'),
        line('output', '  projects   - Production tools & structured lab blueprints'),
        line('output', '  certs      - Verified certifications with external verify links'),
        line('output', '  contact    - Official email address and professional profiles'),
        line('output', '  clear      - Clear terminal screen history'),
        line('output', '  help       - Display available commands'),
      ]
    } else if (cmd === 'whoami') {
      outputLines = [
        line('output', `CANDIDATE   : ${profile.name} (${profile.shortName})`),
        line('output', `TARGET ROLE : SOC Analyst L1 · Junior Cybersecurity Analyst · Blue Team`),
        line('output', `ACADEMIC    : ${profile.academicStatus} · ${profile.institution}`),
        line('output', `LOCATION    : Patna, India (Open to Relocation & Remote Roles)`),
        line('output', `STATUS      : Available for Internships & Entry-Level Positions`),
        line('output', `DIRECT EMAIL: ${profile.email}`),
        line('link', `  → Email: ${profile.email}`, `mailto:${profile.email}`),
      ]
    } else if (cmd === 'skills') {
      const topSkills = skills.flatMap((g) => g.items).slice(0, 8).join(', ')
      outputLines = [
        line('output', 'VERIFIED CYBERSECURITY ARSENAL:'),
        line('output', '  • Defensive & SOC : Threat Intel, SIEM Triage, Event Logs, Hardening'),
        line('output', '  • Networking      : TCP/IP, CIDR Subnetting, Wireshark, DNS, TLS/SSL'),
        line('output', '  • Systems         : Linux (Debian/Kali), Windows Admin, Process Auditing'),
        line('output', '  • Scripting       : Python 3, Bash, SQL, Socket Programming'),
        line('system', `  Top indexed tools: ${topSkills}`),
      ]
    } else if (cmd === 'projects') {
      outputLines = [
        line('output', 'ACTIVE SECURITY TOOLING & LAB PROJECTS:'),
        ...projects.map((p, idx) =>
          line(
            'link',
            `  [${idx + 1}] ${p.title} (${p.category})`,
            `/projects/${p.slug}`
          )
        ),
        line('system', '  Click any project link above to open its full case study.'),
      ]
    } else if (cmd === 'certs' || cmd === 'certifications') {
      outputLines = [
        line('output', 'KEY INDUSTRY CERTIFICATIONS & CREDENTIALS:'),
        ...certifications.slice(0, 5).map((c) =>
          line(
            'link',
            `  • ${c.title} — ${c.issuer} (${c.issueDate || c.issued})`,
            c.credentialUrl || c.url || '#certifications'
          )
        ),
        line('system', '  Click any credential above to inspect verification.'),
      ]
    } else if (cmd === 'contact' || cmd === 'email') {
      outputLines = [
        line('output', 'OFFICIAL CONTACT & COORDINATES:'),
        line('output', `  • Direct Email : ${profile.email}`),
        line('link', `    → Open mail client: ${profile.email}`, `mailto:${profile.email}`),
        line('output', `  • LinkedIn     : ${profile.linkedin}`),
        line('link', `    → Visit LinkedIn Profile`, profile.linkedin),
        line('output', `  • GitHub       : ${profile.github}`),
        line('link', `    → Visit GitHub Profile`, profile.github),
        line('system', '  Click any link above to connect directly.'),
      ]
    } else {
      outputLines = [
        line(
          'error',
          `Command not found: "${trimmed}". Click one of the buttons below or type "help".`
        ),
      ]
    }

    setHistory((prev) => [...prev, inputLine, ...outputLines])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    executeCommand(input)
    setInput('')
  }

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInput(commandHistory[nextIndex] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(nextIndex)
        setInput(commandHistory[nextIndex] ?? '')
      }
    }
  }

  return (
    <div
      className="mini-terminal-wrapper bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-lg overflow-hidden shadow-2xl font-mono text-xs w-full"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Window Header */}
      <div className="terminal-header flex items-center justify-between px-3.5 py-2.5 bg-slate-950/80 border-b border-slate-800 select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/90 inline-block" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/90 inline-block" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-green-500/90 inline-block" aria-hidden="true" />
          <span className="terminal-title text-slate-400 font-semibold text-[11px] ml-1.5 flex items-center gap-1.5">
            <TerminalIcon size={12} className="text-emerald-400" aria-hidden="true" />
            workstation@rishav-sec:~$
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          <span>READY · INTERACTIVE</span>
        </div>
      </div>

      {/* Terminal Output Body - Fixed HUD height eliminates page layout shift */}
      <div
        ref={terminalBodyRef}
        className="terminal-hud terminal-body p-3.5 sm:p-4 min-h-[240px] max-h-[280px] overflow-y-auto space-y-1.5 text-slate-300 leading-relaxed scrollbar-thin"
        tabIndex={0}
        role="region"
        aria-label="Interactive cybersecurity terminal console"
      >
        {history.map((l) => {
          if (l.type === 'input') {
            return (
              <div key={l.id} className="text-emerald-400 font-semibold break-all">
                {l.content}
              </div>
            )
          }
          if (l.type === 'error') {
            return (
              <div key={l.id} className="text-rose-400 break-all">
                {l.content}
              </div>
            )
          }
          if (l.type === 'system') {
            return (
              <div key={l.id} className="text-slate-500 break-all text-[11px]">
                {l.content}
              </div>
            )
          }
          if (l.type === 'link' && l.href) {
            const isExternal = l.href.startsWith('http') || l.href.startsWith('mailto:')
            return (
              <div key={l.id} className="break-all">
                {isExternal ? (
                  <a
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-cyan-400 hover:text-cyan-300 hover:underline font-semibold"
                  >
                    {l.content} ↗
                  </a>
                ) : (
                  <Link
                    to={l.href}
                    className="text-cyan-400 hover:text-cyan-300 hover:underline font-semibold"
                  >
                    {l.content} ↗
                  </Link>
                )}
              </div>
            )
          }
          return (
            <div key={l.id} className="text-slate-300 whitespace-pre-wrap break-all">
              {l.content}
            </div>
          )
        })}
      </div>

      {/* Quick Click Command Pills for Non-Technical HRs */}
      <div className="terminal-chips flex flex-wrap items-center gap-1.5 px-3 py-2 bg-slate-950/60 border-t border-slate-800/80">
        <span className="text-[10px] text-slate-400 font-semibold uppercase mr-1 select-none">
          CLICK TO RUN:
        </span>
        {QUICK_COMMANDS.map((chip) => (
          <button
            key={chip}
            type="button"
            className="text-[10.5px] px-2 py-0.5 rounded bg-slate-800/90 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/60 transition-all font-mono font-semibold"
            onClick={(e) => {
              e.stopPropagation()
              executeCommand(chip)
              inputRef.current?.focus()
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Active Input Line */}
      <form
        onSubmit={handleSubmit}
        className="terminal-input-row flex items-center px-3.5 py-2.5 bg-slate-950/90 border-t border-slate-800"
      >
        <span className="text-emerald-400 font-semibold select-none mr-2 whitespace-nowrap">
          {PROMPT}
        </span>
        <div className="relative flex-1 flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-slate-100 outline-none font-mono text-base md:text-xs caret-transparent"
            autoComplete="off"
            spellCheck="false"
            aria-label="Terminal command line input"
          />
          {/* Custom Blinking Cursor Effect */}
          <span
            className="terminal-blinking-cursor inline-block w-2 h-3.5 bg-emerald-400 animate-pulse ml-0.5 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </form>
    </div>
  )
}
