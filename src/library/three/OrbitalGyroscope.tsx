import { useRef } from 'react'
import type { Group } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { Halo, StudioEnv, useSceneFrame } from '../../three/kit'

export const meta = {
  id: 'orbital-gyroscope',
  title: 'Orbital gyroscope',
  category: '3D',
  description: 'Four mirror-polished rings nested inside each other, each turning on a different axis around a glowing core, like a real gimbal. Reads as precision and balance, for fintech, robotics and navigation products.',
  source: ['Web: Three.js gimbal examples', 'Web: chrome ring hero trend'],
  tags: ['chrome', 'rings', 'gimbal', 'reflection'],
  notes: ['Each ring is a child of the one outside it, so the motion compounds the way a physical gyroscope does.', 'The pointer tilts the whole assembly.'],
} as const satisfies Meta

const RINGS = [
  { radius: 1.5, tube: 0.04, speed: 0.35, axis: 'x' },
  { radius: 1.25, tube: 0.036, speed: -0.5, axis: 'y' },
  { radius: 1.0, tube: 0.032, speed: 0.7, axis: 'x' },
  { radius: 0.75, tube: 0.028, speed: -0.95, axis: 'y' },
] as const

function Scene() {
  const root = useRef<Group>(null)
  const rings = useRef<(Group | null)[]>([])
  const core = useRef<Group>(null)
  useSceneFrame(({ t, px, py }) => {
    RINGS.forEach((r, i) => {
      const g = rings.current[i]
      if (g) g.rotation[r.axis] = t * r.speed + i * 0.6
    })
    if (core.current) core.current.scale.setScalar(1 + Math.sin(t * 2.2) * 0.07)
    if (!root.current) return
    root.current.rotation.y = px * 0.6 + t * 0.08
    root.current.rotation.x = 0.35 - py * 0.4
  })
  // Build the nesting from the inside out: the innermost ring ends up deepest in the tree.
  let nested = (
    <group ref={core}>
      <mesh><sphereGeometry args={[0.2, 32, 32]} /><meshBasicMaterial color="#ffd9a0" toneMapped={false} /></mesh>
      <Halo radius={0.62} color="#ff9d4d" power={2.2} strength={1.1} />
    </group>
  )
  for (let i = RINGS.length - 1; i >= 0; i--) {
    const r = RINGS[i]
    nested = (
      <group ref={el => { rings.current[i] = el }}>
        <mesh>
          <torusGeometry args={[r.radius, r.tube, 24, 160]} />
          <meshStandardMaterial color={i % 2 ? '#f3d9b0' : '#e8edf7'} metalness={1} roughness={0.1} envMapIntensity={1.4} />
        </mesh>
        {nested}
      </group>
    )
  }
  return (
    <>
      <StudioEnv />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <group ref={root}>{nested}</group>
    </>
  )
}

export default function OrbitalGyroscope({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="radial-gradient(ellipse at 50% 48%, #262033 0%, #100d1a 55%, #040308 100%)">
      <Scene />
    </ThreePreview>
  )
}
