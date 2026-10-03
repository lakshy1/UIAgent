import { useEffect, useRef, useState } from 'react'
import { Play, Pause, SkipForward, SkipBack, Heart, Search, Disc3 } from 'lucide-react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'glassmorphism',
  title: 'Glassmorphism',
  family: 'Soft surfaces',
  era: 'Popular since 2020 (Apple Big Sur, Windows 11 acrylic)',
  idea: 'Music streaming landing page',
  description: 'Translucent frosted panels float over a vivid gradient, blurring what sits behind them. It feels airy, layered and premium, like looking through a window.',
  traits: ['backdrop-filter blur', 'translucent white fills', '1px light borders', 'vivid gradient backdrop', 'soft large shadows', 'layered depth'],
  palette: [
    { name: 'Midnight', hex: '#1b1040' },
    { name: 'Violet', hex: '#7c3aed' },
    { name: 'Hot pink', hex: '#ec4899' },
    { name: 'Cyan', hex: '#22d3ee' },
    { name: 'Frost', hex: '#ffffff' },
  ],
  fonts: 'Inter + Bricolage Grotesque',
  useFor: ['Media players and dashboards', 'Weather and finance widgets', 'Hero overlays on rich backgrounds'],
  avoid: ['Plain or low-contrast backdrops', 'Dense text-heavy pages', 'Low-end devices (blur is costly)'],
  signature: `background: rgba(255,255,255,0.14);
backdrop-filter: blur(18px) saturate(160%);
border: 1px solid rgba(255,255,255,0.28);
border-radius: 24px;
box-shadow: 0 8px 32px rgba(20,10,60,0.35),
  inset 0 1px 0 rgba(255,255,255,0.35);`,
} as const satisfies StyleMeta

const glass: React.CSSProperties = {
  background: 'rgba(255,255,255,0.14)',
  backdropFilter: 'blur(18px) saturate(160%)',
  WebkitBackdropFilter: 'blur(18px) saturate(160%)',
  border: '1px solid rgba(255,255,255,0.28)',
  boxShadow: '0 8px 32px rgba(20,10,60,0.35), inset 0 1px 0 rgba(255,255,255,0.35)',
}
const lists = [
  { n: 'Neon Drive', a: 'Night Cartel', c: 'from-[#ec4899] to-[#7c3aed]' },
  { n: 'Slow Tide', a: 'Marlow & Ivy', c: 'from-[#22d3ee] to-[#7c3aed]' },
  { n: 'Afterglow', a: 'Sunroom', c: 'from-[#f59e0b] to-[#ec4899]' },
]

