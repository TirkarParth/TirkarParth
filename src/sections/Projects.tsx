import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, getProjectMeta, type Project } from '@/data/content'
import { Reveal } from '@/components/Reveal'
import { TerminalLabel } from '@/components/TerminalLabel'
import { TechBadge } from '@/components/TechBadge'
import { MetricRow } from '@/components/MetricRow'
import { useAppStore } from '@/store/useAppStore'

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({
  project,
  onOpen,
  index,
  total,
}: {
  project: Project
  onOpen: (p: Project) => void
  index: number
  total: number
}) {
  const slotRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const setCursor = useAppStore((s) => s.setCursor)
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const meta = getProjectMeta(project)
  const primaryLink = project.liveUrl || project.githubUrl

  useEffect(() => {
    const slot = slotRef.current
    const panel = panelRef.current
    if (!slot || !panel || reducedMotion || index === total - 1) return

    const tween = gsap.fromTo(
      panel,
      { scale: 1, filter: 'brightness(1)' },
      {
        scale: 0.94,
        filter: 'brightness(0.72)',
        ease: 'none',
        transformOrigin: 'center top',
        scrollTrigger: {
          trigger: slot,
          start: 'top 6.25rem',
          end: 'bottom 6.25rem',
          scrub: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reducedMotion, index, total])

  return (
    <div
      ref={slotRef}
      className="project-stack-slot"
      style={{ zIndex: index + 1 }}
    >
      <div
        className="project-stack-pin"
        style={{ top: `calc(5.75rem + ${index * 14}px)` }}
      >
        <article
          ref={panelRef}
          className="terminal-panel terminal-panel-glow relative w-full p-5 md:p-8 lg:p-10 will-change-transform"
        >
          <div className="relative z-[1] grid lg:grid-cols-12 gap-8 lg:gap-10">
            <div className="lg:col-span-7 flex flex-col">
              <TerminalLabel className="mb-4">
                {project.number} {meta.category}
              </TerminalLabel>

              <h3 className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight uppercase text-accent leading-[1.05]">
                {project.title}
              </h3>

              <p className="mt-5 max-w-2xl text-sm md:text-base text-graphite-200 leading-relaxed">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} label={tech} />
                ))}
              </div>

              <div
                className="mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-graphite-900 cursor-pointer group"
                onClick={() => onOpen(project)}
                onMouseEnter={() => setCursor('view')}
                onMouseLeave={() => setCursor('default')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onOpen(project)
                }}
                aria-label={`Open ${project.title}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                />
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col">
              <TerminalLabel className="mb-4">Architecture Metrics</TerminalLabel>

              <div className="rounded-xl border border-white/10 bg-black/25 px-4 md:px-5">
                {meta.metrics.map((metric) => (
                  <MetricRow key={`${metric.label}-${metric.value}`} label={metric.label} value={metric.value} />
                ))}
                <MetricRow label="Year" value={project.year} />
              </div>

              <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => onOpen(project)}
                  className="flex-1 rounded-lg border border-accent/50 bg-accent/10 px-5 py-3 text-xs tracking-[0.18em] uppercase text-accent hover:bg-accent hover:text-graphite-950 transition-colors"
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={() => setCursor('default')}
                >
                  View Case ↗
                </button>
                {primaryLink && (
                  <a
                    href={primaryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-lg border border-white/20 px-5 py-3 text-center text-xs tracking-[0.18em] uppercase text-white hover:border-accent/50 transition-colors"
                    onMouseEnter={() => setCursor('link')}
                    onMouseLeave={() => setCursor('default')}
                  >
                    {project.liveUrl ? 'Live Demo ↗' : 'GitHub ↗'}
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

type ProjectsProps = {
  onOpen: (p: Project) => void
}

export function Projects({ onOpen }: ProjectsProps) {
  const total = projects.length

  return (
    <section id="work" className="relative section-pad py-section">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-6">Portfolio</p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-display-lg font-light text-gradient uppercase tracking-tight">
            Selected Work
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-graphite-300">
            Production applications and foundational projects—presented as rolling terminal cases
            as you scroll.
          </p>
        </Reveal>

        <div className="relative mt-14 md:mt-20">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={onOpen}
              index={index}
              total={total}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
