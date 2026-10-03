import { useEffect, useState } from 'react'
import { ArrowRight, Gauge, GitBranch, Bell, Menu, Search } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'modern-saas',
  title: 'Modern SaaS',
  family: 'Modern',
  era: 'Popular since 2019 (Linear, Vercel, Stripe, Resend)',
  idea: 'Developer analytics product site',
  description: 'Clean sans-serif type on near-white surfaces, hairline borders and soft layered shadows, organized into a bento grid. Restrained color and no gradients let the product do the talking.',
  traits: ['1px hairline borders', 'Soft, multi-layer shadows', 'Bento grid of mixed-size cards', 'Tight tracking on headings', 'One restrained accent', 'Small pill badges'],
  palette: [
    { name: 'Canvas', hex: '#fafafa' },
    { name: 'Card', hex: '#ffffff' },
    { name: 'Border', hex: '#e8e8ea' },
    { name: 'Ink', hex: '#0f1115' },
    { name: 'Muted', hex: '#6b7280' },
    { name: 'Accent', hex: '#2f6bff' },
  ],
  fonts: 'Inter',
  useFor: ['Developer tools and APIs', 'B2B SaaS marketing', 'Docs and changelog sites'],
  avoid: ['Brands needing strong personality', 'Entertainment or youth products', 'Image-led portfolios'],
  signature: `background: #fff;
border: 1px solid #e8e8ea;
border-radius: 14px;
box-shadow:
  0 1px 2px rgb(15 17 21 / .04),
  0 8px 24px -8px rgb(15 17 21 / .08);
letter-spacing: -0.03em;
font-family: Inter, sans-serif;`,
} as const satisfies StyleMeta

const I = "'Inter', sans-serif"
const card = 'rounded-[14px] border border-[#e8e8ea] bg-white shadow-[0_1px_2px_rgb(15_17_21/.04),0_8px_24px_-8px_rgb(15_17_21/.08)]'

