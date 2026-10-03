import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'stacked-card-deck',
  title: 'Stacked card deck',
  category: 'Cards',
  description: 'Swipeable deck of stacked cards. Drag a card away (or use the buttons) to accept or skip, revealing the next.',
  source: ['Web: Tinder-style swipe stack', '04-broomin'],
  tags: ['swipe', 'deck', 'stack'],
  notes: ['Buttons duplicate the swipe gesture for keyboard users.', 'Deck resets when empty.'],
} as const

const all = [
  ['Deep clean, 2BHK', 'Sat 9:00 AM', 'from-sky-400 to-indigo-600'],
  ['Kitchen scrub', 'Sun 11:30 AM', 'from-emerald-400 to-teal-600'],
  ['Sofa shampoo', 'Mon 4:00 PM', 'from-amber-300 to-orange-600'],
  ['Bathroom detail', 'Tue 8:00 AM', 'from-fuchsia-400 to-purple-600'],
]

export default function StackedCardDeck({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let k = 0
    const steps: [number, () => void][] = [[1700, () => { if (k++ < 4) act(k % 2 ? 1 : -1); else { k = 0; setN(0) } }]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const [n, setN] = useState(0)
  const [dir, setDir] = useState(1)
  const left = all.slice(n, n + 3)
  const act = (d: number) => { setDir(d); setN((v) => v + 1) }
  return (
    <div className="grid h-full place-items-center p-4" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <div className="w-full max-w-xs">
        <div className={`relative ${device === 'mobile' ? 'h-72' : 'h-64'}`}>
          {left.length === 0 && (
            <div className="grid h-full place-items-center rounded-3xl border border-dashed border-line text-center">
              <div><p className="font-medium text-ink">All caught up</p><button onClick={() => setN(0)} className="mt-2 text-sm text-brand underline">Reset deck</button></div>
            </div>
          )}
          <AnimatePresence custom={dir}>
            {left.map(([t, w, g], i) => (
              <motion.div key={t} custom={dir} drag={i === 0 ? 'x' : false} dragSnapToOrigin
                onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 90) act(info.offset.x > 0 ? 1 : -1) }}
                initial={false} animate={{ scale: 1 - i * 0.05, y: i * 14, opacity: 1 - i * 0.2 }}
                variants={{ gone: (d: number) => ({ x: d * 320, rotate: d * 18, opacity: 0 }) }} exit="gone"
                style={{ zIndex: 3 - i }}
                className={`absolute inset-0 flex cursor-grab flex-col justify-end rounded-3xl bg-gradient-to-br ${g} p-5 text-white shadow-xl active:cursor-grabbing`}>
                <p className="font-mono text-xs uppercase opacity-80">{w}</p>
                <p className="font-display text-2xl font-semibold">{t}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <button aria-label="Skip" onClick={() => left.length && act(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-line bg-surface text-danger"><X size={20} /></button>
          <button aria-label="Accept" onClick={() => left.length && act(1)} className="grid h-12 w-12 place-items-center rounded-full bg-ok text-white"><Check size={20} /></button>
        </div>
      </div>
    </div>
  )
}
