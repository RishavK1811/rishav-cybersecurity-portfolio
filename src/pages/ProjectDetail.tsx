import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock, Code2, FileCode2, Network, Shield } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import type { ReactNode } from 'react'
import { projects } from '../data/portfolio'

type CaseSectionProps = {
  num: string
  title: string
  id: string
  children: ReactNode
}

function CaseSection({ num, title, id, children }: CaseSectionProps) {
  return (
    <section className="case-section" aria-labelledby={id}>
      <div className="case-section-header">
        <span className="case-section-num">{num}</span>
        <h2 id={id}>{title}</h2>
      </div>
      <div className="case-section-body">{children}</div>
    </section>
  )
}

function isPlaceholderText(text: string): boolean {
  const trimmed = text.trim()
  if (!trimmed) return true
  const lower = trimmed.toLowerCase()
  return (
    lower.startsWith('replace') ||
    lower.startsWith('describe') ||
    lower.startsWith('document') ||
    lower.startsWith('explain') ||
    lower.startsWith('record') ||
    lower.startsWith('summarize') ||
    lower.startsWith('capture') ||
    lower.startsWith('define') ||
    lower.startsWith('clarify') ||
    lower.startsWith('list') ||
    lower.startsWith('state') ||
    lower.startsWith('add ') ||
    lower.startsWith('add\t') ||
    lower.startsWith('no results are published yet') ||
    lower.startsWith('awaiting') ||
    lower.startsWith('draft') ||
    lower.startsWith('todo') ||
    lower.startsWith('tbd') ||
    lower.includes('replace this with') ||
    lower.includes('add your real') ||
    lower.includes('editable project entry') ||
    lower.includes('editable record') ||
    lower.includes('editable entry') ||
    lower.includes('project details required') ||
    lower.includes('learning notes required')
  )
}

function getValidItems(items?: string[]): string[] {
  if (!items || !Array.isArray(items)) return []
  return items.filter((item) => typeof item === 'string' && !isPlaceholderText(item))
}

function isPlaceholder(value: unknown): boolean {
  if (!value) return true
  if (Array.isArray(value)) {
    if (value.length === 0) return true
    return value.every((item) => typeof item === 'string' && isPlaceholderText(item))
  }
  if (typeof value === 'string') {
    return isPlaceholderText(value)
  }
  return false
}

