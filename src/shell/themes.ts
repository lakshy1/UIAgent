export interface Theme {
  id: string
  name: string
  mode: 'light' | 'dark'
  known: string // where people know this palette from
  bg: string
  surface: string
  ink: string
  muted: string
  line: string
  brand: string
  accent: string
}

export const themes: Theme[] = [
  // ---------- Light ----------
  { id: 'neutral-light', name: 'Neutral', mode: 'light', known: 'shadcn/ui default, Vercel-style monochrome', bg: '#ffffff', surface: '#fafafa', ink: '#0a0a0a', muted: '#737373', line: '#e5e5e5', brand: '#171717', accent: '#f59e0b' },
  { id: 'github-light', name: 'GitHub Light', mode: 'light', known: 'github.com light theme', bg: '#ffffff', surface: '#f6f8fa', ink: '#1f2328', muted: '#656d76', line: '#d0d7de', brand: '#0969da', accent: '#1a7f37' },
  { id: 'indigo-saas', name: 'Indigo SaaS', mode: 'light', known: 'Tailwind slate + indigo, the default SaaS look', bg: '#f8fafc', surface: '#ffffff', ink: '#0f172a', muted: '#64748b', line: '#e2e8f0', brand: '#4f46e5', accent: '#f59e0b' },
  { id: 'solarized-light', name: 'Solarized Light', mode: 'light', known: 'Ethan Schoonover, editors and terminals', bg: '#fdf6e3', surface: '#eee8d5', ink: '#073642', muted: '#657b83', line: '#d9d1b8', brand: '#268bd2', accent: '#b58900' },
  { id: 'catppuccin-latte', name: 'Catppuccin Latte', mode: 'light', known: 'Catppuccin, the light flavour', bg: '#eff1f5', surface: '#e6e9ef', ink: '#4c4f69', muted: '#6c6f85', line: '#ccd0da', brand: '#8839ef', accent: '#fe640b' },
  { id: 'nord-light', name: 'Nord Snow', mode: 'light', known: 'Nord, Snow Storm and Frost', bg: '#eceff4', surface: '#e5e9f0', ink: '#2e3440', muted: '#4c566a', line: '#d8dee9', brand: '#5e81ac', accent: '#d08770' },
  { id: 'rose-pine-dawn', name: 'Rosé Pine Dawn', mode: 'light', known: 'Rosé Pine, the light variant', bg: '#faf4ed', surface: '#fffaf3', ink: '#575279', muted: '#797593', line: '#dfdad9', brand: '#b4637a', accent: '#ea9d34' },
  { id: 'gruvbox-light', name: 'Gruvbox Light', mode: 'light', known: 'Gruvbox, warm retro editor theme', bg: '#fbf1c7', surface: '#ebdbb2', ink: '#3c3836', muted: '#7c6f64', line: '#d5c4a1', brand: '#076678', accent: '#af3a03' },
  { id: 'emerald-fresh', name: 'Emerald Fresh', mode: 'light', known: 'Health, fintech and sustainability products', bg: '#f6faf7', surface: '#ffffff', ink: '#0b2e1f', muted: '#5b7a6b', line: '#d4e5da', brand: '#059669', accent: '#f59e0b' },
  { id: 'coral-sunset', name: 'Coral Sunset', mode: 'light', known: 'Consumer, food and lifestyle apps', bg: '#fff8f5', surface: '#ffffff', ink: '#2b1a17', muted: '#8a6a62', line: '#f0ddd6', brand: '#e11d48', accent: '#fb923c' },
  { id: 'stripe-light', name: 'Blurple', mode: 'light', known: 'Stripe-style fintech: deep navy ink, violet brand', bg: '#f6f9fc', surface: '#ffffff', ink: '#0a2540', muted: '#56687d', line: '#e3e8ee', brand: '#635bff', accent: '#00b4d8' },
  { id: 'ayu-light', name: 'Ayu Light', mode: 'light', known: 'Ayu, the bright editor theme', bg: '#fcfcfc', surface: '#f3f4f5', ink: '#3d424a', muted: '#787b80', line: '#e1e3e6', brand: '#399ee6', accent: '#fa8d3e' },
  { id: 'everforest-light', name: 'Everforest Light', mode: 'light', known: 'Everforest, soft green and easy on the eyes', bg: '#fdf6e3', surface: '#f4f0d9', ink: '#4a555b', muted: '#829181', line: '#e0dcc7', brand: '#8da101', accent: '#dc6f2b' },
  { id: 'tokyo-night-day', name: 'Tokyo Night Day', mode: 'light', known: 'Tokyo Night, the daytime variant', bg: '#e1e2e7', surface: '#d0d5e3', ink: '#343b58', muted: '#6172b0', line: '#b7c1e3', brand: '#2e7de9', accent: '#b15c00' },
  { id: 'kanagawa-lotus', name: 'Kanagawa Lotus', mode: 'light', known: 'Kanagawa, inspired by Hokusai, light variant', bg: '#f2ecbc', surface: '#e7dba0', ink: '#545464', muted: '#716e61', line: '#d5cea3', brand: '#4d699b', accent: '#c84053' },
  { id: 'one-light', name: 'One Light', mode: 'light', known: 'Atom One Light, the bright half of One Dark', bg: '#fafafa', surface: '#f0f0f1', ink: '#383a42', muted: '#a0a1a7', line: '#e5e5e6', brand: '#4078f2', accent: '#c18401' },
  { id: 'flexoki-light', name: 'Flexoki Light', mode: 'light', known: 'Flexoki by Steph Ango, inky colours on paper', bg: '#fffcf0', surface: '#f2f0e5', ink: '#100f0f', muted: '#6f6e69', line: '#e6e4d9', brand: '#205ea6', accent: '#bc5215' },
  { id: 'vitesse-light', name: 'Vitesse Light', mode: 'light', known: 'Vitesse by Anthony Fu, quiet green on white', bg: '#ffffff', surface: '#f7f7f7', ink: '#393a34', muted: '#999999', line: '#e7e7e7', brand: '#1e754f', accent: '#b07d48' },
  { id: 'night-owl-light', name: 'Night Owl Light', mode: 'light', known: 'Night Owl, the daytime companion', bg: '#fbfbfb', surface: '#f0f0f0', ink: '#403f53', muted: '#90a7b2', line: '#e0e0e0', brand: '#4876d6', accent: '#c96765' },
  { id: 'papercolor-light', name: 'PaperColor', mode: 'light', known: 'PaperColor, a Vim favourite modelled on Material', bg: '#eeeeee', surface: '#e4e4e4', ink: '#444444', muted: '#878787', line: '#d0d0d0', brand: '#005f87', accent: '#d7005f' },
  { id: 'quiet-light', name: 'Quiet Light', mode: 'light', known: 'Quiet Light, bundled with VS Code', bg: '#f5f5f5', surface: '#ededed', ink: '#333333', muted: '#777777', line: '#dddddd', brand: '#4b69c6', accent: '#aa3731' },
  { id: 'sky-product', name: 'Sky Product', mode: 'light', known: 'Tailwind slate + sky, calm B2B dashboards', bg: '#f8fafc', surface: '#ffffff', ink: '#0f172a', muted: '#64748b', line: '#e2e8f0', brand: '#0284c7', accent: '#f97316' },
  { id: 'warm-stone', name: 'Warm Stone', mode: 'light', known: 'Tailwind stone + orange, editorial and hospitality', bg: '#fafaf9', surface: '#ffffff', ink: '#1c1917', muted: '#78716c', line: '#e7e5e4', brand: '#c2410c', accent: '#0d9488' },
  // ---------- Dark ----------
  { id: 'github-dark', name: 'GitHub Dark', mode: 'dark', known: 'github.com dark theme', bg: '#0d1117', surface: '#161b22', ink: '#e6edf3', muted: '#8b949e', line: '#30363d', brand: '#58a6ff', accent: '#3fb950' },
  { id: 'dracula', name: 'Dracula', mode: 'dark', known: 'Dracula, in nearly every editor and terminal', bg: '#282a36', surface: '#343746', ink: '#f8f8f2', muted: '#8f9bc7', line: '#44475a', brand: '#bd93f9', accent: '#50fa7b' },
  { id: 'nord', name: 'Nord', mode: 'dark', known: 'Nord, Polar Night and Frost', bg: '#2e3440', surface: '#3b4252', ink: '#eceff4', muted: '#9aa5b8', line: '#434c5e', brand: '#88c0d0', accent: '#ebcb8b' },
  { id: 'tokyo-night', name: 'Tokyo Night', mode: 'dark', known: 'Tokyo Night, VS Code favourite', bg: '#1a1b26', surface: '#24283b', ink: '#c0caf5', muted: '#7f87ad', line: '#2f334d', brand: '#7aa2f7', accent: '#e0af68' },
  { id: 'one-dark', name: 'One Dark', mode: 'dark', known: 'Atom One Dark, the VS Code classic', bg: '#282c34', surface: '#21252b', ink: '#abb2bf', muted: '#7f848e', line: '#3e4451', brand: '#61afef', accent: '#e5c07b' },
  { id: 'catppuccin-mocha', name: 'Catppuccin Mocha', mode: 'dark', known: 'Catppuccin, the dark flavour', bg: '#1e1e2e', surface: '#313244', ink: '#cdd6f4', muted: '#a6adc8', line: '#45475a', brand: '#cba6f7', accent: '#fab387' },
  { id: 'solarized-dark', name: 'Solarized Dark', mode: 'dark', known: 'Ethan Schoonover, editors and terminals', bg: '#002b36', surface: '#073642', ink: '#eee8d5', muted: '#93a1a1', line: '#124a58', brand: '#2aa198', accent: '#b58900' },
  { id: 'gruvbox-dark', name: 'Gruvbox Dark', mode: 'dark', known: 'Gruvbox, warm retro editor theme', bg: '#282828', surface: '#3c3836', ink: '#ebdbb2', muted: '#a89984', line: '#504945', brand: '#fabd2f', accent: '#b8bb26' },
  { id: 'rose-pine', name: 'Rosé Pine', mode: 'dark', known: 'Rosé Pine, soft and low-contrast', bg: '#191724', surface: '#1f1d2e', ink: '#e0def4', muted: '#908caa', line: '#26233a', brand: '#ebbcba', accent: '#f6c177' },
  { id: 'zinc-midnight', name: 'Zinc Midnight', mode: 'dark', known: 'Tailwind zinc + indigo, modern dark dashboards', bg: '#09090b', surface: '#18181b', ink: '#fafafa', muted: '#a1a1aa', line: '#27272a', brand: '#818cf8', accent: '#fbbf24' },
  { id: 'monokai', name: 'Monokai', mode: 'dark', known: 'Monokai, the Sublime Text classic', bg: '#272822', surface: '#34352f', ink: '#f8f8f2', muted: '#a59f85', line: '#49483e', brand: '#f92672', accent: '#a6e22e' },
  { id: 'night-owl', name: 'Night Owl', mode: 'dark', known: 'Night Owl by Sarah Drasner, tuned for late nights', bg: '#011627', surface: '#0b2942', ink: '#d6deeb', muted: '#7f96ad', line: '#1d3b53', brand: '#82aaff', accent: '#addb67' },
  { id: 'ayu-mirage', name: 'Ayu Mirage', mode: 'dark', known: 'Ayu, the mid-dark variant', bg: '#1f2430', surface: '#242936', ink: '#cccac2', muted: '#8a9199', line: '#343b4c', brand: '#73d0ff', accent: '#ffcc66' },
  { id: 'everforest-dark', name: 'Everforest Dark', mode: 'dark', known: 'Everforest, warm green forest tones', bg: '#2d353b', surface: '#343f44', ink: '#d3c6aa', muted: '#9da9a0', line: '#475258', brand: '#a7c080', accent: '#e69875' },
  { id: 'kanagawa-wave', name: 'Kanagawa Wave', mode: 'dark', known: 'Kanagawa, inspired by Hokusai, the original', bg: '#1f1f28', surface: '#2a2a37', ink: '#dcd7ba', muted: '#9a9783', line: '#363646', brand: '#7e9cd8', accent: '#ffa066' },
  { id: 'catppuccin-macchiato', name: 'Catppuccin Macchiato', mode: 'dark', known: 'Catppuccin, the medium-dark flavour', bg: '#24273a', surface: '#363a4f', ink: '#cad3f5', muted: '#a5adcb', line: '#494d64', brand: '#c6a0f6', accent: '#f5a97f' },
  { id: 'tokyo-night-storm', name: 'Tokyo Night Storm', mode: 'dark', known: 'Tokyo Night, the softer blue-grey variant', bg: '#24283b', surface: '#292e42', ink: '#c0caf5', muted: '#565f89', line: '#3b4261', brand: '#7aa2f7', accent: '#9ece6a' },
  { id: 'github-dimmed', name: 'GitHub Dimmed', mode: 'dark', known: 'github.com dark dimmed theme', bg: '#22272e', surface: '#2d333b', ink: '#adbac7', muted: '#768390', line: '#444c56', brand: '#539bf5', accent: '#57ab5a' },
  { id: 'rose-pine-moon', name: 'Rosé Pine Moon', mode: 'dark', known: 'Rosé Pine, the dusk variant', bg: '#232136', surface: '#2a273f', ink: '#e0def4', muted: '#908caa', line: '#393552', brand: '#c4a7e7', accent: '#f6c177' },
  { id: 'synthwave-84', name: "SynthWave '84", mode: 'dark', known: "SynthWave '84 by Robb Owen, neon on purple", bg: '#262335', surface: '#34294f', ink: '#f4eeff', muted: '#848bbd', line: '#463c6b', brand: '#ff7edb', accent: '#fede5d' },
  { id: 'poimandres', name: 'Poimandres', mode: 'dark', known: 'Poimandres, minimal with mint highlights', bg: '#1b1e28', surface: '#252b37', ink: '#e4f0fb', muted: '#767c9d', line: '#303340', brand: '#5de4c7', accent: '#add7ff' },
  { id: 'vesper', name: 'Vesper', mode: 'dark', known: 'Vesper by Rauno Freiberg, near-black with peach', bg: '#101010', surface: '#1c1c1c', ink: '#ededed', muted: '#a0a0a0', line: '#282828', brand: '#ffc799', accent: '#99ffe4' },
  { id: 'flexoki-dark', name: 'Flexoki Dark', mode: 'dark', known: 'Flexoki by Steph Ango, warm ink black', bg: '#100f0f', surface: '#1c1b1a', ink: '#cecdc3', muted: '#878580', line: '#343331', brand: '#4385be', accent: '#da702c' },
  { id: 'palenight', name: 'Palenight', mode: 'dark', known: 'Material Palenight, soft violet-grey', bg: '#292d3e', surface: '#32374d', ink: '#bfc7d5', muted: '#676e95', line: '#3a3f58', brand: '#c792ea', accent: '#ffcb6b' },
  { id: 'cobalt2', name: 'Cobalt2', mode: 'dark', known: 'Cobalt2 by Wes Bos, deep blue and yellow', bg: '#193549', surface: '#1f4662', ink: '#ffffff', muted: '#9db4c7', line: '#2a5677', brand: '#ffc600', accent: '#ff9d00' },
  { id: 'shades-of-purple', name: 'Shades of Purple', mode: 'dark', known: 'Shades of Purple by Ahmad Awais', bg: '#2d2b55', surface: '#1e1e3f', ink: '#ffffff', muted: '#a599e9', line: '#44408a', brand: '#fad000', accent: '#ff628c' },
  { id: 'oxocarbon', name: 'Oxocarbon', mode: 'dark', known: 'IBM Carbon greys with blue and magenta', bg: '#161616', surface: '#262626', ink: '#f2f4f8', muted: '#a2a9b0', line: '#393939', brand: '#78a9ff', accent: '#ee5396' },
  { id: 'moonlight', name: 'Moonlight', mode: 'dark', known: 'Moonlight II, cool indigo editor theme', bg: '#222436', surface: '#2f334d', ink: '#c8d3f5', muted: '#828bb8', line: '#383e5c', brand: '#82aaff', accent: '#ffc777' },
  { id: 'horizon', name: 'Horizon', mode: 'dark', known: 'Horizon, warm dusk reds and corals', bg: '#1c1e26', surface: '#232530', ink: '#d5d8da', muted: '#6c6f93', line: '#2e303e', brand: '#e95678', accent: '#fab795' },
  { id: 'graphite', name: 'Graphite', mode: 'dark', known: 'Linear-style product dark: near-black with indigo', bg: '#08090a', surface: '#141516', ink: '#f7f8f8', muted: '#8a8f98', line: '#23252a', brand: '#7170ff', accent: '#4cb782' },
]

