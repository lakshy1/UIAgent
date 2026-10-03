import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'modal-dialog',
  title: 'Modal dialog',
  category: 'Overlays',
  description: 'Centered dialog on laptop that becomes a full-width bottom sheet on phones. Closes on Escape or backdrop tap.',
  source: ['30-Talenzo', '20-Infrascope'],
  tags: ['modal', 'dialog', 'sheet'],
  notes: ['role="dialog" with aria-modal.', 'Escape key and backdrop click close it.'],
} as const

export default function ModalDialog({ device }: { device: Device }) {
  const [open, setOpen] = useState(false)
  const mobile = device === 'mobile'
  const stop = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let t: ReturnType<typeof setTimeout>
    const run = (on: boolean) => { if (stop.current) return; setOpen(on); t = setTimeout(() => run(!on), on ? 2500 : 1200) }
    t = setTimeout(() => run(true), 900)
    return () => clearTimeout(t)
  }, [])
  return (
    <div onPointerDownCapture={() => { stop.current = true }} onKeyDownCapture={() => { stop.current = true }} className="relative grid h-full min-h-[380px] place-items-center overflow-hidden p-6" onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
      <button onClick={() => setOpen(true)} className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">Invite teammate</button>
      <AnimatePresence>
        {open && (
          <div className={`absolute inset-0 z-10 flex ${mobile ? 'items-end' : 'items-center justify-center'}`}>
            <motion.div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.div role="dialog" aria-modal="true" aria-label="Invite teammate" tabIndex={-1} ref={(el) => el?.focus()}
              initial={mobile ? { y: '100%' } : { opacity: 0, scale: 0.94, y: 12 }} animate={mobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }} exit={mobile ? { y: '100%' } : { opacity: 0, scale: 0.94 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className={`relative border border-line bg-surface p-6 shadow-2xl outline-none ${mobile ? 'w-full rounded-t-3xl pb-8' : 'w-[420px] rounded-2xl'}`}>
              <button aria-label="Close" onClick={() => setOpen(false)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-surface-2"><X size={18} /></button>
              <h3 className="font-display text-xl font-semibold">Invite a teammate</h3>
              <p className="mt-1 text-sm text-muted">They get editor access to the Q3 workspace.</p>
              <input aria-label="Email" placeholder="name@company.com" className="mt-5 h-12 w-full rounded-xl border border-line bg-bg px-4 text-sm outline-none focus:border-brand" />
              <div className={`mt-5 flex gap-3 ${mobile ? 'flex-col-reverse' : 'justify-end'}`}>
                <button onClick={() => setOpen(false)} className={`rounded-full border border-line px-5 text-sm ${mobile ? 'h-12' : 'h-10'}`}>Cancel</button>
                <button onClick={() => setOpen(false)} className={`rounded-full bg-brand px-5 text-sm font-medium text-white ${mobile ? 'h-12' : 'h-10'}`}>Send invite</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
