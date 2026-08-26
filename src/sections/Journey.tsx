import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experiences } from '@/data/experience'
import { Reveal } from '@/components/Reveal'
import { TechBadge } from '@/components/TechBadge'
import { useAppStore } from '@/store/useAppStore'
import { applyHeaderClearance, getHeaderClearance } from '@/utils/layout'

gsap.registerPlugin(ScrollTrigger)

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const setCursor = useAppStore((s) => s.setCursor)
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const isMobile = useAppStore((s) => s.isMobile)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const track = trackRef.current
    if (!section || !pin || !track) return

    if (reducedMotion || isMobile) {
      gsap.set(track, { clearProps: 'transform' })
      return
    }

    applyHeaderClearance()

    const getTravel = () => Math.max(0, track.scrollWidth - window.innerWidth + 80)

    const tween = gsap.to(track, {
      x: () => -getTravel(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: () => `top ${getHeaderClearance()}px`,
        end: () => `+=${getTravel() + window.innerHeight * 0.35}`,
        scrub: 0.65,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setProgress(self.progress)
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`
          }
        },
        onRefresh: () => applyHeaderClearance(),
      },
    })

    const onResize = () => {
      applyHeaderClearance()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reducedMotion, isMobile])

  const useNativeScroll = reducedMotion || isMobile

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative overflow-hidden scroll-mt-[var(--header-clearance)]"
    >
      <div className="section-pad pt-section">
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
              A horizontal path from foundations to creative development—anchored in real projects
              and production workflows.
            </p>
          </Reveal>
        </div>
      </div>

      <div
        ref={pinRef}
        className={`relative mt-12 md:mt-16 pb-section ${
          useNativeScroll ? '' : 'journey-pin-frame'
        }`}
      >
        <div
          className="pointer-events-none absolute left-0 right-0 top-[0.7rem] md:top-[0.75rem] px-5 md:px-16"
          aria-hidden
        >
          <div className="timeline-line-x h-px w-full" />
        </div>

        <div
          ref={trackRef}
          className={`relative flex items-stretch gap-6 md:gap-10 px-5 md:px-16 will-change-transform ${
            useNativeScroll
              ? 'overflow-x-auto pb-4 snap-x snap-mandatory journey-track-scroll'
              : 'w-max'
          }`}
        >
          {experiences.map((item, i) => (
            <article
              key={item.id}
              className="relative shrink-0 w-[min(84vw,22rem)] md:w-[28rem] snap-center"
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={() => setCursor('default')}
            >
              <div className="relative mb-8 md:mb-10 flex items-center gap-3">
                <span className="timeline-node relative z-[1] h-3 w-3 rounded-full bg-accent" />
                <p className="text-xs md:text-sm tracking-[0.22em] uppercase text-accent font-medium">
                  {item.period}
                </p>
                <span className="text-[10px] tracking-[0.2em] uppercase text-graphite-500">
                  {String(i + 1).padStart(2, '0')} / {String(experiences.length).padStart(2, '0')}
                </span>
              </div>

              <div className="terminal-panel h-[calc(100%-3.5rem)] p-6 md:p-8">
                <div className="relative z-[1] flex h-full flex-col">
                  <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-semibold uppercase tracking-tight text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[11px] md:text-xs tracking-[0.18em] uppercase text-accent">
                    {item.org}
                  </p>
                  <p className="mt-5 text-sm md:text-[0.95rem] text-graphite-300 leading-relaxed flex-1">
                    {item.text}
                  </p>
                  {item.tags && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <TechBadge key={tag} label={tag} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {!useNativeScroll && (
          <div className="mt-10 px-5 md:px-16">
            <div className="flex items-center justify-between gap-4 mb-3">
              <p className="text-[10px] tracking-[0.28em] uppercase text-graphite-500">
                Scroll to move through the timeline →
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-accent tabular-nums">
                {Math.round(progress * 100)}%
              </p>
            </div>
            <div className="h-px w-full overflow-hidden bg-white/10">
              <div
                ref={progressRef}
                className="h-full origin-left bg-accent"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
