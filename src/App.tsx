import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Loader } from '@/components/Loader'
import { Navigation } from '@/components/Navigation'
import { CustomCursor } from '@/components/CustomCursor'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Skills } from '@/sections/Skills'
import { Projects } from '@/sections/Projects'
import { ProjectDetail } from '@/sections/ProjectDetail'
import { Journey } from '@/sections/Journey'
import { Services } from '@/sections/Services'
import { Contact } from '@/sections/Contact'
import { Footer } from '@/sections/Footer'
import { useDeviceFlags } from '@/hooks/useDeviceFlags'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { useAppStore } from '@/store/useAppStore'
import { checkWebGLSupport } from '@/utils/device'
import type { Project } from '@/data/content'

const HeroScene = lazy(() =>
  import('@/three/HeroScene').then((m) => ({ default: m.HeroScene })),
)

export default function App() {
  useDeviceFlags()
  const isLoading = useAppStore((s) => s.isLoading)
  useSmoothScroll(!isLoading)

  const setWebglSupported = useAppStore((s) => s.setWebglSupported)
  const [heroProgress, setHeroProgress] = useState(0)
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  useEffect(() => {
    setWebglSupported(checkWebGLSupport())
  }, [setWebglSupported])

  const onHeroProgress = useCallback((p: number) => setHeroProgress(p), [])

  return (
    <>
      <Loader />
      <CustomCursor />
      <Navigation />

      <Suspense fallback={null}>
        <HeroScene progress={heroProgress} />
      </Suspense>

      <div className="noise-overlay" aria-hidden />

      <main className="page-content">
        <Hero onProgress={onHeroProgress} />
        <About />
        <Skills />
        <Projects onOpen={setActiveProject} />
        <Journey />
        <Services />
        <Contact />
        <Footer />
      </main>

      {activeProject && (
        <ProjectDetail project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  )
}
