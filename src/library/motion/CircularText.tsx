import { ArrowUpRight } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'circular-text',
  title: 'Circular text badge',
  category: 'Motion',
  description: 'A phrase set around a circle, turning slowly, with an arrow in the middle. The rotating stamp that agencies and portfolios use to invite a click.',
  source: ['Web: React Bits circular text', 'Web: Awwwards rotating badge trend'],
  tags: ['text', 'circle', 'badge', 'rotate'],
  notes: ['Text follows an SVG path, so it stays real, selectable text.', 'Speeds up on hover and stops turning for reduced motion.'],
} as const

export default function CircularText({ device }: { device: Device }) {
  const m = device === 'mobile'
  const size = m ? 200 : 260
  return (
    <div className="grid h-full w-full place-items-center bg-bg p-6">
      <style>{`.kc-ring{animation:kc-spin 14s linear infinite;transform-origin:center}
      .kc-ring-wrap:hover .kc-ring{animation-duration:5s}
      @media (prefers-reduced-motion:reduce){.kc-ring{animation:none}}`}</style>
      <a href="#" onClick={e => e.preventDefault()} aria-label="Start a project" className="kc-ring-wrap group relative grid place-items-center rounded-full" style={{ width: size, height: size }}>
        <svg viewBox="0 0 200 200" className="kc-ring absolute inset-0 h-full w-full" aria-hidden>
          <defs><path id="kc-ring-path" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" /></defs>
          <text className="fill-ink font-display font-bold uppercase" style={{ fontSize: 15.5, letterSpacing: '0.2em' }}>
            <textPath href="#kc-ring-path">Start a project • Say hello • Start a project • Say hello •</textPath>
          </text>
        </svg>
        <span className={`grid place-items-center rounded-full bg-brand text-white transition duration-300 group-hover:scale-110 group-hover:rotate-45 ${m ? 'size-20' : 'size-28'}`}>
          <ArrowUpRight size={m ? 32 : 44} />
        </span>
      </a>
    </div>
  )
}
