import { useEffect, useRef, useState } from 'react'
import type { StyleMeta, Device } from './types'

export const meta = {
  id: 'retro-pixel',
  title: 'Retro Pixel',
  family: 'Retro',
  era: 'Nostalgic since the 1980s; indie revival since 2010',
  idea: 'Indie 8-bit game studio website',
  description:
    'Pixel style mimics 8-bit consoles with bitmap fonts, a tiny palette and chunky stair-stepped borders. It feels playful, handmade and instantly nostalgic.',
  traits: ['Bitmap fonts', 'Limited 5-colour palette', 'Stair-step pixel borders', 'No anti-aliased curves', 'Blinking cursor and blocky buttons', 'Hard offset shadows'],
  palette: [
    { name: 'Void', hex: '#1a1c2c' },
    { name: 'Grape', hex: '#5d275d' },
    { name: 'Blood', hex: '#b13e53' },
    { name: 'Gold', hex: '#ffcd75' },
    { name: 'Mint', hex: '#38b764' },
    { name: 'Sky', hex: '#41a6f6' },
  ],
  fonts: 'Press Start 2P + VT323',
  useFor: ['Indie game studios', 'Hackathons and dev events', 'Playful developer tools'],
  avoid: ['Finance or legal', 'Long reading text', 'Premium luxury brands'],
  signature: `font-family: 'Press Start 2P', monospace;
image-rendering: pixelated;
border-radius: 0;
box-shadow:
  -4px 0 0 0 #ffcd75, 4px 0 0 0 #ffcd75,
  0 -4px 0 0 #ffcd75, 0 4px 0 0 #ffcd75; /* pixel border */
animation: blink 1s steps(2) infinite;
transition: none; /* hard frame steps */`,
} as const satisfies StyleMeta

const games = [
  { n: 'MOSSY DEPTHS', g: 'ROGUELIKE', c: '#38b764', d: 'Descend a living cave. Every run regrows the map.' },
  { n: 'TINY TRAINS', g: 'PUZZLE', c: '#41a6f6', d: 'Lay track for a village of very impatient toy trains.' },
  { n: 'FROG ASTRO', g: 'PLATFORMER', c: '#b13e53', d: 'One frog, nine planets, a suspiciously sticky tongue.' },
]
const pix = (c: string) => `-4px 0 0 0 ${c}, 4px 0 0 0 ${c}, 0 -4px 0 0 ${c}, 0 4px 0 0 ${c}`
const PX = "'Press Start 2P', monospace"

export default function RetroPixel({ device }: { device: Device }) {
  const m = device === 'mobile'
  const [sel, setSel] = useState(0)
  const [coins, setCoins] = useState(0)
  const stop = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => (stop.current ? clearInterval(id) : setSel(s => (s + 1) % games.length)), 2600)
    return () => clearInterval(id)
  }, [])
  const G = games[sel]

  return (
    <div className="relative h-full w-full overflow-auto" style={{ background: '#1a1c2c', color: '#f4f4f4', fontFamily: "'VT323', monospace", imageRendering: 'pixelated' }}
      onPointerDown={() => (stop.current = true)} onKeyDown={() => (stop.current = true)}>
      <style>{`@keyframes px-blink{50%{opacity:0}}@keyframes px-star{to{background-position:-64px 64px}}
      .px-btn{transition:none}.px-btn:hover{transform:translate(-2px,-2px)}.px-btn:active{transform:translate(4px,4px);box-shadow:none!important}
      @media (prefers-reduced-motion:reduce){.px-a{animation:none!important}}`}</style>

      <div className="px-a absolute inset-0" style={{ opacity: 0.5, backgroundImage: 'linear-gradient(#ffcd75 2px,transparent 2px),linear-gradient(90deg,#ffcd75 2px,transparent 2px)', backgroundSize: '32px 32px', backgroundPosition: '0 0', animation: 'px-star 6s steps(8) infinite', maskImage: 'linear-gradient(#000 0, transparent 40%)', WebkitMaskImage: 'linear-gradient(#000 0, transparent 40%)' }} />

      <nav className="relative flex items-center justify-between p-4 text-[10px]" style={{ fontFamily: PX }}>
        <span style={{ color: '#ffcd75' }}>PIXELPOT</span>
        <span className="px-2 py-1" style={{ background: '#5d275d' }}>COINS {String(coins).padStart(3, '0')}</span>
      </nav>

      <header className={`relative px-4 ${m ? 'pt-8 pb-8' : 'pt-14 pb-12'} text-center`}>
        <h1 className={`${m ? 'text-[20px] leading-[1.7]' : 'text-[38px] leading-[1.6]'}`} style={{ fontFamily: PX, color: '#ffcd75', textShadow: '4px 4px 0 #b13e53' }}>
          WE MAKE TINY GAMES<br />WITH BIG HEARTS
        </h1>
        <p className={`mx-auto mt-5 max-w-lg ${m ? 'text-[22px]' : 'text-[28px]'}`} style={{ color: '#41a6f6' }}>
          Three-person indie studio. Handmade pixels since 2019.<span className="px-a ml-1 inline-block h-[0.8em] w-[0.5em] align-middle" style={{ background: '#38b764', animation: 'px-blink 1s steps(2) infinite' }} />
        </p>
        <button onClick={() => setCoins(c => Math.min(999, c + 1))} className="px-btn mt-6 px-5 py-4 text-[12px] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#41a6f6]"
          style={{ fontFamily: PX, background: '#38b764', color: '#1a1c2c', boxShadow: `${pix('#1a1c2c')}, 8px 8px 0 4px #0b3d1f` }}>
          PRESS START
        </button>
      </header>

      <section className={`relative px-4 pb-6 ${m ? '' : 'mx-auto max-w-4xl'}`} aria-label="Games">
        <div className={`grid gap-5 ${m ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {games.map((g, i) => (
            <button key={g.n} onClick={() => setSel(i)} aria-pressed={sel === i} className="px-btn p-4 text-left focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#41a6f6]"
              style={{ background: '#262b44', boxShadow: pix(sel === i ? g.c : '#5d275d') }}>
              <div className="mb-3 grid h-14 place-items-center" style={{ background: g.c, backgroundImage: 'conic-gradient(#0003 25%, transparent 0 50%, #0003 0 75%, transparent 0)', backgroundSize: '16px 16px' }}>
                <span className="text-[10px]" style={{ fontFamily: PX, color: '#1a1c2c' }}>{sel === i ? '> PLAY' : g.g}</span>
              </div>
              <p className="text-[10px] leading-[1.6]" style={{ fontFamily: PX, color: '#ffcd75' }}>{g.n}</p>
            </button>
          ))}
        </div>
        <div className="mt-6 p-4 text-[24px]" style={{ background: '#262b44', boxShadow: pix(G.c) }} aria-live="polite">
          <span style={{ color: G.c }}>&gt; {G.g}:</span> {G.d}<span className="px-a" style={{ animation: 'px-blink 1s steps(2) infinite' }}>_</span>
        </div>
      </section>

      <footer className="relative p-4 pb-8 text-center text-[22px]" style={{ color: '#5d275d' }}>
        <span style={{ color: '#ffcd75' }}>(c) 2026 PIXELPOT</span> / HIGH SCORE 999999
      </footer>
    </div>
  )
}
