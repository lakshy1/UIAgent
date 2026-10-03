import { useState } from 'react'
import { Check, X } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'status-badges',
  title: 'Badge and chip set',
  category: 'Data',
  description: 'Status badges, dot indicators and removable filter chips. Chips wrap into a horizontal scroller on phones.',
  source: ['30-Talenzo', '28-ecommerce'],
  tags: ['badge', 'chip', 'filter', 'status'],
  notes: ['Filter chips use aria-pressed.', 'Status never relies on color alone; each has a label.'],
} as const

const status = [['Live', 'bg-ok/15 text-ok', 'bg-ok'], ['Pending', 'bg-spark/20 text-ink', 'bg-spark'], ['Failed', 'bg-danger/15 text-danger', 'bg-danger'], ['Draft', 'bg-surface-2 text-muted', 'bg-muted']] as const
const filters = ['Electronics', 'Home', 'Beauty', 'Sports', 'Books', 'Toys']

export default function StatusBadges({ device }: { device: Device }) {
  const [on, setOn] = useState<string[]>(['Home'])
  const mobile = device === 'mobile'
  return (
    <div className="h-full min-h-[380px] space-y-8 p-6">
      <section><h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">Status</h3>
        <div className="flex flex-wrap gap-2">{status.map(([l, c, d]) => <span key={l} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${c}`}><span className={`h-1.5 w-1.5 rounded-full ${d}`} />{l}</span>)}</div></section>
      <section><h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">Filters</h3>
        <div className={mobile ? '-mx-6 flex gap-2 overflow-x-auto px-6 pb-2' : 'flex flex-wrap gap-2'}>
          {filters.map((f) => { const a = on.includes(f); return (
            <button key={f} aria-pressed={a} onClick={() => setOn(a ? on.filter((x) => x !== f) : [...on, f])} className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border text-sm transition ${mobile ? 'h-11 px-4' : 'h-9 px-3.5'} ${a ? 'border-brand bg-brand-soft text-brand' : 'border-line bg-surface hover:border-brand'}`}>
              {a && <Check size={14} />}{f}</button>) })}
        </div></section>
      {on.length > 0 && <section><h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">Active</h3>
        <div className="flex flex-wrap gap-2">{on.map((f) => <span key={f} className="inline-flex items-center gap-1 rounded-lg bg-ink py-1 pl-3 pr-1 text-xs text-bg">{f}<button aria-label={`Remove ${f}`} onClick={() => setOn(on.filter((x) => x !== f))} className="grid h-6 w-6 place-items-center rounded-md hover:bg-bg/20"><X size={12} /></button></span>)}</div></section>}
    </div>
  )
}
