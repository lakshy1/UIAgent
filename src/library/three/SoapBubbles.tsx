import { useMemo, useRef } from 'react'
import { Object3D, ShaderMaterial, type InstancedMesh } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { seeded, useOwned, useSceneFrame } from '../../three/kit'
import { palette } from '../../three/glsl'

export const meta = {
  id: 'soap-bubbles',
  title: 'Soap bubbles',
  category: '3D',
  description: 'Clear bubbles drift upward, wobbling slightly, with rainbow film colours sliding around their rims. Light, playful and clean, for consumer apps, kids products and anything meant to feel friendly.',
  source: ['Web: thin-film interference shaders', 'Web: iridescent bubble hero trend'],
  tags: ['bubbles', 'iridescent', 'transparent', 'instancing'],
  notes: ['The film colour depends on viewing angle, so the centre of each bubble stays clear and the rim carries the colour.', 'Bubbles drift away from the pointer.'],
} as const satisfies Meta

const COUNT = 16
const helper = new Object3D()

const vertex = /* glsl */`
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vSeed;
  void main() {
    #ifdef USE_INSTANCING
      mat4 world = modelViewMatrix * instanceMatrix;
      vSeed = instanceMatrix[3].x * 0.37 + instanceMatrix[3].z;
    #else
      mat4 world = modelViewMatrix;
      vSeed = 0.0;
    #endif
    vec4 mv = world * vec4(position, 1.0);
    vNormal = normalize(mat3(world) * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`
const fragment = /* glsl */`
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vSeed;
  ${palette}
  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    float fresnel = pow(1.0 - abs(dot(n, v)), 1.8);
    vec3 film = palette(fresnel * 1.6 + n.y * 0.35 + vSeed + uTime * 0.08,
      vec3(0.55), vec3(0.45), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.33, 0.67));
    vec3 light = normalize(vec3(-0.5, 0.8, 0.6));
    float glint = pow(max(dot(reflect(-light, n), v), 0.0), 90.0);
    float glint2 = pow(max(dot(reflect(-normalize(vec3(0.6, -0.4, 0.7)), n), v), 0.0), 40.0) * 0.35;
    gl_FragColor = vec4(film * (0.55 + fresnel) + glint + glint2, fresnel * 0.85 + 0.05 + glint);
  }
`

function Scene() {
  const mesh = useRef<InstancedMesh>(null)
  const bubbles = useMemo(() => {
    const random = seeded(9)
    return Array.from({ length: COUNT }, () => ({
      x: (random() - 0.5) * 5.4, z: (random() - 0.5) * 2.4, phase: random(), size: 0.16 + Math.pow(random(), 1.8) * 0.5, speed: 0.05 + random() * 0.06, sway: random() * 6.28,
    }))
  }, [])
  const material = useOwned(() => new ShaderMaterial({ uniforms: { uTime: { value: 0 } }, vertexShader: vertex, fragmentShader: fragment, transparent: true, depthWrite: false }))
  useSceneFrame(({ t, px, py }) => {
    material.uniforms.uTime.value = t
    const m = mesh.current
    if (!m) return
    bubbles.forEach((b, i) => {
      const rise = (b.phase + t * b.speed) % 1
      const y = -2.4 + rise * 4.8
      const x = b.x + Math.sin(t * 0.6 + b.sway) * 0.22
      // Push away from the pointer, more strongly when close.
      const dx = x - px * 2.6, dy = y - py * 1.6
      const push = 0.5 / (0.4 + dx * dx + dy * dy)
      const wobble = 1 + Math.sin(t * 2.4 + b.sway) * 0.035
      helper.position.set(x + dx * push, y + dy * push, b.z)
      // Grow from nothing at the bottom and shrink out at the top, so the loop never pops.
      helper.scale.set(b.size * wobble, b.size / wobble, b.size * wobble).multiplyScalar(Math.min(1, rise * 8, (1 - rise) * 8))
      helper.updateMatrix()
      m.setMatrixAt(i, helper.matrix)
    })
    m.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} frustumCulled={false} material={material}>
      <sphereGeometry args={[1, 48, 36]} />
    </instancedMesh>
  )
}

export default function SoapBubbles({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="linear-gradient(170deg, #17336b 0%, #2b5ea8 45%, #7fb6e6 100%)">
      <Scene />
    </ThreePreview>
  )
}
