import { motion } from 'framer-motion'
import { GitCommit, Rocket, MessageSquare, ShieldCheck } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'activity-timeline',
  title: 'Activity timeline',
  category: 'Data',
  description: 'Vertical event feed with icon nodes. Alternates sides on laptop; single left-aligned rail on phones.',
  source: ['21-Transform', '22-Kubeshift'],
  tags: ['timeline', 'feed', 'activity'],
  notes: ['Rendered as an ordered list; time is in a <time> element.'],
} as const

const ev = [
  [GitCommit, 'Plan approved', 'Wave 2 cutover window locked for Sat 02:00.', '10:42'],
  [ShieldCheck, 'Security review passed', 'No critical findings across 38 workloads.', '09:15'],
  [MessageSquare, 'Comment from Meera', 'Can we move the DB freeze earlier?', 'Yesterday'],
  [Rocket, 'Wave 1 completed', '112 servers migrated with zero rollbacks.', 'Mon'],
] as const

export default function ActivityTimeline({ device }: { device: Device }) {
  const mobile = device === 'mobile'
  return (
    <div className="h-full min-h-[380px] p-6">
      <ol className={`relative mx-auto max-w-2xl ${mobile ? 'pl-12' : ''}`}>
        <span className={`absolute bottom-2 top-2 w-px bg-line ${mobile ? 'left-5' : 'left-1/2'}`} />
        {ev.map(([Icon, t, d, time], i) => (
          <motion.li key={t} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className={`relative pb-7 ${!mobile && i % 2 ? 'pl-[calc(50%+2rem)]' : !mobile ? 'pr-[calc(50%+2rem)] text-right' : ''}`}>
            <span className={`absolute top-0 grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-brand ${mobile ? '-left-12' : 'left-1/2 -translate-x-1/2'}`}><Icon size={17} /></span>
            <time className="font-mono text-xs text-muted">{time}</time>
            <h4 className="font-medium">{t}</h4><p className="text-sm text-muted">{d}</p>
          </motion.li>))}
      </ol>
    </div>
  )
}
