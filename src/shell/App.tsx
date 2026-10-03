import { Suspense, useEffect, useMemo, useState } from 'react'
import { Check, Copy, Laptop, RotateCcw, Moon, Search, Smartphone, Sun, ArrowLeft, ExternalLink } from 'lucide-react'
import { groups, entries, type Entry } from '../library/registry'
import type { Device } from '../library/types'
import { Frame, Lazy } from './Frame'
import { ColorsPage } from './ColorsPage'
import { Seg } from './Seg'
import { StyleDetail, StylesPage } from './StylesPage'
import { styleEntries } from '../styles/registry'
import { FontsPage } from './FontsPage'
import { fontCount } from './fontCatalog'
import { onBrand, themes, themeVars } from './themes'
import { ThreeCatalogCanvas } from '../three/ThreePreview'

const INSPIRATION = [
  { name: 'shadcn/ui', url: 'https://ui.shadcn.com', take: 'Preview / Code tabs, copy on every block, viewport switcher.' },
  { name: 'Magic UI', url: 'https://magicui.design', take: 'Live-motion thumbnails in the index grid, consistent page order.' },
  { name: 'Aceternity UI', url: 'https://ui.aceternity.com', take: 'Large preview canvas that shows effects near real scale.' },
]

function useHash() {
  const [h, setH] = useState(() => location.hash.slice(1))
  useEffect(() => {
    const f = () => setH(location.hash.slice(1))
    addEventListener('hashchange', f)
    return () => removeEventListener('hashchange', f)
  }, [])
  return h
}

function useTheme() {
  const [t, setT] = useState<'light' | 'dark'>(() => {
    try {
      return (localStorage.getItem('kosh-theme') as 'light' | 'dark') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    } catch {
      return 'light'
    }
  })
  useEffect(() => {
    document.documentElement.dataset.theme = t
    try { localStorage.setItem('kosh-theme', t) } catch { /* ignore */ }
  }, [t])
  return [t, () => setT(t === 'light' ? 'dark' : 'light')] as const
}

export default function App() {
  const hash = useHash()
  const [theme, toggle] = useTheme()
  const [applied, setApplied] = useState<string | null>(null)
  const entry = entries.find(e => e.id === hash)
  const onFonts = hash === 'fonts'
  const onColors = hash === 'colors'
  const onStyles = hash === 'styles' || hash.startsWith('style/')

  // Applying a palette writes the same variables the components read, so everything re-colors live.
  useEffect(() => {
    const root = document.documentElement
    const t = themes.find(x => x.id === applied)
    const names = ['--bg', '--surface', '--surface-2', '--ink', '--muted', '--line', '--brand', '--brand-soft', '--spark', '--on-brand']
    if (!t) { names.forEach(n => root.style.removeProperty(n)); return }
    Object.entries({ ...themeVars(t), '--on-brand': onBrand(t.brand) }).forEach(([k, v]) => root.style.setProperty(k, v))
    root.style.colorScheme = t.mode
    return () => { root.style.colorScheme = '' }
  }, [applied])

  const tab = (active: boolean) => `rounded-full px-4 py-1.5 text-sm font-medium transition ${active ? 'bg-ink text-bg' : 'text-muted hover:text-ink'}`
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
        <div className="mx-auto grid min-h-14 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-4 py-2 sm:flex sm:h-14 sm:justify-between sm:gap-3 sm:py-0 sm:px-6">
          <a href="#" className="font-display text-lg font-bold tracking-tight">Lakshya<span className="text-brand">Kosh</span></a>
          <div className="flex items-center justify-end gap-2 text-sm text-muted sm:order-3 sm:gap-3">
            <span className="hidden md:inline">{onFonts ? `${fontCount} fonts` : onColors ? `${themes.length} palettes` : onStyles ? `${styleEntries.length} styles` : `${entries.length} components`}</span>
            <button onClick={toggle} aria-label="Toggle theme" className="grid size-9 place-items-center rounded-full border border-line bg-surface hover:border-brand">
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
          <nav aria-label="Sections" className="col-span-2 flex min-w-0 w-full items-center rounded-full border border-line bg-surface p-1 sm:col-span-1 sm:order-2 sm:w-auto">
            <a href="#" aria-current={!onColors && !onStyles && !onFonts ? 'page' : undefined} className={`${tab(!onColors && !onStyles && !onFonts)} min-w-0 flex-1 px-1.5 text-center text-xs sm:min-w-max sm:flex-none sm:px-4 sm:text-sm`}>Design</a>
            <a href="#styles" aria-current={onStyles ? 'page' : undefined} className={`${tab(onStyles)} min-w-0 flex-1 px-1.5 text-center text-xs sm:min-w-max sm:flex-none sm:px-4 sm:text-sm`}>Styles</a>
            <a href="#colors" aria-current={onColors ? 'page' : undefined} className={`${tab(onColors)} min-w-0 flex-1 px-1.5 text-center text-xs sm:min-w-max sm:flex-none sm:px-4 sm:text-sm`}>Colors</a>
            <a href="#fonts" aria-current={onFonts ? 'page' : undefined} className={`${tab(onFonts)} min-w-0 flex-1 px-1.5 text-center text-xs sm:min-w-max sm:flex-none sm:px-4 sm:text-sm`}>Fonts</a>
          </nav>
        </div>
      </header>
      {onColors ? <ColorsPage applied={applied} onApply={setApplied} /> : onFonts ? <FontsPage /> : hash.startsWith('style/') ? <StyleDetail id={hash.slice(6)} /> : onStyles ? <StylesPage /> : entry ? <Detail entry={entry} /> : <Gallery />}
      {entry?.category === '3D' && <ThreeCatalogCanvas />}
      <Footer />
    </div>
  )
}

