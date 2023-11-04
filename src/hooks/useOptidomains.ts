import { SocialProfileSimple } from "../types/OptiDomains"

export interface OptidomainsHookResponse {
  domainName: string | null
  profiles: SocialProfileSimple[]
}

export function useOptidomains(address?: string): OptidomainsHookResponse {
  if (!address) {
    return {
      domainName: null,
      profiles: [],
    }
  }

  return {
    domainName: null,
    profiles: [],
  }
}