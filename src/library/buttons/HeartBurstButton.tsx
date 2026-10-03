import { useEffect, useRef, useState } from 'react'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Device } from '../types'

export const meta = {
  id: 'heart-burst-button',
  title: 'Like heart burst',
  category: 'Buttons',
  description: 'Toggle like button with a springy heart, radial particle burst and a live counter.',
  source: ['Web: Magic UI pattern', '04-broomin'],
  tags: ['like', 'toggle', 'delight'],
  notes: ['aria-pressed reflects state.', 'Burst is brief (0.5s) and decorative only.'],
} as const

export default function HeartBurstButton({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, () => void][] = [[900, () => { setOn(true); setBurst((b) => b + 1) }], [2200, () => setOn(false)]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const [on, setOn] = useState(false)
  const [burst, setBurst] = useState(0)
  const size = device === 'mobile' ? 'h-16 px-7' : 'h-14 px-6'
  return (
    <div className="grid h-full w-full place-items-center p-6" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <button aria-pressed={on} aria-label={on ? 'Unlike' : 'Like'} onClick={() => { setOn(!on); if (!on) setBurst(b => b + 1) }}
        className={`relative inline-flex items-center gap-3 rounded-full border border-line bg-surface font-medium text-ink transition active:scale-95 focus-visible:outline-2 focus-visible:outline-brand ${size}`}>
        <motion.span animate={{ scale: on ? [1, 1.5, 1] : 1 }} transition={{ type: 'spring', stiffness: 400, damping: 12 }} className="relative grid place-items-center">
          <Heart size={26} className={on ? 'fill-danger text-danger' : 'text-muted'} />
          {on && Array.from({ length: 8 }).map((_, i) => (
            <motion.i key={`${burst}-${i}`} className="absolute h-1.5 w-1.5 rounded-full bg-danger"
              initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: Math.cos(i * Math.PI / 4) * 28, y: Math.sin(i * Math.PI / 4) * 28, opacity: 0 }} transition={{ duration: 0.5 }} />
          ))}
        </motion.span>
        <span className="tabular-nums">{1204 + (on ? 1 : 0)}</span>
      </button>
    </div>
  )
}
