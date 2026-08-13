import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { useAppStore } from '@/store/useAppStore'
import { lerp } from '@/utils/device'

type InteractiveObjectProps = {
  scrollProgress?: number
}

export function InteractiveObject({ scrollProgress = 0 }: InteractiveObjectProps) {
  const group = useRef<THREE.Group>(null)
  const mesh = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const isMobile = useAppStore((s) => s.isMobile)
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const setCursor = useAppStore((s) => s.setCursor)

  const materialPhase = Math.min(1, Math.max(0, (scrollProgress - 0.35) / 0.25))

  const colorA = useMemo(() => new THREE.Color('#d8d8de'), [])
  const colorB = useMemo(() => new THREE.Color('#c8a87a'), [])
  const mixed = useMemo(() => new THREE.Color(), [])

  useFrame((state, delta) => {
    if (!group.current || !mesh.current) return

    if (!isMobile && !reducedMotion) {
      mouse.current.x = state.pointer.x
      mouse.current.y = state.pointer.y
      target.current.x = lerp(target.current.x, mouse.current.x * 0.35, 0.05)
      target.current.y = lerp(target.current.y, mouse.current.y * 0.25, 0.05)
    }

    const approach = Math.min(1, scrollProgress / 0.25)
    const orbit = Math.min(1, Math.max(0, (scrollProgress - 0.2) / 0.3))
    const exit = Math.min(1, Math.max(0, (scrollProgress - 0.7) / 0.25))

    const baseScale = 1 + approach * 0.15 - exit * 0.4
    const floatY = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.6) * 0.08

    group.current.position.x = lerp(group.current.position.x, target.current.x * 0.4 + exit * 2.5, 0.06)
    group.current.position.y = lerp(group.current.position.y, floatY + target.current.y * 0.3 - exit * 0.5, 0.06)
    group.current.position.z = lerp(group.current.position.z, approach * 0.8 - exit * 3, 0.05)

    group.current.rotation.y += (reducedMotion ? 0 : delta * 0.25) + orbit * delta * 0.6
    group.current.rotation.x = lerp(
      group.current.rotation.x,
      target.current.y * 0.2 + orbit * 0.4,
      0.05,
    )
    group.current.rotation.z = lerp(group.current.rotation.z, target.current.x * 0.15, 0.05)
    group.current.scale.setScalar(lerp(group.current.scale.x, baseScale, 0.08))

    if (ring.current) {
      ring.current.rotation.z -= delta * 0.15
      ring.current.rotation.x = Math.PI / 2.4 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }

    mixed.copy(colorA).lerp(colorB, materialPhase)
    const mat = mesh.current.material as THREE.MeshPhysicalMaterial
    if (mat.color) mat.color.copy(mixed)
    mat.metalness = 0.85 + materialPhase * 0.1
    mat.roughness = 0.18 - materialPhase * 0.08
  })

  return (
    <group
      ref={group}
      onPointerEnter={() => setCursor('drag')}
      onPointerLeave={() => setCursor('default')}
    >
      <mesh ref={mesh} castShadow>
        <icosahedronGeometry args={[1.05, isMobile ? 1 : 2]} />
        <meshPhysicalMaterial
          color="#d8d8de"
          metalness={0.9}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.12}
          reflectivity={1}
          iridescence={0.35}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 400]}
          envMapIntensity={1.2}
        />
      </mesh>

      {!isMobile && (
        <mesh scale={0.92}>
          <icosahedronGeometry args={[1.05, 1]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.35}
            chromaticAberration={0.02}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.15}
            temporalDistortion={0.05}
            iridescence={0.2}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 140]}
            color="#ffffff"
            opacity={0.25}
            transparent
          />
        </mesh>
      )}

      <mesh ref={ring}>
        <torusGeometry args={[1.55, 0.012, 12, isMobile ? 48 : 96]} />
        <meshStandardMaterial color="#c8a87a" metalness={0.9} roughness={0.25} transparent opacity={0.7} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.75, 0.006, 8, isMobile ? 32 : 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>
    </group>
  )
}
