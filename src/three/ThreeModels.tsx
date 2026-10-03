import { useMemo, useRef, type ReactNode, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { CatmullRomCurve3, Color, DoubleSide, ExtrudeGeometry, Float32BufferAttribute, Group, IcosahedronGeometry, Material, Mesh, PlaneGeometry, Shape, TubeGeometry, Vector3 } from 'three'
import { useSceneRig } from './sceneHooks'
import type { ThreeSceneId } from './sceneTypes'

type Pointer = RefObject<{ x: number; y: number }>
type SceneProps = { pointer: Pointer; visible: boolean; reduced: boolean }
const silver = '#becbd5', darkMetal = '#364657', gold = '#d6a96b', ice = '#8ae4ec'

function Studio() {
  return <>
    <ambientLight intensity={.62} color="#b9c9ed" />
    <directionalLight position={[-3, 4, 5]} intensity={2.3} color="#fff1d8" />
    <directionalLight position={[4, 1, -3]} intensity={1.6} color="#91b8ff" />
    <pointLight position={[0, -2, 3]} intensity={.55} color="#5ce2df" />
  </>
}

function fadeScene(group: Group | null, opacity: number) {
  if (!group) return
  group.visible = opacity > .012
  group.traverse(object => {
    if (!(object as Mesh).isMesh) return
    const materials: Material[] = Array.isArray((object as Mesh).material) ? (object as Mesh).material as Material[] : [(object as Mesh).material as Material]
    for (const material of materials) material.opacity = opacity
  })
}

function CastRenderStoryReel(p: SceneProps) {
  const raw = useRef<Group>(null), ceramic = useRef<Group>(null), finished = useRef<Group>(null)
  const progress = useRef(.5)
  useFrame((state, delta) => {
    if (!p.visible) return
    const ease = 1 - Math.exp(-delta * 5)
    const target = p.reduced ? .5 : (p.pointer.current.y + 1) / 2
    progress.current += (target - progress.current) * ease
    const t = progress.current
    const first = Math.max(0, Math.min(1, (t - .22) / .22))
    const last = Math.max(0, Math.min(1, (t - .62) / .22))
    const smooth = (x: number) => x * x * (3 - 2 * x)
    const a = 1 - smooth(first), c = smooth(last), b = Math.max(0, 1 - a - c)
    fadeScene(raw.current, a); fadeScene(ceramic.current, b); fadeScene(finished.current, c)
    if (raw.current) raw.current.rotation.y = p.reduced ? 0 : state.clock.elapsedTime * .12
    if (ceramic.current) ceramic.current.rotation.y = p.reduced ? 0 : .12 + state.clock.elapsedTime * .08
    if (finished.current) finished.current.rotation.y = p.reduced ? 0 : -.12 + state.clock.elapsedTime * .06
  })
  return <Rig {...p} profile={{ yaw: .12, pitch: .1, speed: .018, drift: .006 }}>
    <mesh position={[0,-1.02,0]}><cylinderGeometry args={[.82,.9,.12,48]}/><meshStandardMaterial color="#303d4c" metalness={.7} roughness={.3}/></mesh>
    <mesh position={[0,-.94,0]}><torusGeometry args={[.76,.018,8,64]}/><meshStandardMaterial color={ice} emissive={ice} emissiveIntensity={.5}/></mesh>
    <group ref={raw}>
      <mesh><dodecahedronGeometry args={[.73,0]}/><meshStandardMaterial color="#c7bdb0" roughness={.88} metalness={.04} transparent depthWrite={false}/></mesh>
      <mesh rotation={[.4,.2,.6]}><torusGeometry args={[.87,.012,8,64]}/><meshStandardMaterial color="#e5dacf" roughness={.76} transparent depthWrite={false}/></mesh>
      {[0,1,2,3].map(i=><mesh key={i} position={[Math.cos(i*Math.PI/2)*.78,Math.sin(i*Math.PI/2)*.78,.1]}><sphereGeometry args={[.035,12,12]}/><meshStandardMaterial color="#857d74" transparent depthWrite={false}/></mesh>)}
    </group>
    <group ref={ceramic}>
      <mesh><icosahedronGeometry args={[.69,2]}/><meshPhysicalMaterial color="#dce8ec" roughness={.19} metalness={.24} clearcoat={1} transparent depthWrite={false}/></mesh>
      <mesh rotation={[.9,.2,.2]}><torusGeometry args={[.9,.025,12,72]}/><meshStandardMaterial color={gold} metalness={.82} roughness={.2} transparent depthWrite={false}/></mesh>
      <mesh rotation={[.1,.8,.5]}><torusGeometry args={[.8,.012,8,72]}/><meshStandardMaterial color={ice} emissive={ice} emissiveIntensity={.8} transparent depthWrite={false}/></mesh>
    </group>
    <group ref={finished}>
      <mesh position={[0,-.05,0]}><cylinderGeometry args={[.4,.48,.9,40,1]}/><meshPhysicalMaterial color="#82cbd2" roughness={.12} metalness={.08} transmission={.72} thickness={.8} clearcoat={1} transparent opacity={.5} depthWrite={false}/></mesh>
      <mesh position={[0,.4,0]} scale={[.4,.24,.4]}><sphereGeometry args={[1,32,20]}/><meshPhysicalMaterial color="#b9e7e7" roughness={.12} transmission={.55} thickness={.5} transparent depthWrite={false}/></mesh>
      <mesh position={[0,.62,0]}><cylinderGeometry args={[.16,.18,.22,24]}/><meshStandardMaterial color="#a8b6c2" metalness={.72} roughness={.2} transparent depthWrite={false}/></mesh>
      <mesh position={[0,.79,0]}><cylinderGeometry args={[.2,.2,.15,24]}/><meshStandardMaterial color={gold} metalness={.76} roughness={.22} transparent depthWrite={false}/></mesh>
      <mesh position={[0,-.08,.405]}><boxGeometry args={[.48,.29,.018]}/><meshStandardMaterial color="#edf1e8" roughness={.42} transparent depthWrite={false}/></mesh>
      <mesh position={[0,-.08,.42]}><boxGeometry args={[.26,.035,.012]}/><meshStandardMaterial color="#3e6873" roughness={.5} transparent depthWrite={false}/></mesh>
    </group>
    <pointLight position={[1,1.1,2]} color="#a4f2f0" intensity={2.4} distance={4}/>
  </Rig>
}

function MainframeMouseScrubHero(p: SceneProps) {
  const signal = useRef<Group>(null), core = useRef<Group>(null), orbit = useRef<Group>(null)
  const progress = useRef(.5)
  useFrame((state, delta) => {
    if (!p.visible) return
    const ease = 1 - Math.exp(-delta * 5)
    const target = p.reduced ? .5 : (p.pointer.current.x + 1) / 2
    progress.current += (target - progress.current) * ease
    const t = progress.current
    const smooth = (x: number) => { const n = Math.max(0,Math.min(1,x)); return n*n*(3-2*n) }
    const a = 1 - smooth((t-.18)/.25), c = smooth((t-.6)/.24), b = Math.max(0,1-a-c)
    fadeScene(signal.current,a); fadeScene(core.current,b); fadeScene(orbit.current,c)
    if(signal.current) signal.current.rotation.y = p.reduced ? 0 : state.clock.elapsedTime*.08
    if(core.current) {core.current.rotation.y = p.reduced ? 0 : state.clock.elapsedTime*.1; core.current.rotation.x = p.reduced ? .12 : .12 + Math.sin(state.clock.elapsedTime*.3)*.035}
    if(orbit.current) orbit.current.rotation.y = p.reduced ? 0 : state.clock.elapsedTime*.14
  })
  return <Rig {...p} profile={{yaw:.06,pitch:.06,speed:.014,drift:.004}}>
    <group ref={signal}>
      <mesh><icosahedronGeometry args={[.72,2]}/><meshBasicMaterial color="#8fe7ee" wireframe transparent depthWrite={false}/></mesh>
      {[0,1,2].map(i=><mesh key={i} rotation={[i*.72,.4+i*.55,.22]}><torusGeometry args={[.88+i*.1,.012,8,72]}/><meshStandardMaterial color={i===1?gold:ice} emissive={i===1?gold:ice} emissiveIntensity={.55} transparent depthWrite={false}/></mesh>)}
      {Array.from({length:8},(_,i)=><mesh key={i} position={[Math.cos(i*Math.PI/4)*1.02,Math.sin(i*Math.PI/4)*1.02,0]}><sphereGeometry args={[.04,16,12]}/><meshStandardMaterial color={ice} emissive={ice} emissiveIntensity={1.1} transparent depthWrite={false}/></mesh>)}
    </group>
    <group ref={core}>
      <mesh><sphereGeometry args={[.59,48,36]}/><meshPhysicalMaterial color="#d6eef0" metalness={.34} roughness={.16} clearcoat={1} transparent depthWrite={false}/></mesh>
      <mesh scale={1.08}><sphereGeometry args={[.59,36,28]}/><meshBasicMaterial color={ice} wireframe transparent opacity={.12} depthWrite={false}/></mesh>
      <mesh rotation={[.7,.1,.3]}><torusGeometry args={[.9,.045,14,80]}/><meshStandardMaterial color="#c2ccd8" metalness={.8} roughness={.18} transparent depthWrite={false}/></mesh>
      <mesh rotation={[.15,.9,.5]}><torusGeometry args={[.76,.018,8,72]}/><meshStandardMaterial color={gold} metalness={.76} roughness={.2} transparent depthWrite={false}/></mesh>
      <pointLight color={ice} intensity={3.2} distance={3}/>
    </group>
    <group ref={orbit}>
      <mesh><sphereGeometry args={[.36,36,28]}/><meshPhysicalMaterial color="#bfe5e8" metalness={.28} roughness={.14} clearcoat={1} transparent depthWrite={false}/></mesh>
      {[0,1,2].map(i=><group key={i} rotation={[.42+i*.66,.35+i*.42,.2+i*.57]}>
        <mesh><torusGeometry args={[.77,.025,12,72]}/><meshStandardMaterial color={i===1?gold:ice} metalness={.58} emissive={i===1?gold:ice} emissiveIntensity={.45} transparent depthWrite={false}/></mesh>
        <mesh position={[.77,0,0]}><sphereGeometry args={[.09,20,16]}/><meshStandardMaterial color="#f0d6a8" metalness={.35} transparent depthWrite={false}/></mesh>
      </group>)}
      <pointLight color="#74deec" intensity={2.7} distance={3}/>
    </group>
  </Rig>
}

function Rig({ children, pointer, visible, reduced, profile }: SceneProps & { children: ReactNode; profile?: { yaw?: number; pitch?: number; drift?: number; speed?: number } }) {
  const root = useRef<Group>(null)
  useSceneRig(root, pointer, visible, reduced, profile)
  return <><Studio /><group ref={root}>{children}</group></>
}

function ChromeOrbitalCore(p: SceneProps) {
  const outer = useRef<Group>(null), inner = useRef<Group>(null), light = useRef<Group>(null)
  useFrame((_, d) => {
    if (!p.visible) return
    const e = 1 - Math.exp(-d * 5)
    if (outer.current) outer.current.rotation.z += ((p.reduced ? 0 : p.pointer.current.x * .28) + .09 - outer.current.rotation.z) * e
    if (inner.current) inner.current.rotation.x += ((p.reduced ? 0 : p.pointer.current.y * .25) + .12 - inner.current.rotation.x) * e
    if (light.current) { light.current.position.x += ((p.reduced ? 0 : p.pointer.current.x * 2.2) - light.current.position.x) * e; light.current.position.y += ((p.reduced ? 1.8 : 1.8 - p.pointer.current.y * 1.7) - light.current.position.y) * e }
  })
  return <><Rig {...p} profile={{yaw:.12,pitch:.1,speed:.12}}>
    <mesh><sphereGeometry args={[.78,48,48]}/><meshPhongMaterial color="#aab9c8" specular="#ffffff" shininess={115}/></mesh>
    <group ref={outer}><mesh rotation={[Math.PI/2,.28,0]}><torusGeometry args={[1.18,.025,10,96]}/><meshStandardMaterial color={silver} metalness={.8} roughness={.22}/></mesh><mesh position={[1.18,0,0]}><sphereGeometry args={[.09,18,18]}/><meshStandardMaterial color={gold} metalness={.75} roughness={.24}/></mesh></group>
    <group ref={inner}><mesh rotation={[.9,0,.55]}><torusGeometry args={[1.02,.016,8,96]}/><meshStandardMaterial color="#87d8df" metalness={.65} roughness={.24}/></mesh></group>
  </Rig><group ref={light}><pointLight intensity={32} distance={8} color="#d8f4ff"/></group></>
}

function SyntheticRobotHead(p: SceneProps) {
  const head=useRef<Group>(null),neck=useRef<Group>(null),eyes=useRef<Group>(null)
  useFrame((_,d)=>{if(!p.visible)return;const k=1-Math.exp(-d*5);const x=p.reduced?0:p.pointer.current.x,y=p.reduced?0:p.pointer.current.y;if(head.current){head.current.rotation.y+=(x*.34-head.current.rotation.y)*k;head.current.rotation.x+=(-y*.19-head.current.rotation.x)*k}if(neck.current)neck.current.rotation.y+=(x*.15-neck.current.rotation.y)*k;if(eyes.current){eyes.current.position.x+=(x*.09-eyes.current.position.x)*k;eyes.current.position.y+=(-y*.045-eyes.current.position.y)*k}})
  return <><Studio/><group ref={neck}>
    <mesh position={[0,-.76,0]}><cylinderGeometry args={[.3,.37,.48,32]}/><meshStandardMaterial color="#253849" metalness={.86} roughness={.24}/></mesh>
    <mesh position={[0,-.98,0]}><cylinderGeometry args={[.54,.61,.14,40]}/><meshStandardMaterial color={gold} metalness={.78} roughness={.22}/></mesh>
    <mesh position={[0,-.62,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.34,.045,10,48]}/><meshStandardMaterial color={ice} metalness={.65} roughness={.24} emissive="#256b79" emissiveIntensity={.4}/></mesh>
    <mesh position={[0,-1.18,0]} scale={[1,.42,.58]}><sphereGeometry args={[.76,36,24]}/><meshStandardMaterial color="#354b5b" metalness={.66} roughness={.32}/></mesh>
  </group><group ref={head} position={[0,.2,0]}>
    <mesh scale={[.76,.88,.64]}><sphereGeometry args={[.78,48,36]}/><meshPhysicalMaterial color="#d2dcdf" metalness={.56} roughness={.22} clearcoat={.85}/></mesh>
    <mesh position={[0,-.39,.45]} scale={[.51,.27,.26]}><sphereGeometry args={[1,32,24]}/><meshStandardMaterial color="#607580" metalness={.72} roughness={.27}/></mesh>
    <mesh position={[0,.07,.565]} scale={[.65,.245,.18]}><sphereGeometry args={[1,40,28]}/><meshStandardMaterial color="#111e2b" metalness={.72} roughness={.16}/></mesh>
    <mesh position={[0,.31,.52]} scale={[.46,.09,.17]} rotation={[0,0,-.025]}><sphereGeometry args={[1,32,20]}/><meshStandardMaterial color="#eef4ed" metalness={.58} roughness={.24}/></mesh>
    <mesh position={[0,-.18,.57]} scale={[.35,.035,.04]}><boxGeometry args={[1,1,1]}/><meshStandardMaterial color="#dce8e5" metalness={.7} roughness={.2}/></mesh>
    <group ref={eyes}>{[-.28,.28].map(x=><group key={x} position={[x,.055,.69]}><mesh><sphereGeometry args={[.116,24,20]}/><meshStandardMaterial color="#0b1824" metalness={.55} roughness={.17}/></mesh><mesh position={[0,0,.058]} scale={[.78,.54,.45]}><sphereGeometry args={[.088,24,20]}/><meshStandardMaterial color={ice} emissive={ice} emissiveIntensity={2.8} metalness={.25} roughness={.16}/></mesh><mesh position={[0,0,.096]} scale={[.28,.32,.3]}><sphereGeometry args={[.07,16,14]}/><meshBasicMaterial color="#eaffff"/></mesh></group>)}</group>
    {[-1,1].map(s=><group key={s} position={[s*.77,-.06,0]}><mesh rotation={[0,0,s*.12]}><cylinderGeometry args={[.25,.3,.19,40]}/><meshStandardMaterial color={gold} metalness={.8} roughness={.22}/></mesh><mesh position={[0,0,.125]}><torusGeometry args={[.16,.025,10,32]}/><meshStandardMaterial color="#d7e3e6" metalness={.85} roughness={.2}/></mesh><mesh position={[0,0,.15]}><cylinderGeometry args={[.085,.085,.035,24]}/><meshStandardMaterial color="#243d4d" metalness={.68} roughness={.2}/></mesh><mesh position={[s*.04,.4,0]} rotation={[0,0,s*.24]}><boxGeometry args={[.11,.35,.08]}/><meshStandardMaterial color="#8399a2" metalness={.7} roughness={.28}/></mesh></group>)}
    <pointLight position={[0,.1,.9]} color="#55d8ee" intensity={1.4} distance={2.4}/>
  </group></>
}

function FloatingSneakerConcept(p: SceneProps) {
  const root=useRef<Group>(null)
  useSceneRig(root,p.pointer,p.visible,p.reduced,{yaw:.4,pitch:.24,speed:.11,drift:.04})
  const shape=useMemo(()=>{const s=new Shape();s.moveTo(-1.25,-.2);s.quadraticCurveTo(-1.15,.05,-.78,.04);s.lineTo(-.38,.34);s.quadraticCurveTo(-.05,.58,.34,.31);s.lineTo(.75,.1);s.quadraticCurveTo(1.06,.02,1.22,-.22);s.lineTo(1.1,-.43);s.lineTo(-.95,-.43);s.closePath();return s},[])
  return <><Studio/><group ref={root} rotation={[.12,0,-.08]}>
    <mesh position={[0,-.34,0]}><extrudeGeometry args={[shape,{depth:.52,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.045,bevelThickness:.045}]}/><meshStandardMaterial color="#d5d0c6" roughness={.43}/></mesh>
    <mesh position={[-.08,-.02,.03]} scale={[1.02,.35,.3]}><sphereGeometry args={[1,40,28]}/><meshStandardMaterial color="#526f8c" roughness={.32} metalness={.16}/></mesh>
    <mesh position={[.4,.15,.07]} rotation={[0,0,-.35]} scale={[.54,.12,.27]}><capsuleGeometry args={[.18,.65,8,20]}/><meshStandardMaterial color="#b28b60" roughness={.31} metalness={.35}/></mesh>
    {[-.3,-.15,0,.15].map(y=><mesh key={y} position={[-.05,.1+y,.36]} rotation={[0,0,-.25]}><boxGeometry args={[.46,.018,.018]}/><meshStandardMaterial color="#e4e4df"/></mesh>)}
  </group></>
}
function LiquidMetalSculpture(p:SceneProps){return <Rig {...p} profile={{yaw:.34,pitch:.27,speed:.13}}><mesh rotation={[.4,0,.2]}><torusKnotGeometry args={[.82,.23,150,20,2,5]}/><meshPhongMaterial color="#b9c5cf" specular="#ffffff" shininess={120}/></mesh><mesh rotation={[1,0,0]} scale={.52}><torusGeometry args={[1.45,.025,10,96]}/><meshStandardMaterial color={gold} metalness={.85} roughness={.2}/></mesh></Rig>}

function GlassCrystalMonolith(p:SceneProps){return <Rig {...p} profile={{yaw:.28,pitch:.24,speed:.12,drift:.035}}><mesh scale={[.76,1.15,.58]} rotation={[.1,.2,.05]}><octahedronGeometry args={[1,0]}/><meshPhysicalMaterial color="#96dbe8" roughness={.12} metalness={.18} transmission={.68} thickness={1.3} ior={1.35} transparent opacity={.86} clearcoat={1}/></mesh><mesh scale={[.31,.62,.25]} rotation={[0,0,.18]}><octahedronGeometry args={[1,0]}/><meshStandardMaterial color="#ebc68a" emissive="#986333" emissiveIntensity={.4} metalness={.5} roughness={.24}/></mesh><pointLight position={[0,0,1]} color="#75e4ff" intensity={8}/></Rig>}

function InteractivePlanet(p:SceneProps){const moon=useRef<Group>(null),planet=useRef<Mesh>(null);const geom=useMemo(()=>{const g=new IcosahedronGeometry(.91,5);const pos=g.getAttribute('position'),cols=[];for(let i=0;i<pos.count;i++){const x=pos.getX(i),y=pos.getY(i),z=pos.getZ(i);const n=Math.sin(x*18+y*11)*Math.cos(z*15+y*7);const c=new Color(n>.1?'#668c77':'#233d4b');cols.push(c.r,c.g,c.b)}g.setAttribute('color',new Float32BufferAttribute(cols,3));return g},[]);useFrame((_,d)=>{if(!p.visible)return;if(planet.current)planet.current.rotation.y+=d*.06;if(moon.current)moon.current.rotation.y+=d*.32});return <Rig {...p} profile={{yaw:.23,pitch:.18,speed:.08}}><mesh ref={planet} geometry={geom}><meshStandardMaterial vertexColors roughness={.86}/></mesh><mesh scale={1.025}><sphereGeometry args={[.91,48,48]}/><meshBasicMaterial color="#61c8e8" transparent opacity={.075} side={DoubleSide}/></mesh><group ref={moon}><mesh position={[1.5,.25,0]}><sphereGeometry args={[.16,24,24]}/><meshStandardMaterial color="#d2c7ae" roughness={.7}/></mesh><mesh position={[1.5,.25,0]}><sphereGeometry args={[.19,20,20]}/><meshBasicMaterial color="#9bdaff" transparent opacity={.09}/></mesh></group></Rig>}

function MechanicalReactor(p:SceneProps){const outer=useRef<Group>(null),inner=useRef<Group>(null),core=useRef<Mesh>(null);useFrame((state,d)=>{if(!p.visible)return;const k=1-Math.exp(-d*4),x=p.reduced?0:p.pointer.current.x,y=p.reduced?0:p.pointer.current.y;if(outer.current){outer.current.rotation.z+=(x*.24+.08-outer.current.rotation.z)*k;outer.current.rotation.x+=(-y*.14+.28-outer.current.rotation.x)*k}if(inner.current){inner.current.rotation.y+=(y*.26+.18-inner.current.rotation.y)*k;inner.current.rotation.z+=d*.08}if(core.current)core.current.scale.setScalar(1+Math.sin(state.clock.elapsedTime*1.5)*.035)});return <><Studio/><group ref={outer}>
  <mesh rotation={[.76,.18,0]}><torusGeometry args={[1.18,.055,12,96]}/><meshStandardMaterial color="#c8d5dc" metalness={.92} roughness={.2}/></mesh>
  <mesh rotation={[-.58,.24,.16]}><torusGeometry args={[.98,.035,10,96]}/><meshStandardMaterial color={gold} metalness={.88} roughness={.2}/></mesh>
  {[0,1,2,3,4,5,6,7].map(i=>{const a=i*Math.PI/4;return <group key={i} position={[Math.sin(a)*.91,Math.cos(a)*.91,0]} rotation={[0,0,-a]}><mesh><boxGeometry args={[.14,.5,.18]}/><meshStandardMaterial color={i%2?"#42566a":"#778a98"} metalness={.82} roughness={.26}/></mesh><mesh position={[0,.31,.02]}><sphereGeometry args={[.105,20,16]}/><meshStandardMaterial color={i%2?ice:gold} metalness={.72} roughness={.24} emissive={i%2?"#176575":"#694222"} emissiveIntensity={.35}/></mesh></group>})}
  <group ref={inner}><mesh rotation={[.82,0,0]}><torusGeometry args={[.68,.045,12,72]}/><meshStandardMaterial color="#80dbe1" metalness={.75} roughness={.18} emissive="#155a65" emissiveIntensity={.65}/></mesh><mesh rotation={[-.76,.3,0]}><torusGeometry args={[.53,.027,10,72]}/><meshStandardMaterial color="#d7e4e8" metalness={.9} roughness={.17}/></mesh></group>
  <mesh ref={core}><sphereGeometry args={[.38,40,32]}/><meshPhysicalMaterial color="#9beafa" emissive="#2ab7d3" emissiveIntensity={1.65} metalness={.22} roughness={.14} clearcoat={1}/></mesh>
  <mesh scale={1.12}><sphereGeometry args={[.38,32,24]}/><meshBasicMaterial color="#81eaff" transparent opacity={.08} side={DoubleSide}/></mesh><pointLight position={[0,0,.25]} color="#4ad7ee" intensity={5.5} distance={4}/>
  </group></>}

function DigitalHumanMask(p:SceneProps){return <Rig {...p} profile={{yaw:.32,pitch:.22,speed:.025,drift:.008}}><group>
  <mesh scale={[.77,1,.48]}><sphereGeometry args={[.9,48,40]}/><meshPhysicalMaterial color="#c9d3cf" roughness={.22} metalness={.18} clearcoat={1}/></mesh>
  <mesh position={[0,-.08,.44]} scale={[.62,.23,.1]}><sphereGeometry args={[1,32,20]}/><meshStandardMaterial color="#18222e" metalness={.45} roughness={.18}/></mesh>
  <mesh position={[0,-.04,.55]}><coneGeometry args={[.16,.38,5]}/><meshStandardMaterial color={gold} metalness={.58} roughness={.3}/></mesh>
  {[-1,1].map(s=><group key={s}><mesh position={[s*.29,.15,.48]} scale={[.19,.105,.08]}><sphereGeometry args={[1,24,20]}/><meshStandardMaterial color="#283744"/></mesh><mesh position={[s*.29,.15,.54]}><sphereGeometry args={[.035,16,16]}/><meshStandardMaterial color={ice} emissive={ice} emissiveIntensity={1.3}/></mesh><mesh position={[s*.63,.02,.13]} rotation={[0,0,s*.25]}><boxGeometry args={[.22,.65,.12]}/><meshStandardMaterial color="#a9b8ba" metalness={.4} roughness={.3}/></mesh></group>)}
  </group></Rig>}

function SilkFabricSculpture(p:SceneProps){const mesh=useRef<Mesh>(null);const geo=useMemo(()=>{const g=new PlaneGeometry(3.5,2.35,84,56),pos=g.getAttribute('position'),colors:number[]=[];const a=new Color('#6d73c8'),b=new Color('#e5a7c4'),c=new Color('#f4d8a2');for(let i=0;i<pos.count;i++){const x=pos.getX(i),y=pos.getY(i),u=(x+1.75)/3.5,v=(y+1.175)/2.35;pos.setX(i,x*(.91+.09*Math.cos(y*1.3)));const col=a.clone().lerp(b,Math.max(0,Math.min(1,u*.82+v*.14)));col.lerp(c,Math.max(0,(Math.sin(u*6.2+v*3.4)*.5+.5-.78)*.7));colors.push(col.r,col.g,col.b)}g.setAttribute('color',new Float32BufferAttribute(colors,3));return g},[]);useFrame((state)=>{if(!p.visible)return;const pos=geo.getAttribute('position'),t=state.clock.elapsedTime,xp=p.reduced?0:p.pointer.current.x,yp=p.reduced?0:p.pointer.current.y;for(let i=0;i<pos.count;i++){const x=pos.getX(i),y=pos.getY(i),dx=x-xp*1.05,dy=y+yp*.68;const force=Math.exp(-(dx*dx+dy*dy)*1.8);const folds=Math.sin(x*2.7+y*.72+t*.62)*.31+Math.cos(y*3.4-t*.42)*.13+Math.sin(x*1.35-y*1.9+t*.3)*.1;const drape=-.17*Math.cos((x/3.5)*Math.PI)+.08*Math.sin(y*2.2+t*.24);pos.setZ(i,folds+drape+force*.28)}pos.needsUpdate=true;geo.computeVertexNormals();if(mesh.current)mesh.current.rotation.z=Math.sin(t*.12)*.025});return <><Studio/><mesh ref={mesh} geometry={geo} rotation={[-.3,.04,0]}><meshPhysicalMaterial vertexColors color="#ffffff" metalness={.12} roughness={.28} sheen={.9} sheenColor="#f4d6ff" side={DoubleSide} flatShading={false}/></mesh><pointLight position={[1,1.8,2]} color="#f6c5e5" intensity={2.1} distance={5}/></>}

function FuturisticVehicleConcept(p:SceneProps){const root=useRef<Group>(null);const chassis=useMemo(()=>{const s=new Shape();s.moveTo(-1.42,-.12);s.quadraticCurveTo(-1.32,.02,-1.02,.07);s.lineTo(-.58,.13);s.quadraticCurveTo(-.25,.3,.12,.29);s.lineTo(.88,.14);s.quadraticCurveTo(1.24,.09,1.4,-.08);s.lineTo(1.34,-.28);s.lineTo(-1.3,-.28);s.closePath();return s},[]);const canopy=useMemo(()=>{const s=new Shape();s.moveTo(-.62,.12);s.quadraticCurveTo(-.39,.47,-.08,.49);s.lineTo(.47,.4);s.quadraticCurveTo(.72,.34,.86,.15);s.closePath();return s},[]);useSceneRig(root,p.pointer,p.visible,p.reduced,{yaw:.54,pitch:.16,speed:.035,drift:.012});return <><Studio/><group ref={root} position={[0,.04,0]}>
  <mesh position={[0,-.12,-.47]}><extrudeGeometry args={[chassis,{depth:.94,bevelEnabled:true,bevelSegments:4,steps:1,bevelSize:.09,bevelThickness:.085}]}/><meshPhysicalMaterial color="#e0e6e4" metalness={.62} roughness={.22} clearcoat={1} clearcoatRoughness={.12}/></mesh>
  <mesh position={[0,0,-.47]}><extrudeGeometry args={[canopy,{depth:.82,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.035,bevelThickness:.04}]}/><meshPhysicalMaterial color="#3f8295" metalness={.36} roughness={.13} transparent opacity={.82} clearcoat={1}/></mesh>
  {[-1,1].map(x=>[-1,1].map(z=><group key={`${x}-${z}`} position={[x*.88,-.29,z*.51]}><mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.265,.265,.17,40]}/><meshStandardMaterial color="#111a22" roughness={.82}/></mesh><mesh position={[0,0,z*.095]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.158,.158,.035,32]}/><meshStandardMaterial color="#b8c7cb" metalness={.9} roughness={.2}/></mesh><mesh position={[0,0,z*.12]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.105,.025,8,32]}/><meshStandardMaterial color={gold} metalness={.8} roughness={.22}/></mesh><mesh position={[0,0,z*.145]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.035,.035,.02,20]}/><meshStandardMaterial color="#425a68" metalness={.78}/></mesh></group>))}
  {[-1,1].map(z=><group key={z} position={[1.34,.02,z*.26]}><mesh><boxGeometry args={[.07,.12,.22]}/><meshStandardMaterial color="#b9f2f1" emissive="#68d8e6" emissiveIntensity={2.3} roughness={.15}/></mesh><pointLight position={[.1,0,0]} color="#74e6fa" intensity={.65} distance={1.4}/></group>)}
  <mesh position={[-1.22,-.02,0]}><boxGeometry args={[.12,.055,.68]}/><meshStandardMaterial color="#d99a66" emissive="#b65a2c" emissiveIntensity={.7} metalness={.35}/></mesh>
  <mesh position={[0,-.37,0]}><boxGeometry args={[1.42,.055,.12]}/><meshStandardMaterial color="#293c49" metalness={.7} roughness={.3}/></mesh>
  </group><pointLight position={[1.5,.5,2]} color="#75dff3" intensity={1.8} distance={5}/></>}

