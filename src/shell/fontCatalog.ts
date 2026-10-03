export type FontGroup = 'Sans' | 'Serif' | 'Mono' | 'Display' | 'Script'

export interface Font {
  name: string
  family: string   // ready to paste into font-family
  group: FontGroup // used by the filter on the Fonts page
  kind: string
  use: string
  weights: string  // space-separated, the ones requested in `gf`
  gf: string       // Google Fonts css2 family spec, e.g. "Inter:wght@400..700"
}

const sans = (name: string) => `"${name}", system-ui, sans-serif`
const serif = (name: string) => `"${name}", Georgia, serif`
const mono = (name: string) => `"${name}", ui-monospace, monospace`
const W4 = '400 500 600 700'

export const fonts: Font[] = [
  // ---------- Sans ----------
  { name: 'Inter', family: sans('Inter'), group: 'Sans', kind: 'Neutral UI / Product Sans', use: 'Dashboards, SaaS, interfaces and applications', weights: W4, gf: 'Inter:wght@400..700' },
  { name: 'Roboto', family: '"Roboto", Arial, sans-serif', group: 'Sans', kind: 'Neo-grotesque', use: 'Android, Material Design and general-purpose interfaces', weights: W4, gf: 'Roboto:wght@400..700' },
  { name: 'Open Sans', family: sans('Open Sans'), group: 'Sans', kind: 'Humanist Sans', use: 'Body text for content sites, documentation and email', weights: W4, gf: 'Open+Sans:wght@400..700' },
  { name: 'Montserrat', family: sans('Montserrat'), group: 'Sans', kind: 'Geometric Sans', use: 'Marketing headlines, landing pages and branding', weights: W4, gf: 'Montserrat:wght@400..700' },
  { name: 'Poppins', family: sans('Poppins'), group: 'Sans', kind: 'Geometric Sans', use: 'Friendly product marketing, startups and mobile apps', weights: W4, gf: 'Poppins:wght@400;500;600;700' },
  { name: 'Lato', family: sans('Lato'), group: 'Sans', kind: 'Humanist Sans', use: 'Corporate sites, body text and long-standing brand systems', weights: '400 700', gf: 'Lato:wght@400;700' },
  { name: 'Geist', family: sans('Geist'), group: 'Sans', kind: 'Precise Product Sans', use: 'Developer tools, documentation and crisp product UI', weights: W4, gf: 'Geist:wght@400..700' },
  { name: 'Manrope', family: sans('Manrope'), group: 'Sans', kind: 'Modern Geometric Sans', use: 'Premium SaaS, technology and brand interfaces', weights: W4, gf: 'Manrope:wght@400..700' },
  { name: 'Figtree', family: sans('Figtree'), group: 'Sans', kind: 'Friendly Geometric Sans', use: 'Approachable apps, onboarding and marketing pages', weights: W4, gf: 'Figtree:wght@400..700' },
  { name: 'Hanken Grotesk', family: sans('Hanken Grotesk'), group: 'Sans', kind: 'Soft Workhorse Grotesk', use: 'Body text for brands that have outgrown Lato and Open Sans', weights: W4, gf: 'Hanken+Grotesk:wght@400..700' },
  { name: 'Onest', family: sans('Onest'), group: 'Sans', kind: 'Clear Humanist Sans', use: 'Dense interfaces, tables and multilingual products', weights: W4, gf: 'Onest:wght@400..700' },
  { name: 'Nunito', family: sans('Nunito'), group: 'Sans', kind: 'Rounded Sans', use: 'Education, kids products and soft, friendly interfaces', weights: W4, gf: 'Nunito:wght@400..900' },
  { name: 'Work Sans', family: sans('Work Sans'), group: 'Sans', kind: 'Grotesque for Screens', use: 'Mid-size interface text, agencies and editorial UI', weights: W4, gf: 'Work+Sans:wght@400..700' },
  { name: 'Raleway', family: sans('Raleway'), group: 'Sans', kind: 'Elegant Geometric Sans', use: 'Fashion, portfolios and light, airy headlines', weights: W4, gf: 'Raleway:wght@400..700' },
  { name: 'Rubik', family: sans('Rubik'), group: 'Sans', kind: 'Rounded-corner Sans', use: 'Consumer apps and brands that want warmth without going fully round', weights: W4, gf: 'Rubik:wght@400..700' },
  { name: 'Mulish', family: sans('Mulish'), group: 'Sans', kind: 'Minimal Sans', use: 'Clean marketing sites and understated product UI', weights: W4, gf: 'Mulish:wght@400..700' },
  { name: 'Barlow', family: sans('Barlow'), group: 'Sans', kind: 'Slightly Condensed Grotesk', use: 'Sport, automotive, data-dense screens and signage-like UI', weights: W4, gf: 'Barlow:wght@400;500;600;700' },
  { name: 'Karla', family: sans('Karla'), group: 'Sans', kind: 'Quirky Grotesque', use: 'Blogs, indie products and pairings with a serif headline', weights: W4, gf: 'Karla:wght@400..700' },
  { name: 'Space Grotesk', family: sans('Space Grotesk'), group: 'Sans', kind: 'Tech / Display Sans', use: 'Creative development, technology and editorial headlines', weights: W4, gf: 'Space+Grotesk:wght@400..700' },
  { name: 'Sora', family: sans('Sora'), group: 'Sans', kind: 'Futuristic Geometric Sans', use: 'AI, technology and modern brand interfaces', weights: W4, gf: 'Sora:wght@400..700' },
  { name: 'Outfit', family: sans('Outfit'), group: 'Sans', kind: 'Friendly Modern Sans', use: 'Startups, portfolios and modern landing pages', weights: W4, gf: 'Outfit:wght@400..700' },
  { name: 'DM Sans', family: sans('DM Sans'), group: 'Sans', kind: 'Versatile Sans', use: 'Products, websites, editorial UI and branding', weights: W4, gf: 'DM+Sans:wght@400..700' },
  { name: 'Plus Jakarta Sans', family: sans('Plus Jakarta Sans'), group: 'Sans', kind: 'Premium Contemporary Sans', use: 'SaaS, finance and sophisticated digital products', weights: W4, gf: 'Plus+Jakarta+Sans:wght@400..700' },
  { name: 'Instrument Sans', family: sans('Instrument Sans'), group: 'Sans', kind: 'Contemporary UI Sans', use: 'Polished interfaces, product design and restrained editorial work', weights: W4, gf: 'Instrument+Sans:wght@400..700' },
  { name: 'Schibsted Grotesk', family: sans('Schibsted Grotesk'), group: 'Sans', kind: 'News Grotesk', use: 'News products, content sites and confident headlines', weights: W4, gf: 'Schibsted+Grotesk:wght@400..700' },
  { name: 'Lexend', family: sans('Lexend'), group: 'Sans', kind: 'Readability Sans', use: 'Education, accessibility-first products and long reading on screens', weights: W4, gf: 'Lexend:wght@400..700' },
  { name: 'Roboto Flex', family: '"Roboto Flex", Arial, sans-serif', group: 'Sans', kind: 'Variable Neo-grotesque', use: 'Adaptive interfaces, dense dashboards and responsive typography', weights: W4, gf: 'Roboto+Flex:opsz,wght@8..144,400..700' },
  { name: 'Urbanist', family: sans('Urbanist'), group: 'Sans', kind: 'Geometric UI Sans', use: 'Modern product interfaces, consumer apps and clean brand systems', weights: W4, gf: 'Urbanist:wght@400..700' },
  { name: 'IBM Plex Sans', family: '"IBM Plex Sans", Arial, sans-serif', group: 'Sans', kind: 'Humanist Sans', use: 'Technical products, dashboards and editorial systems', weights: W4, gf: 'IBM+Plex+Sans:wght@400..700' },
  { name: 'Archivo', family: '"Archivo", Arial, sans-serif', group: 'Sans', kind: 'Grotesque Sans', use: 'Brand systems, strong headlines and functional interfaces', weights: W4, gf: 'Archivo:wght@400..700' },

  // ---------- Serif ----------
  { name: 'Playfair Display', family: serif('Playfair Display'), group: 'Serif', kind: 'Editorial Serif', use: 'Fashion, luxury, magazines and premium branding', weights: W4, gf: 'Playfair+Display:wght@400..700' },
  { name: 'Instrument Serif', family: serif('Instrument Serif'), group: 'Serif', kind: 'Condensed Display Serif', use: 'Large, quiet headlines on startup and studio sites', weights: '400', gf: 'Instrument+Serif' },
  { name: 'Fraunces', family: serif('Fraunces'), group: 'Serif', kind: 'Soft Display Serif', use: 'Editorial covers, lifestyle brands and expressive headlines', weights: W4, gf: 'Fraunces:opsz,wght@9..144,400..800' },
  { name: 'Lora', family: serif('Lora'), group: 'Serif', kind: 'Calligraphic Text Serif', use: 'Blog posts, essays and warm long-form reading', weights: W4, gf: 'Lora:wght@400..700' },
  { name: 'Merriweather', family: serif('Merriweather'), group: 'Serif', kind: 'Sturdy Screen Serif', use: 'News, documentation and body text at small sizes', weights: W4, gf: 'Merriweather:wght@400..700' },
  { name: 'EB Garamond', family: serif('EB Garamond'), group: 'Serif', kind: 'Classical Old-style Serif', use: 'Books, academic writing and literary publications', weights: W4, gf: 'EB+Garamond:wght@400..700' },
  { name: 'Libre Baskerville', family: serif('Libre Baskerville'), group: 'Serif', kind: 'Transitional Serif', use: 'Traditional body text, law, finance and institutions', weights: '400 700', gf: 'Libre+Baskerville:wght@400;700' },
  { name: 'Newsreader', family: serif('Newsreader'), group: 'Serif', kind: 'Reading Serif', use: 'Articles, newsletters and long-form on screens', weights: W4, gf: 'Newsreader:opsz,wght@6..72,400..700' },
  { name: 'Cormorant Garamond', family: serif('Cormorant Garamond'), group: 'Serif', kind: 'Luxury / Classical Serif', use: 'Luxury brands, hospitality, fashion and editorial identities', weights: W4, gf: 'Cormorant+Garamond:wght@400..700' },
  { name: 'Source Serif 4', family: serif('Source Serif 4'), group: 'Serif', kind: 'Text Serif', use: 'Long-form reading, publishing and carefully composed editorial pages', weights: W4, gf: 'Source+Serif+4:opsz,wght@8..60,400..700' },
  { name: 'DM Serif Display', family: serif('DM Serif Display'), group: 'Serif', kind: 'High-contrast Display Serif', use: 'Punchy headlines, posters and pull quotes', weights: '400', gf: 'DM+Serif+Display' },

  // ---------- Mono ----------
  { name: 'JetBrains Mono', family: mono('JetBrains Mono'), group: 'Mono', kind: 'Coding Monospace', use: 'Developer portfolios, terminals and code-oriented sections', weights: '400 500 700', gf: 'JetBrains+Mono:wght@400..700' },
  { name: 'Fira Code', family: mono('Fira Code'), group: 'Mono', kind: 'Monospace with Ligatures', use: 'Code samples where arrows and operators should read as symbols', weights: W4, gf: 'Fira+Code:wght@400..700' },
  { name: 'Geist Mono', family: mono('Geist Mono'), group: 'Mono', kind: 'Product Monospace', use: 'Code blocks, numbers in dashboards and technical labels', weights: W4, gf: 'Geist+Mono:wght@400..700' },
  { name: 'IBM Plex Mono', family: mono('IBM Plex Mono'), group: 'Mono', kind: 'Engineered Monospace', use: 'Technical documentation, data tables and brand accents', weights: W4, gf: 'IBM+Plex+Mono:wght@400;500;600;700' },
  { name: 'Space Mono', family: mono('Space Mono'), group: 'Mono', kind: 'Retro-futurist Monospace', use: 'Labels, captions and headline accents with character', weights: '400 700', gf: 'Space+Mono:wght@400;700' },

  // ---------- Display ----------
  { name: 'Bricolage Grotesque', family: sans('Bricolage Grotesque'), group: 'Display', kind: 'Expressive Grotesque', use: 'Distinctive headlines, creative studios and expressive product brands', weights: W4, gf: 'Bricolage+Grotesque:opsz,wght@12..96,400..800' },
  { name: 'Oswald', family: sans('Oswald'), group: 'Display', kind: 'Condensed Gothic', use: 'News banners, sport and tall headlines in tight spaces', weights: W4, gf: 'Oswald:wght@400..700' },
  { name: 'Bebas Neue', family: sans('Bebas Neue'), group: 'Display', kind: 'All-caps Condensed Display', use: 'Posters, hero titles and bold numerals', weights: '400', gf: 'Bebas+Neue' },
  { name: 'Archivo Black', family: sans('Archivo Black'), group: 'Display', kind: 'Heavy Grotesque', use: 'Neo-brutalist headlines, stickers and loud calls to action', weights: '400', gf: 'Archivo+Black' },
  { name: 'Syne', family: sans('Syne'), group: 'Display', kind: 'Experimental Display Sans', use: 'Art direction, cultural projects and bold campaign headlines', weights: '500 600 700 800', gf: 'Syne:wght@500..800' },
  { name: 'Unbounded', family: sans('Unbounded'), group: 'Display', kind: 'Wide Display Sans', use: 'Futuristic identities, event graphics and assertive display typography', weights: W4, gf: 'Unbounded:wght@400..700' },
  { name: 'Orbitron', family: sans('Orbitron'), group: 'Display', kind: 'Sci-fi Geometric', use: 'Gaming, space and technology titles', weights: '500 600 700 800', gf: 'Orbitron:wght@500..900' },

  // ---------- Script ----------
  { name: 'Caveat', family: '"Caveat", cursive', group: 'Script', kind: 'Handwriting', use: 'Annotations, signatures and a human note beside clean type', weights: W4, gf: 'Caveat:wght@400..700' },
]

