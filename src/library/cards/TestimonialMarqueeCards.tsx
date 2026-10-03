import { Star } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'testimonial-marquee-cards',
  title: 'Testimonial marquee',
  category: 'Cards',
  description: 'Two opposing rows of review cards scrolling endlessly. Pauses on hover and stops entirely for reduced motion.',
  source: ['Web: Magic UI marquee reviews', '33-clickwise'],
  tags: ['testimonial', 'marquee', 'social proof'],
  notes: ['Duplicate set is aria-hidden so screen readers read each review once.', 'Edges fade with a mask.'],
} as const

const reviews = [
  ['Ananya R.', 'Cut our reporting time from days to minutes.'],
  ['Marcus T.', 'The cleanest onboarding we have shipped to customers.'],
  ['Kavya M.', 'Support replied in four minutes. Four!'],
  ['Joel P.', 'Finally a dashboard my whole team opens daily.'],
  ['Leila H.', 'Migrated 40k records without a single hiccup.'],
]

function Row({ rev, dir, mobile }: { rev: boolean; dir: number; mobile: boolean }) {
  const set = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 gap-3 pr-3">
      {(rev ? [...reviews].reverse() : reviews).map(([n, q]) => (
        <figure key={n} className={`shrink-0 rounded-2xl border border-line bg-surface p-4 ${mobile ? 'w-60' : 'w-72'}`}>
          <div className="flex gap-0.5 text-spark">{[0, 1, 2, 3, 4].map((s) => <Star key={s} size={13} fill="currentColor" />)}</div>
          <blockquote className="mt-2 text-sm text-ink">{q}</blockquote>
          <figcaption className="mt-3 flex items-center gap-2 text-xs text-muted"><span className="h-6 w-6 rounded-full bg-gradient-to-br from-brand to-spark" />{n}</figcaption>
        </figure>
      ))}
    </div>
  )
  return (
    <div className="group flex overflow-hidden">
      <div className="flex motion-reduce:!animate-none group-hover:[animation-play-state:paused]" style={{ animation: `kc-marquee ${dir}s linear infinite${rev ? ' reverse' : ''}` }}>
        {set(false)}{set(true)}
      </div>
    </div>
  )
}

export default function TestimonialMarqueeCards({ device }: { device: Device }) {
  const mobile = device === 'mobile'
  return (
    <div className="flex h-full flex-col justify-center gap-3 overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <Row rev={false} dir={35} mobile={mobile} />
      <Row rev dir={42} mobile={mobile} />
    </div>
  )
}
