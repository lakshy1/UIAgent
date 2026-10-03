import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'bauhaus',
  title: 'Bauhaus',
  family: 'Retro',
  era: '1919 to 1933 originally, a constant reference in graphic design ever since',
  idea: 'Design school open-day page',
  description: 'Circles, squares and triangles in red, yellow and blue on off-white, set on a strict grid with geometric sans type. It feels rational, bold and optimistic: form reduced to what it does.',
  traits: ['primary red, yellow and blue plus black', 'pure geometric shapes as illustration', 'geometric sans, often lowercase', 'strict grid with visible structure', 'asymmetric but balanced layouts', 'flat colour, no gradients or shadows'],
  palette: [
    { name: 'Paper', hex: '#f1ead9' },
    { name: 'Black', hex: '#161616' },
    { name: 'Red', hex: '#d93a26' },
    { name: 'Yellow', hex: '#f2b705' },
    { name: 'Blue', hex: '#1f4fa3' },
  ],
  fonts: 'Josefin Sans + Archivo',
  useFor: ['Schools, museums and cultural events', 'Posters, festivals and conference sites', 'Brands that want a confident, timeless look'],
  avoid: ['Products that need to feel soft or luxurious', 'Dense data screens', 'Adding gradients or shadows, which break the style'],
  signature: `--red: #d93a26; --yellow: #f2b705; --blue: #1f4fa3;
background: #f1ead9;
color: #161616;
font-family: 'Josefin Sans', sans-serif;
text-transform: lowercase;
/* shapes are the illustration */
.circle { border-radius: 50%; background: var(--red); }
.square { background: var(--blue); }
.triangle { clip-path: polygon(50% 0, 100% 100%, 0 100%); background: var(--yellow); }`,
} as const satisfies StyleMeta

const J = "'Josefin Sans', sans-serif"
const courses = [
  { n: '01', t: 'form', d: 'Point, line and plane.', c: '#d93a26' },
  { n: '02', t: 'colour', d: 'Contrast, weight and warmth.', c: '#f2b705' },
  { n: '03', t: 'type', d: 'Letters as built objects.', c: '#1f4fa3' },
]

export default function Bauhaus({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [turn, setTurn] = useState(0)
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setTurn(v => v + 1), 2200)
    return () => clearInterval(t)
  }, [auto])
  const active = turn % courses.length
  return (
    <div onPointerDown={() => setAuto(false)} onKeyDown={() => setAuto(false)} className="h-full w-full overflow-auto text-[#161616]" style={{ background: '#f1ead9', fontFamily: "'Archivo', sans-serif" }}>
      <style>{`@media (prefers-reduced-motion:reduce){.bh-a{animation:none!important;transition:none!important}}`}</style>
      <nav className={`flex items-center justify-between border-b-2 border-[#161616] ${m ? 'px-4 py-3' : 'px-10 py-4'}`}>
        <span className="flex items-center gap-2 text-xl font-bold lowercase" style={{ fontFamily: J }}>
          <span className="size-4 rounded-full bg-[#d93a26]" /><span className="size-4 bg-[#1f4fa3]" /><span className="size-4 bg-[#f2b705]" style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} />
          werkhaus
        </span>
        {!m && <div className="flex gap-7 text-sm lowercase">{['programme', 'studios', 'visit'].map(l => <a key={l} href="#" onClick={e => e.preventDefault()} className="underline-offset-4 hover:underline">{l}</a>)}</div>}
        <a href="#" onClick={e => e.preventDefault()} className="bg-[#161616] px-4 py-2 text-sm font-semibold lowercase text-[#f1ead9] transition-colors hover:bg-[#d93a26]">apply</a>
      </nav>

      <header className={`grid border-b-2 border-[#161616] ${m ? 'grid-cols-1' : 'grid-cols-[1.2fr_1fr]'}`}>
        <div className={m ? 'px-4 py-8' : 'px-10 py-12'}>
          <p className="text-sm font-semibold lowercase tracking-wide text-[#1f4fa3]">open day · 14 march</p>
          <h1 className={`mt-3 font-bold lowercase ${m ? 'text-5xl leading-[0.95]' : 'text-[88px] leading-[0.9]'}`} style={{ fontFamily: J, letterSpacing: '-0.03em' }}>less,<br />but<br />built.</h1>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed">A school where painting, building and typography share one workshop. Come and make something on the day.</p>
        </div>
        <div className={`relative overflow-hidden ${m ? 'h-52 border-t-2 border-[#161616]' : 'border-l-2 border-[#161616]'}`} aria-hidden>
          <span className="bh-a absolute left-[12%] top-[14%] aspect-square w-[46%] rounded-full bg-[#d93a26] transition-transform duration-1000" style={{ transform: `translateX(${active === 0 ? 0 : 14}%)` }} />
          <span className="bh-a absolute bottom-[10%] right-[10%] aspect-square w-[42%] bg-[#1f4fa3] transition-transform duration-1000" style={{ transform: `rotate(${active * 30}deg)` }} />
          <span className="bh-a absolute bottom-[12%] left-[20%] aspect-square w-[34%] bg-[#f2b705] transition-transform duration-1000" style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', transform: `translateY(${active === 2 ? -18 : 0}%)` }} />
          <span className="absolute right-[18%] top-[16%] h-[38%] w-2 bg-[#161616]" />
          <span className="absolute right-[10%] top-[30%] h-2 w-[26%] bg-[#161616]" />
        </div>
      </header>

      <section className={`grid ${m ? 'grid-cols-1' : 'grid-cols-3'}`}>
        {courses.map((c, i) => (
          <button key={c.n} onClick={() => setTurn(i)} aria-pressed={active === i}
            className={`bh-a group flex items-start justify-between gap-4 border-[#161616] text-left transition-colors duration-500 ${m ? 'border-b-2 px-4 py-5' : `px-8 py-7 ${i < 2 ? 'border-r-2' : ''}`}`}
            style={{ background: active === i ? c.c : 'transparent', color: active === i && c.c !== '#f2b705' ? '#f1ead9' : '#161616' }}>
            <span>
              <span className="text-sm font-semibold">{c.n}</span>
              <span className="mt-1 block text-4xl font-bold lowercase" style={{ fontFamily: J }}>{c.t}</span>
              <span className="mt-1 block text-sm">{c.d}</span>
            </span>
            <ArrowUpRight size={22} className="bh-a shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        ))}
      </section>
    </div>
  )
}
