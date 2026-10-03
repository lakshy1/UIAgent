export type TemplateKind = 'Landing page' | 'Portfolio' | 'Dashboard' | 'SaaS starter' | 'AI app' | 'Commerce' | 'Blog and docs' | 'Agency'
export type TemplateAccess = 'Free' | 'With plan'

export interface Template {
  slug: string          // the id 21st.dev uses in its URL and CLI
  name: string
  author: string        // 21st.dev username, without the @
  kind: TemplateKind
  access: TemplateAccess // 'With plan' needs a paid 21st.dev plan to download the code
  note: string          // what it is, in one line
}

/**
 * A hand-picked set from https://21st.dev/community/templates (the "Included in Plan" and "Free" lists,
 * read on 2026-10-04). Order follows 21st.dev's own listing; the site shows no like or install counts.
 * Every template belongs to its author. This page only links to it.
 */
export const templates: Template[] = [
  // ---------- Included in a 21st.dev plan ----------
  { slug: 'glass-portfolio', name: 'Glass portfolio', author: 'larsen66', kind: 'Portfolio', access: 'With plan', note: 'Personal portfolio built around frosted-glass panels.' },
  { slug: 'ai-crm-dashboard', name: 'AI CRM dashboard', author: 'larsen66', kind: 'Dashboard', access: 'With plan', note: 'Customer-relationship dashboard with AI-assisted views.' },
  { slug: 'dental-studio', name: 'Aurea dental studio', author: 'larsen66', kind: 'Landing page', access: 'With plan', note: 'Clinic website for a dental practice.' },
  { slug: 'forma-pilates-studio', name: 'Forma pilates studio', author: 'larsen66', kind: 'Landing page', access: 'With plan', note: 'Studio website for classes and bookings.' },
  { slug: 'yukohealth-storefront', name: 'YukoHealth storefront', author: 'larsen66', kind: 'Commerce', access: 'With plan', note: 'Online store for a health brand.' },
  { slug: 'next-elite-frontend-focused-next-js-starter', name: 'Next Elite', author: 'salmanshahriar', kind: 'SaaS starter', access: 'With plan', note: 'Next.js starter with custom UI components, auth and dashboard layouts, and i18n.' },
  { slug: 'hirael-nexacore', name: 'NexaCore', author: 'mohammadshehadeh', kind: 'Landing page', access: 'With plan', note: 'Enterprise-infrastructure landing page: floating pill navbar, full-screen video hero and a dark service-card grid.' },
  { slug: 'hirael-velorah', name: 'Velorah', author: 'mohammadshehadeh', kind: 'Landing page', access: 'With plan', note: 'Dark, premium landing page for an electric RV brand, with a video hero and liquid-glass navigation.' },
  { slug: 'hirael-asme', name: 'Asme', author: 'mohammadshehadeh', kind: 'Landing page', access: 'With plan', note: 'Dark liquid-glass marketing page with a cross-fading video hero and scroll-revealed sections.' },
  { slug: 'hirael-rivr', name: 'Rivr', author: 'mohammadshehadeh', kind: 'Landing page', access: 'With plan', note: 'DeFi staking landing page with glass stat cards, a metrics band and a bento feature grid.' },
  { slug: 'vetra', name: 'Vetra', author: 'larsen66', kind: 'Landing page', access: 'With plan', note: 'Animated landing page for an AI marketing platform. Next.js, Tailwind CSS and Framer Motion.' },
  { slug: 'launch-ui', name: 'Launch UI', author: 'larsen66', kind: 'Landing page', access: 'With plan', note: 'Landing-page starter on Next.js 16, React 19 and Tailwind CSS 4 with shadcn/ui components.' },
  { slug: 'homeguardian', name: 'HomeGuardian', author: 'shadcnui-blocks', kind: 'Landing page', access: 'With plan', note: 'Smart home security landing page. Next.js, TypeScript and shadcn/ui.' },
  { slug: 'crypgo-shadcn-ui-landingpage', name: 'Crypgo', author: 'shadcnspace', kind: 'Landing page', access: 'With plan', note: 'Crypto landing page built with shadcn/ui.' },
  { slug: 'luro-ai', name: 'Luro AI', author: 'larsen66', kind: 'Landing page', access: 'With plan', note: 'Landing page for an AI product.' },
  { slug: 'saascn', name: 'SaasCN', author: 'larsen66', kind: 'SaaS starter', access: 'With plan', note: 'SaaS marketing site and starter.' },
  { slug: 'paddle-billing-starter', name: 'Paddle Billing Starter', author: '21st', kind: 'SaaS starter', access: 'With plan', note: 'Starter with Paddle subscription billing wired in.' },
  { slug: 'sveltekit-saas-kit', name: 'SvelteKit SaaS Kit', author: 'kizivat', kind: 'SaaS starter', access: 'With plan', note: 'SaaS starter built on SvelteKit.' },
  { slug: 'vercel-nextjs-commerce', name: 'Next.js Commerce', author: 'larsen66', kind: 'Commerce', access: 'With plan', note: 'Storefront starter on the Next.js App Router.' },
  { slug: 'vercel-blog-starter-kit', name: 'Blog Starter Kit', author: 'larsen66', kind: 'Blog and docs', access: 'With plan', note: 'Statically generated blog starter for Next.js.' },
  { slug: 'material-dashboard-shadcn', name: 'Material Dashboard Shadcn', author: 'creativetimofficial', kind: 'Dashboard', access: 'With plan', note: 'Admin dashboard in the Material style, built with shadcn/ui.' },
  { slug: 'coreui-free-react-admin-template', name: 'CoreUI React Admin', author: 'coreui', kind: 'Dashboard', access: 'With plan', note: 'Free React admin template from CoreUI.' },
  { slug: 'modernize-free-react-mui-dashboard', name: 'Modernize MUI Dashboard', author: 'adminmart', kind: 'Dashboard', access: 'With plan', note: 'Free React dashboard built on MUI.' },
  { slug: 'materialm-free-tailwind-react-admin-template', name: 'MaterialM Admin', author: 'wrappixel', kind: 'Dashboard', access: 'With plan', note: 'Free Tailwind and React admin template.' },
  { slug: 'chatdeck', name: 'ChatDeck', author: 'larsen66', kind: 'AI app', access: 'With plan', note: 'Chat application interface.' },
  { slug: 'open-agents', name: 'Open Agents', author: 'larsen66', kind: 'AI app', access: 'With plan', note: 'Starter for building AI agents.' },
  { slug: 'ai-elements', name: 'AI Elements', author: 'larsen66', kind: 'AI app', access: 'With plan', note: 'Building blocks for AI chat interfaces.' },
  { slug: 'orb-ui', name: 'orb-ui', author: 'larsen66', kind: 'AI app', access: 'With plan', note: 'React voice AI components with adapters for Vapi, ElevenLabs, LiveKit, Pipecat, OpenAI Realtime and Gemini Live.' },
  { slug: 'aura-svelte-gsap', name: 'AURA Creative Agency', author: 'larsen66', kind: 'Agency', access: 'With plan', note: 'Creative agency site built with Svelte and GSAP.' },
  { slug: 'mojave', name: 'Mojave Creative Studio', author: 'larsen66', kind: 'Agency', access: 'With plan', note: 'Website for a creative studio.' },
  { slug: 'pixel-point-agency', name: 'Pixel Point Agency', author: 'pixelpoint', kind: 'Agency', access: 'With plan', note: 'Website of the Pixel Point web agency.' },
  { slug: 'schdesign-studio', name: 'Schdesign Studio', author: 'schdesign', kind: 'Agency', access: 'With plan', note: 'Website for a design studio.' },
  { slug: 'resume-nextjs', name: 'Resume', author: 'shadcnspace', kind: 'Portfolio', access: 'With plan', note: 'Resume and portfolio template built with shadcn/ui.' },
  { slug: 'macos-desktop-portfolio', name: 'macOS Desktop Portfolio', author: 'alanagoyal', kind: 'Portfolio', access: 'With plan', note: 'Portfolio that looks and behaves like a macOS desktop.' },
  { slug: 'kintaro-awwwards-portfolio', name: 'Kintaro Awwwards Portfolio', author: 'xkintaro', kind: 'Portfolio', access: 'With plan', note: 'Motion-heavy portfolio in the Awwwards style.' },
  { slug: 'chanhdai-portfolio', name: 'Chanh Dai Portfolio', author: 'ncdai', kind: 'Portfolio', access: 'With plan', note: 'Developer portfolio by Chanh Dai.' },
  { slug: 'samuelkraft-portfolio-blog', name: 'Samuel Kraft Portfolio', author: 'samuelkraft', kind: 'Portfolio', access: 'With plan', note: 'Personal site with a blog.' },
  { slug: 'maxleiter-personal-site', name: 'Max Leiter Personal Site', author: 'maxleiter', kind: 'Portfolio', access: 'With plan', note: 'Minimal personal site and blog.' },

  // ---------- Free ----------
  { slug: 'orbit-mail', name: 'Orbit Mail', author: 'nextjsshop', kind: 'Landing page', access: 'Free', note: 'Landing page for an email product.' },
  { slug: 'leadflow-ai', name: 'LeadFlow AI', author: 'emmanuelajako406', kind: 'Landing page', access: 'Free', note: 'Landing page for an AI lead-generation product.' },
  { slug: 'liquid-chrome-hero-page', name: 'Liquid Chrome', author: 'irvandoank311', kind: 'Landing page', access: 'Free', note: 'A single hero page with a liquid-chrome look.' },
  { slug: 'tailgrids-saasly', name: 'SaaSly', author: 'tailgrids', kind: 'Landing page', access: 'Free', note: 'SaaS landing page from TailGrids.' },
  { slug: 'cruip-open-react-template', name: 'Open React Template', author: 'cruip', kind: 'Landing page', access: 'Free', note: 'Dark landing page template from Cruip.' },
  { slug: 'cruip-simple-light', name: 'Simple Light', author: 'cruip', kind: 'Landing page', access: 'Free', note: 'Light landing page template from Cruip.' },
  { slug: 'developer-tools-landing-2', name: 'Developer Tools Landing', author: 'ssychui', kind: 'Landing page', access: 'Free', note: 'Landing page for a developer tool.' },
  { slug: 'screen-studio', name: 'Screen Studio', author: 'ceo.infinityonline', kind: 'Landing page', access: 'Free', note: 'Product landing page.' },
  { slug: 'engraved-illustration-landing-page-template', name: 'Engraved Illustration Landing', author: 'kedhareswer', kind: 'Landing page', access: 'Free', note: 'Landing page styled with engraved illustrations.' },
  { slug: 'precedent-nextjs-starter', name: 'Precedent', author: 'steven-tey', kind: 'SaaS starter', access: 'Free', note: 'Opinionated Next.js starter by Steven Tey.' },
  { slug: 'platforms-starter-kit', name: 'Platforms Starter Kit', author: 'larsen66', kind: 'SaaS starter', access: 'Free', note: 'Multi-tenant app starter with custom domains.' },
  { slug: 'tanstack-start-on-vercel', name: 'TanStack Start on Vercel', author: 'larsen66', kind: 'SaaS starter', access: 'Free', note: 'TanStack Start app, ready to deploy on Vercel.' },
  { slug: 'polar-subscription', name: 'Polar Subscription', author: 'cult-ui', kind: 'SaaS starter', access: 'Free', note: 'Subscription starter using Polar, from cult/ui.' },
  { slug: 'horizon-ai-boilerplate-pro-shadcn-ui-nextjs', name: 'Horizon AI Boilerplate', author: 'horizon-ui', kind: 'AI app', access: 'Free', note: 'AI app boilerplate on shadcn/ui and Next.js.' },
  { slug: 'morphic-ai-powered-answer-engine', name: 'Morphic', author: 'larsen66', kind: 'AI app', access: 'Free', note: 'AI-powered answer engine.' },
  { slug: 'tailgrids-ai-chat', name: 'AI Chat', author: 'tailgrids', kind: 'AI app', access: 'Free', note: 'AI chat interface from TailGrids.' },
  { slug: 'tailgrids-writemate-ai', name: 'WriteMate AI', author: 'tailgrids', kind: 'AI app', access: 'Free', note: 'AI writing assistant interface from TailGrids.' },
  { slug: 'magic-portfolio-for-next-js', name: 'Magic Portfolio', author: 'larsen66', kind: 'Portfolio', access: 'Free', note: 'Portfolio template for Next.js.' },
  { slug: 'motion-primitives-nim', name: 'Nim', author: 'ibelick', kind: 'Portfolio', access: 'Free', note: 'Minimal personal site built with Motion Primitives.' },
  { slug: 'card-stack-portfolio-website-template', name: 'Card Stack Portfolio', author: 'kedhareswer', kind: 'Portfolio', access: 'Free', note: 'Portfolio presented as a stack of cards.' },
  { slug: 'coquette-macos-desktop-portfolio-template', name: 'Coquette macOS Portfolio', author: 'kedhareswer', kind: 'Portfolio', access: 'Free', note: 'Desktop-style portfolio with a soft, coquette theme.' },
  { slug: 'scroll-tear-portfolio-website-template', name: 'Scroll Tear Portfolio', author: 'kedhareswer', kind: 'Portfolio', access: 'Free', note: 'Portfolio with a paper-tear scroll effect.' },
  { slug: 'portfolio-developer-portfolio-blog-component-registry-free', name: 'Ruixen Portfolio', author: 'ruixen.ui', kind: 'Portfolio', access: 'Free', note: 'Developer portfolio with a blog and a component registry.' },
  { slug: 'black-dashboard-react', name: 'Black Dashboard React', author: 'creativetimofficial', kind: 'Dashboard', access: 'Free', note: 'Dark admin dashboard from Creative Tim.' },
  { slug: 'argon-dashboard-react', name: 'Argon Dashboard React', author: 'creativetimofficial', kind: 'Dashboard', access: 'Free', note: 'Admin dashboard from Creative Tim.' },
  { slug: 'dashboardkit-free-react-admin-template', name: 'DashboardKit', author: 'codedthemes', kind: 'Dashboard', access: 'Free', note: 'Free React admin template from Coded Themes.' },
  { slug: 'remix-dashboard-template', name: 'Remix Dashboard', author: 'jacob-ebey', kind: 'Dashboard', access: 'Free', note: 'Dashboard template built on Remix.' },
  { slug: 'nextra-docs-starter-kit', name: 'Nextra Docs Starter', author: 'larsen66', kind: 'Blog and docs', access: 'Free', note: 'Documentation site starter built on Nextra.' },
  { slug: 'next-js-contentlayer-blog-starter', name: 'Contentlayer Blog Starter', author: 'larsen66', kind: 'Blog and docs', access: 'Free', note: 'Next.js blog starter using Contentlayer.' },
]

export const templateKinds: TemplateKind[] = ['Landing page', 'Portfolio', 'Dashboard', 'SaaS starter', 'AI app', 'Commerce', 'Blog and docs', 'Agency']
export const templateCount = templates.length
export const installCommand = (t: Template) => `npx @21st-dev/cli@latest template add ${t.slug}`
export const templateUrl = (t: Template) => `https://21st.dev/@${t.author}/templates/${t.slug}`
