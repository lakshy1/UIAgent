import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Trash2, Undo2 } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'snackbar-undo',
  title: 'Snackbar with undo',
  category: 'Overlays',
  description: 'Delete an item and get a snackbar with an Undo action and a draining timer bar before it commits.',
  source: ['Web: Sonner toast pattern', '28-ecommerce'],
  tags: ['snackbar', 'undo', 'toast'],
  notes: ['role="status" announces the message.', 'Timer bar is decorative.'],
} as const

export default function SnackbarUndo({ device }: { device: Device }) {
  const [items, setItems] = useState(['Q3 roadmap.pdf', 'Brand assets.zip', 'Invoice 0192.pdf'])
  const [gone, setGone] = useState<{ n: string; i: number } | null>(null)
  useEffect(() => { if (!gone) return; const t = setTimeout(() => setGone(null), 4000); return () => clearTimeout(t) }, [gone])
  const del = (n: string, i: number) => { setItems(items.filter((x) => x !== n)); setGone({ n, i }) }
  const undo = () => { if (!gone) return; const c = [...items]; c.splice(gone.i, 0, gone.n); setItems(c); setGone(null) }
  const stop = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const all = ['Q3 roadmap.pdf', 'Brand assets.zip', 'Invoice 0192.pdf']
    let t: ReturnType<typeof setTimeout>
    const run = () => {
      if (stop.current) return
      setItems(all.filter((x) => x !== all[1])); setGone({ n: all[1], i: 1 })
      t = setTimeout(() => { if (stop.current) return; setItems(all); t = setTimeout(run, 1000) }, 5200)
    }
    t = setTimeout(run, 900)
    return () => clearTimeout(t)
  }, [])
  return (
    <div onPointerDownCapture={() => { stop.current = true }} onKeyDownCapture={() => { stop.current = true }} className="relative h-full w-full overflow-hidden p-4">
      <ul className="mx-auto max-w-md space-y-2">
        {items.map((n, i) => <li key={n} className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink">{n}<button aria-label={`Delete ${n}`} onClick={() => del(n, i)} className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-danger"><Trash2 size={16} /></button></li>)}
        {!items.length && <li className="py-8 text-center text-sm text-muted">Nothing here.</li>}
      </ul>
      <AnimatePresence>
        {gone && (
          <motion.div key={gone.n} role="status" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} className={`absolute overflow-hidden rounded-xl bg-ink text-bg shadow-xl ${device === 'mobile' ? 'inset-x-3 bottom-3' : 'bottom-4 left-1/2 w-96 -translate-x-1/2'}`}>
            <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm"><span className="truncate">Deleted {gone.n}</span><button onClick={undo} className={`inline-flex items-center gap-1 font-semibold text-spark ${device === 'mobile' ? 'h-9' : ''}`}><Undo2 size={14} />Undo</button></div>
            <span className="block h-0.5 origin-left bg-spark motion-reduce:hidden" style={{ animation: 'kcsn 4s linear forwards' }} />
            <style>{'@keyframes kcsn{to{transform:scaleX(0)}}'}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
