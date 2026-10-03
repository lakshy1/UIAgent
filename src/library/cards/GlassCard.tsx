import { ArrowUpRight, Cloud } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'glass-card',
  title: 'Glass card',
  category: 'Cards',
  description: 'Frosted glassmorphism card over a colourful blurred backdrop, with a hairline highlight border.',
  source: ['Web: glassmorphism 2025 trend', '24-omnipane'],
  tags: ['glass', 'blur', 'weather'],
  notes: ['Backdrop blur needs something behind it to show off.', 'Text uses ink token on a tinted surface for contrast in both themes.'],
} as const

export default function GlassCard({ device }: { device: Device }) {
  return (
    <div className="relative grid h-full place-items-center overflow-hidden p-4">
      <div aria-hidden className="absolute -left-10 top-4 h-48 w-48 rounded-full bg-fuchsia-500/70 blur-3xl motion-reduce:![animation:none]" style={{ animation: 'kc-float 6s ease-in-out infinite' }} />
      <div aria-hidden className="absolute -right-8 bottom-2 h-56 w-56 rounded-full bg-sky-500/70 blur-3xl motion-reduce:![animation:none]" style={{ animation: 'kc-float 8s ease-in-out -2s infinite' }} />
      <div aria-hidden className="absolute left-1/3 top-1/2 h-32 w-32 rounded-full bg-amber-400/60 blur-3xl motion-reduce:![animation:none]" style={{ animation: 'kc-float 5s ease-in-out -1s infinite' }} />
      <article className={`relative w-full rounded-3xl border border-white/30 bg-surface/50 p-6 shadow-[0_8px_40px_rgba(0,0,0,.15)] backdrop-blur-xl ${device === 'mobile' ? 'max-w-sm' : 'max-w-md'}`}>
        <div className="flex items-center justify-between text-ink">
          <div><p className="text-sm text-muted">Mumbai, Today</p><p className="font-display text-5xl font-semibold">29°</p></div>
          <Cloud size={56} strokeWidth={1.4} />
        </div>
        <p className="mt-3 text-sm text-ink">Humid with light showers after 6 PM. Carry an umbrella for the evening commute.</p>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
          {[['Wind', '14 km/h'], ['Humidity', '78%'], ['UV', 'Moderate']].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-white/25 py-2 text-ink"><p className="text-muted">{k}</p><p className="font-medium">{v}</p></div>
          ))}
        </div>
        <button className="mt-4 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-ink text-sm font-medium text-bg">Weekly forecast <ArrowUpRight size={15} /></button>
      </article>
    </div>
  )
}
