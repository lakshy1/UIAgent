import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import type { Device } from '../types'

export const meta = {
  id: 'parallax-stack',
  title: 'Parallax layer stack',
  category: 'Media',
  description: 'Layered gradient scene whose planes shift at different depths as the pointer moves. Drag on touch devices.',
  source: ['Web: Awwwards depth hero trend', '10-aconic-technologies'],
  tags: ['parallax', 'depth', 'hero'],
  notes: ['Disabled when reduced motion is requested.', 'Purely decorative, aria-hidden.'],
} as const

const layers = [
  { c: 'from-indigo-500/60 to-transparent', d: 8, s: 'inset-0' },
  { c: 'from-fuchsia-500 to-rose-500', d: 18, s: 'left-[12%] top-[18%] h-[55%] w-[45%] rounded-[40%]' },
  { c: 'from-amber-300 to-orange-500', d: 34, s: 'right-[12%] top-[30%] h-[40%] w-[30%] rounded-full' },
  { c: 'from-slate-900 to-slate-700', d: 52, s: 'inset-x-[8%] bottom-0 h-[34%] rounded-t-[50%]' },
]

export default function ParallaxStack({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, () => void][] = [[900, () => { mx.set(0.4); my.set(-0.3) }], [1300, () => { mx.set(-0.4); my.set(0.3) }], [1300, () => { mx.set(0); my.set(0) }]]
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
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 20 }), sy = useSpring(my, { stiffness: 120, damping: 20 })
  return (
    <div className="grid h-full place-items-center p-4" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <div ref={ref} aria-hidden className={`relative w-full touch-none overflow-hidden rounded-2xl bg-gradient-to-b from-sky-300 to-indigo-900 ${device === 'mobile' ? 'aspect-[3/4]' : 'aspect-[16/9] max-w-2xl'}`}
        onPointerMove={(e) => { if (reduce) return; const r = ref.current!.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5) }}
        onPointerLeave={() => { mx.set(0); my.set(0) }}>
        {layers.map((l, i) => <Layer key={i} {...l} sx={sx} sy={sy} />)}
      </div>
    </div>
  )
}

function Layer({ c, d, s, sx, sy }: { c: string; d: number; s: string; sx: MotionValue<number>; sy: MotionValue<number> }) {
  const x = useTransform(sx, (v) => v * d * -1), y = useTransform(sy, (v) => v * d * -1)
  return <motion.div style={{ x, y }} className={`absolute bg-gradient-to-br ${c} ${s}`} />
}
