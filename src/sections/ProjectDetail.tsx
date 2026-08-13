import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { Project } from '@/data/content'
import { useAppStore } from '@/store/useAppStore'

type ProjectDetailProps = {
  project: Project
  onClose: () => void
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const setCursor = useAppStore((s) => s.setCursor)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    if (!reducedMotion && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { y: '8%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.7, ease: 'power3.out' },
      )
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, reducedMotion])

  const gallery = project.images?.length ? project.images : [project.image]

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-graphite-950/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-t-3xl md:rounded-3xl border border-white/10 bg-graphite-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 md:px-8 py-4 bg-graphite-900/90 backdrop-blur-md border-b border-white/5">
          <p className="eyebrow text-accent">{project.number}</p>
          <button
            type="button"
            onClick={onClose}
            className="text-sm tracking-[0.15em] uppercase text-graphite-300 hover:text-white"
            aria-label="Close project details"
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={() => setCursor('default')}
          >
            Close
          </button>
        </div>

        <div className="px-5 md:px-8 py-8 md:py-10">
          <div className="aspect-[16/9] overflow-hidden rounded-xl bg-graphite-800 mb-8">
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          </div>

          <h2 id="project-detail-title" className="font-display text-display-md font-light">
            {project.title}
          </h2>
          <p className="mt-2 text-sm text-graphite-400">{project.year}</p>

          <div className="mt-10 space-y-8">
            <DetailBlock title="Overview" text={project.overview} />
            <DetailBlock title="Challenge" text={project.challenge} />
            <DetailBlock title="Solution" text={project.solution} />

            <div>
              <h3 className="eyebrow mb-4">Features</h3>
              <ul className="grid sm:grid-cols-2 gap-2">
                {project.features.map((f) => (
                  <li key={f} className="text-graphite-200 text-sm border-l border-accent/40 pl-3 py-1">
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="eyebrow mb-4">Technologies</h3>
              <p className="text-graphite-200">{project.technologies.join(' · ')}</p>
            </div>

            {gallery.length > 1 && (
              <div>
                <h3 className="eyebrow mb-4">Screenshots</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {gallery.map((src) => (
                    <div key={src} className="aspect-video overflow-hidden rounded-lg bg-graphite-800">
                      <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white text-graphite-950 px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={() => setCursor('default')}
                >
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm hover:border-white/50 transition-colors"
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={() => setCursor('default')}
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailBlock({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="eyebrow mb-3">{title}</h3>
      <p className="text-graphite-200 leading-relaxed">{text}</p>
    </div>
  )
}
