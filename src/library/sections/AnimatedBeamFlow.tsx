import { Database, FileText, Mail, MessageSquare, Zap, Calendar, Cloud } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'animated-beam-flow',
  title: 'Animated beam flow',
  category: 'Sections',
  description: 'Six tools joined to a central hub by curved lines, with pulses of light running along them. Explains integrations or a data pipeline in one glance.',
  source: ['Web: Magic UI animated beam', '22-Kubeshift'],
  tags: ['integrations', 'beam', 'diagram', 'svg'],
  notes: ['Lines are SVG paths; the pulse is a short dash moved with stroke-dashoffset.', 'The diagram is decorative, so the list of tools is repeated as text for screen readers.'],
} as const

const left = [{ I: Mail, l: 'Email' }, { I: MessageSquare, l: 'Chat' }, { I: Calendar, l: 'Calendar' }]
const right = [{ I: Database, l: 'Database' }, { I: FileText, l: 'Docs' }, { I: Cloud, l: 'Storage' }]
const ys = [18, 50, 82]

export default function AnimatedBeamFlow({ device }: { device: Device }) {
  const m = device === 'mobile'
  const node = `grid place-items-center rounded-2xl border border-line bg-surface text-ink shadow-sm ${m ? 'size-11' : 'size-14'}`
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-bg px-6">
      <style>{`@keyframes kc-beam-run{from{stroke-dashoffset:130}to{stroke-dashoffset:-130}}
      .kc-beam-pulse{stroke-dasharray:22 240;animation:kc-beam-run 2.6s linear infinite}
      @media (prefers-reduced-motion:reduce){.kc-beam-pulse{display:none}}`}</style>
      <div className="text-center">
        <h2 className={`font-display font-bold text-ink ${m ? 'text-2xl' : 'text-3xl'}`}>Everything flows into one place</h2>
        <p className="mt-1 text-sm text-muted">Connect your tools once. Updates arrive in real time.</p>
      </div>
      <div className={`relative w-full ${m ? 'h-56 max-w-xs' : 'h-64 max-w-xl'}`}>
        <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {ys.map((y, i) => (
            <g key={y} fill="none" strokeWidth="0.6" vectorEffect="non-scaling-stroke">
              <path d={`M 9 ${y} C 30 ${y}, 30 50, 50 50`} stroke="var(--color-line)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <path d={`M 91 ${y} C 70 ${y}, 70 50, 50 50`} stroke="var(--color-line)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <path className="kc-beam-pulse" d={`M 9 ${y} C 30 ${y}, 30 50, 50 50`} pathLength="100" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ animationDelay: `${i * 0.5}s` }} />
              <path className="kc-beam-pulse" d={`M 50 50 C 70 50, 70 ${y}, 91 ${y}`} pathLength="100" stroke="var(--color-spark)" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ animationDelay: `${1.2 + i * 0.5}s` }} />
            </g>
          ))}
        </svg>
        {left.map(({ I, l }, i) => <span key={l} title={l} className={`${node} absolute left-0 -translate-y-1/2`} style={{ top: `${ys[i]}%` }}><I size={m ? 18 : 22} /></span>)}
        {right.map(({ I, l }, i) => <span key={l} title={l} className={`${node} absolute right-0 -translate-y-1/2`} style={{ top: `${ys[i]}%` }}><I size={m ? 18 : 22} /></span>)}
        <span className={`absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl bg-brand text-white shadow-[0_0_40px_-4px] shadow-brand ${m ? 'size-16' : 'size-20'}`}><Zap size={m ? 26 : 32} /></span>
      </div>
      <p className="sr-only">Connects Email, Chat and Calendar to Database, Docs and Storage through one hub.</p>
    </div>
  )
}
