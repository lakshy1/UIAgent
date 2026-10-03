import { useEffect, useState } from 'react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'swiss-editorial',
  title: 'Swiss Editorial',
  family: 'Modern',
  era: 'Rooted in the 1950s International Style, revived in 2020s design magazines',
  idea: 'Design magazine issue site',
  description: 'A strict column grid, hairline rules and an asymmetric layout that pairs a large serif with a quiet grotesk. A single red accent marks what matters, the way a printed magazine would.',
  traits: ['Strict 12-column grid', 'Hairline rules between sections', 'Large serif display with small grotesk labels', 'Asymmetric whitespace', 'One red accent', 'Numbered indexes'],
  palette: [
    { name: 'Newsprint', hex: '#f4f1ea' },
    { name: 'Ink', hex: '#141414' },
    { name: 'Grey', hex: '#7a7a74' },
    { name: 'Rule', hex: '#d6d2c8' },
    { name: 'Signal Red', hex: '#e8321e' },
  ],
  fonts: 'DM Serif Display + Inter',
  useFor: ['Magazines and journals', 'Studio and agency portfolios', 'Cultural institutions'],
  avoid: ['Playful consumer apps', 'Dense dashboards', 'Image-free pages with weak copy'],
  signature: `display: grid;
grid-template-columns: repeat(12, 1fr);
gap: 24px;
border-top: 1px solid #141414;
font: 400 96px/0.95 'DM Serif Display';
letter-spacing: -0.02em;
.label { font: 500 11px Inter;
  text-transform: uppercase; letter-spacing: .12em; }
.accent { color: #e8321e; }`,
} as const satisfies StyleMeta

const D = "'DM Serif Display', serif"
const I = "'Inter', sans-serif"
const label = 'text-[11px] font-medium uppercase tracking-[0.12em]'

export default function SwissEditorial({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [sel, setSel] = useState(0)
  const [auto, setAuto] = useState(true)
  const items = [
    ['01', 'The Return of the Grid', 'Why a generation of studios is dropping decoration for structure.', 'Essay, 14 min'],
    ['02', 'Type Without Apology', 'Seven foundries on the case for big, plain letters.', 'Interview, 9 min'],
    ['03', 'Rooms for Quiet', 'Zurich architects design public space around absence.', 'Photo essay, 6 min'],
    ['04', 'A Poster Is a Argument', 'Reading three decades of protest graphics.', 'Archive, 11 min'],
  ]

  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setSel((s) => (s + 1) % items.length), 2800)
    return () => clearInterval(t)
  }, [auto, items.length])

  return (
    <div onPointerDown={() => setAuto(false)} onKeyDown={() => setAuto(false)} className="relative h-full w-full overflow-auto text-[#141414]" style={{ background: '#f4f1ea', fontFamily: I }}>
      <style>{`@keyframes sw-line{from{transform:scaleX(0)}}@media (prefers-reduced-motion:reduce){.sw-a{animation:none!important}}`}</style>
      <div className={m ? 'px-5' : 'px-10'}>
        <nav className={`flex items-center justify-between border-b border-[#141414] ${m ? 'py-3' : 'py-4'}`}>
          <span className={label}>Gridwork <span className="text-[#e8321e]">/</span> Issue 27</span>
          <div className={`flex gap-6 ${label} text-[#7a7a74]`}>
            {(m ? ['Menu'] : ['Issues', 'Index', 'Shop', 'Subscribe']).map((l) => <a key={l} href="#" className="transition hover:text-[#e8321e]">{l}</a>)}
          </div>
        </nav>

        <header className={`grid gap-6 border-b border-[#d6d2c8] ${m ? 'grid-cols-1 py-8' : 'grid-cols-12 py-12'}`}>
          <p className={`${label} text-[#e8321e] ${m ? '' : 'col-span-2'}`}>Autumn 2026</p>
          <h1 className={`${m ? 'text-[56px]' : 'col-span-7 text-[104px]'}`} style={{ fontFamily: D, lineHeight: 0.92, letterSpacing: '-0.02em' }}>
            Less, but <em className="text-[#e8321e]">louder.</em>
          </h1>
          <div className={m ? '' : 'col-span-3 self-end'}>
            <p className="text-sm leading-relaxed text-[#4a4a46]">Issue 27 asks what design looks like when it stops performing. 168 pages, four essays and one very large poster.</p>
            <a href="#" className="mt-4 inline-block border-b border-[#141414] pb-0.5 text-sm font-medium transition hover:border-[#e8321e] hover:text-[#e8321e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e8321e]">Read the editor's letter</a>
          </div>
        </header>

        <section className={`grid gap-6 py-8 ${m ? 'grid-cols-1' : 'grid-cols-12'}`}>
          <div className={m ? '' : 'col-span-2'}><p className={`${label} text-[#7a7a74]`}>In this issue</p></div>
          <ul className={m ? '' : 'col-span-6'} role="listbox" aria-label="Articles">
            {items.map((it, i) => (
              <li key={it[0]} className="relative border-t border-[#141414]">
                {sel === i && <span className="sw-a absolute left-0 top-[-1px] h-[3px] w-full origin-left bg-[#e8321e]" style={{ animation: 'sw-line .6s ease-out' }} />}
                <button role="option" aria-selected={sel === i} onClick={() => setSel(i)} className="grid w-full grid-cols-[48px_1fr] gap-2 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e8321e]">
                  <span className={`${label} pt-2 ${sel === i ? 'text-[#e8321e]' : 'text-[#7a7a74]'}`}>{it[0]}</span>
                  <span className={`transition-all ${sel === i ? 'text-[34px]' : 'text-[26px] text-[#7a7a74]'}`} style={{ fontFamily: D, lineHeight: 1.05 }}>{it[1]}</span>
                </button>
              </li>
            ))}
          </ul>
          <aside className={`${m ? 'border-t border-[#141414] pt-4' : 'col-span-4 border-l border-[#d6d2c8] pl-6'}`}>
            <p className={`${label} text-[#e8321e]`}>{items[sel][3]}</p>
            <p className="mt-3 text-[22px] leading-snug" style={{ fontFamily: D }}>{items[sel][2]}</p>
            <div className="mt-5 h-28 bg-[#141414]" style={{ backgroundImage: 'linear-gradient(90deg,#e8321e 0 33%,transparent 33%),repeating-linear-gradient(0deg,#f4f1ea22 0 1px,transparent 1px 14px)' }} aria-hidden />
          </aside>
        </section>

        <footer className={`grid gap-4 border-t border-[#141414] py-6 ${m ? 'grid-cols-1' : 'grid-cols-12 items-center'}`}>
          <p className={m ? 'text-2xl' : 'col-span-6 text-3xl'} style={{ fontFamily: D }}>Four issues a year. No ads.</p>
          <button className={`bg-[#141414] px-6 py-3 text-sm font-medium text-[#f4f1ea] transition hover:bg-[#e8321e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8321e] ${m ? '' : 'col-span-3 col-start-10'}`}>Subscribe, 64 EUR</button>
        </footer>
      </div>
    </div>
  )
}
