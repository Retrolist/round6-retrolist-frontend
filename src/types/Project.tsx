export interface ProjectQueryOptions {
  search: string
  categories: string[]
  orderBy?: string
  seed?: string
  limit?: number
}

export interface ProjectMetadata {
  id: string
  displayName: string
  impactCategory: string[]
  bio: string
  address: string
  profileImageUrl: string
  bannerImageUrl: string
  prelimResult: string
  reportReason: string
}

export interface Project {
  bio: string
  impactCategory: string[]
  displayName: string
  websiteUrl: string
  applicant: ProjectApplicant
  applicantType: string
  profile: ProjectProfile
  impactDescription: string
  contributionDescription: string
  contributionLinks: ProjectContributionLink[]
  impactMetrics: ProjectImpactMetric[]
  fundingSources: ProjectFundingSource[]
  lists: any[]
  id: string
  prelimResult: string
  reportReason: string
}

export interface ProjectApplicant {
  address: ProjectAddress
  id: string
}

export interface ProjectAddress {
  address: string
  resolvedName: ProjectResolvedName
}

export interface ProjectResolvedName {
  address: string
  name: string
}

export interface ProjectProfile {
  profileImageUrl: string
  bannerImageUrl: string
  id: string
}

export interface ProjectContributionLink {
  type: string
  url: string
  description: string
}

export interface ProjectImpactMetric {
  description: string
  number: string
  url: string
}

export interface ProjectFundingSource {
  type: string
  currency: string
  amount: number
  description: string
}
