import { AdditiveBlending, BufferAttribute, BufferGeometry, ShaderMaterial } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { useOwned, usePointScale, useSceneFrame } from '../../three/kit'
import { snoise, softPointFragment } from '../../three/glsl'

export const meta = {
  id: 'particle-wave-field',
  title: 'Particle wave field',
  category: '3D',
  description: 'A wide sheet of dots rolling like a calm sea, brighter on the crests and fading into the distance. A quiet, premium backdrop for data, fintech and infrastructure pages.',
  source: ['Web: Three.js points waves example', 'Web: Awwwards dotted-terrain heroes'],
  tags: ['particles', 'waves', 'backdrop', 'shader'],
  notes: ['The pointer raises a soft swell where it hovers.', 'Sits low in the frame so a headline can go above it.'],
} as const satisfies Meta

const COLS = 150
const ROWS = 80
const WIDTH = 9
const DEPTH = 6

const vertex = /* glsl */`
  uniform float uTime;
  uniform float uScale;
  uniform vec2 uPointer;
  varying vec3 vColor;
  varying float vAlpha;
  ${snoise}
  void main() {
    vec3 p = position;
    float swell = sin(p.x * 1.15 + uTime * 0.9) * 0.16 + sin(p.z * 1.7 + uTime * 1.2) * 0.12;
    float drift = snoise(vec3(p.x * 0.45, p.z * 0.45, uTime * 0.14)) * 0.34;
    vec2 away = p.xz - uPointer;
    float lift = exp(-dot(away, away) * 0.9) * 0.45;
    p.y = swell + drift + lift;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = max(1.0, 0.05 * uScale / -mv.z);
    float crest = smoothstep(-0.4, 0.6, p.y);
    vColor = mix(vec3(0.16, 0.2, 0.75), vec3(0.3, 0.9, 1.0), crest) + vec3(1.0) * smoothstep(0.45, 0.9, p.y) * 0.5;
    vAlpha = (0.35 + crest * 0.65) * smoothstep(-3.2, 1.0, position.z) * (1.0 - smoothstep(3.0, 4.6, abs(position.x)));
  }
`

function buildGrid() {
  const position = new Float32Array(COLS * ROWS * 3)
  for (let z = 0; z < ROWS; z++) {
    for (let x = 0; x < COLS; x++) {
      const i = (z * COLS + x) * 3
      position[i] = (x / (COLS - 1) - 0.5) * WIDTH
      position[i + 1] = 0
      position[i + 2] = (z / (ROWS - 1) - 0.5) * DEPTH
    }
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(position, 3))
  return geometry
}

function Scene() {
  const scale = usePointScale()
  const geometry = useOwned(buildGrid)
  const material = useOwned(() => new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uScale: { value: 1 }, uPointer: { value: [0, 0] } },
    vertexShader: vertex,
    fragmentShader: softPointFragment,
    blending: AdditiveBlending,
    transparent: true,
    depthWrite: false,
  }))
  useSceneFrame(({ t, px, py }) => {
    material.uniforms.uTime.value = t
    material.uniforms.uScale.value = scale
    material.uniforms.uPointer.value = [px * WIDTH * 0.42, -py * DEPTH * 0.42]
  })
  return (
    <points geometry={geometry} frustumCulled={false} position={[0, -0.75, 0]} rotation={[0.42, 0, 0]}>
      <primitive object={material} attach="material" />
    </points>
  )
}

export default function ParticleWaveField({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="linear-gradient(180deg, #05061a 0%, #0a1036 55%, #0b1a4a 100%)">
      <Scene />
    </ThreePreview>
  )
}
