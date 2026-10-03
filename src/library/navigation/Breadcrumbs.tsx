import { useState } from 'react'
import { ChevronRight, ChevronLeft, Home, MoreHorizontal } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'breadcrumbs',
  title: 'Breadcrumbs',
  category: 'Navigation',
  description: 'Clickable trail that truncates long paths with an expandable ellipsis. On phones it collapses to a single back link to the parent.',
  source: ['25-Nivaso', '20-Infrascope'],
  tags: ['breadcrumb', 'trail', 'back'],
  notes: ['Wrapped in nav aria-label=Breadcrumb; current page has aria-current.'],
} as const

const full = ['Home', 'Projects', 'Tower B', 'Floor 12', 'Unit 1204']

export default function Breadcrumbs({ device }: { device: Device }) {
  const [depth, setDepth] = useState(full.length)
  const [expanded, setExpanded] = useState(false)
  const trail = full.slice(0, depth)
  const mobile = device === 'mobile'
  const collapsed = !expanded && trail.length > 3
  const shown = collapsed ? [trail[0], null, ...trail.slice(-2)] : trail
  return (
    <div className="h-full bg-bg p-5 md:p-10">
      <nav aria-label="Breadcrumb" className="rounded-xl border border-line bg-surface px-3 py-2">
        {mobile ? (
          <button disabled={depth < 2} onClick={() => setDepth(d => d - 1)} className="flex h-11 items-center gap-1 text-sm font-medium text-brand disabled:text-muted">
            <ChevronLeft size={18} />{depth > 1 ? trail[depth - 2] : 'Home'}
          </button>
        ) : (
          <ol className="flex flex-wrap items-center gap-1 text-sm">
            {shown.map((c, k) => (
              <li key={k} className="flex items-center gap-1">
                {k > 0 && <ChevronRight size={14} className="text-muted" />}
                {c === null ? (
                  <button aria-label="Show full path" onClick={() => setExpanded(true)} className="grid h-7 w-7 place-items-center rounded-md text-muted hover:bg-surface-2"><MoreHorizontal size={16} /></button>
                ) : k === shown.length - 1 ? (
                  <span aria-current="page" className="px-1.5 font-medium text-ink">{c}</span>
                ) : (
                  <button onClick={() => { setDepth(full.indexOf(c) + 1); setExpanded(false) }} className="flex items-center gap-1 rounded-md px-1.5 py-1 text-muted hover:bg-surface-2 hover:text-ink">
                    {c === 'Home' && <Home size={14} />}{c}
                  </button>
                )}
              </li>
            ))}
          </ol>
        )}
      </nav>
      <div className="mt-6 flex items-center justify-between">
        <h2 className="font-display text-2xl text-ink">{full[depth - 1]}</h2>
        <button onClick={() => { setDepth(full.length); setExpanded(false) }} className="text-sm text-brand">Reset</button>
      </div>
    </div>
  )
}
