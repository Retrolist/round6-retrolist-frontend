import { ProjectMetadataSimple } from "./Project";
import { IRubric } from "./Rubric";

export enum ListImpactEvaluationType {
  UNKNOWN = "",
  CLASSIC = "classic",
  RUBRIC = "rubric",
}

export interface ListContent {
  RPGF3_Application_UID: string;
  OPAmount: number;
}

export interface CommentAndScore {
  comment: string;
  score: number;
}

export interface ListContentWithRubrics extends ListContent {
  evaluation: { [criteriaId: string]: CommentAndScore };
}

export interface ListMetadata {
  listName: string;
  listDescription: string;
  // relevantResourceInput: string;
  rubricId: string;
  rubric: IRubric;
}

export interface ListAttestation {
  listName: string;
  listDescription: string;
  impactEvaluationDescription: string;
  impactEvaluationLink: string;
  listContent: ListContent[];
}

export interface ListData extends ListAttestation {
  id: string;
  impactEvaluationInput: string;
  impactEvaluationType: ListImpactEvaluationType;
  listContent: ListContentWithRubrics[];
  projectsMetadata: ProjectMetadataSimple[];
  // walletAddress: string;
  // isBadgeholder: boolean;
  // attestationUid: string;
  // forkedFrom: string;
  rubricId: string;
  rubric: IRubric | null;
  totalOp: number;
  histories: ListData[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ListContentView extends ListContentWithRubrics {
  score: number;
  project?: ProjectMetadataSimple;
}

export interface ListView extends ListData {
  listContent: ListContentView[]
  creatorDomainName: string
}

export interface ListDto {
  listName: string;
  listDescription: string;
  impactEvaluationInput: string;
  impactEvaluationDescription: string;
  impactEvaluationLink: string;
  impactEvaluationType: string;
  listContent: ListContentWithRubrics[];

  status: string;

  walletAddress: string;
  domainName: string;
  isBadgeholder: boolean;
  attestationUid: string;
  approvalAttestationUid: string;
  forkedFrom: string;

  rubric: IRubric;
  rubricId: string;
  categories: string[];

  createdAt: Date;
  updatedAt: Date;
  revokedAt?: Date;
}

export interface ListSubmitDto {
  listName: string;
  listDescription: string;
  impactEvaluationInput: string;
  impactEvaluationDescription: string;
  impactEvaluationLink: string;
  impactEvaluationType: string;
  listContent: ListContentWithRubrics[];

  categories: string[];

  domainName: string;
  rubricId: string;
}
