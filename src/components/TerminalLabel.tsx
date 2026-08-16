type TerminalLabelProps = {
  children: React.ReactNode
  className?: string
}

export function TerminalLabel({ children, className = '' }: TerminalLabelProps) {
  return (
    <p
      className={`text-[11px] md:text-xs tracking-[0.22em] uppercase text-accent/90 font-medium ${className}`}
    >
      <span className="text-accent/60 mr-1">//</span>
      {children}
    </p>
  )
}
