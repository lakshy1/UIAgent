import { useContext, useRef } from 'react'
import { MeshDistortMaterial } from '@react-three/drei'
import type { Mesh } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { SceneContext, StudioEnv, useSceneFrame } from '../../three/kit'

export const meta = {
  id: 'liquid-chrome',
  title: 'Liquid chrome',
  category: '3D',
  description: 'A polished metal knot whose surface ripples like mercury, lit by cyan and magenta studio panels. The mirror-finish look used on premium hardware and fashion launch pages.',
  source: ['Web: drei MeshDistortMaterial', 'Web: chrome-type and liquid-metal trend'],
  tags: ['chrome', 'metal', 'reflection', 'distort'],
  notes: ['Reflections come from light panels rendered into an environment map, so no HDR file is fetched.', 'Turns to follow the pointer.'],
} as const satisfies Meta

function Scene() {
  const mesh = useRef<Mesh>(null)
  const reduced = useContext(SceneContext)?.reduced ?? false
  useSceneFrame(({ t, px, py }) => {
    if (!mesh.current) return
    mesh.current.rotation.y = t * 0.22 + px * 0.7
    mesh.current.rotation.x = 0.35 - py * 0.45
  })
  return (
    <>
      <StudioEnv />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <mesh ref={mesh}>
        <torusKnotGeometry args={[0.82, 0.3, 320, 48, 2, 3]} />
        <MeshDistortMaterial color="#e6ebf5" metalness={1} roughness={0.06} envMapIntensity={1.35} distort={0.28} speed={reduced ? 0 : 1.6} />
      </mesh>
    </>
  )
}

export default function LiquidChrome({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="radial-gradient(ellipse at 50% 45%, #20222e 0%, #0d0e16 55%, #040407 100%)">
      <Scene />
    </ThreePreview>
  )
}
