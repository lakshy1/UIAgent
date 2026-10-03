import { createContext, useContext, useEffect, useMemo, useRef, type RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { AdditiveBlending, BackSide, Color, ShaderMaterial } from 'three'

/** What ThreePreview hands every scene: the raw pointer (-1..1), and whether to draw and to move. */
export interface SceneState {
  pointer: RefObject<{ x: number; y: number }>
  visible: boolean
  reduced: boolean
}
export const SceneContext = createContext<SceneState | null>(null)

export interface Tick {
  t: number   // seconds; frozen when the viewer prefers reduced motion
  dt: number  // clamped frame delta, 0 when motion is reduced
  px: number  // damped pointer, -1 (left) to 1 (right)
  py: number  // damped pointer, -1 (bottom) to 1 (top)
}

const STILL_TIME = 3.2

/** useFrame for scenes: skips off-screen views, eases the pointer and freezes time for reduced motion. */
export function useSceneFrame(fn: (tick: Tick) => void) {
  const scene = useContext(SceneContext)
  const eased = useRef({ x: 0, y: 0 })
  useFrame(({ clock }, delta) => {
    if (!scene || !scene.visible) return
    const dt = scene.reduced ? 0 : Math.min(delta, .05)
    const k = scene.reduced ? 1 : 1 - Math.exp(-dt * 4)
    const e = eased.current
    e.x += (scene.pointer.current.x - e.x) * k
    e.y += (-scene.pointer.current.y - e.y) * k
    fn({ t: scene.reduced ? STILL_TIME : clock.elapsedTime, dt, px: e.x, py: e.y })
  })
}

/** Multiply a world-space point diameter by this (and divide by view depth) to get gl_PointSize. */
export function usePointScale() {
  return useThree(s => s.size.height * s.viewport.dpr * 1.45)
}

/** Builds a three.js resource once and disposes it when the scene unmounts. */
export function useOwned<T extends { dispose(): void }>(make: () => T): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(make, [])
  useEffect(() => () => value.dispose(), [value])
  return value
}

/** Small deterministic random generator, so a scene looks the same every time it mounts. */
export function seeded(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Studio reflections drawn from light panels, so metals look lit without downloading an HDR file. */
export function StudioEnv() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={['#04050d']} />
      <Lightformer form="rect" intensity={4} color="#ffffff" position={[0, 5, 2]} target={[0, 0, 0]} scale={[9, 3, 1]} />
      <Lightformer form="rect" intensity={7} color="#62e6ff" position={[-6, 1, 1]} target={[0, 0, 0]} scale={[7, 1.1, 1]} />
      <Lightformer form="rect" intensity={7} color="#ff58cf" position={[6, -1, 1]} target={[0, 0, 0]} scale={[7, 1.1, 1]} />
      <Lightformer form="ring" intensity={3} color="#8b7bff" position={[0, 0, -7]} target={[0, 0, 0]} scale={4} />
      <Lightformer form="rect" intensity={2} color="#ffd6a0" position={[0, -5, 0]} target={[0, 0, 0]} scale={[6, 2, 1]} />
      <Lightformer form="rect" intensity={2.5} color="#ffffff" position={[2, 2, 6]} target={[0, 0, 0]} scale={[1.2, 5, 1]} />
    </Environment>
  )
}

const haloVertex = /* glsl */`
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`
const haloFragment = /* glsl */`
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uStrength;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    // Drawn on back faces: brightest next to the body, fading to nothing at the rim.
    float a = pow(max(-dot(normalize(vNormal), normalize(vView)), 0.0), uPower) * uStrength;
    gl_FragColor = vec4(uColor, a);
  }
`

/** Soft additive glow around a sphere. `radius` is the outer edge of the glow. */
export function Halo({ radius, color, power = 2.6, strength = 1 }: { radius: number; color: string; power?: number; strength?: number }) {
  const material = useOwned(() => new ShaderMaterial({
    uniforms: { uColor: { value: new Color(color) }, uPower: { value: power }, uStrength: { value: strength } },
    vertexShader: haloVertex,
    fragmentShader: haloFragment,
    side: BackSide,
    blending: AdditiveBlending,
    transparent: true,
    depthWrite: false,
  }))
  return (
    <mesh scale={radius}>
      <sphereGeometry args={[1, 48, 48]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}
