import { useRef } from 'react'
import { AdditiveBlending, BufferAttribute, BufferGeometry, ShaderMaterial, type Points } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { seeded, useOwned, usePointScale, useSceneFrame } from '../../three/kit'
import { snoise, softPointFragment } from '../../three/glsl'

export const meta = {
  id: 'morphing-particles',
  title: 'Morphing particles',
  category: '3D',
  description: 'Ten thousand points that hold a shape, scatter, and settle into the next one: sphere, ring, cube, then double helix. Good for telling a product story in steps.',
  source: ['Web: r3f-points-fx', 'Web: Codrops particle morphing tutorials'],
  tags: ['particles', 'morph', 'transition', 'shader'],
  notes: ['Every shape is stored as a vertex attribute; the shader blends between two of them, so the morph costs nothing on the CPU.', 'Each point starts its move at a slightly different moment, which gives the scatter.'],
} as const satisfies Meta

const COUNT = 10000
const HOLD = 4.2 // seconds per shape, including the move to the next one

const vertex = /* glsl */`
  uniform float uPhase;
  uniform float uTime;
  uniform float uScale;
  attribute vec3 aRing;
  attribute vec3 aCube;
  attribute vec3 aHelix;
  attribute float aRandom;
  varying vec3 vColor;
  varying float vAlpha;
  ${snoise}
  vec3 shape(float i) {
    if (i < 0.5) return position;
    if (i < 1.5) return aRing;
    if (i < 2.5) return aCube;
    return aHelix;
  }
  void main() {
    float step_ = floor(uPhase);
    float local = fract(uPhase);
    float k = smoothstep(0.0, 1.0, clamp((local - 0.58 - aRandom * 0.14) / 0.26, 0.0, 1.0));
    vec3 from = shape(mod(step_, 4.0));
    vec3 to = shape(mod(step_ + 1.0, 4.0));
    vec3 p = mix(from, to, k);
    float burst = sin(k * 3.14159);
    p += burst * 0.55 * vec3(
      snoise(from * 1.4 + uTime * 0.2),
      snoise(from.yzx * 1.4 + 7.0),
      snoise(from.zxy * 1.4 + 13.0));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = max(1.0, (0.035 + aRandom * 0.03) * uScale / -mv.z);
    vec3 cool = vec3(0.25, 0.55, 1.0);
    vec3 warm = vec3(1.0, 0.4, 0.75);
    vColor = mix(cool, warm, clamp(p.y * 0.38 + 0.5, 0.0, 1.0)) + vec3(1.0, 0.9, 0.7) * burst * 0.45;
    vAlpha = 0.8;
  }
`

function buildShapes() {
  const random = seeded(21)
  const sphere = new Float32Array(COUNT * 3)
  const ring = new Float32Array(COUNT * 3)
  const cube = new Float32Array(COUNT * 3)
  const helix = new Float32Array(COUNT * 3)
  const seed = new Float32Array(COUNT)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < COUNT; i++) {
    const o = i * 3
    // Sphere: evenly spread with the golden angle
    const y = 1 - (i / (COUNT - 1)) * 2
    const rad = Math.sqrt(1 - y * y)
    sphere[o] = Math.cos(golden * i) * rad * 1.3
    sphere[o + 1] = y * 1.3
    sphere[o + 2] = Math.sin(golden * i) * rad * 1.3
    // Ring: a torus facing the camera
    const u = random() * Math.PI * 2, v = random() * Math.PI * 2
    ring[o] = (1.08 + 0.36 * Math.cos(v)) * Math.cos(u)
    ring[o + 1] = (1.08 + 0.36 * Math.cos(v)) * Math.sin(u)
    ring[o + 2] = 0.36 * Math.sin(v)
    // Cube: points on the six faces
    const face = Math.floor(random() * 6), a = random() * 2 - 1, b = random() * 2 - 1, side = face % 2 ? 1 : -1
    const axis = Math.floor(face / 2)
    cube[o + axis] = side * 0.95
    cube[o + ((axis + 1) % 3)] = a * 0.95
    cube[o + ((axis + 2) % 3)] = b * 0.95
    // Helix: two intertwined strands
    const along = random() * 2 - 1
    const turn = along * Math.PI * 2.6 + (i % 2) * Math.PI
    helix[o] = Math.cos(turn) * 0.62 + (random() - 0.5) * 0.09
    helix[o + 1] = along * 1.55
    helix[o + 2] = Math.sin(turn) * 0.62 + (random() - 0.5) * 0.09
    seed[i] = random()
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(sphere, 3))
  geometry.setAttribute('aRing', new BufferAttribute(ring, 3))
  geometry.setAttribute('aCube', new BufferAttribute(cube, 3))
  geometry.setAttribute('aHelix', new BufferAttribute(helix, 3))
  geometry.setAttribute('aRandom', new BufferAttribute(seed, 1))
  return geometry
}

function Scene() {
  const points = useRef<Points>(null)
  const scale = usePointScale()
  const geometry = useOwned(buildShapes)
  const material = useOwned(() => new ShaderMaterial({
    uniforms: { uPhase: { value: 0 }, uTime: { value: 0 }, uScale: { value: 1 } },
    vertexShader: vertex,
    fragmentShader: softPointFragment,
    blending: AdditiveBlending,
    transparent: true,
    depthWrite: false,
  }))
  useSceneFrame(({ t, px, py }) => {
    material.uniforms.uTime.value = t
    material.uniforms.uPhase.value = t / HOLD
    material.uniforms.uScale.value = scale
    if (!points.current) return
    points.current.rotation.y = t * 0.18 + px * 0.6
    points.current.rotation.x = 0.25 - py * 0.35
  })
  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <primitive object={material} attach="material" />
    </points>
  )
}

export default function MorphingParticles({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="radial-gradient(ellipse at 50% 45%, #171233 0%, #0a0919 55%, #030308 100%)">
      <Scene />
    </ThreePreview>
  )
}
