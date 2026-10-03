import { useRef } from 'react'
import { Color, Object3D, type Group, type InstancedMesh } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { StudioEnv, useSceneFrame } from '../../three/kit'

export const meta = {
  id: 'wave-cubes',
  title: 'Wave cubes',
  category: '3D',
  description: 'A field of metal columns rising and falling as a ripple travels outward from the centre, seen from an isometric angle. Reads as data, sound or a city, so it fits analytics and audio products.',
  source: ['Web: Three.js instancing examples', 'Web: isometric grid-wave hero trend'],
  tags: ['instancing', 'isometric', 'wave', 'grid'],
  notes: ['All 576 columns are one instanced mesh: a single draw call.', 'The pointer drags a second, taller bump across the grid.'],
} as const satisfies Meta

const SIDE = 24
const GAP = 0.15
const low = new Color('#1a1f6b'), mid = new Color('#28c7e8'), high = new Color('#ff5fc4')
const helper = new Object3D()
const tint = new Color()

function Scene() {
  const root = useRef<Group>(null)
  const mesh = useRef<InstancedMesh>(null)
  useSceneFrame(({ t, px, py }) => {
    const m = mesh.current
    if (!m) return
    const half = (SIDE - 1) / 2
    for (let z = 0; z < SIDE; z++) {
      for (let x = 0; x < SIDE; x++) {
        const dx = x - half, dz = z - half
        const dist = Math.hypot(dx, dz)
        const ripple = (Math.sin(dist * 0.62 - t * 2.1) * 0.5 + 0.5) * Math.exp(-dist * 0.085)
        const bx = dx - px * half * 0.9, bz = dz + py * half * 0.9
        const bump = Math.exp(-(bx * bx + bz * bz) * 0.06)
        const level = Math.min(1, ripple * 0.85 + bump * 0.75)
        const height = 0.12 + level * 1.15
        helper.position.set(dx * GAP, height / 2, dz * GAP)
        helper.scale.set(1, height, 1)
        helper.updateMatrix()
        const i = z * SIDE + x
        m.setMatrixAt(i, helper.matrix)
        if (level < 0.5) tint.copy(low).lerp(mid, level * 2)
        else tint.copy(mid).lerp(high, (level - 0.5) * 2)
        m.setColorAt(i, tint)
      }
    }
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
    if (root.current) root.current.rotation.y = 0.78 + px * 0.25 + Math.sin(t * 0.15) * 0.08
  })
  return (
    <>
      <StudioEnv />
      <directionalLight position={[4, 6, 3]} intensity={2.2} />
      <ambientLight intensity={0.35} />
      <group rotation={[0.62, 0, 0]} position={[0, -0.55, 0]}>
        <group ref={root}>
          <instancedMesh ref={mesh} args={[undefined, undefined, SIDE * SIDE]} frustumCulled={false}>
            <boxGeometry args={[GAP * 0.78, 1, GAP * 0.78]} />
            <meshStandardMaterial metalness={0.65} roughness={0.22} envMapIntensity={1.1} />
          </instancedMesh>
        </group>
      </group>
    </>
  )
}

export default function WaveCubes({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="radial-gradient(ellipse at 50% 60%, #151a45 0%, #090b22 55%, #03040c 100%)">
      <Scene />
    </ThreePreview>
  )
}
