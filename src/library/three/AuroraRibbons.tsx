import { useRef } from 'react'
import { AdditiveBlending, Color, DoubleSide, ShaderMaterial, type Group } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { useOwned, useSceneFrame } from '../../three/kit'
import { snoise } from '../../three/glsl'

export const meta = {
  id: 'aurora-ribbons',
  title: 'Aurora ribbons',
  category: '3D',
  description: 'Five translucent ribbons of light that drift, cross and slowly twist, like silk in still air. A soft, elegant backdrop for wellness, finance and editorial brands.',
  source: ['Web: Stripe-style gradient ribbon heroes', 'Web: Codrops ribbon shader experiments'],
  tags: ['ribbons', 'gradient', 'shader', 'ambient'],
  notes: ['Each ribbon is a flat strip bent in the vertex shader; its width axis is rotated along its length to give the twist.', 'Additive blending makes crossings glow brighter.'],
} as const satisfies Meta

const RIBBONS = [
  { phase: 0.0, offset: 0.55, a: '#3d5bff', b: '#35e0ff', width: 0.42 },
  { phase: 1.7, offset: 0.2, a: '#8a4bff', b: '#ff5fc4', width: 0.36 },
  { phase: 3.1, offset: -0.1, a: '#22c7c0', b: '#5b7cff', width: 0.46 },
  { phase: 4.6, offset: -0.4, a: '#ff7a59', b: '#c44bff', width: 0.3 },
  { phase: 6.0, offset: -0.7, a: '#35e0ff', b: '#7dffb0', width: 0.26 },
]

const vertex = /* glsl */`
  uniform float uTime;
  uniform float uPhase;
  uniform float uOffset;
  varying vec2 vUv;
  ${snoise}
  void main() {
    vUv = uv;
    float x = position.x;
    float across = position.y;
    vec3 spine = vec3(
      x,
      sin(x * 0.8 + uTime * 0.5 + uPhase) * 0.42 + snoise(vec3(x * 0.32, uPhase, uTime * 0.13)) * 0.5 + uOffset,
      cos(x * 0.6 + uTime * 0.36 + uPhase * 1.7) * 0.7);
    float twist = x * 0.85 + uTime * 0.42 + uPhase;
    vec3 p = spine + vec3(0.0, cos(twist), sin(twist)) * across;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`
const fragment = /* glsl */`
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uTime;
  uniform float uPhase;
  varying vec2 vUv;
  void main() {
    vec3 col = mix(uColorA, uColorB, smoothstep(0.1, 0.9, vUv.x + sin(uTime * 0.2 + uPhase) * 0.2));
    float body = pow(sin(vUv.y * 3.14159), 1.6);
    float ends = smoothstep(0.0, 0.18, vUv.x) * (1.0 - smoothstep(0.82, 1.0, vUv.x));
    float sheen = 0.75 + 0.25 * sin(vUv.x * 26.0 - uTime * 1.3 + uPhase);
    gl_FragColor = vec4(col * sheen, body * ends * 0.62);
  }
`

function Ribbon({ phase, offset, a, b, width }: (typeof RIBBONS)[number]) {
  const material = useOwned(() => new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPhase: { value: phase }, uOffset: { value: offset }, uColorA: { value: new Color(a) }, uColorB: { value: new Color(b) } },
    vertexShader: vertex,
    fragmentShader: fragment,
    blending: AdditiveBlending,
    side: DoubleSide,
    transparent: true,
    depthWrite: false,
  }))
  useSceneFrame(({ t }) => { material.uniforms.uTime.value = t })
  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[9, width, 240, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

function Scene() {
  const root = useRef<Group>(null)
  useSceneFrame(({ px, py }) => {
    if (!root.current) return
    root.current.rotation.y = px * 0.25
    root.current.rotation.x = -py * 0.18
  })
  return <group ref={root} rotation={[0, 0, -0.12]}>{RIBBONS.map(r => <Ribbon key={r.phase} {...r} />)}</group>
}

export default function AuroraRibbons({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="linear-gradient(160deg, #070a24 0%, #0b0d2c 45%, #130a2a 100%)">
      <Scene />
    </ThreePreview>
  )
}
