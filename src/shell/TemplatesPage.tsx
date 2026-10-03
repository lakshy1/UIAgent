import { useMemo, useState } from 'react'
import { Check, Copy, ExternalLink, Search, Terminal } from 'lucide-react'
import { installCommand, templateKinds, templateUrl, templates, type Template, type TemplateAccess, type TemplateKind } from './templateCatalog'

/** A small wireframe of the kind of site, drawn in theme colours. Screenshots stay on 21st.dev. */
function Cover({ kind }: { kind: TemplateKind }) {
  const bar = 'rounded-full bg-ink/15'
  const block = 'rounded-md bg-ink/10'
  return (
    <div aria-hidden className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm transition duration-500 group-hover:-translate-y-1 group-hover:shadow-lg">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="size-2 rounded-full bg-danger/70" /><span className="size-2 rounded-full bg-spark/80" /><span className="size-2 rounded-full bg-ok/70" />
        <span className={`ml-2 h-2 w-24 ${bar}`} />
      </div>
      <div className="flex min-h-0 flex-1 gap-2 p-3">
        {kind === 'Dashboard' && <>
          <div className="flex w-1/5 flex-col gap-1.5"><span className="h-2 w-full rounded-full bg-brand/60" />{[0, 1, 2, 3].map(i => <span key={i} className={`h-1.5 w-4/5 ${bar}`} />)}</div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex gap-2">{[0, 1, 2].map(i => <span key={i} className={`h-7 flex-1 ${block}`} />)}</div>
            <div className="flex flex-1 items-end gap-1.5 rounded-md bg-ink/5 p-2">{[40, 65, 50, 80, 60, 95, 72].map((h, i) => <span key={i} className="flex-1 rounded-sm bg-brand" style={{ height: `${h}%`, opacity: 0.35 + i * 0.09 }} />)}</div>
          </div>
        </>}
        {kind === 'Portfolio' && <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-2"><span className="size-7 rounded-full bg-brand/70" /><div className="flex flex-col gap-1"><span className={`h-2 w-20 ${bar}`} /><span className={`h-1.5 w-12 ${bar}`} /></div></div>
          <div className="grid flex-1 grid-cols-3 gap-2">{[0, 1, 2, 3, 4, 5].map(i => <span key={i} className={i === 1 ? 'rounded-md bg-spark/50' : block} />)}</div>
        </div>}
        {kind === 'Commerce' && <div className="grid flex-1 grid-cols-3 gap-2">{[0, 1, 2].map(i => (
          <div key={i} className="flex flex-col gap-1.5"><span className={`flex-1 ${i === 0 ? 'rounded-md bg-brand/35' : block}`} /><span className={`h-1.5 w-3/4 ${bar}`} /><span className="h-1.5 w-1/3 rounded-full bg-brand/70" /></div>
        ))}</div>}
        {kind === 'Blog and docs' && <>
          <div className="flex w-1/4 flex-col gap-1.5">{[0, 1, 2, 3, 4].map(i => <span key={i} className={`h-1.5 ${i === 1 ? 'w-full rounded-full bg-brand/70' : `w-4/5 ${bar}`}`} />)}</div>
          <div className="flex flex-1 flex-col gap-1.5"><span className="h-3 w-2/3 rounded-full bg-ink/30" />{[100, 92, 96, 70, 88, 60].map((w, i) => <span key={i} className={`h-1.5 ${bar}`} style={{ width: `${w}%` }} />)}</div>
        </>}
        {kind === 'AI app' && <div className="flex flex-1 flex-col justify-end gap-2">
          <span className={`h-5 w-3/5 self-start ${block}`} />
          <span className="h-5 w-2/5 self-end rounded-md bg-brand/60" />
          <span className={`h-8 w-4/5 self-start ${block}`} />
          <span className="mt-1 flex h-6 items-center rounded-full border border-line px-2"><span className={`h-1.5 w-1/3 ${bar}`} /><span className="ml-auto size-3 rounded-full bg-brand" /></span>
        </div>}
        {(kind === 'Landing page' || kind === 'SaaS starter' || kind === 'Agency') && <div className={`flex flex-1 flex-col gap-2 ${kind === 'Agency' ? 'items-start justify-end' : 'items-center justify-center text-center'}`}>
          <span className={`h-1.5 w-14 rounded-full ${kind === 'SaaS starter' ? 'bg-spark/70' : 'bg-brand/50'}`} />
          <span className={`h-3.5 rounded-full bg-ink/35 ${kind === 'Agency' ? 'w-5/6' : 'w-3/4'}`} />
          <span className={`h-3.5 rounded-full bg-ink/35 ${kind === 'Agency' ? 'w-3/5' : 'w-1/2'}`} />
          <span className={`h-1.5 w-2/3 ${bar}`} />
          <div className="mt-1 flex gap-2"><span className="h-5 w-16 rounded-full bg-brand" /><span className="h-5 w-14 rounded-full border border-line" /></div>
          {kind === 'SaaS starter' && <div className="mt-1 flex w-full gap-2">{[0, 1, 2].map(i => <span key={i} className={`h-6 flex-1 ${block}`} />)}</div>}
        </div>}
      </div>
    </div>
  )
}

