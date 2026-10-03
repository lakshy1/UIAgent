import { ArrowRight, BarChart3, Bell } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Device } from '../types'

export const meta = {
  id: 'hero-split-mockup',
  title: 'Hero: editorial split with device',
  category: 'Sections',
  description: 'Left-aligned headline with a floating product mockup. Laptop is a two-column split; mobile stacks copy above a phone-sized mockup with full-width CTAs.',
  source: ['33-clickwise'],
  tags: ['hero', 'mockup', 'landing'],
  notes: ['Float animation is disabled for reduced-motion users via motion-safe.'],
} as const

export default function HeroSplitMockup({ device }: { device: Device }) {
  const m = device === 'mobile'
  return (
    <section className={`relative h-full overflow-hidden bg-bg text-ink ${m ? 'px-5 py-8' : 'grid grid-cols-2 items-center gap-10 px-14 py-12'}`}>
      <div className="absolute -right-24 -top-24 size-80 rounded-full bg-brand/20 blur-3xl" aria-hidden />
      <div className="relative">
        <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">New: weekly revenue digest</span>
        <h1 className={`mt-4 font-display font-semibold leading-[1.05] tracking-tight ${m ? 'text-4xl' : 'text-6xl'}`}>
          Know what drives <span className="text-brand">every click</span>.
        </h1>
        <p className="mt-4 max-w-md text-muted">Attribution that connects ad spend to closed revenue, without a data team.</p>
        <div className={`mt-6 flex gap-3 ${m ? 'flex-col' : ''}`}>
          <a href="#" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">Start free <ArrowRight size={16} /></a>
          <a href="#" className="inline-flex h-12 items-center justify-center rounded-full border border-line px-6 text-sm hover:bg-surface">Watch demo</a>
        </div>
      </div>
      <motion.div aria-hidden className={`relative mt-8 rounded-2xl border border-line bg-surface p-4 shadow-2xl motion-safe:animate-[kc-float_5s_ease-in-out_infinite] ${m ? 'mx-auto w-64' : ''}`}>
        <div className="flex items-center justify-between text-xs text-muted"><span className="flex items-center gap-1"><BarChart3 size={14} /> Revenue</span><Bell size={14} /></div>
        <div className="mt-2 font-display text-3xl font-semibold">$48,210</div>
        <div className="mt-3 flex h-24 items-end gap-1.5">
          {[30, 45, 38, 60, 52, 78, 90].map((h, i) => <div key={i} className="flex-1 rounded-t bg-brand" style={{ height: `${h}%`, opacity: 0.4 + i * 0.09 }} />)}
        </div>
      </motion.div>
    </section>
  )
}