function Gallery() {
  const galleryEntries = entries
  const galleryGroups = groups
  const [group, setGroup] = useState<string>('All')
  const [q, setQ] = useState('')
  const matches = useMemo(() => galleryEntries.filter(e =>
    (group === 'All' || e.group === group) &&
    (!q || (e.title + e.description + e.tags.join(' ') + e.source.join(' ') + e.family).toLowerCase().includes(q.toLowerCase()))), [galleryEntries, group, q])
  const visible = galleryGroups.filter(g => group === 'All' || g.name === group)
  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <section className="py-14 sm:py-20">
        <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          <>Every interface I have built, <span className="text-brand">ready to copy.</span></>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted">
          {`${galleryEntries.length} components in ${galleryGroups.length} groups, distilled from 31 projects. Each one has a laptop and a phone design, runs live, and comes with code to copy.`}
        </p>
        <label className="mt-8 flex h-12 max-w-md items-center gap-3 rounded-full border border-line bg-surface px-4 focus-within:border-brand">
          <Search size={18} className="text-muted" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search sidebar, pricing, sheet…" className="w-full bg-transparent text-sm outline-none" />
        </label>
      </section>

      <div role="tablist" aria-label="Groups" className="sticky top-14 z-30 -mx-4 mb-10 flex snap-x gap-2 overflow-x-auto bg-bg/90 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0">
        {['All', ...galleryGroups.map(g => g.name)].map(c => {
          const n = c === 'All' ? galleryEntries.length : galleryEntries.filter(e => e.group === c).length
          return (
            <button key={c} role="tab" aria-selected={group === c} onClick={() => setGroup(c)}
              className={`shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-medium transition ${group === c ? 'border-ink bg-ink text-bg' : 'border-line bg-surface text-muted hover:border-brand hover:text-ink'}`}>
              {c} <span className="opacity-60">{n}</span>
            </button>
          )
        })}
      </div>

      {matches.length === 0 && <p className="py-20 text-center text-muted">Nothing matches “{q}”. Try a word like sidebar, card or chart.</p>}
      {visible.map(g => {
        const inGroup = matches.filter(m => m.group === g.name)
        if (!inGroup.length) return null
        return (
          <section key={g.name} className="mb-16">
            <><h2 className="font-display text-3xl font-extrabold tracking-tight">{g.name}</h2><p className="mt-1 max-w-2xl text-muted">{g.blurb}</p></>
            {g.families.map(f => {
              const items = inGroup.filter(m => m.family === f.name)
              if (!items.length) return null
              return (
                <div key={f.name} className="mt-8">
                  <h3 className="mb-4 flex items-baseline gap-2 font-display text-lg font-bold">{f.name} <span className="text-sm font-normal text-muted">{items.length}</span></h3>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map(e => <Card key={e.id} e={e} />)}</div>
                </div>
              )
            })}
          </section>
        )
      })}
    </main>
  )
}

function Card({ e }: { e: Entry }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-surface transition hover:border-brand hover:shadow-xl">
      <Lazy className="relative aspect-[8/5] border-b border-line bg-surface-2">
        <Frame device="laptop" thumb><Suspense fallback={null}><e.Demo device="laptop" /></Suspense></Frame>
      </Lazy>
      <a href={`#${e.id}`} className="block p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold group-hover:text-brand">{e.title}</h3>
          <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand">{e.family}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{e.description}</p>
        <span className="mt-2 flex items-center justify-between text-sm"><span className="font-medium text-brand">Open details and code</span><span className="inline-flex items-center gap-1.5 text-xs text-muted"><span className="size-1.5 rounded-full bg-ok" style={{ animation: 'kc-pulse-ring 1.8s infinite' }} /> Live</span></span>
      </a>
    </article>
  )
}

