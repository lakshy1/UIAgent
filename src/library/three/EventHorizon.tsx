import { useRef } from 'react'
import { AdditiveBlending, DoubleSide, ShaderMaterial, type Group } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { Halo, useOwned, useSceneFrame } from '../../three/kit'
import { snoise } from '../../three/glsl'

export const meta = {
  id: 'event-horizon',
  title: 'Event horizon',
  category: '3D',
  description: 'A black hole: a disc of white-hot gas streams around a perfectly dark sphere, faster near the centre, with a thin ring of light hugging the edge and an arc bent over the top. Scale, gravity and awe, for science, space and big-idea launch pages.',
  source: ['Web: Interstellar-style black hole shaders', '33-clickwise'],
  tags: ['space', 'black-hole', 'shader', 'glow'],
  notes: ['The gas is noise sampled in polar coordinates and rotated faster at small radius, which gives the shearing streaks.', 'The arc over the top stands in for gravitational lensing; it is drawn, not ray-traced.'],
} as const satisfies Meta

const vertex = /* glsl */`
  varying vec2 vPos;
  void main() {
    vPos = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const fragment = /* glsl */`
  uniform float uTime;
  uniform float uInner;
  uniform float uOuter;
  varying vec2 vPos;
  ${snoise}
  void main() {
    float r = length(vPos);
    float band = (r - uInner) / (uOuter - uInner);
    float angle = atan(vPos.y, vPos.x) + uTime * 0.9 / pow(r, 1.5);
    vec2 swirl = vec2(cos(angle), sin(angle)) * r;
    float gas = snoise(vec3(swirl * 2.6, uTime * 0.12)) * 0.5 + snoise(vec3(swirl * 6.5, 3.0)) * 0.25 + 0.55;
    float streaks = 0.65 + 0.35 * sin(r * 34.0 + snoise(vec3(swirl * 1.5, 1.0)) * 5.0);
    float edge = smoothstep(0.0, 0.07, band) * (1.0 - smoothstep(0.35, 1.0, band));
    vec3 hot = vec3(1.0, 0.95, 0.85);
    vec3 warm = vec3(1.0, 0.52, 0.16);
    vec3 cool = vec3(0.55, 0.12, 0.3);
    vec3 col = mix(hot, warm, smoothstep(0.0, 0.3, band));
    col = mix(col, cool, smoothstep(0.3, 0.95, band));
    gl_FragColor = vec4(col, edge * gas * streaks * 1.25);
  }
`

function Disc({ inner, outer }: { inner: number; outer: number }) {
  const material = useOwned(() => new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uInner: { value: inner }, uOuter: { value: outer } },
    vertexShader: vertex,
    fragmentShader: fragment,
    blending: AdditiveBlending,
    side: DoubleSide,
    transparent: true,
    depthWrite: false,
  }))
  useSceneFrame(({ t }) => { material.uniforms.uTime.value = t })
  return (
    <mesh>
      <ringGeometry args={[inner, outer, 160, 24]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

function Scene() {
  const root = useRef<Group>(null)
  useSceneFrame(({ t, px, py }) => {
    if (!root.current) return
    root.current.rotation.z = 0.16 + px * 0.25 + Math.sin(t * 0.2) * 0.03
    root.current.rotation.x = -py * 0.2
  })
  return (
    <group ref={root}>
      {/* The disc, seen nearly edge-on. */}
      <group rotation={[-1.36, 0, 0]}><Disc inner={0.86} outer={2.7} /></group>
      {/* The far side of the disc, bent up and over the top by gravity. */}
      <group rotation={[0.1, 0, 0]}><Disc inner={0.84} outer={1.22} /></group>
      <mesh><sphereGeometry args={[0.8, 64, 64]} /><meshBasicMaterial color="#000000" /></mesh>
      <mesh><torusGeometry args={[0.82, 0.012, 12, 160]} /><meshBasicMaterial color="#ffe9c9" toneMapped={false} /></mesh>
      <Halo radius={1.7} color="#ff8a3d" power={3} strength={0.7} />
    </group>
  )
}

export default function EventHorizon({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="radial-gradient(ellipse at 50% 50%, #1a0f14 0%, #09060b 50%, #010102 100%)">
      <Scene />
    </ThreePreview>
  )
}
