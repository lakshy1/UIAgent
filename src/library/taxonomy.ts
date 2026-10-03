export interface Family { name: string; ids: string[] }
export interface Group { name: string; blurb: string; families: Family[] }

/** Browse structure: group > family > component. Components are matched by meta.id. */
export const groups: Group[] = [
  {
    name: 'Actions',
    blurb: 'Things people press: calls to action, toggles and quick-action triggers.',
    families: [
      { name: 'Call-to-action buttons', ids: ['glow-button', 'pill-cta', 'shimmer-border-button', 'magnetic-button'] },
      { name: 'Stateful buttons', ids: ['loading-button', 'copy-button', 'heart-burst-button', 'social-login-buttons'] },
      { name: 'Toggles and speed dials', ids: ['segmented-toggle', 'fab-speed-dial'] },
    ],
  },
  {
    name: 'Navigation',
    blurb: 'Getting around: top bars, sidebars, phone docks, tabs and step indicators.',
    families: [
      { name: 'Top bars', ids: ['floating-pill-nav', 'mega-menu-nav', 'minimal-drawer-nav', 'announcement-bar'] },
      { name: 'Sidebars', ids: ['icon-rail-sidebar', 'grouped-sidebar', 'drawer-sidebar'] },
      { name: 'Phone docks and tab bars', ids: ['bottom-dock', 'app-tab-bar-fab', 'magnifying-dock'] },
      { name: 'Tabs, paging and progress', ids: ['underline-tabs', 'segmented-tabs', 'pagination', 'breadcrumbs', 'phase-stepper', 'scroll-spy-toc'] },
      { name: 'Search and command', ids: ['command-palette'] },
    ],
  },
  {
    name: 'Page sections',
    blurb: 'Full-width blocks for landing pages and marketing sites.',
    families: [
      { name: 'Heroes', ids: ['hero-split-mockup', 'hero-spotlight', 'hero-product-demo'] },
      { name: 'Features and process', ids: ['feature-bento', 'feature-rows', 'sticky-scroll-reveal', 'how-it-works-steps', 'vertical-roadmap'] },
      { name: 'Pricing and proof', ids: ['pricing-section', 'comparison-table', 'testimonials', 'stats-band'] },
      { name: 'Conversion and footer', ids: ['cta-banner', 'newsletter-signup', 'launch-countdown', 'faq-accordion', 'footer-section'] },
    ],
  },
  {
    name: 'Cards',
    blurb: 'Self-contained tiles for content, products, metrics and tasks.',
    families: [
      { name: 'Content and product cards', ids: ['article-card', 'product-card', 'profile-card', 'charger-card', 'pricing-card'] },
      { name: 'Dashboard and task cards', ids: ['kpi-card', 'kanban-task-card', 'notification-card'] },
      { name: 'Interactive cards', ids: ['bento-spotlight-card', 'expandable-card', 'glass-card', 'stacked-card-deck', 'tilt-glare-card', 'testimonial-marquee-cards'] },
    ],
  },
  {
    name: 'Overlays and feedback',
    blurb: 'Layers above the page, plus the loading and empty states that tell people what is happening.',
    families: [
      { name: 'Dialogs and sheets', ids: ['modal-dialog', 'confirm-dialog', 'bottom-sheet', 'detail-drawer'] },
      { name: 'Menus and hints', ids: ['context-menu', 'popover-menu', 'tooltip-set', 'notification-center'] },
      { name: 'Toasts', ids: ['toast-stack', 'snackbar-undo'] },
      { name: 'Loading and empty states', ids: ['state-panels', 'shimmer-skeleton', 'charging-ring'] },
    ],
  },
  {
    name: 'Forms and inputs',
    blurb: 'Collecting information: fields, pickers, uploads and multi-step flows.',
    families: [
      { name: 'Fields and controls', ids: ['validated-inputs', 'otp-input', 'tag-input', 'select-combobox', 'star-rating', 'toggle-controls'] },
      { name: 'Search, dates and uploads', ids: ['expanding-search', 'date-picker', 'file-dropzone'] },
      { name: 'Sign-in and multi-step flows', ids: ['login-card', 'multi-step-form', 'stepper-wizard'] },
    ],
  },
  {
    name: 'Data display',
    blurb: 'Showing numbers and records: charts, tables, boards, feeds and metrics.',
    families: [
      { name: 'Charts and gauges', ids: ['bar-chart', 'line-area-chart', 'donut-chart', 'readiness-gauge', 'progress-bars', 'heatmap-calendar'] },
      { name: 'Tables and boards', ids: ['data-table', 'kanban-board', 'leaderboard'] },
      { name: 'Lists and feeds', ids: ['activity-timeline', 'tree-view', 'chat-thread'] },
      { name: 'Metrics and badges', ids: ['sparkline-stat-grid', 'status-badges', 'animated-counter', 'number-ticker', 'pricing-calculator'] },
    ],
  },
  {
    name: 'Media and imagery',
    blurb: 'Photos, audio and video: viewers, players and carousels.',
    families: [
      { name: 'Image viewers', ids: ['image-gallery-lightbox', 'image-zoom', 'before-after-slider', 'parallax-stack'] },
      { name: 'Players and stories', ids: ['audio-player', 'video-player-card', 'stories-viewer'] },
      { name: 'Carousels and people', ids: ['snap-carousel', 'avatar-stack'] },
    ],
  },
  {
    name: 'Motion and text effects',
    blurb: 'Small animated details that add life to interfaces and content.',
    families: [
      { name: 'Text effects', ids: ['blur-in-words', 'morphing-text', 'shimmer-text', 'stagger-text', 'text-scramble', 'typewriter'] },
      { name: 'Ambient motion', ids: ['logo-marquee', 'animated-list', 'floating-blobs', 'orbiting-dots', 'scroll-progress-bar', 'tilt-flip-card'] },
    ],
  },
  {
    name: 'Backgrounds',
    blurb: 'Backdrops for heroes and panels.',
    families: [
      { name: 'Light and glow', ids: ['aurora-background', 'noise-gradient-mesh', 'spotlight-cursor', 'gradient-border-glow', 'ripple-rings'] },
      { name: 'Patterns and particles', ids: ['dot-pattern-glow', 'grid-pattern-fade', 'particles-canvas', 'meteors', 'background-beams'] },
    ],
  },
  {
    name: '3D experiences',
    blurb: 'Interactive 3D models and scenes for product pages, portfolios and immersive heroes.',
    families: [
      { name: 'Interactive 3D experiences', ids: ['chrome-orbital-core', 'synthetic-robot-head', 'floating-sneaker-concept', 'liquid-metal-sculpture', 'glass-crystal-monolith', 'interactive-planet', 'mechanical-reactor', 'digital-human-mask', 'silk-fabric-sculpture', 'futuristic-vehicle-concept', 'headphone-product-model', 'isometric-creative-room', 'kinetic-sculpture', 'dna-biotech-helix', 'torus-energy-engine', 'interactive-character-bust', 'botanical-glass-sculpture', 'dimensional-portal', 'cast-render-story-reel', 'mainframe-mouse-scrub-hero'] },
    ],
  },
]

const lookup = new Map<string, { group: string; family: string }>()
for (const g of groups) for (const f of g.families) for (const id of f.ids) lookup.set(id, { group: g.name, family: f.name })
export const placeOf = (id: string) => lookup.get(id)
