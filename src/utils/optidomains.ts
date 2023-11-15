import axios from "axios"
import { SocialProfileSimple } from "../types/OptiDomains"
import { request, gql } from 'graphql-request'

export interface DomainMetadata {
  node: string
  chain: string // evm_xxxx
  name: string
  owner: string
  expiry: number
}

export function changeTld(domain: string, tld: string, targetTld: string) {
  if (domain.endsWith(tld)) {
    return domain.substring(0, domain.length - tld.length) + targetTld
  }

  return domain;
}

export async function getDomainList(owner: string, tld?: string, chain?: string): Promise<DomainMetadata[]> {
  const response = await axios.get(import.meta.env.VITE_INDEXER_ENDPOINT + '/owner/' + owner)

  let data: DomainMetadata[] = response.data

  if (chain) {
    data = response.data.filter((x: DomainMetadata) => x.chain == chain)
  }

  if (tld) {
    data = response.data.filter((x: DomainMetadata) => x.name.endsWith(tld))
  }

  return data
}

const SOCIAL_PROFILE_QUERY = gql`
  query OptiDomainsText($walletAddress: String) {
    attestations(
      where: {
        schemaId: {
          equals: "0x761c866d6c1cbdf2d58693047f65c5be130449c850640449a84c5962b34b397b",
        },
        attester: {
          equals: "0x8888119526F2AAE3525a3820F8893424E74E7af2"
        },
        recipient: {
          equals: $walletAddress
        },
        revoked: {
          equals: false
        }
      },
      orderBy: {
        time: asc
      }
    ) {
      id
      attester
      recipient
      time
      decodedDataJson
    }
  }

`

export async function getAssociatedSocialProfiles(walletAddress: string, node: string, chainId: number): Promise<SocialProfileSimple[]> {
  // Try fetching data from on-chain attestations first

  try {
    const finalResponse: SocialProfileSimple[] = []

    const gqlResponse: any = await request({
      url: import.meta.env.VITE_EAS_SCAN + "/graphql",
      document: SOCIAL_PROFILE_QUERY,
      variables: {
        walletAddress,
      }
    })
  
    console.log(gqlResponse)
  
    for (let attestation of gqlResponse.attestations) {
      const data = JSON.parse(attestation.decodedDataJson)
  
      if (data[0].value.value == node) {
        finalResponse.push({
          node,
          provider: data[1].value.value,
          identity: data[2].value.value,
          displayName: data[2].value.value,
          chainId,
          uid: attestation.id
        })
      }
  
    }

    console.log(finalResponse)

    // This need merging display name for better UX
    try {
      const response = await axios.get(import.meta.env.VITE_SOCIAL_ORACLE_ENDPOINT + '/attestation/social', {
        params: {
          node,
          chainId,
          simple: 1,
          isTestnet: 0,
        }
      })

      const oracleRecords: SocialProfileSimple[] = response.data;

      for (const record of oracleRecords) {
        const matchedRecord = finalResponse.find(x => x.node == record.node && x.identity == record.identity && x.provider == record.provider)

        if (matchedRecord) {
          matchedRecord.displayName = record.displayName
        } else {
          finalResponse.push(record)
        }
      }
    } catch (err) {
      console.error(err)
    }
  
    return finalResponse
  } catch (err) {
    console.error(err)

    const response = await axios.get(import.meta.env.VITE_SOCIAL_ORACLE_ENDPOINT + '/attestation/social', {
      params: {
        node,
        chainId,
        simple: 1,
        isTestnet: 0,
      }
    })
  
    return response.data
  }
}