function Detail({ entry: e }: { entry: Entry }) {
  const [device, setDevice] = useState<Device>('laptop')
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)
  const [run, setRun] = useState(0)
  const [code, setCode] = useState('')
  useEffect(() => { scrollTo(0, 0); setTab('preview'); setCode(''); e.loadCode().then(setCode) }, [e])
  const copy = async () => {
    try { await navigator.clipboard.writeText(code) } catch { /* ignore */ }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  const relatedEntries = entries.filter(x => x.group === e.group)
  const idx = relatedEntries.findIndex(x => x.id === e.id)
  const next = relatedEntries[(idx + 1) % relatedEntries.length]
  const backHref = '#'
  const backLabel = 'All components'
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <a href={backHref} className="mt-8 inline-flex items-center gap-2 text-sm text-muted hover:text-ink"><ArrowLeft size={16} /> {backLabel}</a>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-brand">{e.group} · {e.family}</p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight">{e.title}</h1>
          <p className="mt-2 max-w-2xl text-muted">{e.description}</p>
        </div>
        <a href={`#${next.id}`} className="text-sm text-muted hover:text-ink">Next: {next.title}</a>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <Seg value={tab} onChange={setTab} options={[['preview', 'Preview'], ['code', 'Code']]} />
        {tab === 'preview' && (
          <div className="flex items-center gap-2">
          <button onClick={() => setRun(r => r + 1)} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-muted hover:text-ink"><RotateCcw size={14} /> Replay</button>
          <Seg value={device} onChange={setDevice} options={[['laptop', <><Laptop size={15} /> Laptop</>], ['mobile', <><Smartphone size={15} /> Mobile</>]]} />
          </div>
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-line bg-surface-2 p-3 sm:p-6">
        {tab === 'preview' ? (
          <Frame device={device} maxHeight={760} key={`${e.id}-${device}-${run}`}><Suspense fallback={null}><e.Demo device={device} /></Suspense></Frame>
        ) : (
          <div className="relative overflow-hidden rounded-xl bg-[#0b0f24] text-[#dfe4ff]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-[#98a0c7]">
              <span className="font-mono">{e.file}</span>
              <button onClick={copy} aria-live="polite" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-medium text-white hover:bg-white/20">
                {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy code</>}
              </button>
            </div>
            <pre className="max-h-[640px] overflow-auto p-4 font-mono text-[13px] leading-relaxed"><code>{code || 'Loading…'}</code></pre>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <section>
          <h2 className="font-display text-lg font-bold">Inspired by</h2>
          <p className="mt-2 flex flex-wrap gap-2">{e.source.map(s => <span key={s} className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs">{s}</span>)}</p>
          <p className="mt-3 flex flex-wrap gap-2">{e.tags.map(t => <span key={t} className="text-xs text-muted">#{t}</span>)}</p>
        </section>
        {e.notes && (
          <section>
            <h2 className="font-display text-lg font-bold">Notes</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">{e.notes.map(n => <li key={n}>{n}</li>)}</ul>
          </section>
        )}
      </div>
      <p className="mt-8 text-sm text-muted">Needs Tailwind CSS v4, lucide-react{code.includes('framer-motion') ? ' and framer-motion' : ''}. Colors come from the theme tokens in index.css.</p>
    </main>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-xl font-bold">Designs worth borrowing from</h2>
        <p className="mt-1 text-sm text-muted">This showcase takes its structure from three of the best component sites, chosen after a web review of 2026 practice.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {INSPIRATION.map(i => (
            <a key={i.name} href={i.url} target="_blank" rel="noreferrer" className="rounded-xl border border-line p-4 hover:border-brand">
              <span className="inline-flex items-center gap-1.5 font-semibold">{i.name} <ExternalLink size={14} /></span>
              <span className="mt-1 block text-sm text-muted">{i.take}</span>
            </a>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-8">
          <p className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl">Lakshya<span className="text-brand">Kosh</span></p>
          <p className="max-w-xs text-sm text-muted">Kosh means treasury. A treasury of interfaces, aimed true, crafted by Lakshya Sehgal.</p>
        </div>
      </div>
    </footer>
  )
}
