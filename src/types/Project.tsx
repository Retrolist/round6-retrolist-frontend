export interface ProjectQueryOptions {
  search: string
  categories: string[]
  orderBy?: string
  seed?: string
  limit?: number
  approved?: boolean
}

export interface ProjectMetadataSimple {
  id: string
  displayName: string
  profileImageUrl: string
  bio: string
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
  recategorization?: string
  primaryCategory?: string
  includedInBallots?: number
  totalOP?: number
  rank?: number
  isOss?: boolean
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
  includedInBallots?: number

  github: string[]
  packages: string[]

  osoSlug?: string

  metrics: ProjectMetrics | null
  metricsPercent: ProjectMetrics | null
  metricsPercentOss: ProjectMetrics | null

  totalOP?: number
  rank?: number
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
  amount: string
  description: string
  url?: string
}

export interface ProjectCount {
  total: number
  eligible: number
  categories: {
    name: string
    count: number
  }[]
}

export interface ProjectMetrics {
  project_name: string;
  application_id: string;
  is_oss: boolean;
  gas_fees: number;
  transaction_count: number;
  trusted_transaction_count: number;
  trusted_transaction_share: number;
  trusted_users_onboarded: number;
  daily_active_addresses: number;
  trusted_daily_active_users: number;
  monthly_active_addresses: number;
  trusted_monthly_active_users: number;
  recurring_addresses: number;
  trusted_recurring_users: number;
  power_user_addresses: number;
  openrank_trusted_users_count: number;
  log_gas_fees: number;
  log_transaction_count: number;
  log_trusted_transaction_count: number;
}
