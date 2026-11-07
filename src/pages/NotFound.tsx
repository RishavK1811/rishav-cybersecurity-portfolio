import { AlertTriangle, FolderGit2, Home, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { setNotFoundSeo } from '../utils/seo'

export function NotFound() {
  const location = useLocation()
  const [timestamp, setTimestamp] = useState<string>('')

  useEffect(() => {
    setTimestamp(new Date().toISOString())
    return setNotFoundSeo()
  }, [])

  return (
    <section className="page-section container not-found-page">
      <div className="diagnostic-terminal" role="alert" aria-live="assertive">
        {/* Terminal Titlebar */}
        <div className="diagnostic-header flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="terminal-dot terminal-dot-red" aria-hidden="true" />
            <span className="terminal-dot terminal-dot-yellow" aria-hidden="true" />
            <span className="terminal-dot terminal-dot-green" aria-hidden="true" />
            <span className="diagnostic-title ml-1">GATEWAY // PACKET_INSPECTION_FAILURE</span>
          </div>
          <div className="diagnostic-status-pill">
            <span className="diagnostic-status-dot" aria-hidden="true" />
            <span>DROP_RULE: ACTIVE</span>
          </div>
        </div>

        {/* Diagnostic Card Body */}
        <div className="diagnostic-body">
          {/* Terminal Alert Banner */}
          <div className="diagnostic-alert-banner">
            <AlertTriangle className="diagnostic-alert-icon" aria-hidden="true" size={24} />
            <div>
              <h1 className="diagnostic-alert-code">[!] ERROR 404: PACKET_DROPPED // ROUTE_UNREACHABLE</h1>
              <p className="diagnostic-alert-desc">
                The requested URL path failed packet routing inspection and does not resolve to an active endpoint.
              </p>
            </div>
          </div>

          {/* Monospace Diagnostic Log Block */}
          <div className="diagnostic-log-block">
            <div className="diagnostic-log-header flex items-center justify-between">
              <span>SYSTEM DIAGNOSTIC LOG</span>
              <span>PROTOCOL: HTTPS/TLS</span>
            </div>
            <pre className="diagnostic-log-content">
              <code>
                <span className="log-line"><span className="log-key">[TIMESTAMP]</span>       : {timestamp || '2026-11-07T13:45:00.000Z'}</span>{'\n'}
                <span className="log-line"><span className="log-key">[ATTEMPTED_ROUTE]</span>  : <span className="log-route">{location.pathname}</span></span>{'\n'}
                <span className="log-line"><span className="log-key">[STATUS_CODE]</span>      : <span className="log-error">404 NOT_FOUND</span></span>{'\n'}
                <span className="log-line"><span className="log-key">[GATEWAY_ACTION]</span>   : <span className="log-warn">SIG_DROP_PACKET</span></span>{'\n'}
                <span className="log-line"><span className="log-key">[DIAGNOSTIC_MSG]</span>   : Requested resource does not match any valid route table on this host.</span>{'\n'}
                <span className="log-line"><span className="log-key">[RECOMMENDATION]</span>   : Reroute execution to authenticated core index or verified security anchors.</span>
              </code>
            </pre>
          </div>

          {/* Action Row */}
          <div className="diagnostic-actions flex flex-wrap items-center gap-3">
            <Link className="button diagnostic-btn-primary" to="/" aria-label="Return to portfolio home">
              <Home aria-hidden="true" size={16} /> [ Return to Base (/) ]
            </Link>
            <Link className="button button-quiet" to="/#projects" aria-label="Browse verified cybersecurity projects">
              <FolderGit2 aria-hidden="true" size={16} /> Verified Projects
            </Link>
            <Link className="button button-quiet" to="/#contact" aria-label="Contact security analyst">
              <Mail aria-hidden="true" size={16} /> Contact Analyst
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
