import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'botanical-glass-sculpture', title: 'Botanical Glass Sculpture', category: '3D', description: 'A botanical study pairs translucent glassware with independently swaying leaves.', source: ['LakshyaKosh procedural 3D collection'], tags: ['botanical', 'glass', 'luxury'] } as const satisfies Meta

export default function BotanicalGlassSculpture({ device }: { device: Device }) {
  return <ThreePreview scene="botanical-glass-sculpture" device={device} />
}
