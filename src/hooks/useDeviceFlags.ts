import { useEffect, useState } from 'react'
import { isTouchDevice, prefersReducedMotion } from '@/utils/device'
import { useAppStore } from '@/store/useAppStore'

export function useDeviceFlags() {
  const setReducedMotion = useAppStore((s) => s.setReducedMotion)
  const setIsMobile = useAppStore((s) => s.setIsMobile)

  useEffect(() => {
    const update = () => {
      setReducedMotion(prefersReducedMotion())
      setIsMobile(window.innerWidth < 768 || isTouchDevice())
    }
    update()

    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqWidth = window.matchMedia('(max-width: 767px)')

    mqMotion.addEventListener('change', update)
    mqWidth.addEventListener('change', update)
    window.addEventListener('resize', update)

    return () => {
      mqMotion.removeEventListener('change', update)
      mqWidth.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [setReducedMotion, setIsMobile])
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}
