import { useState, useEffect, useRef } from 'react'
import { LayoutDashboard, Users, CalendarDays, FileText, Settings, Briefcase } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'icon-rail-sidebar',
  title: 'Icon rail that expands',
  category: 'Navigation',
  description: 'Slim icon rail that expands to show labels on hover or focus. On phones the same items become a bottom tab bar.',
  source: ['30-Talenzo', '25-Nivaso'],
  tags: ['sidebar', 'rail', 'app-shell'],
  notes: ['Expands on focus-within so keyboard users get labels.', 'Rail turns into a bottom bar below tablet widths.'],
} as const

const items = [
  { i: LayoutDashboard, l: 'Overview' }, { i: Briefcase, l: 'Jobs' }, { i: Users, l: 'Candidates' },
  { i: CalendarDays, l: 'Interviews' }, { i: FileText, l: 'Offers' }, { i: Settings, l: 'Settings' },
]

export default function IconRailSidebar({ device }: { device: Device }) {
  const [active, setActive] = useState('Overview')
  const [peek, setPeek] = useState(false)
  const mobile = device === 'mobile'
  const btn = (x: typeof items[number], bar: boolean) => (
    <button key={x.l} onClick={() => setActive(x.l)} aria-current={active === x.l ? 'page' : undefined} title={x.l}
      className={`flex items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand ${bar ? 'h-14 flex-1 flex-col justify-center gap-0.5 text-[10px]' : 'h-11 px-3.5 text-sm'} ${active === x.l ? 'bg-brand-soft text-brand' : 'text-muted hover:bg-surface-2 hover:text-ink'}`}>
      <x.i size={20} className="shrink-0" />
      <span className={bar ? '' : `whitespace-nowrap transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 ${peek ? 'opacity-100' : 'opacity-0'}`}>{x.l}</span>
    </button>
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
      if (mobile) items.slice(1, 5).forEach((x, k) => at(900 + k * 900, () => setActive(x.l)))
      else { at(900, () => setPeek(true)); at(1500, () => setActive('Jobs')); at(2300, () => setActive('Candidates')); at(3500, () => setPeek(false)) }
      at(mobile ? 5000 : 4800, () => { setActive('Overview'); run() })
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [mobile])
  return (
    <div ref={root} className={`relative flex h-full bg-bg ${mobile ? 'flex-col' : ''}`}>
      {!mobile && (
        <aside aria-label="Sidebar" className={`group absolute inset-y-0 left-0 z-10 ${peek ? 'w-56' : 'w-[72px]'} overflow-hidden border-r border-line bg-surface p-3 shadow-sm transition-[width] duration-300 hover:w-56 focus-within:w-56`}>
          <div className="mb-4 flex h-11 items-center gap-3 px-1.5 font-display text-brand"><span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white">T</span></div>
          <nav className="flex flex-col gap-1">{items.map(x => btn(x, false))}</nav>
        </aside>
      )}
      <main className={`flex-1 p-6 ${mobile ? '' : 'pl-24'}`}>
        <h2 className="font-display text-2xl text-ink">{active}</h2>
        <p className="mt-1 text-sm text-muted">Hover the rail to reveal labels.</p>
      </main>
      {mobile && <nav aria-label="Sidebar" className="flex gap-1 border-t border-line bg-surface p-1.5 pb-3">{items.slice(0, 5).map(x => btn(x, true))}</nav>}
    </div>
  )
}
