import { useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { RotateCw } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'tilt-flip-card',
  title: 'Tilt and flip card',
  category: 'Motion',
  description: '3D card. On laptop it tilts toward the cursor with a moving highlight; on mobile, where hover is absent, tapping flips it to reveal details.',
  source: ['28-ecommerce', '04-broomin'],
  tags: ['3d', 'hover', 'flip', 'card'],
  notes: ['Flip control is a real button with aria-pressed.', 'Tilt is skipped under reduced motion.'],
} as const

export default function TiltFlipCard({ device }: { device: Device }) {
  const reduce = useReducedMotion()
  const [flip, setFlip] = useState(false)
  const mx = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 })
  const my = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 })
  const rx = useTransform(my, [-0.5, 0.5], [10, -10])
  const ry = useTransform(mx, [-0.5, 0.5], [-12, 12])
  const gx = useTransform(mx, [-0.5, 0.5], ['20%', '80%'])
  const glow = useTransform(gx, (g) => `radial-gradient(260px circle at ${g} 20%, color-mix(in srgb, var(--brand) 22%, transparent), transparent)`)

  if (device === 'mobile') {
    return (
      <div className="grid h-full place-items-center p-6" style={{ perspective: 900 }}>
        <button onClick={() => setFlip(!flip)} aria-pressed={flip} aria-label="Flip card" className="relative h-72 w-full max-w-xs focus-visible:outline-2 focus-visible:outline-brand">
          <motion.div className="relative size-full" animate={{ rotateY: flip ? 180 : 0 }} transition={{ duration: reduce ? 0 : 0.6 }} style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-brand p-6 text-left text-white" style={{ backfaceVisibility: 'hidden' }}>
              <span className="text-sm opacity-80">Aurora Chair</span><span className="font-display text-3xl font-bold">Rs 12,499</span>
              <span className="flex items-center gap-1 text-xs opacity-80"><RotateCw size={12} /> Tap for details</span>
            </div>
            <div className="absolute inset-0 flex flex-col justify-center gap-2 rounded-2xl border border-line bg-surface p-6 text-left" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <p className="font-display text-lg font-semibold text-ink">What you get</p>
              <p className="text-sm text-muted">Lumbar support, 4D arms, 5-year warranty and free assembly.</p>
            </div>
          </motion.div>
        </button>
      </div>
    )
  }
  return (
    <div className="grid h-full place-items-center p-6" style={{ perspective: 1000 }}>
      <motion.div tabIndex={0}
        onMouseMove={(e) => {
          if (reduce) return
          const r = e.currentTarget.getBoundingClientRect()
          mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5)
        }}
        onMouseLeave={() => { mx.set(0); my.set(0) }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative h-72 w-96 overflow-hidden rounded-2xl border border-line bg-surface p-7 shadow-xl focus-visible:outline-2 focus-visible:outline-brand">
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
        <div className="relative flex h-full flex-col justify-between" style={{ transform: 'translateZ(40px)' }}>
          <span className="w-fit rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">Bestseller</span>
          <div><p className="font-display text-2xl font-bold text-ink">Aurora Chair</p><p className="mt-1 text-sm text-muted">Lumbar support, 4D arms, 5-year warranty.</p></div>
          <p className="font-display text-xl font-semibold text-ink">Rs 12,499</p>
        </div>
      </motion.div>
    </div>
  )
}
