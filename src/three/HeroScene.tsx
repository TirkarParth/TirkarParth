import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr, Preload } from '@react-three/drei'
import * as THREE from 'three'
import { SceneLighting } from './SceneLighting'
import { InteractiveObject } from './InteractiveObject'
import { ParticleField } from './ParticleField'
import { useAppStore } from '@/store/useAppStore'
import { getDPR } from '@/utils/device'
import { lerp } from '@/utils/device'

function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree()
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const progressRef = useRef(progress)
  progressRef.current = progress

  useEffect(() => {
    camera.position.set(0, 0.2, 5.2)
    camera.lookAt(0, 0, 0)
  }, [camera])

  useFrame(() => {
    if (reducedMotion) return
    const p = progressRef.current
    const approach = Math.min(1, p / 0.28)
    const orbit = Math.min(1, Math.max(0, (p - 0.25) / 0.35))
    const exit = Math.min(1, Math.max(0, (p - 0.72) / 0.28))

    const angle = orbit * Math.PI * 0.55
    const radius = 5.2 - approach * 1.4 + exit * 2.5
    const y = 0.2 + orbit * 0.9 - exit * 0.4
    const tx = Math.sin(angle) * radius
    const tz = Math.cos(angle) * radius

    camera.position.x = lerp(camera.position.x, tx, 0.05)
    camera.position.y = lerp(camera.position.y, y, 0.05)
    camera.position.z = lerp(camera.position.z, tz, 0.05)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function SceneContent({ progress }: { progress: number }) {
  return (
    <>
      <color attach="background" args={['#070708']} />
      <fog attach="fog" args={['#070708', 6, 16]} />
      <SceneLighting />
      <InteractiveObject scrollProgress={progress} />
      <ParticleField />
      <CameraRig progress={progress} />
    </>
  )
}

type HeroSceneProps = {
  progress: number
}

export function HeroScene({ progress }: HeroSceneProps) {
  const webglSupported = useAppStore((s) => s.webglSupported)
  const isMobile = useAppStore((s) => s.isMobile)
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const isLoading = useAppStore((s) => s.isLoading)
  const [visible, setVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion) {
      setVisible(false)
      return
    }
    const onScroll = () => {
      setVisible(window.scrollY < window.innerHeight * 2.8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reducedMotion])

  if (!webglSupported || reducedMotion || isLoading) {
    return (
      <div
        className="canvas-layer"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse at 70% 40%, rgba(200,168,122,0.12), transparent 50%), radial-gradient(ellipse at 30% 60%, rgba(100,120,160,0.08), transparent 45%), #070708',
        }}
      />
    )
  }

  if (!visible) return null

  return (
    <div ref={containerRef} className="canvas-layer" aria-hidden>
      <Canvas
        dpr={getDPR(isMobile)}
        gl={{
          antialias: !isMobile,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        camera={{ fov: 42, near: 0.1, far: 40, position: [0, 0.2, 5.2] }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <SceneContent progress={progress} />
          <AdaptiveDpr pixelated />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
