import { useRef } from 'react'
import { AdditiveBlending, BufferAttribute, BufferGeometry, ShaderMaterial, type Points } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { seeded, useOwned, usePointScale, useSceneFrame } from '../../three/kit'
import { softPointFragment } from '../../three/glsl'

export const meta = {
  id: 'particle-vortex',
  title: 'Particle vortex',
  category: '3D',
  description: 'Thousands of sparks spiral up a funnel, tight and fast at the bottom, wide and slow at the top, shifting from ember orange to cool blue as they rise. Energy, momentum, a product pulling things together.',
  source: ['Web: Three.js Journey particle shaders', 'Web: GPU particle funnel experiments'],
  tags: ['particles', 'vortex', 'spiral', 'additive'],
  notes: ['Each spark knows only its starting angle and height; the shader works out where it is now.', 'Lean the funnel with the pointer.'],
} as const satisfies Meta

const COUNT = 14000

const vertex = /* glsl */`
  uniform float uTime;
  uniform float uScale;
  attribute float aAngle;
  attribute float aHeight;
  attribute float aRandom;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float h = fract(aHeight + uTime * 0.045 * (0.5 + aRandom));
    float radius = 0.12 + pow(h, 1.7) * 1.95 + aRandom * 0.14;
    float angle = aAngle + uTime * (1.5 / (radius + 0.3));
    vec3 p = vec3(cos(angle) * radius, (h - 0.5) * 3.1, sin(angle) * radius);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = max(1.0, (0.03 + aRandom * 0.05) * uScale / -mv.z);
    vColor = mix(vec3(1.0, 0.55, 0.22), vec3(0.3, 0.55, 1.0), smoothstep(0.1, 0.9, h)) * (0.6 + aRandom * 0.4);
    vAlpha = sin(h * 3.14159) * 0.85;
  }
`

function buildSparks() {
  const random = seeded(5)
  const angle = new Float32Array(COUNT), height = new Float32Array(COUNT), seed = new Float32Array(COUNT)
  for (let i = 0; i < COUNT; i++) {
    angle[i] = random() * Math.PI * 2
    height[i] = random()
    seed[i] = random()
  }
  const geometry = new BufferGeometry()
  // three.js needs a position attribute to know how many points to draw; the shader ignores its values.
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(COUNT * 3), 3))
  geometry.setAttribute('aAngle', new BufferAttribute(angle, 1))
  geometry.setAttribute('aHeight', new BufferAttribute(height, 1))
  geometry.setAttribute('aRandom', new BufferAttribute(seed, 1))
  return geometry
}

function Scene() {
  const points = useRef<Points>(null)
  const scale = usePointScale()
  const geometry = useOwned(buildSparks)
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
    if (!points.current) return
    points.current.rotation.z = -px * 0.35
    points.current.rotation.x = 0.28 - py * 0.3
  })
  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <primitive object={material} attach="material" />
    </points>
  )
}

export default function ParticleVortex({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="radial-gradient(ellipse at 50% 70%, #2a1420 0%, #0f0a1c 50%, #030208 100%)">
      <Scene />
    </ThreePreview>
  )
}