function HeadphoneProductModel(p:SceneProps){const root=useRef<Group>(null);useSceneRig(root,p.pointer,p.visible,p.reduced,{yaw:.36,pitch:.2,speed:.1});return <Rig {...p}><group ref={root} rotation={[.15,0,-.1]}>
  <mesh position={[0,.15,0]} rotation={[0,0,.08]}><torusGeometry args={[.82,.105,16,64,Math.PI]}/><meshStandardMaterial color={darkMetal} metalness={.82} roughness={.25}/></mesh>
  {[-1,1].map(s=><group key={s} position={[s*.84,-.32,0]}><mesh><cylinderGeometry args={[.34,.34,.25,36]}/><meshStandardMaterial color="#b0b9c4" metalness={.68} roughness={.28}/></mesh><mesh position={[0,0,s*.17]}><cylinderGeometry args={[.28,.28,.1,36]}/><meshStandardMaterial color="#263547" roughness={.62}/></mesh><mesh position={[0,0,s*.23]}><cylinderGeometry args={[.21,.21,.04,36]}/><meshStandardMaterial color={gold} metalness={.76} roughness={.22}/></mesh></group>)}
  </group></Rig>}

function IsometricCreativeRoom(p:SceneProps){const root=useRef<Group>(null),lamp=useRef<Group>(null);useSceneRig(root,p.pointer,p.visible,p.reduced,{yaw:.25,pitch:.17,speed:.08});useFrame(({clock},d)=>{if(!p.visible||!lamp.current)return;lamp.current.rotation.z+=(Math.sin(clock.elapsedTime*.8)*.04-p.pointer.current.x*.07-lamp.current.rotation.z)*(1-Math.exp(-d*3))});return <><Studio/><group ref={root} rotation={[.3,-.4,0]}>
  <mesh position={[0,-.7,0]}><boxGeometry args={[2.5,.12,1.8]}/><meshStandardMaterial color="#a47b5c" roughness={.55}/></mesh>
  <mesh position={[0,.1,-.78]}><boxGeometry args={[2.5,1.5,.1]}/><meshStandardMaterial color="#8194a3" roughness={.8}/></mesh>
  <mesh position={[-.1,-.15,-.2]}><boxGeometry args={[.94,.58,.09]}/><meshStandardMaterial color="#1d2b3b" metalness={.5}/></mesh><mesh position={[-.1,-.12,-.14]}><planeGeometry args={[.79,.43]}/><meshBasicMaterial color="#56d7dd"/></mesh>
  <mesh position={[.8,-.37,.4]}><boxGeometry args={[.35,.58,.4]}/><meshStandardMaterial color="#425266"/></mesh><mesh position={[.8,-.03,.4]}><boxGeometry args={[.48,.1,.48]}/><meshStandardMaterial color="#bd9977"/></mesh>
  <group ref={lamp} position={[-.9,-.58,.25]}><mesh><cylinderGeometry args={[.07,.07,.65,12]}/><meshStandardMaterial color={darkMetal} metalness={.65}/></mesh><mesh position={[0,.36,0]}><coneGeometry args={[.22,.24,20]}/><meshStandardMaterial color={gold} metalness={.55}/></mesh><pointLight position={[0,.28,.1]} color="#ffdca0" intensity={2}/></group>
  {[-.9,.4,1].map((x,i)=><mesh key={i} position={[x,-.38,-.35]}><boxGeometry args={[.18,.22,.18]}/><meshStandardMaterial color={i===1?'#829d82':'#b98d64'} roughness={.85}/></mesh>)}
  </group></>}

