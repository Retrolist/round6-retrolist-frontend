import { useCallback, useEffect, useState } from "react";
import { SocialProfileSimple } from "../types/OptiDomains"
import { useDomainList } from "./useDomainList";
import { usePrimaryDomain } from "./usePrimaryDomain";
import { getAssociatedSocialProfiles } from "../utils/optidomains";
import { namehash } from "viem";

export interface OptidomainsHookResponse {
  domainName: string | null
  profiles: SocialProfileSimple[]
  loading: boolean
}

export function useOptidomains(address?: string): OptidomainsHookResponse {
  const domainName = usePrimaryDomain(address)
  const [ profiles, setProfiles ] = useState<SocialProfileSimple[]>([])
  const [ loading, setLoading ] = useState(true)

  const fetchProfiles = useCallback(async () => {
    if (address && domainName) {
      try {
        setLoading(true)
        setProfiles(await getAssociatedSocialProfiles(address, namehash(domainName), 10))
      } finally {
        setLoading(false)
      }
    }

  }, [ address, domainName, setProfiles, setLoading ])

  useEffect(() => {
    if (address && domainName) {
      fetchProfiles()
    }
  }, [ address, domainName ])

  if (!address || !domainName) {
    return {
      domainName: null,
      profiles: [],
      loading: false,
    }
  }

  return {
    domainName,
    profiles,
    loading,
  }
}