import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useAppStore } from '@/store/useAppStore'

export function Loader() {
  const isLoading = useAppStore((s) => s.isLoading)
  const progress = useAppStore((s) => s.loadProgress)
  const setLoading = useAppStore((s) => s.setLoading)
  const setLoadProgress = useAppStore((s) => s.setLoadProgress)
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const rootRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef(false)

  useEffect(() => {
    if (doneRef.current) return

    let frame = 0
    const start = performance.now()
    const duration = reducedMotion ? 400 : 1600

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const value = Math.round(eased * 100)
      setLoadProgress(value)

      if (t < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        doneRef.current = true
        const el = rootRef.current
        if (!el || reducedMotion) {
          setLoading(false)
          return
        }
        gsap.to(el, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          delay: 0.15,
          onComplete: () => setLoading(false),
        })
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reducedMotion, setLoadProgress, setLoading])

  if (!isLoading && progress >= 100) return null

  const display = String(progress).padStart(2, '0')

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-graphite-950"
      aria-live="polite"
      aria-busy={isLoading}
      role="status"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,168,122,0.08),transparent_55%)]" />
      <p className="eyebrow mb-8 relative">Parth Tirkar</p>
      <div className="relative font-display text-[clamp(4rem,18vw,9rem)] font-light tracking-[-0.06em] leading-none text-gradient">
        PT
      </div>
      <div className="mt-10 relative flex items-baseline gap-3 tabular-nums">
        <span className="font-display text-4xl md:text-5xl font-light tracking-tight text-white">
          {display}
        </span>
        <span className="text-graphite-400 text-sm tracking-[0.2em]">%</span>
      </div>
      <div className="mt-8 h-px w-40 overflow-hidden bg-white/10 relative">
        <div
          className="h-full bg-accent origin-left transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </div>
  )
}
