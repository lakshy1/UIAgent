import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ArrowLeft, ArrowRight } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'multi-step-form',
  title: 'Multi-step form',
  category: 'Forms',
  description: 'Three-step booking wizard with animated transitions. Vertical stepper sidebar on laptop; progress bar and sticky bottom actions on phones.',
  source: ['18-queue-care', '25-Nivaso'],
  tags: ['wizard', 'stepper', 'booking'],
  notes: ['Current step uses aria-current="step".', 'Next is disabled until the step is complete.'],
} as const

const steps = ['Service', 'Slot', 'Confirm']
const services = ['General checkup', 'Dental cleaning', 'Eye exam']
const slots = ['10:00', '11:30', '14:00', '16:30']

export default function MultiStepForm({ device }: { device: Device }) {
  const [s, setS] = useState(0)
  const [svc, setSvc] = useState('')
  const [slot, setSlot] = useState('')
  const mobile = device === 'mobile'
  const ok = [!!svc, !!slot, true][s]
  const chip = (on: boolean) => `rounded-xl border px-4 text-left text-sm transition ${mobile ? 'h-14' : 'h-11'} ${on ? 'border-brand bg-brand-soft font-medium text-brand' : 'border-line bg-surface hover:border-brand'}`
  const body = (
    <AnimatePresence mode="wait">
      <motion.div key={s} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2 }}>
        {s === 0 && <><h3 className="font-display text-xl font-semibold">Choose a service</h3><div className="mt-4 grid gap-2">{services.map((x) => <button key={x} aria-pressed={svc === x} onClick={() => setSvc(x)} className={chip(svc === x)}>{x}</button>)}</div></>}
        {s === 1 && <><h3 className="font-display text-xl font-semibold">Pick a time</h3><div className="mt-4 grid grid-cols-2 gap-2">{slots.map((x) => <button key={x} aria-pressed={slot === x} onClick={() => setSlot(x)} className={`${chip(slot === x)} font-mono`}>{x}</button>)}</div></>}
        {s === 2 && <><h3 className="font-display text-xl font-semibold">All set?</h3><dl className="mt-4 space-y-2 rounded-2xl bg-surface-2 p-4 text-sm"><div className="flex justify-between"><dt className="text-muted">Service</dt><dd>{svc}</dd></div><div className="flex justify-between"><dt className="text-muted">Time</dt><dd className="font-mono">Tomorrow, {slot}</dd></div></dl></>}
      </motion.div>
    </AnimatePresence>)
  const nav = (
    <div className={`flex gap-3 ${mobile ? 'border-t border-line bg-surface p-4' : 'mt-8'}`}>
      <button disabled={s === 0} aria-label="Back" onClick={() => setS(s - 1)} className={`grid place-items-center rounded-xl border border-line disabled:opacity-30 ${mobile ? 'h-14 w-14' : 'h-11 w-11'}`}><ArrowLeft size={18} /></button>
      <button disabled={!ok || s === 2} onClick={() => setS(s + 1)} className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand font-medium text-white disabled:opacity-40 ${mobile ? 'h-14' : 'h-11 max-w-48'}`}>{s === 2 ? 'Booked' : 'Continue'}{s < 2 && <ArrowRight size={16} />}</button>
    </div>)
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
      at(900, () => setSvc('Dental cleaning'))
      at(1600, () => setS(1))
      at(2300, () => setSlot('11:30'))
      at(3000, () => setS(2))
      at(4800, () => { setS(0); setSvc(''); setSlot('') })
      at(5800, run)
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  if (mobile) return (
    <div ref={root} className="flex h-full min-h-[480px] flex-col">
      <div className="p-5 pb-0"><div className="mb-2 flex justify-between text-xs text-muted"><span>Step {s + 1} of 3</span><span>{steps[s]}</span></div><div className="h-1.5 rounded-full bg-line"><div className="h-full rounded-full bg-brand transition-all" style={{ width: `${((s + 1) / 3) * 100}%` }} /></div></div>
      <div className="flex-1 p-5">{body}</div>{nav}</div>)
  return (
    <div ref={root} className="mx-auto grid h-full min-h-[380px] max-w-3xl grid-cols-[200px_1fr] gap-10 p-8">
      <ol className="space-y-4">{steps.map((t, i) => (
        <li key={t} aria-current={i === s ? 'step' : undefined} className="flex items-center gap-3 text-sm">
          <span className={`grid h-8 w-8 place-items-center rounded-full border text-xs font-semibold ${i < s ? 'border-brand bg-brand text-white' : i === s ? 'border-brand text-brand' : 'border-line text-muted'}`}>{i < s ? <Check size={14} /> : i + 1}</span>
          <span className={i === s ? 'font-medium' : 'text-muted'}>{t}</span></li>))}</ol>
      <div>{body}{nav}</div>
    </div>)
}
