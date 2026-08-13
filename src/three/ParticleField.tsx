import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAppStore } from '@/store/useAppStore'

type ParticleFieldProps = {
  count?: number
  radius?: number
}

export function ParticleField({ count = 120, radius = 8 }: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null)
  const isMobile = useAppStore((s) => s.isMobile)
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const n = isMobile ? Math.floor(count * 0.4) : count

  const positions = useMemo(() => {
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const r = radius * (0.35 + Math.random() * 0.65)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [n, radius])

  useFrame(({ clock }) => {
    if (!points.current || reducedMotion) return
    points.current.rotation.y = clock.elapsedTime * 0.02
    points.current.rotation.x = Math.sin(clock.elapsedTime * 0.05) * 0.05
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#c8a87a"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
