import { useState, useEffect, useRef } from 'react'
import { Home, Inbox, BarChart3, Settings, Users, Menu, X } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'drawer-sidebar',
  title: 'Drawer sidebar',
  category: 'Navigation',
  description: 'A sidebar that is always visible on laptop and slides in over a dimmed page on phones.',
  source: ['01-cloud-duty', '11-invitation-to-apply'],
  tags: ['sidebar', 'drawer', 'responsive'],
  notes: ['Backdrop click and the close button both dismiss the drawer.', 'Active item uses aria-current.'],
} as const

const items = [
  { icon: Home, label: 'Overview' },
  { icon: Inbox, label: 'Inbox' },
  { icon: BarChart3, label: 'Reports' },
  { icon: Users, label: 'Team' },
  { icon: Settings, label: 'Settings' },
]

export default function DrawerSidebar({ device }: { device: Device }) {
  const mobile = device === 'mobile'
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('Overview')

  const nav = (
    <nav aria-label="Main" className="flex h-full w-64 flex-col gap-1 border-r border-line bg-surface p-4">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-display text-lg font-bold">Acme</span>
        {mobile && <button aria-label="Close menu" onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-full hover:bg-surface-2"><X size={18} /></button>}
      </div>
      {items.map(({ icon: Icon, label }) => (
        <button key={label} aria-current={active === label ? 'page' : undefined}
          onClick={() => { setActive(label); setOpen(false) }}
          className={`flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition ${active === label ? 'bg-brand-soft text-brand' : 'text-muted hover:bg-surface-2 hover:text-ink'}`}>
          <Icon size={18} /> {label}
        </button>
      ))}
    </nav>
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
      if (mobile) { at(900, () => setOpen(true)); at(1900, () => setActive('Reports')); at(3200, () => setOpen(false)) }
      else items.slice(1).forEach((x, k) => at(900 + k * 1000, () => setActive(x.label)))
      at(mobile ? 4600 : 5000, () => { setActive('Overview'); run() })
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [mobile])
  return (
    <div ref={root} className="relative flex h-full min-h-[480px] overflow-hidden bg-bg">
      {!mobile && nav}
      <main className="flex-1 p-6">
        {mobile && <button aria-label="Open menu" onClick={() => setOpen(true)} className="mb-4 grid size-11 place-items-center rounded-full border border-line bg-surface"><Menu size={20} /></button>}
        <h2 className="font-display text-2xl font-bold">{active}</h2>
        <p className="mt-1 text-sm text-muted">Pick a section from the sidebar.</p>
      </main>
      {mobile && (
        <>
          <div onClick={() => setOpen(false)} className={`absolute inset-0 z-10 bg-ink/40 transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />
          <div className={`absolute inset-y-0 left-0 z-20 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>{nav}</div>
        </>
      )}
    </div>
  )
}
