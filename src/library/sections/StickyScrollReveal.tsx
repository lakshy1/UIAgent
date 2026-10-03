import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { Device } from '../types'

export const meta = {
  id: 'sticky-scroll-reveal',
  title: 'Sticky scroll reveal',
  category: 'Sections',
  description: 'Feature copy scrolls on one side while a sticky visual swaps to match the active step. Stacked with a pinned header on phones.',
  source: ['Web: Aceternity pattern', '33-clickwise'],
  tags: ['scroll', 'sticky', 'features'],
  notes: ['Active step is derived from scroll position, no scroll hijacking.'],
} as const

const steps = [
  { t: 'Capture every lead', d: 'Forms, calls and chats flow into one inbox the moment they arrive.', c: 'from-brand to-spark' },
  { t: 'Route automatically', d: 'Rules assign each lead to the right owner in seconds, day or night.', c: 'from-spark to-ok' },
  { t: 'Close with context', d: 'Every conversation, note and file sits beside the deal, ready to act on.', c: 'from-ok to-brand' },
]

export default function StickyScrollReveal({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let k = 0
    const steps: [number, () => void][] = [[2200, () => { const b = box.current; if (b) b.scrollTo({ top: (++k % steps.length) * (b.scrollHeight / steps.length), behavior: 'smooth' }) }]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const box = useRef<HTMLDivElement>(null)
  const [a, setA] = useState(0)
  const mobile = device === 'mobile'
  const onScroll = () => {
    const b = box.current; if (!b) return
    setA(Math.min(steps.length - 1, Math.round(b.scrollTop / (b.scrollHeight / steps.length))))
  }
  const visual = (
    <motion.div key={a} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className={`grid h-full w-full place-items-center rounded-2xl bg-gradient-to-br ${steps[a].c}`}>
      <span className="font-display text-6xl font-bold text-white/90">0{a + 1}</span>
    </motion.div>
  )
  return (
    <div onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt} onWheelCapture={halt} className={`flex h-full w-full ${mobile ? 'flex-col' : 'gap-6 p-6'}`}>
      {mobile && <div className="h-36 shrink-0 p-3">{visual}</div>}
      <div ref={box} onScroll={onScroll} className={`min-h-0 flex-1 overflow-y-auto ${mobile ? 'px-4' : ''}`}>
        {steps.map((s, i) => (
          <div key={s.t} className={`flex min-h-[70%] flex-col justify-center py-6 transition-opacity ${a === i ? 'opacity-100' : 'opacity-35'}`}>
            <h3 className="font-display text-2xl text-ink">{s.t}</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{s.d}</p>
          </div>
        ))}
      </div>
      {!mobile && <div className="w-1/2 shrink-0">{visual}</div>}
    </div>
  )
}
