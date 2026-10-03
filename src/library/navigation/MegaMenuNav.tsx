import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Layers, BarChart3, Shield, Zap, Plug, Users, Menu, X } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'mega-menu-nav',
  title: 'Classic navbar with mega menu',
  category: 'Navigation',
  description: 'Full-width navbar whose Product item opens a grouped mega-menu panel. On phones it becomes a hamburger with an accordion list.',
  source: ['28-ecommerce', '21-Transform'],
  tags: ['navbar', 'mega-menu', 'dropdown'],
  notes: ['Trigger exposes aria-expanded.', 'Escape closes the panel.'],
} as const

const items = [
  { i: Layers, t: 'Workspaces', d: 'Organise every project' },
  { i: BarChart3, t: 'Analytics', d: 'Live dashboards' },
  { i: Shield, t: 'Security', d: 'SSO and audit logs' },
  { i: Zap, t: 'Automations', d: 'No-code workflows' },
  { i: Plug, t: 'Integrations', d: '120+ connectors' },
  { i: Users, t: 'Teams', d: 'Roles and permissions' },
]

export default function MegaMenuNav({ device }: { device: Device }) {
  const [open, setOpen] = useState(false)
  const mobile = device === 'mobile'
  const grid = (
    <div className={`grid gap-1 ${mobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
      {items.map(({ i: I, t, d }) => (
        <a key={t} href="#" onClick={e => e.preventDefault()} className="flex items-start gap-3 rounded-xl p-3 hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand"><I size={18} /></span>
          <span><span className="block text-sm font-medium text-ink">{t}</span><span className="text-xs text-muted">{d}</span></span>
        </a>
      ))}
    </div>
  )
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
      at(900, () => setOpen(true))
      at(3400, () => setOpen(false))
      at(4800, run)
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  return (
    <div ref={root} className="relative h-full bg-bg" onKeyDown={e => e.key === 'Escape' && setOpen(false)}>
      <header className="relative z-10 flex h-16 items-center justify-between border-b border-line bg-surface px-4 md:px-8">
        <span className="font-display text-lg font-semibold text-ink">Northwind</span>
        {!mobile && (
          <nav aria-label="Primary" className="flex items-center gap-1 text-sm">
            <button aria-expanded={open} onClick={() => setOpen(o => !o)} className="flex items-center gap-1 rounded-lg px-3 py-2 font-medium text-ink hover:bg-surface-2">
              Product <ChevronDown size={14} className={`transition ${open ? 'rotate-180' : ''}`} />
            </button>
            {['Pricing', 'Customers', 'Docs'].map(l => <a key={l} href="#" onClick={e => e.preventDefault()} className="rounded-lg px-3 py-2 text-muted hover:text-ink">{l}</a>)}
            <button className="ml-3 rounded-lg bg-brand px-4 py-2 font-medium text-white">Start free</button>
          </nav>
        )}
        {mobile && <button aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(o => !o)} className="grid h-11 w-11 place-items-center rounded-xl border border-line text-ink">{open ? <X size={20} /> : <Menu size={20} />}</button>}
      </header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className={`absolute inset-x-0 top-16 z-10 border-b border-line bg-surface p-3 shadow-xl ${mobile ? 'bottom-0 overflow-auto' : 'mx-auto max-w-3xl rounded-b-2xl border-x'}`}>
            {grid}
            {mobile && <button className="mt-3 h-12 w-full rounded-xl bg-brand font-medium text-white">Start free</button>}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="p-8 text-sm text-muted">Page content sits below the navigation.</div>
    </div>
  )
}
