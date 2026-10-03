import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, FileText, Settings, Users, Plus, CornerDownLeft } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'command-palette',
  title: 'Command palette',
  category: 'Navigation',
  description: 'Searchable command launcher opened with Cmd/Ctrl+K and driven by arrow keys. On phones it is a bottom sheet opened from a search button.',
  source: ['30-Talenzo', '33-clickwise'],
  tags: ['cmd-k', 'search', 'shortcuts'],
  notes: ['Combobox-style: input keeps focus, arrows move the active option, Enter runs it, Escape closes.'],
} as const

const cmds = [
  { i: Plus, l: 'Create new job' }, { i: Users, l: 'Go to candidates' }, { i: FileText, l: 'Open offer templates' },
  { i: Settings, l: 'Workspace settings' }, { i: Users, l: 'Invite teammate' },
]

export default function CommandPalette({ device }: { device: Device }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const [ran, setRan] = useState('')
  const mobile = device === 'mobile'
  const list = cmds.filter(c => c.l.toLowerCase().includes(q.toLowerCase()))
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const el = root.current
      if (!el || !(el.matches(':hover') || el.contains(document.activeElement))) return
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(o => !o) }
    }
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h)
  }, [])
  const key = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false)
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, list.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(s - 1, 0)) }
    if (e.key === 'Enter' && list[sel]) { setRan(list[sel].l); setOpen(false) }
  }
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
      at(900, () => { setOpen(true); setQ(''); setSel(0) })
      at(1700, () => setSel(1))
      at(2400, () => setSel(2))
      at(3600, () => { setRan(cmds[2].l); setOpen(false) })
      at(5400, run)
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  return (
    <div ref={root} className="relative h-full overflow-hidden bg-bg">
      <div className="grid h-full place-items-center p-6 text-center">
        <div>
          <button onClick={() => { setOpen(true); setQ(''); setSel(0) }} className={`inline-flex items-center gap-3 rounded-xl border border-line bg-surface px-4 text-sm text-muted ${mobile ? 'h-12 w-full' : 'h-11 w-80'}`}>
            <Search size={16} />Search commands{!mobile && <kbd className="ml-auto rounded border border-line px-1.5 font-mono text-xs">Ctrl K</kbd>}
          </button>
          <p aria-live="polite" className="mt-4 text-sm text-muted">{ran ? `Ran: ${ran}` : 'Nothing run yet'}</p>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className={`absolute inset-0 z-10 bg-ink/40 ${mobile ? 'flex items-end' : 'flex items-start justify-center pt-16'}`}>
            <motion.div role="dialog" aria-label="Command palette" onClick={e => e.stopPropagation()} onKeyDown={key}
              initial={mobile ? { y: 300 } : { y: -10, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={mobile ? { y: 300 } : { opacity: 0 }}
              className={`overflow-hidden border border-line bg-surface shadow-2xl ${mobile ? 'w-full rounded-t-3xl pb-4' : 'w-full max-w-lg rounded-2xl'}`}>
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search size={16} className="text-muted" />
                <input autoFocus={!live.current} value={q} onChange={e => { setQ(e.target.value); setSel(0) }} placeholder="Type a command" aria-label="Command" className={`flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted ${mobile ? 'h-14' : 'h-12'}`} />
              </div>
              <ul role="listbox" className="max-h-72 overflow-auto p-2">
                {list.map(({ i: I, l }, k) => (
                  <li key={l} role="option" aria-selected={k === sel} onMouseEnter={() => setSel(k)} onClick={() => { setRan(l); setOpen(false) }}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 text-sm ${mobile ? 'h-12' : 'h-10'} ${k === sel ? 'bg-brand-soft text-brand' : 'text-ink'}`}>
                    <I size={16} />{l}{k === sel && !mobile && <CornerDownLeft size={14} className="ml-auto" />}
                  </li>
                ))}
                {!list.length && <li className="p-4 text-center text-sm text-muted">No matching commands</li>}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
