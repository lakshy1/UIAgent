# LakshyaKosh: component library

A browsable library of 147 React UI components, 21 real-time 3D scenes, 22 design styles, 53 colour themes and 54 typefaces. Everything runs live, has a laptop and a phone design, and comes with code to copy.

- **Design:** components in 10 groups (actions, navigation, page sections, cards, overlays, forms, data, media, motion, backgrounds). Each runs a live demo, has a Laptop/Mobile switch, and a Code tab with a copy button.
- **3D Animations:** WebGL scenes built from shaders, particle systems and reflective materials (iridescent blob, particle galaxy, morphing particles, network globe, liquid chrome, midnight ocean, event horizon and more). All geometry is procedural, so there are no model or texture files.
- **Styles:** 22 aesthetics, searchable and filterable by family (liquid glass, bento grid, Frutiger Aero, Bauhaus, terminal mono, luxury editorial, glassmorphism, neumorphism, minimalism, maximalism, retro, neo-brutalism and more), each a working mini website with the CSS recipe behind it.
- **Colors:** 23 light and 30 dark palettes. Copy one as CSS variables, a Tailwind v4 `@theme` block or JSON, or apply it to the whole site. Muted and brand colours are adjusted automatically so text reaches 4.5:1 contrast.
- **Fonts:** 54 typefaces, filterable by type, with your own preview text and size, a copy button for the CSS and the Google Fonts embed tag, and 9 heading-and-body pairings.
- **Templates:** 67 complete website templates picked from [21st.dev](https://21st.dev/community/templates), 29 free and 38 included with a 21st.dev plan. Each card copies its install command (`npx @21st-dev/cli@latest template add <slug>`) and links to the live preview. The templates belong to their authors; the list lives in `src/shell/templateCatalog.ts`.

## Run it

```bash
npm install
npm run dev
```

## Stack

Vite, React, TypeScript, Tailwind CSS v4, framer-motion, lucide-react. The 3D tab adds three.js, @react-three/fiber and @react-three/drei, which load only when that tab is opened.

## Adding a component

Add a file in `src/library/<folder>/` that exports `meta` and a default component taking `{ device: 'laptop' | 'mobile' }`, then place its `meta.id` in `src/library/taxonomy.ts`. The gallery discovers it automatically.

Write `meta` as a plain object literal. The registry reads it through a small plugin in `vite.config.ts` that extracts only that object, which is what keeps each component in its own lazy-loaded chunk.

## Adding a 3D scene

Add a file in `src/library/three/` with `category: '3D'`. Wrap the scene in `<ThreePreview>` and drive it with `useSceneFrame` from `src/three/kit.tsx`, which pauses off-screen scenes, eases the pointer and holds a still frame for reduced motion. All scenes share one canvas.

## The opening loader

The loader is inlined in `index.html` so it paints before any script downloads. `src/main.tsx` calls `window.__koshReady()` once the app has rendered, which runs the progress bar to 100% and opens the doors.

## Notes

Components were distilled from the author's own projects and from patterns common to modern component sites. All code is original.
