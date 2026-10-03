import type { Device } from '../types'

export const meta = {
  id: 'meteors',
  title: 'Meteor shower',
  category: 'Backgrounds',
  description: 'Diagonal streaks fall across the card at staggered speeds, great behind a feature card or CTA.',
  source: ['Web: Magic UI meteors', '10-aconic-technologies'],
  tags: ['meteors', 'ambient', 'cta'],
  notes: ['Hidden when reduced motion is requested.'],
} as const

const rows = Array.from({ length: 14 }, (_, i) => ({ left: (i * 73) % 100, delay: (i * 0.7) % 5, dur: 2.5 + ((i * 37) % 30) / 10 }))

export default function Meteors({ device }: { device: Device }) {
  const m = device === 'mobile'
  return (
    <div className="relative h-full w-full overflow-hidden bg-surface">
      <style>{`@keyframes kc-meteor{0%{transform:translate(0,-60px) rotate(215deg);opacity:1}70%{opacity:1}100%{transform:translate(-420px,420px) rotate(215deg);opacity:0}}
      @media (prefers-reduced-motion:reduce){.kc-met{display:none}}`}</style>
      {rows.slice(0, m ? 9 : 14).map((r, i) => (
        <span key={i} aria-hidden className="kc-met absolute top-0 h-0.5 w-0.5 rounded-full bg-brand"
          style={{ left: `${r.left + 20}%`, animation: `kc-meteor ${r.dur}s linear ${r.delay}s infinite` }}>
          <span className="absolute top-1/2 h-px w-16 -translate-y-1/2 bg-gradient-to-r from-brand to-transparent" />
        </span>
      ))}
      <div className="relative grid h-full place-items-center px-6 text-center">
        <div className="rounded-2xl border border-line bg-bg/70 px-6 py-5 backdrop-blur">
          <h2 className="font-display text-xl font-semibold text-ink">Launch window open</h2>
          <p className="mt-1 text-sm text-muted">Join the early access list.</p>
        </div>
      </div>
    </div>
  )
}
