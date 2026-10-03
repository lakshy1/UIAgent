import { useEffect, useRef, useState } from 'react'
import { Mic, Sparkles, Search, Menu, Check } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'aurora-gradient',
  title: 'Aurora Gradient',
  family: 'Modern',
  era: 'Popular since 2021 (Stripe, Linear, AI product sites)',
  idea: 'AI note-taking app landing page',
  description: 'Soft blurred mesh gradients with a fine grain overlay, big rounded type and floating translucent cards. It feels calm, luminous and quietly intelligent.',
  traits: ['Layered blurred radial-gradient blobs', 'SVG noise grain overlay', 'Large rounded display type', 'Pill buttons and floating cards', 'Teal, amber and coral instead of purple-pink', 'Slow drifting background motion'],
  palette: [
    { name: 'Cream', hex: '#fbf6ee' },
    { name: 'Teal', hex: '#2bb5a6' },
    { name: 'Amber', hex: '#ffb347' },
    { name: 'Coral', hex: '#ff7a63' },
    { name: 'Deep teal ink', hex: '#0f2f2d' },
    { name: 'Mist', hex: '#bfeee6' },
  ],
  fonts: 'Bricolage Grotesque + Inter',
  useFor: ['AI and productivity SaaS', 'Newsletter and creator tools', 'Calm wellness or journaling apps'],
  avoid: ['Text-heavy docs where blur hurts contrast', 'Low-power devices, since big blurs are costly', 'Brands needing a strict, corporate feel'],
  signature: `background: #fbf6ee;
.blob { filter: blur(70px); opacity: .75;
  background: radial-gradient(circle,#2bb5a6,transparent 65%); }
.grain { background: url("data:image/svg+xml,...feTurbulence...");
  mix-blend-mode: multiply; opacity: .18; }
.card { background: rgba(255,255,255,.6);
  backdrop-filter: blur(18px); border-radius: 28px; }
.btn { border-radius: 999px; }`,
} as const satisfies StyleMeta

const D = "'Bricolage Grotesque', sans-serif"
const I = "'Inter', sans-serif"
const grain = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

const notes = [
  { t: 'Standup, Tuesday', s: 'Three owners assigned, launch moved to the 14th.', tag: 'Meeting', c: '#2bb5a6' },
  { t: 'Reading: Deep Work', s: 'Block 90 minute sessions; shut down ritual at 6.', tag: 'Book', c: '#ffb347' },
  { t: 'Pricing ideas', s: 'Annual plan at two months free tested best.', tag: 'Idea', c: '#ff7a63' },
]

