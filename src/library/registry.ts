import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import type { Device, Meta } from './types'
import { groups, placeOf } from './taxonomy'

type DemoProps = { device: Device }
export interface Entry extends Meta {
  Demo: LazyExoticComponent<ComponentType<DemoProps>>
  loadCode: () => Promise<string>
  file: string
  group: string
  family: string
}

// ?meta is served by the meta-only plugin in vite.config.ts, so components stay out of the entry chunk.
const metas = import.meta.glob<Meta>('./*/*.tsx', { eager: true, import: 'meta', query: '?meta' })
const loaders = import.meta.glob<{ default: ComponentType<DemoProps> }>('./*/*.tsx')
const raws = import.meta.glob<string>('./*/*.tsx', { query: '?raw', import: 'default' })
// A 3D scene needs the shared viewport, scene kit and shader helpers, so its Code tab includes them.
const load3DKit = () => Promise.all([
  import('../three/ThreePreview.tsx?raw'),
  import('../three/kit.tsx?raw'),
  import('../three/glsl.ts?raw'),
]).then(([preview, kit, glsl]) => `// ---------- src/three/ThreePreview.tsx (shared canvas and viewport) ----------\n${preview.default}\n\n// ---------- src/three/kit.tsx (frame hook, studio lighting, halo) ----------\n${kit.default}\n\n// ---------- src/three/glsl.ts (noise and palette shader helpers) ----------\n${glsl.default}`)

export const entries: Entry[] = Object.entries(metas)
  .filter(([, m]) => m)
  .map(([path, m]) => ({
    ...m,
    Demo: lazy(loaders[path]),
    loadCode: m.category === '3D'
      ? () => Promise.all([raws[path](), load3DKit()]).then(([component, kit]) => `${component}\n\n${kit}`)
      : raws[path],
    file: m.category === '3D' ? `${path.replace('./', 'src/library/')} + src/three/` : path.replace('./', 'src/library/'),
    group: placeOf(m.id)?.group ?? 'More',
    family: placeOf(m.id)?.family ?? 'Other',
  }))
  .sort((a, b) => a.title.localeCompare(b.title))

export { groups }
