export interface CategorizationCollection {
  type: string
  name: string
  id: string | number
  ranking: CategorizationCategory[]
}

export interface CategorizationCategory {
  type: string
  id: string | number
  name: string
  ranking: CategorizationProject[]
}

export interface CategorizationProject {
  id: string | number
  RPGF3Id: string
  name: string
  type: string
}