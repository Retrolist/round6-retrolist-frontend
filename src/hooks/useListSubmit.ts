import { useCallback, useState } from "react";
import { ListSubmitDto } from "../types/List";

export function uselistSubmit(domainName: string) {
  const [ listId, setlistId ] = useState('')

  const listSubmit = useCallback(async (list: ListSubmitDto) => {

  }, [])

  return {
    listId,
    listSubmit,
  }
}