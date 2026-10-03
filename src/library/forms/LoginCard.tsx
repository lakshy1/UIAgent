import { useState, useEffect, useRef } from 'react'
import { Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'login-card',
  title: 'Login card',
  category: 'Forms',
  description: 'Sign-in form with password reveal. Split brand panel plus card on laptop; edge-to-edge single column on phones.',
  source: ['30-Talenzo', '21-Transform'],
  tags: ['login', 'auth', 'form'],
  notes: ['Inputs are labelled with autocomplete hints.', 'Reveal button toggles aria-pressed.'],
} as const

export default function LoginCard({ device }: { device: Device }) {
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const mobile = device === 'mobile'
  const field = 'mt-1.5 h-12 w-full rounded-xl border border-line bg-bg px-4 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15'
  const form = (
    <form onSubmit={(e) => { e.preventDefault(); setBusy(true); setTimeout(() => setBusy(false), 1400) }} className="w-full max-w-sm">
      <h2 className="font-display text-3xl font-semibold">Welcome back</h2>
      <p className="mt-1 text-sm text-muted">Sign in to continue to your workspace.</p>
      <label className="mt-6 block text-sm font-medium">Work email<input type="email" autoComplete="email" placeholder="you@company.com" className={field} /></label>
      <label className="mt-4 block text-sm font-medium">Password
        <span className="relative block"><input type={show ? 'text' : 'password'} autoComplete="current-password" placeholder="At least 8 characters" className={`${field} pr-12`} />
          <button type="button" aria-label="Show password" aria-pressed={show} onClick={() => setShow(!show)} className="absolute right-1 top-2.5 grid h-10 w-10 place-items-center text-muted">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>
      <a href="#" onClick={(e) => e.preventDefault()} className="mt-3 inline-block text-sm text-brand">Forgot password?</a>
      <button disabled={busy} className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand font-medium text-white transition active:scale-[0.98] disabled:opacity-70">
        {busy ? <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white" style={{ animation: 'kc-spin .7s linear infinite' }} /> : <>Sign in <ArrowRight size={16} /></>}</button>
    </form>)
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
      at(900, () => setShow(true))
      at(2000, () => setShow(false))
      at(2600, () => setBusy(true))
      at(4000, () => setBusy(false))
      at(5200, run)
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  if (mobile) return <div ref={root} className="flex h-full min-h-[480px] flex-col justify-center bg-surface px-6 py-8">{form}</div>
  return (
    <div ref={root} className="grid h-full min-h-[480px] grid-cols-2 overflow-hidden">
      <div className="relative flex flex-col justify-between overflow-hidden bg-brand p-10 text-white">
        <div className="flex items-center gap-2 font-display text-lg font-semibold"><Sparkles size={20} />Orbit</div>
        <blockquote className="relative z-10 text-2xl font-medium leading-snug">"We cut onboarding from two weeks to two days."<footer className="mt-3 text-sm opacity-80">Priya, Head of Ops</footer></blockquote>
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-white/10" style={{ animation: 'kc-blob 12s ease-in-out infinite' }} />
      </div>
      <div className="grid place-items-center bg-surface p-10">{form}</div>
    </div>)
}
