import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, type Project } from '@/data/content'
import { Reveal } from '@/components/Reveal'
import { useAppStore } from '@/store/useAppStore'

gsap.registerPlugin(ScrollTrigger)

function ProjectShowcase({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (p: Project) => void
}) {
  const ref = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const setCursor = useAppStore((s) => s.setCursor)
  const reducedMotion = useAppStore((s) => s.reducedMotion)

  useEffect(() => {
    const el = ref.current
    const img = imgRef.current
    if (!el || !img || reducedMotion) return

    const tween = gsap.fromTo(
      img,
      { scale: 0.78, opacity: 0.55 },
      {
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'center center',
          scrub: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reducedMotion])

  return (
    <article
      ref={ref}
      className="relative min-h-[85vh] md:min-h-[100vh] flex items-center py-16 md:py-24"
    >
      <div className="w-full grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="md:col-span-7 order-2 md:order-1">
          <div
            ref={imgRef}
            className="relative aspect-[16/10] overflow-hidden rounded-sm bg-graphite-800 cursor-pointer group"
            onClick={() => onOpen(project)}
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={() => setCursor('default')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onOpen(project)
            }}
            aria-label={`View project ${project.title}`}
          >
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/50 via-transparent to-transparent" />
          </div>
        </div>

        <div className="md:col-span-5 order-1 md:order-2">
          <p className="eyebrow text-accent mb-4">{project.number}</p>
          <h3 className="font-display text-display-md font-light">{project.title}</h3>
          <p className="mt-4 text-graphite-300 leading-relaxed">{project.description}</p>
          <p className="mt-6 text-sm text-graphite-400 tracking-wide">
            {project.technologies.slice(0, 4).join(' · ')}
          </p>
          <p className="mt-2 text-xs text-graphite-500 tracking-[0.2em] uppercase">{project.year}</p>
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="mt-8 inline-flex items-center gap-3 text-sm tracking-[0.18em] uppercase text-white hover:text-accent transition-colors group"
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={() => setCursor('default')}
          >
            View Project
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </article>
  )
}

type ProjectsProps = {
  onOpen: (p: Project) => void
}

export function Projects({ onOpen }: ProjectsProps) {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="work" className="relative section-pad py-section">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-6">Portfolio</p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-display-lg font-light text-gradient">Selected Work</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-graphite-300">
            Production applications and foundational projects across web, mobile, and API
            development.
          </p>
        </Reveal>

        <div className="mt-10 md:mt-4">
          {featured.map((project) => (
            <ProjectShowcase key={project.id} project={project} onOpen={onOpen} />
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-16">
          <Reveal>
            <h3 className="font-display text-2xl md:text-3xl font-light mb-10">More projects</h3>
          </Reveal>
          <div className="space-y-0">
            {rest.map((project) => (
              <Reveal key={project.id}>
                <button
                  type="button"
                  onClick={() => onOpen(project)}
                  className="w-full group flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 py-7 text-left hover:bg-white/[0.02] transition-colors px-2 -mx-2"
                  onMouseEnter={() => useAppStore.getState().setCursor('view')}
                  onMouseLeave={() => useAppStore.getState().setCursor('default')}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="text-xs text-graphite-500 tracking-widest">{project.number}</span>
                    <span className="font-display text-xl md:text-2xl group-hover:text-accent transition-colors">
                      {project.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-graphite-400 pl-10 md:pl-0">
                    <span className="hidden sm:inline">{project.technologies[0]}</span>
                    <span>{project.year}</span>
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
