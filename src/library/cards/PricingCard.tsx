import { Check, Sparkles } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'pricing-card',
  title: 'Pricing card',
  category: 'Cards',
  description: 'Single highlighted plan with feature list and badge. Laptop lays it out as a tall card; mobile uses a wide card with a sticky-style bottom CTA.',
  source: ['05-Kanthast', '30-Talenzo'],
  tags: ['pricing', 'plan'],
} as const

const feats = ['Unlimited projects', 'Advanced analytics', 'Priority support', 'Custom domains']

export default function PricingCard({ device }: { device: Device }) {
  const m = device === 'mobile'
  return (
    <div className="grid h-full place-items-center bg-bg p-5 text-ink">
      <article className={`relative w-full overflow-hidden rounded-3xl border border-brand bg-surface p-6 shadow-[0_20px_60px_-20px] shadow-brand/50 ${m ? '' : 'max-w-sm'}`}>
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand"><Sparkles size={12} /> Popular</span>
        <h3 className="font-display text-lg">Team</h3>
        <p className="mt-2 font-display text-5xl font-semibold">$39<span className="text-base font-normal text-muted"> /month</span></p>
        <ul className={`mt-5 gap-2 text-sm ${m ? 'grid grid-cols-1' : 'space-y-2'}`}>{feats.map((f) => <li key={f} className="flex gap-2"><Check size={16} className="text-ok" aria-hidden />{f}</li>)}</ul>
        <button className={`mt-6 w-full rounded-full bg-brand text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${m ? 'h-14' : 'h-12'}`}>Start 14-day trial</button>
      </article>
    </div>
  )
}
