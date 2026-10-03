import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'toast-stack',
  title: 'Toast stack',
  category: 'Overlays',
  description: 'Stacked, auto-dismissing notifications. Bottom-right on laptop, full-width at the top on phones.',
  source: ['28-ecommerce', '33-clickwise'],
  tags: ['toast', 'notification', 'feedback'],
  notes: ['Container uses aria-live="polite".', 'Each toast has a labelled dismiss button.'],
} as const

const kinds = {
  ok: { Icon: CheckCircle2, c: 'text-ok', t: 'Saved to cart' },
  warn: { Icon: AlertTriangle, c: 'text-danger', t: 'Payment retry needed' },
  info: { Icon: Info, c: 'text-brand', t: 'New version available' },
} as const
type Kind = keyof typeof kinds

export default function ToastStack({ device }: { device: Device }) {
  const [items, setItems] = useState<{ id: number; k: Kind }[]>([])
  const mobile = device === 'mobile'
  const push = (k: Kind) => {
    const id = Date.now() + Math.random()
    setItems((x) => [...x.slice(-3), { id, k }])
    setTimeout(() => setItems((x) => x.filter((t) => t.id !== id)), 3500)
  }
  const stop = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const order: Kind[] = ['ok', 'info', 'warn']
    let n = 0
    let t: ReturnType<typeof setTimeout>
    const run = () => { if (stop.current) return; push(order[n++ % order.length]); t = setTimeout(run, 1800) }
    t = setTimeout(run, 900)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div onPointerDownCapture={() => { stop.current = true }} onKeyDownCapture={() => { stop.current = true }} className="relative grid h-full min-h-[380px] place-items-center overflow-hidden p-6">
      <div className={`flex gap-2 ${mobile ? 'w-full flex-col' : ''}`}>
        {(Object.keys(kinds) as Kind[]).map((k) => (
          <button key={k} onClick={() => push(k)} className="h-11 rounded-full border border-line bg-surface px-5 text-sm capitalize hover:border-brand">{k} toast</button>
        ))}
      </div>
      <div aria-live="polite" className={`pointer-events-none absolute flex gap-2 ${mobile ? 'inset-x-3 top-3 flex-col' : 'bottom-4 right-4 w-80 flex-col-reverse'}`}>
        <AnimatePresence>
          {items.map(({ id, k }) => { const { Icon, c, t } = kinds[k]; return (
            <motion.div key={id} layout initial={{ opacity: 0, y: mobile ? -20 : 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, x: mobile ? 0 : 40 }}
              className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-line bg-surface p-3 pr-2 shadow-xl">
              <Icon size={20} className={c} /><span className="flex-1 text-sm">{t}</span>
              <button aria-label="Dismiss" onClick={() => setItems((x) => x.filter((m) => m.id !== id))} className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-surface-2"><X size={14} /></button>
            </motion.div>) })}
        </AnimatePresence>
      </div>
    </div>
  )
}
