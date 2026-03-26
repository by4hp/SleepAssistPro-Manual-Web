export interface DocItem {
  id: string
  title: string
  content: string
  children?: DocItem[]
}

export interface DocSection {
  id: string
  title: string
  description?: string
  items: DocItem[]
}
