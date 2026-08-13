import { services } from '@/data/content'
import { Reveal } from '@/components/Reveal'
import { useAppStore } from '@/store/useAppStore'

export function Services() {
  const setCursor = useAppStore((s) => s.setCursor)

  return (
    <section id="services" className="relative section-pad py-section">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-6">Services</p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-display-lg font-light text-gradient">What I Build</h2>
        </Reveal>

        <div className="mt-14 md:mt-20">
          {services.map((service, i) => (
            <Reveal key={service.number} delay={0.04 * i}>
              <article
                className="group border-t border-white/10 py-7 md:py-9 transition-all duration-500 hover:pl-3"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={() => setCursor('default')}
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-10">
                  <span className="text-xs tracking-[0.25em] text-accent">{service.number}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl md:text-4xl font-light group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-graphite-400 text-sm md:text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                      {service.text}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  )
}
