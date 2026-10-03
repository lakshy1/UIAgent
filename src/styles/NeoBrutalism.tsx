import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Menu, Zap } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'neo-brutalism',
  title: 'Neo-Brutalism',
  family: 'Bold and edgy',
  era: 'Popular since 2021 (Gumroad, Figma community, Notion-era indie tools)',
  idea: 'Indie newsletter and creator-tools site',
  description: 'Flat, loud colors fenced in by thick black borders and hard offset shadows with zero blur. It feels like a printed zine: confident, playful and deliberately unpolished.',
  traits: ['3-4px solid black borders', 'Hard offset shadows, no blur', 'Flat saturated fills', 'Heavy display type', 'Buttons that press into their shadow', 'Slight rotations and stickers'],
  palette: [
    { name: 'Ink', hex: '#111111' },
    { name: 'Paper', hex: '#FFF8E7' },
    { name: 'Tomato', hex: '#FF5C39' },
    { name: 'Lemon', hex: '#FFD93D' },
    { name: 'Mint', hex: '#6BE3A8' },
    { name: 'Sky', hex: '#8FD3FF' },
  ],
  fonts: 'Archivo Black + Space Grotesk',
  useFor: ['Creator and indie tools', 'Newsletters and zines', 'Playful startup landing pages'],
  avoid: ['Banking or healthcare', 'Dense enterprise dashboards', 'Luxury brands'],
  signature: `border: 3px solid #111;
box-shadow: 6px 6px 0 #111;
background: #FFD93D;
border-radius: 0;
transition: transform .1s, box-shadow .1s;
/* press */
button:active {
  transform: translate(6px, 6px);
  box-shadow: 0 0 0 #111;
}`,
} as const satisfies StyleMeta

const F = "'Archivo Black', sans-serif"
const S = "'Space Grotesk', sans-serif"

