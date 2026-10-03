import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import type { Device } from '../types'

export const meta = {
  id: 'animated-counter',
  title: 'Animated counters',
  category: 'Motion',
  description: 'Stat numbers that count up once when scrolled into view. Laptop shows a four-up row with dividers; mobile uses a 2x2 grid of cards.',
  source: ['33-clickwise', '10-aconic-technologies'],
  tags: ['stats', 'numbers', 'count-up'],
  notes: ['Final value is exposed via aria-label from the first render.', 'Jumps straight to the final value under reduced motion.'],
} as const

const stats = [
  { v: 2400, s: '+', l: 'Teams onboarded' },
  { v: 98, s: '%', l: 'Uptime, 12 months' },
  { v: 14, s: 'M', l: 'Events a day' },
  { v: 340, s: 'ms', l: 'Median latency' },
]

function Count({ to, suffix, label }: { to: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reduce) { setN(to); return }
    const c = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to, reduce])
  return <span ref={ref} aria-label={`${to}${suffix} ${label}`} className="tabular-nums">{n.toLocaleString()}{suffix}</span>
}

export default function AnimatedCounter({ device }: { device: Device }) {
  const mobile = device === 'mobile'
  return (
    <div className="grid h-full place-items-center p-6">
      <div className={mobile ? 'grid w-full grid-cols-2 gap-3' : 'grid w-full max-w-4xl grid-cols-4 divide-x divide-line'}>
        {stats.map((s) => (
          <div key={s.l} className={mobile ? 'rounded-xl border border-line bg-surface p-4' : 'px-6 text-center'}>
            <p className={`font-display font-bold text-ink ${mobile ? 'text-3xl' : 'text-5xl'}`}><Count to={s.v} suffix={s.s} label={s.l} /></p>
            <p className="mt-1 text-sm text-muted">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
