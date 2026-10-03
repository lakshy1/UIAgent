import { useEffect, useRef, useState } from 'react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'maximalism',
  title: 'Maximalism',
  family: 'Less and more',
  era: 'Resurgent since 2021 (neo-brutalist and Memphis revival)',
  idea: 'Music festival website',
  description:
    'Maximalism piles on saturated colour, pattern, oversized type and stickers until the page vibrates. It feels loud, generous and joyfully chaotic.',
  traits: ['Clashing saturated colours', 'Layered patterns', 'Huge mixed typefaces', 'Stickers and rotated badges', 'Thick outlines, hard shadows', 'Marquees everywhere'],
  palette: [
    { name: 'Hot Pink', hex: '#ff2e93' },
    { name: 'Acid Yellow', hex: '#ffe600' },
    { name: 'Electric Blue', hex: '#2b3cff' },
    { name: 'Lime', hex: '#8cff3a' },
    { name: 'Tangerine', hex: '#ff6a00' },
    { name: 'Ink', hex: '#14001f' },
  ],
  fonts: 'Archivo Black + Syne + Space Mono',
  useFor: ['Festivals and events', 'Youth and streetwear brands', 'Record labels'],
  avoid: ['Banking or healthcare', 'Long-form reading', 'Accessibility-critical flows without care'],
  signature: `background:
  radial-gradient(#14001f 2px, transparent 2.5px) 0 0/16px 16px,
  #ffe600;
border: 4px solid #14001f;
box-shadow: 8px 8px 0 #14001f;
transform: rotate(-3deg);
font-family: 'Archivo Black';
text-transform: uppercase;
animation: marquee 12s linear infinite;`,
} as const satisfies StyleMeta

const days = [
  { d: 'FRI', bg: '#ff2e93', fg: '#ffe600', acts: ['NEON PALMS', 'Dola Okafor', 'SUNDAY CHOIR', 'Mira & The Moths'] },
  { d: 'SAT', bg: '#2b3cff', fg: '#8cff3a', acts: ['CASSETTE KIDS', 'Lune 404', 'BIG PAPAYA', 'Orla Vance'] },
  { d: 'SUN', bg: '#ff6a00', fg: '#14001f', acts: ['THE HUMMS', 'Kiko Ramos', 'PLASTIC SAINTS', 'Ayo Dune'] },
]

export default function Maximalism({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [day, setDay] = useState(0)
  const stop = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => (stop.current ? clearInterval(id) : setDay(d => (d + 1) % 3)), 2400)
    return () => clearInterval(id)
  }, [])
  const D = days[day]
  const dots = (c: string) => `radial-gradient(${c} 2px, transparent 2.5px) 0 0/16px 16px`
  const mq = 'LOUD GARDEN FEST * 3 DAYS * 48 ACTS * ZERO CHILL * '.repeat(4)
  const box = { border: '4px solid #14001f', boxShadow: '8px 8px 0 #14001f' }

  return (
    <div className="relative h-full w-full overflow-auto" style={{ background: `${dots('#14001f33')}, #ffe600`, color: '#14001f', fontFamily: "'Space Mono', monospace" }}
      onPointerDown={() => (stop.current = true)} onKeyDown={() => (stop.current = true)}>
      <style>{`@keyframes mx-mq{to{transform:translateX(-50%)}}@keyframes mx-spin{to{transform:rotate(360deg)}}@keyframes mx-wob{50%{transform:rotate(4deg) scale(1.06)}}
      .mx-btn{transition:transform .12s, box-shadow .12s}.mx-btn:hover{transform:translate(-3px,-3px);box-shadow:11px 11px 0 #14001f}.mx-btn:active{transform:translate(6px,6px);box-shadow:2px 2px 0 #14001f}
      @media (prefers-reduced-motion:reduce){.mx-a{animation:none!important}}`}</style>

      <div className="overflow-hidden whitespace-nowrap py-2 text-[14px] font-bold" style={{ background: '#14001f', color: '#8cff3a' }}>
        <div className="mx-a inline-block" style={{ animation: 'mx-mq 14s linear infinite' }}>{mq}{mq}</div>
      </div>

      <nav className="flex items-center justify-between p-4">
        <span className="text-[22px]" style={{ fontFamily: "'Archivo Black'", WebkitTextStroke: '1px #14001f', color: '#ff2e93' }}>LOUD GARDEN</span>
        <button className="mx-btn px-4 py-2 text-[13px] font-bold uppercase focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#2b3cff]" style={{ background: '#8cff3a', ...box, boxShadow: '4px 4px 0 #14001f' }}>Tickets</button>
      </nav>

      <header className="relative px-4 pb-10 pt-4" style={{ background: `${dots('#ffffff55')}, #2b3cff`, borderTop: '4px solid #14001f', borderBottom: '4px solid #14001f' }}>
        <h1 className={`leading-[0.85] ${m ? 'text-[68px]' : 'text-[150px]'}`} style={{ fontFamily: "'Archivo Black'", color: '#ffe600', textShadow: '6px 6px 0 #ff2e93, 12px 12px 0 #14001f' }}>
          TURN IT <span style={{ fontFamily: "'Syne'", fontWeight: 800, fontStyle: 'italic', color: '#8cff3a' }}>up</span> TO ELEVEN
        </h1>
        <div className="mx-a absolute right-4 top-4 grid h-24 w-24 place-items-center rounded-full text-center text-[12px] font-bold leading-tight" style={{ background: '#ff6a00', border: '4px solid #14001f', animation: 'mx-wob 2.5s ease-in-out infinite', transform: 'rotate(-12deg)' }}>
          AUG 14-16<br />LISBON
        </div>
        <button className="mx-btn mt-6 px-6 py-3 text-[16px] font-bold uppercase focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#ffe600]" style={{ background: '#ff2e93', color: '#ffe600', ...box }}>Grab a 3-day pass</button>
      </header>

      <section className="p-4" aria-label="Lineup">
        <div role="tablist" className="mb-4 flex gap-2">
          {days.map((x, i) => (
            <button key={x.d} role="tab" aria-selected={day === i} onClick={() => setDay(i)} className="mx-btn px-4 py-2 text-[18px] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#2b3cff]"
              style={{ fontFamily: "'Archivo Black'", background: day === i ? x.bg : '#fff', color: day === i ? x.fg : '#14001f', border: '4px solid #14001f', boxShadow: day === i ? '6px 6px 0 #14001f' : 'none', transform: `rotate(${(i - 1) * 2}deg)` }}>{x.d}</button>
          ))}
        </div>
        <div className={`grid gap-4 ${m ? 'grid-cols-1' : 'grid-cols-4'}`}>
          {D.acts.map((a, i) => (
            <div key={a + day} className="p-4" style={{ background: i % 2 ? D.fg : D.bg, color: i % 2 ? '#14001f' : D.fg, ...box, transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}>
              <span className="text-[11px] font-bold">0{i + 1} / STAGE {i % 2 ? 'B' : 'A'}</span>
              <p className="mt-2 text-[26px] leading-none" style={{ fontFamily: i % 2 ? "'Syne'" : "'Archivo Black'", fontWeight: 800 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-6 flex items-center justify-between p-4 text-[13px] font-bold uppercase" style={{ background: '#14001f', color: '#ffe600' }}>
        <span>No refunds, only vibes.</span>
        <span className="mx-a inline-block" style={{ animation: 'mx-spin 6s linear infinite' }}>*</span>
      </footer>
    </div>
  )
}
