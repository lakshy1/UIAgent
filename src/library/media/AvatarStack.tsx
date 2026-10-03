import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'avatar-stack',
  title: 'Avatar stack',
  category: 'Media',
  description: 'Overlapping avatars that lift on hover with a name tooltip and an overflow counter. Good for collaborators and assignees.',
  source: ['Web: Origin UI avatar group', '18-queue-care'],
  tags: ['avatar', 'group', 'presence'],
  notes: ['Each avatar is focusable and labelled.', 'Initials stand in for photos.'],
} as const

const people = [
  ['Aarav Mehta', 'from-rose-400 to-orange-500'], ['Sara Khan', 'from-sky-400 to-indigo-500'],
  ['Dev Patel', 'from-emerald-400 to-teal-600'], ['Maya Rao', 'from-fuchsia-400 to-purple-600'],
  ['Neil Shah', 'from-amber-300 to-red-500'], ['Isha Nair', 'from-cyan-300 to-blue-600'],
]

export default function AvatarStack({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let k = 0
    const n = device === 'mobile' ? 4 : 5
    const steps: [number, () => void][] = [[700, () => setHot(k++ % n)], [1000, () => setHot(k++ % n)]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const [hot, setHot] = useState<number | null>(null)
  const shown = device === 'mobile' ? 4 : 5
  const big = 'h-14 w-14 text-base'
  return (
    <div className="grid h-full place-items-center p-6" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <div className="text-center">
        <div className="flex justify-center pt-10">
          {people.slice(0, shown).map(([n, g], i) => (
            <motion.button key={n} aria-label={n} onHoverStart={() => setHot(i)} onHoverEnd={() => setHot(null)} onFocus={() => setHot(i)} onBlur={() => setHot(null)}
              whileHover={{ y: -8 }} className={`relative -ml-3 grid place-items-center rounded-full bg-gradient-to-br ${g} ${big} font-semibold text-white ring-4 ring-bg first:ml-0 focus-visible:outline-2 focus-visible:outline-brand`}>
              {n.split(' ').map((w) => w[0]).join('')}
              {hot === i && <span className="absolute -top-9 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-xs text-bg">{n}</span>}
            </motion.button>
          ))}
          <span className={`-ml-3 grid place-items-center rounded-full bg-surface-2 font-medium text-muted ring-4 ring-bg ${big}`}>+{people.length - shown + 8}</span>
        </div>
        <p className="mt-5 text-sm text-muted">Shared with <span className="font-medium text-ink">{people.length + 8} teammates</span></p>
        <button className="mt-3 inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-4 text-sm text-ink hover:bg-surface-2"><Plus size={14} /> Invite</button>
      </div>
    </div>
  )
}
