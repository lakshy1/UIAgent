import { useEffect, useState } from 'react'
import { AlertTriangle, Shield, Radar, Menu, Activity } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'cyberpunk-hud',
  title: 'Cyberpunk HUD',
  family: 'Bold and edgy',
  era: 'Popular since 2018 (Blade Runner 2049 revival, Cyberpunk 2077 UI)',
  idea: 'Security-ops dashboard landing page',
  description: 'Near-black panels with clipped angular corners, neon accents and HUD brackets, as if the page were a heads-up display. Monospace readouts and a touch of glitch make it feel like live telemetry.',
  traits: ['Clip-path chamfered corners', 'Neon cyan, yellow and red on near-black', 'Corner HUD brackets', 'Scanlines and glitch text', 'Orbitron headings, mono readouts', 'Glowing text-shadow'],
  palette: [
    { name: 'Void', hex: '#07090d' },
    { name: 'Panel', hex: '#0e1319' },
    { name: 'Cyan', hex: '#00f0ff' },
    { name: 'Signal Yellow', hex: '#fcee0a' },
    { name: 'Alert Red', hex: '#ff2a55' },
    { name: 'Dim', hex: '#7f8fa3' },
  ],
  fonts: 'Orbitron + Space Mono',
  useFor: ['Security and monitoring products', 'Game and esports sites', 'Sci-fi and hardware launches'],
  avoid: ['Long-form reading', 'Wellness or kids brands', 'Accessibility-critical forms at low contrast'],
  signature: `clip-path: polygon(0 0, calc(100% - 16px) 0,
  100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
background: #0e1319;
border: 1px solid #00f0ff55;
color: #00f0ff;
text-shadow: 0 0 8px #00f0ff;
background-image: repeating-linear-gradient(
  0deg, #ffffff06 0 1px, transparent 1px 3px);`,
} as const satisfies StyleMeta

const O = "'Orbitron', sans-serif"
const M = "'Space Mono', monospace"
const clip = (n: number) => ({ clipPath: `polygon(0 0,calc(100% - ${n}px) 0,100% ${n}px,100% 100%,${n}px 100%,0 calc(100% - ${n}px))` })

