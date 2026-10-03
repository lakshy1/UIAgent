import { useEffect, useRef, useState } from 'react'
import { Play, Pause, SkipForward } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'retro-synthwave',
  title: 'Retro Synthwave',
  family: 'Retro',
  era: 'Revived since 2011 (Drive, Stranger Things, outrun)',
  idea: '80s arcade and radio station landing page',
  description:
    'Synthwave recreates an imagined 1980s future with neon gradients, a perspective grid horizon and a striped sun. It feels nostalgic, electric and cinematic.',
  traits: ['Neon glow on dark violet', 'Perspective grid horizon', 'Striped gradient sun', 'Chrome-like wide display type', 'CRT scanline overlay', 'Magenta to cyan gradients'],
  palette: [
    { name: 'Midnight', hex: '#12062b' },
    { name: 'Neon Magenta', hex: '#ff2bd6' },
    { name: 'Cyan', hex: '#19f0ff' },
    { name: 'Sunset', hex: '#ff9f1c' },
    { name: 'Violet', hex: '#7a2cff' },
  ],
  fonts: 'Orbitron + Space Mono',
  useFor: ['Music and gaming brands', 'Retro event posters', 'Podcasts and radio'],
  avoid: ['Corporate B2B', 'Text-heavy docs', 'Low-contrast small copy'],
  signature: `background: linear-gradient(#12062b, #3a0f6b);
text-shadow: 0 0 8px #ff2bd6, 0 0 24px #ff2bd6;
background-image:
  linear-gradient(#ff2bd6 1px, transparent 1px),
  linear-gradient(90deg, #ff2bd6 1px, transparent 1px);
transform: perspective(300px) rotateX(60deg);
background: repeating-linear-gradient(transparent 0 2px, #0003 2px 4px); /* scanlines */`,
} as const satisfies StyleMeta

const tracks = [
  { t: 'Midnight Driver', a: 'Kavinsky Echo', bpm: 118 },
  { t: 'Laser Palms', a: 'The Chrome Tapes', bpm: 124 },
  { t: 'Neon Rain', a: 'Vector Hearts', bpm: 110 },
]
const neon = (c: string) => `0 0 6px ${c}, 0 0 20px ${c}`

