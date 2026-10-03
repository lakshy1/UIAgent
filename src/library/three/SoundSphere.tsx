import { useRef } from 'react'
import { AdditiveBlending, BufferAttribute, BufferGeometry, ShaderMaterial, type Points } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { useOwned, usePointScale, useSceneFrame } from '../../three/kit'
import { snoise, softPointFragment } from '../../three/glsl'

export const meta = {
  id: 'sound-sphere',
  title: 'Sound sphere',
  category: '3D',
  description: 'A sphere of dots that pulses as if music were playing through it: bands of dots jump outward in rhythm while slower waves roll across the surface. For audio products, voice features and live status.',
  source: ['Web: audio-reactive sphere visualisers', 'Web: Three.js Journey particle shaders'],
  tags: ['audio', 'visualiser', 'particles', 'pulse'],
  notes: ['The rhythm here is synthesised; to make it react to real sound, feed an analyser level into the uLevel uniform.', 'Pointer distance from the centre raises the energy.'],
} as const satisfies Meta

const COUNT = 9000

const vertex = /* glsl */`
  uniform float uTime;
  uniform float uScale;
  uniform float uLevel;
  varying vec3 vColor;
  varying float vAlpha;
  ${snoise}
  void main() {
    vec3 n = normalize(position);
    float beat = pow(abs(sin(uTime * 2.6)), 8.0);
    float bands = pow(abs(sin(n.y * 9.0 + uTime * 1.8)), 10.0) * (0.1 + beat * 0.18);
    float roll = snoise(n * 1.7 + vec3(0.0, uTime * 0.35, 0.0)) * 0.14;
    float push = (bands + roll) * (0.7 + uLevel * 0.9);
    vec3 p = n * (1.2 + push);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = max(1.0, (0.028 + push * 0.09) * uScale / -mv.z);
    vColor = mix(vec3(0.35, 0.3, 1.0), vec3(1.0, 0.35, 0.7), smoothstep(-0.05, 0.3, push)) + vec3(1.0, 0.9, 0.7) * smoothstep(0.22, 0.4, push);
    // Dim the far side so the sphere reads as a solid.
    float facing = dot(normalize(normalMatrix * n), normalize(-mv.xyz));
    vAlpha = 0.25 + 0.75 * smoothstep(-0.3, 0.5, facing);
  }
`

function buildSphere() {
  const position = new Float32Array(COUNT * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2
    const rad = Math.sqrt(1 - y * y)
    position[i * 3] = Math.cos(golden * i) * rad
    position[i * 3 + 1] = y
    position[i * 3 + 2] = Math.sin(golden * i) * rad
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(position, 3))
  return geometry
}

function Scene() {
  const points = useRef<Points>(null)
  const scale = usePointScale()
  const geometry = useOwned(buildSphere)
  const material = useOwned(() => new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uScale: { value: 1 }, uLevel: { value: 0 } },
    vertexShader: vertex,
    fragmentShader: softPointFragment,
    blending: AdditiveBlending,
    transparent: true,
    depthWrite: false,
  }))
  useSceneFrame(({ t, px, py }) => {
    material.uniforms.uTime.value = t
    material.uniforms.uScale.value = scale
    material.uniforms.uLevel.value = Math.min(1, Math.hypot(px, py))
    if (!points.current) return
    points.current.rotation.y = t * 0.15 + px * 0.5
    points.current.rotation.x = 0.2 - py * 0.35
  })
  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <primitive object={material} attach="material" />
    </points>
  )
}

export default function SoundSphere({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="radial-gradient(ellipse at 50% 50%, #1d1238 0%, #0b081c 55%, #030208 100%)">
      <Scene />
    </ThreePreview>
  )
}
