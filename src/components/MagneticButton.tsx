import { useRef } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { scrollToId } from '@/hooks/useSmoothScroll'

type MagneticButtonProps = {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  ariaLabel?: string
  strength?: number
}

export function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  ariaLabel,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const setCursor = useAppStore((s) => s.setCursor)
  const isMobile = useAppStore((s) => s.isMobile)
  const reducedMotion = useAppStore((s) => s.reducedMotion)

  const onMove = (e: React.MouseEvent) => {
    if (isMobile || reducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
    setCursor('default')
  }

  const handleClick = (e: React.MouseEvent) => {
    if (href?.startsWith('#')) {
      e.preventDefault()
      scrollToId(href)
    }
    onClick?.()
  }

  const sharedClass = `magnetic-hit transition-transform duration-300 ease-out-expo ${className}`

  if (href) {
    const external = href.startsWith('http') || href.endsWith('.pdf')
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={sharedClass}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={() => setCursor('link')}
        onClick={handleClick}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      className={sharedClass}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setCursor('link')}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
