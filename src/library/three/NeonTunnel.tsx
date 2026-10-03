import { useRef } from 'react'
import { AdditiveBlending, Color, Object3D, type InstancedMesh } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { useSceneFrame } from '../../three/kit'

export const meta = {
  id: 'neon-tunnel',
  title: 'Neon tunnel',
  category: '3D',
  description: 'An endless flight through glowing hexagonal rings that twist and change colour with depth. A high-energy backdrop for gaming, events, music and launch countdowns.',
  source: ['Web: Codrops infinite tunnel tutorials', 'Web: synthwave hero trend'],
  tags: ['tunnel', 'neon', 'instancing', 'loop'],
  notes: ['Rings are recycled from the camera back to the far end, so the flight never ends.', 'Move the pointer to steer; the far end of the tunnel bends toward it.'],
} as const satisfies Meta

const RINGS = 46
const SPACING = 0.8
const LENGTH = RINGS * SPACING
const helper = new Object3D()
const tint = new Color()

function Scene() {
  const mesh = useRef<InstancedMesh>(null)
  useSceneFrame(({ t, px, py }) => {
    const m = mesh.current
    if (!m) return
    const travel = (t * 2.4) % SPACING
    for (let i = 0; i < RINGS; i++) {
      const depth = i * SPACING - travel        // 0 at the camera, growing into the distance
      const far = depth / LENGTH
      const index = i + Math.floor((t * 2.4) / SPACING) // stable identity while a ring flies toward us
      helper.position.set(
        Math.sin(depth * 0.16 + t * 0.3) * far * 2.2 + px * far * 4,
        Math.cos(depth * 0.13 + t * 0.24) * far * 1.5 + py * far * 3,
        5 - depth,
      )
      helper.rotation.set(0, 0, index * 0.11 + t * 0.12)
      helper.updateMatrix()
      m.setMatrixAt(i, helper.matrix)
      // Additive blending: darker means more transparent, so fading the colour fades the ring.
      const fade = Math.pow(1 - far, 1.6) * Math.max(0, Math.min(1, depth / 1.5))
      tint.setHSL((0.56 + index * 0.013) % 1, 0.95, 0.56).multiplyScalar(fade)
      m.setColorAt(i, tint)
    }
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  })
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, RINGS]} frustumCulled={false}>
      <torusGeometry args={[1.55, 0.016, 6, 6]} />
      <meshBasicMaterial blending={AdditiveBlending} transparent depthWrite={false} toneMapped={false} />
    </instancedMesh>
  )
}

export default function NeonTunnel({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="radial-gradient(ellipse at 50% 50%, #1a0b38 0%, #09061d 50%, #020106 100%)">
      <Scene />
    </ThreePreview>
  )
}
