export enum ListImpactEvaluationType {
  UNKNOWN = "",
  CLASSIC = "classic",
  RUBRIC = "rubric",
}

export interface ListContent {
  RPGF3_Application_UID: string
  OPAmount: number
}

export interface ListContentWithRubrics extends ListContent {
  comment: string
  evaluation: {[rubric_id: string]: number}
}

export interface ListMetadata {
  listName: string
  listDescription: string
  impactEvaluationInput: string
  impactEvaluationLink: string
}

export interface ListAttestation {
  listName: string
  listDescription: string
  impactEvaluationDescription: string
  impactEvaluationLink: string
  listContent: ListContent[]
}

export interface ListRubric {
  id: string
  title: string
  scores: {[score: number]: string}
}

export interface ListData extends ListAttestation {
  id: string
  impactEvaluationInput: string
  impactEvaluationType: ListImpactEvaluationType
  listContent: ListContentWithRubrics[]
  walletAddress: string
  attestationUid: string
  forkedFrom: string
  rubrics: ListRubric[]
  histories: ListData[]
  createdAt: Date
  updatedAt: Date
}