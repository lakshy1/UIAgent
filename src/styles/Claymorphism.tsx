import { useEffect, useRef, useState } from 'react'
import { Star, Rocket, Calculator, Palette, BookOpen, Sparkles } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'claymorphism',
  title: 'Claymorphism',
  family: 'Soft surfaces',
  era: 'Popular since 2021 (3D-illustration UI wave)',
  idea: 'Kids learning app',
  description: 'Chunky, inflated shapes with inner highlights and soft outer shadows make everything look like modelling clay. It feels playful, friendly and touchable.',
  traits: ['very large radii', 'inner light + inner dark shadows', 'soft coloured outer drop shadow', 'pastel palette', 'rounded friendly type', 'bouncy press feedback'],
  palette: [
    { name: 'Cream', hex: '#fff4e6' },
    { name: 'Peach', hex: '#ffb59e' },
    { name: 'Mint', hex: '#9ee6c5' },
    { name: 'Sky', hex: '#9cc9ff' },
    { name: 'Lilac', hex: '#c8b2ff' },
    { name: 'Cocoa', hex: '#5a3e5c' },
  ],
  fonts: 'Nunito',
  useFor: ['Kids and education apps', 'Playful onboarding and mascots', 'Friendly fintech and health'],
  avoid: ['Serious enterprise tools', 'Data-dense tables', 'Many nested clay layers (visual noise)'],
  signature: `border-radius: 32px;
background: #ffb59e;
box-shadow:
  12px 14px 24px rgba(255,150,120,0.45),
  inset -8px -8px 14px rgba(0,0,0,0.12),
  inset 8px 8px 14px rgba(255,255,255,0.65);`,
} as const satisfies StyleMeta

const clay = (c: string, glow: string) => ({
  background: c,
  boxShadow: `12px 14px 24px ${glow}, inset -8px -8px 14px rgba(0,0,0,0.12), inset 8px 8px 14px rgba(255,255,255,0.65)`,
})
const subjects = [
  { n: 'Space Maths', I: Calculator, c: '#ffb59e', g: 'rgba(255,150,120,0.45)', d: 'Count planets and solve rocket sums.' },
  { n: 'Colour Lab', I: Palette, c: '#c8b2ff', g: 'rgba(160,130,255,0.45)', d: 'Mix paints and meet the rainbow.' },
  { n: 'Story Forest', I: BookOpen, c: '#7fd8b3', g: 'rgba(90,200,160,0.45)', d: 'Read-along tales with talking trees.' },
]

export default function Claymorphism({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [stars, setStars] = useState(3)
  const [sel, setSel] = useState(0)
  const idle = useRef(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      if (!idle.current) return
      setSel((s) => (s + 1) % 3)
      setStars((s) => (s >= 5 ? 1 : s + 1))
    }, 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <div onPointerDown={() => (idle.current = false)} onKeyDown={() => (idle.current = false)}
      className="relative h-full w-full overflow-auto" style={{ background: '#fff4e6', color: '#5a3e5c', fontFamily: "'Nunito', sans-serif" }}>
      <style>{`@keyframes cl-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
      .cl-btn{transition:transform .15s}.cl-btn:hover{transform:translateY(-3px) scale(1.03)}.cl-btn:active{transform:scale(.94)}
      @media (prefers-reduced-motion:reduce){.cl-bob{animation:none!important}}`}</style>
      <div className={`mx-auto flex min-h-full flex-col gap-7 ${m ? 'p-4' : 'max-w-[1040px] p-8'}`}>
        <nav className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-2xl font-black"><span className="grid h-10 w-10 place-items-center rounded-2xl" style={clay('#9cc9ff', 'rgba(100,160,255,0.4)')}><Sparkles size={18} color="#fff" /></span>Tinkly</span>
          {!m && <div className="flex gap-6 font-bold"><a href="#a">Lessons</a><a href="#a">Games</a><a href="#a">Parents</a></div>}
          <button className="cl-btn rounded-full px-5 py-2 font-extrabold" style={clay('#9ee6c5', 'rgba(90,200,160,0.45)')}>Play</button>
        </nav>

        <div className={m ? 'flex flex-col gap-6' : 'grid grid-cols-2 items-center gap-8'}>
          <div>
            <h1 className={`font-black leading-[1.05] ${m ? 'text-4xl' : 'text-6xl'}`}>Learning is <span style={{ color: '#ff8a6b' }}>super</span> fun!</h1>
            <p className="mt-4 max-w-md text-lg font-semibold opacity-75">Bite-sized games for ages 4 to 8 that turn numbers, colours and stories into adventures.</p>
            <button className="cl-btn mt-6 rounded-[28px] px-8 py-4 text-lg font-black text-white" style={clay('#ff8a6b', 'rgba(255,120,90,0.5)')}>Start for free</button>
          </div>
          <div className="relative grid place-items-center" style={{ minHeight: m ? 200 : 280 }}>
            <div className="cl-bob grid h-44 w-44 place-items-center rounded-[56px]" style={{ ...clay('#c8b2ff', 'rgba(160,130,255,0.5)'), animation: 'cl-bob 3.2s ease-in-out infinite' }}>
              <Rocket size={80} color="#fff" strokeWidth={2.4} />
            </div>
            <div className="cl-bob absolute right-6 top-4 h-14 w-14 rounded-full" style={{ ...clay('#ffd86b', 'rgba(255,200,60,0.5)'), animation: 'cl-bob 2.6s ease-in-out infinite .4s' }} />
            <div className="cl-bob absolute bottom-4 left-6 h-10 w-10 rounded-full" style={{ ...clay('#9cc9ff', 'rgba(100,160,255,0.5)'), animation: 'cl-bob 3.6s ease-in-out infinite .8s' }} />
          </div>
        </div>

        <div className={`grid gap-5 ${m ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {subjects.map(({ n, I, c, g, d }, i) => (
            <button key={n} onClick={() => setSel(i)} aria-pressed={sel === i}
              className="cl-btn rounded-[36px] p-6 text-left focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#5a3e5c]"
              style={{ ...clay(c, g), outline: sel === i ? '4px solid #5a3e5c' : undefined, outlineOffset: 3 }}>
              <I size={34} color="#fff" strokeWidth={2.4} />
              <div className="mt-3 text-xl font-black text-white">{n}</div>
              <div className="font-semibold text-white/90">{d}</div>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[36px] p-5" style={clay('#ffffff', 'rgba(90,62,92,0.2)')}>
          <div><div className="font-black">Today's goal: {subjects[sel].n}</div><div className="text-sm font-semibold opacity-65">Tap a star to set your score</div></div>
          <div className="flex gap-2" role="group" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} aria-label={`${n} stars`} onClick={() => setStars(n)} className="cl-btn rounded-full p-1">
                <Star size={30} fill={n <= stars ? '#ffc93c' : '#f1e3d2'} color={n <= stars ? '#f0a500' : '#d9c6b0'} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
