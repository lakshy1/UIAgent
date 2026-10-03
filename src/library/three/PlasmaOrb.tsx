import { useRef } from 'react'
import { ShaderMaterial, type Group } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { Halo, useOwned, useSceneFrame } from '../../three/kit'
import { snoise } from '../../three/glsl'

export const meta = {
  id: 'plasma-orb',
  title: 'Plasma orb',
  category: '3D',
  description: 'A glowing sphere with slow, swirling colour inside it, the look voice assistants and AI products use to show that something is listening or thinking.',
  source: ['Web: AI assistant orb trend', 'Web: 21st.dev shader components'],
  tags: ['shader', 'orb', 'ai', 'glow'],
  notes: ['The swirl is domain-warped noise sampled in the fragment shader, so the geometry stays a plain sphere.', 'Pulls toward the pointer; a soft halo is drawn on a second, larger sphere.'],
} as const satisfies Meta

const vertex = /* glsl */`
  varying vec3 vPos;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vPos = position;
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`
const fragment = /* glsl */`
  uniform float uTime;
  uniform float uEnergy;
  varying vec3 vPos;
  varying vec3 vNormal;
  varying vec3 vView;
  ${snoise}
  void main() {
    float t = uTime * 0.22;
    vec3 p = vPos * 1.25;
    vec3 warp = vec3(
      snoise(p + vec3(t, 0.0, 0.0)),
      snoise(p + vec3(5.2, 1.3 - t, 2.8)),
      snoise(p + vec3(1.7, 9.2, 3.1 + t * 0.7)));
    float n = snoise(p + warp * (0.75 + uEnergy * 0.5) + t) * 0.5 + 0.5;
    vec3 deep = vec3(0.09, 0.07, 0.42);
    vec3 mid = vec3(0.28, 0.42, 1.0);
    vec3 hot = vec3(1.0, 0.45, 0.85);
    vec3 col = mix(deep, mid, smoothstep(0.15, 0.6, n));
    col = mix(col, hot, smoothstep(0.55, 0.95, n));
    col += vec3(0.55, 0.95, 1.0) * smoothstep(0.8, 1.0, n) * 0.6;
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.6);
    col = col * (0.8 + 0.35 * n) + fresnel * vec3(0.6, 0.82, 1.0) * 1.1;
    gl_FragColor = vec4(col, 1.0);
  }
`

function Scene() {
  const root = useRef<Group>(null)
  const material = useOwned(() => new ShaderMaterial({ uniforms: { uTime: { value: 0 }, uEnergy: { value: 0 } }, vertexShader: vertex, fragmentShader: fragment }))
  useSceneFrame(({ t, px, py }) => {
    material.uniforms.uTime.value = t
    material.uniforms.uEnergy.value = Math.min(1, Math.hypot(px, py))
    if (!root.current) return
    root.current.position.set(px * 0.3, py * 0.2, 0)
    root.current.rotation.y = t * 0.1
    root.current.scale.setScalar(1 + Math.sin(t * 1.4) * 0.025)
  })
  return (
    <group ref={root}>
      <mesh>
        <sphereGeometry args={[1.05, 96, 96]} />
        <primitive object={material} attach="material" />
      </mesh>
      <Halo radius={1.75} color="#5b7cff" power={2.4} strength={0.95} />
      <Halo radius={2.5} color="#b04bff" power={3.4} strength={0.5} />
    </group>
  )
}

export default function PlasmaOrb({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="radial-gradient(ellipse at 50% 50%, #131538 0%, #080a1f 55%, #03040b 100%)">
      <Scene />
    </ThreePreview>
  )
}
