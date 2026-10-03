import { Component, useEffect, useRef, useState, type ErrorInfo, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { Canvas, invalidate, useFrame } from '@react-three/fiber'
import { View } from '@react-three/drei'
import type { Device } from '../library/types'
import { ThreeModel } from './ThreeModels'
import type { ThreeSceneId } from './sceneTypes'

const animatedViews = new Set<symbol>()

class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(_error: Error, _info: ErrorInfo) { /* keep a single broken model isolated to its card */ }
  render() {
    return this.state.failed
      ? <div className="three-fallback absolute inset-0 grid place-items-center"><span className="font-display text-5xl font-bold tracking-[.2em] text-white/30">3D</span></div>
      : this.props.children
  }
}

function RenderScheduler() {
  useFrame(state => {
    if (animatedViews.size) state.invalidate()
  })
  return null
}

function SharedThreeCanvas() {
  return <Canvas
    frameloop="demand"
    dpr={[1, 1.5]}
    camera={{ position: [0, 0, 5.8], fov: 38, near: .1, far: 80 }}
    gl={{ alpha: true, antialias: true, powerPreference: 'low-power', preserveDrawingBuffer: false }}
    style={{ position: 'fixed', inset: 0, zIndex: 20, width: '100vw', height: '100vh', pointerEvents: 'none' }}
    fallback={null}
  >
    <RenderScheduler />
    <View.Port />
  </Canvas>
}

export function ThreeCatalogCanvas() {
  return <SharedThreeCanvas />
}

export function ThreePreview({ scene, device }: { scene: ThreeSceneId; device: Device }) {
  const node = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const token = useRef(Symbol(scene))
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const element = node.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '80px', threshold: .01 })
    observer.observe(element)
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReduced(query.matches)
    updateMotion()
    query.addEventListener('change', updateMotion)
    return () => {
      observer.disconnect()
      query.removeEventListener('change', updateMotion)
      animatedViews.delete(token.current)
    }
  }, [])

  useEffect(() => {
    if (visible && !reduced) animatedViews.add(token.current)
    else animatedViews.delete(token.current)
    invalidate()
  }, [visible, reduced])

  const setPointer = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduced) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointer.current.x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1))
    pointer.current.y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1))
    invalidate()
  }
  const resetPointer = () => {
    pointer.current.x = 0
    pointer.current.y = 0
    invalidate()
  }

  return <div ref={node} className="relative h-full w-full overflow-hidden" data-three-device={device} onPointerMove={setPointer} onPointerLeave={resetPointer} onPointerDown={setPointer}>
    <div aria-hidden className="three-fallback absolute inset-0" />
    <SceneErrorBoundary>
      <View
        className="absolute inset-0 h-full w-full overflow-hidden"
        style={{ background: 'transparent', touchAction: 'pan-y' }}
        visible={visible}
      >
        <ThreeModel scene={scene} pointer={pointer} visible={visible} reduced={reduced} />
      </View>
    </SceneErrorBoundary>
  </div>
}
