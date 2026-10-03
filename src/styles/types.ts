import type { Device } from '../library/types'

export type { Device }
export type StyleFamily = 'Soft surfaces' | 'Less and more' | 'Retro' | 'Bold and edgy' | 'Modern'

export interface StyleMeta {
  id: string                 // kebab-case, unique
  title: string              // e.g. 'Glassmorphism'
  family: StyleFamily
  era: string                // e.g. 'Popular since 2020 (Apple Big Sur, Windows 11)'
  idea: string               // the web idea shown, e.g. 'Music streaming landing page'
  description: string        // 2 sentences: what the style is and how it feels
  traits: string[]           // 4-6 defining traits
  palette: { name: string; hex: string }[] // 5-6 colors used
  fonts: string              // fonts used e.g. 'Space Grotesk + Inter'
  useFor: string[]           // 3 good fits
  avoid: string[]            // 2-3 poor fits or pitfalls
  signature: string          // the signature CSS (5-12 lines) that creates the look
}
