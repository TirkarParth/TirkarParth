import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { journey } from '@/data/content'
import { Reveal } from '@/components/Reveal'
import { useAppStore } from '@/store/useAppStore'

gsap.registerPlugin(ScrollTrigger)

export function Journey() {
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const isMobile = useAppStore((s) => s.isMobile)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || reducedMotion || isMobile) return

    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth + 80),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${track.scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reducedMotion, isMobile])

  return (
    <section id="journey" ref={sectionRef} className="relative overflow-hidden">
      <div className="section-pad pt-section pb-10 md:pb-0">
        <Reveal>
          <p className="eyebrow mb-6">Journey</p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-display-lg font-light text-gradient max-w-3xl">
            A path of craft.
          </h2>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        className={`flex gap-8 md:gap-16 px-5 md:px-16 pb-section ${
          isMobile || reducedMotion ? 'flex-col md:flex-row overflow-x-auto' : 'w-max'
        }`}
      >
        {journey.map((item) => (
          <article
            key={item.year}
            className="min-w-[280px] md:min-w-[360px] border-t border-white/15 pt-8"
          >
            <p className="font-display text-5xl md:text-6xl font-light text-gradient">{item.year}</p>
            <h3 className="mt-6 font-display text-2xl">{item.title}</h3>
            <p className="mt-4 text-graphite-300 leading-relaxed max-w-sm">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
