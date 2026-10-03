import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'pill-cta',
  title: 'Pill CTA with sweep',
  category: 'Buttons',
  description: 'Pill call to action with a light sweep on hover and a secondary ghost action. Stacks full-width on phones.',
  source: ['10-aconic-technologies', '33-clickwise'],
  tags: ['cta', 'hero', 'pair'],
  notes: ['Sweep is disabled under reduced motion.', 'Both actions are real buttons with visible focus rings.'],
} as const

export default function PillCta({ device }: { device: Device }) {
  const [hot, setHot] = useState(false)
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, () => void][] = [[900, () => setHot(true)], [1400, () => setHot(false)]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const mobile = device === 'mobile'
  return (
    <div className="grid h-full place-items-center p-6" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <style>{`.pc-sweep::after{content:'';position:absolute;inset:0;background:linear-gradient(110deg,transparent 35%,rgb(255 255 255/.35) 50%,transparent 65%);transform:translateX(-120%);transition:transform .7s}
.pc-sweep:hover::after,.pc-sweep.pc-on::after{transform:translateX(120%)}@media(prefers-reduced-motion:reduce){.pc-sweep::after{display:none}}`}</style>
      <div className={mobile ? 'flex w-full flex-col gap-3' : 'flex items-center gap-3'}>
        <button className={`pc-sweep ${hot ? 'pc-on' : ''} relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-ink font-medium text-bg transition active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${mobile ? 'h-14 text-base' : 'h-12 px-7 text-sm'}`}>
          Start free trial <ArrowUpRight size={18} />
        </button>
        <button className={`inline-flex items-center justify-center rounded-full border border-line bg-surface font-medium text-ink transition hover:bg-surface-2 active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${mobile ? 'h-14 text-base' : 'h-12 px-7 text-sm'}`}>
          Talk to sales
        </button>
      </div>
    </div>
  )
}
