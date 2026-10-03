import { Zap, Shield, LineChart, Globe, Layers } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'feature-bento',
  title: 'Feature bento grid',
  category: 'Sections',
  description: 'Asymmetric bento grid of feature tiles with a hero tile. Laptop is a 4-column bento; mobile is a single column with compact tiles.',
  source: ['22-Kubeshift', '24-Omnipane'],
  tags: ['features', 'grid', 'bento'],
} as const

const items = [
  { i: Zap, t: 'Instant deploys', d: 'Push to main and watch it live in seconds.', c: 'col-span-2 row-span-2' },
  { i: Shield, t: 'Secure by default', d: 'SSO and audit logs built in.', c: '' },
  { i: LineChart, t: 'Live analytics', d: 'Real-time usage per team.', c: '' },
  { i: Globe, t: 'Global edge', d: 'Served from 40 regions.', c: 'col-span-2' },
  { i: Layers, t: 'Composable', d: 'Mix modules as you grow.', c: '' },
]

export default function FeatureBento({ device }: { device: Device }) {
  const m = device === 'mobile'
  return (
    <section className={`h-full bg-bg text-ink ${m ? 'p-5' : 'px-12 py-10'}`}>
      <h2 className={`font-display font-semibold tracking-tight ${m ? 'text-2xl' : 'text-4xl'}`}>Everything in one platform</h2>
      <div className={`mt-6 grid gap-3 ${m ? 'grid-cols-1' : 'auto-rows-[130px] grid-cols-4'}`}>
        {items.map(({ i: Icon, t, d, c }, n) => (
          <article key={t} className={`rounded-2xl border border-line p-5 transition hover:border-brand ${n === 0 ? 'bg-brand-soft' : 'bg-surface'} ${m ? '' : c}`}>
            <Icon className="text-brand" size={m ? 20 : 24} aria-hidden />
            <h3 className="mt-3 font-display font-medium">{t}</h3>
            <p className="mt-1 text-sm text-muted">{d}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
