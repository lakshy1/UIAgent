import { useEffect, useRef, useState } from 'react'
import { ZoomIn } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'image-zoom',
  title: 'Image zoom',
  category: 'Media',
  description: 'Product-style image that magnifies under the pointer on desktop and toggles a 2x zoom on tap for phones.',
  source: ['Web: e-commerce PDP zoom', '28-ecommerce'],
  tags: ['zoom', 'product', 'hover'],
  notes: ['Tap/Enter toggles zoom for keyboard and touch users.', 'transform-origin follows the pointer.'],
} as const

export default function ImageZoom({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, () => void][] = [[900, () => { setO('68% 38%'); setZ(true) }], [2400, () => setZ(false)]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const [z, setZ] = useState(false)
  const [o, setO] = useState('50% 50%')
  const mobile = device === 'mobile'
  const track = (e: React.PointerEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setO(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`)
  }
  return (
    <div className="grid h-full place-items-center p-4" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <button aria-pressed={z} aria-label="Toggle image zoom" onClick={() => setZ(!z)}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setZ(true)} onPointerLeave={(e) => e.pointerType === 'mouse' && setZ(false)} onPointerMove={track}
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line outline-none focus-visible:ring-2 focus-visible:ring-brand ${mobile ? '' : 'max-w-xl cursor-zoom-in'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-rose-400 to-indigo-600 transition-transform duration-200 motion-reduce:transition-none"
          style={{ transform: z ? 'scale(2)' : 'scale(1)', transformOrigin: o }}>
          <div className="absolute left-[30%] top-[25%] h-[40%] w-[40%] rounded-full bg-white/40 ring-8 ring-white/30" />
          <div className="absolute bottom-[15%] right-[20%] h-8 w-24 rounded-full bg-black/25" />
        </div>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-3 py-1.5 text-xs text-ink"><ZoomIn size={13} />{z ? '2x' : mobile ? 'Tap to zoom' : 'Hover to zoom'}</span>
      </button>
    </div>
  )
}
