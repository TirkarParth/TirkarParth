import { aboutContent } from '@/data/content'
import { Reveal } from '@/components/Reveal'

export function About() {
  return (
    <section id="about" className="relative section-pad py-section">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-6">{aboutContent.eyebrow}</p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-display-lg font-light text-gradient max-w-4xl">
            {aboutContent.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-xl md:text-2xl text-graphite-100 leading-snug font-light">
            {aboutContent.lead}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-graphite-300 leading-relaxed">{aboutContent.body}</p>
        </Reveal>

        <div className="mt-20 grid gap-10 md:gap-14 md:grid-cols-3">
          {aboutContent.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={0.05 * i}>
              <article className="border-t border-white/10 pt-6">
                <h3 className="font-display text-xl md:text-2xl font-medium mb-4">{pillar.title}</h3>
                <p className="text-sm md:text-base text-graphite-300 leading-relaxed">{pillar.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
