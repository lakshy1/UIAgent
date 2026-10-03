import { useEffect, useRef, useState } from 'react'
import { Mic, Play, Square, Circle } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'skeuomorphism',
  title: 'Skeuomorphism',
  family: 'Soft surfaces',
  era: 'Dominant 2007-2013 (iOS 6, Mac OS X Lion)',
  idea: 'Audio-gear and notebook app',
  description: 'Interfaces imitate real materials such as leather, brushed metal and paper, with realistic lighting and stitching. It feels tactile, nostalgic and familiar.',
  traits: ['material textures via gradients', 'stitched edges', 'metal knobs with specular highlights', 'layered realistic shadows', 'embossed / debossed text', 'LED and VU meters'],
  palette: [
    { name: 'Leather', hex: '#5b3a24' },
    { name: 'Dark leather', hex: '#2e1c10' },
    { name: 'Brushed steel', hex: '#d4d6da' },
    { name: 'Paper', hex: '#f6edb5' },
    { name: 'LED red', hex: '#ff3b2f' },
    { name: 'Brass', hex: '#d9a441' },
  ],
  fonts: 'DM Serif Display + Space Mono',
  useFor: ['Music and audio tools', 'Notes, calendars, journals', 'Hardware companion apps'],
  avoid: ['Fast, data-heavy dashboards', 'Responsive layouts with many breakpoints', 'Contexts where it looks dated'],
  signature: `background: linear-gradient(145deg,#f4f5f7,#9a9da3);
border-radius: 50%;
box-shadow: 0 6px 10px rgba(0,0,0,.6),
  inset 0 2px 1px rgba(255,255,255,.9),
  inset 0 -3px 4px rgba(0,0,0,.35);
/* stitching */
border: 2px dashed rgba(240,210,150,.7);`,
} as const satisfies StyleMeta

const leather = {
  background: 'radial-gradient(circle at 30% 20%, #6e4a30 0%, #5b3a24 50%, #3a2314 100%)',
  boxShadow: '0 10px 24px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.2), inset 0 -2px 6px rgba(0,0,0,.5)',
}
const stitch = { border: '2px dashed rgba(240,210,150,.65)' }

function Knob({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative grid h-20 w-20 place-items-center rounded-full" style={{ background: '#1a1008', boxShadow: 'inset 0 3px 6px #000, 0 1px 0 rgba(255,255,255,.2)' }}>
        <div className="relative h-16 w-16 rounded-full transition-transform duration-300" style={{ transform: `rotate(${-135 + value * 2.7}deg)`,
          background: 'conic-gradient(from 0deg,#f4f5f7,#9a9da3,#f4f5f7,#8b8e94,#f4f5f7)',
          boxShadow: '0 6px 10px rgba(0,0,0,.7), inset 0 2px 1px rgba(255,255,255,.9), inset 0 -3px 4px rgba(0,0,0,.35)' }}>
          <span className="absolute left-1/2 top-1.5 h-4 w-1.5 -translate-x-1/2 rounded bg-[#ff3b2f]" style={{ boxShadow: '0 0 6px #ff3b2f' }} />
        </div>
        <input type="range" aria-label={label} min={0} max={100} value={value} onChange={(e) => onChange(+e.target.value)} className="absolute inset-0 cursor-pointer opacity-0" />
      </div>
      <span className="text-[11px] font-bold uppercase tracking-widest text-[#e8d3a8]" style={{ fontFamily: "'Space Mono', monospace", textShadow: '0 -1px 0 #000' }}>{label}</span>
    </div>
  )
}

