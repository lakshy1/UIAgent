export type FontGroup = 'Sans' | 'Serif' | 'Mono' | 'Display'

export interface Font {
  name: string
  family: string   // ready to paste into font-family
  group: FontGroup // used by the filter on the Fonts page
  kind: string
  use: string
  weights: string  // space-separated, the ones loaded in index.html
}

export const fonts: Font[] = [
  { name: 'Inter', family: '"Inter", system-ui, sans-serif', group: 'Sans', kind: 'Neutral UI / Product Sans', use: 'Dashboards, SaaS, interfaces and applications', weights: '400 500 600 700' },
  { name: 'Geist', family: '"Geist", system-ui, sans-serif', group: 'Sans', kind: 'Precise Product Sans', use: 'Developer tools, documentation and crisp product UI', weights: '400 500 600 700' },
  { name: 'Manrope', family: '"Manrope", system-ui, sans-serif', group: 'Sans', kind: 'Modern Geometric Sans', use: 'Premium SaaS, technology and brand interfaces', weights: '400 500 600 700' },
  { name: 'Figtree', family: '"Figtree", system-ui, sans-serif', group: 'Sans', kind: 'Friendly Geometric Sans', use: 'Approachable apps, onboarding and marketing pages', weights: '400 500 600 700' },
  { name: 'Hanken Grotesk', family: '"Hanken Grotesk", system-ui, sans-serif', group: 'Sans', kind: 'Soft Workhorse Grotesk', use: 'Body text for brands that have outgrown Lato and Open Sans', weights: '400 500 600 700' },
  { name: 'Onest', family: '"Onest", system-ui, sans-serif', group: 'Sans', kind: 'Clear Humanist Sans', use: 'Dense interfaces, tables and multilingual products', weights: '400 500 600 700' },
  { name: 'Space Grotesk', family: '"Space Grotesk", system-ui, sans-serif', group: 'Sans', kind: 'Tech / Display Sans', use: 'Creative development, technology and editorial headlines', weights: '400 500 600 700' },
  { name: 'Sora', family: '"Sora", system-ui, sans-serif', group: 'Sans', kind: 'Futuristic Geometric Sans', use: 'AI, technology and modern brand interfaces', weights: '400 500 600 700' },
  { name: 'Outfit', family: '"Outfit", system-ui, sans-serif', group: 'Sans', kind: 'Friendly Modern Sans', use: 'Startups, portfolios and modern landing pages', weights: '400 500 600 700' },
  { name: 'DM Sans', family: '"DM Sans", system-ui, sans-serif', group: 'Sans', kind: 'Versatile Sans', use: 'Products, websites, editorial UI and branding', weights: '400 500 600 700' },
  { name: 'Plus Jakarta Sans', family: '"Plus Jakarta Sans", system-ui, sans-serif', group: 'Sans', kind: 'Premium Contemporary Sans', use: 'SaaS, finance and sophisticated digital products', weights: '400 500 600 700' },
  { name: 'Instrument Sans', family: '"Instrument Sans", system-ui, sans-serif', group: 'Sans', kind: 'Contemporary UI Sans', use: 'Polished interfaces, product design and restrained editorial work', weights: '400 500 600 700' },
  { name: 'Schibsted Grotesk', family: '"Schibsted Grotesk", system-ui, sans-serif', group: 'Sans', kind: 'News Grotesk', use: 'News products, content sites and confident headlines', weights: '400 500 600 700' },
  { name: 'Lexend', family: '"Lexend", system-ui, sans-serif', group: 'Sans', kind: 'Readability Sans', use: 'Education, accessibility-first products and long reading on screens', weights: '400 500 600 700' },
  { name: 'Roboto Flex', family: '"Roboto Flex", Arial, sans-serif', group: 'Sans', kind: 'Variable Neo-grotesque', use: 'Adaptive interfaces, dense dashboards and responsive typography', weights: '400 500 600 700' },
  { name: 'Urbanist', family: '"Urbanist", system-ui, sans-serif', group: 'Sans', kind: 'Geometric UI Sans', use: 'Modern product interfaces, consumer apps and clean brand systems', weights: '400 500 600 700' },
  { name: 'IBM Plex Sans', family: '"IBM Plex Sans", Arial, sans-serif', group: 'Sans', kind: 'Humanist Sans', use: 'Technical products, dashboards and editorial systems', weights: '400 500 600 700' },
  { name: 'Archivo', family: '"Archivo", Arial, sans-serif', group: 'Sans', kind: 'Grotesque Sans', use: 'Brand systems, strong headlines and functional interfaces', weights: '400 500 600 700' },
  { name: 'Playfair Display', family: '"Playfair Display", Georgia, serif', group: 'Serif', kind: 'Editorial Serif', use: 'Fashion, luxury, magazines and premium branding', weights: '400 500 600 700' },
  { name: 'Instrument Serif', family: '"Instrument Serif", Georgia, serif', group: 'Serif', kind: 'Condensed Display Serif', use: 'Large, quiet headlines on startup and studio sites', weights: '400' },
  { name: 'Fraunces', family: '"Fraunces", Georgia, serif', group: 'Serif', kind: 'Soft Display Serif', use: 'Editorial covers, lifestyle brands and expressive headlines', weights: '400 500 600 700' },
  { name: 'Newsreader', family: '"Newsreader", Georgia, serif', group: 'Serif', kind: 'Reading Serif', use: 'Articles, newsletters and long-form on screens', weights: '400 500 600 700' },
  { name: 'Cormorant Garamond', family: '"Cormorant Garamond", Georgia, serif', group: 'Serif', kind: 'Luxury / Classical Serif', use: 'Luxury brands, hospitality, fashion and editorial identities', weights: '400 500 600 700' },
  { name: 'Source Serif 4', family: '"Source Serif 4", Georgia, serif', group: 'Serif', kind: 'Text Serif', use: 'Long-form reading, publishing and carefully composed editorial pages', weights: '400 500 600 700' },
  { name: 'DM Serif Display', family: '"DM Serif Display", Georgia, serif', group: 'Serif', kind: 'High-contrast Display Serif', use: 'Punchy headlines, posters and pull quotes', weights: '400' },
  { name: 'JetBrains Mono', family: '"JetBrains Mono", ui-monospace, monospace', group: 'Mono', kind: 'Monospace', use: 'Developer portfolios, terminals and code-oriented sections', weights: '400 500 700' },
  { name: 'Geist Mono', family: '"Geist Mono", ui-monospace, monospace', group: 'Mono', kind: 'Product Monospace', use: 'Code blocks, numbers in dashboards and technical labels', weights: '400 500 600 700' },
  { name: 'Bricolage Grotesque', family: '"Bricolage Grotesque", system-ui, sans-serif', group: 'Display', kind: 'Expressive Grotesque', use: 'Distinctive headlines, creative studios and expressive product brands', weights: '400 500 600 700' },
  { name: 'Syne', family: '"Syne", system-ui, sans-serif', group: 'Display', kind: 'Experimental Display Sans', use: 'Art direction, cultural projects and bold campaign headlines', weights: '500 600 700 800' },
  { name: 'Unbounded', family: '"Unbounded", system-ui, sans-serif', group: 'Display', kind: 'Wide Display Sans', use: 'Futuristic identities, event graphics and assertive display typography', weights: '400 500 600 700' },
]

export const fontGroups: FontGroup[] = ['Sans', 'Serif', 'Mono', 'Display']
export const fontCount = fonts.length
