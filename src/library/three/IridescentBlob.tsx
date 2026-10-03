import { useRef } from 'react'
import { ShaderMaterial, type Mesh } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { useOwned, useSceneFrame } from '../../three/kit'
import { palette, snoise } from '../../three/glsl'

export const meta = {
  id: 'iridescent-blob',
  title: 'Iridescent blob',
  category: '3D',
  description: 'A liquid sphere that breathes with layered noise and shifts colour across its surface like oil on water. A strong centrepiece for an AI, design-tool or creative-studio hero.',
  source: ['Web: 21st.dev shader card', 'Web: Awwwards noise-blob heroes'],
  tags: ['shader', 'noise', 'iridescent', 'hero'],
  notes: ['The surface is displaced in the vertex shader; normals are rebuilt from two neighbouring samples so the lighting stays smooth.', 'Honours reduced motion by holding a single still frame.'],
} as const satisfies Meta

const vertex = /* glsl */`
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vField;
  ${snoise}
  float field(vec3 p) {
    return snoise(p * 0.85 + vec3(0.0, 0.0, uTime * 0.22)) * 0.26
         + snoise(p * 2.2 - vec3(uTime * 0.17)) * 0.06;
  }
  vec3 surface(vec3 n) { return n * (1.18 + field(n)); }
  void main() {
    vec3 n = normalize(position);
    vec3 axis = abs(n.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
    vec3 t1 = normalize(cross(n, axis));
    vec3 t2 = cross(n, t1);
    vec3 p = surface(n);
    vec3 pa = surface(normalize(n + t1 * 0.02));
    vec3 pb = surface(normalize(n + t2 * 0.02));
    vec3 displaced = normalize(cross(pa - p, pb - p));
    if (dot(displaced, n) < 0.0) displaced = -displaced;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vNormal = normalize(normalMatrix * displaced);
    vView = normalize(-mv.xyz);
    vField = field(n);
    gl_Position = projectionMatrix * mv;
  }
`
const fragment = /* glsl */`
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vField;
  ${palette}
  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    float fresnel = pow(1.0 - max(dot(n, v), 0.0), 2.2);
    vec3 film = palette(fresnel * 1.15 + vField * 1.6 + uTime * 0.04,
      vec3(0.5), vec3(0.5), vec3(1.0, 1.0, 1.0), vec3(0.30, 0.20, 0.20));
    vec3 light = normalize(vec3(0.5, 0.8, 0.6));
    float diffuse = max(dot(n, light), 0.0) * 0.55 + 0.45;
    float spec = pow(max(dot(reflect(-light, n), v), 0.0), 48.0);
    vec3 col = mix(vec3(0.05, 0.04, 0.13), film, 0.3 + 0.7 * fresnel) * diffuse;
    col += spec * 0.75 + fresnel * fresnel * vec3(0.45, 0.65, 1.0) * 0.45;
    gl_FragColor = vec4(col, 1.0);
  }
`

function Scene() {
  const mesh = useRef<Mesh>(null)
  const material = useOwned(() => new ShaderMaterial({ uniforms: { uTime: { value: 0 } }, vertexShader: vertex, fragmentShader: fragment }))
  useSceneFrame(({ t, px, py }) => {
    material.uniforms.uTime.value = t
    if (!mesh.current) return
    mesh.current.rotation.y = t * 0.12 + px * 0.5
    mesh.current.rotation.x = -py * 0.35
  })
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 160, 160]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

export default function IridescentBlob({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="radial-gradient(ellipse at 50% 40%, #1b1440 0%, #0a0820 55%, #04030c 100%)">
      <Scene />
    </ThreePreview>
  )
}
