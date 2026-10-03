import { useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'hero-spotlight',
  title: 'Hero: centered spotlight',
  category: 'Sections',
  description: 'Centered headline with a cursor-following spotlight glow and an email capture. Mobile drops the hover glow for a static one and stacks the form.',
  source: ['10-aconic-technologies', '05-Kanthast'],
  tags: ['hero', 'spotlight', 'email'],
  notes: ['Input has a visible label for screen readers.'],
} as const

export default function HeroSpotlight({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [pos, setPos] = useState({ x: 50, y: 30 })
  const [sent, setSent] = useState(false)
  return (
    <section
      onMouseMove={m ? undefined : (e) => { const r = e.currentTarget.getBoundingClientRect(); setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }) }}
      className={`relative grid h-full place-items-center overflow-hidden bg-bg text-center text-ink ${m ? 'px-5' : 'px-20'}`}
      style={{ backgroundImage: `radial-gradient(circle at ${pos.x}% ${pos.y}%, var(--color-brand-soft), transparent 45%)` }}
    >
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">Private beta</p>
        <h1 className={`mt-3 font-display font-semibold tracking-tight ${m ? 'text-4xl' : 'text-6xl'}`}>Ship the whole studio from one tab.</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">Briefs, reviews and handoff in a single calm workspace.</p>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className={`mx-auto mt-7 flex max-w-md gap-2 ${m ? 'flex-col' : ''}`}>
          <label className="sr-only" htmlFor="hs-email">Email</label>
          <input id="hs-email" type="email" required placeholder="you@studio.com" className="h-12 flex-1 rounded-full border border-line bg-surface px-5 text-sm outline-none focus:border-brand" />
          <button className="h-12 rounded-full bg-brand px-6 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">{sent ? 'You are on the list' : 'Get early access'}</button>
        </form>
      </div>
    </section>
  )
}