function KineticSculpture(p:SceneProps){const root=useRef<Group>(null),outer=useRef<Group>(null),inner=useRef<Group>(null),pendulum=useRef<Group>(null);useSceneRig(root,p.pointer,p.visible,p.reduced,{yaw:.16,pitch:.1,speed:.025,drift:.012});useFrame((state,d)=>{if(!p.visible)return;const k=1-Math.exp(-d*3),x=p.reduced?0:p.pointer.current.x,y=p.reduced?0:p.pointer.current.y,t=state.clock.elapsedTime;if(outer.current){outer.current.rotation.z+=(x*.2+Math.sin(t*.42)*.1-outer.current.rotation.z)*k;outer.current.rotation.x+=(-y*.12+.18-outer.current.rotation.x)*k}if(inner.current){inner.current.rotation.y+=(y*.24+Math.sin(t*.55)*.08-inner.current.rotation.y)*k}if(pendulum.current){pendulum.current.rotation.z+=(x*.26+Math.sin(t*.8)*.18-pendulum.current.rotation.z)*k;pendulum.current.rotation.x+=(-y*.18-pendulum.current.rotation.x)*k}});return <><Studio/><group ref={root}>
  <mesh position={[0,1.08,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.055,.055,2.15,20]}/><meshStandardMaterial color="#b9c8ce" metalness={.86} roughness={.22}/></mesh>
  {[-.78,.78].map(x=><mesh key={x} position={[x,.83,0]}><cylinderGeometry args={[.018,.024,.5,12]}/><meshStandardMaterial color={gold} metalness={.78}/></mesh>)}
  <group ref={outer} position={[0,.38,0]}><mesh rotation={[.88,.18,0]}><torusGeometry args={[.8,.045,12,72]}/><meshStandardMaterial color="#d0d9dc" metalness={.9} roughness={.2}/></mesh><mesh rotation={[-.78,0,.12]}><torusGeometry args={[.63,.027,10,72]}/><meshStandardMaterial color="#8be0e5" metalness={.8} roughness={.18}/></mesh><group ref={inner}><mesh><sphereGeometry args={[.28,32,24]}/><meshPhysicalMaterial color="#82d5d8" metalness={.48} roughness={.18} clearcoat={1}/></mesh><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.39,.018,8,64]}/><meshStandardMaterial color={gold} metalness={.84} roughness={.2}/></mesh><pointLight position={[0,0,.5]} color="#7ee6ee" intensity={2.2} distance={2.4}/></group></group>
  <group ref={pendulum} position={[0,.15,0]}><mesh position={[0,-.55,0]}><cylinderGeometry args={[.027,.035,1.04,14]}/><meshStandardMaterial color="#9eacb1" metalness={.88} roughness={.2}/></mesh><mesh position={[0,-1.12,0]} rotation={[0,0,.2]}><dodecahedronGeometry args={[.24,1]}/><meshStandardMaterial color="#d8a66b" metalness={.72} roughness={.2}/></mesh><mesh position={[0,-1.12,.08]}><sphereGeometry args={[.08,20,16]}/><meshStandardMaterial color="#e7eef0" metalness={.8}/></mesh><mesh position={[0,.02,0]}><sphereGeometry args={[.09,20,16]}/><meshStandardMaterial color="#e5edf0" metalness={.86}/></mesh></group>
  </group></>}

