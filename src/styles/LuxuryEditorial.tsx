import { useEffect, useState } from 'react'
import { ArrowRight, Menu } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'luxury-editorial',
  title: 'Luxury editorial',
  family: 'Less and more',
  era: 'A print tradition, dominant online for fashion and hospitality since 2018',
  idea: 'Boutique hotel website',
  description: 'Tall, delicate serif headlines, wide letter-spaced capitals, generous empty space and one muted metallic accent. It feels slow, expensive and assured: nothing is shouting for attention.',
  traits: ['high-contrast serif at very large sizes', 'small capitals with wide tracking', 'cream or near-black grounds, no pure white', 'hairline rules instead of boxes', 'one restrained accent, often brass', 'slow fades, never bounces'],
  palette: [
    { name: 'Ivory', hex: '#f4efe6' },
    { name: 'Ink', hex: '#1c1a17' },
    { name: 'Stone', hex: '#6b655b' },
    { name: 'Brass', hex: '#8a6a3b' },
    { name: 'Clay', hex: '#c9b8a0' },
  ],
  fonts: 'Cormorant Garamond + Cinzel + Instrument Sans',
  useFor: ['Hotels, restaurants and real estate', 'Fashion, jewellery and fragrance', 'Wedding, art and gallery sites'],
  avoid: ['Dense apps and dashboards', 'Small body text set in the display serif', 'Bright colours or playful icons'],
  signature: `font-family: 'Cormorant Garamond', serif;
font-size: clamp(3rem, 8vw, 6.5rem);
font-weight: 400;
line-height: 0.95;
letter-spacing: -0.02em;
/* labels */
font: 500 11px 'Cinzel', serif;
letter-spacing: 0.32em;
text-transform: uppercase;
border-top: 1px solid rgb(28 26 23 / .18);`,
} as const satisfies StyleMeta

const display = "'Cormorant Garamond', Georgia, serif"
const caps = "'Cinzel', Georgia, serif"
const rooms = [
  { n: 'The Garden Room', d: 'Ground floor, private terrace', p: '€420', g: 'linear-gradient(160deg,#c9b8a0,#8f7c63)' },
  { n: 'The Library Suite', d: 'Second floor, fireplace', p: '€680', g: 'linear-gradient(160deg,#a89a86,#5d5245)' },
  { n: 'The Atelier', d: 'Top floor, north light', p: '€910', g: 'linear-gradient(160deg,#d8cbb6,#a08c6f)' },
]

export default function LuxuryEditorial({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI(v => (v + 1) % rooms.length), 2800)
    return () => clearInterval(t)
  }, [auto])
  const label: React.CSSProperties = { fontFamily: caps, fontSize: 10.5, letterSpacing: '0.32em', textTransform: 'uppercase' }
  const room = rooms[i]
  return (
    <div onPointerDown={() => setAuto(false)} onKeyDown={() => setAuto(false)} className="h-full w-full overflow-auto text-[#1c1a17]" style={{ background: '#f4efe6', fontFamily: "'Instrument Sans', sans-serif" }}>
      <style>{`@keyframes le-fade{from{opacity:0}}@media (prefers-reduced-motion:reduce){.le-a{animation:none!important;transition:none!important}}`}</style>
      <nav className={`flex items-center justify-between border-b border-[#1c1a17]/15 ${m ? 'px-5 py-4' : 'px-12 py-5'}`}>
        {m ? <Menu size={18} /> : <div className="flex gap-8 text-[#6b655b]" style={label}>{['Rooms', 'Dining', 'Spa'].map(l => <a key={l} href="#" onClick={e => e.preventDefault()} className="transition-colors hover:text-[#1c1a17]">{l}</a>)}</div>}
        <span className="text-2xl" style={{ fontFamily: display, letterSpacing: '0.08em' }}>Maison Aurelle</span>
        <a href="#" onClick={e => e.preventDefault()} className="border-b border-[#8a6a3b] pb-0.5 text-[#8a6a3b]" style={label}>Reserve</a>
      </nav>

      <header className={m ? 'px-5 pb-8 pt-10' : 'grid grid-cols-[1.25fr_1fr] gap-12 px-12 pb-10 pt-14'}>
        <div>
          <p className="text-[#8a6a3b]" style={label}>Provence · Since 1924</p>
          <h1 className={m ? 'mt-5 text-6xl' : 'mt-6 text-[104px]'} style={{ fontFamily: display, fontWeight: 400, lineHeight: 0.92, letterSpacing: '-0.02em' }}>A house<br /><em>kept</em> quiet.</h1>
        </div>
        <div className={m ? 'mt-7' : 'self-end pb-3'}>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#6b655b]">Eleven rooms above a walled garden, an hour from the sea. Breakfast is served until you are ready for it.</p>
          <a href="#" onClick={e => e.preventDefault()} className="group mt-6 inline-flex items-center gap-3 text-[#1c1a17]" style={label}>Discover the house <ArrowRight size={14} className="le-a transition-transform duration-500 group-hover:translate-x-2" /></a>
        </div>
      </header>

      <section className={`border-t border-[#1c1a17]/15 ${m ? 'px-5 py-7' : 'grid grid-cols-[1fr_1.4fr] gap-12 px-12 py-9'}`}>
        <ul>
          {rooms.map((r, k) => (
            <li key={r.n} className="border-b border-[#1c1a17]/15">
              <button onClick={() => setI(k)} aria-pressed={i === k} className={`le-a flex w-full items-baseline justify-between gap-4 py-4 text-left transition-colors duration-500 ${i === k ? 'text-[#1c1a17]' : 'text-[#6b655b] hover:text-[#1c1a17]'}`}>
                <span className={m ? 'text-2xl' : 'text-3xl'} style={{ fontFamily: display }}>{r.n}</span>
                <span style={label}>{r.p}</span>
              </button>
            </li>
          ))}
        </ul>
        <figure className={m ? 'mt-6' : ''}>
          <div key={room.n} className={`le-a ${m ? 'h-40' : 'h-52'}`} style={{ background: room.g, animation: 'le-fade 1.1s ease both' }} />
          <figcaption className="mt-3 flex justify-between text-[#6b655b]" style={label}><span>{room.d}</span><span>0{i + 1} / 0{rooms.length}</span></figcaption>
        </figure>
      </section>
    </div>
  )
}
