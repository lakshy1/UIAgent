import { useState } from 'react'
import { Check, Code2, Copy, Type } from 'lucide-react'
import { embedTag, fontByName, fontGroups, fonts, pairings, type FontGroup } from './fontCatalog'

const DEFAULT_SAMPLE = 'Design without limits.'

export function FontsPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const [group, setGroup] = useState<FontGroup | 'All'>('All')
  const [sample, setSample] = useState('')
  const [size, setSize] = useState(34)
  const copy = async (key: string, text: string) => {
    try { await navigator.clipboard.writeText(text) } catch { /* clipboard may be unavailable */ }
    setCopied(key)
    window.setTimeout(() => setCopied(current => current === key ? null : current), 1800)
  }
  const shown = fonts.filter(f => group === 'All' || f.group === group)
  const headline = sample.trim() || DEFAULT_SAMPLE
  const action = 'inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full border border-line text-sm font-medium transition hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

  return <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
    <section className="kosh-hero py-14 sm:py-20">
      <span aria-hidden className="kosh-hero-glow" />
      <h1 className="kosh-rise max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">{fonts.length} typefaces, <span className="text-brand">set in your words.</span></h1>
      <p className="kosh-rise mt-5 max-w-xl text-lg text-muted" style={{ animationDelay: '.08s' }}>The free fonts the web runs on, from the most-installed interface sans to loud display faces, plus {pairings.length} pairings that work. Type your own headline, set the size, and copy the CSS or the embed tag.</p>
      <div className="kosh-rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: '.16s' }}>
        <label className="flex h-12 w-full max-w-md items-center gap-3 rounded-full border border-line bg-surface px-4 shadow-sm transition focus-within:border-brand focus-within:shadow-[0_0_0_4px] focus-within:shadow-brand/15">
          <Type size={18} className="text-muted" />
          <input value={sample} onChange={e => setSample(e.target.value)} maxLength={60} placeholder="Type a headline to preview…" aria-label="Preview text" className="w-full bg-transparent text-sm outline-none" />
        </label>
        <label className="flex h-12 items-center gap-3 rounded-full border border-line bg-surface px-4 text-sm text-muted">
          Size
          <input type="range" min={18} max={56} value={size} onChange={e => setSize(Number(e.target.value))} aria-label="Preview size" className="w-28 accent-[var(--brand)]" />
          <span className="w-10 font-mono text-xs tabular-nums text-ink">{size}px</span>
        </label>
      </div>
    </section>

    <div role="tablist" aria-label="Font type" className="sticky top-14 z-30 -mx-4 mb-8 flex snap-x gap-2 overflow-x-auto bg-bg/90 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0">
      {(['All', ...fontGroups] as const).map(g => {
        const n = g === 'All' ? fonts.length : fonts.filter(f => f.group === g).length
        return (
          <button key={g} role="tab" aria-selected={group === g} onClick={() => setGroup(g)}
            className={`shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-medium transition ${group === g ? 'border-ink bg-ink text-bg' : 'border-line bg-surface text-muted hover:border-brand hover:text-ink'}`}>
            {g} <span className="opacity-60">{n}</span>
          </button>
        )
      })}
    </div>

    <section aria-label="Font catalog" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {shown.map(font => <article key={font.name} className="kosh-spot kosh-reveal group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-xl">
        <div className="flex min-h-56 flex-1 flex-col justify-between gap-5 border-b border-line bg-surface-2 p-5 sm:p-6" style={{ fontFamily: font.family }}>
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-sm font-semibold tracking-tight">{font.name}</h2>
            <span className="max-w-[52%] rounded-full border border-line bg-surface/70 px-2.5 py-1 text-[10px] leading-tight text-muted">{font.kind}</span>
          </div>
          <div>
            <p className="break-words font-semibold leading-[1.08] tracking-[-.02em]" style={{ fontSize: size }}>{headline}</p>
            <p className="mt-3 truncate text-xs opacity-75">The quick brown fox jumps over the lazy dog. 0123456789</p>
          </div>
          <div className="flex gap-2 text-[10px] tabular-nums opacity-60">{font.weights.split(' ').map(weight => <span key={weight} style={{ fontWeight: Number(weight) }}>Aa {weight}</span>)}</div>
        </div>
        <div className="p-4">
          <h3 className="font-display text-lg font-bold group-hover:text-brand">{font.name}</h3>
          <p className="mt-1 min-h-10 text-sm text-muted">{font.use}</p>
          <div className="mt-3 flex gap-2" aria-live="polite">
            <button onClick={() => copy(`css:${font.name}`, `font-family: ${font.family};`)} className={action}>
              {copied === `css:${font.name}` ? <><Check size={14} /> Copied</> : <><Copy size={14} /> font-family</>}
            </button>
            <button onClick={() => copy(`tag:${font.name}`, embedTag([font]))} className={action} title="Copy the Google Fonts link tag">
              {copied === `tag:${font.name}` ? <><Check size={14} /> Copied</> : <><Code2 size={14} /> Embed tag</>}
            </button>
          </div>
        </div>
      </article>)}
    </section>

    {group === 'All' && <section aria-labelledby="pairings" className="mt-20">
      <h2 id="pairings" className="font-display text-3xl font-extrabold tracking-tight">Pairings that work</h2>
      <p className="mt-1 max-w-2xl text-muted">One face for headlines, one for reading. Each card is set in the pair, and copies both the embed tag and the CSS.</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {pairings.map(p => {
          const h = fontByName(p.heading), b = fontByName(p.body)
          if (!h || !b) return null
          const key = `pair:${p.heading}`
          return (
            <article key={key} className="kosh-spot kosh-reveal flex flex-col rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-xl">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand">{p.mood}</p>
              <p className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tight" style={{ fontFamily: h.family }}>{headline}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted" style={{ fontFamily: b.family }}>Good typography is mostly invisible. The headline sets a tone, then the body gets out of the way so people can read without noticing the letters.</p>
              <p className="mt-4 text-sm"><span className="font-semibold">{p.heading}</span> <span className="text-muted">with</span> <span className="font-semibold">{p.body}</span></p>
              <p className="mt-1 text-sm text-muted">{p.use}</p>
              <button onClick={() => copy(key, `${embedTag([h, b])}\n\n<style>\n  h1, h2, h3 { font-family: ${h.family}; }\n  body { font-family: ${b.family}; }\n</style>`)} aria-live="polite" className={`${action} mt-5 flex-none`}>
                {copied === key ? <><Check size={14} /> Copied pair</> : <><Copy size={14} /> Copy embed and CSS</>}
              </button>
            </article>
          )
        })}
      </div>
    </section>}
  </main>
}