function DnaBiotechHelix(p:SceneProps){const root=useRef<Group>(null);useSceneRig(root,p.pointer,p.visible,p.reduced,{yaw:.28,pitch:.16,speed:.1});const strands=useMemo(()=>[-1,1].map(side=>{const pts=[];for(let i=0;i<=48;i++){const t=i/48*Math.PI*4;pts.push(new Vector3(Math.cos(t)*.47*side,(i/48-.5)*2.7,Math.sin(t)*.47))}return new TubeGeometry(new CatmullRomCurve3(pts),100,.027,8,false)}),[]);return <Rig {...p}><group ref={root}>{strands.map((g,i)=><mesh key={i} geometry={g}><meshStandardMaterial color={i?ice:'#d6a970'} metalness={.44} roughness={.26} transparent opacity={.85}/></mesh>)}{Array.from({length:17},(_,i)=>{const t=i/16*Math.PI*4,y=(i/16-.5)*2.7;return <group key={i} position={[0,y,0]} rotation={[0,t,0]}><mesh position={[0,0,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.015,.015,.92,8]}/><meshStandardMaterial color="#a8b5c3" metalness={.5} transparent opacity={.72}/></mesh><mesh position={[Math.cos(t)*.47,y,Math.sin(t)*.47]}><sphereGeometry args={[.055,14,12]}/><meshStandardMaterial color={gold} metalness={.4}/></mesh></group>})}</group></Rig>}

