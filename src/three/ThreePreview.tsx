import { Component, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { Canvas, invalidate, useFrame } from '@react-three/fiber'
import { View } from '@react-three/drei'
import type { Device } from '../library/types'
import { SceneContext, type SceneState } from './kit'

const animatedViews = new Set<symbol>()

/** Lives inside the canvas tree, so one broken scene is dropped instead of taking the whole canvas down. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

function RenderScheduler() {
  useFrame(state => {
    if (animatedViews.size) state.invalidate()
  })
  return null
}

/** One WebGL canvas for the whole page; every ThreePreview draws into its own rectangle of it. */
export function ThreeCatalogCanvas() {
  return <Canvas
    frameloop="demand"
    dpr={[1, 1.75]}
    camera={{ position: [0, 0, 5.8], fov: 38, near: .1, far: 80 }}
    gl={{ alpha: true, antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: false }}
    style={{ position: 'fixed', inset: 0, zIndex: 20, width: '100vw', height: '100vh', pointerEvents: 'none' }}
    fallback={null}
  >
    <RenderScheduler />
    <View.Port />
  </Canvas>
}

export function ThreePreview({ device, bg, children }: { device: Device; bg?: string; children: ReactNode }) {
  const node = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const token = useRef(Symbol('view'))
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)
  const scene = useMemo<SceneState>(() => ({ pointer, visible, reduced }), [visible, reduced])

  useEffect(() => {
    const element = node.current
    if (!element) return
    const id = token.current
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '80px', threshold: .01 })
    observer.observe(element)
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReduced(query.matches)
    updateMotion()
    query.addEventListener('change', updateMotion)
    return () => {
      observer.disconnect()
      query.removeEventListener('change', updateMotion)
      animatedViews.delete(id)
      invalidate()
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
    <div aria-hidden className="three-fallback absolute inset-0" style={bg ? { background: bg } : undefined} />
    <View
      className="absolute inset-0 h-full w-full overflow-hidden"
      style={{ background: 'transparent', touchAction: 'pan-y' }}
      visible={visible}
    >
      <SceneBoundary>
        <SceneContext.Provider value={scene}>{children}</SceneContext.Provider>
      </SceneBoundary>
    </View>
  </div>
}