const toRgb = (hex: string) => { const n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
const toHex = (c: number[]) => '#' + c.map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('')
/** Blend a toward b by t (0..1), in sRGB, the same result as CSS color-mix(in srgb, ...). */
export const mix = (a: string, b: string, t: number) => { const x = toRgb(a), y = toRgb(b); return toHex(x.map((v, i) => v + (y[i] - v) * t)) }

function lum(hex: string) {
  return toRgb(hex)
    .map(c => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4 })
    .reduce((a, c, i) => a + c * [0.2126, 0.7152, 0.0722][i], 0)
}
export function contrast(a: string, b: string) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}
/** Readable text colour on top of a brand fill. */
export const onBrand = (brand: string) => (contrast(brand, '#ffffff') >= contrast(brand, '#0a0a0a') ? '#ffffff' : '#0a0a0a')

export const AA = 4.5

/**
 * What the site actually uses for a palette. Editor themes were designed for syntax colours, not body
 * text, so their published muted and brand values often fall short of 4.5:1. Those two are stepped
 * toward the palette's own ink until they pass on every surface they are drawn on. Hue is kept.
 */
export interface Resolved {
  bg: string; surface: string; surface2: string; ink: string; muted: string; line: string
  brand: string; brandSoft: string; spark: string; onBrand: string
  tuned: boolean // true when muted or brand had to move
}
export function resolve(t: Theme): Resolved {
  const surface2 = mix(t.surface, t.ink, 0.07)
  const soft = (brand: string) => mix(t.bg, brand, 0.16)
  const passes = (fg: string, grounds: string[]) => grounds.every(g => contrast(fg, g) >= AA)
  let muted = t.muted
  for (let i = 0; i < 40 && !passes(muted, [t.bg, t.surface, surface2]); i++) muted = mix(muted, t.ink, 0.05)
  let brand = t.brand
  for (let i = 0; i < 40 && !passes(brand, [t.bg, t.surface, soft(brand)]); i++) brand = mix(brand, t.ink, 0.05)
  return {
    bg: t.bg, surface: t.surface, surface2, ink: t.ink, muted, line: t.line,
    brand, brandSoft: soft(brand), spark: t.accent, onBrand: onBrand(brand),
    tuned: muted !== t.muted || brand !== t.brand,
  }
}