function TorusEnergyEngine(p:SceneProps){const rotor=useRef<Group>(null);const bladeGeometry=useMemo(()=>{const s=new Shape();s.moveTo(.1,-.08);s.bezierCurveTo(.28,.02,.45,.28,.5,.58);s.bezierCurveTo(.52,.76,.44,1.02,.31,1.19);s.bezierCurveTo(.25,.89,.16,.59,.04,.34);s.bezierCurveTo(-.03,.19,-.04,.02,.1,-.08);return new ExtrudeGeometry(s,{depth:.08,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.035,bevelThickness:.025})},[]);useFrame((_,d)=>{if(p.visible&&rotor.current)rotor.current.rotation.z+=d*(p.reduced?.16:.32+Math.abs(p.pointer.current.x)*1.4)});return <Rig {...p} profile={{yaw:.18,pitch:.12,speed:.025,drift:.008}}><group rotation={[.18,-.12,0]}>
  <mesh><torusGeometry args={[1.28,.075,18,80]}/><meshStandardMaterial color="#aab7c6" metalness={.78} roughness={.24}/></mesh><mesh><torusGeometry args={[1.16,.022,10,80]}/><meshStandardMaterial color={ice} emissive={ice} emissiveIntensity={.65} metalness={.48}/></mesh>
  <group ref={rotor}>{[0,1,2].map(i=><mesh key={i} geometry={bladeGeometry} position={[0,0,.07]} rotation={[0,0,i*Math.PI*2/3]}><meshStandardMaterial color={i===1?'#74d9df':'#d0d9df'} metalness={.56} roughness={.28}/></mesh>)}
    <mesh position={[0,0,.13]}><cylinderGeometry args={[.22,.25,.22,32]}/><meshStandardMaterial color="#34475a" metalness={.76} roughness={.23}/></mesh><mesh position={[0,0,.27]}><sphereGeometry args={[.14,28,20]}/><meshStandardMaterial color={gold} metalness={.62} roughness={.22}/></mesh>
  </group><mesh position={[0,0,-.12]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.12,.19,.48,28]}/><meshStandardMaterial color="#46586b" metalness={.7}/></mesh><mesh position={[0,-1.5,-.25]}><cylinderGeometry args={[.11,.18,.48,20]}/><meshStandardMaterial color="#7b8997" metalness={.65}/></mesh><mesh position={[0,-1.77,-.25]}><cylinderGeometry args={[.47,.52,.1,28]}/><meshStandardMaterial color="#3c4b5d" metalness={.58}/></mesh>
  <pointLight position={[0,0,.6]} color={ice} intensity={1.7} distance={2.8}/></group></Rig>}