export default function CyberpunkHud({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [tab, setTab] = useState(0)
  const [auto, setAuto] = useState(true)
  const [load, setLoad] = useState(62)
  const tabs = [
    { k: 'THREATS', v: '1,284', d: 'Blocked in the last 24h across 312 endpoints.', c: '#ff2a55' },
    { k: 'SENSORS', v: '312/312', d: 'Every node reporting. Median latency 41ms.', c: '#00f0ff' },
    { k: 'PATCHES', v: '97.4%', d: 'Fleet compliance. 8 hosts pending reboot.', c: '#fcee0a' },
  ]
  const t = tabs[tab]

  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const a = setInterval(() => setTab((x) => (x + 1) % 3), 3200)
    const b = setInterval(() => setLoad(40 + Math.round(Math.random() * 50)), 1100)
    return () => { clearInterval(a); clearInterval(b) }
  }, [auto])

  const Panel = ({ children, c = '#00f0ff', className = '' }: { children: React.ReactNode; c?: string; className?: string }) => (
    <div className={`relative p-5 ${className}`} style={{ ...clip(16), background: '#0e1319', border: `1px solid ${c}55`, boxShadow: `inset 0 0 30px ${c}10` }}>
      <span className="absolute left-1.5 top-1.5 h-3 w-3 border-l-2 border-t-2" style={{ borderColor: c }} />
      <span className="absolute bottom-1.5 right-1.5 h-3 w-3 border-b-2 border-r-2" style={{ borderColor: c }} />
      {children}
    </div>
  )

  return (
    <div onPointerDown={() => setAuto(false)} onKeyDown={() => setAuto(false)} className="relative h-full w-full overflow-auto" style={{ background: '#07090d', color: '#c7d3e0', fontFamily: M, backgroundImage: 'repeating-linear-gradient(0deg,#ffffff06 0 1px,transparent 1px 3px)' }}>
      <style>{`@keyframes cp-glitch{0%,92%,100%{transform:none;text-shadow:0 0 12px #00f0ff}94%{transform:translate(-3px,0);text-shadow:3px 0 #ff2a55,-3px 0 #00f0ff}96%{transform:translate(3px,0);text-shadow:-3px 0 #ff2a55,3px 0 #fcee0a}}@keyframes cp-blink{50%{opacity:.2}}@media (prefers-reduced-motion:reduce){.cp-a{animation:none!important}}`}</style>
      <nav className={`flex items-center justify-between border-b border-[#00f0ff44] ${m ? 'px-4 py-3' : 'px-10 py-4'}`}>
        <span style={{ fontFamily: O }} className="flex items-center gap-2 font-bold tracking-[0.25em] text-[#00f0ff]"><Shield size={18} /> NULLGRID</span>
        {m ? <button aria-label="Menu" className="p-2 text-[#00f0ff]"><Menu /></button> : (
          <div className="flex items-center gap-8 text-xs uppercase tracking-widest text-[#7f8fa3]">
            {['Platform', 'Intel', 'Docs'].map((l) => <a key={l} href="#" className="hover:text-[#00f0ff]">{l}</a>)}
            <button className="bg-[#fcee0a] px-4 py-2 font-bold text-black hover:bg-[#00f0ff]" style={clip(8)}>REQUEST ACCESS</button>
          </div>
        )}
      </nav>

      <header className={`${m ? 'px-4 py-8' : 'px-10 py-12'}`}>
        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#ff2a55]"><span className="cp-a h-2 w-2 bg-[#ff2a55]" style={{ animation: 'cp-blink 1s infinite' }} /> Live // 14 incidents open</p>
        <h1 className={`cp-a mt-4 font-black uppercase leading-tight text-[#00f0ff] ${m ? 'text-3xl' : 'max-w-3xl text-[52px]'}`} style={{ fontFamily: O, animation: 'cp-glitch 4s infinite' }}>See the breach before it sees you</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#9aa8b8]">NullGrid fuses endpoint, network and identity telemetry into one tactical view. Detect, isolate and roll back in under 90 seconds.</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <button className="bg-[#00f0ff] px-6 py-3 text-sm font-bold uppercase tracking-widest text-black transition hover:bg-[#fcee0a] hover:shadow-[0_0_24px_#fcee0a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#fcee0a]" style={clip(10)}>Deploy sensor</button>
          <button className="border border-[#00f0ff] px-6 py-3 text-sm uppercase tracking-widest text-[#00f0ff] transition hover:bg-[#00f0ff22]" style={clip(10)}>Watch demo</button>
        </div>
      </header>

      <section className={`grid gap-5 ${m ? 'px-4 pb-6' : 'grid-cols-[1.2fr_1fr] px-10 pb-8'}`}>
        <Panel c={t.c}>
          <div role="tablist" className="flex gap-2">
            {tabs.map((x, i) => <button key={x.k} role="tab" aria-selected={tab === i} onClick={() => setTab(i)} className="px-3 py-1.5 text-[11px] tracking-widest" style={{ ...clip(6), background: tab === i ? x.c : 'transparent', color: tab === i ? '#000' : '#7f8fa3', border: `1px solid ${x.c}66` }}>{x.k}</button>)}
          </div>
          <p className="mt-5 text-5xl font-bold" style={{ fontFamily: O, color: t.c, textShadow: `0 0 14px ${t.c}` }}>{t.v}</p>
          <p className="mt-2 text-sm text-[#9aa8b8]">{t.d}</p>
        </Panel>
        <Panel c="#fcee0a">
          <p className="flex items-center gap-2 text-xs tracking-widest text-[#fcee0a]"><Activity size={14} /> CORE LOAD</p>
          <div className="mt-4 h-3 border border-[#fcee0a66]"><div className="h-full bg-[#fcee0a] transition-all duration-700" style={{ width: `${load}%`, boxShadow: '0 0 10px #fcee0a' }} /></div>
          <p className="mt-2 text-right text-xs">{load}%</p>
        </Panel>
      </section>

      <section className={`grid gap-5 ${m ? 'px-4 pb-10' : 'grid-cols-3 px-10 pb-12'}`}>
        {[[AlertTriangle, 'Auto-isolate', '#ff2a55'], [Radar, 'Threat radar', '#00f0ff'], [Shield, 'Rollback', '#fcee0a']].map(([I, n, c]) => {
          const Icon = I as typeof Shield
          return <Panel key={n as string} c={c as string} className="transition hover:-translate-y-1"><Icon style={{ color: c as string }} /><p className="mt-3 font-bold uppercase tracking-widest" style={{ fontFamily: O, fontSize: 13 }}>{n as string}</p><p className="mt-1 text-xs text-[#7f8fa3]">Policy-driven response with a full audit trail.</p></Panel>
        })}
      </section>
    </div>
  )
}
