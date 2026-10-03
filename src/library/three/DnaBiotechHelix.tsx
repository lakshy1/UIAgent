import type { Device, Meta } from '../types'
import { ThreePreview } from '../../three/ThreePreview'

export const meta = { id: 'dna-biotech-helix', title: 'DNA Biotech Helix', category: '3D', description: 'A dimensional double helix combines translucent strands, molecular beads and cross-links.', source: ['LakshyaKosh procedural 3D collection'], tags: ['biotech', 'DNA', 'science'] } as const satisfies Meta

export default function DnaBiotechHelix({ device }: { device: Device }) {
  return <ThreePreview scene="dna-biotech-helix" device={device} />
}