export default function AuroraGradient({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [rec, setRec] = useState(false)
  const [i, setI] = useState(0)
  const touched = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => { if (!touched.current) { setI((x) => (x + 1) % 3); setRec((r) => !r) } }, 2400)
    return () => clearInterval(t)
  }, [])
  const toggle = () => { touched.current = true; setRec((r) => !r) }
  const pill = 'rounded-full px-6 py-3 text-sm font-semibold outline-none transition-all hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-[#2bb5a6]/50'

  return (
    <div className="relative h-full w-full overflow-auto" style={{ background: '#fbf6ee', color: '#0f2f2d', fontFamily: I }}>
      <style>{`@keyframes au-d1{0%,100%{transform:translate(0,0)}50%{transform:translate(60px,40px)}}@keyframes au-d2{0%,100%{transform:translate(0,0)}50%{transform:translate(-50px,30px)}}@keyframes au-f{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}@media(prefers-reduced-motion:reduce){.au-a{animation:none!important}}`}</style>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[640px] overflow-hidden">
        <div className="au-a absolute rounded-full" style={{ width: 460, height: 460, left: -80, top: -100, background: 'radial-gradient(circle,#2bb5a6,transparent 65%)', filter: 'blur(70px)', opacity: 0.7, animation: 'au-d1 14s ease-in-out infinite' }} />
        <div className="au-a absolute rounded-full" style={{ width: 420, height: 420, right: -60, top: 20, background: 'radial-gradient(circle,#ffb347,transparent 65%)', filter: 'blur(70px)', opacity: 0.75, animation: 'au-d2 16s ease-in-out infinite' }} />
        <div className="au-a absolute rounded-full" style={{ width: 380, height: 380, left: '38%', top: 160, background: 'radial-gradient(circle,#ff7a63,transparent 65%)', filter: 'blur(80px)', opacity: 0.5, animation: 'au-d1 18s ease-in-out infinite' }} />
        <div className="absolute inset-0" style={{ backgroundImage: grain, opacity: 0.18, mixBlendMode: 'multiply' }} />
      </div>
      <nav className={`relative flex items-center justify-between ${m ? 'px-5 py-4' : 'px-12 py-6'}`}>
        <span className="text-xl font-bold" style={{ fontFamily: D }}>● tidewrite</span>
        {m ? <button aria-label="Menu" className="rounded-full bg-white/60 p-2.5 backdrop-blur"><Menu size={18} /></button> : (
          <div className="flex items-center gap-8 text-sm font-medium">
            {['Product', 'Templates', 'Pricing'].map((l) => <a key={l} href="#" onClick={(e) => e.preventDefault()} className="opacity-70 hover:opacity-100 focus-visible:underline">{l}</a>)}
            <button className={pill} style={{ background: '#0f2f2d', color: '#fbf6ee' }}>Get started</button>
          </div>
        )}
      </nav>
      <header className={`relative text-center ${m ? 'px-5 pb-6 pt-8' : 'px-12 pb-10 pt-12'}`}>
        <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-1.5 text-xs font-semibold backdrop-blur"><Sparkles size={14} color="#ff7a63" /> Now with live meeting summaries</span>
        <h1 className={`mx-auto mt-5 font-semibold leading-[1.02] tracking-tight ${m ? 'text-5xl' : 'max-w-3xl text-7xl'}`} style={{ fontFamily: D }}>Notes that think<br />alongside you.</h1>
        <p className={`mx-auto mt-5 opacity-70 ${m ? 'text-base' : 'max-w-lg text-lg'}`}>Speak, type or paste. Tidewrite turns the mess into clear summaries, tasks and ideas you can actually find later.</p>
        <div className={`mt-7 flex gap-3 ${m ? 'flex-col' : 'justify-center'}`}>
          <button className={pill} style={{ background: 'linear-gradient(135deg,#2bb5a6,#1f8f84)', color: '#fff', boxShadow: '0 10px 30px rgba(43,181,166,.4)' }}>Start writing free</button>
          <button onClick={toggle} aria-pressed={rec} className={`${pill} inline-flex items-center justify-center gap-2 bg-white/70 backdrop-blur`}><Mic size={16} color={rec ? '#ff7a63' : '#0f2f2d'} /> {rec ? 'Listening... tap to stop' : 'Record a voice note'}</button>
        </div>
      </header>
      <section className={`relative mx-auto grid gap-4 pb-10 ${m ? 'grid-cols-1 px-5' : 'max-w-5xl grid-cols-3 px-12'}`}>
        {notes.map((n, k) => (
          <article key={n.t} className="au-a rounded-[28px] p-5 backdrop-blur-xl transition-all" style={{ background: 'rgba(255,255,255,.62)', border: '1px solid rgba(255,255,255,.9)', boxShadow: i === k ? `0 18px 40px ${n.c}55` : '0 8px 24px rgba(15,47,45,.08)', transform: i === k ? 'translateY(-6px)' : 'none', animation: m ? undefined : `au-f ${5 + k}s ease-in-out infinite` }}>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${n.c}33`, color: '#0f2f2d' }}>{n.tag}</span>
            <h3 className="mt-3 text-xl font-semibold" style={{ fontFamily: D }}>{n.t}</h3>
            <p className="mt-1 text-sm opacity-70">{n.s}</p>
          </article>
        ))}
      </section>
      <section className={`relative mx-auto mb-10 flex items-center gap-4 rounded-[36px] bg-white/60 p-6 backdrop-blur-xl ${m ? 'mx-5 flex-col text-center' : 'max-w-3xl justify-between'}`}>
        <div><h2 className="text-3xl font-semibold" style={{ fontFamily: D }}>Ask your notes anything.</h2><ul className="mt-2 text-sm opacity-70">{['Answers cite the original note', 'Private by default'].map((t) => <li key={t} className="flex items-center gap-2"><Check size={14} color="#2bb5a6" />{t}</li>)}</ul></div>
        <label className="flex w-full max-w-xs items-center gap-2 rounded-full bg-white px-4 py-3 shadow-sm focus-within:ring-4 focus-within:ring-[#2bb5a6]/40"><Search size={16} /><input aria-label="Search notes" placeholder="What did we decide on pricing?" className="w-full bg-transparent text-sm outline-none" onFocus={() => (touched.current = true)} /></label>
      </section>
    </div>
  )
}
