import { Sparkles } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'border-beam-card',
  title: 'Border beam card',
  category: 'Cards',
  description: 'A card with a streak of light travelling around its border, drawing the eye to one highlighted plan, feature or announcement.',
  source: ['Web: Magic UI border beam', 'Web: Aceternity moving border'],
  tags: ['border', 'beam', 'highlight', 'glow'],
  notes: ['The beam is a rotating conic gradient masked to the border, so it follows any corner radius.', 'Stops for reduced motion and leaves a static brand border.'],
} as const

export default function BorderBeamCard({ device }: { device: Device }) {
  const m = device === 'mobile'
  return (
    <div className="grid h-full w-full place-items-center bg-bg p-6">
      <style>{`@property --kc-beam{syntax:'<angle>';initial-value:0deg;inherits:false}
      @keyframes kc-beam-turn{to{--kc-beam:360deg}}
      .kc-beam{position:relative;border-radius:1.25rem}
      .kc-beam::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1.5px;
        background:conic-gradient(from var(--kc-beam),transparent 0 62%,var(--color-brand) 80%,var(--color-spark) 92%,transparent 100%);
        -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;
        animation:kc-beam-turn 4s linear infinite}
      @media (prefers-reduced-motion:reduce){.kc-beam::before{animation:none;background:var(--color-brand)}}`}</style>
      <article className={`kc-beam border border-line bg-surface shadow-xl ${m ? 'w-full p-6' : 'w-[420px] p-8'}`}>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand"><Sparkles size={13} /> Most popular</span>
        <h3 className="mt-4 font-display text-2xl font-bold text-ink">Team plan</h3>
        <p className="mt-1 text-sm text-muted">Everything in Starter, plus shared workspaces and audit history.</p>
        <p className="mt-5 font-display text-4xl font-extrabold text-ink">$24<span className="text-base font-medium text-muted"> / seat</span></p>
        <button className={`mt-6 rounded-full bg-brand font-medium text-white ${m ? 'h-12 w-full text-base' : 'h-11 px-6 text-sm'}`}>Start free trial</button>
      </article>
    </div>
  )
}
