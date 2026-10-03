import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'date-picker',
  title: 'Date picker',
  category: 'Forms',
  description: 'Month calendar with prev/next navigation and a selected-date summary. Larger on phones.',
  source: ['Web: Origin UI calendar pattern', '18-queue-care'],
  tags: ['calendar', 'date', 'input'],
  notes: ['Each day is a button with a full-date aria-label.'],
} as const

export default function DatePicker({ device }: { device: Device }) {
  const [m, setM] = useState(new Date(2026, 9, 1))
  const [sel, setSel] = useState(new Date(2026, 9, 14))
  const first = new Date(m.getFullYear(), m.getMonth(), 1).getDay()
  const days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate()
  const cells = [...Array(first).fill(0), ...Array.from({ length: days }, (_, i) => i + 1)] as number[]
  const step = (n: number) => setM(new Date(m.getFullYear(), m.getMonth() + n, 1))
  const same = (d: number) => sel.getFullYear() === m.getFullYear() && sel.getMonth() === m.getMonth() && sel.getDate() === d
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
      at(900, () => setSel(new Date(2026, 9, 21)))
      at(1900, () => setM(new Date(2026, 10, 1)))
      at(2800, () => setSel(new Date(2026, 10, 5)))
      at(4200, () => { setM(new Date(2026, 9, 1)); setSel(new Date(2026, 9, 14)) })
      at(5400, run)
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  return (
    <div ref={root} className="grid h-full w-full place-items-center p-4">
      <div className={`w-full rounded-2xl border border-line bg-surface p-4 ${device === 'mobile' ? 'max-w-sm' : 'max-w-xs'}`}>
        <div className="mb-3 flex items-center justify-between">
          <button aria-label="Previous month" onClick={() => step(-1)} className="grid size-9 place-items-center rounded-lg text-ink hover:bg-surface-2"><ChevronLeft size={18} /></button>
          <span className="font-display text-sm font-semibold text-ink">{m.toLocaleString('en', { month: 'long', year: 'numeric' })}</span>
          <button aria-label="Next month" onClick={() => step(1)} className="grid size-9 place-items-center rounded-lg text-ink hover:bg-surface-2"><ChevronRight size={18} /></button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted">{'SMTWTFS'.split('').map((d, i) => <span key={i}>{d}</span>)}</div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((d, i) => d === 0 ? <span key={i} /> : (
            <button key={i} aria-label={new Date(m.getFullYear(), m.getMonth(), d).toDateString()} aria-pressed={same(d)} onClick={() => setSel(new Date(m.getFullYear(), m.getMonth(), d))} className={`aspect-square rounded-lg text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand ${same(d) ? 'bg-brand text-white' : 'text-ink hover:bg-surface-2'}`}>{d}</button>
          ))}
        </div>
        <p className="mt-3 border-t border-line pt-3 text-center text-xs text-muted">Selected: <b className="text-ink">{sel.toDateString()}</b></p>
      </div>
    </div>
  )
}
