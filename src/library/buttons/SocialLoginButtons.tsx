import { useEffect, useRef, useState } from 'react'
import { Mail, Apple, Loader2, Code2, Globe } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'social-login-buttons',
  title: 'Social login buttons',
  category: 'Buttons',
  description: 'Provider sign-in buttons with a loading state: stacked full-width on phones, a compact grid on laptop.',
  source: ['30-Talenzo', '28-ecommerce'],
  tags: ['auth', 'oauth', 'login'],
  notes: ['Each button has an aria-label naming the provider.', 'aria-busy while signing in.'],
} as const

const providers = [
  { name: 'Google', Icon: Globe }, { name: 'GitHub', Icon: Code2 },
  { name: 'Apple', Icon: Apple }, { name: 'Email', Icon: Mail },
]

export default function SocialLoginButtons({ device }: { device: Device }) {
  const stop = useRef(false)
  const halt = () => { stop.current = true }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let k = 0
    const steps: [number, () => void][] = [[900, () => setBusy(providers[k++ % providers.length].name)], [1500, () => setBusy(null)]]
    let i = 0, t = 0
    const next = () => {
      if (stop.current) return
      const [ms, f] = steps[i % steps.length]
      t = window.setTimeout(() => { if (stop.current) return; f(); i++; next() }, ms)
    }
    next()
    return () => clearTimeout(t)
  }, [])
  const [busy, setBusy] = useState<string | null>(null)
  const mobile = device === 'mobile'
  const go = (n: string) => { setBusy(n); setTimeout(() => setBusy(null), 1500) }
  return (
    <div className="grid h-full w-full place-items-center p-6" onPointerDownCapture={halt} onKeyDownCapture={halt} onFocusCapture={halt}>
      <div className={`w-full ${mobile ? 'max-w-xs' : 'max-w-md'}`}>
        <p className="mb-4 text-center font-display text-lg text-ink">Continue to Acme</p>
        <div className={mobile ? 'space-y-3' : 'grid grid-cols-2 gap-3'}>
          {providers.map(({ name, Icon }) => (
            <button key={name} aria-label={`Continue with ${name}`} aria-busy={busy === name} disabled={!!busy} onClick={() => go(name)}
              className={`flex items-center justify-center gap-2 rounded-xl border border-line bg-surface text-sm font-medium text-ink transition hover:bg-surface-2 active:scale-[.98] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-brand ${mobile ? 'h-14 w-full' : 'h-11'}`}>
              {busy === name ? <Loader2 size={18} className="animate-spin" /> : <Icon size={18} />}
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
