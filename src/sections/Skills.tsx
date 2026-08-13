import { lazy, Suspense } from 'react'
import { Reveal } from '@/components/Reveal'

const SkillsScene = lazy(() =>
  import('@/three/SkillsScene').then((m) => ({ default: m.SkillsScene })),
)

export function Skills() {
  return (
    <section id="skills" className="relative section-pad py-section">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-6">Capabilities</p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-display-lg font-light text-gradient">
            A living stack.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-graphite-300 leading-relaxed">
            Frontend craft, backend systems, and creative technology—shaped through production
            apps, reviews, and releases.
          </p>
        </Reveal>

        <div className="mt-14">
          <Suspense
            fallback={
              <div className="h-[420px] rounded-3xl border border-white/5 bg-white/[0.02] animate-pulse" />
            }
          >
            <SkillsScene />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
