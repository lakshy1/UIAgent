import { useRef } from 'react'
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, ShaderMaterial, type Group } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { seeded, useOwned, usePointScale, useSceneFrame } from '../../three/kit'
import { softPointFragment } from '../../three/glsl'

export const meta = {
  id: 'particle-galaxy',
  title: 'Particle galaxy',
  category: '3D',
  description: 'Sixteen thousand glowing points arranged in four spiral arms, turning faster near the core than at the rim. Works as a dark hero backdrop or a loading scene.',
  source: ['Web: Three.js Journey galaxy generator', 'Web: r3f-points-fx'],
  tags: ['particles', 'points', 'galaxy', 'additive'],
  notes: ['All motion happens in the vertex shader, so the point buffer is uploaded once.', 'Tilts with the pointer.'],
} as const satisfies Meta

const COUNT = 16000
const RADIUS = 2.3

const vertex = /* glsl */`
  uniform float uTime;
  uniform float uScale;
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    float r = length(p.xz);
    float angle = atan(p.z, p.x) + uTime * (0.22 / (r + 0.45));
    p.x = cos(angle) * r;
    p.z = sin(angle) * r;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = max(1.0, aSize * uScale / -mv.z);
    vColor = aColor;
    vAlpha = 0.85;
  }
`

function buildGalaxy() {
  const random = seeded(7)
  const position = new Float32Array(COUNT * 3)
  const color = new Float32Array(COUNT * 3)
  const size = new Float32Array(COUNT)
  const inner = new Color('#ffcf9e'), outer = new Color('#4a5bff'), c = new Color()
  const scatter = (spread: number) => Math.pow(random(), 2.4) * (random() < 0.5 ? -1 : 1) * spread
  for (let i = 0; i < COUNT; i++) {
    const r = Math.pow(random(), 1.7) * RADIUS + 0.02
    const angle = ((i % 4) / 4) * Math.PI * 2 + r * 1.35
    const spread = 0.08 + r * 0.17
    position[i * 3] = Math.cos(angle) * r + scatter(spread)
    position[i * 3 + 1] = scatter(spread) * 0.45
    position[i * 3 + 2] = Math.sin(angle) * r + scatter(spread)
    c.copy(inner).lerp(outer, Math.min(1, r / (RADIUS * 0.8))).multiplyScalar(0.55 + random() * 0.45)
    color[i * 3] = c.r; color[i * 3 + 1] = c.g; color[i * 3 + 2] = c.b
    size[i] = 0.03 + random() * 0.06
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(position, 3))
  geometry.setAttribute('aColor', new BufferAttribute(color, 3))
  geometry.setAttribute('aSize', new BufferAttribute(size, 1))
  return geometry
}

function Scene() {
  const root = useRef<Group>(null)
  const scale = usePointScale()
  const geometry = useOwned(buildGalaxy)
  const material = useOwned(() => new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uScale: { value: 1 } },
    vertexShader: vertex,
    fragmentShader: softPointFragment,
    blending: AdditiveBlending,
    transparent: true,
    depthWrite: false,
  }))
  useSceneFrame(({ t, px, py }) => {
    material.uniforms.uTime.value = t
    material.uniforms.uScale.value = scale
    if (!root.current) return
    root.current.rotation.x = 1.02 - py * 0.3
    root.current.rotation.z = 0.18 + px * 0.25
  })
  return (
    <group ref={root}>
      <points geometry={geometry} frustumCulled={false}>
        <primitive object={material} attach="material" />
      </points>
    </group>
  )
}

export default function ParticleGalaxy({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="radial-gradient(ellipse at 50% 50%, #0f1030 0%, #06071a 55%, #020208 100%)">
      <Scene />
    </ThreePreview>
  )
}