function PasswordSecurityCheckerPreview() {
  return (
    <div className="case-preview-card">
      <div className="case-preview-header flex items-center justify-between">
        <div className="preview-controls flex items-center gap-1.5">
          <span className="control-dot active" />
          <span className="control-dot" />
          <span className="control-dot" />
        </div>
        <span className="preview-session-tag">CLI Architecture · Rule Audit Flow</span>
        <span className="preview-pill">Python 3 · GitHub Verified</span>
      </div>

      <div className="case-preview-body">
        <div className="case-svg-wrap">
          <svg className="case-topology-svg" viewBox="0 0 520 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Password Security Checker Architecture Diagram">
            <defs>
              <pattern id="case-pass-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(181, 160, 242, 0.04)" strokeWidth="1" />
              </pattern>
              <radialGradient id="case-pass-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(181, 160, 242, 0.14)" />
                <stop offset="100%" stopColor="rgba(181, 160, 242, 0)" />
              </radialGradient>
            </defs>

            <rect width="520" height="220" fill="url(#case-pass-grid)" />
            <circle cx="240" cy="110" r="85" fill="url(#case-pass-glow)" />

            <circle cx="240" cy="110" r="85" stroke="rgba(181, 160, 242, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="240" cy="110" r="50" stroke="rgba(181, 160, 242, 0.08)" strokeWidth="1" />

            <path d="M 75 110 L 240 110" stroke="rgba(181, 160, 242, 0.45)" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M 240 110 L 375 60" stroke="rgba(181, 160, 242, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 240 110 L 375 160" stroke="rgba(181, 160, 242, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Input Node: User CLI */}
            <g transform="translate(75, 110)">
              <circle r="16" fill="#17161d" stroke="#b5a0f2" strokeWidth="1.5" />
              <circle r="5" fill="#b5a0f2" />
              <text x="0" y="-22" textAnchor="middle" fill="#f5f2f8" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">USER INPUT</text>
              <text x="0" y="27" textAnchor="middle" fill="#aaa4b5" fontSize="7.5" fontFamily="var(--font-mono)">main.py :: input()</text>
              <text x="0" y="37" textAnchor="middle" fill="#7d7888" fontSize="6.5" fontFamily="var(--font-mono)">RAW PASSWORD STR</text>
            </g>

            {/* Central Rules Engine */}
            <g transform="translate(240, 110)">
              <circle r="18" fill="#17161d" stroke="#b5a0f2" strokeWidth="2" />
              <circle r="6" fill="#b5a0f2" />
              <text x="0" y="-24" textAnchor="middle" fill="#f5f2f8" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="700">RULE AUDIT ENGINE</text>
              <text x="0" y="29" textAnchor="middle" fill="#aaa4b5" fontSize="8" fontFamily="var(--font-mono)">5 CRITERIA EVALUATION</text>
            </g>

            {/* Outcome A: Strong Password */}
            <g transform="translate(375, 60)">
              <rect x="0" y="-16" width="138" height="32" rx="4" fill="#17161d" stroke="rgba(181, 160, 242, 0.4)" strokeWidth="1" />
              <circle cx="10" cy="0" r="3.5" fill="#b5a0f2" />
              <text x="20" y="-3" fill="#f5f2f8" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">STRONG PASSWORD ✅</text>
              <text x="20" y="8" fill="#aaa4b5" fontSize="7" fontFamily="var(--font-mono)">ALL 5 CHECKS PASSED</text>
            </g>

            {/* Outcome B: Weak Password Feedback */}
            <g transform="translate(375, 160)">
              <rect x="0" y="-16" width="138" height="32" rx="4" fill="#17161d" stroke="rgba(181, 160, 242, 0.3)" strokeWidth="1" />
              <circle cx="10" cy="0" r="3.5" fill="#b5a0f2" />
              <text x="20" y="-3" fill="#f5f2f8" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">WEAK PASSWORD ❌</text>
              <text x="20" y="8" fill="#aaa4b5" fontSize="7" fontFamily="var(--font-mono)">MISSING RULES ENUMERATED</text>
            </g>
          </svg>
        </div>

        <div className="case-telemetry-grid">
          <div className="case-telemetry-item">
            <span className="item-label">RULE ENGINE</span>
            <span className="item-value">5 CRITERIA [LEN, CASE, NUM, SYM]</span>
          </div>
          <div className="case-telemetry-item">
            <span className="item-label">RUNTIME</span>
            <span className="item-value">PYTHON 3.x CLI SCRIPT</span>
          </div>
          <div className="case-telemetry-item">
            <span className="item-label">REPOSITORY</span>
            <span className="item-value">RishavK1811/Password-Security-Checker</span>
          </div>
        </div>
      </div>

      <div className="case-preview-footer flex items-center justify-between">
        <span>Password Security Checker · Verified Source Implementation</span>
        <span>GitHub Public Repository</span>
      </div>
    </div>
  )
}

function NetworkScannerPreview() {
  return (
    <div className="case-preview-card">
      <div className="case-preview-header flex items-center justify-between">
        <div className="preview-controls flex items-center gap-1.5">
          <span className="control-dot active" />
          <span className="control-dot" />
          <span className="control-dot" />
        </div>
        <span className="preview-session-tag">Target Discovery Topology</span>
        <span className="preview-pill">Sample Spec · Non-Executed</span>
      </div>

      <div className="case-preview-body">
        <div className="case-svg-wrap">
          <svg className="case-topology-svg" viewBox="0 0 520 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Network Scanner Concept Topology Diagram">
            <defs>
              <pattern id="case-topo-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(181, 160, 242, 0.04)" strokeWidth="1" />
              </pattern>
              <radialGradient id="case-topo-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(181, 160, 242, 0.14)" />
                <stop offset="100%" stopColor="rgba(181, 160, 242, 0)" />
              </radialGradient>
            </defs>

            {/* Grid Background */}
            <rect width="520" height="220" fill="url(#case-topo-grid)" />
            <circle cx="235" cy="110" r="85" fill="url(#case-topo-glow)" />

            {/* Radial Bus Rings */}
            <circle cx="235" cy="110" r="85" stroke="rgba(181, 160, 242, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="235" cy="110" r="50" stroke="rgba(181, 160, 242, 0.08)" strokeWidth="1" />

            {/* Trunk & Discovery Lines */}
            <path d="M 70 110 L 235 110" stroke="rgba(181, 160, 242, 0.45)" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M 235 110 L 365 48" stroke="rgba(181, 160, 242, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 235 110 L 365 110" stroke="rgba(181, 160, 242, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 235 110 L 365 172" stroke="rgba(181, 160, 242, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Scanner Host (Source) */}
            <g transform="translate(70, 110)">
              <circle r="16" fill="#17161d" stroke="#b5a0f2" strokeWidth="1.5" />
              <circle r="5" fill="#b5a0f2" />
              <text x="0" y="-22" textAnchor="middle" fill="#f5f2f8" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">SCANNER HOST</text>
              <text x="0" y="27" textAnchor="middle" fill="#aaa4b5" fontSize="7.5" fontFamily="var(--font-mono)">192.168.1.50 (ETH0)</text>
              <text x="0" y="37" textAnchor="middle" fill="#7d7888" fontSize="6.5" fontFamily="var(--font-mono)">SYN / TCP PROBE</text>
            </g>

            {/* Central Lab Gateway & Switch */}
            <g transform="translate(235, 110)">
              <circle r="18" fill="#17161d" stroke="#b5a0f2" strokeWidth="2" />
              <circle r="6" fill="#b5a0f2" />
              <text x="0" y="-24" textAnchor="middle" fill="#f5f2f8" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="700">LAB GATEWAY // FW-01</text>
              <text x="0" y="29" textAnchor="middle" fill="#aaa4b5" fontSize="8" fontFamily="var(--font-mono)">192.168.1.1 (TRUNK)</text>
            </g>

            {/* Target Node 01: Web Server */}
            <g transform="translate(365, 48)">
              <rect x="0" y="-16" width="138" height="32" rx="4" fill="#17161d" stroke="rgba(181, 160, 242, 0.3)" strokeWidth="1" />
              <circle cx="10" cy="0" r="3.5" fill="#b5a0f2" />
              <text x="20" y="-3" fill="#f5f2f8" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">HOST-01 // WEB-SRV</text>
              <text x="20" y="8" fill="#aaa4b5" fontSize="7" fontFamily="var(--font-mono)">192.168.1.10 · P: 22, 80</text>
            </g>

            {/* Target Node 02: Database */}
            <g transform="translate(365, 110)">
              <rect x="0" y="-16" width="138" height="32" rx="4" fill="#17161d" stroke="rgba(181, 160, 242, 0.3)" strokeWidth="1" />
              <circle cx="10" cy="0" r="3.5" fill="#b5a0f2" />
              <text x="20" y="-3" fill="#f5f2f8" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">HOST-02 // DB-INTERNAL</text>
              <text x="20" y="8" fill="#aaa4b5" fontSize="7" fontFamily="var(--font-mono)">192.168.1.25 · P: 5432</text>
            </g>

            {/* Target Node 03: Sandbox */}
            <g transform="translate(365, 172)">
              <rect x="0" y="-16" width="138" height="32" rx="4" fill="#17161d" stroke="rgba(181, 160, 242, 0.3)" strokeWidth="1" />
              <circle cx="10" cy="0" r="3.5" fill="#b5a0f2" />
              <text x="20" y="-3" fill="#f5f2f8" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">HOST-03 // SANDBOX</text>
              <text x="20" y="8" fill="#aaa4b5" fontSize="7" fontFamily="var(--font-mono)">192.168.1.80 · P: 8080</text>
            </g>
          </svg>
        </div>

        <div className="case-telemetry-grid">
          <div className="case-telemetry-item">
            <span className="item-label">SUBNET TARGET</span>
            <span className="item-value">192.168.1.0/24 (RFC 1918)</span>
          </div>
          <div className="case-telemetry-item">
            <span className="item-label">SCAN METHOD</span>
            <span className="item-value">TCP SYN / CONNECT [SPEC]</span>
          </div>
          <div className="case-telemetry-item">
            <span className="item-label">SAFETY ISOLATION</span>
            <span className="item-value">VIRTUAL BRIDGE ONLY</span>
          </div>
        </div>
      </div>

      <div className="case-preview-footer flex items-center justify-between">
        <span>Network Scanner Topology · Conceptual Model</span>
        <span>Authorized Lab Scope</span>
      </div>
    </div>
  )
}

function WebSecurityLabPreview() {
  return (
    <div className="case-preview-card">
      <div className="case-preview-header flex items-center justify-between">
        <div className="preview-controls flex items-center gap-1.5">
          <span className="control-dot active" />
          <span className="control-dot" />
          <span className="control-dot" />
        </div>
        <span className="preview-session-tag">Origin &amp; Defensive Headers Lab</span>
        <span className="preview-pill">Sample Spec · Non-Executed</span>
      </div>

      <div className="case-preview-body">
        <div className="case-svg-wrap">
          <svg className="case-topology-svg" viewBox="0 0 520 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Web Security Practice Lab Concept Diagram">
            <defs>
              <pattern id="case-web-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(181, 160, 242, 0.04)" strokeWidth="1" />
              </pattern>
              <radialGradient id="case-web-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(181, 160, 242, 0.14)" />
                <stop offset="100%" stopColor="rgba(181, 160, 242, 0)" />
              </radialGradient>
            </defs>

            <rect width="520" height="220" fill="url(#case-web-grid)" />
            <circle cx="240" cy="110" r="85" fill="url(#case-web-glow)" />

            <circle cx="240" cy="110" r="85" stroke="rgba(181, 160, 242, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="240" cy="110" r="50" stroke="rgba(181, 160, 242, 0.08)" strokeWidth="1" />

            <path d="M 75 110 L 240 110" stroke="rgba(181, 160, 242, 0.45)" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M 240 110 L 375 60" stroke="rgba(181, 160, 242, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 240 110 L 375 160" stroke="rgba(181, 160, 242, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Client Origin (Untrusted / Test) */}
            <g transform="translate(75, 110)">
              <circle r="16" fill="#17161d" stroke="#b5a0f2" strokeWidth="1.5" />
              <circle r="5" fill="#b5a0f2" />
              <text x="0" y="-22" textAnchor="middle" fill="#f5f2f8" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">CLIENT ORIGIN</text>
              <text x="0" y="27" textAnchor="middle" fill="#aaa4b5" fontSize="7.5" fontFamily="var(--font-mono)">https://untrusted.test</text>
              <text x="0" y="37" textAnchor="middle" fill="#7d7888" fontSize="6.5" fontFamily="var(--font-mono)">POST /api/transfer</text>
            </g>

            {/* Lab Security Proxy / Gateway */}
            <g transform="translate(240, 110)">
              <circle r="18" fill="#17161d" stroke="#b5a0f2" strokeWidth="2" />
              <circle r="6" fill="#b5a0f2" />
              <text x="0" y="-24" textAnchor="middle" fill="#f5f2f8" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="700">SEC-PROXY // GATEWAY</text>
              <text x="0" y="29" textAnchor="middle" fill="#aaa4b5" fontSize="8" fontFamily="var(--font-mono)">CORS &amp; ORIGIN VALIDATOR</text>
            </g>

            {/* Blocked Response: Origin Mismatch */}
            <g transform="translate(375, 60)">
              <rect x="0" y="-16" width="138" height="32" rx="4" fill="#17161d" stroke="rgba(181, 160, 242, 0.3)" strokeWidth="1" />
              <circle cx="10" cy="0" r="3.5" fill="#b5a0f2" />
              <text x="20" y="-3" fill="#f5f2f8" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">403 FORBIDDEN</text>
              <text x="20" y="8" fill="#aaa4b5" fontSize="7" fontFamily="var(--font-mono)">ORIGIN MISMATCH · NO CSRF</text>
            </g>

            {/* Sandbox App: Defensive Headers */}
            <g transform="translate(375, 160)">
              <rect x="0" y="-16" width="138" height="32" rx="4" fill="#17161d" stroke="rgba(181, 160, 242, 0.3)" strokeWidth="1" />
              <circle cx="10" cy="0" r="3.5" fill="#b5a0f2" />
              <text x="20" y="-3" fill="#f5f2f8" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">SANDBOX APP // SECURE</text>
              <text x="20" y="8" fill="#aaa4b5" fontSize="7" fontFamily="var(--font-mono)">CSP &apos;self&apos; · XFO DENY</text>
            </g>
          </svg>
        </div>

        <div className="case-telemetry-grid">
          <div className="case-telemetry-item">
            <span className="item-label">ORIGIN BOUNDARY</span>
            <span className="item-value">RESTRICTED SAME-ORIGIN [SPEC]</span>
          </div>
          <div className="case-telemetry-item">
            <span className="item-label">DEFENSIVE HEADERS</span>
            <span className="item-value">CSP + X-FRAME: DENY [SPEC]</span>
          </div>
          <div className="case-telemetry-item">
            <span className="item-label">SAFETY ISOLATION</span>
            <span className="item-value">LOCAL SANDBOX SUITE</span>
          </div>
        </div>
      </div>

      <div className="case-preview-footer flex items-center justify-between">
        <span>Web Security Lab · Conceptual Architecture</span>
        <span>Authorized Lab Scope</span>
      </div>
    </div>
  )
}

function SecurityLogAnalyzerPreview() {
  return (
    <div className="case-preview-card">
      <div className="case-preview-header flex items-center justify-between">
        <div className="preview-controls flex items-center gap-1.5">
          <span className="control-dot active" />
          <span className="control-dot" />
          <span className="control-dot" />
        </div>
        <span className="preview-session-tag">Log Anomaly Pipeline</span>
        <span className="preview-pill">Sample Spec · Non-Executed</span>
      </div>

      <div className="case-preview-body">
        <div className="case-svg-wrap">
          <svg className="case-topology-svg" viewBox="0 0 520 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Security Log Analyzer Concept Diagram">
            <defs>
              <pattern id="case-log-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(181, 160, 242, 0.04)" strokeWidth="1" />
              </pattern>
              <radialGradient id="case-log-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(181, 160, 242, 0.14)" />
                <stop offset="100%" stopColor="rgba(181, 160, 242, 0)" />
              </radialGradient>
            </defs>

            <rect width="520" height="220" fill="url(#case-log-grid)" />
            <circle cx="240" cy="110" r="85" fill="url(#case-log-glow)" />

            <circle cx="240" cy="110" r="85" stroke="rgba(181, 160, 242, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="240" cy="110" r="50" stroke="rgba(181, 160, 242, 0.08)" strokeWidth="1" />

            <path d="M 75 110 L 240 110" stroke="rgba(181, 160, 242, 0.45)" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M 240 110 L 375 60" stroke="rgba(181, 160, 242, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 240 110 L 375 160" stroke="rgba(181, 160, 242, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Log Source (Raw Input) */}
            <g transform="translate(75, 110)">
              <circle r="16" fill="#17161d" stroke="#b5a0f2" strokeWidth="1.5" />
              <circle r="5" fill="#b5a0f2" />
              <text x="0" y="-22" textAnchor="middle" fill="#f5f2f8" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">LOG SOURCE</text>
              <text x="0" y="27" textAnchor="middle" fill="#aaa4b5" fontSize="7.5" fontFamily="var(--font-mono)">/var/log/auth.log</text>
              <text x="0" y="37" textAnchor="middle" fill="#7d7888" fontSize="6.5" fontFamily="var(--font-mono)">RFC 5424 STREAM</text>
            </g>

            {/* Parser & Normalizer Engine */}
            <g transform="translate(240, 110)">
              <circle r="18" fill="#17161d" stroke="#b5a0f2" strokeWidth="2" />
              <circle r="6" fill="#b5a0f2" />
              <text x="0" y="-24" textAnchor="middle" fill="#f5f2f8" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="700">PARSER // ENGINE</text>
              <text x="0" y="29" textAnchor="middle" fill="#aaa4b5" fontSize="8" fontFamily="var(--font-mono)">REGEX &amp; TIMESTAMP INDEX</text>
            </g>

            {/* Anomaly Detection Trigger */}
            <g transform="translate(375, 60)">
              <rect x="0" y="-16" width="138" height="32" rx="4" fill="#17161d" stroke="rgba(181, 160, 242, 0.3)" strokeWidth="1" />
              <circle cx="10" cy="0" r="3.5" fill="#b5a0f2" />
              <text x="20" y="-3" fill="#f5f2f8" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">SPIKE TRIGGER</text>
              <text x="20" y="8" fill="#aaa4b5" fontSize="7" fontFamily="var(--font-mono)">5 FAILS / 30S WINDOW</text>
            </g>

            {/* Event Sink Output */}
            <g transform="translate(375, 160)">
              <rect x="0" y="-16" width="138" height="32" rx="4" fill="#17161d" stroke="rgba(181, 160, 242, 0.3)" strokeWidth="1" />
              <circle cx="10" cy="0" r="3.5" fill="#b5a0f2" />
              <text x="20" y="-3" fill="#f5f2f8" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">EVENT SINK // ALERTS</text>
              <text x="20" y="8" fill="#aaa4b5" fontSize="7" fontFamily="var(--font-mono)">AUTH_FAIL AGGREGATED</text>
            </g>
          </svg>
        </div>

        <div className="case-telemetry-grid">
          <div className="case-telemetry-item">
            <span className="item-label">PARSER SPEC</span>
            <span className="item-value">RFC 5424 / LINUX AUTH [SPEC]</span>
          </div>
          <div className="case-telemetry-item">
            <span className="item-label">ALERT THRESHOLD</span>
            <span className="item-value">BURST 5 ATTEMPTS / 30s</span>
          </div>
          <div className="case-telemetry-item">
            <span className="item-label">SAFETY ISOLATION</span>
            <span className="item-value">ISOLATED SYNTHETIC LOG</span>
          </div>
        </div>
      </div>

      <div className="case-preview-footer flex items-center justify-between">
        <span>Security Log Analyzer · Conceptual Pipeline</span>
        <span>Authorized Lab Scope</span>
      </div>
    </div>
  )
}

export function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((entry) => entry.slug === slug)

  if (!project) {
    return (
      <section className="page-section container empty-page">
        <p className="eyebrow">Project not found</p>
        <h1>This case study doesn&apos;t exist.</h1>
        <Link className="button" to="/#projects"><ArrowLeft aria-hidden="true" size={18} /> Back to projects</Link>
      </section>
    )
  }

  const hasRealProblem = !isPlaceholder(project.problem)
  const hasRealObjective = !isPlaceholder(project.objective)
  const validApproach = getValidItems(project.approach)
  const hasRealApproach = validApproach.length > 0
  const validTools = getValidItems(project.tools)
  const hasRealTools = validTools.length > 0
  const hasRealImplementation = !isPlaceholder(project.implementation)
  const hasRealTesting = !isPlaceholder(project.testing)
  const hasRealChallenges = !isPlaceholder(project.challenges)
  const hasRealLimitations = !isPlaceholder(project.limitations)
  const validScreenshots = project.screenshots?.filter((s) => s.src && !isPlaceholderText(s.src)) ?? []
  const hasRealScreenshots = validScreenshots.length > 0

  const hasAnyRealDetails =
    hasRealProblem ||
    hasRealObjective ||
    hasRealApproach ||
    hasRealTools ||
    hasRealImplementation ||
    hasRealTesting ||
    hasRealChallenges ||
    hasRealLimitations ||
    hasRealScreenshots

  const sections: { id: string; title: string; content: ReactNode }[] = [
    {
      id: 'section-overview',
      title: 'Overview',
      content: <p>{project.summary}</p>,
    },
  ]

  if (hasRealProblem) {
    sections.push({
      id: 'section-problem',
      title: 'Problem statement',
      content: <p>{project.problem}</p>,
    })
  }

  if (hasRealObjective) {
    sections.push({
      id: 'section-objective',
      title: 'Objective',
      content: <p>{project.objective}</p>,
    })
  }

  if (hasRealApproach) {
    sections.push({
      id: 'section-approach',
      title: 'Technical approach',
      content: (
        <ol className="approach-list">
          {validApproach.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      ),
    })
  }

  if (hasRealTools) {
    sections.push({
      id: 'section-tools',
      title: 'Tools used',
      content: (
        <ul className="tag-list flex flex-wrap gap-2">
          {validTools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      ),
    })
  }

  if (hasRealImplementation) {
    sections.push({
      id: 'section-implementation',
      title: 'Implementation details',
      content: <p>{project.implementation}</p>,
    })
  }

  if (hasRealTesting) {
    sections.push({
      id: 'section-testing',
      title: 'Testing and results',
      content: <p>{project.testing}</p>,
    })
  }

  if (hasRealChallenges) {
    sections.push({
      id: 'section-challenges',
      title: 'Challenges and lessons learned',
      content: <p>{project.challenges}</p>,
    })
  }

  if (hasRealLimitations) {
    sections.push({
      id: 'section-limitations',
      title: 'Limitations',
      content: <p>{project.limitations}</p>,
    })
  }

  if (hasRealScreenshots) {
    sections.push({
      id: 'section-screenshots',
      title: 'Screenshots',
      content: (
        <div className="screenshot-grid">
          {validScreenshots.map((image) => (
            <img key={image.src} src={image.src} alt={image.alt} />
          ))}
        </div>
      ),
    })
  }

  const scopeBadgeText =
    project.slug === 'password-security-checker'
      ? 'GITHUB REPO VERIFIED'
      : project.slug === 'web-security-practice-lab'
      ? 'CONTROLLED SANDBOX ONLY'
      : project.slug === 'security-log-analyzer'
      ? 'LOCAL LOG HARNESS ONLY'
      : 'RFC 1918 LAB CONFINED'

  const scopeMetadataText =
    project.slug === 'password-security-checker'
      ? 'Local CLI & Public GitHub Repository'
      : project.slug === 'web-security-practice-lab'
      ? 'Local Sandbox Environment'
      : project.slug === 'security-log-analyzer'
      ? 'Local Synthetic Log Files'
      : 'Authorized Lab Context'

  return (
    <article className="case-study">
      {/* 1. Balanced Two-Column Hero */}
      <header className="case-hero container">
        <div className="case-hero-grid">
          <div className="case-hero-content flex flex-col justify-center">
            <Link className="back-link flex items-center gap-2" to="/#projects">
              <ArrowLeft aria-hidden="true" size={16} /> All projects
            </Link>
            <span className="case-eyebrow">{project.category}</span>
            <h1 className="case-title">{project.title}</h1>
            <p className="case-lead">{project.summary}</p>
            <div className="case-status-row flex flex-wrap items-center gap-3 mt-5">
              <span className="case-status-pill">{project.status}</span>
              <span className="case-scope-tag">{scopeBadgeText}</span>
            </div>
            {(project.github || project.demo) && (
              <div className="case-actions flex flex-wrap items-center gap-3 mt-6">
                {project.github && (
                  <a className="button button-quiet" href={project.github} target="_blank" rel="noreferrer">
                    <Code2 aria-hidden="true" size={17} /> Repository
                  </a>
                )}
                {project.demo && (
                  <a className="button button-quiet" href={project.demo} target="_blank" rel="noreferrer">
                    <ArrowUpRight aria-hidden="true" size={17} /> Demo or docs
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="case-hero-preview">
            {project.slug === 'password-security-checker' ? (
              <PasswordSecurityCheckerPreview />
            ) : project.slug === 'web-security-practice-lab' ? (
              <WebSecurityLabPreview />
            ) : project.slug === 'security-log-analyzer' ? (
              <SecurityLogAnalyzerPreview />
            ) : (
              <NetworkScannerPreview />
            )}
          </div>
        </div>
      </header>

      {/* 2. Compact Glass Card Metadata Ribbon */}
      <div className="case-metadata-grid container">
        <div className="case-meta-card">
          <div className="meta-card-head flex items-center gap-2">
            <Clock aria-hidden="true" size={14} className="meta-icon" />
            <span className="meta-label">STATUS</span>
          </div>
          <span className="meta-value">{project.status}</span>
        </div>
        <div className="case-meta-card">
          <div className="meta-card-head flex items-center gap-2">
            <Shield aria-hidden="true" size={14} className="meta-icon" />
            <span className="meta-label">DISCIPLINE</span>
          </div>
          <span className="meta-value">{project.category}</span>
        </div>
        <div className="case-meta-card">
          <div className="meta-card-head flex items-center gap-2">
            <Network aria-hidden="true" size={14} className="meta-icon" />
            <span className="meta-label">TARGET SCOPE</span>
          </div>
          <span className="meta-value">{scopeMetadataText}</span>
        </div>
        <div className="case-meta-card">
          <div className="meta-card-head flex items-center gap-2">
            <CheckCircle2 aria-hidden="true" size={14} className="meta-icon" />
            <span className="meta-label">EVIDENCE POLICY</span>
          </div>
          <span className="meta-value">Zero Fabricated Claims</span>
        </div>
      </div>

      {/* 3. Case Content Sections */}
      <div className="case-content container">
        {sections.map((sec, index) => (
          <CaseSection
            key={sec.id}
            num={String(index + 1).padStart(2, '0')}
            title={sec.title}
            id={sec.id}
          >
            {sec.content}
          </CaseSection>
        ))}

        {/* 4. Single Professional "Documentation in progress" Card for Draft Projects */}
        {!hasAnyRealDetails && (
          <div className="case-progress-notice" role="status">
            <div className="progress-notice-header flex items-center gap-3">
              <div className="notice-icon-box">
                <FileCode2 aria-hidden="true" size={20} />
              </div>
              <div>
                <h3>Documentation in progress</h3>
                <span className="notice-sub">Awaiting verified lab execution &amp; source publication</span>
              </div>
            </div>
            <div className="progress-notice-body">
              <p>
                Technical specifications, architecture diagrams, implementation code, and verified testing notes for this project are currently in progress within an authorized lab environment.
              </p>
              <p className="progress-notice-subtext">
                In strict adherence to ethical security practice, full case-study sections (problem statement, technical approach, implementation details, and scan telemetry) are published only after repeatable testing is completed and verified against authorized targets.
              </p>
              <div className="progress-notice-tags flex flex-wrap gap-2 mt-4">
                <span className="notice-tag">STATUS: {project.status.toUpperCase()}</span>
                <span className="notice-tag">DISCLOSURE: ZERO FABRICATED DATA</span>
                <span className="notice-tag">SCOPE: AUTHORIZED LAB TARGETS ONLY</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container case-back">
        <Link className="button button-quiet" to="/#projects">
          <ArrowLeft aria-hidden="true" size={18} /> Back to all projects
        </Link>
      </div>
    </article>
  )
}
