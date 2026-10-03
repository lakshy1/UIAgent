import { useEffect, useState } from 'react'
import { Cloud, Download, Globe, Leaf, Music, Search, Sun, Wifi } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'frutiger-aero',
  title: 'Frutiger Aero',
  family: 'Retro',
  era: '2004 to 2013 (Windows Vista and 7, early iOS), revived since 2023',
  idea: 'Clean-energy company homepage',
  description: 'Glossy buttons, blue skies, water droplets and green grass: the hopeful look of mid-2000s software. It feels fresh, humane and optimistic, technology in harmony with nature.',
  traits: ['glossy gel buttons with a top highlight', 'sky blue and leaf green', 'glass panels with soft reflections', 'bubbles, lens flares and nature imagery', 'rounded humanist type', 'bright, daylight mood'],
  palette: [
    { name: 'Sky', hex: '#3fa9f5' },
    { name: 'Deep sky', hex: '#0b63c4' },
    { name: 'Grass', hex: '#6cc24a' },
    { name: 'Aqua', hex: '#7fe3f0' },
    { name: 'Cloud', hex: '#ffffff' },
    { name: 'Ink', hex: '#0d2b4d' },
  ],
  fonts: 'Open Sans',
  useFor: ['Wellness, weather, travel and eco brands', 'Nostalgic campaigns and music releases', 'Playful dashboards and widgets'],
  avoid: ['Dense professional tools', 'Brands that need to look austere or luxurious', 'Overusing gloss on every element'],
  signature: `background: linear-gradient(#7cc9ff, #1f7fe0 52%, #0b63c4 53%, #2f95f0);
border: 1px solid #0a4f9e;
border-radius: 999px;
box-shadow:
  inset 0 1px 0 rgba(255,255,255,.85),
  inset 0 -6px 10px rgba(255,255,255,.18),
  0 6px 14px rgba(11,99,196,.35);
color: #fff;
text-shadow: 0 1px 1px rgba(0,40,90,.5);`,
} as const satisfies StyleMeta

const gel = (from: string, mid: string, dark: string, to: string, edge: string): React.CSSProperties => ({
  background: `linear-gradient(${from}, ${mid} 52%, ${dark} 53%, ${to})`,
  border: `1px solid ${edge}`,
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.85), inset 0 -6px 10px rgba(255,255,255,.18), 0 6px 14px rgba(11,99,196,.3)',
  color: '#fff',
  textShadow: '0 1px 1px rgba(0,40,90,.5)',
})
const blue = gel('#7cc9ff', '#1f7fe0', '#0b63c4', '#2f95f0', '#0a4f9e')
const green = gel('#b4ee8e', '#5cb83a', '#3f9a22', '#6fce4c', '#2f7a18')
const glass: React.CSSProperties = {
  background: 'linear-gradient(rgba(255,255,255,.72), rgba(255,255,255,.34))',
  border: '1px solid rgba(255,255,255,.9)',
  boxShadow: 'inset 0 1px 0 #fff, 0 12px 30px rgba(11,70,140,.22)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
}
const bubbles = [[8, 62, 46], [18, 22, 22], [72, 70, 34], [86, 30, 58], [56, 14, 18], [40, 78, 26]]
const tiles = [[Sun, 'Solar', '4.2 kW'], [Wifi, 'Grid link', 'Online'], [Leaf, 'Saved', '128 kg']] as const

export default function FrutigerAero({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [pct, setPct] = useState(64)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setPct(p => (p >= 96 ? 58 : p + 2)), 700)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="relative h-full w-full overflow-hidden text-[#0d2b4d]" style={{ fontFamily: "'Open Sans', sans-serif", background: 'linear-gradient(#3fa9f5 0%, #9fdcff 46%, #e9faff 62%, #b9e88f 63%, #6cc24a 100%)' }}>
      <style>{`@keyframes fa-rise{from{transform:translateY(0)}to{transform:translateY(-26px)}}@media (prefers-reduced-motion:reduce){.fa-a{animation:none!important;transition:none!important}}`}</style>
      <span aria-hidden className="absolute -right-10 -top-16 h-72 w-72 rounded-full" style={{ background: 'radial-gradient(circle, #fff 0%, rgba(255,255,255,.55) 30%, transparent 68%)' }} />
      {bubbles.map(([x, y, s], i) => (
        <span key={i} aria-hidden className="fa-a absolute rounded-full" style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, background: 'radial-gradient(circle at 32% 28%, rgba(255,255,255,.95), rgba(255,255,255,.18) 45%, rgba(120,210,255,.28) 70%)', border: '1px solid rgba(255,255,255,.7)', animation: `fa-rise ${5 + i}s ease-in-out ${i * 0.4}s infinite alternate` }} />
      ))}

      <div className={`relative flex h-full flex-col ${m ? 'p-4' : 'px-10 py-6'}`}>
        <nav className="flex items-center justify-between rounded-full px-4 py-2" style={glass}>
          <span className="flex items-center gap-2 text-sm font-bold"><Globe size={16} className="text-[#0b63c4]" /> Clearwater</span>
          {m ? <Search size={16} /> : <div className="flex items-center gap-5 text-sm">{['Home', 'Energy', 'Community', 'Support'].map(l => <a key={l} href="#" onClick={e => e.preventDefault()} className="hover:text-[#0b63c4]">{l}</a>)}</div>}
        </nav>

        <header className={m ? 'mt-6' : 'mt-9 max-w-xl'}>
          <h1 className={`font-bold leading-[1.05] tracking-tight text-white ${m ? 'text-4xl' : 'text-6xl'}`} style={{ textShadow: '0 2px 10px rgba(11,70,140,.45)' }}>Power, the way nature intended.</h1>
          <p className="mt-3 text-sm text-[#0d2b4d]/85">Clean energy for your home, measured live and shared with your street.</p>
          <div className={`mt-5 flex gap-3 ${m ? 'flex-col' : ''}`}>
            <button className="fa-a inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition hover:brightness-110 active:translate-y-px" style={blue}><Download size={16} /> Get started</button>
            <button className="fa-a inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition hover:brightness-110 active:translate-y-px" style={green}><Leaf size={16} /> See your savings</button>
          </div>
        </header>

        <section className={`mt-auto grid gap-3 ${m ? 'grid-cols-1' : 'grid-cols-[1.3fr_1fr_1fr_1fr]'}`}>
          <div className="rounded-2xl p-4" style={glass}>
            <div className="flex items-center justify-between text-sm font-semibold"><span className="flex items-center gap-2"><Cloud size={16} className="text-[#0b63c4]" /> Battery</span><span>{pct}%</span></div>
            <div className="mt-3 h-5 overflow-hidden rounded-full border border-[#0a4f9e]/40 bg-white/60 shadow-[inset_0_2px_4px_rgba(0,40,90,.25)]">
              <div className="fa-a h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: 'linear-gradient(#b4ee8e, #5cb83a 52%, #3f9a22 53%, #6fce4c)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.8)' }} />
            </div>
            <p className="mt-2 flex items-center gap-2 text-xs text-[#0d2b4d]/75"><Music size={12} /> Charging from the roof</p>
          </div>
          {!m && tiles.map(([Icon, label, value]) => (
            <div key={label} className="fa-a rounded-2xl p-4 transition hover:-translate-y-1" style={glass}>
              <Icon size={18} className="text-[#0b63c4]" />
              <p className="mt-2 text-xs text-[#0d2b4d]/75">{label}</p>
              <p className="text-xl font-bold">{value}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
