import { useEffect, useRef, useState } from 'react'
import { Mail, Check, Loader2 } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'newsletter-signup',
  title: 'Newsletter signup',
  category: 'Sections',
  description: 'Email capture with inline validation, loading and success states. Input and button sit inline on laptop and stack on phones.',
  source: ['Web: Origin UI pattern', '10-aconic-technologies'],
  tags: ['email', 'form', 'subscribe'],
  notes: ['Errors use role=alert.', 'Input has a visible label for screen readers.'],
} as const

export default function NewsletterSignup({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const addr = 'priya@kiln.io'
    const steps: [number, () => void][] = [...Array.from(addr, (_, n): [number, () => void] => [n ? 90 : 900, () => { setEmail(addr.slice(0, n + 1)); setSt('idle') }]),
      [600, () => setSt('busy')], [1000, () => setSt('done')], [2800, () => { setEmail(''); setSt('idle') }]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const [email, setEmail] = useState('')
  const [st, setSt] = useState<'idle' | 'busy' | 'done' | 'err'>('idle')
  const mobile = device === 'mobile'
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return setSt('err')
    setSt('busy'); setTimeout(() => setSt('done'), 1000)
  }
  return (
    <div className="grid h-full w-full place-items-center p-6" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <div className="w-full max-w-lg text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand"><Mail size={22} /></span>
        <h2 className="mt-4 font-display text-2xl text-ink">Get the weekly build log</h2>
        <p className="mt-1 text-sm text-muted">One short email every Friday. Unsubscribe anytime.</p>
        {st === 'done' ? (
          <p role="status" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-surface-2 px-4 py-3 text-sm text-ink"><Check size={18} className="text-ok" /> You are in. Check your inbox to confirm.</p>
        ) : (
          <form onSubmit={submit} noValidate className={`mt-6 flex gap-2 ${mobile ? 'flex-col' : ''}`}>
            <label className="sr-only" htmlFor="nl-email">Email address</label>
            <input id="nl-email" type="email" value={email} onChange={e => { setEmail(e.target.value); setSt('idle') }} placeholder="you@company.com" aria-invalid={st === 'err'}
              className={`h-12 flex-1 rounded-xl border bg-surface px-4 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 ${st === 'err' ? 'border-danger' : 'border-line'}`} />
            <button disabled={st === 'busy'} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-medium text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
              {st === 'busy' ? <Loader2 size={18} className="animate-spin" /> : 'Subscribe'}
            </button>
          </form>
        )}
        {st === 'err' && <p role="alert" className="mt-2 text-left text-xs text-danger">Enter a valid email address.</p>}
      </div>
    </div>
  )
}