function TemplateCard({ t, copied, onCopy }: { t: Template; copied: boolean; onCopy: () => void }) {
  const free = t.access === 'Free'
  return (
    <article className="kosh-spot kosh-reveal group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-xl">
      <div className="relative aspect-[8/5] border-b border-line bg-surface-2 p-5">
        <Cover kind={t.kind} />
        <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${free ? 'bg-ok text-white' : 'bg-ink text-bg'}`}>{t.access}</span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold leading-tight group-hover:text-brand">{t.name}</h3>
          <span className="shrink-0 rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand">{t.kind}</span>
        </div>
        <p className="mt-0.5 text-xs text-muted">by @{t.author}</p>
        <p className="mt-2 line-clamp-3 text-sm text-muted">{t.note}</p>
        <div className="mt-auto pt-4">
          <button onClick={onCopy} aria-live="polite" title="Copy install command"
            className="flex w-full items-center gap-2 rounded-xl bg-[#0b0f24] px-3 py-2.5 text-left font-mono text-[11px] text-[#dfe4ff] transition hover:bg-[#141a3a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
            <Terminal size={13} className="shrink-0 text-[#98a0c7]" />
            <span className="min-w-0 flex-1 truncate">{copied ? 'Copied to clipboard' : installCommand(t)}</span>
            {copied ? <Check size={13} className="shrink-0 text-[#7ee787]" /> : <Copy size={13} className="shrink-0 text-[#98a0c7]" />}
          </button>
          <a href={templateUrl(t)} target="_blank" rel="noreferrer" className="mt-2 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-full border border-line text-sm font-medium transition hover:border-brand hover:text-brand">
            Preview on 21st.dev <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </article>
  )
}

export function TemplatesPage() {
  const [access, setAccess] = useState<TemplateAccess | 'All'>('All')
  const [kind, setKind] = useState<TemplateKind | 'All'>('All')
  const [q, setQ] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const byAccess = useMemo(() => templates.filter(t => access === 'All' || t.access === access), [access])
  const shown = useMemo(() => byAccess.filter(t =>
    (kind === 'All' || t.kind === kind) &&
    (!q || (t.name + t.author + t.kind + t.note).toLowerCase().includes(q.toLowerCase()))), [byAccess, kind, q])
  const free = templates.filter(t => t.access === 'Free').length
  const copy = async (t: Template) => {
    try { await navigator.clipboard.writeText(installCommand(t)) } catch { /* clipboard may be unavailable */ }
    setCopied(t.slug)
    window.setTimeout(() => setCopied(c => (c === t.slug ? null : c)), 1800)
  }
  const chip = (on: boolean) => `shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-medium transition ${on ? 'border-ink bg-ink text-bg' : 'border-line bg-surface text-muted hover:border-brand hover:text-ink'}`

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <section className="kosh-hero py-14 sm:py-20">
        <span aria-hidden className="kosh-hero-glow" />
        <h1 className="kosh-rise max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          Whole websites, <span className="text-brand">one command away.</span>
        </h1>
        <p className="kosh-rise mt-5 max-w-2xl text-lg text-muted" style={{ animationDelay: '.08s' }}>
          {templates.length} complete site templates picked from 21st.dev: {free} free, {templates.length - free} included with a 21st.dev plan. Copy the command, run it in an empty folder, and start from a finished design.
        </p>
        <div className="kosh-rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: '.16s' }}>
          <label className="flex h-12 w-full max-w-md items-center gap-3 rounded-full border border-line bg-surface px-4 shadow-sm transition focus-within:border-brand focus-within:shadow-[0_0_0_4px] focus-within:shadow-brand/15">
            <Search size={18} className="text-muted" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search portfolio, dashboard, AI…" aria-label="Search templates" className="w-full bg-transparent text-sm outline-none" />
          </label>
          <div role="tablist" aria-label="Access" className="inline-flex rounded-full border border-line bg-surface p-1">
            {(['All', 'Free', 'With plan'] as const).map(a => (
              <button key={a} role="tab" aria-selected={access === a} onClick={() => setAccess(a)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${access === a ? 'bg-ink text-bg' : 'text-muted hover:text-ink'}`}>{a}</button>
            ))}
          </div>
        </div>
      </section>

      <div role="tablist" aria-label="Template type" className="sticky top-14 z-30 -mx-4 mb-8 flex snap-x gap-2 overflow-x-auto bg-bg/90 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0">
        {(['All', ...templateKinds] as const).map(k => {
          const n = k === 'All' ? byAccess.length : byAccess.filter(t => t.kind === k).length
          return <button key={k} role="tab" aria-selected={kind === k} onClick={() => setKind(k)} className={chip(kind === k)}>{k} <span className="opacity-60">{n}</span></button>
        })}
      </div>

      {shown.length === 0
        ? <p className="py-20 text-center text-muted">No template matches that. Clear the search or pick another type.</p>
        : <section aria-label="Templates" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map(t => <TemplateCard key={t.slug} t={t} copied={copied === t.slug} onCopy={() => copy(t)} />)}
        </section>}

      <aside className="mt-14 rounded-2xl border border-line bg-surface p-6 text-sm text-muted">
        <h2 className="font-display text-lg font-bold text-ink">Before you install</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li><span className="font-medium text-ink">Free</span> templates download without a subscription. <span className="font-medium text-ink">With plan</span> templates need a paid 21st.dev plan, and the command will ask you to sign in.</li>
          <li>Every template is made and owned by its author and hosted on 21st.dev. This page only links to them, and each keeps its own licence, so check it on the template page before shipping.</li>
          <li>The cards show a sketch of the layout type, not a screenshot. Open the preview to see the real design.</li>
        </ul>
      </aside>
    </main>
  )
}
