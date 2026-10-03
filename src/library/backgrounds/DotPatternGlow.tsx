import { useRef, useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'dot-pattern-glow',
  title: 'Dot pattern with cursor glow',
  category: 'Backgrounds',
  description: 'Dot matrix that brightens in a soft circle under the pointer. Touch and drag works on phones.',
  source: ['Web: Magic UI dot pattern', '20-Infrascope'],
  tags: ['dots', 'pointer', 'hero'],
  notes: ['Purely decorative; content remains readable without the effect.'],
} as const

export default function DotPatternGlow({ device }: { device: Device }) {
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState({ x: 160, y: 120 })
  const m = device === 'mobile'
  const move = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect()
    setP({ x: e.clientX - r.left, y: e.clientY - r.top })
  }
  const dots = 'radial-gradient(circle, var(--color-brand) 1.5px, transparent 1.6px)'
  const mask = `radial-gradient(160px circle at ${p.x}px ${p.y}px, #000, transparent)`
  return (
    <div ref={ref} onPointerMove={move} className="relative h-full w-full touch-none overflow-hidden bg-bg">
      <div aria-hidden className="absolute inset-0 opacity-25" style={{ backgroundImage: dots, backgroundSize: '22px 22px' }} />
      <div aria-hidden className="absolute inset-0" style={{ backgroundImage: dots, backgroundSize: '22px 22px', maskImage: mask, WebkitMaskImage: mask }} />
      <div className="pointer-events-none relative grid h-full place-items-center px-6 text-center">
        <h2 className={`font-display font-semibold text-ink ${m ? 'text-3xl' : 'text-5xl'}`}>Move to reveal<br /><span className="text-brand">the dots</span></h2>
      </div>
    </div>
  )
}
