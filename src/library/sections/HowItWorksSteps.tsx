import { UserPlus, Plug, Rocket } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'how-it-works-steps',
  title: 'How it works steps',
  category: 'Sections',
  description: 'Three numbered steps joined by a connector line: a horizontal row on laptop, a vertical list on phones.',
  source: ['Web: landing page pattern', '28-ecommerce'],
  tags: ['steps', 'onboarding', 'process'],
  notes: ['Rendered as an ordered list for screen readers.'],
} as const

const steps = [
  { I: UserPlus, t: 'Create your account', d: 'Sign up in under a minute, no card required.' },
  { I: Plug, t: 'Connect your tools', d: 'Link your calendar, inbox and billing with one click each.' },
  { I: Rocket, t: 'Go live', d: 'Publish your workspace and invite the team.' },
]

export default function HowItWorksSteps({ device }: { device: Device }) {
  const mobile = device === 'mobile'
  return (
    <div className="grid h-full w-full place-items-center overflow-y-auto p-6">
      <div className="w-full max-w-4xl">
        <h2 className="mb-8 text-center font-display text-2xl text-ink">How it works</h2>
        <ol className={`relative ${mobile ? 'space-y-6' : 'grid grid-cols-3 gap-6'}`}>
          {!mobile && <span aria-hidden className="absolute left-[16%] right-[16%] top-7 border-t-2 border-dashed border-line" />}
          {steps.map(({ I, t, d }, i) => (
            <li key={t} className={`relative ${mobile ? 'flex gap-4' : 'text-center'}`}>
              <span className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30 ${mobile ? '' : 'mx-auto'}`}>
                <I size={24} />
                <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-line bg-surface font-mono text-xs text-ink">{i + 1}</span>
              </span>
              <div className={mobile ? '' : 'mt-4'}>
                <h3 className="font-display text-lg text-ink">{t}</h3>
                <p className="mt-1 text-sm text-muted">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
