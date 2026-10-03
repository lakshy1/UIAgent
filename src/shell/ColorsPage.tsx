import { useState, type CSSProperties } from 'react'
import { Check, Copy, Moon, Palette, Sun } from 'lucide-react'
import { contrast, onBrand, themeCss, themeVars, themes, type Theme } from './themes'

const SWATCHES: [keyof Theme, string][] = [
  ['bg', 'Background'], ['surface', 'Surface'], ['line', 'Line'], ['muted', 'Muted'], ['ink', 'Ink'], ['brand', 'Brand'], ['accent', 'Accent'],
]

export function ColorsPage({ applied, onApply }: { applied: string | null; onApply: (id: string | null) => void }) {
  const [mode, setMode] = useState<'all' | 'light' | 'dark'>('all')
  const sections = (['light', 'dark'] as const).filter(m => mode === 'all' || mode === m)
  const lights = themes.filter(t => t.mode === 'light').length
  const darks = themes.length - lights
  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <section className="kosh-hero py-14 sm:py-20">
        <span aria-hidden className="kosh-hero-glow" />
        <h1 className="kosh-rise max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          {themes.length} palettes people <span className="text-brand">actually ship.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted">
          {lights} light and {darks} dark themes, from editor classics to product defaults. Copy the CSS variables, or apply one to this whole site and watch every component change.
        </p>
        <div role="tablist" aria-label="Mode" className="mt-8 inline-flex rounded-full border border-line bg-surface p-1">
          {([['all', `All ${themes.length}`, null], ['light', `Light ${lights}`, Sun], ['dark', `Dark ${darks}`, Moon]] as const).map(([v, label, Icon]) => (
            <button key={v} role="tab" aria-selected={mode === v} onClick={() => setMode(v)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${mode === v ? 'bg-ink text-bg' : 'text-muted hover:text-ink'}`}>
              {Icon && <Icon size={14} />} {label}
            </button>
          ))}
        </div>
        {applied && (
          <button onClick={() => onApply(null)} className="ml-3 inline-flex items-center gap-1.5 rounded-full border border-brand px-4 py-2 text-sm font-medium text-brand hover:bg-brand-soft">
            Reset site colors
          </button>
        )}
      </section>

      {sections.map(m => (
        <section key={m} className="mb-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight">{m === 'light' ? 'Light themes' : 'Dark themes'}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {themes.filter(t => t.mode === m).map(t => (
              <ThemeCard key={t.id} t={t} isApplied={applied === t.id} onApply={() => onApply(applied === t.id ? null : t.id)} />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

function useCopy() {
  const [done, setDone] = useState<string | null>(null)
  return [done, async (key: string, text: string) => {
    try { await navigator.clipboard.writeText(text) } catch { /* ignore */ }
    setDone(key)
    setTimeout(() => setDone(d => (d === key ? null : d)), 1600)
  }] as const
}

function ThemeCard({ t, isApplied, onApply }: { t: Theme; isApplied: boolean; onApply: () => void }) {
  const [done, copy] = useCopy()
  const ratio = contrast(t.ink, t.bg)
  const level = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Low'
  const scoped = themeVars(t) as CSSProperties
  return (
    <article className={`kosh-spot kosh-reveal overflow-hidden rounded-2xl border bg-surface transition duration-300 hover:-translate-y-1 ${isApplied ? 'border-brand shadow-xl' : 'border-line hover:border-brand'}`}>
      {/* Mini product screen drawn in the theme's own colors */}
      <div style={scoped} className="bg-bg p-4 text-ink">
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between">
            <span className="font-display font-bold">Orbit</span>
            <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>Live</span>
          </div>
          <p className="mt-1 text-sm text-muted">Revenue is up 18% this week.</p>
          <div className="mt-3 flex items-end gap-1.5" aria-hidden>
            {[40, 62, 48, 74, 58, 86].map((h, i) => (
              <span key={i} className="flex-1 rounded-sm" style={{ height: h * 0.5, background: i === 5 ? 'var(--spark)' : 'var(--brand)', opacity: i === 5 ? 1 : 0.35 + i * 0.1 }} />
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <span className="rounded-full px-3.5 py-1.5 text-xs font-semibold" style={{ background: t.brand, color: onBrand(t.brand) }}>View report</span>
            <span className="rounded-full border border-line px-3.5 py-1.5 text-xs font-medium">Share</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7" role="list" aria-label={`${t.name} swatches`}>
        {SWATCHES.map(([k, label]) => (
          <button key={k} role="listitem" onClick={() => copy(k, t[k] as string)} title={`${label} ${t[k]}, click to copy`}
            className="group relative h-12 border-y border-line first:border-l-0" style={{ background: t[k] as string }}>
            <span className="absolute inset-0 grid place-items-center text-[10px] font-medium opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ color: onBrand(t[k] as string) }}>{done === k ? <Check size={14} /> : (t[k] as string).slice(1)}</span>
          </button>
        ))}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold">{t.name}</h3>
            <p className="mt-0.5 text-sm text-muted">{t.known}</p>
          </div>
          <span className="shrink-0 rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand" title="Ink on background contrast">{level} {ratio.toFixed(1)}:1</span>
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={() => copy('css', themeCss(t))} className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full border border-line text-sm font-medium hover:border-brand">
            {done === 'css' ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy CSS</>}
          </button>
          <button onClick={onApply} aria-pressed={isApplied}
            className={`inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full text-sm font-medium transition ${isApplied ? 'bg-brand text-white' : 'bg-ink text-bg hover:opacity-90'}`}>
            <Palette size={14} /> {isApplied ? 'Applied' : 'Apply to site'}
          </button>
        </div>
      </div>
    </article>
  )
}
