import { Billboard, Html } from '@react-three/drei'
import { useAppStore } from '@/store/useAppStore'

type SkillIconProps = {
  src: string
  label: string
  active: boolean
  color: string
  onHover: (label: string | null) => void
}

export function SkillIcon({ src, label, active, color, onHover }: SkillIconProps) {
  const setCursor = useAppStore((s) => s.setCursor)

  return (
    <Billboard follow>
      <Html center transform distanceFactor={6.5} zIndexRange={[20, 0]}>
        <div
          onMouseEnter={() => {
            onHover(label)
            setCursor('drag')
          }}
          onMouseLeave={() => {
            onHover(null)
            setCursor('default')
          }}
          style={{
            width: active ? 52 : 42,
            height: active ? 52 : 42,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            cursor: 'none',
            pointerEvents: 'auto',
            userSelect: 'none',
            background: active
              ? `radial-gradient(circle at 30% 30%, ${color}55, rgba(12,12,14,0.92))`
              : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.14), rgba(12,12,14,0.9))',
            border: `1px solid ${active ? color : 'rgba(255,255,255,0.18)'}`,
            boxShadow: active
              ? `0 0 24px ${color}66, 0 8px 24px rgba(0,0,0,0.45)`
              : '0 8px 20px rgba(0,0,0,0.4)',
            transition:
              'width 0.2s ease, height 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
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
              pointerEvents: 'none',
              filter: active ? 'none' : 'brightness(1.05)',
            }}
          />
        </div>
      </Html>
    </Billboard>
  )
}
