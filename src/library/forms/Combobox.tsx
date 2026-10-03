import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronsUpDown, Check } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'select-combobox',
  title: 'Select combobox',
  category: 'Forms',
  description: 'Type-to-filter select with keyboard navigation. Opens a dropdown on laptop and a bottom picker sheet on phones.',
  source: ['21-Transform', '30-Talenzo'],
  tags: ['select', 'combobox', 'autocomplete'],
  notes: ['Implements role="combobox" with aria-activedescendant; arrows, Enter and Escape work.'],
} as const

const opts = ['Mumbai', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Delhi NCR', 'Ahmedabad']

export default function Combobox({ device }: { device: Device }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [val, setVal] = useState('Pune')
  const [hi, setHi] = useState(0)
  const mobile = device === 'mobile'
  const list = opts.filter((o) => o.toLowerCase().includes(q.toLowerCase()))
  const pick = (o: string) => { setVal(o); setOpen(false); setQ('') }
  const key = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setHi((hi + 1) % Math.max(list.length, 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setHi((hi - 1 + list.length) % Math.max(list.length, 1)) }
    if (e.key === 'Enter' && open && list[hi]) { e.preventDefault(); pick(list[hi]) }
    if (e.key === 'Escape') setOpen(false)
  }
  const panel = (
    <ul role="listbox" id="cb-list" className={mobile ? 'max-h-72 overflow-auto pb-4' : 'max-h-60 overflow-auto p-1'}>
      {list.map((o, i) => (
        <li key={o} id={`cb-${i}`} role="option" aria-selected={o === val} onMouseDown={(e) => { e.preventDefault(); pick(o) }} onMouseEnter={() => setHi(i)}
          className={`flex cursor-pointer items-center justify-between rounded-lg px-3 text-sm ${mobile ? 'h-14' : 'h-10'} ${i === hi ? 'bg-surface-2' : ''}`}>{o}{o === val && <Check size={16} className="text-brand" />}</li>))}
      {list.length === 0 && <li className="px-3 py-3 text-sm text-muted">No city found</li>}
    </ul>)
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
      at(900, () => { setOpen(true); setQ(''); setHi(0) })
      at(1700, () => setHi(2))
      at(2400, () => setHi(3))
      at(3100, () => { setVal(opts[3]); setOpen(false) })
      at(4300, () => setVal('Pune'))
      at(5400, run)
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  return (
    <div ref={root} className="relative h-full min-h-[380px] overflow-hidden p-6">
      <div className="mx-auto max-w-sm">
        <label htmlFor="cb-in" className="text-sm font-medium">Service city</label>
        <div className="relative mt-1.5">
          <input id="cb-in" role="combobox" aria-expanded={open} aria-controls="cb-list" aria-activedescendant={open ? `cb-${hi}` : undefined} aria-autocomplete="list"
            value={open ? q : val} placeholder={val} onChange={(e) => { setQ(e.target.value); setHi(0) }} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} onKeyDown={key}
            className={`w-full rounded-xl border border-line bg-surface px-4 pr-11 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/15 ${mobile ? 'h-14' : 'h-11'}`} />
          <ChevronsUpDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
          {open && !mobile && <div className="absolute inset-x-0 top-full z-10 mt-2 rounded-xl border border-line bg-surface shadow-xl">{panel}</div>}
        </div>
      </div>
      <AnimatePresence>
        {open && mobile && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="absolute inset-x-0 bottom-0 z-10 rounded-t-3xl border-t border-line bg-surface p-3 shadow-2xl">
            <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-line" />{panel}</motion.div>)}
      </AnimatePresence>
    </div>)
}
