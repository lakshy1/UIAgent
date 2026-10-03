import { useRef } from 'react'
import { ShaderMaterial, type Mesh } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { useOwned, useSceneFrame } from '../../three/kit'
import { snoise } from '../../three/glsl'

export const meta = {
  id: 'topographic-terrain',
  title: 'Topographic terrain',
  category: '3D',
  description: 'A landscape drawn only in glowing contour lines, gliding toward the viewer and fading into fog. Technical and calm, for mapping, climate, logistics and developer tools.',
  source: ['Web: contour-line landscape heroes', 'Web: Three.js terrain shader examples'],
  tags: ['terrain', 'contour', 'wireframe', 'shader'],
  notes: ['The mesh never moves: the noise that shapes it is scrolled instead, which gives endless forward travel.', 'Contour lines stay one pixel sharp at any distance because their width is measured with fwidth().'],
} as const satisfies Meta

const vertex = /* glsl */`
  uniform float uTime;
  varying float vHeight;
  varying float vDepth;
  ${snoise}
  void main() {
    vec3 p = position;
    vec2 q = vec2(p.x, p.y + uTime * 0.55);
    float h = snoise(vec3(q * 0.34, 0.0)) * 0.62 + snoise(vec3(q * 0.9, 4.0)) * 0.16;
    // Keep a flat valley down the middle so the eye has a path to follow.
    h *= smoothstep(0.25, 2.4, abs(p.x));
    p.z = h;
    vHeight = h;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`
const fragment = /* glsl */`
  uniform float uTime;
  varying float vHeight;
  varying float vDepth;
  void main() {
    float bands = vHeight * 9.0;
    float f = fract(bands);
    float line = 1.0 - smoothstep(0.0, 1.3, min(f, 1.0 - f) / fwidth(bands));
    vec3 lineColor = mix(vec3(0.2, 0.55, 1.0), vec3(1.0, 0.45, 0.8), smoothstep(-0.2, 0.7, vHeight));
    vec3 col = mix(vec3(0.02, 0.03, 0.09), lineColor, line);
    float fog = 1.0 - smoothstep(4.5, 11.5, vDepth);
    gl_FragColor = vec4(col, fog);
  }
`

function Scene() {
  const mesh = useRef<Mesh>(null)
  const material = useOwned(() => new ShaderMaterial({ uniforms: { uTime: { value: 0 } }, vertexShader: vertex, fragmentShader: fragment, transparent: true }))
  useSceneFrame(({ t, px, py }) => {
    material.uniforms.uTime.value = t
    if (!mesh.current) return
    mesh.current.rotation.z = px * 0.12
    mesh.current.rotation.x = -1.2 + py * 0.06
  })
  return (
    <mesh ref={mesh} position={[0, -1.05, -1.5]} rotation={[-1.2, 0, 0]} frustumCulled={false}>
      <planeGeometry args={[13, 12, 200, 200]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

export default function TopographicTerrain({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="linear-gradient(180deg, #1a1040 0%, #0c0b2a 42%, #05060f 100%)">
      <Scene />
    </ThreePreview>
  )
}
