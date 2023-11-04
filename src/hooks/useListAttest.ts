import { useCallback } from "react";
import { ListSubmitDto } from "../types/List";
import { uselistSubmit } from "./useListSubmit";
import { useOptidomainsRegister } from "./useOptidomainsRegister";

// Note: Use list attest combine list submission and optidomains registration together
export function useListAttest() {
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

  const listAttest = useCallback(() => {

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