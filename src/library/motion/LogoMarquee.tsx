import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'logo-marquee',
  title: 'Logo marquee',
  category: 'Motion',
  description: 'Endlessly scrolling trust strip with edge fade. Laptop runs one row; mobile stacks two rows moving in opposite directions at a smaller scale.',
  source: ['10-aconic-technologies', '33-clickwise'],
  tags: ['logos', 'social-proof', 'loop'],
  notes: ['Pause button satisfies WCAG 2.2.2.', 'Animation is removed under reduced motion.'],
} as const

const names = ['Northwind', 'Lumen', 'Ardent', 'Kestrel', 'Polaris', 'Vantage', 'Helix', 'Orbital']

function Row({ reverse, paused, small }: { reverse?: boolean; paused: boolean; small: boolean }) {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="km-row flex w-max" style={{ animation: `kc-marquee ${small ? 18 : 28}s linear infinite ${reverse ? 'reverse' : ''}`, animationPlayState: paused ? 'paused' : 'running' }}>
        {[...names, ...names].map((n, i) => (
          <span key={i} aria-hidden={i >= names.length} className={`mx-3 inline-flex items-center gap-2 rounded-full border border-line bg-surface font-display font-semibold text-muted ${small ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-lg'}`}>
            <span className="size-2 rounded-sm bg-brand" />{n}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function LogoMarquee({ device }: { device: Device }) {
  const [paused, setPaused] = useState(false)
  const mobile = device === 'mobile'
  return (
    <div className="flex h-full flex-col justify-center gap-6 py-6">
      <style>{`@media(prefers-reduced-motion:reduce){.km-row{animation:none!important}}`}</style>
      <p className="px-6 text-center text-xs font-medium uppercase tracking-widest text-muted">Trusted by 2,400+ teams</p>
      <div className="flex flex-col gap-3">
        <Row paused={paused} small={mobile} />
        {mobile && <Row paused={paused} small reverse />}
      </div>
      <button onClick={() => setPaused(!paused)} aria-label={paused ? 'Play logo animation' : 'Pause logo animation'} className="mx-auto flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-brand">
        {paused ? <Play size={12} /> : <Pause size={12} />}{paused ? 'Play' : 'Pause'}
      </button>
    </div>
  )
}