export interface Pairing { heading: string; body: string; mood: string; use: string }
/** Combinations designers reach for again and again. */
export const pairings: Pairing[] = [
  { heading: 'Playfair Display', body: 'Inter', mood: 'Editorial and trustworthy', use: 'Magazines, luxury retail, long-form marketing' },
  { heading: 'Instrument Serif', body: 'Geist', mood: 'Quiet and current', use: 'Startup landing pages, studios, AI products' },
  { heading: 'Fraunces', body: 'Instrument Sans', mood: 'Warm and characterful', use: 'Food, lifestyle, independent brands' },
  { heading: 'Bricolage Grotesque', body: 'Inter', mood: 'Confident and friendly', use: 'Product marketing, portfolios, communities' },
  { heading: 'Space Grotesk', body: 'IBM Plex Sans', mood: 'Technical and precise', use: 'Developer tools, infrastructure, data products' },
  { heading: 'DM Serif Display', body: 'DM Sans', mood: 'Classic with a modern body', use: 'Finance, consultancies, annual reports' },
  { heading: 'Montserrat', body: 'Merriweather', mood: 'Bold title, bookish text', use: 'Blogs, non-profits, education' },
  { heading: 'Oswald', body: 'Lora', mood: 'Headline news', use: 'Publications, sport, event pages' },
  { heading: 'Unbounded', body: 'Manrope', mood: 'Futuristic and wide', use: 'Web3, events, launch pages' },
]

