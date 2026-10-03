import { useRef, useState, useEffect } from 'react'
import { UploadCloud, FileText, X, Camera } from 'lucide-react'
import type { Device } from '../types'

export const meta = {
  id: 'file-dropzone',
  title: 'File upload dropzone',
  category: 'Forms',
  description: 'Drag-and-drop upload area with a file list and progress. On phones it swaps to browse and camera buttons.',
  source: ['21-Transform', '19-ev-connect'],
  tags: ['upload', 'dropzone', 'files'],
  notes: ['Dropzone is also a button that opens the file picker, so keyboard users are covered.'],
} as const

const size = (n: number) => (n > 1e6 ? `${(n / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1e3))} KB`)

export default function FileDropzone({ device }: { device: Device }) {
  const [files, setFiles] = useState<{ n: string; s: number; p: number }[]>([])
  const [over, setOver] = useState(false)
  const input = useRef<HTMLInputElement>(null)
  const mobile = device === 'mobile'
  const add = (fl: FileList | null) => {
    if (!fl) return
    const nf = [...fl].map((f) => ({ n: f.name, s: f.size, p: 0 }))
    setFiles((x) => [...x, ...nf])
    const t = setInterval(() => setFiles((x) => x.map((f) => ({ ...f, p: Math.min(100, f.p + 20) }))), 250)
    setTimeout(() => clearInterval(t), 1400)
  }
  const root = useRef<HTMLDivElement>(null)
  const live = useRef(true)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = root.current
    const ts: number[] = []
    
    const at = (ms: number, f: () => void) => { ts.push(window.setTimeout(() => { if (live.current) f() }, ms)) }
    const stop = () => { live.current = false; ts.forEach(t => clearTimeout(t));  }
    const evs = ['pointerdown', 'keydown', 'wheel', 'focusin']
    evs.forEach(t => el?.addEventListener(t, stop))
    const run = () => {
      at(900, () => setOver(true))
      at(1800, () => { setOver(false); setFiles([{ n: 'stock-2026-Q3.xlsx', s: 1400000, p: 0 }]) })
      for (let k = 1; k <= 5; k++) at(1900 + k * 280, () => setFiles(f => f.map(x => ({ ...x, p: Math.min(100, x.p + 20) }))))
      at(5400, () => setFiles([]))
      at(6400, run)
    }
    run()
    return () => { ts.forEach(t => clearTimeout(t)); evs.forEach(t => el?.removeEventListener(t, stop)) }
  }, [])
  return (
    <div ref={root} className="h-full min-h-[380px] p-6">
      <input ref={input} type="file" multiple className="sr-only" aria-label="Choose files" onChange={(e) => add(e.target.files)} />
      {mobile ? (
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => input.current?.click()} className="flex h-28 flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-surface text-sm font-medium"><UploadCloud className="text-brand" />Browse files</button>
          <button onClick={() => input.current?.click()} className="flex h-28 flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-surface text-sm font-medium"><Camera className="text-brand" />Take photo</button>
        </div>
      ) : (
        <button onClick={() => input.current?.click()} onDragOver={(e) => { e.preventDefault(); setOver(true) }} onDragLeave={() => setOver(false)} onDrop={(e) => { e.preventDefault(); setOver(false); add(e.dataTransfer.files) }}
          className={`flex h-56 w-full flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed transition ${over ? 'scale-[1.01] border-brand bg-brand-soft' : 'border-line bg-surface hover:border-brand'}`}>
          <UploadCloud size={36} className="text-brand" style={{ animation: over ? 'kc-float 1s ease-in-out infinite' : undefined }} />
          <span className="font-medium">Drop your inventory files here</span><span className="text-sm text-muted">or click to browse. XLSX, CSV up to 20 MB</span></button>)}
      <ul className="mt-4 space-y-2" aria-live="polite">
        {files.map((f, i) => (
          <li key={f.n + i} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
            <FileText size={20} className="text-brand" />
            <div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{f.n}</div><div className="mt-1 h-1.5 rounded-full bg-line"><div className="h-full rounded-full bg-brand transition-all" style={{ width: `${f.p}%` }} /></div></div>
            <span className="font-mono text-xs text-muted">{size(f.s)}</span>
            <button aria-label={`Remove ${f.n}`} onClick={() => setFiles(files.filter((_, n) => n !== i))} className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-surface-2"><X size={15} /></button></li>))}
      </ul>
    </div>)
}
