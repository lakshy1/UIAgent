import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bold, Italic, Link2, Code } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'tooltip-set',
  title: 'Tooltip toolbar',
  category: 'Overlays',
  description: 'Hover and focus tooltips on a toolbar. On touch, tapping a tool shows its label in a caption instead.',
  source: ['25-Nivaso', '20-Infrascope'],
  tags: ['tooltip', 'toolbar', 'hint'],
  notes: ['Shown on focus as well as hover.', 'Buttons keep aria-label so touch users and screen readers get the name.'],
} as const

const tools = [[Bold, 'Bold', 'Ctrl B'], [Italic, 'Italic', 'Ctrl I'], [Link2, 'Insert link', 'Ctrl K'], [Code, 'Code block', 'Ctrl E']] as const

export default function TooltipSet({ device }: { device: Device }) {
  const [tip, setTip] = useState<number | null>(null)
  const mobile = device === 'mobile'
  const stop = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let i = 0
    let t: ReturnType<typeof setTimeout>
    const run = () => { if (stop.current) return; setTip(i++ % tools.length); t = setTimeout(run, 1600) }
    t = setTimeout(run, 900)
    return () => clearTimeout(t)
  }, [])
  return (
    <div onPointerDownCapture={() => { stop.current = true }} onKeyDownCapture={() => { stop.current = true }} className="grid h-full min-h-[380px] place-items-center p-6">
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-1 rounded-2xl border border-line bg-surface p-1.5">
          {tools.map(([Icon, l, k], i) => (
            <div key={l} className="relative" onMouseEnter={() => !mobile && setTip(i)} onMouseLeave={() => setTip(null)}>
              <button aria-label={l} onFocus={() => !mobile && setTip(i)} onBlur={() => setTip(null)} onClick={() => mobile && setTip(i)}
                className={`grid place-items-center rounded-xl hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-brand ${mobile ? 'h-12 w-12' : 'h-10 w-10'}`}><Icon size={18} /></button>
              <AnimatePresence>
                {tip === i && !mobile && (
                  <motion.div role="tooltip" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="pointer-events-none absolute -top-11 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-xs text-bg">
                    {l}<kbd className="font-mono opacity-60">{k}</kbd></motion.div>)}
              </AnimatePresence>
            </div>
          ))}
        </div>
        {mobile && <p aria-live="polite" className="h-6 text-sm text-muted">{tip === null ? 'Tap a tool' : tools[tip][1]}</p>}
      </div>
    </div>
  )
}