export default function RetroSynthwave({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [i, setI] = useState(0)
  const [play, setPlay] = useState(true)
  const stop = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => (stop.current ? clearInterval(id) : setI(x => (x + 1) % tracks.length)), 3200)
    return () => clearInterval(id)
  }, [])
  const T = tracks[i]

  return (
    <div className="relative h-full w-full overflow-auto" style={{ background: 'linear-gradient(#12062b 0%, #2a0a5e 55%, #12062b 100%)', color: '#f4e9ff', fontFamily: "'Space Mono', monospace" }}
      onPointerDown={() => (stop.current = true)} onKeyDown={() => (stop.current = true)}>
      <style>{`@keyframes sw-grid{to{background-position:0 48px}}@keyframes sw-eq{0%,100%{height:20%}50%{height:100%}}
      .sw-btn{transition:box-shadow .2s,transform .2s}.sw-btn:hover{box-shadow:0 0 14px #19f0ff,0 0 36px #19f0ff;transform:translateY(-2px)}
      @media (prefers-reduced-motion:reduce){.sw-a{animation:none!important}}`}</style>

      <div className="pointer-events-none absolute inset-0 z-20" style={{ background: 'repeating-linear-gradient(transparent 0 2px, rgba(0,0,0,.22) 2px 4px)' }} />

      <nav className="relative z-10 flex items-center justify-between px-6 py-4 text-[12px] uppercase tracking-[0.2em]">
        <span style={{ fontFamily: "'Orbitron'", fontWeight: 900, color: '#19f0ff', textShadow: neon('#19f0ff') }}>FM 88.4 / OUTRUN</span>
        {!m && <div className="flex gap-6" style={{ color: '#c9b2ff' }}>{['Shows', 'Arcade', 'Merch'].map(l => <a key={l} href="#" onClick={e => e.preventDefault()} className="hover:text-[#ff2bd6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#19f0ff]">{l}</a>)}</div>}
      </nav>

      <header className="relative flex flex-col items-center overflow-hidden px-6 pt-8 text-center" style={{ height: m ? 440 : 470 }}>
        <h1 className={`relative z-10 uppercase ${m ? 'text-[38px]' : 'text-[72px]'} leading-none`} style={{ fontFamily: "'Orbitron'", fontWeight: 900, letterSpacing: '0.08em', color: '#fff', textShadow: `${neon('#ff2bd6')}, 3px 3px 0 #7a2cff` }}>
          Night <span style={{ color: '#19f0ff', textShadow: neon('#19f0ff') }}>Drive</span> Radio
        </h1>
        <p className="relative z-10 mt-3 max-w-md text-[13px]" style={{ color: '#c9b2ff' }}>Twenty-four hours of analog synths, drum machines and neon highways.</p>
        <div className="absolute left-1/2 -translate-x-1/2 rounded-full" style={{ bottom: 120, width: m ? 200 : 280, height: m ? 200 : 280, background: 'linear-gradient(#ff9f1c, #ff2bd6)', WebkitMaskImage: 'repeating-linear-gradient(#000 0 70%, transparent 70% 74%, #000 74% 80%, transparent 80% 85%, #000 85% 100%)', boxShadow: '0 0 80px #ff2bd666' }} />
        <div className="absolute inset-x-0 bottom-0 h-[120px]" style={{ background: '#12062b', borderTop: '2px solid #ff2bd6', boxShadow: '0 -4px 20px #ff2bd6' }}>
          <div className="sw-a h-full w-full" style={{ backgroundImage: 'linear-gradient(#ff2bd6 1px, transparent 1px), linear-gradient(90deg, #ff2bd6 1px, transparent 1px)', backgroundSize: '48px 48px', transform: 'perspective(160px) rotateX(55deg) scale(2.4)', transformOrigin: 'top', animation: 'sw-grid 1.4s linear infinite', opacity: 0.75 }} />
        </div>
      </header>

      <section className={`relative z-10 mx-auto grid gap-4 px-6 pb-8 ${m ? 'grid-cols-1' : 'max-w-4xl grid-cols-[1.4fr_1fr]'}`}>
        <div className="p-5" style={{ background: '#1d0a40cc', border: '1px solid #19f0ff', boxShadow: `${neon('#19f0ff55')}, inset 0 0 20px #19f0ff22` }}>
          <p className="text-[11px] uppercase tracking-[0.25em]" style={{ color: '#ff2bd6' }}>{play ? 'On air' : 'Paused'}</p>
          <p className="mt-1 text-[22px]" style={{ fontFamily: "'Orbitron'", fontWeight: 700 }}>{T.t}</p>
          <p className="text-[13px]" style={{ color: '#c9b2ff' }}>{T.a} / {T.bpm} BPM</p>
          <div className="mt-4 flex h-10 items-end gap-1" aria-hidden>
            {Array.from({ length: 24 }).map((_, k) => <span key={k} className="sw-a w-full" style={{ background: k % 2 ? '#ff2bd6' : '#19f0ff', height: play ? undefined : '10%', animation: play ? `sw-eq ${0.6 + (k % 5) * 0.15}s ease-in-out infinite` : 'none' }} />)}
          </div>
          <div className="mt-4 flex gap-3">
            <button aria-label={play ? 'Pause' : 'Play'} onClick={() => setPlay(p => !p)} className="sw-btn grid h-11 w-11 place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" style={{ border: '2px solid #ff2bd6', color: '#ff2bd6', boxShadow: neon('#ff2bd666') }}>{play ? <Pause size={18} /> : <Play size={18} />}</button>
            <button aria-label="Next track" onClick={() => setI(x => (x + 1) % tracks.length)} className="sw-btn grid h-11 w-11 place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" style={{ border: '2px solid #19f0ff', color: '#19f0ff' }}><SkipForward size={18} /></button>
          </div>
        </div>
        <div className="p-5" style={{ background: '#1d0a40cc', border: '1px solid #ff2bd6' }}>
          <p className="text-[11px] uppercase tracking-[0.25em]" style={{ color: '#19f0ff' }}>Next up</p>
          {tracks.map((x, k) => <p key={x.t} className="mt-2 text-[13px]" style={{ color: k === i ? '#fff' : '#8a72c4', textShadow: k === i ? neon('#ff2bd6') : 'none' }}>{String(k + 1).padStart(2, '0')} {x.t}</p>)}
          <button className="sw-btn mt-4 w-full py-3 text-[12px] uppercase tracking-[0.2em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" style={{ fontFamily: "'Orbitron'", fontWeight: 700, background: 'linear-gradient(90deg,#ff2bd6,#7a2cff)', color: '#fff' }}>Insert coin</button>
        </div>
      </section>
    </div>
  )
}