function InteractiveCharacterBust(p:SceneProps){const torso=useRef<Group>(null),head=useRef<Group>(null);useFrame((_,d)=>{if(!p.visible)return;const k=1-Math.exp(-d*4);const x=p.reduced?0:p.pointer.current.x,y=p.reduced?0:p.pointer.current.y;if(head.current){head.current.rotation.y+=(x*.34-head.current.rotation.y)*k;head.current.rotation.x+=(-y*.18-head.current.rotation.x)*k}if(torso.current){torso.current.rotation.y+=(x*.11-torso.current.rotation.y)*k;torso.current.position.y+=(Math.sin(performance.now()*.001)*.015-torso.current.position.y)*k}});return <><Studio/><group ref={torso}><mesh position={[0,-.65,0]} scale={[.95,.58,.5]}><sphereGeometry args={[1,36,28]}/><meshStandardMaterial color="#4c6077" roughness={.52}/></mesh><mesh position={[0,-.16,0]}><cylinderGeometry args={[.25,.3,.5,24]}/><meshStandardMaterial color={gold} metalness={.5} roughness={.34}/></mesh><group ref={head} position={[0,.48,0]}><mesh scale={[.59,.72,.53]}><sphereGeometry args={[.78,36,30]}/><meshStandardMaterial color="#b2c0c6" roughness={.3} metalness={.22}/></mesh><mesh position={[0,.07,.44]} scale={[.45,.16,.1]}><sphereGeometry args={[1,28,18]}/><meshStandardMaterial color="#243446" metalness={.4}/></mesh><mesh position={[0,.05,.51]}><boxGeometry args={[.42,.035,.03]}/><meshStandardMaterial color={ice} emissive={ice} emissiveIntensity={1.5}/></mesh></group></group></>}

