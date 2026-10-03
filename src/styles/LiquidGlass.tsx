import { useEffect, useState } from 'react'
import { CloudSun, Compass, Heart, Home, MapPin, Search, User, Wind } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'liquid-glass',
  title: 'Liquid glass',
  family: 'Soft surfaces',
  era: 'New in 2025 (Apple iOS 26 and macOS Tahoe)',
  idea: 'Travel and weather app',
  description: 'Controls are made of clear, thick glass that bends the colour behind it and catches a bright highlight along its edge. It feels wet, weightless and alive, a step beyond frosted glassmorphism.',
  traits: ['near-clear fills, light blur', 'bright specular rim on top and left', 'saturated content shows through', 'pill and capsule shapes', 'floating tab bars and toolbars', 'soft shadow lifts glass off the page'],
  palette: [
    { name: 'Deep sea', hex: '#0b3b6f' },
    { name: 'Lagoon', hex: '#19b6c9' },
    { name: 'Sunset', hex: '#ff8a5b' },
    { name: 'Orchid', hex: '#c86bfa' },
    { name: 'Glass', hex: '#ffffff' },
  ],
  fonts: 'Inter + Instrument Sans',
  useFor: ['Navigation bars and tab bars over rich content', 'Media, maps, weather and travel apps', 'Floating controls on photos and video'],
  avoid: ['Long text placed directly on glass', 'Flat or plain backgrounds, where the effect disappears', 'Stacking glass on glass, which turns muddy'],
  signature: `background: rgba(255,255,255,0.10);
backdrop-filter: blur(10px) saturate(180%) brightness(1.08);
border-radius: 999px;
border: 1px solid rgba(255,255,255,0.35);
box-shadow:
  inset 1.5px 1.5px 0 rgba(255,255,255,0.65),
  inset -1px -1px 0 rgba(255,255,255,0.18),
  0 10px 30px rgba(8,20,60,0.28);`,
} as const satisfies StyleMeta

const glass: React.CSSProperties = {
  background: 'rgba(255,255,255,0.10)',
  backdropFilter: 'blur(10px) saturate(180%) brightness(1.08)',
  WebkitBackdropFilter: 'blur(10px) saturate(180%) brightness(1.08)',
  border: '1px solid rgba(255,255,255,0.35)',
  boxShadow: 'inset 1.5px 1.5px 0 rgba(255,255,255,0.65), inset -1px -1px 0 rgba(255,255,255,0.18), 0 10px 30px rgba(8,20,60,0.28)',
}
const places = [
  { n: 'Amalfi Coast', c: 'Italy', t: '27°', g: 'linear-gradient(160deg,#ffb36b,#ff5f8f 60%,#7b4bff)' },
  { n: 'Lofoten', c: 'Norway', t: '9°', g: 'linear-gradient(160deg,#7de3ff,#3b7bff 60%,#1a2a7a)' },
  { n: 'Kyoto', c: 'Japan', t: '21°', g: 'linear-gradient(160deg,#ffd1e8,#ff7ab6 55%,#8a3bd6)' },
]
const tabs = [[Home, 'Home'], [Compass, 'Explore'], [Heart, 'Saved'], [User, 'Profile']] as const

export default function LiquidGlass({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [tab, setTab] = useState(0)
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setTab(v => (v + 1) % tabs.length), 2200)
    return () => clearInterval(t)
  }, [auto])
  return (
    <div onPointerDown={() => setAuto(false)} onKeyDown={() => setAuto(false)} className="relative h-full w-full overflow-hidden text-white" style={{ fontFamily: "'Inter', sans-serif", background: 'linear-gradient(170deg,#0b3b6f 0%,#1489b8 38%,#ff8a5b 78%,#c86bfa 100%)' }}>
      <style>{`@keyframes lg-float{50%{transform:translate3d(18px,-22px,0) scale(1.08)}}@media (prefers-reduced-motion:reduce){.lg-a{animation:none!important;transition:none!important}}`}</style>
      <span aria-hidden className="lg-a absolute -left-16 top-10 h-72 w-72 rounded-full bg-[#19b6c9] opacity-70 blur-3xl" style={{ animation: 'lg-float 11s ease-in-out infinite' }} />
      <span aria-hidden className="lg-a absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-[#ff5f8f] opacity-60 blur-3xl" style={{ animation: 'lg-float 14s ease-in-out infinite reverse' }} />

      <div className={`relative flex h-full flex-col ${m ? 'px-4 pb-24 pt-4' : 'px-10 pb-28 pt-6'}`}>
        <nav className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold" style={glass}><MapPin size={15} /> Wander</span>
          <label className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm ${m ? 'flex-1' : 'w-72'}`} style={glass}>
            <Search size={15} className="shrink-0 opacity-80" />
            <input aria-label="Search places" placeholder="Where to?" className="w-full bg-transparent text-white outline-none placeholder:text-white/70" />
          </label>
        </nav>

        <header className={m ? 'mt-7' : 'mt-10'}>
          <p className="text-sm font-medium text-white/80">Saturday, clear skies</p>
          <h1 className={`mt-1 font-semibold tracking-tight ${m ? 'text-4xl' : 'text-6xl'}`} style={{ fontFamily: "'Instrument Sans', sans-serif", textShadow: '0 2px 24px rgba(8,20,60,.35)' }}>Go where the<br />light is good.</h1>
        </header>

        <section className={`mt-auto grid gap-4 ${m ? 'grid-cols-1' : 'grid-cols-[1.1fr_2fr]'}`}>
          <div className="rounded-[28px] p-5" style={glass}>
            <div className="flex items-center justify-between"><span className="text-sm text-white/80">Now in Amalfi</span><CloudSun size={22} /></div>
            <p className="mt-2 text-5xl font-semibold tracking-tight">27°</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-white/80"><Wind size={14} /> 12 km/h, golden hour at 18:42</p>
          </div>
          {!m && (
            <div className="grid grid-cols-3 gap-4">
              {places.map(p => (
                <article key={p.n} className="lg-a group relative overflow-hidden rounded-[28px] p-1.5 transition duration-300 hover:-translate-y-1" style={glass}>
                  <div className="h-24 rounded-[22px]" style={{ background: p.g }} />
                  <div className="flex items-end justify-between px-2.5 pb-2 pt-2.5">
                    <div><p className="text-sm font-semibold">{p.n}</p><p className="text-xs text-white/75">{p.c}</p></div>
                    <span className="text-sm font-semibold">{p.t}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <div role="tablist" aria-label="Sections" className={`absolute left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full p-1.5 ${m ? 'bottom-5' : 'bottom-7'}`} style={glass}>
        {tabs.map(([Icon, label], i) => (
          <button key={label} role="tab" aria-selected={tab === i} onClick={() => setTab(i)}
            className={`lg-a flex items-center gap-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${m ? 'h-12 px-4' : 'h-11 px-5'}`}
            style={tab === i ? { background: 'rgba(255,255,255,0.3)', boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.8), 0 4px 14px rgba(8,20,60,0.25)' } : undefined}>
            <Icon size={17} />{(tab === i || !m) && <span>{label}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