export default function Skeuomorphism({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [k, setK] = useState([40, 65, 30])
  const [rec, setRec] = useState(true)
  const [lvl, setLvl] = useState(50)
  const idle = useRef(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      setLvl(20 + Math.round(Math.random() * 70))
      if (idle.current) setK((a) => a.map((v, i) => (i === Math.floor(Date.now() / 1800) % 3 ? (v + 9) % 100 : v)))
    }, 700)
    return () => clearInterval(t)
  }, [])

  const names = ['Gain', 'Tone', 'Level']
  return (
    <div onPointerDown={() => (idle.current = false)} onKeyDown={() => (idle.current = false)}
      className="h-full w-full overflow-auto" style={{ background: 'repeating-linear-gradient(90deg,#2b1a0e 0 3px,#26170c 3px 6px)', fontFamily: "'Space Mono', monospace" }}>
      <style>{`.sk-b{transition:transform .08s}.sk-b:active{transform:translateY(3px)}`}</style>
      <div className={`mx-auto flex min-h-full flex-col gap-6 ${m ? 'p-4' : 'max-w-[1040px] p-8'}`}>
        <header className="flex items-center justify-between rounded-xl px-5 py-3" style={{ ...leather, ...stitch }}>
          <span className="text-2xl text-[#f3dfb4]" style={{ fontFamily: "'DM Serif Display', serif", textShadow: '0 -1px 0 #000, 0 1px 0 rgba(255,255,255,.2)' }}>Tapewright</span>
          {!m && <span className="text-xs uppercase tracking-widest text-[#d9a441]">Analog recorder & field notebook</span>}
          <span className="h-3 w-3 rounded-full" style={{ background: rec ? '#ff3b2f' : '#4a1410', boxShadow: rec ? '0 0 10px #ff3b2f' : 'inset 0 1px 2px #000' }} />
        </header>

        <div className={m ? 'flex flex-col gap-6' : 'grid grid-cols-[1.25fr_1fr] gap-7'}>
          <section className="rounded-2xl p-5" style={{ background: 'linear-gradient(180deg,#e4e6ea,#a9acb2 55%,#c9cbd0)', boxShadow: '0 12px 28px rgba(0,0,0,.65), inset 0 2px 1px #fff, inset 0 -3px 5px rgba(0,0,0,.35)' }}>
            <h1 className={`mb-4 text-[#3a3d44] ${m ? 'text-3xl' : 'text-4xl'}`} style={{ fontFamily: "'DM Serif Display', serif", textShadow: '0 1px 0 rgba(255,255,255,.9)' }}>Record every idea.</h1>
            <div className="mb-4 rounded-lg p-3" style={{ background: '#15100a', boxShadow: 'inset 0 4px 8px #000' }}>
              <div className="mb-1 flex justify-between text-[10px] text-[#d9a441]"><span>VU</span><span>{rec ? 'REC 00:42' : 'STANDBY'}</span></div>
              <div className="flex gap-1">
                {Array.from({ length: 20 }).map((_, i) => {
                  const lit = rec && i < lvl / 5
                  return <span key={i} className="h-5 flex-1 rounded-sm" style={{ background: lit ? (i > 15 ? '#ff3b2f' : i > 11 ? '#ffc93c' : '#5bd66a') : '#2a2a22' }} />
                })}
              </div>
            </div>
            <div className="flex justify-between gap-2">
              {names.map((n, i) => <Knob key={n} label={n} value={k[i]} onChange={(v) => setK(k.map((x, j) => (j === i ? v : x)))} />)}
            </div>
            <div className="mt-5 flex gap-3">
              {[{ I: Play, l: 'Play', v: true }, { I: Square, l: 'Stop', v: false }].map(({ I, l, v }) => (
                <button key={l} aria-label={l} onClick={() => setRec(v)} className="sk-b grid h-12 flex-1 place-items-center rounded-lg text-[#3a3d44]" style={{ background: 'linear-gradient(#fafafa,#b4b7bd)', boxShadow: '0 4px 0 #7d8087, 0 6px 8px rgba(0,0,0,.5), inset 0 1px 0 #fff' }}><I size={18} /></button>
              ))}
              <button aria-label="Record" aria-pressed={rec} onClick={() => setRec(!rec)} className="sk-b grid h-12 flex-1 place-items-center rounded-lg text-white" style={{ background: 'linear-gradient(#ff6a5e,#b3140a)', boxShadow: '0 4px 0 #6b0b05, 0 6px 8px rgba(0,0,0,.5), inset 0 1px 0 #ffb0a8' }}><Circle size={18} fill="#fff" /></button>
            </div>
          </section>

          <section className="relative rounded-md p-5 pt-8 text-[#3b3320]" style={{ background: 'repeating-linear-gradient(#f6edb5 0 27px,#d9c870 27px 28px)', boxShadow: '0 12px 24px rgba(0,0,0,.6), inset 0 0 40px rgba(150,110,30,.35)', transform: m ? undefined : 'rotate(1.2deg)' }}>
            <span className="absolute left-0 right-0 top-0 h-5" style={{ background: 'linear-gradient(#b8332a,#7a1c16)', boxShadow: '0 2px 3px rgba(0,0,0,.4)' }} />
            <div className="mb-1 text-xl font-bold" style={{ fontFamily: "'DM Serif Display', serif" }}>Session notes</div>
            <ul className="text-[13px] leading-[28px]">
              <li>Take 3: warm bass, less gain</li>
              <li>Mic at 30cm, room tone ok</li>
              <li className="flex items-center gap-2"><Mic size={13} /> Vocal pass after lunch</li>
              <li>Bounce to cassette sim</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
