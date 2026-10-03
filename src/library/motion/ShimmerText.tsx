import type { Device } from '../types'

export const meta = {
  id: 'shimmer-text',
  title: 'Gradient shimmer text',
  category: 'Motion',
  description: 'Headline with a light band sweeping across clipped text, plus an animated gradient accent word.',
  source: ['Web: Magic UI animated shiny text', '05-Kanthast'],
  tags: ['text', 'shimmer', 'gradient'],
  notes: ['Color falls back to ink when background-clip is unsupported.', 'Sweep is disabled for reduced motion.'],
} as const

export default function ShimmerText({ device }: { device: Device }) {
  const m = device === 'mobile'
  return (
    <div className="grid h-full w-full place-items-center bg-bg px-6 text-center">
      <style>{`@keyframes kc-sheen{to{background-position:-200% 0}}
      @media (prefers-reduced-motion:reduce){.kc-sheen{animation:none!important}}`}</style>
      <div>
        <span className="kc-sheen inline-block rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-transparent"
          style={{ backgroundImage: 'linear-gradient(110deg, var(--color-muted) 40%, var(--color-ink) 50%, var(--color-muted) 60%)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'kc-sheen 2.6s linear infinite' }}>
          Introducing v2.0
        </span>
        <h2 className={`mt-4 font-display font-bold text-ink ${m ? 'text-4xl' : 'text-6xl'}`}>
          Design that feels{' '}
          <span className="kc-sheen text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, var(--color-brand), var(--color-spark), var(--color-brand))', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'kc-sheen 4s linear infinite' }}>alive</span>
        </h2>
      </div>
    </div>
  )
}
