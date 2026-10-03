import { ArrowRight } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'cta-banner',
  title: 'CTA banner',
  category: 'Sections',
  description: 'Closing call-to-action with a drifting gradient blob. Inline row on laptop; stacked with a full-width button on mobile.',
  source: ['04-broomin', '03-fomodoro'],
  tags: ['cta', 'banner'],
} as const

export default function CtaBanner({ device }: { device: Device }) {
  const m = device === 'mobile'
  return (
    <section className="grid h-full place-items-center bg-bg p-4 text-ink">
      <div className={`relative w-full overflow-hidden rounded-3xl border border-line bg-surface ${m ? 'p-6' : 'flex items-center justify-between gap-8 px-12 py-14'}`}>
        <div aria-hidden className="absolute -right-10 -top-16 size-64 rounded-full bg-brand/30 blur-3xl motion-safe:animate-[kc-blob_8s_ease-in-out_infinite]" />
        <div className="relative">
          <h2 className={`font-display font-semibold tracking-tight ${m ? 'text-3xl' : 'text-4xl'}`}>Ready to clear your backlog?</h2>
          <p className="mt-2 text-muted">Free for 14 days. No card required.</p>
        </div>
        <a href="#" className={`relative inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${m ? 'mt-5 w-full' : ''}`}>Get started <ArrowRight size={16} /></a>
      </div>
    </section>
  )
}
