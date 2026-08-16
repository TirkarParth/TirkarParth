type TechBadgeProps = {
  label: string
  className?: string
}

export function TechBadge({ label, className = '' }: TechBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/20 bg-white/[0.03] px-3 py-1 text-[10px] md:text-[11px] tracking-[0.14em] uppercase text-graphite-100 ${className}`}
    >
      {label}
    </span>
  )
}
