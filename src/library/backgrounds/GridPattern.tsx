import type { Device } from '../types'

export const meta = {
  id: 'grid-pattern-fade',
  title: 'Grid pattern with fade',
  category: 'Backgrounds',
  description: 'Hairline grid that fades out toward the edges with a radial mask, a classic SaaS hero backdrop.',
  source: ['Web: Magic UI grid pattern', '33-clickwise'],
  tags: ['grid', 'hero', 'static'],
  notes: ['Static, so no motion concerns.', 'Uses the line token so it adapts to dark mode.'],
} as const

export default function GridPattern({ device }: { device: Device }) {
  const m = device === 'mobile'
  const size = m ? 28 : 40
  const mask = 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 100%)'
  return (
    <div className="relative h-full w-full overflow-hidden bg-bg">
      <div aria-hidden className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)',
        backgroundSize: `${size}px ${size}px`, maskImage: mask, WebkitMaskImage: mask }} />
      <div className="relative grid h-full place-items-center px-6 text-center">
        <div>
          <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">New: realtime sync</span>
          <h2 className={`mt-3 font-display font-semibold text-ink ${m ? 'text-3xl' : 'text-5xl'}`}>Built on a solid grid</h2>
        </div>
      </div>
    </div>
  )
}
