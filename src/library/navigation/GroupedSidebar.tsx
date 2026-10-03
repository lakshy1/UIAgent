import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Home, Boxes, Network, Activity, Bell, KeyRound, PanelLeftClose, PanelLeft } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'grouped-sidebar',
  title: 'Collapsible grouped sidebar',
  category: 'Navigation',
  description: 'Sidebar with collapsible sections and a collapse-to-icons toggle. On phones it is hidden behind a top bar and slides in as an overlay.',
  source: ['20-Infrascope', '22-Kubeshift'],
  tags: ['sidebar', 'accordion', 'groups'],
  notes: ['Group headers use aria-expanded.', 'Mobile overlay closes on selection.'],
} as const

const groups = [
  { g: 'Platform', items: [{ i: Home, l: 'Overview' }, { i: Boxes, l: 'Clusters' }, { i: Network, l: 'Networking' }] },
  { g: 'Operations', items: [{ i: Activity, l: 'Metrics' }, { i: Bell, l: 'Alerts' }, { i: KeyRound, l: 'Access keys' }] },
]

export default function GroupedSidebar({ device }: { device: Device }) {
  const mobile = device === 'mobile'
  const [active, setActive] = useState('Overview')
  const [closed, setClosed] = useState<string[]>([])
  const [mini, setMini] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const slim = mini && !mobile
  const panel = (
    <aside aria-label="Sidebar" className={`flex h-full flex-col gap-2 border-r border-line bg-surface p-3 transition-[width] ${mobile ? 'w-64' : slim ? 'w-[68px]' : 'w-60'}`}>
      {groups.map(({ g, items }) => (
        <div key={g}>
          {!slim && <button aria-expanded={!closed.includes(g)} onClick={() => setClosed(c => c.includes(g) ? c.filter(x => x !== g) : [...c, g])}
            className="flex w-full items-center justify-between px-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted">{g}<ChevronDown size={14} className={closed.includes(g) ? '-rotate-90' : ''} /></button>}
          <AnimatePresence initial={false}>
            {(slim || !closed.includes(g)) && (
              <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                {items.map(({ i: I, l }) => (
                  <li key={l}><button onClick={() => { setActive(l); setDrawer(false) }} title={l} aria-current={active === l ? 'page' : undefined}
                    className={`my-0.5 flex w-full items-center gap-3 rounded-lg px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand ${mobile ? 'h-12' : 'h-10'} ${active === l ? 'bg-brand-soft font-medium text-brand' : 'text-muted hover:bg-surface-2 hover:text-ink'}`}>
                    <I size={18} className="shrink-0" />{!slim && l}</button></li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ))}
      {!mobile && <button aria-label="Toggle sidebar" onClick={() => setMini(m => !m)} className="mt-auto grid h-10 w-10 place-items-center rounded-lg text-muted hover:bg-surface-2">{mini ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}</button>}
    </aside>
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
      if (mobile) { at(900, () => setDrawer(true)); at(2000, () => setActive('Clusters')); at(3300, () => setDrawer(false)) }
      else { at(900, () => setClosed(['Operations'])); at(2000, () => setClosed([])); at(2800, () => setMini(true)); at(4600, () => setMini(false)) }
      at(mobile ? 4800 : 6000, () => { setActive('Overview'); run() })
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [mobile])
  return (
    <div ref={root} className={`relative h-full overflow-hidden bg-bg ${mobile ? '' : 'flex'}`}>
      {mobile ? (
        <>
          <header className="flex h-14 items-center gap-3 border-b border-line bg-surface px-3">
            <button aria-label="Open sidebar" onClick={() => setDrawer(true)} className="grid h-11 w-11 place-items-center rounded-lg hover:bg-surface-2"><PanelLeft size={20} /></button>
            <span className="font-display text-ink">{active}</span>
          </header>
          <AnimatePresence>{drawer && (<>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} className="absolute inset-0 z-10 bg-ink/40" />
            <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} className="absolute inset-y-0 left-0 z-20">{panel}</motion.div>
          </>)}</AnimatePresence>
        </>
      ) : <>{panel}<main className="p-8"><h2 className="font-display text-2xl text-ink">{active}</h2></main></>}
    </div>
  )
}
