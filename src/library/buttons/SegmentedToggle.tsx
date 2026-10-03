import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutGrid, List, Rows3 } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'segmented-toggle',
  title: 'Segmented toggle',
  category: 'Buttons',
  description: 'View switcher with a sliding thumb. Laptop shows icon plus label in a compact pill; mobile becomes a full-width bar with larger stacked targets.',
  source: ['28-ecommerce', '20-Infrascope'],
  tags: ['toggle', 'tabs', 'view'],
  notes: ['Uses radiogroup semantics with arrow-key support.', 'Thumb slides with a spring; keep it short for reduced motion users.'],
} as const

const opts = [
  { id: 'grid', label: 'Grid', icon: LayoutGrid },
  { id: 'list', label: 'List', icon: List },
  { id: 'compact', label: 'Compact', icon: Rows3 },
]

export default function SegmentedToggle({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, () => void][] = [[1600, () => setV((p) => opts[(opts.findIndex((o) => o.id === p) + 1) % opts.length].id)]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const [v, setV] = useState('grid')
  const mobile = device === 'mobile'
  const i = opts.findIndex((o) => o.id === v)
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') setV(opts[(i + 1) % opts.length].id)
    if (e.key === 'ArrowLeft') setV(opts[(i + opts.length - 1) % opts.length].id)
  }
  return (
    <div onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt} className={`flex h-full flex-col gap-5 p-6 ${mobile ? 'justify-end' : 'items-center justify-center'}`}>
      <p className="text-center text-sm text-muted">Showing products as <b className="text-ink">{v}</b></p>
      <div role="radiogroup" aria-label="Product view" onKeyDown={onKey} className={`flex rounded-xl border border-line bg-surface-2 p-1 ${mobile ? 'w-full' : 'w-fit'}`}>
        {opts.map((o) => (
          <button key={o.id} role="radio" aria-checked={v === o.id} tabIndex={v === o.id ? 0 : -1} onClick={() => setV(o.id)}
            className={`relative flex items-center justify-center rounded-lg font-medium focus-visible:outline-2 focus-visible:outline-brand ${mobile ? 'h-14 flex-1 flex-col gap-0.5 text-xs' : 'h-9 gap-2 px-4 text-sm'} ${v === o.id ? 'text-ink' : 'text-muted hover:text-ink'}`}>
            {v === o.id && <motion.span layoutId="seg-thumb" className="absolute inset-0 rounded-lg border border-line bg-surface shadow-sm" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <o.icon size={mobile ? 20 : 16} className="relative" />
            <span className="relative">{o.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
