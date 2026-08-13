import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteConfig } from '@/data/content'
import { MagneticButton } from '@/components/MagneticButton'
import { useAppStore } from '@/store/useAppStore'

gsap.registerPlugin(ScrollTrigger)

type HeroProps = {
  onProgress: (p: number) => void
}

export function Hero({ onProgress }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const isLoading = useAppStore((s) => s.isLoading)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section) return

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => onProgress(self.progress),
    })

    let fade: gsap.core.Tween | undefined
    if (!reducedMotion && content) {
      fade = gsap.to(content, {
        opacity: 0,
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '40% top',
          scrub: true,
        },
      })
    }

    if (!reducedMotion && !isLoading) {
      gsap.fromTo(
        '.hero-reveal',
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out', delay: 0.15 },
      )
    }

    return () => {
      st.kill()
      fade?.scrollTrigger?.kill()
      fade?.kill()
    }
  }, [onProgress, reducedMotion, isLoading])

  return (
    <section id="hero" ref={sectionRef} className="relative h-[280vh]">
      <div className="sticky top-0 h-[100svh] flex items-end md:items-center section-pad pb-24 md:pb-0 overflow-hidden">
        <div ref={contentRef} className="relative z-10 w-full max-w-6xl mx-auto pt-28 md:pt-0">
          <p className="hero-reveal eyebrow text-accent mb-6">Creative Developer</p>
          <h1 className="hero-reveal font-display text-display-xl font-light text-gradient">
            Parth
            <br />
            Tirkar
          </h1>
          <p className="hero-reveal mt-8 max-w-xl text-base md:text-lg text-graphite-200 leading-relaxed">
            {siteConfig.tagline}
          </p>
          <div className="hero-reveal mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#work"
              className="rounded-full border border-white/20 bg-white text-graphite-950 px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-accent hover:border-accent transition-colors"
            >
              View Work
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="rounded-full border border-white/15 px-7 py-3.5 text-sm text-graphite-100 hover:border-white/40 transition-colors"
            >
              Contact
            </MagneticButton>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 opacity-70">
          <span className="text-[10px] tracking-[0.3em] uppercase text-graphite-300">
            Scroll to explore
          </span>
          <span className="block h-8 w-px overflow-hidden bg-white/20 relative">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-accent animate-[scrollPulse_1.6s_ease-in-out_infinite]" />
          </span>
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  )
}
