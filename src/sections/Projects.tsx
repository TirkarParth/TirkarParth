import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, getProjectMeta, type Project } from '@/data/content'
import { Reveal } from '@/components/Reveal'
import { TerminalLabel } from '@/components/TerminalLabel'
import { TechBadge } from '@/components/TechBadge'
import { MetricRow } from '@/components/MetricRow'
import { useAppStore } from '@/store/useAppStore'
import { applyHeaderClearance, getHeaderClearance } from '@/utils/layout'

gsap.registerPlugin(ScrollTrigger)

function ProjectPanel({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (p: Project) => void
}) {
  const setCursor = useAppStore((s) => s.setCursor)
  const meta = getProjectMeta(project)
  const primaryLink = project.liveUrl || project.githubUrl

  return (
    <article className="terminal-panel terminal-panel-glow relative w-full p-7 md:p-10 lg:p-14">
      <div className="relative z-[1] grid lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-7 flex flex-col">
          <TerminalLabel className="mb-5">
            {project.number} {meta.category}
          </TerminalLabel>

          <h3 className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight uppercase text-accent leading-[1.08]">
            {project.title}
          </h3>

          <p className="mt-6 max-w-2xl text-sm md:text-base text-graphite-200 leading-relaxed">
            {project.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
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
          <TerminalLabel className="mb-5">Architecture Metrics</TerminalLabel>

          <div className="rounded-xl border border-white/10 bg-black/25 px-5 md:px-6 py-1">
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
  const pinRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const reducedMotion = useAppStore((s) => s.reducedMotion)

  useEffect(() => {
    const pin = pinRef.current
    const cards = cardsRef.current.filter(Boolean)
    if (!pin || cards.length < 2) return

    if (reducedMotion) {
      gsap.set(cards, { clearProps: 'all' })
      return
    }

    cards.forEach((card, i) => {
      gsap.set(card, {
        yPercent: i === 0 ? 0 : 110,
        scale: 1,
        zIndex: i + 1,
      })
    })

    const syncClearance = () => {
      const clearance = applyHeaderClearance(28)
      pin.style.height = `calc(100vh - ${clearance}px)`
      return clearance
    }

    syncClearance()

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: pin,
        start: () => `top ${getHeaderClearance(28)}px`,
        end: () => `+=${(cards.length - 1) * window.innerHeight * 0.95}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.45,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: syncClearance,
      },
    })

    cards.forEach((card, i) => {
      if (i === 0) return
      const prev = cards[i - 1]
      const at = i - 1
      tl.to(card, { yPercent: 0, duration: 1 }, at)
      tl.to(
        prev,
        {
          scale: 0.96,
          duration: 1,
        },
        at,
      )
    })

    const refresh = () => {
      syncClearance()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', refresh)

    return () => {
      window.removeEventListener('resize', refresh)
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [reducedMotion])

  return (
    <section id="work" className="relative section-pad py-section scroll-mt-[var(--header-clearance)]">
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

        <div
          ref={pinRef}
          className={`relative mt-14 md:mt-20 ${
            reducedMotion ? '' : 'project-stack-viewport'
          }`}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className={
                reducedMotion
                  ? 'mb-8 last:mb-0'
                  : 'project-stack-card will-change-transform p-1 md:p-2'
              }
            >
              <ProjectPanel project={project} onOpen={onOpen} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
