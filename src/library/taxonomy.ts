export interface Family { name: string; ids: string[] }
export interface Group { name: string; blurb: string; families: Family[] }

/** Browse structure: group > family > component. Components are matched by meta.id. */
export const groups: Group[] = [
  {
    name: 'Actions',
    blurb: 'Things people press: calls to action, toggles and quick-action triggers.',
    families: [
      { name: 'Call-to-action buttons', ids: ['glow-button', 'pill-cta', 'shimmer-border-button', 'magnetic-button', 'ripple-button'] },
      { name: 'Stateful buttons', ids: ['loading-button', 'copy-button', 'heart-burst-button', 'confetti-button', 'social-login-buttons'] },
      { name: 'Toggles and speed dials', ids: ['segmented-toggle', 'theme-switch', 'fab-speed-dial'] },
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
      { name: 'Features and process', ids: ['feature-bento', 'feature-rows', 'animated-beam-flow', 'sticky-scroll-reveal', 'how-it-works-steps', 'vertical-roadmap', 'tracing-beam-timeline'] },
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
      { name: 'Interactive cards', ids: ['bento-spotlight-card', 'border-beam-card', 'expandable-card', 'glass-card', 'stacked-card-deck', 'tilt-glare-card', 'testimonial-marquee-cards'] },
    ],
  },
  {
    name: 'Overlays and feedback',
    blurb: 'Layers above the page, plus the loading and empty states that tell people what is happening.',
    families: [
      { name: 'Dialogs and sheets', ids: ['modal-dialog', 'confirm-dialog', 'bottom-sheet', 'detail-drawer'] },
      { name: 'Menus and hints', ids: ['context-menu', 'popover-menu', 'tooltip-set', 'notification-center'] },
      { name: 'Toasts and live activity', ids: ['toast-stack', 'snackbar-undo', 'dynamic-island'] },
      { name: 'Loading and empty states', ids: ['state-panels', 'shimmer-skeleton', 'charging-ring'] },
    ],
  },
  {
    name: 'Forms and inputs',
    blurb: 'Collecting information: fields, pickers, uploads and multi-step flows.',
    families: [
      { name: 'Fields and controls', ids: ['validated-inputs', 'otp-input', 'tag-input', 'select-combobox', 'range-slider', 'star-rating', 'toggle-controls'] },
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
      { name: 'Lists and feeds', ids: ['activity-timeline', 'tree-view', 'chat-thread', 'terminal-window'] },
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
      { name: 'Text effects', ids: ['blur-in-words', 'flip-words', 'morphing-text', 'shimmer-text', 'sparkles-text', 'glitch-text', 'stagger-text', 'text-scramble', 'typewriter', 'circular-text', 'scroll-text-reveal'] },
      { name: 'Ambient motion', ids: ['logo-marquee', 'animated-list', 'cursor-trail', 'floating-blobs', 'orbiting-dots', 'scroll-progress-bar', 'tilt-flip-card'] },
    ],
  },
  {
    name: 'Backgrounds',
    blurb: 'Backdrops for heroes and panels.',
    families: [
      { name: 'Light and glow', ids: ['aurora-background', 'lamp-glow', 'noise-gradient-mesh', 'spotlight-cursor', 'gradient-border-glow', 'ripple-rings'] },
      { name: 'Patterns and particles', ids: ['dot-pattern-glow', 'grid-pattern-fade', 'particles-canvas', 'meteors', 'background-beams'] },
    ],
  },
  {
    name: '3D animations',
    blurb: 'Real-time WebGL scenes: shaders, particle systems and reflective materials that react to the pointer.',
    families: [
      { name: 'Shader surfaces', ids: ['iridescent-blob', 'plasma-orb', 'mesh-gradient', 'aurora-ribbons', 'topographic-terrain', 'midnight-ocean', 'event-horizon'] },
      { name: 'Particle systems', ids: ['particle-galaxy', 'morphing-particles', 'particle-wave-field', 'network-globe', 'warp-starfield', 'particle-vortex', 'sound-sphere'] },
      { name: 'Materials and light', ids: ['liquid-chrome', 'prism-gem', 'orbital-gyroscope', 'soap-bubbles', 'lattice-pulse', 'wave-cubes', 'neon-tunnel'] },
    ],
  },
]

const lookup = new Map<string, { group: string; family: string }>()
for (const g of groups) for (const f of g.families) for (const id of f.ids) lookup.set(id, { group: g.name, family: f.name })
export const placeOf = (id: string) => lookup.get(id)
