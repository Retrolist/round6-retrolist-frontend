import { useCallback } from "react";
import { ListSubmitDto } from "../types/List";
import { uselistSubmit } from "./useListSubmit";
import { useOptidomainsRegister } from "./useOptidomainsRegister";
import { useAccount } from "wagmi";

// Note: Use list attest combine list submission and optidomains registration together
export function useListAttest() {
  const { address } = useAccount()

  const {
    domainName,
    twitter,
    discord,
    performSocialLogin,
  } = useOptidomainsRegister()

  const {
    listId,
    listSubmit,
  } = uselistSubmit(domainName!)

  const listAttest = useCallback(async (list: ListSubmitDto) => {
    if (domainName && twitter && discord) {
      const id = await listSubmit(list)
    } else {
      throw new Error("Missing domain")
    }
  }, [
    listSubmit,
    domainName,
    twitter,
    discord,
  ])

  return {
    listId,
    listSubmit,

    domainName,
    twitter,
    discord,
    performSocialLogin,
  }
}