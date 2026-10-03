import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2, Send } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'loading-button',
  title: 'Ripple loading button',
  category: 'Buttons',
  description: 'Submit button with click ripple, spinner and success states. Pins to the bottom as a sticky action bar on phones.',
  source: ['30-Talenzo', '21-Transform'],
  tags: ['submit', 'loading', 'ripple', 'state'],
  notes: ['Disabled while loading to prevent double submits.', 'Status text is announced via aria-live.'],
} as const

type S = 'idle' | 'loading' | 'done'

export default function LoadingButton({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, () => void][] = [[900, () => { setRip({ x: 90, y: 22, k: Date.now() }); setS('loading') }], [1500, () => setS('done')], [1800, () => setS('idle')]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const [s, setS] = useState<S>('idle')
  const [rip, setRip] = useState<{ x: number; y: number; k: number } | null>(null)
  const mobile = device === 'mobile'
  const go = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setRip({ x: e.clientX - r.left, y: e.clientY - r.top, k: Date.now() })
    setS('loading')
    setTimeout(() => setS('done'), 1500)
    setTimeout(() => setS('idle'), 3200)
  }
  const btn = (
    <button onClick={go} disabled={s === 'loading'} aria-live="polite"
      className={`relative inline-flex items-center justify-center gap-2 overflow-hidden bg-brand font-medium text-white transition disabled:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${s === 'done' ? '!bg-ok' : ''} ${mobile ? 'h-14 w-full rounded-xl text-base' : 'h-11 min-w-44 rounded-lg px-6 text-sm'}`}>
      <AnimatePresence>
        {rip && <motion.span key={rip.k} className="pointer-events-none absolute size-4 rounded-full bg-white/40" style={{ left: rip.x - 8, top: rip.y - 8 }} initial={{ scale: 0, opacity: 1 }} animate={{ scale: 30, opacity: 0 }} transition={{ duration: 0.7 }} />}
      </AnimatePresence>
      <span className="relative flex items-center gap-2">
        {s === 'idle' && <><Send size={16} /> Send invoice</>}
        {s === 'loading' && <><Loader2 size={16} style={{ animation: 'kc-spin 1s linear infinite' }} /> Sending...</>}
        {s === 'done' && <><Check size={16} /> Sent to Acme Ltd</>}
      </span>
    </button>
  )
  if (mobile) {
    return (
      <div className="relative h-full" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
        <p className="p-5 text-sm text-muted">Invoice #1042 for Acme Ltd, 12 line items, due in 14 days.</p>
        <div className="absolute inset-x-0 bottom-0 border-t border-line bg-surface p-4">{btn}</div>
      </div>
    )
  }
  return <div className="grid h-full place-items-center p-6" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>{btn}</div>
}