function BotanicalGlassSculpture(p:SceneProps){const root=useRef<Group>(null),leafs=useRef<Group>(null);useSceneRig(root,p.pointer,p.visible,p.reduced,{yaw:.3,pitch:.2,speed:.07,drift:.012});useFrame((_,d)=>{if(p.visible&&leafs.current){const k=1-Math.exp(-d*2.4);leafs.current.rotation.z+=(p.pointer.current.x*.14-leafs.current.rotation.z)*k;leafs.current.rotation.x+=(-p.pointer.current.y*.12-leafs.current.rotation.x)*k}});return <Rig {...p}><group ref={root}>
  <mesh position={[0,-.65,0]}><cylinderGeometry args={[.4,.3,.42,32]}/><meshPhysicalMaterial color="#9bd3d5" transparent opacity={.38} roughness={.12} transmission={.38} thickness={.45}/></mesh>
  <mesh position={[0,-.42,0]}><cylinderGeometry args={[.18,.16,.07,32]}/><meshStandardMaterial color={gold} metalness={.75}/></mesh>
  <group ref={leafs}>
    {[[-.46,.1,-.18,.4],[-.15,.45,.05,.58],[.42,.15,.1,.36],[.18,.7,-.1,.48],[-.52,.63,.15,.33]].map(([x,y,z,s],i)=><group key={i} position={[x,y,z]} rotation={[.2*i,.15*i,(i%2?-.65:.55)]}><mesh scale={[s*.24,s,.08]}><sphereGeometry args={[1,24,20]}/><meshPhysicalMaterial color={i%2?'#718e78':'#a9b991'} roughness={.38} clearcoat={.45}/></mesh><mesh rotation={[0,0,.2]} position={[0,0,.08]}><cylinderGeometry args={[.009,.009,s*1.75,7]}/><meshStandardMaterial color="#bdc9a4"/></mesh></group>)}
    <mesh position={[0,.08,0]} rotation={[0,0,.04]}><cylinderGeometry args={[.018,.02,1.4,8]}/><meshStandardMaterial color="#789176"/></mesh>
  </group>
  </group></Rig>}

