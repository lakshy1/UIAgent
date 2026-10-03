import { useMemo, useState, type CSSProperties } from 'react'
import { Check, Copy, Moon, Palette, Search, ShieldCheck, Sun } from 'lucide-react'
import { AA, contrast, resolve, themeCode, themeFormats, themeVars, themes, type Theme, type ThemeFormat } from './themes'

const SWATCHES: [keyof Theme, string][] = [
  ['bg', 'Background'], ['surface', 'Surface'], ['line', 'Line'], ['muted', 'Muted'], ['ink', 'Ink'], ['brand', 'Brand'], ['accent', 'Accent'],
]
const readableOn = (hex: string) => (contrast(hex, '#ffffff') >= contrast(hex, '#0a0a0a') ? '#ffffff' : '#0a0a0a')

export function ColorsPage({ applied, onApply }: { applied: string | null; onApply: (id: string | null) => void }) {
  const [mode, setMode] = useState<'all' | 'light' | 'dark'>('all')
  const [format, setFormat] = useState<ThemeFormat>('css')
  const [q, setQ] = useState('')
  const lights = themes.filter(t => t.mode === 'light').length
  const darks = themes.length - lights
  const shown = useMemo(() => themes.filter(t =>
    (mode === 'all' || t.mode === mode) && (!q || (t.name + t.known).toLowerCase().includes(q.toLowerCase()))), [mode, q])
  const sections = (['light', 'dark'] as const).map(m => ({ m, items: shown.filter(t => t.mode === m) })).filter(s => s.items.length)
  const seg = (on: boolean) => `inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${on ? 'bg-ink text-bg' : 'text-muted hover:text-ink'}`
  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <section className="kosh-hero py-14 sm:py-20">
        <span aria-hidden className="kosh-hero-glow" />
        <h1 className="kosh-rise max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          {themes.length} palettes people <span className="text-brand">actually ship.</span>
        </h1>
        <p className="kosh-rise mt-5 max-w-xl text-lg text-muted" style={{ animationDelay: '.08s' }}>
          {lights} light and {darks} dark themes, from editor classics to product defaults. Every one is checked for readable text. Copy it in the format your project uses, or apply it to this whole site and watch every component change.
        </p>
        <div className="kosh-rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: '.16s' }}>
          <label className="flex h-12 w-full max-w-sm items-center gap-3 rounded-full border border-line bg-surface px-4 shadow-sm transition focus-within:border-brand focus-within:shadow-[0_0_0_4px] focus-within:shadow-brand/15">
            <Search size={18} className="text-muted" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search Nord, Catppuccin, Tailwind…" aria-label="Search palettes" className="w-full bg-transparent text-sm outline-none" />
          </label>
          <div role="tablist" aria-label="Mode" className="inline-flex rounded-full border border-line bg-surface p-1">
            {([['all', `All ${themes.length}`, null], ['light', `Light ${lights}`, Sun], ['dark', `Dark ${darks}`, Moon]] as const).map(([v, label, Icon]) => (
              <button key={v} role="tab" aria-selected={mode === v} onClick={() => setMode(v)} className={seg(mode === v)}>
                {Icon && <Icon size={14} />} {label}
              </button>
            ))}
          </div>
          <div role="tablist" aria-label="Copy format" className="inline-flex rounded-full border border-line bg-surface p-1">
            {themeFormats.map(([v, label]) => (
              <button key={v} role="tab" aria-selected={format === v} onClick={() => setFormat(v)} className={seg(format === v)}>{label}</button>
            ))}
          </div>
          {applied && (
            <button onClick={() => onApply(null)} className="inline-flex items-center gap-1.5 rounded-full border border-brand px-4 py-2 text-sm font-medium text-brand hover:bg-brand-soft">
              Reset site colors
            </button>
          )}
        </div>
      </section>

      {sections.length === 0 && <p className="py-20 text-center text-muted">No palette matches “{q}”. Try Nord, Gruvbox or Tailwind.</p>}
      {sections.map(({ m, items }) => (
        <section key={m} className="mb-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight">{m === 'light' ? 'Light themes' : 'Dark themes'} <span className="text-lg font-normal text-muted">{items.length}</span></h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(t => (
              <ThemeCard key={t.id} t={t} format={format} isApplied={applied === t.id} onApply={() => onApply(applied === t.id ? null : t.id)} />
            ))}
          </div>
        </section>
      ))}

      <aside className="rounded-2xl border border-line bg-surface p-6 text-sm text-muted">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink"><ShieldCheck size={18} className="text-ok" /> How the contrast check works</h2>
        <p className="mt-2 max-w-3xl">Editor themes are built for syntax colours, so their secondary text and accent colours are often too faint for interface text. The swatches show each theme&apos;s published colours. What you copy or apply has the muted and brand colours moved toward the theme&apos;s own text colour, just far enough to reach {AA}:1 on every surface. Cards marked “tuned” had a colour moved.</p>
      </aside>
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

