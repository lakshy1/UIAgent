import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'mainframe-mouse-scrub-hero', title: 'Mainframe Mouse-Scrub Hero', category: '3D', description: 'Move left to right to scrub an AI hero from wireframe signal to a luminous core and orbiting final form.', source: ['Mainframe prompt, adapted for LakshyaKosh'], tags: ['mouse scrub', 'AI', 'hero', 'interactive'] } as const satisfies Meta

export default function MainframeMouseScrubHero({ device }: { device: Device }) {
  return <ThreePreview scene="mainframe-mouse-scrub-hero" device={device} />
}
