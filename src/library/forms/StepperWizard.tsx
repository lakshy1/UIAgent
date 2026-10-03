import { useState, useEffect, useRef } from 'react'
import { Check } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'stepper-wizard',
  title: 'Stepper wizard',
  category: 'Forms',
  description: 'Three-step wizard with a connected progress rail, back/next controls and a finished state.',
  source: ['25-Nivaso', '21-Transform'],
  tags: ['wizard', 'steps', 'progress'],
  notes: ['Current step uses aria-current="step".', 'Buttons stack full width on phones.'],
} as const

const steps = [['Account', 'Create your workspace'], ['Team', 'Invite your colleagues'], ['Plan', 'Choose how to start']]
export default function StepperWizard({ device }: { device: Device }) {
  const [s, setS] = useState(0)
  const done = s === steps.length
  const mobile = device === 'mobile'
  const root = useRef<HTMLDivElement>(null)
  const live = useRef(true)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = root.current
    const ts: number[] = []
    
    const at = (ms: number, f: () => void) => { ts.push(window.setTimeout(() => { if (live.current) f() }, ms)) }
    const stop = () => { live.current = false; ts.forEach(t => clearTimeout(t));  }
    const evs = ['pointerdown', 'keydown', 'wheel', 'focusin']
    evs.forEach(t => el?.addEventListener(t, stop))
    const run = () => {
      at(1100, () => setS(1))
      at(2200, () => setS(2))
      at(3300, () => setS(3))
      at(4900, () => setS(0))
      at(5800, run)
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  return (
    <div ref={root} className="grid h-full w-full place-items-center p-4">
      <div className="w-full max-w-xl rounded-2xl border border-line bg-surface p-5">
        <ol className="flex items-center">
          {steps.map(([n], i) => (
            <li key={n} aria-current={i === s ? 'step' : undefined} className={`flex items-center ${i < steps.length - 1 ? 'flex-1' : ''}`}>
              <span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold transition ${i < s ? 'bg-ok text-white' : i === s ? 'bg-brand text-white' : 'bg-surface-2 text-muted'}`}>{i < s ? <Check size={14} /> : i + 1}</span>
              {!mobile && <span className={`ml-2 text-sm ${i === s ? 'text-ink' : 'text-muted'}`}>{n}</span>}
              {i < steps.length - 1 && <span className="mx-3 h-0.5 flex-1 rounded bg-surface-2"><span className="block h-full rounded bg-ok transition-all duration-500" style={{ width: i < s ? '100%' : 0 }} /></span>}
            </li>
          ))}
        </ol>
        <div className="py-8 text-center">
          <h3 className="font-display text-lg font-semibold text-ink">{done ? 'You are all set' : steps[s][0]}</h3>
          <p className="text-sm text-muted">{done ? 'Your workspace is ready.' : steps[s][1]}</p>
        </div>
        <div className={`flex gap-2 ${mobile ? 'flex-col-reverse' : 'justify-end'}`}>
          <button disabled={s === 0} onClick={() => setS(s - 1)} className={`rounded-full border border-line px-5 text-sm text-ink disabled:opacity-40 ${mobile ? 'h-12' : 'h-10'}`}>Back</button>
          <button onClick={() => setS(done ? 0 : s + 1)} className={`rounded-full bg-brand px-5 text-sm font-medium text-white ${mobile ? 'h-12' : 'h-10'}`}>{done ? 'Restart' : s === 2 ? 'Finish' : 'Continue'}</button>
        </div>
      </div>
    </div>
  )
}
