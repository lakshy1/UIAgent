import { useState, useEffect, useRef } from 'react'
import { Check } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'toggle-controls',
  title: 'Switches, checkboxes and radios',
  category: 'Forms',
  description: 'Animated switch, checkbox and radio-card controls in a settings panel. Rows become full-width tap targets on phones.',
  source: ['04-broomin', '30-Talenzo'],
  tags: ['switch', 'checkbox', 'radio', 'settings'],
  notes: ['Native inputs are visually hidden, so keyboard, focus and screen readers behave natively.'],
} as const

const plans = [['Standard', '₹499 / visit'], ['Deep clean', '₹1,199 / visit'], ['Monthly', '₹3,499 / mo']]

export default function ToggleControls({ device }: { device: Device }) {
  const [sw, setSw] = useState({ push: true, sms: false, news: true })
  const [chk, setChk] = useState([true, false])
  const [plan, setPlan] = useState(1)
  const mobile = device === 'mobile'
  const row = `flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-3 hover:bg-surface-2 ${mobile ? 'min-h-14' : 'min-h-11'}`
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
      at(900, () => setSw(s => ({ ...s, sms: true })))
      at(1600, () => setPlan(0))
      at(2300, () => setChk([true, true]))
      at(3000, () => setSw(s => ({ ...s, push: false })))
      at(4200, () => { setSw({ push: true, sms: false, news: true }); setChk([true, false]); setPlan(1) })
      at(5200, run)
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  return (
    <div ref={root} className={`mx-auto grid h-full min-h-[380px] max-w-3xl gap-6 p-6 ${mobile ? '' : 'grid-cols-2'}`}>
      <section className="rounded-2xl border border-line bg-surface p-3">
        <h3 className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted">Notifications</h3>
        {(['push', 'sms', 'news'] as const).map((k) => (
          <label key={k} className={row}><span className="text-sm">{{ push: 'Push alerts', sms: 'SMS reminders', news: 'Weekly digest' }[k]}</span>
            <input type="checkbox" role="switch" className="peer sr-only" checked={sw[k]} onChange={() => setSw({ ...sw, [k]: !sw[k] })} />
            <span className="relative h-7 w-12 shrink-0 rounded-full bg-line transition peer-checked:bg-brand peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand"><span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${sw[k] ? 'left-[22px]' : 'left-0.5'}`} /></span></label>))}
        <h3 className="px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-wide text-muted">Preferences</h3>
        {['Same cleaner each time', 'Eco-friendly products'].map((t, i) => (
          <label key={t} className={row.replace('justify-between', 'justify-start')}>
            <input type="checkbox" className="peer sr-only" checked={chk[i]} onChange={() => setChk(chk.map((c, n) => (n === i ? !c : c)))} />
            <span className="grid h-5 w-5 place-items-center rounded-md border border-line text-white peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:outline-2 peer-focus-visible:outline-brand"><Check size={13} /></span><span className="text-sm">{t}</span></label>))}
      </section>
      <fieldset className="rounded-2xl border border-line bg-surface p-3">
        <legend className="px-3 text-xs font-medium uppercase tracking-wide text-muted">Plan</legend>
        <div className="space-y-2">{plans.map(([n, p], i) => (
          <label key={n} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition has-[:checked]:border-brand has-[:checked]:bg-brand-soft has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand ${mobile ? 'min-h-16' : ''} border-line`}>
            <input type="radio" name="plan" className="sr-only" checked={plan === i} onChange={() => setPlan(i)} />
            <span className={`grid h-5 w-5 place-items-center rounded-full border-2 ${plan === i ? 'border-brand' : 'border-line'}`}>{plan === i && <span className="h-2.5 w-2.5 rounded-full bg-brand" />}</span>
            <span className="flex-1 text-sm font-medium">{n}</span><span className="font-mono text-xs text-muted">{p}</span></label>))}</div>
      </fieldset>
    </div>)
}
