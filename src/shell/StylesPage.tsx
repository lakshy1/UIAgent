import { Suspense, useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Check, Copy, Laptop, RotateCcw, Search, Smartphone } from 'lucide-react'
import { styleEntries, styleFamilies, type StyleEntry } from '../styles/registry'
import type { Device } from '../styles/types'
import { Frame, Lazy, openOnClick } from './Frame'
import { Seg } from './Seg'

export function StylesPage() {
  const [family, setFamily] = useState<string>('All')
  const [q, setQ] = useState('')
  const shown = useMemo(() => styleEntries.filter(s =>
    (family === 'All' || s.family === family) &&
    (!q || (s.title + s.idea + s.description + s.traits.join(' ') + s.fonts).toLowerCase().includes(q.toLowerCase()))), [family, q])
  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <section className="kosh-hero py-14 sm:py-20">
        <span aria-hidden className="kosh-hero-glow" />
        <h1 className="kosh-rise max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          One idea, <span className="text-brand">{styleEntries.length} ways to dress it.</span>
        </h1>
        <p className="kosh-rise mt-5 max-w-xl text-lg text-muted" style={{ animationDelay: '.08s' }}>
          From liquid glass and bento grids to Bauhaus and terminal mono. Each style is a working mini website with a laptop and a phone version, plus the CSS recipe, palette and fonts behind the look.
        </p>
        <label className="kosh-rise mt-8 flex h-12 max-w-md items-center gap-3 rounded-full border border-line bg-surface px-4 shadow-sm transition focus-within:border-brand focus-within:shadow-[0_0_0_4px] focus-within:shadow-brand/15" style={{ animationDelay: '.16s' }}>
          <Search size={18} className="text-muted" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search glass, retro, serif, grid…" aria-label="Search styles" className="w-full bg-transparent text-sm outline-none" />
        </label>
      </section>

      <div role="tablist" aria-label="Style family" className="sticky top-14 z-30 -mx-4 mb-10 flex snap-x gap-2 overflow-x-auto bg-bg/90 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0">
        {['All', ...styleFamilies.map(f => f.name)].map(f => {
          const n = f === 'All' ? styleEntries.length : styleEntries.filter(s => s.family === f).length
          return (
            <button key={f} role="tab" aria-selected={family === f} onClick={() => setFamily(f)}
              className={`shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-medium transition ${family === f ? 'border-ink bg-ink text-bg' : 'border-line bg-surface text-muted hover:border-brand hover:text-ink'}`}>
              {f} <span className="opacity-60">{n}</span>
            </button>
          )
        })}
      </div>

      {shown.length === 0 && <p className="py-20 text-center text-muted">No style matches “{q}”. Try glass, retro or serif.</p>}
      {styleFamilies.map(f => {
        const items = shown.filter(s => s.family === f.name)
        if (!items.length) return null
        return (
          <section key={f.name} className="mb-16">
            <h2 className="font-display text-3xl font-extrabold tracking-tight">{f.name} <span className="text-lg font-normal text-muted">{items.length}</span></h2>
            <p className="mt-1 max-w-2xl text-muted">{f.blurb}</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">{items.map(s => <StyleCard key={s.id} s={s} />)}</div>
          </section>
        )
      })}
    </main>
  )
}

function StyleCard({ s }: { s: StyleEntry }) {
  return (
    <article className="kosh-spot kosh-reveal group overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-xl cursor-pointer" onClick={openOnClick(`#style/${s.id}`)}>
      <Lazy className="relative aspect-[16/10] border-b border-line bg-surface-2">
        <Frame device="laptop" thumb><Suspense fallback={null}><s.Demo device="laptop" /></Suspense></Frame>
      </Lazy>
      <a href={`#style/${s.id}`} className="block p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-xl font-bold group-hover:text-brand">{s.title}</h3>
          <span className="flex gap-1" aria-hidden>{s.palette.slice(0, 5).map(c => <span key={c.hex} className="size-4 rounded-full border border-line" style={{ background: c.hex }} />)}</span>
        </div>
        <p className="mt-1 text-sm text-muted">Web idea: {s.idea}</p>
        <p className="mt-0.5 text-xs text-muted">{s.era}</p>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{s.description}</p>
        <span className="mt-3 inline-block text-sm font-medium text-brand">Open style, recipe and code</span>
      </a>
    </article>
  )
}

