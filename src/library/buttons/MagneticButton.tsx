import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'magnetic-button',
  title: 'Magnetic button',
  category: 'Buttons',
  description: 'Button that leans toward the cursor on desktop. On touch it swaps to a press-and-hold fill, since there is no hover.',
  source: ['04-broomin', '10-aconic-technologies'],
  tags: ['hover', 'cursor', 'hold'],
  notes: ['Magnet effect is skipped under reduced motion.', 'Hold button also activates with Space/Enter.'],
} as const

export default function MagneticButton({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, () => void][] = [...(device === 'mobile'
      ? [[900, () => setHeld(true)], [1800, () => { setHeld(false); setSent(false) }]] as [number, () => void][]
      : [[900, () => { x.set(46); y.set(-22) }], [1100, () => { x.set(-40); y.set(18) }], [1100, () => { x.set(0); y.set(0) }], [900, () => {}]] as [number, () => void][])]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const [held, setHeld] = useState(false)
  const [sent, setSent] = useState(false)

  if (device === 'mobile') {
    return (
      <div className="grid h-full place-items-center p-6" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
        <button
          onPointerDown={() => setHeld(true)} onPointerUp={() => setHeld(false)} onPointerLeave={() => setHeld(false)}
          onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && setHeld(true)} onKeyUp={() => setHeld(false)}
          onTransitionEnd={() => held && setSent(true)}
          className="relative h-16 w-full touch-none select-none overflow-hidden rounded-2xl border border-line bg-surface font-medium text-ink focus-visible:outline-2 focus-visible:outline-brand"
        >
          <span className="absolute inset-y-0 left-0 bg-brand" style={{ width: held || sent ? '100%' : '0%', transition: held ? 'width 1.2s linear' : 'width .3s' }} />
          <span className={`relative flex items-center justify-center gap-2 ${held || sent ? 'text-white' : ''}`}><Sparkles size={18} />{sent ? 'Order confirmed' : 'Hold to confirm order'}</span>
        </button>
      </div>
    )
  }
  return (
    <div className="grid h-full place-items-center p-6" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <div
        ref={ref} className="grid size-56 place-items-center"
        onMouseMove={(e) => {
          if (reduce || !ref.current) return
          const r = ref.current.getBoundingClientRect()
          x.set((e.clientX - r.left - r.width / 2) * 0.35); y.set((e.clientY - r.top - r.height / 2) * 0.35)
        }}
        onMouseLeave={() => { x.set(0); y.set(0) }}
      >
        <motion.button style={{ x, y }} whileTap={{ scale: 0.94 }} className="inline-flex h-14 items-center gap-2 rounded-full bg-brand px-8 text-sm font-medium text-white shadow-lg shadow-brand/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
          <Sparkles size={16} /> Get early access
        </motion.button>
      </div>
    </div>
  )
}
