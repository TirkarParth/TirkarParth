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
}: {
  project: Project
  onOpen: (p: Project) => void
}) {
  const cardRef = useRef<HTMLElement>(null)
  const setCursor = useAppStore((s) => s.setCursor)
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const meta = getProjectMeta(project)

  useEffect(() => {
    const el = cardRef.current
    if (!el || reducedMotion) return

    const tween = gsap.fromTo(
      el,
      { y: 48, opacity: 0.45, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          end: 'top 45%',
          scrub: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reducedMotion])

  const primaryLink = project.liveUrl || project.githubUrl

  return (
    <article
      ref={cardRef}
      className="terminal-panel terminal-panel-glow sticky top-24 md:top-28 w-full p-5 md:p-8 lg:p-10 mb-8 md:mb-12"
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
  )
}

type ProjectsProps = {
  onOpen: (p: Project) => void
}

export function Projects({ onOpen }: ProjectsProps) {
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

        <div className="relative mt-14 md:mt-20 pb-[20vh]">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  )
}
