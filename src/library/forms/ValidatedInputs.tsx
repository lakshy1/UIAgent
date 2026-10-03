import { useState, useEffect, useRef } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'validated-inputs',
  title: 'Validated input fields',
  category: 'Forms',
  description: 'Inputs with live inline validation, helper text and success/error states. Two-column grid on laptop, single column with tall fields on phones.',
  source: ['28-ecommerce', '19-ev-connect'],
  tags: ['input', 'validation', 'form'],
  notes: ['Errors are linked with aria-describedby and aria-invalid.', 'Validation runs after the first blur.'],
} as const

const rules = {
  name: (v: string) => (v.trim().length >= 2 ? '' : 'Enter your full name'),
  email: (v: string) => (/^\S+@\S+\.\S+$/.test(v) ? '' : 'Enter a valid email address'),
  phone: (v: string) => (/^[6-9]\d{9}$/.test(v) ? '' : 'Use a 10-digit Indian mobile number'),
  pin: (v: string) => (/^\d{6}$/.test(v) ? '' : 'PIN code has 6 digits'),
}
type K = keyof typeof rules
const labels: Record<K, string> = { name: 'Full name', email: 'Email', phone: 'Mobile', pin: 'PIN code' }

export default function ValidatedInputs({ device }: { device: Device }) {
  const [v, setV] = useState<Record<K, string>>({ name: '', email: '', phone: '', pin: '' })
  const [t, setT] = useState<Partial<Record<K, boolean>>>({})
  const mobile = device === 'mobile'
  const root = useRef<HTMLFormElement>(null)
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
      const val = (k: K, x: string) => setV(p => ({ ...p, [k]: x }))
      const touch = (k: K) => setT(p => ({ ...p, [k]: true }))
      at(900, () => { val('name', 'Aarav Mehta'); touch('name') })
      at(1700, () => { val('email', 'aarav@studio'); touch('email') })
      at(2500, () => val('email', 'aarav@studio.in'))
      at(3300, () => { val('phone', '12345'); touch('phone') })
      at(4100, () => val('phone', '9876543210'))
      at(4900, () => { val('pin', '4000'); touch('pin') })
      at(5700, () => val('pin', '400001'))
      at(7200, () => { setV({ name: '', email: '', phone: '', pin: '' }); setT({}) })
      at(8000, run)
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); setT({ name: true, email: true, phone: true, pin: true }) }} ref={root} className="mx-auto h-full min-h-[380px] max-w-2xl p-6">
      <div className={`grid gap-4 ${mobile ? '' : 'grid-cols-2'}`}>
        {(Object.keys(rules) as K[]).map((k) => {
          const err = t[k] ? rules[k](v[k]) : ''
          const ok = t[k] && !err
          return (
            <div key={k}>
              <label htmlFor={`vi-${k}`} className="text-sm font-medium">{labels[k]}</label>
              <div className="relative mt-1.5">
                <input id={`vi-${k}`} value={v[k]} inputMode={k === 'phone' || k === 'pin' ? 'numeric' : undefined} aria-invalid={!!err} aria-describedby={`vi-${k}-m`}
                  onChange={(e) => setV({ ...v, [k]: e.target.value })} onBlur={() => setT({ ...t, [k]: true })}
                  className={`w-full rounded-xl border bg-bg px-4 pr-11 text-sm outline-none transition focus:ring-4 ${mobile ? 'h-14' : 'h-11'} ${err ? 'border-danger focus:ring-danger/15' : ok ? 'border-ok focus:ring-ok/15' : 'border-line focus:border-brand focus:ring-brand/15'}`} />
                {err && <AlertCircle size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-danger" />}
                {ok && <CheckCircle2 size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ok" />}
              </div>
              <p id={`vi-${k}-m`} className={`mt-1 min-h-5 text-xs ${err ? 'text-danger' : 'text-muted'}`}>{err || (k === 'email' ? 'We only use this for receipts.' : '')}</p>
            </div>)
        })}
      </div>
      <button className={`rounded-xl bg-brand px-6 font-medium text-white ${mobile ? 'mt-2 h-14 w-full' : 'mt-2 h-11'}`}>Save address</button>
    </form>)
}
