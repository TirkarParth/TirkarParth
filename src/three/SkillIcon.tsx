import { Billboard, Html } from '@react-three/drei'

type SkillIconProps = {
  src: string
  label: string
  active: boolean
  color: string
}

export function SkillIcon({ src, label, active, color }: SkillIconProps) {
  return (
    <Billboard follow>
      <Html
        center
        transform
        distanceFactor={6.5}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            width: active ? 52 : 42,
            height: active ? 52 : 42,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            background: active
              ? `radial-gradient(circle at 30% 30%, ${color}55, rgba(12,12,14,0.92))`
              : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.14), rgba(12,12,14,0.9))',
            border: `1px solid ${active ? color : 'rgba(255,255,255,0.18)'}`,
            boxShadow: active
              ? `0 0 24px ${color}66, 0 8px 24px rgba(0,0,0,0.45)`
              : '0 8px 20px rgba(0,0,0,0.4)',
            transition: 'width 0.2s ease, height 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
          }}
        >
          <img
            src={src}
            alt={label}
            width={active ? 28 : 24}
            height={active ? 28 : 24}
            draggable={false}
            style={{
              display: 'block',
              objectFit: 'contain',
              filter: active ? 'none' : 'brightness(1.05)',
            }}
          />
        </div>
      </Html>
    </Billboard>
  )
}
