import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'cast-render-story-reel', title: 'Cast & Render Story Reel', category: '3D', description: 'Move vertically through a studio finish story: clay blockout, precision ceramic, then a polished glass product render.', source: ['Cast & Render prompt, adapted for LakshyaKosh'], tags: ['scroll story', 'product design', 'studio', 'interactive'] } as const satisfies Meta

export default function CastRenderStoryReel({ device }: { device: Device }) {
  return <ThreePreview scene="cast-render-story-reel" device={device} />
}
