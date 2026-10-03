import { useRef } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'spotlight-cursor',
  title: 'Cursor spotlight',
  category: 'Backgrounds',
  description: 'A soft brand-colored light follows the pointer across a surface. Writes CSS variables directly so React never re-renders.',
  source: ['Web: Aceternity spotlight', '05-Kanthast'],
  tags: ['spotlight', 'pointer', 'hero'],
  notes: ['Smooth because it avoids state updates.', 'On touch it follows the finger.'],
} as const

export default function SpotlightCursor({ device }: { device: Device }) {
  const ref = useRef<HTMLDivElement>(null)
  const m = device === 'mobile'
  return (
    <div ref={ref} className="relative h-full w-full touch-none overflow-hidden bg-surface"
      style={{ ['--x' as string]: '50%', ['--y' as string]: '40%' }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        ref.current!.style.setProperty('--x', `${e.clientX - r.left}px`)
        ref.current!.style.setProperty('--y', `${e.clientY - r.top}px`)
      }}>
      <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(320px circle at var(--x) var(--y), color-mix(in srgb, var(--color-brand) 35%, transparent), transparent 70%)' }} />
      <div className="pointer-events-none relative grid h-full place-items-center px-6 text-center">
        <div>
          <h2 className={`font-display font-semibold text-ink ${m ? 'text-3xl' : 'text-5xl'}`}>Follow the light</h2>
          <p className="mx-auto mt-2 max-w-xs text-sm text-muted">Hover anywhere on this panel.</p>
        </div>
      </div>
    </div>
  )
}
