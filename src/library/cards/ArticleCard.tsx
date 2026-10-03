import { ArrowUpRight, Clock } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'article-card',
  title: 'Article card',
  category: 'Cards',
  description: 'Blog teaser with cover, tag, read time and byline. Cover on top on laptop; small thumbnail on the right on mobile for scannable lists.',
  source: ['10-aconic-technologies', '04-broomin'],
  tags: ['blog', 'article', 'content'],
} as const

export default function ArticleCard({ device }: { device: Device }) {
  const m = device === 'mobile'
  return (
    <div className="grid h-full place-items-center bg-bg p-5 text-ink">
      <a href="#" className={`group w-full rounded-2xl border border-line bg-surface transition hover:border-brand focus-visible:outline-2 focus-visible:outline-brand ${m ? 'flex flex-row-reverse items-start gap-3 p-4' : 'max-w-sm overflow-hidden'}`}>
        <div aria-hidden className={`bg-gradient-to-br from-brand to-spark ${m ? 'size-20 shrink-0 rounded-xl' : 'h-44'}`} />
        <div className={m ? 'flex-1' : 'p-5'}>
          <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand">Engineering</span>
          <h3 className={`mt-2 font-display font-semibold leading-snug ${m ? 'text-base' : 'text-xl'}`}>How we cut cold starts by 70 percent</h3>
          {!m && <p className="mt-2 text-sm text-muted">A walk through the profiling work that changed how we ship.</p>}
          <div className="mt-3 flex items-center justify-between text-xs text-muted"><span className="flex items-center gap-1"><Clock size={12} /> 6 min - Dev Patel</span>
            {!m && <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}</div>
        </div>
      </a>
    </div>
  )
}