export function StyleDetail({ id }: { id: string }) {
  const s = styleEntries.find(x => x.id === id)
  const [device, setDevice] = useState<Device>('laptop')
  const [tab, setTab] = useState<'preview' | 'recipe' | 'code'>('preview')
  const [run, setRun] = useState(0)
  const [code, setCode] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  useEffect(() => {
    let current = true
    scrollTo(0, 0); setTab('preview'); setCode('')
    s?.loadCode().then(c => { if (current) setCode(c) })
    return () => { current = false }
  }, [s])
  if (!s) return <main className="mx-auto max-w-3xl px-4 py-24"><a href="#styles" className="text-brand">Back to styles</a><p className="mt-4 text-muted">That style does not exist.</p></main>
  const copy = async (key: string, text: string) => {
    try { await navigator.clipboard.writeText(text) } catch { /* ignore */ }
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }
  const i = styleEntries.findIndex(x => x.id === id)
  const next = styleEntries[(i + 1) % styleEntries.length]
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <a href="#styles" className="mt-8 inline-flex items-center gap-2 text-sm text-muted hover:text-ink"><ArrowLeft size={16} /> All styles</a>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-brand">{s.family} · {s.era}</p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight">{s.title}</h1>
          <p className="mt-2 max-w-2xl text-muted">{s.description}</p>
          <p className="mt-1 text-sm text-muted">Web idea shown: {s.idea}</p>
        </div>
        <a href={`#style/${next.id}`} className="text-sm text-muted hover:text-ink">Next: {next.title}</a>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <Seg value={tab} onChange={setTab} options={[['preview', 'Preview'], ['recipe', 'Recipe'], ['code', 'Code']]} />
        {tab === 'preview' && (
          <div className="flex items-center gap-2">
            <button onClick={() => setRun(r => r + 1)} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-muted hover:text-ink"><RotateCcw size={14} /> Replay</button>
            <Seg value={device} onChange={setDevice} options={[['laptop', <><Laptop size={15} /> Laptop</>], ['mobile', <><Smartphone size={15} /> Mobile</>]]} />
          </div>
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-line bg-surface-2 p-3 sm:p-6">
        {tab === 'preview' && <Frame device={device} maxHeight={760} key={`${s.id}-${device}-${run}`}><Suspense fallback={null}><s.Demo device={device} /></Suspense></Frame>}
        {tab === 'recipe' && (
          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl bg-surface p-5">
              <h2 className="font-display text-lg font-bold">What makes it {s.title.toLowerCase()}</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">{s.traits.map(t => <li key={t}>{t}</li>)}</ul>
              <h2 className="mt-6 font-display text-lg font-bold">Palette</h2>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {s.palette.map(c => (
                  <button key={c.hex} onClick={() => copy(c.hex, c.hex)} className="overflow-hidden rounded-lg border border-line text-left" title="Copy hex">
                    <span className="block h-12" style={{ background: c.hex }} />
                    <span className="block px-2 py-1 text-[11px] leading-tight"><span className="block font-medium">{c.name}</span><span className="font-mono text-muted">{copied === c.hex ? 'copied' : c.hex}</span></span>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted">Type: {s.fonts}</p>
            </section>
            <section className="space-y-6">
              <div className="rounded-xl bg-surface p-5">
                <h2 className="font-display text-lg font-bold">Good for</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">{s.useFor.map(t => <li key={t}>{t}</li>)}</ul>
                <h2 className="mt-5 font-display text-lg font-bold">Watch out for</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">{s.avoid.map(t => <li key={t}>{t}</li>)}</ul>
              </div>
              <div className="overflow-hidden rounded-xl bg-[#0b0f24] text-[#dfe4ff]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-[#98a0c7]">
                  <span>Signature CSS</span>
                  <button onClick={() => copy('sig', s.signature)} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-medium text-white hover:bg-white/20">
                    {copied === 'sig' ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                  </button>
                </div>
                <pre className="overflow-auto p-4 font-mono text-[13px] leading-relaxed"><code>{s.signature}</code></pre>
              </div>
            </section>
          </div>
        )}
        {tab === 'code' && (
          <div className="overflow-hidden rounded-xl bg-[#0b0f24] text-[#dfe4ff]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-[#98a0c7]">
              <span className="font-mono">{s.file}</span>
              <button onClick={() => copy('code', code)} aria-live="polite" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-medium text-white hover:bg-white/20">
                {copied === 'code' ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy code</>}
              </button>
            </div>
            <pre className="max-h-[640px] overflow-auto p-4 font-mono text-[13px] leading-relaxed"><code>{code || 'Loading…'}</code></pre>
          </div>
        )}
      </div>
      <p className="mt-8 text-sm text-muted">Needs Tailwind CSS v4 and lucide-react. Fonts load from Google Fonts: {s.fonts}.</p>
    </main>
  )
}
