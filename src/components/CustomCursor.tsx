import { useEffect, useRef } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { lerp } from '@/utils/device'

export function CustomCursor() {
  const cursor = useAppStore((s) => s.cursor)
  const isMobile = useAppStore((s) => s.isMobile)
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0, cx: 0, cy: 0 })
  const raf = useRef(0)

  useEffect(() => {
    if (isMobile || reducedMotion) {
      document.body.classList.remove('has-custom-cursor')
      return
    }

    document.body.classList.add('has-custom-cursor')

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    const loop = () => {
      pos.current.cx = lerp(pos.current.cx, pos.current.x, 0.18)
      pos.current.cy = lerp(pos.current.cy, pos.current.y, 0.18)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.cx}px, ${pos.current.cy}px, 0)`
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${pos.current.cx}px, ${pos.current.cy}px, 0)`
      }
      raf.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [isMobile, reducedMotion])

  if (isMobile || reducedMotion) return null

  const expanded = cursor === 'link' || cursor === 'view' || cursor === 'drag'
  const label = cursor === 'view' ? 'VIEW' : cursor === 'drag' ? 'DRAG' : ''

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        aria-hidden
      >
        <div
          className={`rounded-full border border-white/80 transition-all duration-300 ease-out-expo ${
            expanded ? 'h-16 w-16 bg-white/10' : 'h-3 w-3 bg-white'
          }`}
        />
      </div>
      <div
        ref={labelRef}
        className={`pointer-events-none fixed left-0 top-0 z-[91] -translate-x-1/2 -translate-y-1/2 text-[10px] tracking-[0.25em] text-white transition-opacity duration-200 ${
          label ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden
      >
        {label}
      </div>
    </>
  )
}
