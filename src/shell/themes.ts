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
  { id: 'stripe-light', name: 'Blurple', mode: 'light', known: 'Stripe-style fintech: deep navy ink, violet brand', bg: '#f6f9fc', surface: '#ffffff', ink: '#0a2540', muted: '#56687d', line: '#e3e8ee', brand: '#574fe8', accent: '#00b4d8' },
  { id: 'ayu-light', name: 'Ayu Light', mode: 'light', known: 'Ayu, the bright editor theme', bg: '#fcfcfc', surface: '#f3f4f5', ink: '#3d424a', muted: '#666a70', line: '#e1e3e6', brand: '#1a6fb3', accent: '#fa8d3e' },
  { id: 'everforest-light', name: 'Everforest Light', mode: 'light', known: 'Everforest, soft green and easy on the eyes', bg: '#fdf6e3', surface: '#f4f0d9', ink: '#4a555b', muted: '#616b5f', line: '#e0dcc7', brand: '#547118', accent: '#dc6f2b' },
  { id: 'tokyo-night-day', name: 'Tokyo Night Day', mode: 'light', known: 'Tokyo Night, the daytime variant', bg: '#e1e2e7', surface: '#d0d5e3', ink: '#343b58', muted: '#51587a', line: '#b7c1e3', brand: '#1d5fc4', accent: '#b15c00' },
  { id: 'kanagawa-lotus', name: 'Kanagawa Lotus', mode: 'light', known: 'Kanagawa, inspired by Hokusai, light variant', bg: '#f2ecbc', surface: '#e7dba0', ink: '#545464', muted: '#625f52', line: '#d5cea3', brand: '#4d699b', accent: '#c84053' },
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
  { id: 'monokai', name: 'Monokai', mode: 'dark', known: 'Monokai, the Sublime Text classic', bg: '#272822', surface: '#34352f', ink: '#f8f8f2', muted: '#a59f85', line: '#49483e', brand: '#ff5c93', accent: '#a6e22e' },
  { id: 'night-owl', name: 'Night Owl', mode: 'dark', known: 'Night Owl by Sarah Drasner, tuned for late nights', bg: '#011627', surface: '#0b2942', ink: '#d6deeb', muted: '#7f96ad', line: '#1d3b53', brand: '#82aaff', accent: '#addb67' },
  { id: 'ayu-mirage', name: 'Ayu Mirage', mode: 'dark', known: 'Ayu, the mid-dark variant', bg: '#1f2430', surface: '#242936', ink: '#cccac2', muted: '#8a9199', line: '#343b4c', brand: '#73d0ff', accent: '#ffcc66' },
  { id: 'everforest-dark', name: 'Everforest Dark', mode: 'dark', known: 'Everforest, warm green forest tones', bg: '#2d353b', surface: '#343f44', ink: '#d3c6aa', muted: '#9da9a0', line: '#475258', brand: '#a7c080', accent: '#e69875' },
  { id: 'kanagawa-wave', name: 'Kanagawa Wave', mode: 'dark', known: 'Kanagawa, inspired by Hokusai, the original', bg: '#1f1f28', surface: '#2a2a37', ink: '#dcd7ba', muted: '#9a9783', line: '#363646', brand: '#7e9cd8', accent: '#ffa066' },
]

/** CSS variables our components read. */
export function themeVars(t: Theme): Record<string, string> {
  return {
    '--bg': t.bg,
    '--surface': t.surface,
    '--surface-2': `color-mix(in srgb, ${t.ink} 7%, ${t.surface})`,
    '--ink': t.ink,
    '--muted': t.muted,
    '--line': t.line,
    '--brand': t.brand,
    '--brand-soft': `color-mix(in srgb, ${t.brand} 16%, ${t.bg})`,
    '--spark': t.accent,
  }
}

export function themeCss(t: Theme): string {
  const v = themeVars(t)
  const sel = t.mode === 'dark' ? ':root[data-theme="dark"]' : ':root'
  return `${sel} {\n${Object.entries(v).map(([k, val]) => `  ${k}: ${val};`).join('\n')}\n}`
}

function lum(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
    .map(c => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4 })
    .reduce((a, c, i) => a + c * [0.2126, 0.7152, 0.0722][i], 0)
}
export function contrast(a: string, b: string) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}
/** Readable text colour on top of a brand fill. */
export const onBrand = (brand: string) => (contrast(brand, '#ffffff') >= contrast(brand, '#0a0a0a') ? '#ffffff' : '#0a0a0a')
