import { useEffect, useRef, useState } from 'react'
import { Activity, Flame, Heart, Menu, Moon } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'dark-oled',
  title: 'Dark OLED',
  family: 'Modern',
  era: 'Popular since 2019 (Apple Watch, Whoop, Oura, fintech apps)',
  idea: 'Fitness and finance wearable companion site',
  description: 'True #000 black with one neon-lime accent, thin type and oversized numbers. Rings and numbers glow while everything else stays quiet, so the data is the hero.',
  traits: ['Pure #000 background, no grey lift', 'Single neon-lime accent, nothing else colored', 'Thin and light weights with huge numerals', 'Glowing progress rings via drop-shadow', 'Hairline borders at 10% white', 'Tabular numbers and generous spacing'],
  palette: [
    { name: 'OLED black', hex: '#000000' },
    { name: 'Neon lime', hex: '#c6ff1a' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Grey text', hex: '#8a8a8a' },
    { name: 'Hairline', hex: '#1c1c1c' },
    { name: 'Ring track', hex: '#161a0a' },
  ],
  fonts: 'Space Grotesk + Inter',
  useFor: ['Wearables and health trackers', 'Fintech and trading companions', 'Night-use media or car dashboards'],
  avoid: ['Long-form reading, since white on black fatigues', 'Brands that need warmth or many colors', 'Print or bright outdoor contexts'],
  signature: `background: #000;
color: #fff; font-weight: 200;
.num { font-size: 96px; font-variant-numeric: tabular-nums; }
.accent { color: #c6ff1a;
  filter: drop-shadow(0 0 10px rgba(198,255,26,.6)); }
.ring { stroke: #c6ff1a; stroke-linecap: round; }
.card { border: 1px solid #1c1c1c; background: #000; }`,
} as const satisfies StyleMeta

const L = '#c6ff1a'
const F = "'Space Grotesk', sans-serif"

function Ring({ v, size, label, big }: { v: number; size: number; label: string; big?: boolean }) {
  const r = size / 2 - 10, c = 2 * Math.PI * r
  return (
    <div className="relative" style={{ width: size, height: size }} role="img" aria-label={`${label} ${Math.round(v)} percent`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#161a0a" strokeWidth={big ? 12 : 8} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={L} strokeWidth={big ? 12 : 8} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - v / 100)} style={{ transition: 'stroke-dashoffset 1s ease', filter: 'drop-shadow(0 0 8px rgba(198,255,26,.7))' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-extralight tabular-nums" style={{ fontSize: big ? size * 0.3 : size * 0.26 }}>{Math.round(v)}</span>
        <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: '#8a8a8a' }}>{label}</span>
      </div>
    </div>
  )
}

const ranges = ['Day', 'Week', 'Month'] as const
const data = { Day: [82, 64, 91], Week: [74, 88, 70], Month: [68, 79, 85] }

export default function DarkOled({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [r, setR] = useState<(typeof ranges)[number]>('Day')
  const touched = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let k = 0
    const t = setInterval(() => { if (!touched.current) { k = (k + 1) % 3; setR(ranges[k]) } }, 2600)
    return () => clearInterval(t)
  }, [])
  const [a, b, c] = data[r]
  const stats = [{ I: Heart, n: '52', u: 'bpm resting' }, { I: Flame, n: '2,184', u: 'kcal burned' }, { I: Moon, n: '7h 42', u: 'sleep' }]

  return (
    <div className="relative h-full w-full overflow-auto" style={{ background: '#000', color: '#fff', fontFamily: F, fontWeight: 300 }}>
      <nav className={`flex items-center justify-between ${m ? 'px-5 py-4' : 'px-12 py-6'}`}>
        <span className="flex items-center gap-2 text-lg tracking-[0.2em]"><Activity size={18} color={L} /> PULSE<span style={{ color: L }}>0</span></span>
        {m ? <button aria-label="Menu" className="p-2"><Menu size={20} /></button> : (
          <div className="flex items-center gap-8 text-sm" style={{ color: '#8a8a8a' }}>
            {['Band', 'App', 'Insights', 'Shop'].map((l) => <a key={l} href="#" onClick={(e) => e.preventDefault()} className="hover:text-white focus-visible:text-white focus-visible:underline">{l}</a>)}
            <button className="rounded-full px-5 py-2 font-medium text-black outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ background: L }}>Buy $199</button>
          </div>
        )}
      </nav>
      <header className={`${m ? 'px-5 pt-6' : 'grid grid-cols-2 items-center gap-8 px-12 pt-6'}`}>
        <div>
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: L }}>Recovery score</p>
          <h1 className={`font-extralight leading-none tabular-nums ${m ? 'mt-3 text-[104px]' : 'mt-3 text-[168px]'}`} style={{ textShadow: '0 0 40px rgba(198,255,26,.25)' }}>{a}<span style={{ color: L }} className="text-[0.35em]">%</span></h1>
          <p className={`mt-4 ${m ? 'text-base' : 'max-w-sm text-lg'}`} style={{ color: '#8a8a8a' }}>Your body, quantified. A wearable that reads strain, sleep and spending stress in real time.</p>
          <div className="mt-6 flex gap-3">
            <button className="rounded-full px-7 py-3 font-medium text-black outline-none transition-shadow hover:shadow-[0_0_30px_rgba(198,255,26,.6)] focus-visible:ring-2 focus-visible:ring-white" style={{ background: L }}>Pre-order</button>
            <button className="rounded-full border px-7 py-3 outline-none hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: '#333' }}>See it work</button>
          </div>
        </div>
        <div className={`flex items-center justify-center ${m ? 'mt-8' : ''}`}><Ring v={a} size={m ? 250 : 300} label="Ready" big /></div>
      </header>
      <section className={`${m ? 'px-5 py-8' : 'px-12 py-12'}`}>
        <div role="tablist" aria-label="Range" className="mb-5 inline-flex rounded-full border p-1" style={{ borderColor: '#1c1c1c' }}>
          {ranges.map((x) => (
            <button key={x} role="tab" aria-selected={r === x} onClick={() => { touched.current = true; setR(x) }} className="rounded-full px-5 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ background: r === x ? L : 'transparent', color: r === x ? '#000' : '#8a8a8a', fontWeight: r === x ? 500 : 300 }}>{x}</button>
          ))}
        </div>
        <div className={`grid gap-4 ${m ? 'grid-cols-1' : 'grid-cols-4'}`}>
          <div className={`flex items-center justify-around rounded-3xl border p-4 ${m ? '' : 'col-span-1'}`} style={{ borderColor: '#1c1c1c' }}>
            <Ring v={b} size={96} label="Strain" /><Ring v={c} size={96} label="Sleep" />
          </div>
          {stats.map(({ I, n, u }) => (
            <div key={u} className="rounded-3xl border p-5" style={{ borderColor: '#1c1c1c' }}>
              <I size={18} color={L} />
              <p className="mt-3 text-5xl font-extralight tabular-nums">{n}</p>
              <p className="text-xs uppercase tracking-[0.2em]" style={{ color: '#8a8a8a' }}>{u}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm" style={{ color: '#8a8a8a' }}>14-day battery. 5 ATM. Pure black, pure data.</p>
      </section>
    </div>
  )
}
