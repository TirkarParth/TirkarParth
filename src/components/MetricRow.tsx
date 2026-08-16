type MetricRowProps = {
  label: string
  value: string
}

export function MetricRow({ label, value }: MetricRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
      <span className="text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-graphite-400">
        {label}
      </span>
      <span className="text-right text-sm text-white font-medium">{value}</span>
    </div>
  )
}
