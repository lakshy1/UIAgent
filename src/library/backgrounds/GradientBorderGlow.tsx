import type { Device } from '../types'

export const meta = {
  id: 'gradient-border-glow',
  title: 'Gradient border glow',
  category: 'Backgrounds',
  description: 'A card whose border is a rotating conic gradient with a blurred copy behind it for a neon halo.',
  source: ['Web: Magic UI shine border', '33-clickwise'],
  tags: ['border', 'glow', 'card'],
  notes: ['Rotation stops for reduced motion.', 'Uses @property, supported in current evergreen browsers.'],
} as const

export default function GradientBorderGlow({ device }: { device: Device }) {
  const m = device === 'mobile'
  const ring = { background: 'conic-gradient(from var(--a), transparent 0 60%, var(--color-brand), var(--color-spark), transparent)', animation: 'kc-ang 4s linear infinite' }
  return (
    <div className="grid h-full w-full place-items-center bg-bg p-6">
      <style>{`@property --a{syntax:'<angle>';inherits:false;initial-value:0deg}
      @keyframes kc-ang{to{--a:360deg}}
      @media (prefers-reduced-motion:reduce){.kc-ring{animation:none!important}}`}</style>
      <div className={`relative ${m ? 'w-full' : 'w-80'}`}>
        <div aria-hidden className="kc-ring absolute -inset-0.5 rounded-2xl opacity-70 blur-lg" style={ring} />
        <div aria-hidden className="kc-ring absolute -inset-px rounded-2xl" style={ring} />
        <div className="relative rounded-2xl bg-surface p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">Pro plan</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-ink">Glow with focus</h2>
          <p className="mt-2 text-sm text-muted">Highlight the one card that matters most.</p>
        </div>
      </div>
    </div>
  )
}
