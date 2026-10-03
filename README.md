# LakshyaKosh: component library

A browsable library of 131 React UI components, 16 design styles and 20 colour themes, each with a laptop and a phone design, a live preview and copyable code.

- **Design:** components grouped into 10 groups (actions, navigation, page sections, cards, overlays, forms, data, media, motion, backgrounds). Each runs a live demo, has a Laptop/Mobile switch, and a Code tab with a copy button.
- **Styles:** 16 aesthetics (glassmorphism, neumorphism, minimalism, maximalism, retro, neo-brutalism and more), each a working mini website with the CSS recipe behind it.
- **Colors:** 10 light and 10 dark palettes. Copy the CSS variables, or apply one to the whole site.

## Run it

```bash
npm install
npm run dev
```

## Stack

Vite, React, TypeScript, Tailwind CSS v4, framer-motion, lucide-react.

## Adding a component

Add a file in `src/library/<folder>/` that exports `meta` and a default component taking `{ device: 'laptop' | 'mobile' }`, then place its `meta.id` in `src/library/taxonomy.ts`. The gallery discovers it automatically.

## Notes

Components were distilled from the author's own projects and from patterns common to modern component sites. All code is original.
