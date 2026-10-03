import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { Send } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'ripple-button',
  title: 'Ripple button',
  category: 'Buttons',
  description: 'A circle of light spreads from the exact point you press, then fades. The Material-style press feedback that makes a button feel physical, especially on touch screens.',
  source: ['Web: Material Design ripple', 'Web: Magic UI ripple button'],
  tags: ['ripple', 'press', 'feedback', 'touch'],
  notes: ['Each ripple is removed when its animation ends, so rapid presses do not pile up elements.', 'Keyboard presses ripple from the centre.'],
} as const

type Ripple = { id: number; x: number; y: number; size: number }

function Rippling({ className, children, tone }: { className: string; children: React.ReactNode; tone: string }) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const next = useRef(0)
  const ref = useRef<HTMLButtonElement>(null)
  const spawn = (cx?: number, cy?: number) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    // The preview frame is scaled with CSS, so work in the button's own pixels.
    const sx = el.offsetWidth / r.width, sy = el.offsetHeight / r.height
    const x = cx === undefined ? el.offsetWidth / 2 : (cx - r.left) * sx
    const y = cy === undefined ? el.offsetHeight / 2 : (cy - r.top) * sy
    setRipples(all => [...all, { id: next.current++, x, y, size: Math.max(el.offsetWidth, el.offsetHeight) * 2.2 }])
  }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => spawn(), 2400)
    return () => clearInterval(t)
  }, [])
  return (
    <button ref={ref} onPointerDown={(e: PointerEvent) => spawn(e.clientX, e.clientY)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') spawn() }}
      className={`relative overflow-hidden ${className}`}>
      {ripples.map(r => (
        <span key={r.id} aria-hidden onAnimationEnd={() => setRipples(all => all.filter(x => x.id !== r.id))}
          className="pointer-events-none absolute rounded-full" style={{ left: r.x - r.size / 2, top: r.y - r.size / 2, width: r.size, height: r.size, background: tone, animation: 'kc-ripple .7s ease-out forwards' }} />
      ))}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </button>
  )
}

export default function RippleButton({ device }: { device: Device }) {
  const m = device === 'mobile'
  const size = m ? 'h-14 w-full text-base' : 'h-12 px-7 text-sm'
  return (
    <div className={`grid h-full w-full place-items-center bg-bg p-6`}>
      <style>{`@keyframes kc-ripple{from{transform:scale(0);opacity:.45}to{transform:scale(1);opacity:0}}`}</style>
      <div className={`flex gap-4 ${m ? 'w-full flex-col' : ''}`}>
        <Rippling tone="#ffffff" className={`rounded-full bg-brand font-medium text-white ${size}`}><Send size={17} /> Send message</Rippling>
        <Rippling tone="var(--color-brand)" className={`rounded-full border border-line bg-surface font-medium text-ink ${size}`}>Save as draft</Rippling>
      </div>
    </div>
  )
}