export default function Glassmorphism({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [playing, setPlaying] = useState(true)
  const [sel, setSel] = useState(0)
  const [pct, setPct] = useState(32)
  const [liked, setLiked] = useState(false)
  const idle = useRef(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      if (playing) setPct((p) => (p >= 100 ? 0 : p + 1))
    }, 300)
    const c = setInterval(() => idle.current && setSel((s) => (s + 1) % 3), 3500)
    return () => { clearInterval(t); clearInterval(c) }
  }, [playing])

  const stop = () => { idle.current = false }
  const cur = lists[sel]

  return (
    <div
      onPointerDown={stop} onKeyDown={stop}
      className="relative h-full w-full overflow-auto text-white"
      style={{ background: 'linear-gradient(135deg,#1b1040 0%,#3b1a7a 45%,#be185d 100%)', fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`@keyframes gl-blob{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,-30px) scale(1.15)}}
      @keyframes gl-spin{to{transform:rotate(360deg)}}
      @media (prefers-reduced-motion:reduce){.gl-b{animation:none!important}}`}</style>
      <div className="gl-b absolute -left-10 top-10 h-72 w-72 rounded-full bg-[#22d3ee] opacity-60 blur-3xl" style={{ animation: 'gl-blob 9s ease-in-out infinite' }} />
      <div className="gl-b absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#ec4899] opacity-60 blur-3xl" style={{ animation: 'gl-blob 11s ease-in-out infinite reverse' }} />
      <div className="gl-b absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#7c3aed] opacity-70 blur-3xl" style={{ animation: 'gl-blob 13s ease-in-out infinite' }} />

      <div className={`relative z-10 mx-auto flex min-h-full flex-col gap-5 ${m ? 'p-4' : 'max-w-[1040px] p-8'}`}>
        <nav style={glass} className="flex items-center justify-between rounded-full px-5 py-3">
          <span className="flex items-center gap-2 text-lg font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            <Disc3 size={20} /> Auralis
          </span>
          {!m && <div className="flex gap-7 text-sm text-white/80"><a href="#a" className="hover:text-white">Discover</a><a href="#a" className="hover:text-white">Playlists</a><a href="#a" className="hover:text-white">Artists</a></div>}
          <div className="flex items-center gap-2">
            <button aria-label="Search" className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition hover:bg-white/30"><Search size={16} /></button>
            {!m && <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#3b1a7a] transition hover:scale-105">Try free</button>}
          </div>
        </nav>

        <div className={m ? 'flex flex-col gap-5' : 'grid grid-cols-[1.1fr_1fr] items-center gap-8 pt-4'}>
          <div>
            <p className="mb-3 inline-block rounded-full px-3 py-1 text-xs tracking-wide" style={glass}>40M tracks, zero ads for 3 months</p>
            <h1 className={`font-extrabold leading-[1.02] ${m ? 'text-4xl' : 'text-6xl'}`} style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Music that<br />feels like light.
            </h1>
            <p className="mt-4 max-w-md text-white/75">Lossless streaming, mood-aware mixes and offline listening on every device you own.</p>
            <div className="mt-6 flex gap-3">
              <button className="rounded-full bg-white px-6 py-3 font-semibold text-[#3b1a7a] shadow-lg transition hover:scale-105 active:scale-95">Start listening</button>
              <button style={glass} className="rounded-full px-6 py-3 font-semibold transition hover:bg-white/25">See plans</button>
            </div>
          </div>

          <div style={glass} className="rounded-3xl p-5">
            <div className={`mb-4 grid w-full place-items-center rounded-2xl bg-gradient-to-br ${cur.c}`} style={{ height: m ? 170 : 190 }}>
              <Disc3 size={64} className="opacity-80" style={{ animation: playing ? 'gl-spin 6s linear infinite' : 'none' }} />
            </div>
            <div className="flex items-center justify-between">
              <div><div className="font-semibold">{cur.n}</div><div className="text-sm text-white/65">{cur.a}</div></div>
              <button aria-label="Like" aria-pressed={liked} onClick={() => setLiked(!liked)} className="transition active:scale-90"><Heart size={20} fill={liked ? '#ec4899' : 'none'} color={liked ? '#ec4899' : '#fff'} /></button>
            </div>
            <input aria-label="Seek" type="range" min={0} max={100} value={pct} onChange={(e) => setPct(+e.target.value)} className="my-3 w-full accent-white" />
            <div className="flex items-center justify-center gap-5">
              <button aria-label="Previous" onClick={() => setSel((sel + 2) % 3)} className="text-white/80 hover:text-white"><SkipBack size={20} /></button>
              <button aria-label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying(!playing)} className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#3b1a7a] transition hover:scale-105 active:scale-95">
                {playing ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button aria-label="Next" onClick={() => setSel((sel + 1) % 3)} className="text-white/80 hover:text-white"><SkipForward size={20} /></button>
            </div>
          </div>
        </div>

        <div className={`grid gap-4 ${m ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {lists.map((l, i) => (
            <button key={l.n} onClick={() => setSel(i)} style={{ ...glass, background: i === sel ? 'rgba(255,255,255,0.26)' : glass.background }}
              className="flex items-center gap-3 rounded-2xl p-3 text-left transition hover:-translate-y-0.5 hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
              <span className={`h-12 w-12 rounded-xl bg-gradient-to-br ${l.c}`} />
              <span><span className="block font-semibold">{l.n}</span><span className="text-sm text-white/65">{l.a}</span></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
