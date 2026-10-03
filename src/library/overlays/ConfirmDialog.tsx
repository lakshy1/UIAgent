import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TriangleAlert, Trash2 } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'confirm-dialog',
  title: 'Confirm dialog',
  category: 'Overlays',
  description: 'Destructive-action confirmation that requires typing the resource name. Stacked full-width buttons on phones.',
  source: ['22-Kubeshift', '21-Transform'],
  tags: ['confirm', 'destructive', 'alertdialog'],
  notes: ['role="alertdialog"; confirm stays disabled until the name matches.'],
} as const

export default function ConfirmDialog({ device }: { device: Device }) {
  const [open, setOpen] = useState(false)
  const [v, setV] = useState('')
  const [done, setDone] = useState(false)
  const mobile = device === 'mobile'
  const close = () => { setOpen(false); setV('') }
  const stop = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let t: ReturnType<typeof setTimeout>, t0: ReturnType<typeof setTimeout>
    const run = (on: boolean) => {
      if (stop.current) return
      setOpen(on); if (!on) setV('')
      if (on) t0 = setTimeout(() => !stop.current && setV('prod-mumbai'), 1200)
      t = setTimeout(() => run(!on), on ? 3200 : 1200)
    }
    t = setTimeout(() => run(true), 900)
    return () => { clearTimeout(t); clearTimeout(t0) }
  }, [])
  return (
    <div onPointerDownCapture={() => { stop.current = true }} className="relative grid h-full min-h-[380px] place-items-center overflow-hidden p-6" onKeyDownCapture={() => { stop.current = true }} onKeyDown={(e) => e.key === 'Escape' && close()}>
      <button onClick={() => { setDone(false); setOpen(true) }} className="inline-flex h-12 items-center gap-2 rounded-full border border-danger/40 px-6 text-sm font-medium text-danger hover:bg-danger/10"><Trash2 size={16} />{done ? 'Cluster deleted' : 'Delete cluster'}</button>
      <AnimatePresence>
        {open && (
          <div className={`absolute inset-0 z-10 flex ${mobile ? 'items-end' : 'items-center justify-center'}`}>
            <motion.div className="absolute inset-0 bg-ink/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
            <motion.div role="alertdialog" aria-labelledby="cd-t" initial={{ opacity: 0, y: mobile ? 60 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: mobile ? 60 : 10 }}
              className={`relative border border-line bg-surface p-6 shadow-2xl ${mobile ? 'w-full rounded-t-3xl' : 'w-[400px] rounded-2xl'}`}>
              <div className="grid h-11 w-11 place-items-center rounded-full bg-danger/15 text-danger"><TriangleAlert size={22} /></div>
              <h3 id="cd-t" className="mt-4 font-display text-lg font-semibold">Delete prod-mumbai?</h3>
              <p className="mt-1 text-sm text-muted">This removes 14 workloads and cannot be undone. Type <b className="font-mono text-ink">prod-mumbai</b> to confirm.</p>
              <input aria-label="Type cluster name" ref={(el) => el?.focus()} value={v} onChange={(e) => setV(e.target.value)} className="mt-4 h-12 w-full rounded-xl border border-line bg-bg px-4 font-mono text-sm outline-none focus:border-danger" />
              <div className={`mt-5 flex gap-3 ${mobile ? 'flex-col-reverse' : 'justify-end'}`}>
                <button onClick={close} className="h-12 rounded-full border border-line px-5 text-sm">Keep it</button>
                <button disabled={v !== 'prod-mumbai'} onClick={() => { close(); setDone(true) }} className="h-12 rounded-full bg-danger px-5 text-sm font-medium text-white disabled:opacity-40">Delete forever</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
