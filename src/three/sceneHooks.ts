import { useRef, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

export function useSceneRig(
  ref: RefObject<Group | null>,
  pointer: RefObject<{ x: number; y: number }>,
  visible: boolean,
  reduced: boolean,
  profile: { yaw?: number; pitch?: number; drift?: number; speed?: number } = {},
) {
  const { yaw = .28, pitch = .2, drift = .018, speed = .18 } = profile
  const startTime = useRef<number | null>(null)
  useFrame(({ clock }, delta) => {
    if (!visible || !ref.current) return
    if (startTime.current === null) startTime.current = clock.elapsedTime
    const elapsed = clock.elapsedTime - startTime.current
    const aimX = reduced ? 0 : -pointer.current.y * pitch
    const aimY = reduced ? 0 : pointer.current.x * yaw
    const ease = 1 - Math.exp(-delta * 4.6)
    ref.current.rotation.x += (aimX + Math.sin(elapsed * speed) * drift - ref.current.rotation.x) * ease
    ref.current.rotation.y += (aimY + elapsed * speed * .35 - ref.current.rotation.y) * ease
  })
}
