import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { fonts } from './fontCatalog'

export function FontsPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = async (name: string, family: string) => {
    try { await navigator.clipboard.writeText(`font-family: ${family};`) } catch { /* clipboard may be unavailable */ }
    setCopied(name)
    window.setTimeout(() => setCopied(current => current === name ? null : current), 1800)
  }

  return <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
    <section className="py-14 sm:py-20">
      <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">Fonts</h1>
      <p className="mt-5 max-w-xl text-lg text-muted">Curated typefaces for interfaces, brands, editorial layouts and expressive digital experiences.</p>
    </section>
    <section aria-label="Font catalog" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {fonts.map(font => <article key={font.name} className="group overflow-hidden rounded-2xl border border-line bg-surface transition hover:border-brand hover:shadow-xl">
        <div className="flex aspect-[8/5] flex-col justify-between border-b border-line bg-surface-2 p-5 sm:p-6" style={{ fontFamily: font.family }}>
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-sm font-semibold tracking-tight">{font.name}</h2>
            <span className="max-w-[52%] rounded-full border border-line bg-surface/70 px-2.5 py-1 text-[10px] leading-tight text-muted">{font.kind}</span>
          </div>
          <div>
            <p className="text-3xl font-semibold leading-[1.05] tracking-[-.05em] sm:text-4xl">Design without limits.</p>
            <p className="mt-3 text-[11px] leading-relaxed opacity-70">The quick brown fox jumps over the lazy dog.</p>
            <p className="mt-2 truncate text-xs opacity-75">Beautiful digital experiences begin with thoughtful typography.</p>
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
