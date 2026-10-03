import { useEffect, useRef, useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Device } from '../types'

export const meta = {
  id: 'copy-button',
  title: 'Copy to clipboard',
  category: 'Buttons',
  description: 'Icon button that copies a snippet and morphs into a check with a small confirmation tooltip.',
  source: ['Web: shadcn pattern', '22-Kubeshift'],
  tags: ['clipboard', 'code', 'feedback'],
  notes: ['Status announced via aria-live.', 'Fails silently if the clipboard API is blocked.'],
} as const

export default function CopyButton({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, () => void][] = [[900, () => setOk(true)], [1800, () => setOk(false)]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const [ok, setOk] = useState(false)
  const cmd = 'npm create vite@latest my-app'
  const copy = async () => {
    try { await navigator.clipboard.writeText(cmd) } catch { /* blocked */ }
    setOk(true); setTimeout(() => setOk(false), 1600)
  }
  const mobile = device === 'mobile'
  return (
    <div className="grid h-full w-full place-items-center p-6" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <div className="flex w-full max-w-md items-center gap-2 rounded-xl border border-line bg-surface-2 p-2 pl-4">
        <code className="min-w-0 flex-1 truncate font-mono text-sm text-ink">$ {cmd}</code>
        <button onClick={copy} aria-label="Copy command" className={`relative grid place-items-center rounded-lg bg-surface text-ink transition hover:text-brand active:scale-90 focus-visible:outline-2 focus-visible:outline-brand ${mobile ? 'h-12 w-12' : 'h-10 w-10'}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={ok ? 'y' : 'n'} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
              {ok ? <Check size={18} className="text-ok" /> : <Copy size={18} />}
            </motion.span>
          </AnimatePresence>
          {ok && <span className="absolute -top-8 rounded-md bg-ink px-2 py-1 text-xs text-bg">Copied</span>}
        </button>
        <span className="sr-only" aria-live="polite">{ok ? 'Copied to clipboard' : ''}</span>
      </div>
    </div>
  )
}
