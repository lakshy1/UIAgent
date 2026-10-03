import { CheckCircle2, Circle, Loader } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Device } from '../types'

export const meta = {
  id: 'vertical-roadmap',
  title: 'Vertical roadmap timeline',
  category: 'Sections',
  description: 'Product roadmap on a vertical rail with done, in-progress and planned states. Alternates sides on laptop, single column on phones.',
  source: ['Web: Magic UI pattern', '25-Nivaso'],
  tags: ['timeline', 'roadmap', 'milestones'],
  notes: ['Status is conveyed by icon and text, not colour alone.'],
} as const

const items = [
  { q: 'Q1', t: 'Public beta', d: 'Open signups and onboarding checklist.', s: 'done' },
  { q: 'Q2', t: 'Team workspaces', d: 'Roles, invites and shared dashboards.', s: 'done' },
  { q: 'Q3', t: 'Offline mode', d: 'Work anywhere and sync when back online.', s: 'now' },
  { q: 'Q4', t: 'Public API', d: 'Webhooks and a documented REST API.', s: 'next' },
] as const

export default function VerticalRoadmap({ device }: { device: Device }) {
  const mobile = device === 'mobile'
  return (
    <div className="h-full w-full overflow-y-auto p-6">
      <ol className="relative mx-auto max-w-2xl">
        <span aria-hidden className={`absolute bottom-2 top-2 w-px bg-line ${mobile ? 'left-4' : 'left-1/2'}`} />
        {items.map((it, i) => {
          const right = !mobile && i % 2 === 1
          const Icon = it.s === 'done' ? CheckCircle2 : it.s === 'now' ? Loader : Circle
          return (
            <motion.li key={it.t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className={`relative pb-8 ${mobile ? 'pl-12' : `w-1/2 ${right ? 'ml-auto pl-10' : 'pr-10 text-right'}`}`}>
              <span className={`absolute top-0 grid h-8 w-8 place-items-center rounded-full bg-bg ${mobile ? 'left-0' : right ? '-left-4' : '-right-4'} ${it.s === 'done' ? 'text-ok' : it.s === 'now' ? 'text-brand' : 'text-muted'}`}>
                <Icon size={22} />
              </span>
              <p className="font-mono text-xs text-muted">{it.q} · {it.s === 'done' ? 'Shipped' : it.s === 'now' ? 'In progress' : 'Planned'}</p>
              <h3 className="font-display text-lg text-ink">{it.t}</h3>
              <p className="text-sm text-muted">{it.d}</p>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}