function ThemeCard({ t, format, isApplied, onApply }: { t: Theme; format: ThemeFormat; isApplied: boolean; onApply: () => void }) {
  const [done, copy] = useCopy()
  const r = resolve(t)
  const scoped = themeVars(t) as CSSProperties
  const checks: [string, number][] = [['Text', contrast(r.ink, r.bg)], ['Muted', contrast(r.muted, r.bg)], ['Brand', contrast(r.brand, r.bg)]]
  return (
    <article className={`kosh-spot kosh-reveal overflow-hidden rounded-2xl border bg-surface transition duration-300 hover:-translate-y-1 ${isApplied ? 'border-brand shadow-xl' : 'border-line hover:border-brand'}`}>
      {/* Mini product screen drawn in the theme's own colors */}
      <div style={scoped} className="bg-bg p-4 text-ink">
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between">
            <span className="font-display font-bold">Orbit</span>
            <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand">Live</span>
          </div>
          <p className="mt-1 text-sm text-muted">Revenue is up 18% this week.</p>
          <div className="mt-3 flex items-end gap-1.5" aria-hidden>
            {[40, 62, 48, 74, 58, 86].map((h, i) => (
              <span key={i} className="flex-1 rounded-sm" style={{ height: h * 0.5, background: i === 5 ? 'var(--spark)' : 'var(--brand)', opacity: i === 5 ? 1 : 0.35 + i * 0.1 }} />
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <span className="rounded-full px-3.5 py-1.5 text-xs font-semibold" style={{ background: r.brand, color: r.onBrand }}>View report</span>
            <span className="rounded-full border border-line px-3.5 py-1.5 text-xs font-medium">Share</span>
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-7" aria-label={`${t.name} published colours`}>
        {SWATCHES.map(([k, label]) => (
          <li key={k}>
            <button onClick={() => copy(k, t[k] as string)} title={`${label} ${t[k]}, click to copy`} aria-label={`Copy ${label} ${t[k]}`}
              className="group relative block h-12 w-full border-y border-line" style={{ background: t[k] as string }}>
              <span className="absolute inset-0 grid place-items-center text-[10px] font-medium opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{ color: readableOn(t[k] as string) }}>{done === k ? <Check size={14} /> : (t[k] as string).slice(1)}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold">{t.name}</h3>
            <p className="mt-0.5 text-sm text-muted">{t.known}</p>
          </div>
          {r.tuned && <span className="shrink-0 rounded-full border border-line px-2.5 py-0.5 text-xs text-muted" title="Muted or brand colour was moved to reach 4.5:1">tuned</span>}
        </div>
        <dl className="mt-3 flex flex-wrap gap-1.5 text-xs">
          {checks.map(([label, ratio]) => (
            <div key={label} className="flex items-center gap-1 rounded-full bg-surface-2 px-2.5 py-1" title={`${label} on background`}>
              <dt className="text-muted">{label}</dt>
              <dd className="font-mono font-medium tabular-nums">{ratio.toFixed(1)} <span className={`font-sans ${ratio >= 7 ? 'text-ok' : 'text-muted'}`}>{ratio >= 7 ? 'AAA' : 'AA'}</span></dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 flex gap-2">
          <button onClick={() => copy('code', themeCode(t, format))} className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full border border-line text-sm font-medium hover:border-brand">
            {done === 'code' ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy {format === 'css' ? 'CSS' : format === 'tailwind' ? '@theme' : 'JSON'}</>}
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
