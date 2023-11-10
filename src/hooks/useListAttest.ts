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

  const listSign = useCallback(async (list: ListSubmitDto) => {
    if (domainName && twitter && discord) {
      const id = await listSubmit(list)
      
      if (signer) {
        const rawSignature = await listAttestSignature(id, list.listName, signer)
        setSignature(buildSignatureHex(rawSignature.signature))
      } else {
        throw new Error("Please connect your wallet")
      }
    } else {
      throw new Error("Missing domain")
    }
  }, [
    listSubmit,
    domainName,
    twitter,
    discord,
  ])

  const listAttest = useCallback(async () => {
    if (signature && domainName && twitter && discord) {
      if (isExistingDomainName) {

      } else {

      }
    } else {
      throw new Error("Attestation is not signed")
    }
  }, [
    signature,
    domainName,
    twitter,
    discord,
    isExistingDomainName,
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
  }
}