export default function ModernSaas({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [range, setRange] = useState(1)
  const [auto, setAuto] = useState(true)
  const ranges = ['24h', '7d', '30d']
  const data = [[18, 30, 22, 40, 34, 52, 46, 60], [40, 52, 38, 66, 58, 72, 64, 80], [30, 44, 60, 52, 70, 66, 84, 92]]
  const totals = ['1.2M', '8.9M', '37.4M']

  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setRange((r) => (r + 1) % 3), 2800)
    return () => clearInterval(t)
  }, [auto])

  const btnP = 'inline-flex items-center gap-1.5 rounded-lg bg-[#0f1115] px-4 py-2.5 text-sm font-medium text-white shadow-[0_1px_2px_rgb(0_0_0/.2)] transition hover:bg-[#2a2d34] active:scale-[.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6bff]'

  return (
    <div onPointerDown={() => setAuto(false)} onKeyDown={() => setAuto(false)} className="relative h-full w-full overflow-auto text-[#0f1115]" style={{ background: '#fafafa', fontFamily: I, letterSpacing: '-0.01em' }}>
      <style>{`@keyframes ms-grow{from{transform:scaleY(.2)}}@keyframes ms-ping{75%,100%{transform:scale(2.4);opacity:0}}@media (prefers-reduced-motion:reduce){.ms-a{animation:none!important;transition:none!important}}`}</style>
      <nav className={`flex items-center justify-between border-b border-[#e8e8ea] bg-white/80 ${m ? 'px-4 py-3' : 'px-10 py-3.5'}`}>
        <span className="flex items-center gap-2 text-[15px] font-semibold"><span className="h-5 w-5 rounded-md bg-[#0f1115]" /> Tally</span>
        {m ? <button aria-label="Menu" className="rounded-lg border border-[#e8e8ea] p-2"><Menu size={16} /></button> : (
          <div className="flex items-center gap-7 text-sm text-[#6b7280]">
            {['Product', 'Docs', 'Pricing', 'Changelog'].map((l) => <a key={l} href="#" className="transition hover:text-[#0f1115]">{l}</a>)}
            <button className={btnP}>Start free</button>
          </div>
        )}
      </nav>

      <header className={`mx-auto text-center ${m ? 'px-5 py-10' : 'max-w-3xl px-10 pb-10 pt-16'}`}>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#e8e8ea] bg-white px-3 py-1 text-xs text-[#6b7280] shadow-sm">
          <span className="relative h-1.5 w-1.5 rounded-full bg-[#2f6bff]"><span className="ms-a absolute inset-0 rounded-full bg-[#2f6bff]" style={{ animation: 'ms-ping 2s infinite' }} /></span> v3 traces are live
        </span>
        <h1 className={`mt-5 font-semibold ${m ? 'text-[34px] leading-[1.1]' : 'text-[56px] leading-[1.05]'}`} style={{ letterSpacing: '-0.04em' }}>Product analytics your whole stack can query</h1>
        <p className="mx-auto mt-4 max-w-xl text-[#6b7280]">Tally turns raw events into answers with SQL, in real time, without a data team. Open source SDKs for 14 languages.</p>
        <div className={`mt-7 flex justify-center gap-3 ${m ? 'flex-col' : ''}`}>
          <button className={`${btnP} justify-center`}>Get started <ArrowRight size={14} /></button>
          <button className="rounded-lg border border-[#e8e8ea] bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-[#f4f4f5]">Read the docs</button>
        </div>
      </header>

      <section className={`mx-auto grid gap-4 pb-14 ${m ? 'grid-cols-1 px-4' : 'max-w-5xl grid-cols-3 px-10'}`}>
        <div className={`${card} p-5 ${m ? '' : 'col-span-2 row-span-2'}`}>
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-[#6b7280]">Events ingested</p><p className="text-3xl font-semibold" style={{ letterSpacing: '-0.04em' }}>{totals[range]}</p></div>
            <div role="tablist" className="flex rounded-lg bg-[#f4f4f5] p-0.5 text-xs">
              {ranges.map((r, i) => <button key={r} role="tab" aria-selected={range === i} onClick={() => setRange(i)} className={`rounded-md px-2.5 py-1 transition ${range === i ? 'bg-white font-medium shadow-sm' : 'text-[#6b7280]'}`}>{r}</button>)}
            </div>
          </div>
          <div className={`mt-6 flex items-end gap-2 ${m ? 'h-28' : 'h-40'}`}>
            {data[range].map((v, i) => <div key={`${range}-${i}`} className="ms-a flex-1 origin-bottom rounded-t-md bg-[#2f6bff]" style={{ height: `${v}%`, opacity: 0.35 + i * 0.09, animation: 'ms-grow .5s ease-out both', animationDelay: `${i * 40}ms` }} />)}
          </div>
        </div>
        {[[Gauge, 'p95 latency', '38 ms', 'Down 12% this week'], [GitBranch, 'Deploy markers', '24', 'Linked to every chart']].map(([Ic, a, b, c]) => {
          const Icon = Ic as typeof Gauge
          return <div key={a as string} className={`${card} p-5 transition hover:-translate-y-0.5`}><Icon size={16} className="text-[#6b7280]" /><p className="mt-3 text-sm text-[#6b7280]">{a as string}</p><p className="text-2xl font-semibold" style={{ letterSpacing: '-0.03em' }}>{b as string}</p><p className="mt-1 text-xs text-[#6b7280]">{c as string}</p></div>
        })}
        <div className={`${card} flex items-center gap-3 p-4 ${m ? '' : 'col-span-3'}`}>
          <Search size={16} className="text-[#6b7280]" />
          <code className="flex-1 truncate text-sm text-[#6b7280]">SELECT count() FROM events WHERE name = 'signup'</code>
          <Bell size={16} className="text-[#2f6bff]" />
        </div>
      </section>
    </div>
  )
}
