import { ShaderMaterial } from 'three'
import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'
import { useOwned, useSceneFrame } from '../../three/kit'

export const meta = {
  id: 'midnight-ocean',
  title: 'Midnight ocean',
  category: '3D',
  description: 'Open water at night: long swells cross each other, the surface darkens where it faces you and brightens toward the horizon, and moonlight scatters into a path of glitter. Calm and cinematic, for travel, wellness and storytelling pages.',
  source: ['Web: Three.js ocean shader examples', 'Web: Gerstner-wave water tutorials'],
  tags: ['water', 'waves', 'shader', 'cinematic'],
  notes: ['Four sine swells are summed in the vertex shader, and the same formula gives the surface normal, so lighting matches the shape exactly.', 'The pointer moves the moon and its reflection.'],
} as const satisfies Meta

const vertex = /* glsl */`
  uniform float uTime;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying float vDepth;
  // direction.xy, steepness, wavelength
  void swell(vec4 w, vec2 p, inout float h, inout vec2 slope) {
    float k = 6.28318 / w.w;
    float f = k * dot(normalize(w.xy), p) - uTime * sqrt(9.8 * k) * 0.35;
    h += w.z / k * sin(f);
    slope += normalize(w.xy) * w.z * cos(f);
  }
  void main() {
    vec2 p = position.xy;
    float h = 0.0;
    vec2 slope = vec2(0.0);
    swell(vec4(1.0, 0.35, 0.16, 4.2), p, h, slope);
    swell(vec4(0.6, 1.0, 0.13, 2.6), p, h, slope);
    swell(vec4(-0.4, 0.8, 0.11, 1.5), p, h, slope);
    swell(vec4(0.9, -0.5, 0.09, 0.9), p, h, slope);
    vec3 displaced = vec3(p, h);
    vec4 world = modelMatrix * vec4(displaced, 1.0);
    vWorld = world.xyz;
    vNormal = normalize(mat3(modelMatrix) * normalize(vec3(-slope, 1.0)));
    vec4 mv = viewMatrix * world;
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`
const fragment = /* glsl */`
  uniform vec3 uMoon;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying float vDepth;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(cameraPosition - vWorld);
    float fresnel = 0.03 + 0.97 * pow(1.0 - max(dot(n, v), 0.0), 4.0);
    vec3 deep = vec3(0.012, 0.04, 0.1);
    vec3 r = reflect(-v, n);
    vec3 sky = mix(vec3(0.05, 0.1, 0.24), vec3(0.3, 0.42, 0.7), pow(1.0 - max(r.y, 0.0), 3.0));
    vec3 col = mix(deep, sky, fresnel);
    vec3 l = normalize(uMoon);
    float glitter = pow(max(dot(r, l), 0.0), 240.0) * 5.0 + pow(max(dot(r, l), 0.0), 26.0) * 0.4;
    col += vec3(1.0, 0.95, 0.85) * glitter;
    float fog = 1.0 - smoothstep(6.0, 15.0, vDepth);
    gl_FragColor = vec4(col, fog);
  }
`

function Scene() {
  const material = useOwned(() => new ShaderMaterial({ uniforms: { uTime: { value: 0 }, uMoon: { value: [0, 0.32, -1] } }, vertexShader: vertex, fragmentShader: fragment, transparent: true }))
  useSceneFrame(({ t, px, py }) => {
    material.uniforms.uTime.value = t
    material.uniforms.uMoon.value = [px * 0.55, 0.3 + py * 0.14, -1]
  })
  return (
    <mesh position={[0, -1.15, -3]} rotation={[-Math.PI / 2 + 0.06, 0, 0]} frustumCulled={false}>
      <planeGeometry args={[22, 18, 240, 200]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

export default function MidnightOcean({ device }: { device: Device }) {
  return (
    <ThreePreview device={device} bg="radial-gradient(circle at 50% 30%, #e9edf7 0%, #9fb0d6 3%, #3b4f86 9%, #17224a 26%, #070b1c 60%, #03040c 100%)">
      <Scene />
    </ThreePreview>
  )
}
