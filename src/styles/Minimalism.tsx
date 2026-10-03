import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'minimalism',
  title: 'Minimalism',
  family: 'Less and more',
  era: 'Timeless; web revival since 2015 (Swiss style, Muji, Aesop)',
  idea: 'Architect and ceramics studio portfolio',
  description:
    'Minimalism removes everything that does not carry meaning, leaving vast whitespace, hairline rules and a single accent. It feels calm, expensive and confident.',
  traits: ['Vast whitespace', 'One accent colour', '1px hairline dividers', 'Generous, light type', 'No shadows or gradients', 'Slow, quiet motion'],
  palette: [
    { name: 'Paper', hex: '#fafaf7' },
    { name: 'Ink', hex: '#141412' },
    { name: 'Stone', hex: '#8c8a83' },
    { name: 'Hairline', hex: '#e3e1da' },
    { name: 'Clay', hex: '#c2410c' },
  ],
  fonts: 'Fraunces + Instrument Sans',
  useFor: ['Architecture and design studios', 'Luxury and craft brands', 'Photography portfolios'],
  avoid: ['Dense dashboards', 'Playful kids brands', 'Content needing many CTAs'],
  signature: `background: #fafaf7;
color: #141412;
border-bottom: 1px solid #e3e1da;
font-family: 'Fraunces', serif;
font-weight: 300;
letter-spacing: -0.02em;
padding: 12vh 8vw;
--accent: #c2410c; /* used once per screen */`,
} as const satisfies StyleMeta

const works = [
  { n: '01', t: 'House of Folded Light', k: 'Residential', y: '2025', loc: 'Kyoto' },
  { n: '02', t: 'Salt Kiln Studio', k: 'Ceramics', y: '2025', loc: 'Lisbon' },
  { n: '03', t: 'Quiet Library', k: 'Public', y: '2024', loc: 'Oslo' },
  { n: '04', t: 'Porcelain Tableware', k: 'Ceramics', y: '2024', loc: 'Arita' },
  { n: '05', t: 'Courtyard Residence', k: 'Residential', y: '2023', loc: 'Mexico City' },
]
const filters = ['All', 'Residential', 'Ceramics', 'Public']

export default function Minimalism({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [f, setF] = useState('All')
  const [hover, setHover] = useState<string | null>(null)
  const stop = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let i = 0
    const id = setInterval(() => {
      if (stop.current) return clearInterval(id)
      i = (i + 1) % filters.length
      setF(filters[i])
    }, 2600)
    return () => clearInterval(id)
  }, [])
  const list = works.filter(w => f === 'All' || w.k === f)
  const px = m ? 'px-6' : 'px-16'

  return (
    <div
      className="relative h-full w-full overflow-auto"
      style={{ background: '#fafaf7', color: '#141412', fontFamily: "'Instrument Sans', sans-serif" }}
      onPointerDown={() => (stop.current = true)}
      onKeyDown={() => (stop.current = true)}
    >
      <style>{`.mn-in{animation:mn-in .7s ease both}@keyframes mn-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
      @media (prefers-reduced-motion:reduce){.mn-in{animation:none}}`}</style>
      <nav className={`flex items-center justify-between py-6 text-[13px] ${px}`} style={{ borderBottom: '1px solid #e3e1da' }}>
        <span className="tracking-[0.2em] uppercase">Ono &amp; Vale</span>
        <div className="flex gap-6" style={{ color: '#8c8a83' }}>
          {(m ? ['Index', 'Contact'] : ['Work', 'Studio', 'Journal', 'Contact']).map(l => (
            <a key={l} href="#" onClick={e => e.preventDefault()} className="transition-colors hover:text-[#c2410c] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#c2410c]">{l}</a>
          ))}
        </div>
      </nav>

      <header className={`${px} ${m ? 'pt-20 pb-16' : 'pt-32 pb-28'}`}>
        <p className="text-[12px] tracking-[0.2em] uppercase" style={{ color: '#c2410c' }}>Architecture and ceramics</p>
        <h1 className={`mt-8 max-w-3xl ${m ? 'text-[44px]' : 'text-[84px]'} leading-[1.02]`} style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, letterSpacing: '-0.03em' }}>
          Rooms and vessels, made slowly.
        </h1>
        <p className="mt-8 max-w-md text-[15px] leading-7" style={{ color: '#8c8a83' }}>
          A two-person studio in Lisbon designing houses, libraries and the tableware that lives inside them.
        </p>
      </header>

      <section className={px} aria-label="Selected work">
        <div className="flex flex-wrap gap-x-6 gap-y-2 pb-4 text-[13px]" style={{ borderBottom: '1px solid #e3e1da' }}>
          {filters.map(x => (
            <button key={x} onClick={() => setF(x)} aria-pressed={f === x}
              className="pb-1 transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#c2410c]"
              style={{ color: f === x ? '#141412' : '#8c8a83', borderBottom: `1px solid ${f === x ? '#c2410c' : 'transparent'}` }}>
              {x}
            </button>
          ))}
        </div>
        <ul>
          {list.map(w => (
            <li key={w.n} className="mn-in" style={{ borderBottom: '1px solid #e3e1da' }}>
              <a href="#" onClick={e => e.preventDefault()} onMouseEnter={() => setHover(w.n)} onMouseLeave={() => setHover(null)}
                className={`grid items-baseline gap-4 py-6 ${m ? 'grid-cols-[28px_1fr_auto]' : 'grid-cols-[60px_1fr_160px_100px_24px]'}`}>
                <span className="text-[12px]" style={{ color: '#8c8a83' }}>{w.n}</span>
                <span className={m ? 'text-[20px]' : 'text-[28px]'} style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, color: hover === w.n ? '#c2410c' : '#141412', transition: 'color .3s, transform .3s', transform: hover === w.n ? 'translateX(8px)' : 'none' }}>{w.t}</span>
                {!m && <span className="text-[13px]" style={{ color: '#8c8a83' }}>{w.k}, {w.loc}</span>}
                <span className="text-[13px]" style={{ color: '#8c8a83' }}>{w.y}</span>
                {!m && <ArrowUpRight size={16} strokeWidth={1} style={{ opacity: hover === w.n ? 1 : 0, color: '#c2410c', transition: 'opacity .3s' }} />}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className={`${px} ${m ? 'py-20' : 'py-32'} flex ${m ? 'flex-col gap-8' : 'items-end justify-between'}`}>
        <h2 className={m ? 'text-[32px]' : 'text-[48px]'} style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, letterSpacing: '-0.02em' }}>Begin a conversation.</h2>
        <a href="#" onClick={e => e.preventDefault()} className="self-start text-[14px] pb-1 transition-colors hover:text-[#c2410c] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#c2410c]" style={{ borderBottom: '1px solid #141412' }}>studio@onovale.example</a>
      </footer>
    </div>
  )
}
