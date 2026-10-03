import { ShaderMaterial } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { useOwned, useSceneFrame } from '../../three/kit'
import { snoise } from '../../three/glsl'

export const meta = {
  id: 'mesh-gradient',
  title: 'Flowing mesh gradient',
  category: '3D',
  description: 'Large pools of colour that fold into each other like ink in water, with a fine film grain on top. The moving gradient backdrop made famous by payment and AI product pages.',
  source: ['Web: Stripe gradient hero', 'Web: shader-gradient and mesh-gradient trend'],
  tags: ['gradient', 'shader', 'backdrop', 'ambient'],
  notes: ['One full-frame plane and one fragment shader: colour comes from noise that is warped by more noise.', 'The pointer pulls the colour pools toward it.'],
} as const satisfies Meta

const vertex = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const fragment = /* glsl */`
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec2 vUv;
  ${snoise}
  float grain(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  void main() {
    vec2 p = vUv * vec2(1.6, 1.0) + uPointer * 0.12;
    float t = uTime * 0.07;
    vec2 warp = vec2(snoise(vec3(p * 0.9, t)), snoise(vec3(p * 0.9 + 4.7, t * 1.2)));
    vec2 q = p + warp * 0.45;
    float a = snoise(vec3(q * 0.8, t * 1.4)) * 0.5 + 0.5;
    float b = snoise(vec3(q * 1.3 + 9.1, t * 0.9)) * 0.5 + 0.5;
    float c = snoise(vec3(q * 0.55 - 3.3, t * 1.7)) * 0.5 + 0.5;
    vec3 col = vec3(0.07, 0.05, 0.25);
    col = mix(col, vec3(0.36, 0.25, 1.0), smoothstep(0.25, 0.85, a));
    col = mix(col, vec3(1.0, 0.36, 0.62), smoothstep(0.45, 0.95, b) * 0.85);
    col = mix(col, vec3(0.1, 0.82, 0.95), smoothstep(0.5, 1.0, c) * 0.75);
    col = mix(col, vec3(1.0, 0.75, 0.4), smoothstep(0.72, 1.0, a * b) * 0.7);
    col += (grain(vUv * 900.0 + uTime) - 0.5) * 0.045;
    gl_FragColor = vec4(col, 1.0);
  }
`

function Scene() {
  const material = useOwned(() => new ShaderMaterial({ uniforms: { uTime: { value: 0 }, uPointer: { value: [0, 0] } }, vertexShader: vertex, fragmentShader: fragment }))
  useSceneFrame(({ t, px, py }) => {
    material.uniforms.uTime.value = t
    material.uniforms.uPointer.value = [-px, -py]
  })
  // Oversized so it covers the frame at any aspect ratio, phone included.
  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[14, 14]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

export default function MeshGradient({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="linear-gradient(135deg, #1a0f55 0%, #5b3cf5 55%, #ff5c9e 100%)">
      <Scene />
    </ThreePreview>
  )
}
