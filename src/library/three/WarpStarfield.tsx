import { useRef } from 'react'
import { AdditiveBlending, BufferAttribute, BufferGeometry, ShaderMaterial, type Points } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { seeded, useOwned, usePointScale, useSceneFrame } from '../../three/kit'
import { softPointFragment } from '../../three/glsl'

export const meta = {
  id: 'warp-starfield',
  title: 'Warp starfield',
  category: '3D',
  description: 'Stars rush past the camera from a distant point, growing and brightening as they come. Moving the pointer away from the centre pushes the ship faster. A classic sense of speed for launches and loading moments.',
  source: ['Web: React Bits hyperspeed and galaxy backgrounds', 'Web: Three.js starfield examples'],
  tags: ['stars', 'particles', 'speed', 'backdrop'],
  notes: ['Each star loops along the depth axis inside the vertex shader, so nothing is updated on the CPU.', 'Blue stars are far, warm white ones are close.'],
} as const satisfies Meta

const COUNT = 5200
const DEPTH = 46 // keep in step with the 46.0 / 40.0 wrap in the vertex shader

const vertex = /* glsl */`
  uniform float uTravel;
  uniform float uScale;
  attribute float aRandom;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    // Wrap along the depth axis: a star that passes the camera reappears at the far end.
    p.z = mod(p.z + uTravel, 46.0) - 40.0;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float near = 1.0 - smoothstep(2.0, 46.0, -mv.z);
    gl_PointSize = max(1.0, (0.05 + aRandom * 0.09) * uScale / -mv.z);
    vColor = mix(vec3(0.45, 0.6, 1.0), vec3(1.0, 0.95, 0.88), near) * (0.6 + aRandom * 0.4);
    vAlpha = near * smoothstep(0.4, 2.5, -mv.z);
  }
`

function buildStars() {
  const random = seeded(42)
  const position = new Float32Array(COUNT * 3)
  const seed = new Float32Array(COUNT)
  for (let i = 0; i < COUNT; i++) {
    // Keep a clear corridor down the middle so stars streak past instead of hitting the lens.
    const angle = random() * Math.PI * 2
    const radius = 0.6 + Math.pow(random(), 0.7) * 9
    position[i * 3] = Math.cos(angle) * radius
    position[i * 3 + 1] = Math.sin(angle) * radius * 0.7
    position[i * 3 + 2] = random() * DEPTH
    seed[i] = random()
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(position, 3))
  geometry.setAttribute('aRandom', new BufferAttribute(seed, 1))
  return geometry
}

function Scene() {
  const points = useRef<Points>(null)
  const travel = useRef(0)
  const scale = usePointScale()
  const geometry = useOwned(buildStars)
  const material = useOwned(() => new ShaderMaterial({
    uniforms: { uTravel: { value: 12 }, uScale: { value: 1 } },
    vertexShader: vertex,
    fragmentShader: softPointFragment,
    blending: AdditiveBlending,
    transparent: true,
    depthWrite: false,
  }))
  useSceneFrame(({ dt, px, py }) => {
    travel.current += dt * (5 + Math.hypot(px, py) * 16)
    material.uniforms.uTravel.value = 12 + travel.current
    material.uniforms.uScale.value = scale
    if (!points.current) return
    points.current.rotation.y = -px * 0.18
    points.current.rotation.x = py * 0.14
    points.current.rotation.z += dt * 0.03
  })
  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <primitive object={material} attach="material" />
    </points>
  )
}

export default function WarpStarfield({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="radial-gradient(ellipse at 50% 50%, #101a44 0%, #060819 50%, #010104 100%)">
      <Scene />
    </ThreePreview>
  )
}
