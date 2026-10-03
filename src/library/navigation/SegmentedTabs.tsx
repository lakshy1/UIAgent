import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { LayoutGrid, List, Map } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'segmented-tabs',
  title: 'Segmented control',
  category: 'Navigation',
  description: 'Pill segmented switcher with a sliding thumb for view modes. Full-width and taller on phones, compact and inline on laptop.',
  source: ['28-ecommerce', '19-ev-connect'],
  tags: ['segmented', 'toggle', 'view-switch'],
  notes: ['Uses role=radiogroup with aria-checked per option.'],
} as const

const opts = [{ v: 'Grid', i: LayoutGrid }, { v: 'List', i: List }, { v: 'Map', i: Map }]
const stations = ['Harbour Point', 'Elm Street Hub', 'Airport North', 'Riverside Mall']

export default function SegmentedTabs({ device }: { device: Device }) {
  const [v, setV] = useState('Grid')
  const mobile = device === 'mobile'
  const root = useRef<HTMLDivElement>(null)
  const live = useRef(true)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = root.current
    const ts: number[] = []
    
    const at = (ms: number, f: () => void) => { ts.push(window.setTimeout(() => { if (live.current) f() }, ms)) }
    const stop = () => { live.current = false; ts.forEach(t => clearTimeout(t));  }
    const evs = ['pointerdown', 'keydown', 'wheel', 'focusin']
    evs.forEach(t => el?.addEventListener(t, stop))
    const run = () => {
      opts.slice(1).forEach((o, k) => at(1100 + k * 1600, () => setV(o.v)))
      at(1100 + opts.length * 1600, () => { setV('Grid'); run() })
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  return (
    <div ref={root} className="h-full bg-bg p-5 md:p-10">
      <div className={`flex items-center ${mobile ? 'flex-col items-stretch gap-4' : 'justify-between'}`}>
        <h2 className="font-display text-xl text-ink">Charging stations</h2>
        <div role="radiogroup" aria-label="View mode" className={`flex rounded-full border border-line bg-surface-2 p-1 ${mobile ? 'w-full' : ''}`}>
          {opts.map(({ v: o, i: I }) => (
            <button key={o} role="radio" aria-checked={v === o} onClick={() => setV(o)}
              className={`relative flex items-center justify-center gap-2 rounded-full text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-brand ${mobile ? 'h-11 flex-1' : 'h-9 px-4'} ${v === o ? 'text-ink' : 'text-muted'}`}>
              {v === o && <motion.span layoutId="seg" className="absolute inset-0 rounded-full bg-surface shadow" transition={{ type: 'spring', stiffness: 450, damping: 34 }} />}
              <I size={16} className="relative" /><span className="relative">{o}</span>
            </button>
          ))}
        </div>
      </div>
      <ul className={`mt-6 grid gap-3 ${v === 'List' ? '' : mobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
        {(v === 'Map' ? [] : stations).map(s => <li key={s} className="rounded-xl border border-line bg-surface p-4 text-sm text-ink">{s}<span className="block text-xs text-ok">4 bays free</span></li>)}
        {v === 'Map' && <li className="col-span-full grid h-32 place-items-center rounded-xl border border-dashed border-line text-sm text-muted">Map view placeholder</li>}
      </ul>
    </div>
  )
}
