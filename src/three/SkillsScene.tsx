import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { skills } from '@/data/content'
import { useAppStore } from '@/store/useAppStore'
import { getDPR, lerp } from '@/utils/device'

function SkillOrb({
  label,
  index,
  total,
  active,
  onHover,
}: {
  label: string
  index: number
  total: number
  active: boolean
  onHover: (label: string | null) => void
}) {
  const ref = useRef<THREE.Group>(null)
  const angle = (index / total) * Math.PI * 2
  const radius = 2.4
  const setCursor = useAppStore((s) => s.setCursor)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * 0.25
    const x = Math.cos(angle + t) * radius
    const z = Math.sin(angle + t) * radius
    const y = Math.sin(t * 1.5 + index) * 0.35
    ref.current.position.x = lerp(ref.current.position.x, x, 0.08)
    ref.current.position.y = lerp(ref.current.position.y, y, 0.08)
    ref.current.position.z = lerp(ref.current.position.z, z, 0.08)
    const s = active ? 1.35 : 1
    ref.current.scale.setScalar(lerp(ref.current.scale.x, s, 0.12))
  })

  return (
    <group
      ref={ref}
      onPointerEnter={() => {
        onHover(label)
        setCursor('drag')
      }}
      onPointerLeave={() => {
        onHover(null)
        setCursor('default')
      }}
    >
      <mesh>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshPhysicalMaterial
          color={active ? '#c8a87a' : '#d0d0d6'}
          metalness={0.85}
          roughness={0.2}
          clearcoat={1}
          emissive={active ? '#c8a87a' : '#000000'}
          emissiveIntensity={active ? 0.25 : 0}
        />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[0.26, 0.3, 32]} />
        <meshBasicMaterial
          color={active ? '#c8a87a' : '#ffffff'}
          transparent
          opacity={active ? 0.55 : 0.12}
        />
      </mesh>
    </group>
  )
}

function SkillsWorld({ onHover, active }: { onHover: (l: string | null) => void; active: string | null }) {
  const list = useMemo(() => skills.slice(0, 12), [])

  return (
    <>
      <color attach="background" args={['#0a0a0c']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} />
      <directionalLight position={[-3, 1, -2]} intensity={0.4} color="#8ea0c8" />
      {list.map((skill, i) => (
        <SkillOrb
          key={skill.id}
          label={skill.label}
          index={i}
          total={list.length}
          active={active === skill.label}
          onHover={onHover}
        />
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.004, 8, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>
    </>
  )
}

export function SkillsScene() {
  const webglSupported = useAppStore((s) => s.webglSupported)
  const isMobile = useAppStore((s) => s.isMobile)
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const [active, setActive] = useState<string | null>(null)

  if (!webglSupported || reducedMotion) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {skills.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-center hover:border-accent/40 transition-colors"
          >
            <p className="font-display text-lg">{s.label}</p>
            <p className="mt-1 text-xs text-graphite-400 tracking-wide">{s.category}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="relative h-[420px] md:h-[520px] w-full rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
      <Canvas
        dpr={getDPR(isMobile)}
        camera={{ position: [0, 0.5, 7], fov: 40 }}
        gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <SkillsWorld onHover={setActive} active={active} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-graphite-950/80 to-transparent pt-16 pb-6 text-center">
        <p className="font-display text-xl md:text-2xl text-white">
          {active ?? 'Hover a node'}
        </p>
        <p className="mt-2 text-xs tracking-[0.2em] uppercase text-graphite-400">
          {active
            ? skills.find((s) => s.label === active)?.category
            : 'Interactive skill ecosystem'}
        </p>
      </div>
    </div>
  )
}
