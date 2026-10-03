import { useEffect, useState } from 'react'
import type { Device } from '../types'

export const meta = {
  id: 'shimmer-skeleton',
  title: 'Shimmer skeleton',
  category: 'Motion',
  description: 'Loading placeholder that swaps to real content. Laptop mimics a 3-card grid; mobile mimics a single-column feed with avatar rows.',
  source: ['28-ecommerce', '19-ev-connect'],
  tags: ['loading', 'skeleton', 'placeholder'],
  notes: ['Container has aria-busy while loading.', 'Shimmer is static under reduced motion.'],
} as const

const items = [
  { t: 'Koramangala Hub', s: '6 chargers free', p: '12 min away' },
  { t: 'Indiranagar Plaza', s: '2 chargers free', p: '18 min away' },
  { t: 'Whitefield Mall', s: '9 chargers free', p: '31 min away' },
]

const Bar = ({ c }: { c: string }) => (
  <div className={`kp-sh rounded-md ${c}`} style={{ background: 'linear-gradient(90deg, var(--surface-2) 30%, var(--line) 50%, var(--surface-2) 70%) 0 0/200% 100%', animation: 'kc-shimmer 1.5s linear infinite' }} />
)

export default function ShimmerSkeleton({ device }: { device: Device }) {
  const [loading, setLoading] = useState(true)
  const mobile = device === 'mobile'
  useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 2600)
    return () => clearTimeout(t)
  }, [loading])
  return (
    <div className="flex h-full flex-col gap-4 p-5" aria-busy={loading}>
      <style>{`@media(prefers-reduced-motion:reduce){.kp-sh{animation:none!important}}`}</style>
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-ink">Nearby stations</h3>
        <button onClick={() => setLoading(true)} className="rounded-full border border-line px-3 py-1 text-xs text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-brand">Reload</button>
      </div>
      <div className={mobile ? 'flex flex-col gap-3' : 'grid grid-cols-3 gap-4'}>
        {items.map((it) => (
          <div key={it.t} className={`rounded-xl border border-line bg-surface p-4 ${mobile ? 'flex items-center gap-3' : 'flex flex-col gap-3'}`}>
            {loading ? (
              mobile ? (<><Bar c="size-12 shrink-0 !rounded-full" /><div className="flex flex-1 flex-col gap-2"><Bar c="h-3 w-2/3" /><Bar c="h-3 w-1/3" /></div></>)
                : (<><Bar c="h-24 w-full" /><Bar c="h-4 w-3/4" /><Bar c="h-3 w-1/2" /></>)
            ) : (
              <>
                <div className={`grid place-items-center rounded-lg bg-brand-soft font-display text-brand ${mobile ? 'size-12 shrink-0 !rounded-full' : 'h-24 w-full text-3xl'}`}>{it.s.split(' ')[0]}</div>
                <div><p className="font-medium text-ink">{it.t}</p><p className="text-sm text-muted">{it.s} · {it.p}</p></div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
