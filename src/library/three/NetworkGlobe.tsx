import { useMemo, useRef } from 'react'
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, QuadraticBezierCurve3, ShaderMaterial, TubeGeometry, Vector3, type Group } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { Halo, seeded, useOwned, usePointScale, useSceneFrame } from '../../three/kit'
import { softPointFragment } from '../../three/glsl'

export const meta = {
  id: 'network-globe',
  title: 'Network globe',
  category: '3D',
  description: 'A dotted globe with pulses of light travelling along arcs between points on its surface. The standard way to say "global, connected, real-time" on developer and payments sites.',
  source: ['Web: GitHub and Stripe globe heroes', 'Web: Aceternity globe pattern'],
  tags: ['globe', 'network', 'arcs', 'particles'],
  notes: ['Dots are spread evenly with the golden angle rather than mapped to continents, so no texture is loaded.', 'Each arc is a tube whose shader lights a moving segment along its length.'],
} as const satisfies Meta

const R = 1.3
const DOTS = 2600
const ARCS = 11

const dotVertex = /* glsl */`
  uniform float uTime;
  uniform float uScale;
  attribute float aRandom;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float twinkle = 0.65 + 0.35 * sin(uTime * 1.6 + aRandom * 40.0);
    gl_PointSize = max(1.0, (0.03 + aRandom * 0.018) * uScale / -mv.z);
    vColor = mix(vec3(0.3, 0.5, 1.0), vec3(0.45, 0.95, 1.0), aRandom);
    vAlpha = twinkle;
  }
`
const coreVertex = /* glsl */`
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`
const coreFragment = /* glsl */`
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.4);
    vec3 col = mix(vec3(0.02, 0.03, 0.1), vec3(0.16, 0.3, 0.95), fresnel);
    gl_FragColor = vec4(col, 1.0);
  }
`
const arcVertex = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const arcFragment = /* glsl */`
  uniform float uTime;
  uniform float uPhase;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    // The pulse runs past both ends so it fades in and out instead of popping.
    float head = fract(uTime * 0.22 + uPhase) * 1.5 - 0.1;
    float tail = smoothstep(head - 0.4, head, vUv.x) * step(vUv.x, head);
    float track = 0.1;
    gl_FragColor = vec4(uColor, max(tail, track));
  }
`

function onSphere(random: () => number, radius: number) {
  const y = random() * 2 - 1, a = random() * Math.PI * 2, r = Math.sqrt(1 - y * y)
  return new Vector3(Math.cos(a) * r, y, Math.sin(a) * r).multiplyScalar(radius)
}

function buildDots() {
  const random = seeded(3)
  const position = new Float32Array(DOTS * 3)
  const seed = new Float32Array(DOTS)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < DOTS; i++) {
    const y = 1 - (i / (DOTS - 1)) * 2
    const rad = Math.sqrt(1 - y * y)
    position[i * 3] = Math.cos(golden * i) * rad * R * 1.005
    position[i * 3 + 1] = y * R * 1.005
    position[i * 3 + 2] = Math.sin(golden * i) * rad * R * 1.005
    seed[i] = random()
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(position, 3))
  geometry.setAttribute('aRandom', new BufferAttribute(seed, 1))
  return geometry
}

function Arc({ from, to, phase, color }: { from: Vector3; to: Vector3; phase: number; color: string }) {
  const geometry = useOwned(() => {
    const lift = 1 + from.distanceTo(to) * 0.32
    const peak = from.clone().add(to).normalize().multiplyScalar(R * lift)
    return new TubeGeometry(new QuadraticBezierCurve3(from, peak, to), 56, 0.009, 6, false)
  })
  const material = useOwned(() => new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPhase: { value: phase }, uColor: { value: new Color(color) } },
    vertexShader: arcVertex,
    fragmentShader: arcFragment,
    blending: AdditiveBlending,
    transparent: true,
    depthWrite: false,
  }))
  useSceneFrame(({ t }) => { material.uniforms.uTime.value = t })
  return <mesh geometry={geometry}><primitive object={material} attach="material" /></mesh>
}

function Scene() {
  const root = useRef<Group>(null)
  const scale = usePointScale()
  const dots = useOwned(buildDots)
  const dotMaterial = useOwned(() => new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uScale: { value: 1 } },
    vertexShader: dotVertex,
    fragmentShader: softPointFragment,
    blending: AdditiveBlending,
    transparent: true,
    depthWrite: false,
  }))
  const coreMaterial = useOwned(() => new ShaderMaterial({ vertexShader: coreVertex, fragmentShader: coreFragment }))
  const arcs = useMemo(() => {
    const random = seeded(11)
    return Array.from({ length: ARCS }, (_, i) => ({
      from: onSphere(random, R),
      to: onSphere(random, R),
      phase: random(),
      color: i % 3 === 0 ? '#ff6ad5' : i % 3 === 1 ? '#5ee7ff' : '#8f7bff',
    }))
  }, [])
  useSceneFrame(({ t, px, py }) => {
    dotMaterial.uniforms.uTime.value = t
    dotMaterial.uniforms.uScale.value = scale
    if (!root.current) return
    root.current.rotation.y = t * 0.14 + px * 0.6
    root.current.rotation.x = 0.28 - py * 0.35
  })
  return (
    <>
      <group ref={root}>
        <mesh>
          <sphereGeometry args={[R, 64, 64]} />
          <primitive object={coreMaterial} attach="material" />
        </mesh>
        <points geometry={dots}><primitive object={dotMaterial} attach="material" /></points>
        {arcs.map((arc, i) => <Arc key={i} {...arc} />)}
      </group>
      <Halo radius={R * 1.45} color="#3d6bff" power={2.8} strength={0.85} />
    </>
  )
}

export default function NetworkGlobe({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="radial-gradient(ellipse at 50% 55%, #0e1640 0%, #070a22 55%, #02030a 100%)">
      <Scene />
    </ThreePreview>
  )
}
