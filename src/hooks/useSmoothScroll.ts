import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAppStore } from '@/store/useAppStore'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll(enabled: boolean) {
  const lenisRef = useRef<Lenis | null>(null)
  const setScrollProgress = useAppStore((s) => s.setScrollProgress)
  const reducedMotion = useAppStore((s) => s.reducedMotion)

  useEffect(() => {
    if (!enabled || reducedMotion) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    lenis.on('scroll', () => {
      setScrollProgress(lenis.progress)
      ScrollTrigger.update()
    })

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      gsap.ticker.remove(ticker)
      window.removeEventListener('resize', onResize)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [enabled, reducedMotion, setScrollProgress])

  return lenisRef
}

export function scrollToId(id: string) {
  const el = document.getElementById(id.replace('#', ''))
  if (!el) return
  const reduced = useAppStore.getState().reducedMotion
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
}
