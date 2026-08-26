import { architecturePillars } from '@/data/architecture'
import { Reveal } from '@/components/Reveal'
import { TechBadge } from '@/components/TechBadge'
import { useAppStore } from '@/store/useAppStore'

const accentBorder: Record<string, string> = {
  gold: 'accent-border-gold',
  cyan: 'accent-border-cyan',
  violet: 'accent-border-violet',
  mint: 'accent-border-mint',
}

export function Architecture() {
  const setCursor = useAppStore((s) => s.setCursor)

  return (
    <section id="architecture" className="relative section-pad py-section scroll-mt-[var(--header-clearance)]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-6">Systems</p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-display-lg font-light text-accent uppercase tracking-tight max-w-4xl">
            Architectural mastery.
            <br />
            Precision applied.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-graphite-300">
            Core pillars across frontend, backend, data, and creative systems—shaped through
            production delivery.
          </p>
        </Reveal>

        <div className="mt-14 md:mt-16 grid gap-5 md:gap-6 md:grid-cols-2">
          {architecturePillars.map((pillar, i) => (
            <Reveal key={pillar.id} delay={0.05 * i}>
              <article
                className={`terminal-panel group h-full p-6 md:p-8 ${accentBorder[pillar.accent]}`}
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={() => setCursor('default')}
              >
                <div className="relative z-[1] flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[11px] tracking-[0.22em] uppercase text-accent/80">
                      {pillar.label}
                    </p>
                    <span className="shrink-0 rounded-full border border-accent/40 px-3 py-1 text-[10px] tracking-[0.14em] uppercase text-accent">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl md:text-3xl font-semibold uppercase tracking-tight text-white group-hover:text-accent transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="mt-4 text-sm text-graphite-300 leading-relaxed flex-1">
                    {pillar.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {pillar.tags.map((tag) => (
                      <TechBadge key={tag} label={tag} />
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
