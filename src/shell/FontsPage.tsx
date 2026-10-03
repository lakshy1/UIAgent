import { useState } from 'react'
import { Check, Copy, Type } from 'lucide-react'
import { fontGroups, fonts, type FontGroup } from './fontCatalog'

const DEFAULT_SAMPLE = 'Design without limits.'

export function FontsPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const [group, setGroup] = useState<FontGroup | 'All'>('All')
  const [sample, setSample] = useState('')
  const copy = async (name: string, family: string) => {
    try { await navigator.clipboard.writeText(`font-family: ${family};`) } catch { /* clipboard may be unavailable */ }
    setCopied(name)
    window.setTimeout(() => setCopied(current => current === name ? null : current), 1800)
  }
  const shown = fonts.filter(f => group === 'All' || f.group === group)
  const headline = sample.trim() || DEFAULT_SAMPLE

  return <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
    <section className="kosh-hero py-14 sm:py-20">
      <span aria-hidden className="kosh-hero-glow" />
      <h1 className="kosh-rise max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">{fonts.length} typefaces, <span className="text-brand">set in your words.</span></h1>
      <p className="kosh-rise mt-5 max-w-xl text-lg text-muted" style={{ animationDelay: '.08s' }}>Free fonts that modern products actually ship with, from neutral interface sans to loud display faces. Type your own headline to compare them side by side.</p>
      <label className="kosh-rise mt-8 flex h-12 max-w-md items-center gap-3 rounded-full border border-line bg-surface px-4 shadow-sm transition focus-within:border-brand focus-within:shadow-[0_0_0_4px] focus-within:shadow-brand/15" style={{ animationDelay: '.16s' }}>
        <Type size={18} className="text-muted" />
        <input value={sample} onChange={e => setSample(e.target.value)} maxLength={60} placeholder="Type a headline to preview…" aria-label="Preview text" className="w-full bg-transparent text-sm outline-none" />
      </label>
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
      {shown.map(font => <article key={font.name} className="kosh-spot kosh-reveal group overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-xl">
        <div className="flex aspect-[8/5] flex-col justify-between border-b border-line bg-surface-2 p-5 sm:p-6" style={{ fontFamily: font.family }}>
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-sm font-semibold tracking-tight">{font.name}</h2>
            <span className="max-w-[52%] rounded-full border border-line bg-surface/70 px-2.5 py-1 text-[10px] leading-tight text-muted">{font.kind}</span>
          </div>
          <div>
            <p className="line-clamp-2 break-words text-3xl font-semibold leading-[1.05] tracking-[-.03em] sm:text-4xl">{headline}</p>
            <p className="mt-3 truncate text-xs opacity-75">The quick brown fox jumps over the lazy dog. 0123456789</p>
          </div>
          <div className="flex gap-2 text-[10px] tabular-nums opacity-60">{font.weights.split(' ').map(weight => <span key={weight} style={{ fontWeight: Number(weight) }}>Aa {weight}</span>)}</div>
        </div>
        <div className="p-4">
          <h3 className="font-display text-lg font-bold group-hover:text-brand">{font.name}</h3>
          <p className="mt-1 min-h-10 text-sm text-muted">{font.use}</p>
          <button onClick={() => copy(font.name, font.family)} aria-live="polite" className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-full border border-line text-sm font-medium transition hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
            {copied === font.name ? <><Check size={14} /> Copied font-family</> : <><Copy size={14} /> Copy font-family</>}
          </button>
        </div>
      </article>)}
    </section>
  </main>
}