function DimensionalPortal(p:SceneProps){const root=useRef<Group>(null),light=useRef<Group>(null);useSceneRig(root,p.pointer,p.visible,p.reduced,{yaw:.38,pitch:.24,speed:.045,drift:.008});useFrame((_,d)=>{if(p.visible&&light.current){const k=1-Math.exp(-d*3);light.current.position.x+=(p.pointer.current.x*.8-light.current.position.x)*k;light.current.position.y+=(-p.pointer.current.y*.7-light.current.position.y)*k}});return <Rig {...p}><group ref={root}>
  {[0,1,2,3].map(i=><group key={i} position={[0,0,-i*.43]} scale={1-i*.13}><mesh position={[0,.93,0]}><boxGeometry args={[1.48,.13,.16]}/><meshStandardMaterial color={i===0?'#c9aa78':'#78899a'} metalness={.58} roughness={.3}/></mesh><mesh position={[-.68,0,0]}><boxGeometry args={[.13,1.86,.16]}/><meshStandardMaterial color={i===0?'#bd9867':'#78899a'} metalness={.55}/></mesh><mesh position={[.68,0,0]}><boxGeometry args={[.13,1.86,.16]}/><meshStandardMaterial color={i===0?'#bd9867':'#78899a'} metalness={.55}/></mesh><mesh position={[0,-.86,0]}><boxGeometry args={[1.48,.13,.16]}/><meshStandardMaterial color="#78899a" metalness={.55}/></mesh></group>)}
  <mesh position={[0,0,-2]}><planeGeometry args={[1.4,1.8]}/><meshBasicMaterial color="#537998"/></mesh>
  <mesh ref={light}><pointLight position={[0,0,0]} intensity={10} color="#76deea" distance={7}/></mesh>
  </group></Rig>}

export function ThreeModel({ scene, pointer, visible, reduced }: SceneProps & { scene: ThreeSceneId }) {
  const props={pointer,visible,reduced}
  switch(scene){
    case 'chrome-orbital-core':return <ChromeOrbitalCore {...props}/>
    case 'synthetic-robot-head':return <SyntheticRobotHead {...props}/>
    case 'floating-sneaker-concept':return <FloatingSneakerConcept {...props}/>
    case 'liquid-metal-sculpture':return <LiquidMetalSculpture {...props}/>
    case 'glass-crystal-monolith':return <GlassCrystalMonolith {...props}/>
    case 'interactive-planet':return <InteractivePlanet {...props}/>
    case 'mechanical-reactor':return <MechanicalReactor {...props}/>
    case 'digital-human-mask':return <DigitalHumanMask {...props}/>
    case 'silk-fabric-sculpture':return <SilkFabricSculpture {...props}/>
    case 'futuristic-vehicle-concept':return <FuturisticVehicleConcept {...props}/>
    case 'headphone-product-model':return <HeadphoneProductModel {...props}/>
    case 'isometric-creative-room':return <IsometricCreativeRoom {...props}/>
    case 'kinetic-sculpture':return <KineticSculpture {...props}/>
    case 'dna-biotech-helix':return <DnaBiotechHelix {...props}/>
    case 'torus-energy-engine':return <TorusEnergyEngine {...props}/>
    case 'interactive-character-bust':return <InteractiveCharacterBust {...props}/>
    case 'botanical-glass-sculpture':return <BotanicalGlassSculpture {...props}/>
    case 'dimensional-portal':return <DimensionalPortal {...props}/>
    case 'cast-render-story-reel':return <CastRenderStoryReel {...props}/>
    case 'mainframe-mouse-scrub-hero':return <MainframeMouseScrubHero {...props}/>
  }
}
