import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'pagination',
  title: 'Pagination',
  category: 'Navigation',
  description: 'Numbered pager with ellipsis windowing and result count. On phones it reduces to previous/next buttons with a page indicator.',
  source: ['28-ecommerce', '30-Talenzo'],
  tags: ['pager', 'table', 'list'],
  notes: ['Current page has aria-current=page; edge buttons disable at limits.'],
} as const

const TOTAL = 24

function pages(p: number): (number | '…')[] {
  const out: (number | '…')[] = [1]
  if (p > 3) out.push('…')
  for (let n = Math.max(2, p - 1); n <= Math.min(TOTAL - 1, p + 1); n++) out.push(n)
  if (p < TOTAL - 2) out.push('…')
  out.push(TOTAL)
  return out
}

export default function Pagination({ device }: { device: Device }) {
  const [p, setP] = useState(7)
  const mobile = device === 'mobile'
  const nb = 'grid place-items-center rounded-lg border border-line bg-surface text-ink disabled:opacity-40 hover:bg-surface-2 outline-none focus-visible:ring-2 focus-visible:ring-brand'
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
      for (let k = 1; k <= 4; k++) at(900 + k * 900, () => setP(7 + k))
      at(5400, () => { setP(7); run() })
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  return (
    <div ref={root} className="grid h-full place-items-center bg-bg p-5">
      <div className="w-full max-w-xl">
        <p className="mb-4 text-center text-sm text-muted">Showing {(p - 1) * 10 + 1} to {p * 10} of {TOTAL * 10} orders</p>
        <nav aria-label="Pagination" className="flex items-center justify-between gap-2 md:justify-center">
          <button aria-label="Previous page" disabled={p === 1} onClick={() => setP(p - 1)} className={`${nb} ${mobile ? 'h-12 flex-1 gap-1' : 'h-9 w-9'}`}>
            <span className="flex items-center gap-1"><ChevronLeft size={18} />{mobile && 'Prev'}</span>
          </button>
          {mobile ? (
            <span className="px-2 text-sm text-ink" aria-current="page">{p} / {TOTAL}</span>
          ) : pages(p).map((n, k) => n === '…' ? <span key={k} className="px-1 text-muted">…</span> : (
            <button key={k} aria-current={n === p ? 'page' : undefined} onClick={() => setP(n)}
              className={`h-9 min-w-9 rounded-lg px-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-brand ${n === p ? 'bg-brand text-white' : 'text-muted hover:bg-surface-2 hover:text-ink'}`}>{n}</button>
          ))}
          <button aria-label="Next page" disabled={p === TOTAL} onClick={() => setP(p + 1)} className={`${nb} ${mobile ? 'h-12 flex-1' : 'h-9 w-9'}`}>
            <span className="flex items-center gap-1">{mobile && 'Next'}<ChevronRight size={18} /></span>
          </button>
        </nav>
      </div>
    </div>
  )
}
