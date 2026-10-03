import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'tilt-glare-card',
  title: '3D tilt glare card',
  category: 'Cards',
  description: 'Card that tilts toward the pointer in 3D with a moving specular glare. Great for membership or featured cards.',
  source: ['Web: Aceternity 3D card', '10-aconic-technologies'],
  tags: ['3d', 'tilt', 'glare'],
  notes: ['Tilt is disabled for reduced motion.', 'On touch, drag across the card to tilt.'],
} as const

export default function TiltGlareCard({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, () => void][] = [[800, () => { px.set(0.88); py.set(0.15) }], [1300, () => { px.set(0.15); py.set(0.85) }], [1300, () => { px.set(0.5); py.set(0.5) }]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5), py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 200, damping: 20 }), sy = useSpring(py, { stiffness: 200, damping: 20 })
  const ry = useTransform(sx, [0, 1], [-14, 14]), rx = useTransform(sy, [0, 1], [14, -14])
  const glare = useTransform([sx, sy], ([x, y]: number[]) => `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,.45), transparent 55%)`)
  return (
    <div className="grid h-full place-items-center p-4 [perspective:900px]" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <motion.div ref={ref} role="img" aria-label="Pro membership card" style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry }}
        onPointerMove={(e) => { const r = ref.current!.getBoundingClientRect(); px.set((e.clientX - r.left) / r.width); py.set((e.clientY - r.top) / r.height) }}
        onPointerLeave={() => { px.set(0.5); py.set(0.5) }}
        className={`relative touch-none overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e1330] via-[#2a2fc7] to-brand p-6 text-white shadow-2xl ${device === 'mobile' ? 'aspect-[1.6] w-full max-w-sm' : 'aspect-[1.6] w-full max-w-md'}`}>
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glare }} />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between"><span className="font-display text-lg font-semibold">Orbit Pro</span><Sparkles size={22} /></div>
          <div><p className="font-mono text-lg tracking-[0.25em]">4821 ···· ···· 0937</p>
            <div className="mt-2 flex justify-between text-xs opacity-80"><span>PRIYA SHARMA</span><span>Valid 09/29</span></div></div>
        </div>
      </motion.div>
    </div>
  )
}
