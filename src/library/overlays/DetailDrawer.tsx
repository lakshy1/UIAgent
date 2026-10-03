import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Server, Activity } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'detail-drawer',
  title: 'Detail drawer',
  category: 'Overlays',
  description: 'Right-hand side drawer for row details on laptop; a near-full-screen slide-up panel on phones.',
  source: ['20-Infrascope'],
  tags: ['drawer', 'detail', 'panel'],
  notes: ['Close button is focusable and labelled.', 'Rows are real buttons.'],
} as const

const rows = [
  { n: 'api-gateway', s: 'Healthy', cpu: 34 }, { n: 'billing-worker', s: 'Degraded', cpu: 81 },
  { n: 'search-index', s: 'Healthy', cpu: 52 }, { n: 'media-encoder', s: 'Healthy', cpu: 27 },
]

export default function DetailDrawer({ device }: { device: Device }) {
  const [sel, setSel] = useState<number | null>(null)
  const mobile = device === 'mobile'
  const r = sel === null ? null : rows[sel]
  const stop = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let t: ReturnType<typeof setTimeout>
    const run = (on: boolean) => { if (stop.current) return; setSel(on ? 1 : null); t = setTimeout(() => run(!on), on ? 2800 : 1200) }
    t = setTimeout(() => run(true), 900)
    return () => clearTimeout(t)
  }, [])
  return (
    <div onPointerDownCapture={() => { stop.current = true }} onKeyDownCapture={() => { stop.current = true }} className="relative h-full min-h-[380px] overflow-hidden p-4">
      <ul className="space-y-2">
        {rows.map((x, i) => (
          <li key={x.n}><button onClick={() => setSel(i)} className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-left hover:border-brand focus-visible:outline-2 focus-visible:outline-brand">
            <Server size={18} className="text-muted" /><span className="flex-1 font-mono text-sm">{x.n}</span>
            <span className={`text-xs ${x.s === 'Healthy' ? 'text-ok' : 'text-danger'}`}>{x.s}</span></button></li>
        ))}
      </ul>
      <AnimatePresence>
        {r && (
          <>
            <motion.div key="bd" className="absolute inset-0 bg-ink/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)} />
            <motion.aside key="dr" role="dialog" aria-label={`${r.n} details`} initial={mobile ? { y: '100%' } : { x: '100%' }} animate={{ x: 0, y: 0 }} exit={mobile ? { y: '100%' } : { x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`absolute bg-surface p-5 shadow-2xl ${mobile ? 'inset-x-0 bottom-0 top-10 rounded-t-3xl border-t border-line' : 'inset-y-0 right-0 w-[360px] border-l border-line'}`}>
              <div className="flex items-center justify-between"><h3 className="font-mono text-base font-semibold">{r.n}</h3>
                <button aria-label="Close drawer" onClick={() => setSel(null)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-surface-2"><X size={18} /></button></div>
              <p className={`mt-1 text-sm ${r.s === 'Healthy' ? 'text-ok' : 'text-danger'}`}>{r.s}</p>
              <div className="mt-5 rounded-xl bg-surface-2 p-4"><div className="flex items-center gap-2 text-xs text-muted"><Activity size={14} /> CPU load</div>
                <div className="mt-2 h-2 rounded-full bg-line"><div className="h-full rounded-full bg-brand" style={{ width: `${r.cpu}%` }} /></div>
                <div className="mt-1 text-right font-mono text-sm">{r.cpu}%</div></div>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><dt className="text-muted">Region</dt><dd>ap-south-1</dd><dt className="text-muted">Replicas</dt><dd>3 / 3</dd><dt className="text-muted">Last deploy</dt><dd>2h ago</dd></dl>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
