import { useRef } from 'react'
import { siteConfig } from '@/data/content'
import { Reveal } from '@/components/Reveal'
import { useAppStore } from '@/store/useAppStore'

export function Contact() {
  const circleRef = useRef<HTMLAnchorElement>(null)
  const setCursor = useAppStore((s) => s.setCursor)
  const isMobile = useAppStore((s) => s.isMobile)
  const reducedMotion = useAppStore((s) => s.reducedMotion)

  const onMove = (e: React.MouseEvent) => {
    if (!circleRef.current || isMobile || reducedMotion) return
    const el = circleRef.current
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transition = 'none'
    el.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0) scale(1.05)`
  }

  const onLeave = () => {
    if (!circleRef.current) return
    const el = circleRef.current
    el.style.transition = 'transform 0.18s cubic-bezier(0.25, 1, 0.5, 1)'
    el.style.transform = 'translate3d(0, 0, 0) scale(1)'
    setCursor('default')
  }

  return (
    <section id="contact" className="relative section-pad py-section">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-6">Contact</p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-display-lg font-light text-gradient max-w-4xl">
            Let&apos;s build something
            <br />
            extraordinary.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-lg text-graphite-300 leading-relaxed">
            Open to creative ventures and collaborations. Based in {siteConfig.location}.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20">
          <div className="space-y-5">
            <ContactLink label="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
            <ContactLink label="GitHub" value="TirkarParth" href={siteConfig.social.github} />
            <ContactLink label="LinkedIn" value="parth-tirkar" href={siteConfig.social.linkedin} />
            <ContactLink label="Phone" value={siteConfig.phone} href={siteConfig.phoneHref} />
          </div>

          <a
            ref={circleRef}
            href={`mailto:${siteConfig.email}`}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            onMouseEnter={() => setCursor('link')}
            className="relative mx-auto lg:mx-0 flex h-44 w-44 md:h-56 md:w-56 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-white/10 to-transparent will-change-transform hover:border-accent/50"
            aria-label="Let's talk — email Parth"
          >
            <span className="text-sm tracking-[0.22em] uppercase">Let&apos;s Talk →</span>
            <span className="pointer-events-none absolute inset-3 rounded-full border border-white/5" />
          </a>
        </div>
      </div>
    </section>
  )
}

function ContactLink({ label, value, href }: { label: string; value: string; href: string }) {
  const setCursor = useAppStore((s) => s.setCursor)
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="group block"
      onMouseEnter={() => setCursor('link')}
      onMouseLeave={() => setCursor('default')}
    >
      <p className="text-xs tracking-[0.2em] uppercase text-graphite-500 mb-1">{label}</p>
      <p className="font-display text-xl md:text-2xl group-hover:text-accent transition-colors">{value}</p>
    </a>
  )
}