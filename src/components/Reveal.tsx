import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAppStore } from '@/store/useAppStore'

gsap.registerPlugin(ScrollTrigger)

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}

export function Reveal({ children, className = '', delay = 0, y = 40 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useAppStore((s) => s.reducedMotion)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reducedMotion) {
      gsap.set(el, { clearProps: 'all', opacity: 1, y: 0 })
      return
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [delay, y, reducedMotion])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