export default function NeoBrutalism({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [yearly, setYearly] = useState(false)
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setYearly((y) => !y), 2600)
    return () => clearInterval(t)
  }, [auto])

  const box = 'border-[3px] border-[#111] shadow-[6px_6px_0_#111]'
  const btn = `${box} font-bold px-5 py-3 transition-[transform,box-shadow] duration-100 active:translate-x-[6px] active:translate-y-[6px] active:shadow-[0_0_0_#111] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_#111] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#2b50ff]`
  const issues = [
    ['#142', 'Why your landing page converts at 1%', '#FF5C39'],
    ['#141', 'Pricing for people who hate pricing', '#6BE3A8'],
    ['#140', 'The 6-tool stack of a solo creator', '#8FD3FF'],
  ]

  return (
    <div onPointerDown={() => setAuto(false)} onKeyDown={() => setAuto(false)} className="relative h-full w-full overflow-auto text-[#111]" style={{ background: '#FFF8E7', fontFamily: S, backgroundImage: 'radial-gradient(#11111122 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }}>
      <style>{`@keyframes nb-tick{to{transform:translateX(-50%)}}@keyframes nb-wob{50%{transform:rotate(4deg) scale(1.06)}}@media (prefers-reduced-motion:reduce){.nb-a{animation:none!important}}`}</style>
      <nav className={`flex items-center justify-between border-b-[3px] border-[#111] bg-white ${m ? 'px-4 py-3' : 'px-10 py-4'}`}>
        <span style={{ fontFamily: F }} className="text-xl">SCRIBBLR<span className="text-[#FF5C39]">.</span></span>
        {m ? <button aria-label="Open menu" className={`${box} bg-[#FFD93D] p-1.5 !shadow-[3px_3px_0_#111]`}><Menu size={18} /></button> : (
          <div className="flex items-center gap-8 font-bold">
            {['Archive', 'Tools', 'Pricing'].map((l) => <a key={l} href="#" className="underline decoration-4 decoration-transparent underline-offset-4 hover:decoration-[#FF5C39]">{l}</a>)}
            <button className={`${btn} bg-[#6BE3A8] !py-1.5`}>Log in</button>
          </div>
        )}
      </nav>

      <header className={`grid gap-8 ${m ? 'px-4 py-8' : 'grid-cols-[1.3fr_1fr] items-center px-10 py-12'}`}>
        <div>
          <span className="nb-a inline-block rotate-[-3deg] border-[3px] border-[#111] bg-[#FFD93D] px-3 py-1 text-sm font-bold" style={{ animation: 'nb-wob 3s ease-in-out infinite' }}>38,402 weirdos reading</span>
          <h1 style={{ fontFamily: F, lineHeight: 0.98 }} className={`mt-4 ${m ? 'text-[40px]' : 'text-[64px]'}`}>
            Write loud. <span className="bg-[#FF5C39] px-2 text-white">Ship</span> weekly. Get paid.
          </h1>
          <p className="mt-4 max-w-md text-lg font-medium">A newsletter and toolkit for solo creators who would rather build an audience than a pitch deck.</p>
          {done ? (
            <p className={`${box} mt-6 inline-flex items-center gap-2 bg-[#6BE3A8] px-4 py-3 font-bold`}><Check size={18} /> You are in. Check your inbox.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setDone(true) }} className={`mt-6 flex gap-3 ${m ? 'flex-col' : ''}`}>
              <input required type="email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@weird.co" className={`${box} min-w-0 flex-1 bg-white px-4 py-3 font-medium placeholder:text-[#11111188] focus:bg-[#FFD93D] focus:outline-none`} />
              <button className={`${btn} bg-[#FF5C39] text-white`}>Subscribe free</button>
            </form>
          )}
        </div>
        <div className={`${box} relative rotate-2 bg-[#8FD3FF] p-5`}>
          <p className="text-xs font-bold uppercase tracking-widest">This week</p>
          <p style={{ fontFamily: F }} className="mt-2 text-2xl">12 tools that earn their keep</p>
          <div className="mt-4 flex gap-2">{['bg-[#FFD93D]', 'bg-[#FF5C39]', 'bg-[#6BE3A8]'].map((c) => <span key={c} className={`h-10 flex-1 border-[3px] border-[#111] ${c}`} />)}</div>
          <Zap className="absolute -right-4 -top-4 rotate-12 border-[3px] border-[#111] bg-[#FFD93D] p-1" size={44} />
        </div>
      </header>

      <div className="overflow-hidden border-y-[3px] border-[#111] bg-[#111] py-2 text-[#FFD93D]" style={{ fontFamily: F }} aria-hidden>
        <div className="nb-a flex w-max gap-8 whitespace-nowrap" style={{ animation: 'nb-tick 16s linear infinite' }}>
          {Array.from({ length: 12 }).map((_, i) => <span key={i}>NO ALGORITHMS * NO VC * NO FLUFF *</span>)}
        </div>
      </div>

      <section className={`grid gap-5 ${m ? 'px-4 py-8' : 'grid-cols-3 px-10 py-12'}`}>
        {issues.map(([n, t, c]) => (
          <a key={n} href="#" className={`${box} group block p-5 transition-transform hover:-translate-y-1`} style={{ background: c }}>
            <span style={{ fontFamily: F }} className="text-3xl">{n}</span>
            <p className="mt-2 text-lg font-bold leading-tight">{t}</p>
            <ArrowUpRight className="mt-3 transition-transform group-hover:translate-x-1" />
          </a>
        ))}
      </section>

      <section className={`border-t-[3px] border-[#111] bg-[#6BE3A8] ${m ? 'px-4 py-8' : 'px-10 py-12'}`}>
        <div className="flex items-center justify-between gap-4">
          <h2 style={{ fontFamily: F }} className={m ? 'text-2xl' : 'text-4xl'}>Pro toolkit</h2>
          <button role="switch" aria-checked={yearly} onClick={() => setYearly(!yearly)} className={`${btn} bg-white !py-1.5 text-sm`}>{yearly ? 'Yearly -20%' : 'Monthly'}</button>
        </div>
        <div className={`${box} mt-5 flex items-center justify-between bg-white p-5 ${m ? 'flex-col items-start gap-4' : ''}`}>
          <p style={{ fontFamily: F }} className="text-5xl">${yearly ? 12 : 15}<span className="text-base">/mo</span></p>
          <ul className="space-y-1 font-medium">{['Unlimited drafts', 'Sponsor marketplace', 'Analytics that make sense'].map((x) => <li key={x} className="flex gap-2"><Check size={18} />{x}</li>)}</ul>
          <button className={`${btn} bg-[#FFD93D]`}>Go Pro</button>
        </div>
      </section>
    </div>
  )
}
