import { useEffect, useRef } from 'react'
import { useAppStore } from '@/store/useAppStore'

const FOLLOW = 0.62
const SIZE_FOLLOW = 0.32

function getCursorLabel(cursor: string) {
  if (cursor === 'view') return 'VIEW'
  if (cursor === 'drag') return 'DRAG'
  return ''
}

export function CustomCursor() {
  const isMobile = useAppStore((s) => s.isMobile)
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const labelTextRef = useRef<HTMLSpanElement>(null)
  const pos = useRef({ x: 0, y: 0, cx: 0, cy: 0, size: 0 })
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
      const p = pos.current
      const { cursor } = useAppStore.getState()
      const expanded = cursor === 'link' || cursor === 'view' || cursor === 'drag'
      const label = getCursorLabel(cursor)
      const targetSize = expanded ? 1 : 0

      p.cx += (p.x - p.cx) * FOLLOW
      p.cy += (p.y - p.cy) * FOLLOW
      p.size += (targetSize - p.size) * SIZE_FOLLOW

      const transform = `translate3d(${p.cx}px, ${p.cy}px, 0) translate(-50%, -50%)`
      const dotScale = 1 + p.size * 4.3
      const ringScale = 1 + p.size * 0.12
      const ringOpacity = p.size * 0.85
      const labelOpacity = label ? Math.min(1, p.size * 1.4) : 0

      if (dotRef.current) {
        dotRef.current.style.transform = `${transform} scale(${dotScale})`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `${transform} scale(${ringScale})`
        ringRef.current.style.opacity = String(ringOpacity)
      }
      if (labelRef.current) {
        labelRef.current.style.transform = transform
        labelRef.current.style.opacity = String(labelOpacity)
      }
      if (labelTextRef.current && labelTextRef.current.textContent !== label) {
        labelTextRef.current.textContent = label
      }

      raf.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [isMobile, reducedMotion])

  if (isMobile || reducedMotion) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference will-change-transform"
        aria-hidden
      >
        <div className="h-3 w-3 rounded-full bg-white" />
      </div>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-16 w-16 rounded-full border border-white/80 bg-white/10 opacity-0 will-change-transform"
        aria-hidden
      />
      <div
        ref={labelRef}
        className="pointer-events-none fixed left-0 top-0 z-[91] text-[10px] tracking-[0.25em] text-white opacity-0 will-change-transform"
        aria-hidden
      >
        <span ref={labelTextRef} />
      </div>
    </>
  )
}
