import { readFile } from 'node:fs/promises'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

/** Returns the `{ ... }` literal that follows `export const meta =`, skipping braces inside strings. */
function metaLiteral(src: string): string | null {
  const at = src.indexOf('export const meta')
  const start = at < 0 ? -1 : src.indexOf('{', at)
  if (start < 0) return null
  let depth = 0
  let quote = ''
  for (let i = start; i < src.length; i++) {
    const c = src[i]
    if (quote) {
      if (c === '\\') i++
      else if (c === quote) quote = ''
    } else if (c === '\'' || c === '"' || c === '`') quote = c
    else if (c === '{') depth++
    else if (c === '}' && --depth === 0) return src.slice(start, i + 1)
  }
  return null
}

/**
 * `./File.tsx?meta` resolves to a module holding only that file's `meta` object.
 * The registries read every meta eagerly; without this the eager read drags each
 * component into the entry chunk and defeats their lazy imports.
 */
function metaOnly(): Plugin {
  return {
    name: 'kosh-meta-only',
    enforce: 'pre',
    async load(id) {
      if (!id.endsWith('?meta')) return null
      const file = id.slice(0, -'?meta'.length)
      this.addWatchFile(file)
      const literal = metaLiteral(await readFile(file, 'utf8'))
      return `export const meta = ${literal ?? 'undefined'}`
    },
  }
}

export default defineConfig({
  plugins: [metaOnly(), react(), tailwindcss()],
})
