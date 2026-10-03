import { useMemo, useRef } from 'react'
import { EdgesGeometry, IcosahedronGeometry, OctahedronGeometry, ShaderMaterial, type Group } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { useOwned, useSceneFrame } from '../../three/kit'

export const meta = {
  id: 'prism-gem',
  title: 'Prism gem',
  category: '3D',
  description: 'A faceted crystal that splits light into colour at every edge as it turns, with small shards orbiting it. Suits jewellery, luxury, crypto and premium-tier moments.',
  source: ['Web: 21st.dev dither prism hero', 'Web: glass dispersion shader trend'],
  tags: ['glass', 'refraction', 'dispersion', 'crystal'],
  notes: ['Dispersion is faked by bending the view ray three times, once per colour channel, into a procedural studio backdrop, so no extra render pass is needed.', 'Facet normals come from screen-space derivatives, which keeps every face perfectly flat.'],
} as const satisfies Meta

const vertex = /* glsl */`
  varying vec3 vViewPos;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`
const fragment = /* glsl */`
  uniform float uTime;
  varying vec3 vViewPos;
  // A studio that exists only as a function of direction: a gradient, two light strips and a top light.
  vec3 studio(vec3 d) {
    float up = d.y * 0.5 + 0.5;
    vec3 c = mix(vec3(0.02, 0.02, 0.07), vec3(0.22, 0.32, 0.9), smoothstep(0.0, 1.0, up));
    c += vec3(1.0, 0.5, 0.8) * smoothstep(0.72, 0.98, sin(d.x * 4.0 + d.y * 2.0 + uTime * 0.3) * 0.5 + 0.5) * 0.95;
    c += vec3(0.35, 1.0, 0.95) * smoothstep(0.78, 0.99, sin(d.z * 5.0 - d.y * 3.0 - uTime * 0.2) * 0.5 + 0.5) * 0.85;
    c += vec3(1.0) * pow(max(d.y, 0.0), 6.0) * 1.3;
    return c;
  }
  void main() {
    vec3 view = normalize(vViewPos);
    vec3 n = normalize(cross(dFdx(vViewPos), dFdy(vViewPos)));
    if (dot(n, view) > 0.0) n = -n;
    vec3 col = vec3(
      studio(refract(view, n, 1.0 / 1.40)).r,
      studio(refract(view, n, 1.0 / 1.47)).g,
      studio(refract(view, n, 1.0 / 1.56)).b);
    float fresnel = pow(1.0 - max(dot(-view, n), 0.0), 3.0);
    col = mix(col * 1.1, studio(reflect(view, n)), 0.14 + 0.62 * fresnel);
    gl_FragColor = vec4(col, 1.0);
  }
`

const SHARDS = [
  { radius: 1.75, speed: 0.42, tilt: 0.5, size: 0.17, offset: 0 },
  { radius: 2.0, speed: -0.3, tilt: -0.8, size: 0.12, offset: 2.1 },
  { radius: 1.6, speed: 0.55, tilt: 1.3, size: 0.1, offset: 4.2 },
]

function Scene() {
  const gem = useRef<Group>(null)
  const shards = useRef<Group>(null)
  const material = useOwned(() => new ShaderMaterial({ uniforms: { uTime: { value: 0 } }, vertexShader: vertex, fragmentShader: fragment }))
  const body = useOwned(() => new IcosahedronGeometry(1.2, 0))
  const shard = useOwned(() => new OctahedronGeometry(1, 0))
  const edges = useMemo(() => new EdgesGeometry(body), [body])
  useSceneFrame(({ t, px, py }) => {
    material.uniforms.uTime.value = t
    if (gem.current) {
      gem.current.rotation.y = t * 0.26 + px * 0.6
      gem.current.rotation.x = 0.3 + Math.sin(t * 0.21) * 0.25 - py * 0.4
    }
    shards.current?.children.forEach((child, i) => {
      const s = SHARDS[i]
      const a = t * s.speed + s.offset
      child.position.set(Math.cos(a) * s.radius, Math.sin(a * 1.3 + s.tilt) * 0.7, Math.sin(a) * s.radius * 0.6)
      child.rotation.set(a * 1.7, a * 1.1, 0)
    })
  })
  return (
    <>
      <group ref={gem}>
        <mesh geometry={body} material={material} />
        <lineSegments geometry={edges}><lineBasicMaterial color="#ffffff" transparent opacity={0.22} /></lineSegments>
      </group>
      <group ref={shards}>
        {SHARDS.map((s, i) => <mesh key={i} geometry={shard} material={material} scale={[s.size, s.size * 1.7, s.size]} />)}
      </group>
    </>
  )
}

export default function PrismGem({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="radial-gradient(ellipse at 50% 45%, #1a1a3a 0%, #0b0b1e 55%, #040409 100%)">
      <Scene />
    </ThreePreview>
  )
}
