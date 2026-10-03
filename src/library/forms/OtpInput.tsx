import { useRef, useState, useEffect } from 'react'
import { ShieldCheck } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'otp-input',
  title: 'OTP input',
  category: 'Forms',
  description: 'Six-box one-time-code input with auto-advance, backspace and paste support. Larger boxes and numeric keypad on phones.',
  source: ['19-ev-connect', '18-queue-care'],
  tags: ['otp', 'verification', 'auth'],
  notes: ['inputMode numeric and autocomplete="one-time-code" enable SMS autofill.', 'Each box has its own aria-label.'],
} as const

export default function OtpInput({ device }: { device: Device }) {
  const [d, setD] = useState<string[]>(Array(6).fill(''))
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const mobile = device === 'mobile'
  const full = d.every(Boolean)
  const set = (i: number, val: string) => {
    const c = val.replace(/\D/g, '')
    if (c.length > 1) { const n = [...d]; c.slice(0, 6 - i).split('').forEach((x, k) => (n[i + k] = x)); setD(n); refs.current[Math.min(i + c.length, 5)]?.focus(); return }
    const n = [...d]; n[i] = c; setD(n)
    if (c && i < 5) refs.current[i + 1]?.focus()
  }
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
      const code = '482915'
      code.split('').forEach((c, i) => at(900 + i * 330, () => setD(p => p.map((x, j) => (j === i ? c : x)))))
      at(5200, () => setD(Array(6).fill('')))
      at(6200, run)
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  return (
    <div ref={root} className="grid h-full min-h-[380px] place-items-center p-6">
      <div className={`text-center ${mobile ? 'w-full' : 'w-[460px] rounded-3xl border border-line bg-surface p-10'}`}>
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand"><ShieldCheck size={26} /></div>
        <h2 className="mt-4 font-display text-2xl font-semibold">Verify your number</h2>
        <p className="mt-1 text-sm text-muted">Enter the 6-digit code sent to +91 98••• ••210</p>
        <div className={`mt-6 flex justify-center ${mobile ? 'gap-2' : 'gap-3'}`}>
          {d.map((x, i) => (
            <input key={i} ref={(el) => { refs.current[i] = el }} value={x} inputMode="numeric" autoComplete={i === 0 ? 'one-time-code' : 'off'} aria-label={`Digit ${i + 1}`}
              onChange={(e) => set(i, e.target.value)} onKeyDown={(e) => e.key === 'Backspace' && !d[i] && i > 0 && refs.current[i - 1]?.focus()} onFocus={(e) => e.target.select()}
              className={`rounded-xl border bg-bg text-center font-mono font-semibold outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15 ${mobile ? 'h-14 w-11 text-xl' : 'h-16 w-13 text-2xl'} ${x ? 'border-brand' : 'border-line'}`} style={{ width: mobile ? undefined : '3.25rem' }} />))}
        </div>
        <button disabled={!full} className={`mt-6 rounded-xl bg-brand font-medium text-white transition disabled:opacity-40 ${mobile ? 'h-14 w-full' : 'h-12 w-full'}`}>Verify</button>
        <p className="mt-4 text-sm text-muted">Didn't get it? <button className="font-medium text-brand">Resend in 0:24</button></p>
      </div>
    </div>)
}
