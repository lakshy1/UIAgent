import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowLeft } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'expanding-search',
  title: 'Expanding search',
  category: 'Forms',
  description: 'Icon button that expands into a search bar with suggestions. Becomes a full-width takeover with a back button on phones.',
  source: ['28-ecommerce', '33-clickwise'],
  tags: ['search', 'expand', 'suggestions'],
  notes: ['Escape collapses and returns focus to the trigger.', 'Suggestions are buttons in a labelled list.'],
} as const

const all = ['Wireless earbuds', 'Wooden desk lamp', 'Water bottle 1L', 'Walking shoes', 'Wall clock']

export default function ExpandingSearch({ device }: { device: Device }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const trig = useRef<HTMLButtonElement>(null)
  const mobile = device === 'mobile'
  const res = all.filter((x) => x.toLowerCase().includes(q.toLowerCase()))
  const close = () => { setOpen(false); setQ(''); setTimeout(() => trig.current?.focus(), 0) }
  const root = useRef<HTMLDivElement>(null)
  const live = useRef(true)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = root.current
    const ts: number[] = []
    
    const at = (ms: number, f: () => void) => { ts.push(window.setTimeout(() => { if (live.current) f() }, ms)) }
    const stop = () => { live.current = false; ts.forEach(t => clearTimeout(t));  }
    const evs = ['pointerdown', 'keydown', 'wheel']
    evs.forEach(t => el?.addEventListener(t, stop))
    const run = () => {
      at(900, () => { setOpen(true); setQ('') })
      at(1700, () => setQ('w'))
      at(2100, () => setQ('wa'))
      at(3800, () => { setOpen(false); setQ('') })
      at(5400, run)
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  return (
    <div ref={root} className="relative h-full min-h-[380px] overflow-hidden p-5" onKeyDown={(e) => e.key === 'Escape' && open && close()}>
      <div className="flex items-center justify-between"><span className="font-display text-xl font-semibold">Shopfront</span>
        <motion.div animate={{ width: open && !mobile ? 360 : 44 }} className="relative h-11 overflow-hidden rounded-full border border-line bg-surface">
          <button ref={trig} aria-label="Open search" onClick={() => setOpen(true)} className="absolute left-0 top-0 grid h-11 w-11 place-items-center"><Search size={18} /></button>
          {open && !mobile && <input aria-label="Search products" ref={(el) => el?.focus()} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="h-full w-full bg-transparent pl-11 pr-10 text-sm outline-none" />}
          {open && !mobile && <button aria-label="Close search" onClick={close} className="absolute right-0 top-0 grid h-11 w-11 place-items-center text-muted"><X size={16} /></button>}
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={mobile ? { opacity: 0 } : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={mobile ? 'absolute inset-0 z-10 bg-bg p-4' : 'absolute right-5 top-[4.5rem] z-10 w-[360px] rounded-2xl border border-line bg-surface p-2 shadow-xl'}>
            {mobile && <div className="mb-3 flex items-center gap-2"><button aria-label="Back" onClick={close} className="grid h-12 w-12 place-items-center"><ArrowLeft size={20} /></button>
              <input aria-label="Search products" ref={(el) => el?.focus()} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="h-12 flex-1 rounded-full border border-line bg-surface px-5 text-base outline-none focus:border-brand" /></div>}
            <ul aria-label="Suggestions">{res.map((r) => <li key={r}><button onClick={close} className={`flex w-full items-center gap-3 rounded-xl px-3 text-left text-sm hover:bg-surface-2 ${mobile ? 'h-14' : 'h-10'}`}><Search size={14} className="text-muted" />{r}</button></li>)}
              {res.length === 0 && <li className="px-3 py-4 text-sm text-muted">No matches for "{q}"</li>}</ul>
          </motion.div>)}
      </AnimatePresence>
    </div>)
}