export const fontGroups: FontGroup[] = ['Sans', 'Serif', 'Mono', 'Display', 'Script']
export const fontCount = fonts.length
export const fontByName = (name: string) => fonts.find(f => f.name === name)

const GF = 'https://fonts.googleapis.com/css2?'
export const embedUrl = (specs: string[]) => `${GF}${specs.map(s => `family=${s}`).join('&')}&display=swap`
/** The <link> tag that loads one or more catalog fonts from Google Fonts. */
export const embedTag = (fs: Font[]) => `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="${embedUrl(fs.map(f => f.gf))}" rel="stylesheet">`

/** Fonts the style demos use that are not in the catalog above. */
const STYLE_ONLY = ['Press+Start+2P', 'VT323', 'Cinzel:wght@400..700', 'Josefin+Sans:wght@400..700']
/** The site's own three fonts are loaded by index.html; everything else waits for a tab that needs it. */
const CORE = ['Bricolage Grotesque', 'Instrument Sans', 'JetBrains Mono']

let requested = false
/** Adds the showcase font stylesheets once. Called when the Fonts or Styles tab is first opened. */
export function loadShowcaseFonts() {
  if (requested || typeof document === 'undefined') return
  requested = true
  const specs = [...fonts.filter(f => !CORE.includes(f.name)).map(f => f.gf), ...STYLE_ONLY]
  // Several smaller requests instead of one very long URL; a bad family then only costs its own batch.
  for (let i = 0; i < specs.length; i += 14) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = embedUrl(specs.slice(i, i + 14))
    document.head.appendChild(link)
  }
}
