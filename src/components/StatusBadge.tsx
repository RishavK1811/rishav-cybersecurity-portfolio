type StatusBadgeProps = {
  statusText?: string
  className?: string
}

export function StatusBadge({
  statusText = 'Status: Online // SOC',
  className = '',
}: StatusBadgeProps) {
  return (
    <div
      className={`flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full w-fit ${className}`}
      role="status"
      aria-label={statusText}
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
      </span>
      <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
        {statusText}
      </span>
    </div>
  )
}
