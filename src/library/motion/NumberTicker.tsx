import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Device } from '../types'

export const meta = {
  id: 'number-ticker',
  title: 'Odometer number ticker',
  category: 'Motion',
  description: 'Each digit rolls vertically to its new value like a mechanical odometer. Pick a figure to see it tick.',
  source: ['Web: Magic UI number ticker', '33-clickwise'],
  tags: ['number', 'odometer', 'stats'],
  notes: ['The real value sits in an sr-only element; rolling digits are aria-hidden.'],
} as const

const values = [1284, 9031, 457320, 62]

function Digit({ d, h }: { d: number; h: number }) {
  return (
    <span className="relative inline-block overflow-hidden" style={{ height: h, width: '0.62em' }}>
      <motion.span className="absolute inset-x-0 top-0 flex flex-col text-center"
        animate={{ y: -d * h }} transition={{ type: 'spring', stiffness: 90, damping: 16 }}>
        {Array.from({ length: 10 }, (_, n) => <span key={n} style={{ height: h, lineHeight: `${h}px` }}>{n}</span>)}
      </motion.span>
    </span>
  )
}

export default function NumberTicker({ device }: { device: Device }) {
  const [v, setV] = useState(0)
  const m = device === 'mobile'
  const h = m ? 48 : 72
  const s = String(values[v])
  return (
    <div className="grid h-full w-full place-items-center bg-bg px-6 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted">Active riders</p>
        <p className="sr-only">{values[v].toLocaleString()}</p>
        <div aria-hidden className="mt-2 flex justify-center font-display font-bold text-ink" style={{ fontSize: h * 0.8 }}>
          {s.split('').map((c, i) => <Digit key={s.length - i} d={Number(c)} h={h} />)}
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {values.map((x, i) => (
            <button key={x} onClick={() => setV(i)} aria-pressed={v === i}
              className={`h-11 rounded-full px-4 text-sm transition focus-visible:outline-2 focus-visible:outline-brand ${v === i ? 'bg-brand text-white' : 'border border-line bg-surface text-muted'}`}>
              {x.toLocaleString()}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
