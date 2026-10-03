import { useState } from 'react'
import { Mail, UserPlus, Check } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'profile-card',
  title: 'Team profile card',
  category: 'Cards',
  description: 'Person card with avatar, role, skills and a follow toggle. Centered column on laptop; horizontal compact row on mobile.',
  source: ['30-Talenzo', '10-aconic-technologies'],
  tags: ['profile', 'team', 'avatar'],
  notes: ['Follow button uses aria-pressed.'],
} as const

export default function ProfileCard({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [on, setOn] = useState(false)
  return (
    <div className="grid h-full place-items-center bg-bg p-5 text-ink">
      <article className={`w-full rounded-2xl border border-line bg-surface p-5 ${m ? 'flex items-center gap-4' : 'max-w-xs text-center'}`}>
        <div className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-spark font-display font-semibold text-white ${m ? 'size-16 text-xl' : 'mx-auto size-24 text-3xl'}`}>RK</div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-semibold">Riya Kapoor</h3>
          <p className="text-sm text-muted">Senior product designer</p>
          {!m && <div className="mt-3 flex flex-wrap justify-center gap-1.5">{['Figma', 'Systems', 'Research'].map((s) => <span key={s} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs">{s}</span>)}</div>}
          <div className={`mt-4 flex gap-2 ${m ? 'justify-start' : 'justify-center'}`}>
            <button aria-pressed={on} onClick={() => setOn(!on)} className={`inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-brand ${on ? 'border border-line' : 'bg-brand text-white'}`}>{on ? <Check size={14} /> : <UserPlus size={14} />}{on ? 'Following' : 'Follow'}</button>
            <button aria-label="Email Riya" className="grid size-11 place-items-center rounded-full border border-line"><Mail size={16} /></button>
          </div>
        </div>
      </article>
    </div>
  )
}
