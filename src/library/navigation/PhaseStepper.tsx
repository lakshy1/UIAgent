import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'phase-stepper',
  title: 'Phase stepper',
  category: 'Navigation',
  description: 'Wizard progress bar with done, current and upcoming states and next/back actions. Horizontal on laptop, a compact progress bar with current step title on phones.',
  source: ['22-Kubeshift', '21-Transform'],
  tags: ['stepper', 'wizard', 'progress'],
  notes: ['Current step has aria-current=step; mobile bar exposes progressbar values.'],
} as const

const steps = ['Assess', 'Analyse', 'Plan', 'Migrate', 'Validate']

export default function PhaseStepper({ device }: { device: Device }) {
  const [cur, setCur] = useState(1)
  const mobile = device === 'mobile'
  return (
    <div className="flex h-full flex-col justify-between bg-bg p-5 md:p-10">
      {mobile ? (
        <div>
          <div className="flex items-baseline justify-between"><span className="font-display text-lg text-ink">{steps[cur]}</span><span className="text-xs text-muted">Step {cur + 1} of {steps.length}</span></div>
          <div role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={cur + 1} className="mt-3 flex gap-1.5">
            {steps.map((s, k) => <span key={s} className={`h-1.5 flex-1 rounded-full ${k <= cur ? 'bg-brand' : 'bg-line'}`} />)}
          </div>
        </div>
      ) : (
        <ol className="flex items-center">
          {steps.map((s, k) => (
            <li key={s} className="flex flex-1 items-center last:flex-none" aria-current={k === cur ? 'step' : undefined}>
              <button onClick={() => k <= cur && setCur(k)} className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-full">
                <span className={`grid h-8 w-8 place-items-center rounded-full border text-xs font-semibold ${k < cur ? 'border-brand bg-brand text-white' : k === cur ? 'border-brand bg-brand-soft text-brand' : 'border-line text-muted'}`}>{k < cur ? <Check size={14} /> : k + 1}</span>
                <span className={`text-sm ${k === cur ? 'font-medium text-ink' : 'text-muted'}`}>{s}</span>
              </button>
              {k < steps.length - 1 && <span className="mx-3 h-0.5 flex-1 overflow-hidden rounded bg-line"><motion.span className="block h-full bg-brand" animate={{ width: k < cur ? '100%' : '0%' }} /></span>}
            </li>
          ))}
        </ol>
      )}
      <div className="my-6 flex-1 rounded-2xl border border-dashed border-line p-5 text-sm text-muted">
        <h3 className="font-display text-lg text-ink">{steps[cur]} phase</h3>Review inputs for this stage before continuing.
      </div>
      <div className={`flex gap-3 ${mobile ? '' : 'justify-end'}`}>
        <button disabled={cur === 0} onClick={() => setCur(c => c - 1)} className={`rounded-xl border border-line text-sm text-ink disabled:opacity-40 ${mobile ? 'h-12 flex-1' : 'h-10 px-5'}`}>Back</button>
        <button disabled={cur === steps.length - 1} onClick={() => setCur(c => c + 1)} className={`rounded-xl bg-brand text-sm font-medium text-white disabled:opacity-40 ${mobile ? 'h-12 flex-1' : 'h-10 px-5'}`}>Continue</button>
      </div>
    </div>
  )
}
