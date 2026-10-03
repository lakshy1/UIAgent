import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Device } from '../types'

export const meta = {
  id: 'bar-chart',
  title: 'Bar chart',
  category: 'Data',
  description: 'Animated vertical bars on laptop; horizontal ranked bars with large touch rows on phones.',
  source: ['33-clickwise', '20-Infrascope'],
  tags: ['chart', 'bars', 'svg'],
  notes: ['Each bar is focusable and exposes its value via aria-label.'],
} as const

const d = [['Mon', 42], ['Tue', 68], ['Wed', 55], ['Thu', 91], ['Fri', 74], ['Sat', 38], ['Sun', 29]] as const

export default function BarChart({ device }: { device: Device }) {
  const [hot, setHot] = useState<number | null>(3)
  const mobile = device === 'mobile'
  return (
    <div className="h-full min-h-[380px] p-5">
      <h3 className="font-display text-lg font-semibold">Weekly signups</h3>
      <p className="text-sm text-muted">{hot === null ? 'Hover a bar' : `${d[hot][0]}: ${d[hot][1]} new accounts`}</p>
      {mobile ? (
        <ul className="mt-4 space-y-2">
          {[...d].sort((a, b) => b[1] - a[1]).map(([l, v]) => (
            <li key={l}><button aria-label={`${l} ${v}`} onClick={() => setHot(d.findIndex((x) => x[0] === l))} className="flex h-12 w-full items-center gap-3 text-left">
              <span className="w-9 text-xs text-muted">{l}</span>
              <span className="h-5 flex-1 rounded-full bg-surface-2"><motion.span className={`block h-full rounded-full ${d[hot ?? -1]?.[0] === l ? 'bg-brand' : 'bg-brand/50'}`} initial={{ width: 0 }} animate={{ width: `${v}%` }} /></span>
              <span className="w-8 text-right font-mono text-sm">{v}</span></button></li>))}
        </ul>
      ) : (
        <div className="mt-6 flex h-64 items-end gap-4 border-b border-line px-2">
          {d.map(([l, v], i) => (
            <button key={l} aria-label={`${l} ${v}`} onMouseEnter={() => setHot(i)} onFocus={() => setHot(i)} className="group flex h-full flex-1 flex-col justify-end gap-2 focus-visible:outline-none">
              <motion.div initial={{ height: 0 }} animate={{ height: `${v}%` }} transition={{ delay: i * 0.05, type: 'spring', damping: 20 }} className={`w-full rounded-t-lg transition-colors ${hot === i ? 'bg-brand' : 'bg-brand/40'}`} />
              <span className="translate-y-6 text-xs text-muted">{l}</span></button>))}
        </div>
      )}
    </div>
  )
}