/** CSS variables our components read. */
export function themeVars(t: Theme): Record<string, string> {
  const r = resolve(t)
  return {
    '--bg': r.bg,
    '--surface': r.surface,
    '--surface-2': r.surface2,
    '--ink': r.ink,
    '--muted': r.muted,
    '--line': r.line,
    '--brand': r.brand,
    '--brand-soft': r.brandSoft,
    '--spark': r.spark,
    '--on-brand': r.onBrand,
  }
}

export type ThemeFormat = 'css' | 'tailwind' | 'json'
export const themeFormats: [ThemeFormat, string][] = [['css', 'CSS variables'], ['tailwind', 'Tailwind v4'], ['json', 'JSON']]

/** The palette as copyable code, in the format the reader's project uses. */
export function themeCode(t: Theme, format: ThemeFormat = 'css'): string {
  const v = Object.entries(themeVars(t))
  if (format === 'json') return JSON.stringify(Object.fromEntries(v.map(([k, val]) => [k.slice(2), val])), null, 2)
  if (format === 'tailwind') return `@theme {\n${v.map(([k, val]) => `  --color-${k.slice(2)}: ${val};`).join('\n')}\n}`
  const sel = t.mode === 'dark' ? ':root[data-theme="dark"]' : ':root'
  return `/* ${t.name} */\n${sel} {\n${v.map(([k, val]) => `  ${k}: ${val};`).join('\n')}\n}`
}
