import { useRef } from 'react'
import { Color, Object3D, type Group, type InstancedMesh } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { StudioEnv, useSceneFrame } from '../../three/kit'

export const meta = {
  id: 'lattice-pulse',
  title: 'Lattice pulse',
  category: '3D',
  description: 'A cube made of polished spheres, with a shell of energy expanding through it: each sphere swells and warms in colour as the pulse passes, then settles. Suggests computation, crystals or a neural network at work.',
  source: ['Web: Three.js instancing examples', 'Web: AI-compute hero visuals'],
  tags: ['instancing', 'spheres', 'pulse', 'reflection'],
  notes: ['343 spheres drawn as one instanced mesh.', 'Reflections come from the shared studio light panels, so the metal reads as metal.'],
} as const satisfies Meta

const N = 7
const GAP = 0.36
const helper = new Object3D()
const tint = new Color()
const cold = new Color('#3b46c9'), hot = new Color('#ffb36b'), flash = new Color('#ffffff')

function Scene() {
  const root = useRef<Group>(null)
  const mesh = useRef<InstancedMesh>(null)
  useSceneFrame(({ t, px, py }) => {
    const m = mesh.current
    if (!m) return
    const half = (N - 1) / 2
    const reach = half * 1.8
    const wave = (t * 1.5) % (reach + 1.6)
    let i = 0
    for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) for (let z = 0; z < N; z++) {
      const dx = x - half, dy = y - half, dz = z - half
      const dist = Math.hypot(dx, dy, dz)
      const hit = Math.exp(-Math.pow((dist - wave) * 1.5, 2))
      const s = 0.36 + hit * 0.62
      helper.position.set(dx * GAP, dy * GAP, dz * GAP)
      helper.scale.setScalar(s)
      helper.updateMatrix()
      m.setMatrixAt(i, helper.matrix)
      tint.copy(cold).lerp(hot, hit).lerp(flash, hit * hit * 0.5)
      m.setColorAt(i, tint)
      i++
    }
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
    if (!root.current) return
    root.current.rotation.y = t * 0.2 + px * 0.6
    root.current.rotation.x = 0.45 - py * 0.4
  })
  return (
    <>
      <StudioEnv />
      <directionalLight position={[3, 5, 4]} intensity={1.6} />
      <ambientLight intensity={0.3} />
      <group ref={root}>
        <instancedMesh ref={mesh} args={[undefined, undefined, N * N * N]} frustumCulled={false}>
          <sphereGeometry args={[GAP * 0.42, 20, 16]} />
          <meshStandardMaterial metalness={0.85} roughness={0.18} envMapIntensity={1.2} />
        </instancedMesh>
      </group>
    </>
  )
}

export default function LatticePulse({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="radial-gradient(ellipse at 50% 45%, #1b1c44 0%, #0a0b20 55%, #030309 100%)">
      <Scene />
    </ThreePreview>
  )
}
