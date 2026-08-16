import { experiences } from '@/data/experience'
import { Reveal } from '@/components/Reveal'
import { TechBadge } from '@/components/TechBadge'
import { useAppStore } from '@/store/useAppStore'

export function Journey() {
  const setCursor = useAppStore((s) => s.setCursor)

  return (
    <section id="journey" className="relative section-pad py-section">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-6">Journey</p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-display-lg font-light text-accent uppercase tracking-tight max-w-4xl">
            Experience &amp; milestones
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-graphite-300">
            A vertical path from foundations to creative development—anchored in real projects and
            production workflows.
          </p>
        </Reveal>

        <div className="relative mt-16 md:mt-20">
          {/* Vertical timeline line */}
          <div
            className="timeline-line absolute left-[4.5rem] md:left-[7.5rem] top-2 bottom-2 w-px"
            aria-hidden
          />

          <ol className="space-y-12 md:space-y-16">
            {experiences.map((item, i) => (
              <li key={item.id}>
                <Reveal delay={0.04 * i}>
                  <article
                    className="grid grid-cols-[4.5rem_1fr] md:grid-cols-[7.5rem_1fr] gap-5 md:gap-10 items-start"
                    onMouseEnter={() => setCursor('link')}
                    onMouseLeave={() => setCursor('default')}
                  >
                    <div className="relative pt-1 text-right pr-5 md:pr-8">
                      <p className="text-[10px] md:text-xs tracking-[0.18em] uppercase text-accent font-medium leading-snug">
                        {item.period}
                      </p>
                      <span
                        className="timeline-node absolute right-[-3px] md:right-[-4px] top-2 h-2.5 w-2.5 rounded-full bg-accent"
                        aria-hidden
                      />
                    </div>

                    <div className="terminal-panel p-5 md:p-7">
                      <div className="relative z-[1]">
                        <h3 className="font-display text-xl md:text-3xl font-semibold uppercase tracking-tight text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs md:text-sm tracking-[0.16em] uppercase text-accent">
                          {item.org}
                        </p>
                        <p className="mt-4 text-sm md:text-base text-graphite-300 leading-relaxed max-w-2xl">
                          {item.text}
                        </p>
                        {item.tags && (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <TechBadge key={tag} label={tag} />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
