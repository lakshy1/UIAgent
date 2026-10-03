import type { ReactNode } from 'react'

export function Seg<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: [T, ReactNode][] }) {
  return (
    <div role="tablist" className="inline-flex rounded-full border border-line bg-surface p-1">
      {options.map(([v, label]) => (
        <button key={v} role="tab" aria-selected={value === v} onClick={() => onChange(v)}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${value === v ? 'bg-ink text-bg' : 'text-muted hover:text-ink'}`}>{label}</button>
      ))}
    </div>
  )
}
