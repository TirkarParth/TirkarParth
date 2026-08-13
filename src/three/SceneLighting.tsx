import { Environment, ContactShadows } from '@react-three/drei'

export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.25} color="#b8b8c0" />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.4}
        color="#fff6ea"
        castShadow={false}
      />
      <directionalLight position={[-5, 2, -3]} intensity={0.55} color="#8ea0c8" />
      <spotLight
        position={[0, 8, 2]}
        angle={0.45}
        penumbra={0.8}
        intensity={0.8}
        color="#ffe8c8"
      />
      <Environment preset="city" environmentIntensity={0.45} />
      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.35}
        scale={12}
        blur={2.5}
        far={4}
        color="#000000"
      />
    </>
  )
}
