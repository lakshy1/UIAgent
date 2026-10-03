export type Device = 'laptop' | 'mobile'
export type Category =
  | 'Buttons' | 'Motion' | 'Navigation' | 'Sections' | 'Cards' | 'Overlays' | 'Data' | 'Forms' | 'Backgrounds' | 'Media'
export interface Meta {
  id: string            // kebab-case, unique
  title: string
  category: Category
  description: string   // one or two sentences, what it is and when to use it
  source: string[]      // originating projects, e.g. '30-Talenzo'
  tags: string[]
  notes?: string[]      // usage / accessibility notes
}
