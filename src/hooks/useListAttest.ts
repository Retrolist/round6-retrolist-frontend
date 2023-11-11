import { useCallback, useState } from "react";
import { ListSubmitDto } from "../types/List";
import { uselistSubmit } from "./useListSubmit";
import { useOptidomainsRegister } from "./useOptidomainsRegister";
import { useAccount } from "wagmi";
import { listAttestSignature } from "../utils/list";
import { buildSignatureHex } from "../utils/common";
import { useEthersSigner } from "../utils/wagmi-ethers";

// Note: Use list attest combine list submission and optidomains registration together
export function useListAttest() {
  const { address } = useAccount()

  const {
    domainName,
    twitter,
    discord,
    performSocialLogin,
    isExistingDomainName,
  } = useOptidomainsRegister()

  const {
    listId,
    listSubmit,
  } = uselistSubmit(domainName!)

  const signer = useEthersSigner()

  const [signature, setSignature] = useState("");
  const [listName, setListName] = useState("");
  const [loading, setLoading] = useState(false)

  const listSign = useCallback(async (list: ListSubmitDto) => {
    try {
      setLoading(true)

      if (domainName && twitter && discord) {
        const id = await listSubmit(list)
        
        if (signer) {
          const rawSignature = await listAttestSignature(id, list.listName, signer)
          setSignature(buildSignatureHex(rawSignature.signature))
          setListName(list.listName)
        } else {
          throw new Error("Please connect your wallet")
        }
  
        return id;
      } else {
        throw new Error("Missing domain")
      }
    } finally {
      setLoading(false)
    }
  }, [
    domainName,
    twitter,
    discord,
    signer,

    listSubmit,
    setSignature,
    setListName,
  ])

  const listAttest = useCallback(async () => {
    try {
      setLoading(true)

      if (domainName && twitter && discord) {
        if (signature) {
          if (isExistingDomainName) {
  
          } else {
    
          }
        } else {
          throw new Error("Attestation is not signed")
        }
      } else {
        throw new Error("Missing domain")
      }
    } finally {
      setLoading(false)
    }
  }, [
    signature,
    domainName,
    twitter,
    discord,
    isExistingDomainName,
    listId,
    listName,
  ])

  return {
    listSign,
    listAttest,

    signature,

    listId,
    listSubmit,

    domainName,
    twitter,
    discord,
    performSocialLogin,
    isExistingDomainName,

    loading,
  }
}